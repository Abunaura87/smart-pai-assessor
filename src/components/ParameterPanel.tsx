import React, { useState } from 'react';
import {
  AssessmentParameters,
  BentukSoalType,
  ElemenPAI,
  FaseCode,
  JenisUjian,
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
import { Sparkles, Plus, Minus, BookOpen, AlertCircle } from 'lucide-react';

interface ParameterPanelProps {
  parameters: AssessmentParameters;
  onChangeParameters: (next: AssessmentParameters) => void;
  onGenerate: (params: AssessmentParameters) => void;
  isGenerating: boolean;
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
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const profile = getFaseProfile(parameters.fase);
  const totalSoal = getTotalQuestions(parameters.bentukSoalCounts);
  const diffAlloc = calculateDifficultyAllocation(totalSoal, parameters.komposisiKesulitan);

  const handleFaseChange = (newFase: FaseCode) => {
    const nextProfile = getFaseProfile(newFase);
    const defaultQuick = QUICK_TOPICS[newFase]?.[0];
    onChangeParameters({
      ...parameters,
      fase: newFase,
      jenjang: nextProfile.jenjang,
      kelas: nextProfile.kelasOptions[0],
      komposisiKesulitan: { ...nextProfile.defaultComposition },
      ...(defaultQuick
        ? {
            topikMateri: defaultQuick.topik,
            capaianPembelajaranOpsional: defaultQuick.cp,
            elemen: defaultQuick.elemen,
          }
        : {}),
    });
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
      <div className="border-b border-slate-200 pb-4">
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
              onChange={(e) => onChangeParameters({ ...parameters, kelas: e.target.value })}
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
              onChange={(e) =>
                onChangeParameters({ ...parameters, jenisUjian: e.target.value as JenisUjian })
              }
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
        <div className="flex items-center justify-between">
          <label htmlFor="input-topik" className="block text-xs font-semibold text-slate-800">
            03. Topik Materi & Capaian Pembelajaran (CP/TP)
          </label>
        </div>

        {/* Quick Topic Presets for active Fase */}
        {QUICK_TOPICS[parameters.fase] && QUICK_TOPICS[parameters.fase].length > 0 && (
          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 block">
              Contoh Topik Cepat ({parameters.fase}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_TOPICS[parameters.fase].map((qt) => (
                <button
                  key={qt.label}
                  type="button"
                  onClick={() => {
                    onChangeParameters({
                      ...parameters,
                      topikMateri: qt.topik,
                      capaianPembelajaranOpsional: qt.cp,
                      elemen: qt.elemen,
                    });
                    setValidationError(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3 h-3 shrink-0" />
                  <span className="truncate max-w-[240px]">{qt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <textarea
            id="input-topik"
            rows={2}
            value={parameters.topikMateri}
            onChange={(e) => {
              onChangeParameters({ ...parameters, topikMateri: e.target.value });
              if (validationError) setValidationError(null);
            }}
            placeholder="Contoh: Makna Q.S. Al-Hujurat: 6 tentang Tabayyun, Adab Bermedia Sosial, dan Pencegahan Bullying..."
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700"
          />
        </div>

        <div>
          <label htmlFor="input-cp" className="block text-xs font-medium text-slate-700 mb-1">
            Rumusan Capaian / Tujuan Pembelajaran (Opsional)
          </label>
          <textarea
            id="input-cp"
            rows={2}
            value={parameters.capaianPembelajaranOpsional ?? ''}
            onChange={(e) =>
              onChangeParameters({ ...parameters, capaianPembelajaranOpsional: e.target.value })
            }
            placeholder="Kosongkan jika ingin disusun otomatis sesuai CP Kurikulum Merdeka PAIBP..."
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-700"
          />
        </div>

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
