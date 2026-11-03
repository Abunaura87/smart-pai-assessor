import React, { useState } from 'react';
import {
  AssessmentParameters,
  BentukSoalType,
  ElemenPAI,
  FaseCode,
  JenisUjian,
  KopSoalConfig,
  SemesterOption,
} from '../types/assessment';
import {
  calculateDifficultyAllocation,
  ELEMEN_DIMENSI_CINTA,
  FASE_PROFILES,
  getFaseProfile,
  getTotalQuestions,
  NILAI_MODERASI_OPTIONS,
  normalizeComposition,
} from '../utils/paiRules';
import {
  CurriculumTopic,
  getTopicsForFaseAndKelas,
} from '../data/curriculumData';
import { KopPejabatForm } from './KopPejabatForm';
import {
  Sparkles,
  Plus,
  Minus,
  BookOpen,
  AlertCircle,
  Settings,
  ChevronDown,
  ChevronUp,
  Edit3,
  RotateCcw,
  Check,
  Bookmark,
  Layers,
} from 'lucide-react';

interface ParameterPanelProps {
  parameters: AssessmentParameters;
  onChangeParameters: (next: AssessmentParameters) => void;
  onGenerate: (params: AssessmentParameters) => void;
  isGenerating: boolean;
  kopConfig: KopSoalConfig;
  onChangeKopConfig: (next: KopSoalConfig) => void;
  onResetKopConfig: () => void;
  onOpenKopModal: () => void;
}

const ALL_ELEMEN: ElemenPAI[] = [
  'Al-Qur\'an dan Hadis',
  'Akidah',
  'Akhlak',
  'Fikih',
  'Sejarah Peradaban Islam (SPI)',
];

const ALL_JENIS_UJIAN: JenisUjian[] = [
  'Asesmen Formatif',
  'Sumatif Lingkup Materi (TP)',
  'Asesmen Tengah Semester (ATS)',
  'Sumatif Akhir Semester (SAS)',
  'Asesmen Akhir Jenjang (AAJ / Ujian Praktik)',
];

const ALL_BENTUK_SOAL: BentukSoalType[] = [
  'Pilihan Ganda',
  'Pilihan Ganda Kompleks',
  'Benar/Salah',
  'Menjodohkan',
  'Isian Singkat',
  'Uraian',
];

const QUICK_TOPICS: Record<FaseCode, { label: string; topik: string; cp: string; elemen: ElemenPAI[] }[]> = {
  'Fase A': [
    {
      label: 'Basmalah, Hamdalah & Kasih Sayang',
      topik: 'Membiasakan Basmalah dan Hamdalah, Sayang kepada Orang Tua, serta 5 Rukun Islam',
      cp: 'Murid terbiasa melafalkan basmalah dan hamdalah, menunjukkan perilaku kasih sayang terhadap keluarga, serta mengenal rukun Islam.',
      elemen: ['Akidah', 'Akhlak', 'Fikih'],
    },
    {
      label: 'Mengenal Huruf Hijaiyah & Rukun Iman',
      topik: 'Mengenal Huruf Hijaiyah Berharakat, Surah Al-Fatihah, dan Enam Rukun Iman',
      cp: 'Murid mengenal huruf hijaiyah dan harakat sederhana, melafalkan Q.S. Al-Fatihah, dan menyebutkan enam rukun iman.',
      elemen: ['Al-Qur\'an dan Hadis', 'Akidah'],
    },
  ],
  'Fase B': [
    {
      label: 'Tata Cara Salat, Tayamum & Kisah Nabi',
      topik: 'Ketentuan Salat Fardu, Tata Cara Wudu dan Tayamum, serta Keteladanan Nabi Muhammad saw.',
      cp: 'Murid memahami dan mempraktikkan tata cara bersuci dan salat fardu secara tertib serta meneladani sifat siddiq dan amanah Nabi Muhammad saw.',
      elemen: ['Fikih', 'Sejarah Peradaban Islam (SPI)', 'Akhlak'],
    },
  ],
  'Fase C': [
    {
      label: 'Q.S. Al-Hujurat: 13, Zakat & Kebinekaan',
      topik: 'Pesan Pokok Q.S. Al-Hujurat/49: 13 tentang Kebinekaan, Hikmah Zakat Fitrah, dan Ukhuwah Wathaniyah',
      cp: 'Murid memahami pesan pokok Q.S. Al-Hujurat/49: 13 tentang keragaman manusia, ketentuan zakat fitrah, serta menerapkan sikap toleransi.',
      elemen: ['Al-Qur\'an dan Hadis', 'Fikih', 'Akhlak'],
    },
  ],
  'Fase D': [
    {
      label: 'Tabayyun Media Sosial & Anti-Perundungan',
      topik: 'Adab Bermedia Sosial (Tabayyun Q.S. Al-Hujurat: 6), Pencegahan Perundungan (Bullying), dan Toleransi',
      cp: 'Murid memahami makna Q.S. Al-Hujurat/49: 6 dan 12 tentang tabayyun serta menghindari ghibah dan perundungan di ruang siber.',
      elemen: ['Al-Qur\'an dan Hadis', 'Akhlak', 'Fikih'],
    },
    {
      label: 'Sujud Syukur, Sahwi, Tilawah & Masa Bani Abbasiyah',
      topik: 'Ketentuan Sujud Syukur, Sujud Sahwi, Sujud Tilawah, serta Kejayaan Ilmu Pengetahuan Masa Bani Abbasiyah',
      cp: 'Murid memahami tata cara sujud di luar salat dan meneladani semangat keilmuan ilmuwan muslim masa Bani Abbasiyah.',
      elemen: ['Fikih', 'Sejarah Peradaban Islam (SPI)'],
    },
  ],
  'Fase E': [
    {
      label: 'Fikih Muamalah Digital, Riba & Wali Songo',
      topik: 'Prinsip Fikih Muamalah Modern (E-Commerce, Pinjol & Larangan Riba), Syu\'abul Iman, dan Dakwah Damai Wali Songo',
      cp: 'Murid menganalisis fikih muamalah kontemporer, syu\'abul iman, dan strategi dakwah moderat Wali Songo di Nusantara.',
      elemen: ['Fikih', 'Akidah', 'Sejarah Peradaban Islam (SPI)'],
    },
  ],
  'Fase F': [
    {
      label: 'Etika Profesi, Maqashid Syariah & Ijtihad',
      topik: 'Etos Kerja dan Etika Profesi Islami, Maqashid Syariah (Al-Kulliyatul Khamsah), serta Moderasi Beragama Global',
      cp: 'Murid menganalisis etos kerja dalam Q.S. At-Taubah/9: 105, konsep maqashid syariah dalam isu kontemporer, dan moderasi beragama.',
      elemen: ['Al-Qur\'an dan Hadis', 'Fikih', 'Akhlak'],
    },
  ],
};

export const ParameterPanel: React.FC<ParameterPanelProps> = ({
  parameters,
  onChangeParameters,
  onGenerate,
  isGenerating,
  kopConfig,
  onChangeKopConfig,
  onResetKopConfig,
  onOpenKopModal,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isKopAccordionOpen, setIsKopAccordionOpen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [showTpEditor, setShowTpEditor] = useState(false);
  const profile = getFaseProfile(parameters.fase);
  const totalSoal = getTotalQuestions(parameters.bentukSoalCounts);
  const diffAlloc = calculateDifficultyAllocation(totalSoal, parameters.komposisiKesulitan);

  const activeSemester: SemesterOption = parameters.semester || 'Ganjil';

  const handleFaseChange = (newFase: FaseCode) => {
    const nextProfile = getFaseProfile(newFase);
    const nextKelas = nextProfile.kelasOptions[0];
    const nextSmt: SemesterOption = parameters.semester || 'Ganjil';
    const availableTopics = getTopicsForFaseAndKelas(newFase, nextKelas, nextSmt);
    const defaultTopic = availableTopics[0];
    onChangeParameters({
      ...parameters,
      fase: newFase,
      jenjang: nextProfile.jenjang,
      kelas: nextKelas,
      semester: nextSmt,
      komposisiKesulitan: { ...nextProfile.defaultComposition },
      ...(defaultTopic
        ? {
            topikMateri: defaultTopic.judulTopik,
            capaianPembelajaranOpsional: defaultTopic.rumusanTP,
            elemen: defaultTopic.elemen,
            nilaiModerasiFokus: defaultTopic.rekomendasiModerasi || parameters.nilaiModerasiFokus,
          }
        : {}),
    });
    setIsCustomMode(false);
    setShowTpEditor(false);
    setValidationError(null);
  };

  const handleKelasChange = (newKelas: string) => {
    const nextTopics = getTopicsForFaseAndKelas(parameters.fase, newKelas, activeSemester);
    const currentMatches = nextTopics.find(
      (t) => t.judulTopik === parameters.topikMateri || t.materiPokok === parameters.topikMateri
    );
    if (!isCustomMode && !currentMatches && nextTopics.length > 0) {
      const firstT = nextTopics[0];
      onChangeParameters({
        ...parameters,
        kelas: newKelas,
        topikMateri: firstT.judulTopik,
        capaianPembelajaranOpsional: firstT.rumusanTP,
        elemen: firstT.elemen,
        nilaiModerasiFokus: firstT.rekomendasiModerasi || parameters.nilaiModerasiFokus,
      });
    } else {
      onChangeParameters({ ...parameters, kelas: newKelas });
    }
  };

  const handleSemesterChange = (newSemester: SemesterOption) => {
    const nextTopics = getTopicsForFaseAndKelas(parameters.fase, parameters.kelas, newSemester);
    const currentMatches = nextTopics.find(
      (t) => t.judulTopik === parameters.topikMateri || t.materiPokok === parameters.topikMateri
    );
    if (!isCustomMode && !currentMatches && nextTopics.length > 0) {
      const firstT = nextTopics[0];
      onChangeParameters({
        ...parameters,
        semester: newSemester,
        topikMateri: firstT.judulTopik,
        capaianPembelajaranOpsional: firstT.rumusanTP,
        elemen: firstT.elemen,
        nilaiModerasiFokus: firstT.rekomendasiModerasi || parameters.nilaiModerasiFokus,
      });
    } else {
      onChangeParameters({
        ...parameters,
        semester: newSemester,
      });
    }
    setValidationError(null);
  };

  const toggleElemen = (el: ElemenPAI) => {
    const exists = parameters.elemen.includes(el);
    if (exists && parameters.elemen.length === 1) {
      return; // Keep at least 1 elemen active
    }
    const nextElemen = exists
      ? parameters.elemen.filter((item) => item !== el)
      : [...parameters.elemen, el];
    onChangeParameters({ ...parameters, elemen: nextElemen });
  };

  const updateBentukCount = (bentuk: BentukSoalType, delta: number) => {
    const existing = parameters.bentukSoalCounts.find((b) => b.bentuk === bentuk);
    const currentVal = existing ? existing.jumlah : 0;
    const nextVal = Math.max(0, Math.min(15, currentVal + delta));

    const otherList = parameters.bentukSoalCounts.filter((b) => b.bentuk !== bentuk);
    const nextCounts =
      nextVal > 0
        ? [...otherList, { bentuk, jumlah: nextVal }]
        : otherList;

    // Sort by ALL_BENTUK_SOAL order
    nextCounts.sort(
      (a, b) => ALL_BENTUK_SOAL.indexOf(a.bentuk) - ALL_BENTUK_SOAL.indexOf(b.bentuk)
    );

    onChangeParameters({
      ...parameters,
      bentukSoalCounts: nextCounts,
    });
    setValidationError(null);
  };

  const handleCompositionChange = (key: 'mudahL1' | 'sedangL2' | 'hotsL3', val: number) => {
    const nextComp = normalizeComposition(key, val, parameters.komposisiKesulitan);
    onChangeParameters({
      ...parameters,
      komposisiKesulitan: nextComp,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parameters.topikMateri.trim()) {
      setValidationError('Topik / Materi Pembelajaran wajib diisi sebelum menyusun instrumen asesmen.');
      return;
    }
    if (totalSoal <= 0) {
      setValidationError('Pilih minimal 1 butir soal pada bagian Bentuk & Jumlah Soal.');
      return;
    }
    setValidationError(null);
    onGenerate(parameters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulir Parameter Asesmen PAIBP"
      className="bg-white border border-slate-200 rounded-xl p-6 space-y-6"
    >
      <div className="border-b border-slate-200 pb-4 space-y-3">
        <div>
          <p className="text-xs font-medium text-emerald-800">
            Protokol Parameter Input · Kurikulum Merdeka
          </p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Konfigurasi Kisi-Kisi & Butir Soal
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Sesuaikan fase, elemen PAIBP, bentuk soal AKM, dan proporsi level kognitif. Sistem menyusun matriks kisi-kisi terlebih dahulu (Blueprint-First) sebelum menurunkan naskah soal.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenKopModal}
          className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-between gap-2 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>⚙️ Pengaturan Kop &amp; Pejabat Penandatangan</span>
          </span>
          <span className="text-[11px] font-medium text-emerald-800 underline">Buka Form</span>
        </button>
      </div>

      {/* 1. Jenjang & Fase Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-800">
          01. Pilih Fase & Jenjang Pendidikan
        </label>
        <div
          role="group"
          aria-label="Pilihan Fase Kurikulum Merdeka"
          className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg"
        >
          {(Object.keys(FASE_PROFILES) as FaseCode[]).map((faseKey) => {
            const p = FASE_PROFILES[faseKey];
            const isSelected = parameters.fase === faseKey;
            return (
              <button
                key={faseKey}
                type="button"
                onClick={() => handleFaseChange(faseKey)}
                className={`px-3 py-2 text-left rounded-md transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="text-xs font-bold whitespace-nowrap">{faseKey}</div>
                <div className="text-[11px] text-slate-500 truncate">{p.kelasRange}</div>
              </button>
            );
          })}
        </div>

        {/* Phase Adaptation Rules Callout */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-900 font-semibold">
            <span>Adaptasi {profile.fase} ({profile.jenjang})</span>
            <span className="font-mono text-emerald-800">
              PG {profile.optionCount} Opsi ({profile.optionLabels.join('–')}) · {profile.bloomRange.split(' ')[0]}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">{profile.karakteristik}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label htmlFor="select-kelas" className="block text-xs font-medium text-slate-700 mb-1">
              Kelas Spesifik
            </label>
            <select
              id="select-kelas"
              value={parameters.kelas}
              onChange={(e) => handleKelasChange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
            >
              {profile.kelasOptions.map((kl) => (
                <option key={kl} value={kl}>
                  {kl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="select-jenis-ujian" className="block text-xs font-medium text-slate-700 mb-1">
              Jenis Asesmen / Ujian
            </label>
            <select
              id="select-jenis-ujian"
              value={parameters.jenisUjian}
              onChange={(e) => {
                const nextJenis = e.target.value as JenisUjian;
                const autoSmt: SemesterOption =
                  nextJenis === 'Asesmen Akhir Jenjang (AAJ / Ujian Praktik)'
                    ? 'Semua'
                    : activeSemester;
                onChangeParameters({
                  ...parameters,
                  jenisUjian: nextJenis,
                  semester: autoSmt,
                });
              }}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
            >
              {ALL_JENIS_UJIAN.map((ju) => (
                <option key={ju} value={ju}>
                  {ju}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Penentuan Semester Pembelajaran (Ganjil / Genap / Semua Semester) */}
        <div className="pt-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="select-semester" className="block text-xs font-semibold text-slate-800">
              Pilih Semester Pembelajaran (Kisi-Kisi &amp; Butir Soal)
            </label>
            <span className="text-[11px] font-mono font-semibold text-emerald-800">
              Aktif: {activeSemester === 'Ganjil' ? 'Semester 1 (Ganjil)' : activeSemester === 'Genap' ? 'Semester 2 (Genap)' : 'Ganjil & Genap'}
            </span>
          </div>
          <div
            role="group"
            aria-label="Pilih Semester Pembelajaran"
            className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200/80"
          >
            {(
              [
                { value: 'Ganjil' as SemesterOption, label: 'Semester 1 (Ganjil)', sub: 'Materi Smt. Ganjil' },
                { value: 'Genap' as SemesterOption, label: 'Semester 2 (Genap)', sub: 'Materi Smt. Genap' },
                { value: 'Semua' as SemesterOption, label: 'Semua Semester', sub: 'Gabungan / US' },
              ]
            ).map((smtOpt) => {
              const isSelected = activeSemester === smtOpt.value;
              return (
                <button
                  key={smtOpt.value}
                  type="button"
                  onClick={() => handleSemesterChange(smtOpt.value)}
                  aria-pressed={isSelected}
                  className={`px-2.5 py-2 text-left rounded-md transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-900 text-white shadow-xs font-semibold'
                      : 'bg-white/70 text-slate-700 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{smtOpt.label}</div>
                  <div
                    className={`text-[10px] truncate mt-0.5 ${
                      isSelected ? 'text-emerald-100' : 'text-slate-500'
                    }`}
                  >
                    {smtOpt.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Elemen PAI & 5 Dimensi Cinta (CP 020 Tahun 2026) */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-800">
          02. Elemen PAIBP & 5 Dimensi Cinta (Kepka 020/2026)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_ELEMEN.map((el) => {
            const active = parameters.elemen.includes(el);
            return (
              <button
                key={el}
                type="button"
                onClick={() => toggleElemen(el)}
                aria-pressed={active}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-emerald-900 text-white border-emerald-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {el}
              </button>
            );
          })}
        </div>
        <div className="p-2.5 bg-emerald-50/60 border border-emerald-200/80 rounded-lg text-[11px] text-slate-700 space-y-1">
          <div className="font-semibold text-emerald-950">
            Integrasi 5 Dimensi Cinta (CP 020 Tahun 2026):
          </div>
          {parameters.elemen.map((el) => (
            <div key={el} className="leading-snug">
              <span className="font-semibold text-slate-900">{el}:</span>{' '}
              <span>{ELEMEN_DIMENSI_CINTA[el]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Topik Materi & CP */}
      <div className="space-y-3">
        {(() => {
          const curriculumTopics = getTopicsForFaseAndKelas(
            parameters.fase,
            parameters.kelas,
            activeSemester
          );
          const matchedTopic = curriculumTopics.find(
            (t) =>
              t.judulTopik === parameters.topikMateri ||
              t.materiPokok === parameters.topikMateri ||
              (parameters.topikMateri && parameters.topikMateri.includes(t.judulTopik))
          );
          const activeTopicId = isCustomMode
            ? 'custom'
            : matchedTopic
            ? matchedTopic.id
            : curriculumTopics[0]?.id || 'custom';

          const applySelectedTopic = (chosen: CurriculumTopic) => {
            setIsCustomMode(false);
            setShowTpEditor(false);
            const titleUpper = chosen.judulTopik.toUpperCase();
            let nextJenisUjian = parameters.jenisUjian;
            if (titleUpper.includes('[PAKET US') || titleUpper.includes('AKHIR JENJANG')) {
              nextJenisUjian = 'Asesmen Akhir Jenjang (AAJ / Ujian Praktik)';
            } else if (titleUpper.includes('[PAKET SAS') || titleUpper.includes('[PAKET SAT')) {
              nextJenisUjian = 'Sumatif Akhir Semester (SAS)';
            } else if (titleUpper.includes('[PAKET ATS')) {
              nextJenisUjian = 'Asesmen Tengah Semester (ATS)';
            }

            onChangeParameters({
              ...parameters,
              jenisUjian: nextJenisUjian,
              semester:
                activeSemester === 'Semua'
                  ? 'Semua'
                  : (chosen.semester as SemesterOption) || activeSemester,
              topikMateri: chosen.judulTopik,
              capaianPembelajaranOpsional: chosen.rumusanTP,
              elemen: chosen.elemen,
              nilaiModerasiFokus: chosen.rekomendasiModerasi || parameters.nilaiModerasiFokus,
            });
            if (validationError) setValidationError(null);
          };

          const handleTopicSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const val = e.target.value;
            if (val === 'custom') {
              setIsCustomMode(true);
              setShowTpEditor(true);
              return;
            }
            const chosen = curriculumTopics.find((t) => t.id === val);
            if (chosen) {
              applySelectedTopic(chosen);
            }
          };

          const handleCycleSemesterBadge = () => {
            const order: SemesterOption[] = ['Ganjil', 'Genap', 'Semua'];
            const idx = order.indexOf(activeSemester);
            const nextSmt = order[(idx + 1) % order.length];
            handleSemesterChange(nextSmt);
          };

          const smtBadgeLabel =
            activeSemester === 'Ganjil'
              ? 'Semester 1 (Ganjil)'
              : activeSemester === 'Genap'
              ? 'Semester 2 (Genap)'
              : 'Semua Semester (Gabungan)';

          const packageTopics = curriculumTopics.filter(
            (t) => t.isPaketGabungan || t.judulTopik.includes('[PAKET')
          );
          const chapterTopics = curriculumTopics.filter(
            (t) => !t.isPaketGabungan && !t.judulTopik.includes('[PAKET')
          );

          return (
            <>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <label
                    htmlFor="select-topik-materi"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    03. Topik Materi &amp; Capaian Pembelajaran (CP/TP)
                  </label>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    Basis Data CP 020/2026 · Filter Aktif: {parameters.kelas} ({smtBadgeLabel}) ·{' '}
                    {curriculumTopics.length} Pilihan
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCycleSemesterBadge}
                  title="Klik untuk beralih antara Semester 1 (Ganjil), Semester 2 (Genap), dan Semua Semester"
                  aria-label={`Filter Semester Aktif: ${smtBadgeLabel}. Klik untuk mengganti semester`}
                  className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-400 rounded-full flex items-center gap-1 transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  <Check className="w-3 h-3 text-emerald-800 shrink-0" />
                  <span>
                    {activeSemester === 'Ganjil'
                      ? 'Smt. Ganjil'
                      : activeSemester === 'Genap'
                      ? 'Smt. Genap'
                      : 'Semua Smt.'}
                  </span>
                  <RotateCcw className="w-2.5 h-2.5 text-emerald-700 ml-0.5 shrink-0" />
                </button>
              </div>

              {/* Quick Semester Filter Pills inside Section 03 */}
              <div
                role="group"
                aria-label="Filter Semester Topik Materi Seksi 03"
                className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200"
              >
                {(
                  [
                    { value: 'Ganjil' as SemesterOption, label: 'Smt. 1 (Ganjil)' },
                    { value: 'Genap' as SemesterOption, label: 'Smt. 2 (Genap)' },
                    { value: 'Semua' as SemesterOption, label: 'Semua Semester' },
                  ]
                ).map((smtItem) => {
                  const isActive = activeSemester === smtItem.value;
                  return (
                    <button
                      key={smtItem.value}
                      type="button"
                      onClick={() => handleSemesterChange(smtItem.value)}
                      aria-pressed={isActive}
                      className={`py-1 px-2 text-[11px] font-semibold rounded transition-colors cursor-pointer text-center ${
                        isActive
                          ? 'bg-emerald-800 text-white shadow-2xs'
                          : 'text-slate-700 hover:bg-white'
                      }`}
                    >
                      {smtItem.label}
                    </button>
                  );
                })}
              </div>

              {/* Deretan Chips "Topik Pilihan Cepat" DI ATAS Dropdown (Seluruh Bab & Paket Kelas/Semester Aktif) */}
              {curriculumTopics.length > 0 && !isCustomMode && (
                <div className="space-y-1.5 p-2.5 bg-emerald-50/50 border border-emerald-200/80 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-950 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                      <span>
                        Topik Pilihan Cepat ({parameters.kelas} · {smtBadgeLabel}):
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800">
                      Klik 1x untuk pilih
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-0.5">
                    {curriculumTopics.map((t) => {
                      const isCurrent = matchedTopic?.id === t.id;
                      const isPaket = t.isPaketGabungan || t.judulTopik.includes('[PAKET');
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => applySelectedTopic(t)}
                          title={t.judulTopik}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-md transition-colors cursor-pointer border text-left ${
                            isCurrent
                              ? 'bg-emerald-900 text-white border-emerald-950 font-semibold shadow-2xs'
                              : isPaket
                              ? 'bg-amber-50 text-amber-950 hover:bg-amber-100 border-amber-300 font-semibold'
                              : 'bg-white text-slate-800 hover:bg-emerald-100/70 border-slate-300'
                          }`}
                        >
                          <Bookmark className="w-3 h-3 shrink-0" />
                          <span className="line-clamp-1">{t.judulTopik}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cascading Dropdown: Pilih Topik Materi Resmi (CP 020/2026) */}
              <div>
                <label
                  htmlFor="select-topik-materi"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Pilih Topik Materi Resmi ({parameters.kelas} · {smtBadgeLabel})
                </label>
                <select
                  id="select-topik-materi"
                  value={activeTopicId}
                  onChange={handleTopicSelectChange}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700 font-medium"
                >
                  {packageTopics.length > 0 && (
                    <optgroup
                      label={`📚 Paket Gabungan Ujian (${parameters.kelas} · ${smtBadgeLabel})`}
                    >
                      {packageTopics.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.judulTopik}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <optgroup
                    label={`📖 Daftar Bab & Elemen Inti CP 020/2026 (${parameters.kelas} · ${smtBadgeLabel})`}
                  >
                    {chapterTopics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.judulTopik}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Opsi Kustomisasi Mandiri">
                    <option value="custom">➕ Ketik / Kustomisasi Topik &amp; TP Sendiri</option>
                  </optgroup>
                </select>
              </div>

            {/* View Card for Selected Official Topic */}
            {!isCustomMode && matchedTopic ? (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-900 text-white rounded">
                      Semester {matchedTopic.semester || activeSemester}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">Materi Pokok:</span>
                    <span className="font-bold text-slate-900">{matchedTopic.materiPokok}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {matchedTopic.elemen.map((el) => (
                      <span
                        key={el}
                        className="text-[10px] font-medium px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md"
                      >
                        {el}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-emerald-950 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      <span>Rumusan Capaian / Tujuan Pembelajaran (TP) Resmi:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowTpEditor((prev) => !prev)}
                      className="text-emerald-800 hover:text-emerald-900 font-semibold text-[11px] inline-flex items-center gap-1 underline cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{showTpEditor ? 'Tutup Editor TP' : 'Sesuaikan Redaksi TP'}</span>
                    </button>
                  </div>

                  {!showTpEditor ? (
                    <div className="p-2.5 bg-white border border-emerald-200/90 rounded-md text-slate-800 font-serif leading-relaxed text-xs">
                      {parameters.capaianPembelajaranOpsional || matchedTopic.rumusanTP}
                    </div>
                  ) : (
                    <div className="space-y-1.5 pt-1">
                      <textarea
                        rows={3}
                        value={parameters.capaianPembelajaranOpsional ?? ''}
                        onChange={(e) =>
                          onChangeParameters({
                            ...parameters,
                            capaianPembelajaranOpsional: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-white border border-emerald-500 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-serif"
                      />
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Redaksi TP ini langsung dicetak ke Kolom 3 Matriks Kisi-Kisi.</span>
                        <button
                          type="button"
                          onClick={() =>
                            onChangeParameters({
                              ...parameters,
                              capaianPembelajaranOpsional: matchedTopic.rumusanTP,
                            })
                          }
                          className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 underline cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset ke Teks Bawaan CP 020</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Custom Mode: User Types Custom Topic and Custom Learning Objectives */}
            {isCustomMode && (
              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg space-y-3 text-xs">
                <div className="flex items-center justify-between text-amber-950 font-semibold border-b border-amber-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-amber-800" />
                    <span>Mode Kustom: Ketik Topik Materi &amp; TP Sendiri</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomMode(false);
                      setShowTpEditor(false);
                      const def = curriculumTopics[0];
                      if (def) {
                        onChangeParameters({
                          ...parameters,
                          topikMateri: def.judulTopik,
                          capaianPembelajaranOpsional: def.rumusanTP,
                          elemen: def.elemen,
                          nilaiModerasiFokus:
                            def.rekomendasiModerasi || parameters.nilaiModerasiFokus,
                        });
                      }
                    }}
                    className="text-[11px] text-emerald-900 hover:text-emerald-950 font-semibold underline cursor-pointer"
                  >
                    ↩️ Kembali ke Topik Resmi CP 020
                  </button>
                </div>

                <div>
                  <label htmlFor="input-topik-custom" className="block text-xs font-semibold text-slate-800 mb-1">
                    Topik / Materi Pembelajaran Kustom *
                  </label>
                  <textarea
                    id="input-topik-custom"
                    rows={2}
                    value={parameters.topikMateri}
                    onChange={(e) => {
                      onChangeParameters({ ...parameters, topikMateri: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="Ketik topik materi pembelajaran secara spesifik..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label htmlFor="input-cp-custom" className="block text-xs font-medium text-slate-700 mb-1">
                    Rumusan Capaian / Tujuan Pembelajaran (TP) Kustom
                  </label>
                  <textarea
                    id="input-cp-custom"
                    rows={2}
                    value={parameters.capaianPembelajaranOpsional ?? ''}
                    onChange={(e) =>
                      onChangeParameters({
                        ...parameters,
                        capaianPembelajaranOpsional: e.target.value,
                      })
                    }
                    placeholder="Murid mampu menganalisis / memahami..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700 font-serif"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Teks TP di atas akan langsung tercetak di Kolom 3 Matriks Kisi-Kisi dan dipertimbangkan penuh oleh AI generator.
                  </p>
                </div>
              </div>
            )}
          </>
        );
      })()}

        <div>
          <label htmlFor="select-moderasi" className="block text-xs font-medium text-slate-700 mb-1">
            Insersi Nilai Karakter Moderasi Beragama (Kemenag RI)
          </label>
          <select
            id="select-moderasi"
            value={parameters.nilaiModerasiFokus}
            onChange={(e) =>
              onChangeParameters({ ...parameters, nilaiModerasiFokus: e.target.value })
            }
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
          >
            {NILAI_MODERASI_OPTIONS.map((nm) => (
              <option key={nm} value={nm}>
                {nm}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Bentuk & Jumlah Soal */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-800">
            04. Bentuk & Jumlah Butir Soal
          </label>
          <span className="text-xs font-mono font-semibold text-emerald-800 tabular-nums">
            Total: {totalSoal} Butir Soal
          </span>
        </div>

        <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-slate-50/50">
          {ALL_BENTUK_SOAL.map((bentuk) => {
            const countObj = parameters.bentukSoalCounts.find((b) => b.bentuk === bentuk);
            const count = countObj ? countObj.jumlah : 0;
            const isRecommended = profile.recommendedShapes.includes(bentuk);

            return (
              <div key={bentuk} className="flex items-center justify-between px-3 py-2">
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-medium text-slate-900 flex items-center gap-1.5">
                    <span>{bentuk}</span>
                    {isRecommended && (
                      <span className="text-[11px] text-emerald-800 font-normal">
                        · Sesuai {parameters.fase}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    aria-label={`Kurangi jumlah soal ${bentuk}`}
                    onClick={() => updateBentukCount(bentuk, -1)}
                    disabled={count <= 0}
                    className="w-7 h-7 flex items-center justify-center rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-mono font-semibold text-slate-900 tabular-nums">
                    {count}
                  </span>
                  <button
                    type="button"
                    aria-label={`Tambah jumlah soal ${bentuk}`}
                    onClick={() => updateBentukCount(bentuk, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Komposisi Tingkat Kesulitan */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs font-semibold text-slate-800 whitespace-nowrap shrink-0">
            05. Komposisi Kesulitan (Bloom)
          </label>
          <span className="text-xs font-mono text-slate-600 tabular-nums whitespace-nowrap shrink-0">
            L1:{diffAlloc.countL1} · L2:{diffAlloc.countL2} · HOTS:{diffAlloc.countL3}
          </span>
        </div>

        <div className="space-y-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="slider-l1" className="font-medium text-slate-700">
                L1 — Mudah (C1–C2 Pemahaman): {parameters.komposisiKesulitan.mudahL1}%
              </label>
              <span className="font-mono text-slate-600 tabular-nums">{diffAlloc.countL1} soal</span>
            </div>
            <input
              id="slider-l1"
              type="range"
              min={0}
              max={100}
              step={5}
              value={parameters.komposisiKesulitan.mudahL1}
              onChange={(e) => handleCompositionChange('mudahL1', Number(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="slider-l2" className="font-medium text-slate-700">
                L2 — Sedang (C3 Penerapan): {parameters.komposisiKesulitan.sedangL2}%
              </label>
              <span className="font-mono text-slate-600 tabular-nums">{diffAlloc.countL2} soal</span>
            </div>
            <input
              id="slider-l2"
              type="range"
              min={0}
              max={100}
              step={5}
              value={parameters.komposisiKesulitan.sedangL2}
              onChange={(e) => handleCompositionChange('sedangL2', Number(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <label htmlFor="slider-l3" className="font-medium text-slate-900">
                L3 — HOTS (C4–C6 Analisis & Evaluasi): {parameters.komposisiKesulitan.hotsL3}%
              </label>
              <span className="font-mono font-semibold text-emerald-800 tabular-nums">
                {diffAlloc.countL3} soal
              </span>
            </div>
            <input
              id="slider-l3"
              type="range"
              min={0}
              max={100}
              step={5}
              value={parameters.komposisiKesulitan.hotsL3}
              onChange={(e) => handleCompositionChange('hotsL3', Number(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 6. Accordion Pengaturan Kop & Identitas Penandatangan */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/70">
        <button
          type="button"
          onClick={() => setIsKopAccordionOpen((prev) => !prev)}
          aria-expanded={isKopAccordionOpen}
          className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200/70 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Settings className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
            <span>06. Pengaturan Kop &amp; Identitas Penandatangan</span>
          </span>
          {isKopAccordionOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-600 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-600 shrink-0" />
          )}
        </button>

        {isKopAccordionOpen && (
          <div className="p-3.5 border-t border-slate-200 bg-slate-50">
            <KopPejabatForm
              kopConfig={kopConfig}
              onChangeKopConfig={onChangeKopConfig}
              onResetDefault={onResetKopConfig}
              compact={true}
            />
          </div>
        )}
      </div>

      {validationError && (
        <div
          role="alert"
          className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
          <span>{validationError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isGenerating}
        className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
      >
        <Sparkles className="w-4 h-4 shrink-0" />
        <span>
          {isGenerating
            ? 'Menyusun Kisi-Kisi, Kartu Soal & Naskah PAIBP...'
            : 'Susun Instrumen Asesmen (5 Bagian Resmi)'}
        </span>
      </button>
    </form>
  );
};
