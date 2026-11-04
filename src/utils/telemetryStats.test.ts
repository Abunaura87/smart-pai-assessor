import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeUsageStatistics,
  resolveJenjangFromEvent,
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

test('resolveJenjangFromEvent maps Fase A-F and Kelas/Sekolah accurately to SD, SMP, and SMA', () => {
  assert.equal(resolveJenjangFromEvent('Fase A', 'Kelas 1 SD/MI'), 'SD');
  assert.equal(resolveJenjangFromEvent('Fase B', 'Kelas 4 SD/MI'), 'SD');
  assert.equal(resolveJenjangFromEvent('Fase C', 'Kelas 6 SD/MI'), 'SD');
  assert.equal(resolveJenjangFromEvent('Fase D', 'Kelas 8 SMP/MTs'), 'SMP');
  assert.equal(resolveJenjangFromEvent('Fase E', 'Kelas 10 SMA/SMK/MA'), 'SMA');
  assert.equal(resolveJenjangFromEvent('Fase F', 'Kelas 12 SMA/SMK/MA'), 'SMA');
  assert.equal(resolveJenjangFromEvent('', 'Kelas 7 SMP', 'SMPN 1'), 'SMP');
  assert.equal(resolveJenjangFromEvent('', 'Kelas 11 SMA', 'SMAN 2'), 'SMA');
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
    sanitizeUsageEventRecord({
      eventId: 'evt_5',
      visitorId: 'guru_3',
      authorUid: 'anon_3',
      eventType: 'export_pdf',
      fase: 'Fase F',
      kelas: 'Kelas 12 SMA/SMK/MA',
      semester: 'Genap',
      jenisUjian: 'Ujian Sekolah (US)',
      elemenUtama: 'Akidah',
      topikMateri: 'Moderasi Beragama',
      namaSekolah: 'SMAN 1 Andoolo',
      jumlahSoal: 40,
      createdAtIso: '2026-11-03T10:00:00.000Z',
    }),
  ];

  const stats = computeUsageStatistics(sampleEvents);
  assert.equal(stats.totalEvents, 5);
  assert.equal(stats.uniqueVisitors, 3);
  assert.equal(stats.totalVisits, 3);
  assert.equal(stats.totalGenerated, 1);
  assert.equal(stats.totalExports, 3);
  assert.equal(stats.exportBreakdown.excel, 1);
  assert.equal(stats.exportBreakdown.word, 1);
  assert.equal(stats.exportBreakdown.pdf, 1);

  assert.equal(stats.byFase.length, 6);
  const faseA = stats.byFase.find((f) => f.label === 'Fase A');
  assert.ok(faseA);
  assert.equal(faseA.susunSoal, 1);
  assert.equal(faseA.kunjungan, 1);
  assert.equal(faseA.total, 2);

  const faseD = stats.byFase.find((f) => f.label === 'Fase D');
  assert.ok(faseD);
  assert.equal(faseD.count, 2);
  assert.equal(faseD.unduhan, 2);
  assert.equal(faseD.jenjang, 'SMP');

  assert.equal(stats.byJenjang.length, 3);
  const jenjangSD = stats.byJenjang.find((j) => j.key === 'SD');
  const jenjangSMP = stats.byJenjang.find((j) => j.key === 'SMP');
  const jenjangSMA = stats.byJenjang.find((j) => j.key === 'SMA');
  assert.ok(jenjangSD && jenjangSMP && jenjangSMA);
  assert.equal(jenjangSD.susunSoal, 1);
  assert.equal(jenjangSD.kunjungan, 1);
  assert.equal(jenjangSD.count, 1);
  assert.equal(jenjangSMP.unduhan, 2);
  assert.equal(jenjangSMP.count, 2);
  assert.equal(jenjangSMA.unduhan, 1);
  assert.equal(jenjangSMA.count, 1);

  const smtGenap = stats.bySemester.find((s) => s.label === 'Semester Genap');
  assert.ok(smtGenap);
  assert.equal(smtGenap.count, 3);
});

