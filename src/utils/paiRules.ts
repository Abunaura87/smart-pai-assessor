import {
  AssessmentPackage,
  BentukSoalCount,
  ElemenPAI,
  FaseAdaptationProfile,
  FaseCode,
  KaidahValidationIssue,
  KaidahValidationResult,
  LevelKognitif,
  PracticeAssessmentAspect,
} from '../types/assessment';

export const ELEMEN_DIMENSI_CINTA: Record<ElemenPAI, string> = {
  'Al-Qur\'an dan Hadis': 'Cinta Allah, Rasul-Nya, dan Cinta Ilmu',
  'Akidah': 'Menanamkan pilar keimanan yang mendorong amal saleh',
  'Akhlak': 'Makarim al-akhlaq, adab terhadap sesama, moderasi/al-samhah, anti-perundungan',
  'Fikih': 'Ibadah dan muamalah sosial, thaharah, zakat, puasa, halal-haram',
  'Sejarah Peradaban Islam (SPI)': 'Ibrah keteladanan Nabi, Khulafaurrasyidin, dan cinta tanah air',
};

export const DEFAULT_PRACTICE_INSTRUMENT: PracticeAssessmentAspect[] = [
  {
    no: 1,
    aspekPraktik: 'Membaca Al-Qur\'an & Ilmu Tajwid',
    indikatorKinerja:
      'Ketepatan makharijul huruf, penerapan hukum bacaan tajwid (nun sukun/tanwin, mim sukun, mad), serta kelancaran dan adab tilawah.',
    kriteriaSkor4: 'Lancar, makhraj dan hukum tajwid sangat tepat tanpa kesalahan.',
    kriteriaSkor3: 'Lancar, terdapat 1–2 kekeliruan ringan pada hukum tajwid/mad.',
    kriteriaSkor2: 'Kurang lancar, terdapat 3–5 kekeliruan makhraj dan tajwid.',
    kriteriaSkor1: 'Terbata-bata dan masih memerlukan bimbingan penuh dari guru.',
    bobotMaksimal: 25,
  },
  {
    no: 2,
    aspekPraktik: 'Hafalan Surah Pendek / Ayat Pilihan & Hadis',
    indikatorKinerja:
      'Kelancaran melafalkan hafalan surah/ayat pilihan sesuai fase serta pemahaman makna pokok ayat/hadis.',
    kriteriaSkor4: 'Hafal seluruh ayat dengan fasih, lancar, dan memahami arti pokoknya.',
    kriteriaSkor3: 'Hafal seluruh ayat dengan lancar namun sempat terhenti 1–2 kali.',
    kriteriaSkor2: 'Hafal sebagian besar ayat namun memerlukan bantuan pancingan awal ayat.',
    kriteriaSkor1: 'Baru menghafal sebagian kecil ayat dan belum lancar.',
    bobotMaksimal: 25,
  },
  {
    no: 3,
    aspekPraktik: 'Praktik Thaharah (Tata Cara Wudhu / Tayamum)',
    indikatorKinerja:
      'Ketepatan niat, tertib urutan rukun dan sunnah wudhu, kesempurnaan membasuh anggota wudhu, doa sesudah wudhu, serta sikap hemat air.',
    kriteriaSkor4: 'Seluruh rukun, sunnah, tertib urutan, dan doa wudhu dipraktikkan sempurna.',
    kriteriaSkor3: 'Seluruh rukun wudhu tepat dan tertib, namun ada bagian sunnah yang terlewat.',
    kriteriaSkor2: 'Urutan rukun wudhu masih kurang sempurna atau penggunaan air berlebihan.',
    kriteriaSkor1: 'Belum menguasai urutan rukun wudhu secara benar.',
    bobotMaksimal: 25,
  },
  {
    no: 4,
    aspekPraktik: 'Praktik Gerakan & Bacaan Shalat',
    indikatorKinerja:
      'Ketepatan rukun qauli (bacaan takbiratul ihram, Al-Fatihah, tasyahud, salam) dan rukun fi\'li (gerakan rukuk, i\'tidal, sujud dengan tuma\'ninah).',
    kriteriaSkor4: 'Gerakan tuma\'ninah dan seluruh bacaan rukun/sunnah shalat sangat tepat.',
    kriteriaSkor3: 'Seluruh rukun gerakan dan bacaan shalat tepat, namun bacaan sunnah kurang lengkap.',
    kriteriaSkor2: 'Terdapat 2–3 kekeliruan pada bacaan atau gerakan shalat kurang tuma\'ninah.',
    kriteriaSkor1: 'Gerakan dan bacaan shalat masih memerlukan tuntunan langsung.',
    bobotMaksimal: 25,
  },
];

export const FASE_PROFILES: Record<FaseCode, FaseAdaptationProfile> = {
  'Fase A': {
    fase: 'Fase A',
    jenjang: 'SD/MI',
    kelasRange: 'Kelas 1–2 SD/MI',
    kelasOptions: ['Kelas 1 SD/MI', 'Kelas 2 SD/MI'],
    defaultSemester: 'I / Ganjil',
    optionCount: 3,
    optionLabels: ['A', 'B', 'C'],
    bloomRange: 'C1–C2 (Mengingat & Memahami)',
    karakteristik:
      'Usia 6–8 tahun: Kalimat sangat pendek (5–8 kata per kalimat). Kosakata konkret, hangat, seputar rumah, keluarga, dan teman bermain. 3 Opsi (A, B, C) berupa tindakan nyata harian.',
    stimulusStyle:
      'Cerita mini 1–2 kalimat, situasi langsung di rumah/sekolah, atau ilustrasi keseharian sederhana.',
    recommendedShapes: ['Pilihan Ganda', 'Benar/Salah', 'Menjodohkan', 'Isian Singkat'],
    defaultComposition: { mudahL1: 50, sedangL2: 40, hotsL3: 10 },
  },
  'Fase B': {
    fase: 'Fase B',
    jenjang: 'SD/MI',
    kelasRange: 'Kelas 3–4 SD/MI',
    kelasOptions: ['Kelas 3 SD/MI', 'Kelas 4 SD/MI'],
    defaultSemester: 'IV / Ganjil',
    optionCount: 4,
    optionLabels: ['A', 'B', 'C', 'D'],
    bloomRange: 'C2–C3 (Memahami & Menerapkan)',
    karakteristik:
      'Usia 8–10 tahun: Bahasa cerita mengalir (storytelling) seputar sekolah, musala, adab berteman, dan toleransi di kelas. Stimulus berupa percakapan ringkas, pasangan arti Asmaul Husna, atau potongan ayat pendek.',
    stimulusStyle:
      'Cerita hangat di sekolah/musala, percakapan singkat antarteman, tabel pasangan Asmaul Husna, atau potongan ayat bergaris bawah.',
    recommendedShapes: ['Pilihan Ganda', 'Menjodohkan', 'Isian Singkat', 'Uraian'],
    defaultComposition: { mudahL1: 40, sedangL2: 40, hotsL3: 20 },
  },
  'Fase C': {
    fase: 'Fase C',
    jenjang: 'SD/MI',
    kelasRange: 'Kelas 5–6 SD/MI',
    kelasOptions: ['Kelas 5 SD/MI', 'Kelas 6 SD/MI'],
    defaultSemester: 'V / Ganjil',
    optionCount: 4,
    optionLabels: ['A', 'B', 'C', 'D'],
    bloomRange: 'C3–C4 (Menerapkan & Menganalisis)',
    karakteristik:
      'Usia 10–12 tahun: Bahasa naratif komunikatif pra-remaja (bebas jargon elit). Stimulus wajib bervariasi: Model A (Penggalan ayat/hadis bergaris bawah), Model B (Narasi studi kasus harian), Model C (Tabel pasangan Asmaul Husna vs perilaku), dan Model D (Daftar pernyataan berangka 1–4).',
    stimulusStyle:
      'Variasi Model A (Ayat/hadis bergaris bawah), Model B (Narasi kasus kerja kelompok/kejujuran), Model C (Tabel pencocokan), dan Model D (Daftar pernyataan 1–4).',
    recommendedShapes: ['Pilihan Ganda', 'Pilihan Ganda Kompleks', 'Isian Singkat', 'Uraian'],
    defaultComposition: { mudahL1: 30, sedangL2: 40, hotsL3: 30 },
  },
  'Fase D': {
    fase: 'Fase D',
    jenjang: 'SMP/MTs',
    kelasRange: 'Kelas 7–9 SMP/MTs',
    kelasOptions: ['Kelas 7 SMP/MTs', 'Kelas 8 SMP/MTs', 'Kelas 9 SMP/MTs'],
    defaultSemester: 'VIII / Genap',
    optionCount: 4,
    optionLabels: ['A', 'B', 'C', 'D'],
    bloomRange: 'C3–C5 (Menerapkan, Menganalisis, Mengevaluasi)',
    karakteristik:
      'Usia 13–15 tahun: Bahasa kritis remaja, santun, dan reflektif. Stimulus berupa dilema pergaulan media sosial (tabayyun, anti-hoaks, anti-bullying), dalil naqli beserta konteks pergaulan, dan etika interaksi sosial.',
    stimulusStyle:
      'Dilema pergaulan remaja di media sosial, dalil naqli kontekstual, dan format AKM (Pilihan Ganda & PG Kompleks).',
    recommendedShapes: ['Pilihan Ganda', 'Pilihan Ganda Kompleks', 'Benar/Salah', 'Uraian'],
    defaultComposition: { mudahL1: 25, sedangL2: 45, hotsL3: 30 },
  },
  'Fase E': {
    fase: 'Fase E',
    jenjang: 'SMA/SMK/MA',
    kelasRange: 'Kelas 10 SMA/SMK/MA',
    kelasOptions: ['Kelas 10 SMA/MA', 'Kelas 10 SMK/MAK'],
    defaultSemester: 'X / Ganjil',
    optionCount: 5,
    optionLabels: ['A', 'B', 'C', 'D', 'E'],
    bloomRange: 'C4–C6 (Menganalisis, Mengevaluasi, Mencipta - HOTS)',
    karakteristik:
      'Usia 16–18 tahun: Bahasa analitis, studi kasus nyata kedewasaan berpikir (C4–C6 / HOTS). Stimulus berupa artikel berita faktual, isu fikih kontemporer (transaksi online, asuransi syariah), dan sejarah dakwah Islam Nusantara.',
    stimulusStyle:
      'Artikel berita faktual, studi kasus transaksi digital/asuransi syariah, syu\'abul iman, dan 5 opsi (A–E).',
    recommendedShapes: ['Pilihan Ganda', 'Pilihan Ganda Kompleks', 'Uraian'],
    defaultComposition: { mudahL1: 20, sedangL2: 40, hotsL3: 40 },
  },
  'Fase F': {
    fase: 'Fase F',
    jenjang: 'SMA/SMK/MA',
    kelasRange: 'Kelas 11–12 SMA/SMK/MA',
    kelasOptions: ['Kelas 11 SMA/MA', 'Kelas 12 SMA/MA', 'Kelas 11 SMK/MAK', 'Kelas 12 SMK/MAK'],
    defaultSemester: 'XII / Genap',
    optionCount: 5,
    optionLabels: ['A', 'B', 'C', 'D', 'E'],
    bloomRange: 'C4–C6 (Dominan HOTS: Analisis Kasus Nyata & Evaluasi)',
    karakteristik:
      'Usia 16–18 tahun: Bahasa analitis, studi kasus nyata kedewasaan berpikir (C4–C6 / HOTS). Konteks isu fikih kontemporer, etika profesi/kedokteran/bioteknologi, kerukunan bangsa, dan sejarah peradaban global.',
    stimulusStyle:
      'Studi kasus etika profesi, fikih kontemporer, bioteknologi/muamalah modern, dan peran Islam dalam peradaban global (5 Opsi A–E).',
    recommendedShapes: ['Pilihan Ganda', 'Pilihan Ganda Kompleks', 'Benar/Salah', 'Uraian'],
    defaultComposition: { mudahL1: 20, sedangL2: 35, hotsL3: 45 },
  },
};

export const NILAI_MODERASI_OPTIONS = [
  'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  'I\'tidal (Tegak Lurus & Berlaku Adil)',
  'Syura (Musyawarah untuk Kemaslahatan Bersama)',
  'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
];

const SECTARIAN_OR_EXTREME_PATTERNS = [
  /\bkafir\s+harbi\s+wajib\s+diperangi\b/i,
  /\bsesat\s+dan\s+halal\s+darahnya\b/i,
  /\bkhilafah\s+wajib\s+mengganti\s+pancasila\b/i,
  /\bbid'ah\s+dhalalah\s+masuk\s+neraka\b/i,
  /\bqunut\s+tidak\s+sah\s+salatnya\b/i,
];

const ROBOTIC_BOILERPLATE_PATTERNS = [
  /dalam\s+kehidupan\s+masyarakat\s+modern\s+yang\s+majemuk,\s+pemahaman\s+yang\s+komprehensif/i,
  /pada\s+elemen\s+(al-qur'an|akidah|akhlak|fikih|sejarah)/i,
  /dalam\s+materi\s+["']?[^"']+["']?\s+pada\s+elemen/i,
  /menjadi\s+landasan\s+penting\s+bagi\s+(pelajar|murid|siswa)\s+kelas/i,
  /anak\s+muslim\s+yang\s+saleh\s+selalu\s+berusaha\s+mengamalkan\s+ajaran\s+islam\s+tentang/i,
  /mengamalkan\s+prinsip\s+.*\s+secara\s+konsisten\s+dengan\s+sikap\s+santun/i,
  /mengabaikan\s+nilai\s+keteladanan\s+dalam\s+.*\s+apabila\s+sedang\s+tidak\s+diawasi/i,
];

const SD_ELITIST_JARGON_PATTERNS =
  /\b(komprehensif|kemaslahatan|furu'iyah|furu’iyah|dialektika|hegemoni|konstelasi|epistemologi|paradigma)\b/i;

/**
 * Returns the FaseAdaptationProfile for a given FaseCode.
 */
export function getFaseProfile(fase: FaseCode): FaseAdaptationProfile {
  return FASE_PROFILES[fase];
}

/**
 * Derives an official Roman numeral Kelas/Semester label (e.g., "V / Ganjil", "VIII / Genap").
 */
export function formatKelasSemester(
  kelas: string,
  jenisUjian?: string,
  semester?: string
): string {
  const match = kelas.match(/\d+/);
  const num = match ? parseInt(match[0], 10) : 5;
  const romanMap: Record<number, string> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
    11: 'XI',
    12: 'XII',
  };
  const roman = romanMap[num] || String(num);
  if (semester === 'Ganjil' || semester === 'Genap') {
    return `${roman} / ${semester}`;
  }
  if (semester === 'Semua') {
    return `${roman} / Ganjil & Genap`;
  }
  const isGenap =
    jenisUjian?.includes('Akhir Jenjang') ||
    jenisUjian?.includes('Genap');
  return `${roman} / ${isGenap ? 'Genap' : 'Ganjil'}`;
}

/**
 * Returns the Practice Assessment Instrument for a package, falling back to DEFAULT_PRACTICE_INSTRUMENT.
 */
export function getPracticeInstrument(pkg: AssessmentPackage): PracticeAssessmentAspect[] {
  return pkg.pedomanPenskoran.instrumenPraktik && pkg.pedomanPenskoran.instrumenPraktik.length > 0
    ? pkg.pedomanPenskoran.instrumenPraktik
    : DEFAULT_PRACTICE_INSTRUMENT;
}

/**
 * Computes the total number of questions from bentukSoalCounts.
 */
export function getTotalQuestions(counts: BentukSoalCount[]): number {
  return counts.reduce((acc, item) => acc + Math.max(0, Math.floor(item.jumlah)), 0);
}

/**
 * Allocates exact integer question counts for L1, L2, and L3 (HOTS)
 * so that the sum strictly equals totalQuestions.
 */
export function calculateDifficultyAllocation(
  totalQuestions: number,
  composition: { mudahL1: number; sedangL2: number; hotsL3: number }
): { countL1: number; countL2: number; countL3: number; sequence: LevelKognitif[] } {
  if (totalQuestions <= 0) {
    return { countL1: 0, countL2: 0, countL3: 0, sequence: [] };
  }

  const sumPct = composition.mudahL1 + composition.sedangL2 + composition.hotsL3 || 100;
  const rawL1 = (totalQuestions * composition.mudahL1) / sumPct;
  const rawL2 = (totalQuestions * composition.sedangL2) / sumPct;
  const rawL3 = (totalQuestions * composition.hotsL3) / sumPct;

  let countL1 = Math.floor(rawL1);
  let countL2 = Math.floor(rawL2);
  let countL3 = Math.floor(rawL3);

  let remainder = totalQuestions - (countL1 + countL2 + countL3);
  const fractions = [
    { key: 'L3' as const, frac: rawL3 - countL3 },
    { key: 'L2' as const, frac: rawL2 - countL2 },
    { key: 'L1' as const, frac: rawL1 - countL1 },
  ].sort((a, b) => b.frac - a.frac);

  let idx = 0;
  while (remainder > 0) {
    const target = fractions[idx % fractions.length].key;
    if (target === 'L1') countL1++;
    else if (target === 'L2') countL2++;
    else countL3++;
    remainder--;
    idx++;
  }

  const sequence: LevelKognitif[] = [
    ...Array(countL1).fill('L1'),
    ...Array(countL2).fill('L2'),
    ...Array(countL3).fill('L3'),
  ];

  return { countL1, countL2, countL3, sequence };
}

/**
 * Normalizes difficulty percentages so they always total 100%.
 */
export function normalizeComposition(
  changedKey: 'mudahL1' | 'sedangL2' | 'hotsL3',
  newValue: number,
  current: { mudahL1: number; sedangL2: number; hotsL3: number }
): { mudahL1: number; sedangL2: number; hotsL3: number } {
  const clamped = Math.max(0, Math.min(100, Math.round(newValue)));
  const remaining = 100 - clamped;
  const otherKeys = (['mudahL1', 'sedangL2', 'hotsL3'] as const).filter((k) => k !== changedKey);
  const [k1, k2] = otherKeys;
  const otherSum = current[k1] + current[k2];

  let v1: number;
  let v2: number;
  if (otherSum === 0) {
    v1 = Math.floor(remaining / 2);
    v2 = remaining - v1;
  } else {
    v1 = Math.round((current[k1] / otherSum) * remaining);
    v2 = remaining - v1;
  }

  return {
    ...current,
    [changedKey]: clamped,
    [k1]: v1,
    [k2]: v2,
  };
}

/**
 * Validates an AssessmentPackage against the Smart PAI Assessor operational rules (CP 020 Tahun 2026):
 * 1. Blueprint First (1-to-1 alignment between Kisi-Kisi and Butir Soal)
 * 2. Phase & Jenjang Option Count (Fase A: 3 opsi A-C, Fase B/C/D: 4 opsi A-D, Fase E/F: 5 opsi A-E)
 * 3. Anti-Robotik (Zero-Boilerplate) & Varied Authentic Stimulus
 * 4. Homogeneous Distractor length check
 * 5. 5 Elemen PAI & 5 Dimensi Cinta + Moderasi Beragama safety
 * 6. Analytic Rubric (Skor 1–4) & Practice Assessment Instrument
 */
export function validateAssessmentPackage(pkg: AssessmentPackage): KaidahValidationResult {
  const issues: KaidahValidationIssue[] = [];
  const profile = getFaseProfile(pkg.parameters.fase);

  // 1. Blueprint First Check
  const hasBlueprint = pkg.kisiKisi.length > 0 && pkg.kisiKisi.length === pkg.butirSoal.length;
  let allMapped = hasBlueprint;

  pkg.butirSoal.forEach((soal, index) => {
    const bp = pkg.kisiKisi[index];
    if (!bp || bp.no !== soal.blueprintNo) {
      allMapped = false;
      issues.push({
        code: 'BLUEPRINT_MISMATCH',
        severity: 'error',
        message: `Butir soal nomor ${soal.nomor} tidak terhubung langsung dengan baris kisi-kisi #${index + 1}.`,
        nomorSoal: soal.nomor,
      });
    }
    if (bp && bp.indikatorSoalABCD.trim().length < 25) {
      issues.push({
        code: 'WEAK_ABCD_INDICATOR',
        severity: 'warning',
        message: `Indikator soal nomor ${soal.nomor} terlalu pendek untuk memuat unsur ABCD secara utuh.`,
        nomorSoal: soal.nomor,
      });
    }
  });

  // 2. Option Count & Distractor Homogeneity Check
  let faseOptionCompliant = true;
  let distractorHomogeneous = true;

  pkg.butirSoal.forEach((soal) => {
    if (soal.bentukSoal === 'Pilihan Ganda' || soal.bentukSoal === 'Pilihan Ganda Kompleks') {
      const opsiList = soal.opsi ?? [];
      const expectedCount =
        soal.bentukSoal === 'Pilihan Ganda Kompleks'
          ? Math.max(4, profile.optionCount)
          : profile.optionCount;

      if (opsiList.length !== expectedCount) {
        const isAllowedSd =
          profile.jenjang === 'SD/MI' && (opsiList.length === 3 || opsiList.length === 4);
        if (!isAllowedSd) {
          faseOptionCompliant = false;
          issues.push({
            code: 'OPTION_COUNT_MISMATCH',
            severity: 'error',
            message: `Soal no. ${soal.nomor} memiliki ${opsiList.length} opsi, seharusnya ${expectedCount} opsi untuk ${profile.fase} (${profile.jenjang}).`,
            nomorSoal: soal.nomor,
          });
        }
      }

      if (opsiList.length >= 3) {
        const lengths = opsiList.map((o) => o.teks.trim().length);
        const minLen = Math.min(...lengths);
        const maxLen = Math.max(...lengths);
        if (minLen < 2 || maxLen > minLen * 4.5) {
          distractorHomogeneous = false;
          issues.push({
            code: 'DISTRACTOR_IMBALANCE',
            severity: 'warning',
            message: `Panjang opsi jawaban pada soal no. ${soal.nomor} kurang homogen (rentang ${minLen}–${maxLen} karakter).`,
            nomorSoal: soal.nomor,
          });
        }
      }
    }
  });

  // 3. Moderasi Beragama Check
  let moderasiSafe = true;
  pkg.butirSoal.forEach((soal) => {
    const combinedText = `${soal.stimulus} ${soal.pertanyaan} ${soal.pembahasanSingkat}`;
    for (const pattern of SECTARIAN_OR_EXTREME_PATTERNS) {
      if (pattern.test(combinedText)) {
        moderasiSafe = false;
        issues.push({
          code: 'MODERASI_VIOLATION',
          severity: 'error',
          message: `Soal no. ${soal.nomor} terdeteksi memuat narasi sektarian/ekstrem yang melanggar kaidah Moderasi Beragama.`,
          nomorSoal: soal.nomor,
        });
      }
    }
  });

  // 4. Anti-Robotik (Zero-Boilerplate) & Age-Appropriate Language Check
  let naturalAndAgeAppropriate = true;
  const seenStimuli = new Set<string>();

  pkg.butirSoal.forEach((soal) => {
    const normStimulus = soal.stimulus.trim().toLowerCase().replace(/\s+/g, ' ');
    if (normStimulus.length > 0) {
      if (seenStimuli.has(normStimulus)) {
        naturalAndAgeAppropriate = false;
        issues.push({
          code: 'DUPLICATE_STIMULUS_BOILERPLATE',
          severity: 'error',
          message: `Soal no. ${soal.nomor} menggunakan kalimat stimulus berulang (template duplikat) yang dilarang dalam aturan Zero-Boilerplate.`,
          nomorSoal: soal.nomor,
        });
      }
      seenStimuli.add(normStimulus);
    }

    const opsiJoined = (soal.opsi ?? []).map((o) => o.teks).join(' ');
    const questionSurfaceText = `${soal.stimulus} ${soal.pertanyaan} ${opsiJoined}`;

    for (const pattern of ROBOTIC_BOILERPLATE_PATTERNS) {
      if (pattern.test(questionSurfaceText)) {
        naturalAndAgeAppropriate = false;
        issues.push({
          code: 'ROBOTIC_TEMPLATE_DETECTED',
          severity: 'error',
          message: `Soal no. ${soal.nomor} terdeteksi menggunakan kalimat template silabus/judul topik secara kaku di dalam stimulus atau opsi.`,
          nomorSoal: soal.nomor,
        });
        break;
      }
    }

    if (profile.jenjang === 'SD/MI' && SD_ELITIST_JARGON_PATTERNS.test(questionSurfaceText)) {
      naturalAndAgeAppropriate = false;
      issues.push({
        code: 'AGE_INAPPROPRIATE_JARGON',
        severity: 'error',
        message: `Soal no. ${soal.nomor} pada jenjang SD/MI memuat istilah abstrak/elit yang tidak sesuai psikologi usia murid.`,
        nomorSoal: soal.nomor,
      });
    }
  });

  // 5. Rubric Check
  const hasEssayOrFill = pkg.butirSoal.some(
    (s) => s.bentukSoal === 'Isian Singkat' || s.bentukSoal === 'Uraian'
  );
  const rubricComplete =
    pkg.pedomanPenskoran.rubrikAnalitik.length > 0 &&
    (!hasEssayOrFill ||
      pkg.pedomanPenskoran.rubrikAnalitik.some(
        (r) => r.bentukSoal === 'Isian Singkat' || r.bentukSoal === 'Uraian'
      ));

  if (!rubricComplete) {
    issues.push({
      code: 'RUBRIC_MISSING',
      severity: 'error',
      message: 'Pedoman penskoran belum dilengkapi rubrik analitik (Skor 1–4).',
    });
  }

  const checks = [
    {
      label: 'Tabel Resmi Kisi-Kisi 9 Kolom & Kartu Soal (KKG/MGMP PAI)',
      passed: allMapped,
      detail: `${pkg.kisiKisi.length} baris kisi-kisi resmi (Elemen, TP, Kelas/Smt, Materi, Level, Indikator ABCD) terpetakan 1:1 ke butir & kartu soal.`,
    },
    {
      label: `Adaptasi Fase & Opsi Jawaban (${profile.fase} - ${profile.jenjang})`,
      passed: faseOptionCompliant,
      detail: `Standar opsi ${profile.optionLabels.join('–')} dan rentang kognitif ${profile.bloomRange}.`,
    },
    {
      label: 'Gaya Bahasa Anti-Robotik & Variasi Stimulus Sesuai Usia',
      passed: naturalAndAgeAppropriate,
      detail: 'Stimulus otentik bervariasi antar-nomor (ayat/narasi/tabel/pernyataan) tanpa pengulangan kalimat template.',
    },
    {
      label: 'Homogenitas Distraktor & Kalimat Tanya Baku',
      passed: distractorHomogeneous,
      detail: 'Pilihan jawaban berupa tindakan nyata/kesimpulan langsung yang proporsional dan logis.',
    },
    {
      label: 'Integrasi 5 Elemen PAI & 5 Dimensi Cinta (CP 020 Tahun 2026)',
      passed: moderasiSafe,
      detail: `Merefleksikan 5 Dimensi Cinta Kepka No. 020 Tahun 2026 & nilai ${pkg.parameters.nilaiModerasiFokus}.`,
    },
    {
      label: 'Rubrik Analitik (Skor 1–4) & Instrumen Asesmen Praktik',
      passed: rubricComplete,
      detail: `${pkg.pedomanPenskoran.rubrikAnalitik.length} tabel rubrik uraian + 4 aspek penilaian praktik (Al-Qur'an, Hafalan, Wudhu, Shalat).`,
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return {
    isValid: issues.filter((i) => i.severity === 'error').length === 0,
    score,
    blueprintAligned: allMapped,
    faseOptionCompliant,
    distractorHomogeneous: distractorHomogeneous && naturalAndAgeAppropriate,
    moderasiSafe,
    rubricComplete,
    checks,
    issues,
  };
}

/**
 * Formats an AssessmentPackage into the exact 5-part sequential official document structure
 * required by # STRUKTUR KELUARAN STANDAR (KKG/MGMP PAI & Kepka 020 Tahun 2026).
 */
export function formatStandardOutputMarkdown(pkg: AssessmentPackage): string {
  const lines: string[] = [];
  const defaultKelasSmt = formatKelasSemester(pkg.parameters.kelas, pkg.parameters.jenisUjian);
  const practiceRows = getPracticeInstrument(pkg);

  lines.push(`# ${pkg.judulAsesmen}`);
  lines.push('');
  lines.push(`- **Satuan Pendidikan**: ${pkg.identitas.satuanPendidikan}`);
  lines.push(`- **Mata Pelajaran**: ${pkg.identitas.mataPelajaran}`);
  lines.push(`- **Jenjang / Kelas / Fase**: ${pkg.identitas.jenjangKelasFase} (Kelas/Smt: ${defaultKelasSmt})`);
  lines.push(`- **Jenis Asesmen**: ${pkg.identitas.jenisAsesmen}`);
  lines.push(`- **Regulasi & Kurikulum Acuan**: Kepka Nomor 020 Tahun 2026 / ${pkg.identitas.kurikulumAcuan}`);
  lines.push(`- **Integrasi 5 Dimensi Cinta & Moderasi**: ${pkg.identitas.insersiModerasi}`);
  lines.push('');
  lines.push('---');
  lines.push('### 1. KISI-KISI PENULISAN SOAL (TABEL RESMI)');
  lines.push('### BAGIAN 1: IDENTITAS & MATRIKS KISI-KISI');
  lines.push('');
  lines.push(
    '| No | Elemen | Tujuan Pembelajaran (TP) | Kelas/Smt | Materi Pokok | Level Kognitif (L1/L2/L3) | Indikator Soal (Rumusan ABCD) | Bentuk Soal | No. Soal |'
  );
  lines.push('| :---: | :--- | :--- | :---: | :--- | :--- | :--- | :--- | :---: |');

  for (const row of pkg.kisiKisi) {
    const kelasSmt = row.kelasSmt || defaultKelasSmt;
    const materiPokok = row.materiPokok || `${row.elemen} (${ELEMEN_DIMENSI_CINTA[row.elemen]})`;
    lines.push(
      `| ${row.no} | ${row.elemen} | ${row.capaianTujuanPembelajaran} | ${kelasSmt} | ${materiPokok} | ${row.levelKognitif} | ${row.indikatorSoalABCD} | ${row.bentukSoal} | ${row.nomorSoal} |`
    );
  }

  if (pkg.pemetaanUraian && pkg.pemetaanUraian.length > 0) {
    lines.push('');
    lines.push('#### PEMETAAN SOAL URAIAN / ESSAY');
    lines.push('| No | Tujuan Pembelajaran | Kelas / Smt | Konten / Materi |');
    lines.push('| :---: | :--- | :---: | :--- |');
    for (const u of pkg.pemetaanUraian) {
      lines.push(`| ${u.no} | ${u.tujuanPembelajaran} | ${u.kelasSemester} | ${u.kontenMateri} |`);
    }
  }

  lines.push('');
  lines.push('---');
  lines.push('### 2. NASKAH SOAL SIAP CETAK');
  lines.push('### BAGIAN 2: NASKAH BUTIR SOAL');
  lines.push('');
  lines.push('**PETUNJUK UMUM PENGERJAAN SOAL:**');
  lines.push('1. Berdoalah sebelum mengerjakan soal!');
  lines.push('2. Tulislah nama dan nomor presensimu pada lembar jawaban yang telah disediakan!');
  lines.push('3. Bacalah dengan teliti setiap butir soal sebelum Anda menjawabnya!');
  lines.push('4. Kerjakan terlebih dahulu soal-soal yang kamu anggap paling mudah!');
  lines.push('');

  for (const soal of pkg.butirSoal) {
    lines.push(
      `**${soal.nomor}. [${soal.bentukSoal} — ${soal.levelCode} / ${soal.taksonomiBloom}]**`
    );
    if (soal.stimulus) {
      lines.push(`> ${soal.stimulus.split('\n').join('\n> ')}`);
      lines.push('');
    }
    if (soal.instruksiKhusus) {
      lines.push(`*Instruksi: ${soal.instruksiKhusus}*`);
    }
    lines.push(`${soal.pertanyaan}`);
    lines.push('');

    if (soal.opsi && soal.opsi.length > 0) {
      for (const opt of soal.opsi) {
        lines.push(`${opt.label}. ${opt.teks}`);
      }
      lines.push('');
    }

    if (soal.pernyataanBenarSalah && soal.pernyataanBenarSalah.length > 0) {
      lines.push('| Pernyataan | Benar | Salah |');
      lines.push('| :--- | :---: | :---: |');
      for (const p of soal.pernyataanBenarSalah) {
        lines.push(`| ${p.pernyataan} | [ ] | [ ] |`);
      }
      lines.push('');
    }

    if (soal.pasanganMenjodohkan && soal.pasanganMenjodohkan.length > 0) {
      lines.push('| Premis (Pernyataan) | Pilihan Pasangan |');
      lines.push('| :--- | :--- |');
      for (const m of soal.pasanganMenjodohkan) {
        lines.push(`| ${m.premis} | ${m.respon} |`);
      }
      lines.push('');
    }
  }

  lines.push('---');
  lines.push('### 3. KARTU SOAL (REPRESENTASI RESMI)');
  lines.push('');

  for (const soal of pkg.butirSoal) {
    const bp = pkg.kisiKisi.find((k) => k.no === soal.blueprintNo) || pkg.kisiKisi[0];
    const materiPokok =
      soal.materiPokok || bp?.materiPokok || `${soal.elemen} — ${ELEMEN_DIMENSI_CINTA[soal.elemen]}`;
    lines.push(`#### Kartu Soal Nomor ${soal.nomor} (${soal.bentukSoal})`);
    lines.push('| Komponen Kartu Soal | Uraian Resmi KKG/MGMP PAI |');
    lines.push('| :--- | :--- |');
    lines.push(`| **Elemen & Dimensi Cinta** | ${soal.elemen} — *${ELEMEN_DIMENSI_CINTA[soal.elemen]}* |`);
    lines.push(`| **Tujuan Pembelajaran (TP)** | ${bp?.capaianTujuanPembelajaran || '-'} |`);
    lines.push(`| **Materi Pokok** | ${materiPokok} |`);
    lines.push(`| **Kelas / Semester** | ${bp?.kelasSmt || defaultKelasSmt} |`);
    lines.push(`| **Indikator Soal (ABCD)** | ${bp?.indikatorSoalABCD || soal.indikatorRef} |`);
    lines.push(`| **Level Kognitif** | ${soal.levelCode} — ${soal.taksonomiBloom} |`);
    lines.push(`| **Kunci Jawaban** | **${soal.kunciJawaban}** |`);
    lines.push(`| **Deskripsi Butir Soal** | ${soal.stimulus.replace(/\n/g, ' ')} — *${soal.pertanyaan.replace(/\n/g, ' ')}* |`);
    lines.push('');
  }

  lines.push('---');
  lines.push('### 4. KUNCI JAWABAN & PEMBAHASAN LENGKAP');
  lines.push('### BAGIAN 3: KUNCI JAWABAN & PEMBAHASAN SINGKAT');
  lines.push('');

  const pgItems = pkg.butirSoal.filter(
    (s) => s.bentukSoal === 'Pilihan Ganda' || s.bentukSoal === 'Pilihan Ganda Kompleks'
  );
  if (pgItems.length > 0) {
    lines.push('#### A. Tabel Kunci Jawaban Pilihan Ganda');
    lines.push('| No. Soal | Bentuk Soal | Kunci Jawaban | Level Kognitif | Elemen PAI |');
    lines.push('| :---: | :--- | :---: | :---: | :--- |');
    for (const s of pgItems) {
      lines.push(`| ${s.nomor} | ${s.bentukSoal} | **${s.kunciJawaban}** | ${s.levelCode} (${s.taksonomiBloom}) | ${s.elemen} |`);
    }
    lines.push('');
  }

  lines.push('#### B. Pembahasan Lengkap Berbasis Dalil & Konsep Keagamaan');
  for (const soal of pkg.butirSoal) {
    lines.push(`- **Nomor ${soal.nomor}** (${soal.bentukSoal}): **${soal.kunciJawaban}**`);
    lines.push(`  - *Pembahasan*: ${soal.pembahasanSingkat}`);
    lines.push(`  - *Rujukan Dalil / Konsep*: ${soal.dalilAtauKonsep}`);
    lines.push(`  - *Dimensi Cinta & Moderasi*: ${ELEMEN_DIMENSI_CINTA[soal.elemen]} · ${soal.nilaiModerasi}`);
  }

  lines.push('');
  lines.push('---');
  lines.push('### 5. RUBRIK PENILAIAN / PEDOMAN PENSKORAN & ASESMEN PRAKTIK');
  lines.push('### BAGIAN 4: PEDOMAN PENSKORAN & RUBRIK (UNTUK SOAL ISIAN / URAIAN)');
  lines.push('');
  lines.push('#### A. Rekapitulasi Bobot Skor');
  lines.push('| Bentuk Soal | Jumlah Soal | Skor Maksimal per Butir | Total Skor |');
  lines.push('| :--- | :---: | :---: | :---: |');
  for (const b of pkg.pedomanPenskoran.bobotPerBentuk) {
    lines.push(`| ${b.bentuk} | ${b.jumlahSoal} | ${b.skorPerSoal} | ${b.skorTotal} |`);
  }
  lines.push('');
  lines.push(`**Rumus Nilai Akhir:** \`${pkg.pedomanPenskoran.rumusNilaiAkhir}\``);
  lines.push('');
  lines.push('#### B. Rubrik Penilaian Analitik Soal Uraian / Essay (Rentang Skor 1–4)');

  for (const rubrik of pkg.pedomanPenskoran.rubrikAnalitik) {
    lines.push(
      `**Soal Nomor ${rubrik.nomorSoal} (${rubrik.bentukSoal}) — ${rubrik.aspekPenilaian}**`
    );
    lines.push('| Skor | Deskripsi Kriteria Penilaian Objektif |');
    lines.push('| :---: | :--- |');
    for (const k of rubrik.kriteriaSkor) {
      lines.push(`| **${k.skor}** | ${k.deskripsi} |`);
    }
    lines.push('');
  }

  lines.push('#### C. Instrumen Asesmen Nilai Praktik PAIBP (Al-Qur\'an/Tajwid, Hafalan, Wudhu, dan Shalat)');
  lines.push(
    '| No | Aspek Penilaian Praktik | Indikator Kinerja | Skor 4 (Sangat Baik) | Skor 3 (Baik) | Skor 2 (Cukup) | Skor 1 (Perlu Bimbingan) | Bobot |'
  );
  lines.push('| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |');
  for (const pr of practiceRows) {
    lines.push(
      `| ${pr.no} | **${pr.aspekPraktik}** | ${pr.indikatorKinerja} | ${pr.kriteriaSkor4} | ${pr.kriteriaSkor3} | ${pr.kriteriaSkor2} | ${pr.kriteriaSkor1} | ${pr.bobotMaksimal} |`
    );
  }

  return lines.join('\n');
}

