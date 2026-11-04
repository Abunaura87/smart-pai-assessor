import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import {
  ADMIN_EMAIL,
  auth,
  db,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import { AssessmentPackage, AssessmentParameters } from '../types/assessment';
import {
  formatEventTypeLabel,
  sanitizeTelemetryId,
  sanitizeUsageEventRecord,
  UsageEventRecord,
  UsageEventType,
} from './telemetryStats';

const LOCAL_EVENTS_KEY = 'smart_pai_telemetry_events_v1';
const VISITOR_ID_KEY = 'smart_pai_visitor_id_v1';
const ADMIN_SESSION_KEY = 'smart_pai_admin_unlocked_v1';

export function getOrCreateVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing && /^[a-zA-Z0-9_\-]+$/.test(existing)) {
      return existing.slice(0, 128);
    }
    const generated = `guru_${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    localStorage.setItem(VISITOR_ID_KEY, generated);
    return generated;
  } catch {
    return `guru_${Date.now().toString(36)}`;
  }
}

export function loadLocalTelemetryEvents(): UsageEventRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_EVENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => sanitizeUsageEventRecord(item));
  } catch {
    return [];
  }
}

export function saveLocalTelemetryEvents(events: UsageEventRecord[]): void {
  try {
    const trimmed = events.slice(0, 300);
    localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage quota issues
  }
}

export function isLocalAdminUnlocked(): boolean {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setLocalAdminUnlocked(unlocked: boolean): void {
  try {
    if (unlocked) {
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch {
    // Ignore storage issues
  }
}

export async function ensureAdminProfileInFirestore(): Promise<void> {
  const currentUser = auth.currentUser;
  if (
    !currentUser ||
    !currentUser.emailVerified ||
    currentUser.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
  ) {
    return;
  }

  const adminId = sanitizeTelemetryId(currentUser.uid, 'admin');
  const path = `admins/${adminId}`;
  try {
    await setDoc(doc(db, 'admins', adminId), {
      uid: adminId,
      email: currentUser.email.slice(0, 160),
      displayName: (currentUser.displayName || 'Administrator PAI').slice(0, 120),
      role: 'admin',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    // If the admin profile already exists (update is disallowed by immutable rules), ignore safely
    const msg = error instanceof Error ? error.message : String(error);
    if (!msg.includes('Missing or insufficient permissions')) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
}

export async function writeUsageEventToFirestore(event: UsageEventRecord): Promise<boolean> {
  const currentUser = auth.currentUser;
  if (!currentUser || !currentUser.emailVerified) {
    return false;
  }

  const sanitized = sanitizeUsageEventRecord({
    ...event,
    authorUid: sanitizeTelemetryId(currentUser.uid, 'uid'),
  });

  const path = `usageEvents/${sanitized.eventId}`;
  try {
    await setDoc(doc(db, 'usageEvents', sanitized.eventId), {
      eventId: sanitized.eventId,
      visitorId: sanitized.visitorId,
      authorUid: sanitized.authorUid,
      eventType: sanitized.eventType,
      fase: sanitized.fase,
      kelas: sanitized.kelas,
      semester: sanitized.semester,
      jenisUjian: sanitized.jenisUjian,
      elemenUtama: sanitized.elemenUtama,
      topikMateri: sanitized.topikMateri,
      namaSekolah: sanitized.namaSekolah,
      jumlahSoal: sanitized.jumlahSoal,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('Missing or insufficient permissions')) {
      // Document may already exist in Firestore (immutable append-only log)
      return false;
    }
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function recordTelemetryActivity(options: {
  eventType: UsageEventType;
  parameters: AssessmentParameters;
  pkg?: AssessmentPackage;
  namaSekolah?: string;
}): Promise<UsageEventRecord> {
  const { eventType, parameters, pkg, namaSekolah } = options;
  const visitorId = getOrCreateVisitorId();
  const currentUser = auth.currentUser;
  const eventId = sanitizeTelemetryId(
    `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    'evt'
  );

  const jumlahSoal = pkg
    ? pkg.butirSoal.length
    : Object.values(parameters.jumlahSoalPerBentuk || {}).reduce(
        (acc, val) => acc + (Number(val) || 0),
        0
      ) || 6;

  const eventRecord = sanitizeUsageEventRecord({
    eventId,
    visitorId,
    authorUid: currentUser?.uid || visitorId,
    eventType,
    fase: parameters.fase,
    kelas: parameters.kelas,
    semester: parameters.semester || 'Ganjil',
    jenisUjian: parameters.jenisUjian,
    elemenUtama: parameters.elemen?.[0] || "Al-Qur'an dan Hadis",
    topikMateri: parameters.topikMateri || pkg?.judulAsesmen || 'Asesmen PAIBP',
    namaSekolah: namaSekolah || 'SDN / SMPN / SMAN',
    jumlahSoal,
    createdAtIso: new Date().toISOString(),
  });

  // 1. Save immediately in browser localStorage
  const currentLocal = loadLocalTelemetryEvents();
  saveLocalTelemetryEvents([eventRecord, ...currentLocal]);

  // 2. Send non-blocking to Express server telemetry store so all visitors are captured
  fetch('/api/telemetry/record', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventRecord }),
  }).catch(() => {
    // Non-blocking background telemetry
  });

  // 3. If user is authenticated with verified Google account, write directly to Firestore
  if (currentUser && currentUser.emailVerified) {
    writeUsageEventToFirestore(eventRecord).catch(() => {
      // Handled gracefully
    });
  }

  return eventRecord;
}

export async function fetchAndSyncAllTelemetryEvents(): Promise<{
  events: UsageEventRecord[];
  firestoreSyncedCount: number;
  cloudConnected: boolean;
}> {
  const mergedMap = new Map<string, UsageEventRecord>();

  // 1. Load local events
  for (const ev of loadLocalTelemetryEvents()) {
    mergedMap.set(ev.eventId, ev);
  }

  // 2. Load server-recorded events across all visitors
  try {
    const res = await fetch('/api/telemetry/events');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.events)) {
        for (const rawEv of data.events) {
          const clean = sanitizeUsageEventRecord(rawEv);
          mergedMap.set(clean.eventId, clean);
        }
      }
    }
  } catch {
    // Fallback to local + Firestore
  }

  // 3. If Admin is signed into Firebase with verified Google email, read & sync with Firestore
  let firestoreSyncedCount = 0;
  let cloudConnected = false;
  const currentUser = auth.currentUser;

  if (
    currentUser &&
    currentUser.emailVerified &&
    currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  ) {
    const path = 'usageEvents';
    try {
      const q = query(collection(db, 'usageEvents'), where('eventId', '>=', ''));
      const snap = await getDocs(q);
      cloudConnected = true;

      const firestoreIds = new Set<string>();
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        firestoreIds.add(docSnap.id);
        let iso = new Date().toISOString();
        if (d.createdAt instanceof Timestamp) {
          iso = d.createdAt.toDate().toISOString();
        } else if (typeof d.createdAtIso === 'string') {
          iso = d.createdAtIso;
        }
        const record = sanitizeUsageEventRecord({
          eventId: d.eventId || docSnap.id,
          visitorId: d.visitorId,
          authorUid: d.authorUid,
          eventType: d.eventType,
          fase: d.fase,
          kelas: d.kelas,
          semester: d.semester,
          jenisUjian: d.jenisUjian,
          elemenUtama: d.elemenUtama,
          topikMateri: d.topikMateri,
          namaSekolah: d.namaSekolah,
          jumlahSoal: d.jumlahSoal,
          createdAtIso: iso,
        });
        mergedMap.set(record.eventId, record);
      });

      // Push up to 15 unsynced server/local events to Firestore on each sync pass
      const unsynced = Array.from(mergedMap.values())
        .filter((ev) => !firestoreIds.has(ev.eventId))
        .slice(0, 15);

      for (const ev of unsynced) {
        const ok = await writeUsageEventToFirestore(ev);
        if (ok) {
          firestoreIds.add(ev.eventId);
        }
      }
      firestoreSyncedCount = firestoreIds.size;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  }

  const allMerged = Array.from(mergedMap.values()).sort(
    (a, b) => Date.parse(b.createdAtIso) - Date.parse(a.createdAtIso)
  );
  saveLocalTelemetryEvents(allMerged);

  return {
    events: allMerged,
    firestoreSyncedCount,
    cloudConnected,
  };
}

export async function clearAllTelemetryEvents(): Promise<void> {
  saveLocalTelemetryEvents([]);
  try {
    await fetch('/api/telemetry/reset', { method: 'POST' });
  } catch {
    // Ignore
  }

  const currentUser = auth.currentUser;
  if (
    currentUser &&
    currentUser.emailVerified &&
    currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  ) {
    const path = 'usageEvents';
    try {
      const q = query(collection(db, 'usageEvents'), where('eventId', '>=', ''));
      const snap = await getDocs(q);
      for (const docSnap of snap.docs) {
        await deleteDoc(doc(db, 'usageEvents', docSnap.id));
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
}

export function buildAdminStatsExcelContent(events: UsageEventRecord[]): string {
  const esc = (val: unknown) =>
    String(val ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const rowsHtml = events
    .map(
      (ev, idx) => `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td>${esc(new Date(ev.createdAtIso).toLocaleString('id-ID'))}</td>
        <td>${esc(formatEventTypeLabel(ev.eventType))}</td>
        <td>${esc(ev.namaSekolah)}</td>
        <td>${esc(ev.fase)}</td>
        <td>${esc(ev.kelas)}</td>
        <td>${esc(ev.semester)}</td>
        <td>${esc(ev.jenisUjian)}</td>
        <td>${esc(ev.elemenUtama)}</td>
        <td>${esc(ev.topikMateri)}</td>
        <td style="text-align:center;">${ev.jumlahSoal}</td>
        <td>${esc(ev.visitorId)}</td>
      </tr>`
    )
    .join('');

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <style>
    table { border-collapse: collapse; font-family: "Times New Roman", serif; font-size: 11pt; }
    th, td { border: 1px solid #000000; padding: 6px 8px; vertical-align: top; }
    th { background-color: #064e3b; color: #ffffff; font-weight: bold; }
  </style>
</head>
<body>
  <h3>LAPORAN STATISTIK PENGGUNAAN APLIKASI — SMART PAI ASSESSOR</h3>
  <p>Dicetak oleh Administrator (${ADMIN_EMAIL}) · Tanggal: ${esc(
    new Date().toLocaleString('id-ID')
  )}</p>
  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>Waktu Aktivitas</th>
        <th>Jenis Aktivitas</th>
        <th>Nama Sekolah / Madrasah</th>
        <th>Fase</th>
        <th>Kelas</th>
        <th>Semester</th>
        <th>Jenis Asesmen</th>
        <th>Elemen PAIBP</th>
        <th>Topik / Paket Materi</th>
        <th>Jml Soal</th>
        <th>ID Perangkat Guru</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</body>
</html>`;
}
