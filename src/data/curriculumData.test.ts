import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CURRICULUM_DATABASE_CP020,
  getTopicsForFaseAndKelas,
  isPaketGabunganTopic,
} from './curriculumData';
import {
  buildCustomFallbackPackage,
  CURRICULUM_TOPICS_BY_CLASS_SEMESTER,
  PAKET_SAS_SAT_US_OPTIONS,
} from './presetPackages';
import { FaseCode } from '../types/assessment';

test('CURRICULUM_DATABASE_CP020 has 120+ official entries across all 12 grades and 2 semesters', () => {
  assert.ok(
    CURRICULUM_DATABASE_CP020.length >= 120,
    `Database should contain at least 120 official curriculum topics (found ${CURRICULUM_DATABASE_CP020.length})`
  );

  const phases: FaseCode[] = ['Fase A', 'Fase B', 'Fase C', 'Fase D', 'Fase E', 'Fase F'];
  for (const f of phases) {
    const topicsInFase = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === f);
    assert.ok(
      topicsInFase.length >= 14,
      `Fase ${f} must have at least 14 official curriculum topics (found ${topicsInFase.length})`
    );
  }

  for (const topic of CURRICULUM_DATABASE_CP020) {
    assert.ok(topic.id, 'Topic must have an ID');
    assert.ok(topic.judulTopik.length > 5, `Topic ${topic.id} has invalid judulTopik`);
    assert.ok(topic.materiPokok.length > 5, `Topic ${topic.id} has invalid materiPokok`);
    assert.ok(topic.rumusanTP.length > 15, `Topic ${topic.id} has invalid rumusanTP`);
    assert.ok(topic.elemen.length >= 1, `Topic ${topic.id} must map to at least 1 PAI element`);
    assert.ok(
      !topic.rumusanTP.toLowerCase().includes('peserta didik'),
      `Topic ${topic.id} rumusanTP must use "Murid" instead of "Peserta Didik"`
    );
  }
});

test('Every grade (Kelas 1 to Kelas 12) has at least 6-7 topics per semester including Paket SAS/SAT and 5 Bab PAI', () => {
  const gradeMatrix: { fase: FaseCode; kelas: string }[] = [
    { fase: 'Fase A', kelas: 'Kelas 1 SD/MI' },
    { fase: 'Fase A', kelas: 'Kelas 2 SD/MI' },
    { fase: 'Fase B', kelas: 'Kelas 3 SD/MI' },
    { fase: 'Fase B', kelas: 'Kelas 4 SD/MI' },
    { fase: 'Fase C', kelas: 'Kelas 5 SD/MI' },
    { fase: 'Fase C', kelas: 'Kelas 6 SD/MI' },
    { fase: 'Fase D', kelas: 'Kelas 7 SMP/MTs' },
    { fase: 'Fase D', kelas: 'Kelas 8 SMP/MTs' },
    { fase: 'Fase D', kelas: 'Kelas 9 SMP/MTs' },
    { fase: 'Fase E', kelas: 'Kelas 10 SMA/MA' },
    { fase: 'Fase F', kelas: 'Kelas 11 SMA/MA' },
    { fase: 'Fase F', kelas: 'Kelas 12 SMA/MA' },
  ];

  for (const { fase, kelas } of gradeMatrix) {
    const ganjilTopics = getTopicsForFaseAndKelas(fase, kelas, 'Ganjil');
    const genapTopics = getTopicsForFaseAndKelas(fase, kelas, 'Genap');

    assert.ok(
      ganjilTopics.length >= 6,
      `${kelas} Semester Ganjil must have at least 6 options (found ${ganjilTopics.length})`
    );
    assert.ok(
      genapTopics.length >= 6,
      `${kelas} Semester Genap must have at least 6 options (found ${genapTopics.length})`
    );

    // First option in each semester must be a combined [PAKET ...] with all 5 PAI elements
    assert.ok(
      isPaketGabunganTopic(ganjilTopics[0].judulTopik),
      `${kelas} Ganjil first option must be a combined [PAKET SAS] option`
    );
    assert.equal(ganjilTopics[0].elemen.length, 5, `${kelas} Ganjil SAS package must cover all 5 PAI elements`);

    assert.ok(
      isPaketGabunganTopic(genapTopics[0].judulTopik),
      `${kelas} Genap first option must be a combined [PAKET SAT/US] option`
    );
    assert.equal(genapTopics[0].elemen.length, 5, `${kelas} Genap SAT/US package must cover all 5 PAI elements`);
  }
});

test('getTopicsForFaseAndKelas correctly filters topics by grade and phase', () => {
  const kls5Topics = getTopicsForFaseAndKelas('Fase C', 'Kelas 5 SD/MI');
  assert.ok(kls5Topics.length >= 12, 'Kelas 5 SD must have at least 12 total topics across 2 semesters');
  assert.ok(kls5Topics.every((t) => t.fase === 'Fase C'));
  assert.ok(kls5Topics.some((t) => t.judulTopik.includes('Al-Ma\'un')));
  assert.ok(kls5Topics.some((t) => t.judulTopik.includes('Zakat Fitrah')));

  const kls6Topics = getTopicsForFaseAndKelas('Fase C', 'Kelas 6 SD/MI');
  assert.ok(kls6Topics.length >= 12, 'Kelas 6 SD must have at least 12 total topics across 2 semesters');
  assert.ok(kls6Topics.every((t) => t.fase === 'Fase C'));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('Halal dan Haram')));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('Khulafaurrasyidin')));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('Qada dan Qadar')));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('Sampah Plastik')));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('PAKET US')));

  const kls7Topics = getTopicsForFaseAndKelas('Fase D', 'Kelas 7 SMP/MTs');
  assert.ok(kls7Topics.some((t) => t.judulTopik.includes('Tabayyun') || t.judulTopik.includes('Perundungan')));
  assert.ok(kls7Topics.some((t) => t.judulTopik.includes('Malaikat')));

  const kls11Topics = getTopicsForFaseAndKelas('Fase F', 'Kelas 11 SMA/MA');
  assert.ok(kls11Topics.some((t) => t.judulTopik.includes('Khamr') || t.judulTopik.includes('Narkoba')));
  assert.ok(kls11Topics.some((t) => t.judulTopik.includes('Munakahat') || t.judulTopik.includes('Pernikahan')));
});

test('Required CP 020/2026 flagship topics exist in curriculum database', () => {
  const faseATopics = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === 'Fase A');
  assert.ok(faseATopics.some((t) => t.judulTopik.includes('Hijaiah')));
  assert.ok(faseATopics.some((t) => t.judulTopik.includes('Bersuci') || t.judulTopik.includes('Wudu')));
  assert.ok(faseATopics.some((t) => t.judulTopik.includes('Adam')));

  const faseBTopics = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === 'Fase B');
  assert.ok(faseBTopics.some((t) => t.judulTopik.includes('Alaq')));
  assert.ok(faseBTopics.some((t) => t.judulTopik.includes('Balig')));
  assert.ok(faseBTopics.some((t) => t.judulTopik.includes('Ulul Azmi')));

  const faseCTopics = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === 'Fase C');
  assert.ok(faseCTopics.some((t) => t.judulTopik.includes('Zakat Fitrah')));
  assert.ok(faseCTopics.some((t) => t.judulTopik.includes('Fathu Makkah')));
  assert.ok(faseCTopics.some((t) => t.judulTopik.includes('Lingkungan')));

  const faseDTopics = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === 'Fase D');
  assert.ok(faseDTopics.some((t) => t.judulTopik.includes('Tabayyun')));
  assert.ok(faseDTopics.some((t) => t.judulTopik.includes('Abbasiyah')));
  assert.ok(faseDTopics.some((t) => t.judulTopik.includes('Tradisi Islam di Nusantara')));

  const highSchoolTopics = CURRICULUM_DATABASE_CP020.filter(
    (t) => t.fase === 'Fase E' || t.fase === 'Fase F'
  );
  assert.ok(highSchoolTopics.some((t) => t.judulTopik.includes('Syu\'abul Iman')));
  assert.ok(highSchoolTopics.some((t) => t.judulTopik.includes('Maqashid Syariah')));
  assert.ok(highSchoolTopics.some((t) => t.judulTopik.includes('Koperasi Syariah') || t.judulTopik.includes('Ekonomi Syariah')));
  assert.ok(highSchoolTopics.some((t) => t.judulTopik.includes('Kewarisan') || t.judulTopik.includes('Mawaris')));
});

test('getTopicsForFaseAndKelas filters strictly by Semester Ganjil vs Genap and Paket SAS distributes 5 elements', () => {
  const kls5Ganjil = getTopicsForFaseAndKelas('Fase C', 'Kelas 5 SD/MI', 'Ganjil');
  const kls5Genap = getTopicsForFaseAndKelas('Fase C', 'Kelas 5 SD/MI', 'Genap');
  const kls5Semua = getTopicsForFaseAndKelas('Fase C', 'Kelas 5 SD/MI', 'Semua');

  assert.equal(kls5Ganjil.length, 7, 'Kelas 5 Ganjil must have 7 options (Paket SAS + Paket ATS + 5 Bab)');
  assert.equal(kls5Genap.length, 7, 'Kelas 5 Genap must have 7 options (Paket SAT + Paket ATS + 5 Bab)');
  assert.ok(kls5Ganjil.every((t) => t.semester === 'Ganjil'));
  assert.ok(kls5Genap.every((t) => t.semester === 'Genap'));
  assert.equal(kls5Semua.length, kls5Ganjil.length + kls5Genap.length);

  // Verify that selecting [PAKET SAS GANJIL KELAS 5] distributes across all 5 PAI elements
  const paketSAS = kls5Ganjil[0];
  const generatedPkg = buildCustomFallbackPackage({
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    jenjang: 'SD/MI',
    elemen: paketSAS.elemen,
    jenisUjian: 'Sumatif Akhir Semester (SAS)',
    topikMateri: paketSAS.judulTopik,
    capaianPembelajaranOpsional: paketSAS.rumusanTP,
    nilaiModerasiFokus: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
    bentukSoalCounts: [{ bentuk: 'Pilihan Ganda', jumlah: 5 }],
    komposisiKesulitan: { mudahL1: 30, sedangL2: 50, hotsL3: 20 },
  });

  const uniqueElements = new Set(generatedPkg.butirSoal.map((q) => q.elemen));
  assert.equal(uniqueElements.size, 5, '5 questions in Paket SAS must span all 5 PAI elements evenly');
});

test('presetPackages.ts exports CURRICULUM_TOPICS_BY_CLASS_SEMESTER and PAKET_SAS_SAT_US_OPTIONS for all levels', () => {
  assert.ok(PAKET_SAS_SAT_US_OPTIONS.length >= 48, 'Must include at least 48 combined PAKET SAS/SAT/US/ATS options');
  const classesToCheck = [
    'Kelas 1 SD/MI',
    'Kelas 2 SD/MI',
    'Kelas 3 SD/MI',
    'Kelas 4 SD/MI',
    'Kelas 5 SD/MI',
    'Kelas 6 SD/MI',
    'Kelas 7 SMP/MTs',
    'Kelas 8 SMP/MTs',
    'Kelas 9 SMP/MTs',
    'Kelas 10 SMA/MA',
    'Kelas 11 SMA/MA',
    'Kelas 12 SMA/MA',
    'Kelas 12 SMK/MAK',
  ];

  for (const kls of classesToCheck) {
    const entry = CURRICULUM_TOPICS_BY_CLASS_SEMESTER[kls];
    assert.ok(entry, `CURRICULUM_TOPICS_BY_CLASS_SEMESTER must contain ${kls}`);
    assert.ok(entry.Ganjil.length >= 7, `${kls} Ganjil must have at least 7 options`);
    assert.ok(entry.Genap.length >= 7, `${kls} Genap must have at least 7 options`);
    assert.ok(entry.paketUjianOptions.length >= 4, `${kls} must have at least 4 PAKET SAS/SAT/US/ATS options`);
  }

  // Test PAKET US generation for Kelas 6 SD/MI
  const kls6US = CURRICULUM_TOPICS_BY_CLASS_SEMESTER['Kelas 6 SD/MI'].paketUjianOptions.find((t) =>
    t.judulTopik.includes('PAKET US')
  );
  assert.ok(kls6US, 'Kelas 6 SD/MI must have a PAKET US option');
  const usPkg = buildCustomFallbackPackage({
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    jenjang: 'SD/MI',
    elemen: kls6US.elemen,
    jenisUjian: 'Asesmen Akhir Jenjang (AAJ / Ujian Praktik)',
    topikMateri: kls6US.judulTopik,
    capaianPembelajaranOpsional: kls6US.rumusanTP,
    nilaiModerasiFokus: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
    bentukSoalCounts: [
      { bentuk: 'Pilihan Ganda', jumlah: 5 },
      { bentuk: 'Uraian', jumlah: 1 },
    ],
    komposisiKesulitan: { mudahL1: 30, sedangL2: 50, hotsL3: 20 },
  });
  assert.equal(usPkg.kisiKisi.length, 6);
  const usElements = new Set(usPkg.kisiKisi.map((r) => r.elemen));
  assert.equal(usElements.size, 5, 'PAKET US must cover all 5 PAI elements');
});

