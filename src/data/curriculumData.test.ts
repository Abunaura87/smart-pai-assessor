import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CURRICULUM_DATABASE_CP020,
  getTopicsForFaseAndKelas,
} from './curriculumData';
import { FaseCode } from '../types/assessment';

test('CURRICULUM_DATABASE_CP020 has valid structured entries across all phases A through F', () => {
  assert.ok(CURRICULUM_DATABASE_CP020.length >= 25, 'Database should contain at least 25 official curriculum topics');

  const phases: FaseCode[] = ['Fase A', 'Fase B', 'Fase C', 'Fase D', 'Fase E', 'Fase F'];
  for (const f of phases) {
    const topicsInFase = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === f);
    assert.ok(
      topicsInFase.length >= 2,
      `Fase ${f} must have at least 2 official curriculum topics (found ${topicsInFase.length})`
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

test('getTopicsForFaseAndKelas correctly filters topics by grade and phase', () => {
  // Test Fase C - Kelas 5 SD/MI
  const kls5Topics = getTopicsForFaseAndKelas('Fase C', 'Kelas 5 SD/MI');
  assert.ok(kls5Topics.length >= 4, 'Kelas 5 SD must have at least 4 topics');
  assert.ok(kls5Topics.every((t) => t.fase === 'Fase C'));
  assert.ok(kls5Topics.some((t) => t.judulTopik.includes('Al-Ma\'un')));
  assert.ok(kls5Topics.some((t) => t.judulTopik.includes('Zakat Fitrah')));

  // Test Fase C - Kelas 6 SD/MI
  const kls6Topics = getTopicsForFaseAndKelas('Fase C', 'Kelas 6 SD/MI');
  assert.ok(kls6Topics.length >= 4, 'Kelas 6 SD must have at least 4 topics');
  assert.ok(kls6Topics.every((t) => t.fase === 'Fase C'));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('Halal') || t.judulTopik.includes('Haram')));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('Khulafaurrasyidin')));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('Qada dan Qadar')));
  assert.ok(kls6Topics.some((t) => t.judulTopik.includes('Sampah Plastik') || t.judulTopik.includes('Lingkungan')));

  // Test Fase D - SMP
  const kls7Topics = getTopicsForFaseAndKelas('Fase D', 'Kelas 7 SMP/MTs');
  assert.ok(kls7Topics.some((t) => t.judulTopik.includes('Tabayyun') || t.judulTopik.includes('Perundungan')));
  assert.ok(kls7Topics.some((t) => t.judulTopik.includes('Malaikat')));

  // Test Fase F - SMA
  const kls11Topics = getTopicsForFaseAndKelas('Fase F', 'Kelas 11 SMA/MA');
  assert.ok(kls11Topics.some((t) => t.judulTopik.includes('Maqashid Syariah')));
  assert.ok(kls11Topics.some((t) => t.judulTopik.includes('Munakahat') || t.judulTopik.includes('Pernikahan')));
});

test('Required CP 020/2026 flagship topics exist in curriculum database', () => {
  // Check Fase A: Huruf Hijaiah, Surah Pendek, Bersuci, Adam/Nuh
  const faseATopics = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === 'Fase A');
  assert.ok(faseATopics.some((t) => t.judulTopik.includes('Hijaiah')));
  assert.ok(faseATopics.some((t) => t.judulTopik.includes('Bersuci') || t.judulTopik.includes('Wudu')));
  assert.ok(faseATopics.some((t) => t.judulTopik.includes('Adam')));

  // Check Fase B: Al-Alaq, Balig, Ulul Azmi, Salat Jumat
  const faseBTopics = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === 'Fase B');
  assert.ok(faseBTopics.some((t) => t.judulTopik.includes('Alaq')));
  assert.ok(faseBTopics.some((t) => t.judulTopik.includes('Balig')));
  assert.ok(faseBTopics.some((t) => t.judulTopik.includes('Ulul Azmi')));

  // Check Fase C: Zakat Fitrah, Halal-Haram, Fathu Makkah, Lingkungan
  const faseCTopics = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === 'Fase C');
  assert.ok(faseCTopics.some((t) => t.judulTopik.includes('Zakat Fitrah')));
  assert.ok(faseCTopics.some((t) => t.judulTopik.includes('Fathu Makkah')));
  assert.ok(faseCTopics.some((t) => t.judulTopik.includes('Lingkungan')));

  // Check Fase D: Tabayyun, Abbasiyah, Wali Songo
  const faseDTopics = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === 'Fase D');
  assert.ok(faseDTopics.some((t) => t.judulTopik.includes('Tabayyun')));
  assert.ok(faseDTopics.some((t) => t.judulTopik.includes('Abbasiyah')));
  assert.ok(faseDTopics.some((t) => t.judulTopik.includes('Wali Songo')));

  // Check Fase E & F: Syu'abul Iman, Maqashid Syariah, Muamalah Kontemporer, Mawaris
  const highSchoolTopics = CURRICULUM_DATABASE_CP020.filter(
    (t) => t.fase === 'Fase E' || t.fase === 'Fase F'
  );
  assert.ok(highSchoolTopics.some((t) => t.judulTopik.includes('Syu\'abul Iman')));
  assert.ok(highSchoolTopics.some((t) => t.judulTopik.includes('Maqashid Syariah')));
  assert.ok(highSchoolTopics.some((t) => t.judulTopik.includes('Muamalah')));
  assert.ok(highSchoolTopics.some((t) => t.judulTopik.includes('Waris') || t.judulTopik.includes('Mawaris')));
});
