export type UsageEventType =
  | 'visit'
  | 'generate_soal'
  | 'preset_load'
  | 'export_word'
  | 'export_excel'
  | 'export_pdf'
  | 'copy_naskah';

export const ALLOWED_EVENT_TYPES: readonly UsageEventType[] = [
  'visit',
  'generate_soal',
  'preset_load',
  'export_word',
  'export_excel',
  'export_pdf',
  'copy_naskah',
];

export const ID_REGEX = /^[a-zA-Z0-9_\-]+$/;

export interface UsageEventRecord {
  eventId: string;
  visitorId: string;
  authorUid: string;
  eventType: UsageEventType;
  fase: string;
  kelas: string;
  semester: string;
  jenisUjian: string;
  elemenUtama: string;
  topikMateri: string;
  namaSekolah: string;
  jumlahSoal: number;
  createdAtIso: string;
}

export type JenjangCode = 'SD' | 'SMP' | 'SMA';

export interface CategoryStatItem {
  label: string;
  count: number;
  percentage: number;
}

export interface DistributionChartItem extends CategoryStatItem {
  key: string;
  shortKey: string;
  fullLabel: string;
  jenjang: JenjangCode;
  susunSoal: number;
  unduhan: number;
  kunjungan: number;
  total: number;
}

export interface DailyActivityPoint {
  dateKey: string;
  label: string;
  visits: number;
  generations: number;
  exports: number;
  total: number;
}

export interface AggregatedUsageStats {
  totalEvents: number;
  totalVisits: number;
  uniqueVisitors: number;
  totalGenerated: number;
  totalExports: number;
  exportBreakdown: {
    word: number;
    excel: number;
    pdf: number;
    copy: number;
  };
  byJenjang: DistributionChartItem[];
  byFase: DistributionChartItem[];
  byKelas: CategoryStatItem[];
  bySemester: CategoryStatItem[];
  byJenisUjian: CategoryStatItem[];
  byElemen: CategoryStatItem[];
  topSchools: CategoryStatItem[];
  dailyTrend: DailyActivityPoint[];
  recentEvents: UsageEventRecord[];
}

export function resolveJenjangFromEvent(
  fase: string,
  kelas = '',
  namaSekolah = ''
): JenjangCode {
  const normFase = String(fase ?? '').trim().toUpperCase();
  if (normFase.includes('FASE D') || normFase === 'D') {
    return 'SMP';
  }
  if (
    normFase.includes('FASE E') ||
    normFase.includes('FASE F') ||
    normFase === 'E' ||
    normFase === 'F'
  ) {
    return 'SMA';
  }
  if (
    normFase.includes('FASE A') ||
    normFase.includes('FASE B') ||
    normFase.includes('FASE C') ||
    normFase === 'A' ||
    normFase === 'B' ||
    normFase === 'C'
  ) {
    return 'SD';
  }

  const combined = `${kelas} ${namaSekolah}`.toUpperCase();
  if (/\b(SMP|SMPN|MTS|MTSN|KELAS 7|KELAS 8|KELAS 9)\b/.test(combined)) {
    return 'SMP';
  }
  if (/\b(SMA|SMAN|SMK|SMKN|MA|MAN|KELAS 10|KELAS 11|KELAS 12)\b/.test(combined)) {
    return 'SMA';
  }
  return 'SD';
}

export function sanitizeTelemetryId(raw: unknown, fallbackPrefix = 'id'): string {
  const cleaned = String(raw ?? '')
    .trim()
    .replace(/[^a-zA-Z0-9_\-]/g, '_')
    .slice(0, 128);
  if (cleaned.length >= 1 && ID_REGEX.test(cleaned)) {
    return cleaned;
  }
  return `${fallbackPrefix}_${Date.now()}`;
}

export function sanitizeTelemetryString(
  raw: unknown,
  maxLength: number,
  fallback: string
): string {
  const str = String(raw ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!str) {
    return fallback.slice(0, maxLength);
  }
  return str.slice(0, maxLength);
}

export function sanitizeUsageEventRecord(input: Partial<UsageEventRecord>): UsageEventRecord {
  const rawType = input.eventType;
  const validType: UsageEventType = ALLOWED_EVENT_TYPES.includes(rawType as UsageEventType)
    ? (rawType as UsageEventType)
    : 'visit';

  const rawSoal = Number(input.jumlahSoal);
  const jumlahSoal = Number.isFinite(rawSoal)
    ? Math.max(0, Math.min(200, Math.round(rawSoal)))
    : 0;

  return {
    eventId: sanitizeTelemetryId(input.eventId, 'evt'),
    visitorId: sanitizeTelemetryId(input.visitorId, 'vis'),
    authorUid: sanitizeTelemetryId(input.authorUid, 'anon'),
    eventType: validType,
    fase: sanitizeTelemetryString(input.fase, 40, 'Fase A'),
    kelas: sanitizeTelemetryString(input.kelas, 60, 'Kelas 1 SD/MI'),
    semester: sanitizeTelemetryString(input.semester, 40, 'Ganjil'),
    jenisUjian: sanitizeTelemetryString(
      input.jenisUjian,
      80,
      'Sumatif Akhir Semester (SAS / PAS)'
    ),
    elemenUtama: sanitizeTelemetryString(input.elemenUtama, 120, "Al-Qur'an dan Hadis"),
    topikMateri: sanitizeTelemetryString(
      input.topikMateri,
      250,
      'Paket Instrumen Asesmen PAIBP'
    ),
    namaSekolah: sanitizeTelemetryString(input.namaSekolah, 160, 'SDN / SMPN / SMAN'),
    jumlahSoal,
    createdAtIso:
      input.createdAtIso && !Number.isNaN(Date.parse(input.createdAtIso))
        ? new Date(input.createdAtIso).toISOString()
        : new Date().toISOString(),
  };
}

function buildSortedCategoryStats(
  countsMap: Map<string, number>,
  totalDenominator: number,
  fixedOrder?: string[]
): CategoryStatItem[] {
  const denom = Math.max(1, totalDenominator);
  if (fixedOrder && fixedOrder.length > 0) {
    return fixedOrder.map((key) => {
      const count = countsMap.get(key) ?? 0;
      return {
        label: key,
        count,
        percentage: Math.round((count / denom) * 100),
      };
    });
  }

  return Array.from(countsMap.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / denom) * 100),
    }));
}

const FASE_METADATA: ReadonlyArray<{
  key: string;
  shortKey: string;
  label: string;
  fullLabel: string;
  jenjang: JenjangCode;
}> = [
  {
    key: 'Fase A',
    shortKey: 'Fase A',
    label: 'Fase A',
    fullLabel: 'Fase A (Kelas 1–2 SD/MI)',
    jenjang: 'SD',
  },
  {
    key: 'Fase B',
    shortKey: 'Fase B',
    label: 'Fase B',
    fullLabel: 'Fase B (Kelas 3–4 SD/MI)',
    jenjang: 'SD',
  },
  {
    key: 'Fase C',
    shortKey: 'Fase C',
    label: 'Fase C',
    fullLabel: 'Fase C (Kelas 5–6 SD/MI)',
    jenjang: 'SD',
  },
  {
    key: 'Fase D',
    shortKey: 'Fase D',
    label: 'Fase D',
    fullLabel: 'Fase D (Kelas 7–9 SMP/MTs)',
    jenjang: 'SMP',
  },
  {
    key: 'Fase E',
    shortKey: 'Fase E',
    label: 'Fase E',
    fullLabel: 'Fase E (Kelas 10 SMA/SMK/MA)',
    jenjang: 'SMA',
  },
  {
    key: 'Fase F',
    shortKey: 'Fase F',
    label: 'Fase F',
    fullLabel: 'Fase F (Kelas 11–12 SMA/SMK/MA)',
    jenjang: 'SMA',
  },
];

const JENJANG_METADATA: ReadonlyArray<{
  key: JenjangCode;
  shortKey: string;
  label: string;
  fullLabel: string;
  jenjang: JenjangCode;
}> = [
  {
    key: 'SD',
    shortKey: 'SD/MI',
    label: 'SD / MI',
    fullLabel: 'SD / MI (Fase A, B, C · Kelas 1–6)',
    jenjang: 'SD',
  },
  {
    key: 'SMP',
    shortKey: 'SMP/MTs',
    label: 'SMP / MTs',
    fullLabel: 'SMP / MTs (Fase D · Kelas 7–9)',
    jenjang: 'SMP',
  },
  {
    key: 'SMA',
    shortKey: 'SMA/SMK',
    label: 'SMA / SMK / MA',
    fullLabel: 'SMA / SMK / MA (Fase E, F · Kelas 10–12)',
    jenjang: 'SMA',
  },
];

export function computeUsageStatistics(events: UsageEventRecord[]): AggregatedUsageStats {
  const deduplicatedMap = new Map<string, UsageEventRecord>();
  for (const ev of events) {
    if (ev && ev.eventId) {
      deduplicatedMap.set(ev.eventId, sanitizeUsageEventRecord(ev));
    }
  }

  const allEvents = Array.from(deduplicatedMap.values()).sort(
    (a, b) => Date.parse(b.createdAtIso) - Date.parse(a.createdAtIso)
  );

  const visitorSet = new Set<string>();
  let totalVisits = 0;
  let totalGenerated = 0;
  let wordExports = 0;
  let excelExports = 0;
  let pdfExports = 0;
  let copyExports = 0;

  const faseBreakdown = new Map<
    string,
    { susunSoal: number; unduhan: number; kunjungan: number }
  >();
  for (const meta of FASE_METADATA) {
    faseBreakdown.set(meta.key, { susunSoal: 0, unduhan: 0, kunjungan: 0 });
  }

  const jenjangBreakdown = new Map<
    JenjangCode,
    { susunSoal: number; unduhan: number; kunjungan: number }
  >();
  for (const meta of JENJANG_METADATA) {
    jenjangBreakdown.set(meta.key, { susunSoal: 0, unduhan: 0, kunjungan: 0 });
  }

  const kelasCounts = new Map<string, number>();
  const semesterCounts = new Map<string, number>();
  const ujianCounts = new Map<string, number>();
  const elemenCounts = new Map<string, number>();
  const schoolCounts = new Map<string, number>();

  for (const ev of allEvents) {
    visitorSet.add(ev.visitorId);

    const normalizedFase = FASE_METADATA.some((m) => m.key === ev.fase) ? ev.fase : 'Fase A';
    const fBucket = faseBreakdown.get(normalizedFase)!;
    const jenjangCode = resolveJenjangFromEvent(normalizedFase, ev.kelas, ev.namaSekolah);
    const jBucket = jenjangBreakdown.get(jenjangCode)!;

    if (ev.eventType === 'visit') {
      totalVisits += 1;
      fBucket.kunjungan += 1;
      jBucket.kunjungan += 1;
    } else if (ev.eventType === 'generate_soal' || ev.eventType === 'preset_load') {
      totalGenerated += 1;
      fBucket.susunSoal += 1;
      jBucket.susunSoal += 1;
    } else if (ev.eventType === 'export_word') {
      wordExports += 1;
      fBucket.unduhan += 1;
      jBucket.unduhan += 1;
    } else if (ev.eventType === 'export_excel') {
      excelExports += 1;
      fBucket.unduhan += 1;
      jBucket.unduhan += 1;
    } else if (ev.eventType === 'export_pdf') {
      pdfExports += 1;
      fBucket.unduhan += 1;
      jBucket.unduhan += 1;
    } else if (ev.eventType === 'copy_naskah') {
      copyExports += 1;
      fBucket.unduhan += 1;
      jBucket.unduhan += 1;
    }

    // Count curriculum distribution across substantive assessment actions
    if (ev.eventType !== 'visit') {
      kelasCounts.set(ev.kelas, (kelasCounts.get(ev.kelas) ?? 0) + 1);
      const normSmt =
        ev.semester === 'Semua'
          ? 'Gabungan (Ganjil & Genap)'
          : ev.semester.includes('Genap')
          ? 'Semester Genap'
          : 'Semester Ganjil';
      semesterCounts.set(normSmt, (semesterCounts.get(normSmt) ?? 0) + 1);
      ujianCounts.set(ev.jenisUjian, (ujianCounts.get(ev.jenisUjian) ?? 0) + 1);
      elemenCounts.set(ev.elemenUtama, (elemenCounts.get(ev.elemenUtama) ?? 0) + 1);
    }

    if (ev.namaSekolah && ev.namaSekolah.trim().length > 0) {
      schoolCounts.set(ev.namaSekolah, (schoolCounts.get(ev.namaSekolah) ?? 0) + 1);
    }
  }

  // Ensure totalVisits is at least uniqueVisitors if someone directly triggered an action
  const effectiveVisits = Math.max(totalVisits, visitorSet.size);
  const totalExports = wordExports + excelExports + pdfExports + copyExports;
  const curriculumActionCount = allEvents.filter((e) => e.eventType !== 'visit').length;
  const totalEventsDenom = Math.max(1, allEvents.length);

  const byFase: DistributionChartItem[] = FASE_METADATA.map((meta) => {
    const b = faseBreakdown.get(meta.key) ?? { susunSoal: 0, unduhan: 0, kunjungan: 0 };
    const substantive = b.susunSoal + b.unduhan;
    const total = substantive + b.kunjungan;
    const count = curriculumActionCount > 0 ? substantive : total;
    return {
      key: meta.key,
      shortKey: meta.shortKey,
      label: meta.label,
      fullLabel: meta.fullLabel,
      jenjang: meta.jenjang,
      susunSoal: b.susunSoal,
      unduhan: b.unduhan,
      kunjungan: b.kunjungan,
      count,
      total,
      percentage: Math.round((total / totalEventsDenom) * 100),
    };
  });

  const byJenjang: DistributionChartItem[] = JENJANG_METADATA.map((meta) => {
    const b = jenjangBreakdown.get(meta.key) ?? { susunSoal: 0, unduhan: 0, kunjungan: 0 };
    const substantive = b.susunSoal + b.unduhan;
    const total = substantive + b.kunjungan;
    const count = curriculumActionCount > 0 ? substantive : total;
    return {
      key: meta.key,
      shortKey: meta.shortKey,
      label: meta.label,
      fullLabel: meta.fullLabel,
      jenjang: meta.jenjang,
      susunSoal: b.susunSoal,
      unduhan: b.unduhan,
      kunjungan: b.kunjungan,
      count,
      total,
      percentage: Math.round((total / totalEventsDenom) * 100),
    };
  });

  const bySemester = buildSortedCategoryStats(semesterCounts, curriculumActionCount, [
    'Semester Ganjil',
    'Semester Genap',
    'Gabungan (Ganjil & Genap)',
  ]);

  const byElemen = buildSortedCategoryStats(elemenCounts, curriculumActionCount, [
    "Al-Qur'an dan Hadis",
    'Akidah',
    'Akhlak',
    'Fikih',
    'Sejarah Peradaban Islam',
  ]);

  const byKelas = buildSortedCategoryStats(kelasCounts, curriculumActionCount).slice(0, 12);
  const byJenisUjian = buildSortedCategoryStats(ujianCounts, curriculumActionCount);
  const topSchools = buildSortedCategoryStats(schoolCounts, allEvents.length).slice(0, 10);

  // Build 7-day trend ending at most recent event date or today
  const referenceTime =
    allEvents.length > 0 ? Math.max(...allEvents.map((e) => Date.parse(e.createdAtIso))) : Date.now();
  const baseDate = new Date(referenceTime);
  const dailyMap = new Map<string, DailyActivityPoint>();

  for (let offset = 6; offset >= 0; offset -= 1) {
    const d = new Date(baseDate);
    d.setUTCDate(d.getUTCDate() - offset);
    const dateKey = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      timeZone: 'UTC',
    });
    dailyMap.set(dateKey, {
      dateKey,
      label,
      visits: 0,
      generations: 0,
      exports: 0,
      total: 0,
    });
  }

  for (const ev of allEvents) {
    const dateKey = ev.createdAtIso.slice(0, 10);
    const point = dailyMap.get(dateKey);
    if (point) {
      point.total += 1;
      if (ev.eventType === 'visit') {
        point.visits += 1;
      } else if (ev.eventType === 'generate_soal' || ev.eventType === 'preset_load') {
        point.generations += 1;
      } else {
        point.exports += 1;
      }
    }
  }

  return {
    totalEvents: allEvents.length,
    totalVisits: effectiveVisits,
    uniqueVisitors: visitorSet.size,
    totalGenerated,
    totalExports,
    exportBreakdown: {
      word: wordExports,
      excel: excelExports,
      pdf: pdfExports,
      copy: copyExports,
    },
    byJenjang,
    byFase,
    byKelas,
    bySemester,
    byJenisUjian,
    byElemen,
    topSchools,
    dailyTrend: Array.from(dailyMap.values()),
    recentEvents: allEvents.slice(0, 100),
  };
}

export function formatEventTypeLabel(eventType: UsageEventType): string {
  switch (eventType) {
    case 'visit':
      return 'Kunjungan Aplikasi';
    case 'generate_soal':
      return 'Susun Paket Soal Baru';
    case 'preset_load':
      return 'Muat Paket Kurikulum';
    case 'export_word':
      return 'Unduh MS Word (.doc)';
    case 'export_excel':
      return 'Unduh MS Excel (.xls)';
    case 'export_pdf':
      return 'Cetak / Simpan PDF';
    case 'copy_naskah':
      return 'Salin Naskah Soal';
  }
}
