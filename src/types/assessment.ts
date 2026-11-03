export type FaseCode = 'Fase A' | 'Fase B' | 'Fase C' | 'Fase D' | 'Fase E' | 'Fase F';

export type JenjangPendidikan = 'SD/MI' | 'SMP/MTs' | 'SMA/SMK/MA';

export type ElemenPAI =
  | 'Al-Qur\'an dan Hadis'
  | 'Akidah'
  | 'Akhlak'
  | 'Fikih'
  | 'Sejarah Peradaban Islam (SPI)';

export type JenisUjian =
  | 'Asesmen Formatif'
  | 'Sumatif Lingkup Materi (TP)'
  | 'Asesmen Tengah Semester (ATS)'
  | 'Sumatif Akhir Semester (SAS)'
  | 'Asesmen Akhir Jenjang (AAJ / Ujian Praktik)';

export type BentukSoalType =
  | 'Pilihan Ganda'
  | 'Pilihan Ganda Kompleks'
  | 'Benar/Salah'
  | 'Menjodohkan'
  | 'Isian Singkat'
  | 'Uraian';

export type LevelKognitif = 'L1' | 'L2' | 'L3';

export type SemesterOption = 'Ganjil' | 'Genap' | 'Semua';

export interface FaseAdaptationProfile {
  fase: FaseCode;
  jenjang: JenjangPendidikan;
  kelasRange: string;
  kelasOptions: string[];
  defaultSemester: string;
  optionCount: 3 | 4 | 5;
  optionLabels: string[];
  bloomRange: string;
  karakteristik: string;
  stimulusStyle: string;
  recommendedShapes: BentukSoalType[];
  defaultComposition: {
    mudahL1: number;
    sedangL2: number;
    hotsL3: number;
  };
}

export interface BentukSoalCount {
  bentuk: BentukSoalType;
  jumlah: number;
}

export interface AssessmentParameters {
  fase: FaseCode;
  kelas: string;
  semester?: SemesterOption;
  jenjang: JenjangPendidikan;
  elemen: ElemenPAI[];
  jenisUjian: JenisUjian;
  topikMateri: string;
  capaianPembelajaranOpsional?: string;
  nilaiModerasiFokus: string;
  bentukSoalCounts: BentukSoalCount[];
  komposisiKesulitan: {
    mudahL1: number; // percentage e.g. 30
    sedangL2: number; // percentage e.g. 40
    hotsL3: number; // percentage e.g. 30
  };
}

export interface BlueprintRow {
  no: number;
  elemen: ElemenPAI;
  capaianTujuanPembelajaran: string;
  kelasSmt?: string; // e.g., "V / Ganjil" or "VIII / Genap"
  materiPokok?: string; // e.g., "Q.S. Al-Hujurat/49: 13 & Moderasi Beragama"
  indikatorSoalABCD: string;
  levelKognitif: string; // e.g., "L1 (C2 - Memahami)" or "L3 (C4 - Menganalisis)"
  levelCode: LevelKognitif;
  bentukSoal: BentukSoalType;
  nomorSoal: string;
}

export interface MatchingPair {
  premis: string;
  respon: string;
}

export interface QuestionOption {
  label: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  teks: string;
}

export interface QuestionItem {
  nomor: number;
  blueprintNo: number;
  elemen: ElemenPAI;
  materiPokok?: string;
  stimulusModel?: string; // e.g., "Model A: Penggalan Ayat Bergaris Bawah"
  bentukSoal: BentukSoalType;
  levelCode: LevelKognitif;
  taksonomiBloom: string; // e.g. "C4 (Menganalisis)"
  indikatorRef: string;
  stimulus: string;
  instruksiKhusus?: string; // e.g. "Pilihlah dua jawaban yang benar!"
  pertanyaan: string;
  opsi?: QuestionOption[];
  pasanganMenjodohkan?: MatchingPair[];
  pernyataanBenarSalah?: {
    pernyataan: string;
    jawaban: 'Benar' | 'Salah';
  }[];
  kunciJawaban: string;
  pembahasanSingkat: string;
  dalilAtauKonsep: string;
  nilaiModerasi: string;
}

export interface AnalyticRubricRow {
  nomorSoal: number;
  bentukSoal: 'Isian Singkat' | 'Uraian' | 'Pilihan Ganda Kompleks' | 'Menjodohkan' | 'Benar/Salah';
  aspekPenilaian: string;
  skorMaksimal: number;
  kriteriaSkor: {
    skor: number;
    deskripsi: string;
  }[];
}

export interface PracticeAssessmentAspect {
  no: number;
  aspekPraktik: string;
  indikatorKinerja: string;
  kriteriaSkor4: string;
  kriteriaSkor3: string;
  kriteriaSkor2: string;
  kriteriaSkor1: string;
  bobotMaksimal: number;
}

export interface PemetaanUraianRow {
  no: number;
  tujuanPembelajaran: string;
  kelasSemester: string;
  kontenMateri: string;
}

export interface AssessmentPackage {
  id: string;
  judulAsesmen: string;
  createdAt: string;
  parameters: AssessmentParameters;
  // BAGIAN 1: KISI-KISI PENULISAN SOAL (TABEL RESMI)
  identitas: {
    satuanPendidikan: string;
    mataPelajaran: string;
    jenjangKelasFase: string;
    jenisAsesmen: JenisUjian;
    alokasiWaktu: string;
    kurikulumAcuan: string;
    insersiModerasi: string;
  };
  kisiKisi: BlueprintRow[];
  pemetaanUraian?: PemetaanUraianRow[];
  // BAGIAN 2, 3, 4: NASKAH SOAL, KARTU SOAL & KUNCI PEMBAHASAN
  butirSoal: QuestionItem[];
  // BAGIAN 5: RUBRIK PENILAIAN & ASESMEN PRAKTIK
  pedomanPenskoran: {
    bobotPerBentuk: {
      bentuk: BentukSoalType;
      jumlahSoal: number;
      skorPerSoal: number;
      skorTotal: number;
    }[];
    rumusNilaiAkhir: string;
    rubrikAnalitik: AnalyticRubricRow[];
    instrumenPraktik?: PracticeAssessmentAspect[];
  };
}

export interface KaidahValidationIssue {
  code: string;
  severity: 'error' | 'warning';
  message: string;
  nomorSoal?: number;
}

export interface KaidahValidationResult {
  isValid: boolean;
  score: number;
  blueprintAligned: boolean;
  faseOptionCompliant: boolean;
  distractorHomogeneous: boolean;
  moderasiSafe: boolean;
  rubricComplete: boolean;
  checks: {
    label: string;
    passed: boolean;
    detail: string;
  }[];
  issues: KaidahValidationIssue[];
}

export type LogoPresetType = 'pemda' | 'kemenag' | 'tutwuri' | 'custom' | 'none';

export type DocumentLayoutMode = 'kkg' | 'us';

export interface KopSoalConfig {
  layoutMode: DocumentLayoutMode;
  logoKiriPreset: LogoPresetType;
  logoKananPreset: LogoPresetType;
  logoKiriCustomUrl?: string;
  logoKananCustomUrl?: string;
  barisKop1: string;
  barisKop2: string;
  barisKop3: string;
  judulAsesmenDokumen: string;
  tahunPelajaran: string;
  hariTanggal: string;
  waktuUjian: string;
  namaSekolah: string;
  kabupatenKota: string;
  tempatTanggalTandatangan: string;
  jabatanKiri: string;
  namaPengawasPai: string;
  nipPengawasPai: string;
  jabatanKanan: string;
  namaGuruPai: string;
  nipGuruPai: string;
}



