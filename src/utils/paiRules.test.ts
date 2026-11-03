import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDifficultyAllocation,
  DEFAULT_PRACTICE_INSTRUMENT,
  ELEMEN_DIMENSI_CINTA,
  formatStandardOutputMarkdown,
  getFaseProfile,
  getPracticeInstrument,
  getTotalQuestions,
  normalizeComposition,
  validateAssessmentPackage,
} from './paiRules';
import { PRESET_PACKAGES, buildCustomFallbackPackage } from '../data/presetPackages';
import {
  buildPlainTextWithoutMarkdown,
  buildRichDocumentHtml,
  buildWordDocContent,
  getDefaultKopConfig,
  getOptionColumnsMode,
} from './documentExporter';


test('Phase adaptation rules enforce correct option counts for SD, SMP, and SMA/SMK', () => {
  const faseA = getFaseProfile('Fase A');
  const faseD = getFaseProfile('Fase D');
  const faseE = getFaseProfile('Fase E');

  assert.equal(faseA.jenjang, 'SD/MI');
  assert.equal(faseA.optionCount, 3);
  assert.deepEqual(faseA.optionLabels, ['A', 'B', 'C']);

  assert.equal(faseD.jenjang, 'SMP/MTs');
  assert.equal(faseD.optionCount, 4);
  assert.deepEqual(faseD.optionLabels, ['A', 'B', 'C', 'D']);

  assert.equal(faseE.jenjang, 'SMA/SMK/MA');
  assert.equal(faseE.optionCount, 5);
  assert.deepEqual(faseE.optionLabels, ['A', 'B', 'C', 'D', 'E']);
});

test('5 Elemen PAI & 5 Dimensi Cinta (CP 020 Tahun 2026) and Practice Instrument are complete', () => {
  const elements = Object.keys(ELEMEN_DIMENSI_CINTA);
  assert.equal(elements.length, 5);
  assert.ok(ELEMEN_DIMENSI_CINTA["Al-Qur'an dan Hadis"].includes('Cinta Allah'));
  assert.ok(ELEMEN_DIMENSI_CINTA['Akidah'].includes('amal saleh'));
  assert.ok(ELEMEN_DIMENSI_CINTA['Akhlak'].includes('al-samhah'));
  assert.ok(ELEMEN_DIMENSI_CINTA['Fikih'].includes('muamalah'));
  assert.ok(ELEMEN_DIMENSI_CINTA['Sejarah Peradaban Islam (SPI)'].includes('cinta tanah air'));

  assert.equal(DEFAULT_PRACTICE_INSTRUMENT.length, 4);
  const totalWeight = DEFAULT_PRACTICE_INSTRUMENT.reduce((sum, item) => sum + item.bobotMaksimal, 0);
  assert.equal(totalWeight, 100);
});

test('calculateDifficultyAllocation distributes exact item counts matching total questions', () => {
  const result = calculateDifficultyAllocation(10, { mudahL1: 30, sedangL2: 40, hotsL3: 30 });
  assert.equal(result.countL1, 3);
  assert.equal(result.countL2, 4);
  assert.equal(result.countL3, 3);
  assert.equal(result.sequence.length, 10);

  const oddResult = calculateDifficultyAllocation(7, { mudahL1: 30, sedangL2: 40, hotsL3: 30 });
  assert.equal(oddResult.countL1 + oddResult.countL2 + oddResult.countL3, 7);
});

test('normalizeComposition keeps L1 + L2 + L3 strictly equal to 100%', () => {
  const updated = normalizeComposition('hotsL3', 50, { mudahL1: 30, sedangL2: 40, hotsL3: 30 });
  assert.equal(updated.mudahL1 + updated.sedangL2 + updated.hotsL3, 100);
  assert.equal(updated.hotsL3, 50);
});

test('getTotalQuestions sums all configured question types accurately', () => {
  const total = getTotalQuestions([
    { bentuk: 'Pilihan Ganda', jumlah: 3 },
    { bentuk: 'Pilihan Ganda Kompleks', jumlah: 1 },
    { bentuk: 'Uraian', jumlah: 1 },
  ]);
  assert.equal(total, 5);
});

test('Preset packages pass all Kaidah PAIBP, Blueprint-First, and Moderasi Beragama validations', () => {
  assert.ok(PRESET_PACKAGES.length >= 4, 'Should have at least 4 preset curriculum packages');
  for (const pkg of PRESET_PACKAGES) {
    const validation = validateAssessmentPackage(pkg);
    assert.equal(
      validation.isValid,
      true,
      `Package ${pkg.id} failed validation: ${JSON.stringify(validation.issues)}`
    );
    assert.equal(validation.blueprintAligned, true);
    assert.equal(validation.faseOptionCompliant, true);
    assert.equal(validation.moderasiSafe, true);
    assert.equal(validation.rubricComplete, true);
  }
});

test('formatStandardOutputMarkdown outputs all 5 official sequential sections and 9-column Kisi-Kisi table', () => {
  const pkg = PRESET_PACKAGES[0];
  const md = formatStandardOutputMarkdown(pkg);

  const idxSec1 = md.indexOf('### 1. KISI-KISI PENULISAN SOAL (TABEL RESMI)');
  const idxSec2 = md.indexOf('### 2. NASKAH SOAL SIAP CETAK');
  const idxSec3 = md.indexOf('### 3. KARTU SOAL (REPRESENTASI RESMI)');
  const idxSec4 = md.indexOf('### 4. KUNCI JAWABAN & PEMBAHASAN LENGKAP');
  const idxSec5 = md.indexOf('### 5. RUBRIK PENILAIAN / PEDOMAN PENSKORAN & ASESMEN PRAKTIK');

  assert.ok(idxSec1 > -1, 'Missing Official Section 1 (Kisi-Kisi Penulisan Soal)');
  assert.ok(idxSec2 > idxSec1, 'Section 2 (Naskah Soal Siap Cetak) must come after Section 1');
  assert.ok(idxSec3 > idxSec2, 'Section 3 (Kartu Soal) must come after Section 2');
  assert.ok(idxSec4 > idxSec3, 'Section 4 (Kunci Jawaban & Pembahasan) must come after Section 3');
  assert.ok(idxSec5 > idxSec4, 'Section 5 (Rubrik & Asesmen Praktik) must come after Section 4');

  assert.ok(
    md.includes(
      '| No | Elemen | Tujuan Pembelajaran (TP) | Kelas/Smt | Materi Pokok | Level Kognitif (L1/L2/L3) | Indikator Soal (Rumusan ABCD) | Bentuk Soal | No. Soal |'
    ),
    'Missing 9-column official Kisi-Kisi header'
  );
});

test('Fase C preset showcases varied stimulus models (Model A, Model B, Model C, Model D)', () => {
  const faseCPreset = PRESET_PACKAGES.find((p) => p.parameters.fase === 'Fase C');
  assert.ok(faseCPreset, 'Fase C preset must exist');
  const models = faseCPreset.butirSoal.map((s) => s.stimulusModel ?? '');
  assert.ok(models.some((m) => m.includes('Model A')), 'Fase C should include Model A');
  assert.ok(models.some((m) => m.includes('Model B')), 'Fase C should include Model B');
  assert.ok(models.some((m) => m.includes('Model C')), 'Fase C should include Model C');
  assert.ok(models.some((m) => m.includes('Model D')), 'Fase C should include Model D');

  const practice = getPracticeInstrument(faseCPreset);
  assert.equal(practice.length, 4);
});

test('Terminology rule enforces "Murid" instead of "Peserta Didik" across all packages', () => {
  const allPackages = [
    ...PRESET_PACKAGES,
    buildCustomFallbackPackage({
      ...PRESET_PACKAGES[0].parameters,
      capaianPembelajaranOpsional: '',
    }),
  ];
  for (const pkg of allPackages) {
    const serialized = JSON.stringify(pkg);
    assert.equal(
      /peserta\s+didik/i.test(serialized),
      false,
      `Package ${pkg.id} still contains "Peserta Didik"`
    );
    assert.equal(
      /\bmurid\b/i.test(serialized),
      true,
      `Package ${pkg.id} should use the term "Murid"`
    );
  }
});

test('Zero-Boilerplate & Age-Psychology rules enforce unique stimuli, no topic-echo templates, and no elitist jargon in SD', () => {
  assert.equal(PRESET_PACKAGES.length, 6, 'All 6 Fases (Fase A to Fase F) must have preset packages');

  for (const preset of PRESET_PACKAGES) {
    const customGenerated = buildCustomFallbackPackage({
      ...preset.parameters,
      topikMateri: 'Topik Uji Coba Anti Boilerplate Kurikulum',
      bentukSoalCounts: [
        { bentuk: 'Pilihan Ganda', jumlah: 4 },
        { bentuk: 'Pilihan Ganda Kompleks', jumlah: 1 },
        { bentuk: 'Benar/Salah', jumlah: 1 },
        { bentuk: 'Isian Singkat', jumlah: 1 },
        { bentuk: 'Uraian', jumlah: 1 },
      ],
    });

    for (const pkg of [preset, customGenerated]) {
      const validation = validateAssessmentPackage(pkg);
      assert.equal(
        validation.isValid,
        true,
        `Package ${pkg.id} (${pkg.parameters.fase}) failed validation: ${JSON.stringify(validation.issues)}`
      );
      assert.equal(validation.score, 100, `Expected 100% compliance score for ${pkg.id}`);

      const stimuli = pkg.butirSoal.map((s) => s.stimulus.trim().toLowerCase());
      const uniqueStimuli = new Set(stimuli);
      assert.equal(
        uniqueStimuli.size,
        stimuli.length,
        `Duplicate stimulus found in package ${pkg.id} (${pkg.parameters.fase})`
      );

      for (const soal of pkg.butirSoal) {
        assert.equal(
          soal.stimulus.includes('Topik Uji Coba Anti Boilerplate Kurikulum'),
          false,
          'Stimulus must never echo the raw topic title verbatim'
        );
        if (pkg.parameters.jenjang === 'SD/MI') {
          const text = `${soal.stimulus} ${soal.pertanyaan} ${(soal.opsi ?? []).map((o) => o.teks).join(' ')}`;
          assert.equal(
            /\b(komprehensif|kemaslahatan|furu'iyah|dialektika)\b/i.test(text),
            false,
            `SD/MI question in ${pkg.parameters.fase} must not contain elitist jargon`
          );
        }
      }
    }
  }
});

test('Rich HTML, Plain Text fallback, and Word .doc export contain zero raw Markdown symbols and support KKG & US modes', () => {
  const pkg = PRESET_PACKAGES[0];
  const kopKkg = getDefaultKopConfig(pkg);
  assert.equal(kopKkg.barisKop1, 'PEMERINTAH KABUPATEN KONAWE SELATAN');
  assert.equal(kopKkg.barisKop3, 'KECAMATAN LALEMBUU');
  assert.equal(kopKkg.tahunPelajaran, 'TP. 2025/2026');

  const richHtmlKkg = buildRichDocumentHtml(pkg, kopKkg);
  const plainTextKkg = buildPlainTextWithoutMarkdown(pkg, kopKkg);
  const wordDocKkg = buildWordDocContent(pkg, kopKkg);

  // Must not contain raw Markdown headers or bold markers
  assert.equal(/###\s/.test(richHtmlKkg), false, 'Rich HTML must not contain ### markdown');
  assert.equal(/\*\*[A-Za-z]/.test(richHtmlKkg), false, 'Rich HTML must not contain ** markdown');
  assert.equal(/###\s/.test(plainTextKkg), false, 'Plain text fallback must not contain ### markdown');
  assert.equal(/\*\*[A-Za-z]/.test(plainTextKkg), false, 'Plain text fallback must not contain ** markdown');

  // Must include official KKG elements
  assert.ok(richHtmlKkg.includes('border-bottom:3px double #000000'), 'Must include double bottom border on Kop Surat');
  assert.ok(richHtmlKkg.includes('PEMERINTAH KABUPATEN KONAWE SELATAN'));
  assert.ok(richHtmlKkg.includes('INSTRUMEN ASESMEN'));
  assert.ok(richHtmlKkg.includes('ASPEK AL-QUR\'AN YANG DINILAI'));
  assert.ok(richHtmlKkg.includes('ASPEK FIQIH YANG DINILAI'));
  assert.ok(richHtmlKkg.includes('ASPEK IBADAH YANG DINILAI'));

  // Word document wrapper must include Office Word namespace and Times New Roman 12pt
  assert.ok(wordDocKkg.includes('xmlns:w="urn:schemas-microsoft-com:office:word"'));
  assert.ok(wordDocKkg.includes('Times New Roman'));
  assert.ok(wordDocKkg.includes('12pt'));

  // Mode B: Ujian Sekolah / Akhir Jenjang
  const kopUs = { ...kopKkg, layoutMode: 'us' as const };
  const richHtmlUs = buildRichDocumentHtml(pkg, kopUs);
  assert.ok(richHtmlUs.includes('PETUNJUK UMUM'), 'US mode must include Cover Petunjuk Umum');
  assert.ok(richHtmlUs.includes('BERITA ACARA'), 'US mode must include Berita Acara');
  assert.ok(richHtmlUs.includes('DAFTAR HADIR PESERTA UJIAN SEKOLAH (US)'), 'US mode must include Daftar Hadir');
  assert.ok(richHtmlUs.includes('LEMBAR JAWABAN'), 'US mode must include Lembar Jawaban (LJK)');

  // Option column mode helper
  assert.equal(
    getOptionColumnsMode([
      { label: 'A', teks: 'Taif' },
      { label: 'B', teks: 'Yaman' },
      { label: 'C', teks: 'Mekkah' },
      { label: 'D', teks: 'Madinah' },
    ]),
    '4-col'
  );
});

