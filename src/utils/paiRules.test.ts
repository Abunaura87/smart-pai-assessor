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

      const stimuli = pkg.butirSoal.map((s) => (s.stimulus ? s.stimulus.trim().toLowerCase() : s.pertanyaan.trim().toLowerCase()));
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

  // Verify default signatory fields and custom signatory synchronization
  assert.equal(kopKkg.tempatTanggalTandatangan, 'Lalembuu, .................... 2026');
  assert.equal(kopKkg.jabatanKiri, 'Pengawas PAI');
  assert.equal(kopKkg.namaPengawasPai, 'Seh Alwan, S.Ag., M.Pd.');
  assert.equal(kopKkg.nipPengawasPai, '197101032000031007');
  assert.equal(kopKkg.jabatanKanan, 'Guru Pendidikan Agama Islam');

  const customSignatoryKop = {
    ...kopKkg,
    tempatTanggalTandatangan: 'Lalembuu, 15 Juni 2026',
    jabatanKiri: 'Kepala Sekolah',
    namaPengawasPai: 'H. Muhammad Ridwan, S.Pd., M.Pd.',
    nipPengawasPai: '197504122001121003',
    jabatanKanan: 'Guru Pendidikan Agama Islam',
    namaGuruPai: 'Ahmad Fauzi, S.Pd.I., Gr.',
    nipGuruPai: '198908172019031008',
  };
  const syncedHtml = buildRichDocumentHtml(pkg, customSignatoryKop);
  assert.ok(syncedHtml.includes('Lalembuu, 15 Juni 2026'));
  assert.ok(syncedHtml.includes('Kepala Sekolah'));
  assert.ok(syncedHtml.includes('H. Muhammad Ridwan, S.Pd., M.Pd.'));
  assert.ok(syncedHtml.includes('197504122001121003'));
  assert.ok(syncedHtml.includes('Ahmad Fauzi, S.Pd.I., Gr.'));
  assert.ok(syncedHtml.includes('198908172019031008'));
});

test('Stimulus parser converts pipe tables into HTML tables, detects vocalized Arabic verses, and separates Isian Singkat from Uraian', async () => {
  const { parseStimulusSegments, renderStimulusHtmlString } = await import('./stimulusParser');

  const tableStimulus =
    'Perhatikan tabel berikut!\n| Kode | Asmaul Husna | Contoh Perilaku Murid Sehari-hari |\n| 1 | Al-Qayyum (Maha Mandiri) | Merapikan tempat tidur sendiri |\n| 2 | Al-Muhyi (Maha Menghidupkan) | Menyiram tanaman secara rutin |';
  const segments = parseStimulusSegments(tableStimulus);
  assert.equal(segments.length, 2);
  assert.equal(segments[0].type, 'text');
  assert.equal(segments[1].type, 'table');
  if (segments[1].type === 'table') {
    assert.deepEqual(segments[1].headers, [
      'Kode',
      'Asmaul Husna',
      'Contoh Perilaku Murid Sehari-hari',
    ]);
    assert.equal(segments[1].rows.length, 2);
  }

  const tableHtml = renderStimulusHtmlString(tableStimulus);
  assert.ok(tableHtml.includes('<table'), 'Pipe table must render as HTML <table>');
  assert.ok(tableHtml.includes('<th'), 'Pipe table must render <th> headers');
  assert.equal(tableHtml.includes('| Kode |'), false, 'Raw pipe syntax must not remain in HTML');

  const arabicStimulus =
    'Perhatikan potongan Q.S. Al-Hujurat/49: 13 berikut!\nيَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُمْ مِنْ ذَكَرٍ وَأُنْثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا';
  const arabicSegs = parseStimulusSegments(arabicStimulus);
  assert.ok(arabicSegs.some((s) => s.type === 'arabic'), 'Must detect vocalized Arabic text segment');
  const arabicHtml = renderStimulusHtmlString(arabicStimulus);
  assert.ok(arabicHtml.includes('dir="rtl"'), 'Arabic verse must render with dir="rtl"');

  // Verify zero static prefix template ("mengalami peristiwa serupa") even on large question sets
  const largePkg = buildCustomFallbackPackage({
    ...PRESET_PACKAGES[2].parameters,
    bentukSoalCounts: [
      { bentuk: 'Pilihan Ganda', jumlah: 6 },
      { bentuk: 'Isian Singkat', jumlah: 3 },
      { bentuk: 'Uraian', jumlah: 3 },
    ],
  });
  for (const soal of largePkg.butirSoal) {
    assert.equal(
      soal.stimulus.includes('mengalami peristiwa serupa'),
      false,
      'Must never prepend static prefix "mengalami peristiwa serupa"'
    );
  }

  // Verify Isian Singkat and Uraian are separated into B. Isian Singkat and C. Uraian
  const kop = getDefaultKopConfig(largePkg);
  const html = buildRichDocumentHtml(largePkg, kop);
  const plain = buildPlainTextWithoutMarkdown(largePkg, kop);
  assert.ok(html.includes('B. Isian Singkat'), 'HTML must have B. Isian Singkat section');
  assert.ok(html.includes('C. Uraian'), 'HTML must have C. Uraian section when Isian Singkat is present');
  assert.ok(plain.includes('B. Isian Singkat'), 'Plain text must have B. Isian Singkat section');
  assert.ok(plain.includes('C. Uraian'), 'Plain text must have C. Uraian section');
});

test('Strict grade-level isolation guarantees zero cross-phase contamination in 30 questions (Fase C SD/MI)', () => {
  // Generate 30 questions for Fase C (Kelas 6 SD/MI): 25 PG + 5 Uraian
  const pkgFaseC = buildCustomFallbackPackage({
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    jenjang: 'SD/MI',
    elemen: [
      'Al-Qur\'an dan Hadis',
      'Akidah',
      'Akhlak',
      'Fikih',
      'Sejarah Peradaban Islam (SPI)',
    ],
    jenisUjian: 'Sumatif Akhir Semester (SAS)',
    topikMateri: 'Pesan Pokok Q.S. Al-Hujurat: 13, Asmaul Husna Al-Qayyum, Takdir Muallaq, Zakat Fitrah, dan Musyawarah Khulafaurrasyidin',
    nilaiModerasiFokus: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
    bentukSoalCounts: [
      { bentuk: 'Pilihan Ganda', jumlah: 25 },
      { bentuk: 'Uraian', jumlah: 5 },
    ],
    komposisiKesulitan: { mudahL1: 30, sedangL2: 50, hotsL3: 20 },
  });

  assert.equal(pkgFaseC.butirSoal.length, 30, 'Must generate exactly 30 questions');

  // Verify that not a single question contains SMA or Grade 1 SD leaked content
  for (const soal of pkgFaseC.butirSoal) {
    const fullText = `${soal.stimulus} ${soal.pertanyaan} ${soal.kunciJawaban || ''} ${JSON.stringify(soal.opsi || [])}`;

    // FORBIDDEN SMA / SMK items in Fase C
    assert.equal(fullText.includes('pinjaman daring'), false, 'Fase C must NEVER contain pinjaman daring');
    assert.equal(fullText.includes('pinjol'), false, 'Fase C must NEVER contain pinjol');
    assert.equal(fullText.includes('tiket konser'), false, 'Fase C must NEVER contain tiket konser');
    assert.equal(fullText.includes('mystery box'), false, 'Fase C must NEVER contain mystery box');
    assert.equal(fullText.includes('dropship'), false, 'Fase C must NEVER contain dropship');
    assert.equal(fullText.includes('hifzh al-\'aql'), false, 'Fase C must NEVER contain hifzh al-\'aql');
    assert.equal(fullText.includes('syu\'abul iman'), false, 'Fase C must NEVER contain syu\'abul iman');

    // FORBIDDEN SMP items in Fase C
    assert.equal(fullText.includes('tim robotik MTs'), false, 'Fase C must NEVER contain tim robotik MTs');
    assert.equal(fullText.includes('Sunan Kudus'), false, 'Fase C must NEVER contain Sunan Kudus');

    // FORBIDDEN Grade 1 SD (Fase A) items in Fase C
    assert.equal(fullText.includes('kucing kecil sedang kelaparan'), false, 'Fase C must NEVER contain Fase A kucing lapar');
    assert.equal(fullText.includes('menumpahkan air minum di meja'), false, 'Fase C must NEVER contain Fase A tumpah air minum');
    assert.equal(fullText.includes('pot bunga'), false, 'Fase C must NEVER contain pot bunga');
    assert.equal(fullText.includes('kaki Budi kotor setelah bermain bola'), false, 'Fase C must NEVER contain Fase A Budi kotor');
    assert.equal(fullText.includes('Siti duduk rapi di meja makan'), false, 'Fase C must NEVER contain Fase A Siti meja makan');
  }

  // Specifically check Uraian #4 and #5 in Fase C (which previously had the leaked questions)
  const uraianItems = pkgFaseC.butirSoal.filter((s) => s.bentukSoal === 'Uraian');
  assert.equal(uraianItems.length, 5, 'Must have exactly 5 Uraian questions');

  for (let i = 0; i < uraianItems.length; i++) {
    const uText = `${uraianItems[i].stimulus} ${uraianItems[i].pertanyaan}`;
    assert.equal(uText.includes('tiket konser'), false, `Uraian #${i + 1} must not contain tiket konser`);
    assert.equal(uText.includes('pinjaman daring'), false, `Uraian #${i + 1} must not contain pinjaman daring`);
    assert.equal(uText.includes('menumpahkan air minum'), false, `Uraian #${i + 1} must not contain menumpahkan air minum`);
  }
});


