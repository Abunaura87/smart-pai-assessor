import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { AssessmentParameters } from './src/types/assessment';
import { generateAssessmentWithGemini } from './src/server/geminiAssessor';
import { sanitizeUsageEventRecord, UsageEventRecord } from './src/utils/telemetryStats';
import {
  AUTHORIZED_ADMIN_EMAIL,
  computeAdminSecretDigest,
  verifyAdminCredentialsPure,
} from './src/utils/adminAuth';

const PORT = 3000;
const TELEMETRY_DATA_PATH = path.join(process.cwd(), 'public', 'assets', 'telemetry-store.json');
let serverCustomPasswordDigest: string | null = process.env.ADMIN_SECRET_PASSWORD
  ? computeAdminSecretDigest(process.env.ADMIN_SECRET_PASSWORD)
  : null;

function buildInitialSeedEvents(): UsageEventRecord[] {
  const now = Date.now();
  const h = 3600 * 1000;
  const d = 24 * h;

  const seeds: Partial<UsageEventRecord>[] = [
    {
      eventId: 'seed_evt_101',
      visitorId: 'guru_kkg_konsel_01',
      authorUid: 'guru_kkg_konsel_01',
      eventType: 'visit',
      fase: 'Fase A',
      kelas: 'Kelas 1 SD/MI',
      semester: 'Ganjil',
      jenisUjian: 'Sumatif Akhir Semester (SAS / PAS)',
      elemenUtama: "Al-Qur'an dan Hadis",
      topikMateri: '[PAKET SAS GANJIL KELAS 1] Gabungan 5 Elemen PAI Kelas 1 Semester Ganjil',
      namaSekolah: 'SD Negeri 1 Lalembuu',
      jumlahSoal: 15,
      createdAtIso: new Date(now - 5 * d).toISOString(),
    },
    {
      eventId: 'seed_evt_102',
      visitorId: 'guru_kkg_konsel_01',
      authorUid: 'guru_kkg_konsel_01',
      eventType: 'generate_soal',
      fase: 'Fase A',
      kelas: 'Kelas 1 SD/MI',
      semester: 'Ganjil',
      jenisUjian: 'Sumatif Akhir Semester (SAS / PAS)',
      elemenUtama: "Al-Qur'an dan Hadis",
      topikMateri: '[PAKET SAS GANJIL KELAS 1] Gabungan 5 Elemen PAI Kelas 1 Semester Ganjil',
      namaSekolah: 'SD Negeri 1 Lalembuu',
      jumlahSoal: 15,
      createdAtIso: new Date(now - 5 * d + 10 * 60000).toISOString(),
    },
    {
      eventId: 'seed_evt_103',
      visitorId: 'guru_kkg_konsel_01',
      authorUid: 'guru_kkg_konsel_01',
      eventType: 'export_word',
      fase: 'Fase A',
      kelas: 'Kelas 1 SD/MI',
      semester: 'Ganjil',
      jenisUjian: 'Sumatif Akhir Semester (SAS / PAS)',
      elemenUtama: "Al-Qur'an dan Hadis",
      topikMateri: '[PAKET SAS GANJIL KELAS 1] Gabungan 5 Elemen PAI Kelas 1 Semester Ganjil',
      namaSekolah: 'SD Negeri 1 Lalembuu',
      jumlahSoal: 15,
      createdAtIso: new Date(now - 5 * d + 15 * 60000).toISOString(),
    },
    {
      eventId: 'seed_evt_104',
      visitorId: 'guru_pai_sd04',
      authorUid: 'guru_pai_sd04',
      eventType: 'generate_soal',
      fase: 'Fase B',
      kelas: 'Kelas 4 SD/MI',
      semester: 'Ganjil',
      jenisUjian: 'Sumatif Akhir Semester (SAS / PAS)',
      elemenUtama: "Al-Qur'an dan Hadis",
      topikMateri: '[Bab 1 · Al-Qur\'an Hadis] Mari Kita Mengaji dan Mengkaji Q.S. Al-Hujurat/49: 13',
      namaSekolah: 'SD Negeri 4 Atari Jaya',
      jumlahSoal: 20,
      createdAtIso: new Date(now - 4 * d).toISOString(),
    },
    {
      eventId: 'seed_evt_105',
      visitorId: 'guru_pai_sd04',
      authorUid: 'guru_pai_sd04',
      eventType: 'export_excel',
      fase: 'Fase B',
      kelas: 'Kelas 4 SD/MI',
      semester: 'Ganjil',
      jenisUjian: 'Sumatif Akhir Semester (SAS / PAS)',
      elemenUtama: "Al-Qur'an dan Hadis",
      topikMateri: '[Bab 1 · Al-Qur\'an Hadis] Mari Kita Mengaji dan Mengkaji Q.S. Al-Hujurat/49: 13',
      namaSekolah: 'SD Negeri 4 Atari Jaya',
      jumlahSoal: 20,
      createdAtIso: new Date(now - 4 * d + 20 * 60000).toISOString(),
    },
    {
      eventId: 'seed_evt_106',
      visitorId: 'guru_pai_sd06',
      authorUid: 'guru_pai_sd06',
      eventType: 'generate_soal',
      fase: 'Fase C',
      kelas: 'Kelas 6 SD/MI',
      semester: 'Genap',
      jenisUjian: 'Ujian Sekolah (US / AAJ)',
      elemenUtama: 'Fikih',
      topikMateri: '[PAKET UJIAN SEKOLAH KELAS 6] Gabungan Komprehensif Fase A, B, dan C',
      namaSekolah: 'MIN 1 Konawe Selatan',
      jumlahSoal: 40,
      createdAtIso: new Date(now - 3 * d).toISOString(),
    },
    {
      eventId: 'seed_evt_107',
      visitorId: 'guru_pai_sd06',
      authorUid: 'guru_pai_sd06',
      eventType: 'export_pdf',
      fase: 'Fase C',
      kelas: 'Kelas 6 SD/MI',
      semester: 'Genap',
      jenisUjian: 'Ujian Sekolah (US / AAJ)',
      elemenUtama: 'Fikih',
      topikMateri: '[PAKET UJIAN SEKOLAH KELAS 6] Gabungan Komprehensif Fase A, B, dan C',
      namaSekolah: 'MIN 1 Konawe Selatan',
      jumlahSoal: 40,
      createdAtIso: new Date(now - 3 * d + 12 * 60000).toISOString(),
    },
    {
      eventId: 'seed_evt_108',
      visitorId: 'guru_mgmp_smp02',
      authorUid: 'guru_mgmp_smp02',
      eventType: 'generate_soal',
      fase: 'Fase D',
      kelas: 'Kelas 8 SMP/MTs',
      semester: 'Ganjil',
      jenisUjian: 'Asesmen Tengah Semester (ATS / PTS)',
      elemenUtama: 'Akhlak',
      topikMateri: '[PAKET SAS GANJIL KELAS 8] Gabungan 5 Elemen PAI Kelas 8 Semester Ganjil',
      namaSekolah: 'SMP Negeri 2 Lalembuu',
      jumlahSoal: 25,
      createdAtIso: new Date(now - 2 * d).toISOString(),
    },
    {
      eventId: 'seed_evt_109',
      visitorId: 'guru_mgmp_smp02',
      authorUid: 'guru_mgmp_smp02',
      eventType: 'export_word',
      fase: 'Fase D',
      kelas: 'Kelas 8 SMP/MTs',
      semester: 'Ganjil',
      jenisUjian: 'Asesmen Tengah Semester (ATS / PTS)',
      elemenUtama: 'Akhlak',
      topikMateri: '[PAKET SAS GANJIL KELAS 8] Gabungan 5 Elemen PAI Kelas 8 Semester Ganjil',
      namaSekolah: 'SMP Negeri 2 Lalembuu',
      jumlahSoal: 25,
      createdAtIso: new Date(now - 2 * d + 8 * 60000).toISOString(),
    },
    {
      eventId: 'seed_evt_110',
      visitorId: 'guru_mgmp_sma01',
      authorUid: 'guru_mgmp_sma01',
      eventType: 'generate_soal',
      fase: 'Fase E',
      kelas: 'Kelas 10 SMA/MA/SMK',
      semester: 'Ganjil',
      jenisUjian: 'Sumatif Akhir Semester (SAS / PAS)',
      elemenUtama: 'Sejarah Peradaban Islam',
      topikMateri: '[Bab 5 · SPI] Sejarah Masuknya Islam di Indonesia & Peran Wali Songo',
      namaSekolah: 'SMA Negeri 1 Konawe Selatan',
      jumlahSoal: 30,
      createdAtIso: new Date(now - 1 * d).toISOString(),
    },
    {
      eventId: 'seed_evt_111',
      visitorId: 'guru_mgmp_sma12',
      authorUid: 'guru_mgmp_sma12',
      eventType: 'generate_soal',
      fase: 'Fase F',
      kelas: 'Kelas 12 SMA/MA/SMK',
      semester: 'Genap',
      jenisUjian: 'Ujian Sekolah (US / AAJ)',
      elemenUtama: 'Akidah',
      topikMateri: '[PAKET UJIAN SEKOLAH KELAS 12] Gabungan Komprehensif Fase E & Fase F',
      namaSekolah: 'MAN 1 Kendari',
      jumlahSoal: 45,
      createdAtIso: new Date(now - 6 * h).toISOString(),
    },
    {
      eventId: 'seed_evt_112',
      visitorId: 'guru_mgmp_sma12',
      authorUid: 'guru_mgmp_sma12',
      eventType: 'export_excel',
      fase: 'Fase F',
      kelas: 'Kelas 12 SMA/MA/SMK',
      semester: 'Genap',
      jenisUjian: 'Ujian Sekolah (US / AAJ)',
      elemenUtama: 'Akidah',
      topikMateri: '[PAKET UJIAN SEKOLAH KELAS 12] Gabungan Komprehensif Fase E & Fase F',
      namaSekolah: 'MAN 1 Kendari',
      jumlahSoal: 45,
      createdAtIso: new Date(now - 5 * h).toISOString(),
    },
  ];

  return seeds.map((s) => sanitizeUsageEventRecord(s));
}

function loadServerTelemetryEvents(): UsageEventRecord[] {
  try {
    if (fs.existsSync(TELEMETRY_DATA_PATH)) {
      const raw = fs.readFileSync(TELEMETRY_DATA_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => sanitizeUsageEventRecord(item));
      }
    }
  } catch {
    // Fallback to seed events
  }
  const seeded = buildInitialSeedEvents();
  saveServerTelemetryEvents(seeded);
  return seeded;
}

function saveServerTelemetryEvents(events: UsageEventRecord[]): void {
  try {
    const dir = path.dirname(TELEMETRY_DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(TELEMETRY_DATA_PATH, JSON.stringify(events.slice(0, 500), null, 2), 'utf-8');
  } catch {
    // Ignore file write errors
  }
}

let telemetryEventsStore: UsageEventRecord[] = loadServerTelemetryEvents();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'smart-pai-assessor' });
  });

  app.get('/api/telemetry/events', (_req, res) => {
    res.json({ events: telemetryEventsStore });
  });

  app.post('/api/telemetry/record', (req, res) => {
    try {
      const incoming = req.body?.event;
      if (!incoming || typeof incoming !== 'object') {
        res.status(400).json({ error: 'Payload event tidak valid.' });
        return;
      }
      const cleanEvent = sanitizeUsageEventRecord(incoming);
      const filtered = telemetryEventsStore.filter((e) => e.eventId !== cleanEvent.eventId);
      telemetryEventsStore = [cleanEvent, ...filtered].slice(0, 500);
      saveServerTelemetryEvents(telemetryEventsStore);
      res.json({ ok: true, event: cleanEvent });
    } catch {
      res.status(500).json({ error: 'Gagal mencatat statistik.' });
    }
  });

  app.post('/api/telemetry/reset', (_req, res) => {
    telemetryEventsStore = [];
    saveServerTelemetryEvents([]);
    res.json({ ok: true });
  });

  app.post('/api/admin/verify', (req, res) => {
    try {
      const email = String(req.body?.email ?? '');
      const password = String(req.body?.password ?? '');
      const clientCustomDigest =
        typeof req.body?.customPasswordDigest === 'string' &&
        req.body.customPasswordDigest.startsWith('digest_v2_')
          ? req.body.customPasswordDigest
          : null;

      const check = verifyAdminCredentialsPure({
        email,
        password,
        customPasswordDigest: serverCustomPasswordDigest || clientCustomDigest,
      });

      if (!check.valid) {
        res.json({ ok: false, error: check.reason || 'Otorisasi ditolak.' });
        return;
      }

      res.json({ ok: true, email: AUTHORIZED_ADMIN_EMAIL });
    } catch {
      res.status(500).json({ ok: false, error: 'Gagal memverifikasi otorisasi admin.' });
    }
  });

  app.post('/api/admin/change-password', (req, res) => {
    try {
      const currentPassword = String(req.body?.currentPassword ?? '');
      const newPassword = String(req.body?.newPassword ?? '').trim();

      const check = verifyAdminCredentialsPure({
        email: AUTHORIZED_ADMIN_EMAIL,
        password: currentPassword,
        customPasswordDigest: serverCustomPasswordDigest,
      });

      if (!check.valid) {
        res.json({ ok: false, error: 'Kata sandi saat ini tidak sesuai.' });
        return;
      }

      if (newPassword.length < 8) {
        res.json({ ok: false, error: 'Kata sandi baru minimal 8 karakter.' });
        return;
      }

      serverCustomPasswordDigest = computeAdminSecretDigest(newPassword);
      res.json({ ok: true, digest: serverCustomPasswordDigest });
    } catch {
      res.status(500).json({ ok: false, error: 'Gagal memperbarui kata sandi.' });
    }
  });

  app.post('/api/assess/generate', async (req, res) => {
    try {
      const parameters = req.body?.parameters as AssessmentParameters | undefined;
      if (!parameters || !parameters.fase || !parameters.topikMateri) {
        res.status(400).json({ error: 'Parameter asesmen PAIBP tidak lengkap.' });
        return;
      }

      const result = await generateAssessmentWithGemini(parameters);
      res.json(result);
    } catch (error) {
      console.error('Failed to process /api/assess/generate:', error);
      res.status(500).json({ error: 'Gagal menyusun instrumen asesmen.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart PAI Assessor running on http://localhost:${PORT}`);
  });
}

startServer();
