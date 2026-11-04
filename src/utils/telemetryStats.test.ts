import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeUsageStatistics,
  sanitizeTelemetryId,
  sanitizeTelemetryString,
  sanitizeUsageEventRecord,
  UsageEventRecord,
} from './telemetryStats';

test('sanitizeTelemetryId enforces alphanumeric/underscore/hyphen and length <= 128', () => {
  assert.equal(sanitizeTelemetryId('evt_123-abc'), 'evt_123-abc');
  assert.equal(sanitizeTelemetryId('bad id with spaces!@#'), 'bad_id_with_spaces___');
  const oversized = 'a'.repeat(200);
  assert.equal(sanitizeTelemetryId(oversized).length, 128);
});

test('sanitizeTelemetryString trims and truncates to blueprint maxLength', () => {
  assert.equal(sanitizeTelemetryString('  Fase   D  ', 40, 'Fase A'), 'Fase D');
  assert.equal(sanitizeTelemetryString('', 40, 'Fase A'), 'Fase A');
  assert.equal(sanitizeTelemetryString('x'.repeat(300), 250, 'Default').length, 250);
});

test('computeUsageStatistics aggregates visits, generations, exports, and distributions accurately', () => {
  const sampleEvents: UsageEventRecord[] = [
    sanitizeUsageEventRecord({
      eventId: 'evt_1',
      visitorId: 'guru_1',
      authorUid: 'anon_1',
      eventType: 'visit',
      fase: 'Fase A',
      kelas: 'Kelas 1 SD/MI',
      semester: 'Ganjil',
      namaSekolah: 'SDN 1 Lalembuu',
      jumlahSoal: 6,
      createdAtIso: '2026-11-03T08:00:00.000Z',
    }),
    sanitizeUsageEventRecord({
      eventId: 'evt_2',
      visitorId: 'guru_1',
      authorUid: 'anon_1',
      eventType: 'generate_soal',
      fase: 'Fase A',
      kelas: 'Kelas 1 SD/MI',
      semester: 'Ganjil',
      jenisUjian: 'Sumatif Akhir Semester (SAS / PAS)',
      elemenUtama: "Al-Qur'an dan Hadis",
      topikMateri: '[PAKET SAS GANJIL KELAS 1] Gabungan 5 Elemen PAI',
      namaSekolah: 'SDN 1 Lalembuu',
      jumlahSoal: 10,
      createdAtIso: '2026-11-03T08:05:00.000Z',
    }),
    sanitizeUsageEventRecord({
      eventId: 'evt_3',
      visitorId: 'guru_2',
      authorUid: 'anon_2',
      eventType: 'export_excel',
      fase: 'Fase D',
      kelas: 'Kelas 8 SMP/MTs',
      semester: 'Genap',
      jenisUjian: 'Sumatif Akhir Tahun (SAT / PAT)',
      elemenUtama: 'Fikih',
      topikMateri: 'Zakat, Infak, Sedekah',
      namaSekolah: 'SMPN 2 Konawe Selatan',
      jumlahSoal: 15,
      createdAtIso: '2026-11-03T09:00:00.000Z',
    }),
    sanitizeUsageEventRecord({
      eventId: 'evt_4',
      visitorId: 'guru_2',
      authorUid: 'anon_2',
      eventType: 'export_word',
      fase: 'Fase D',
      kelas: 'Kelas 8 SMP/MTs',
      semester: 'Genap',
      jenisUjian: 'Sumatif Akhir Tahun (SAT / PAT)',
      elemenUtama: 'Fikih',
      topikMateri: 'Zakat, Infak, Sedekah',
      namaSekolah: 'SMPN 2 Konawe Selatan',
      jumlahSoal: 15,
      createdAtIso: '2026-11-03T09:02:00.000Z',
    }),
  ];

  const stats = computeUsageStatistics(sampleEvents);
  assert.equal(stats.totalEvents, 4);
  assert.equal(stats.uniqueVisitors, 2);
  assert.equal(stats.totalVisits, 2);
  assert.equal(stats.totalGenerated, 1);
  assert.equal(stats.totalExports, 2);
  assert.equal(stats.exportBreakdown.excel, 1);
  assert.equal(stats.exportBreakdown.word, 1);

  const faseD = stats.byFase.find((f) => f.label === 'Fase D');
  assert.ok(faseD);
  assert.equal(faseD.count, 2);

  const smtGenap = stats.bySemester.find((s) => s.label === 'Semester Genap');
  assert.ok(smtGenap);
  assert.equal(smtGenap.count, 2);
});
