import React from 'react';
import { AssessmentPackage, ElemenPAI, FaseCode } from '../types/assessment';
import { ELEMEN_DIMENSI_CINTA, FASE_PROFILES, validateAssessmentPackage } from '../utils/paiRules';
import { CheckCircle2, AlertTriangle, ShieldCheck, HeartHandshake } from 'lucide-react';

interface KaidahValidatorSectionProps {
  pkg: AssessmentPackage;
  onSelectFasePreset: (fase: FaseCode) => void;
}

export const KaidahValidatorSection: React.FC<KaidahValidatorSectionProps> = ({
  pkg,
  onSelectFasePreset,
}) => {
  const validation = validateAssessmentPackage(pkg);

  return (
    <section id="kaidah-audit" className="no-print space-y-8 scroll-mt-24">
      {/* Audit Kaidah Penulisan Soal PAIBP & Moderasi Beragama */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium text-emerald-800">
              Audit Mutu Instrumen · Kepka Nomor 020 Tahun 2026 & Standar KKG/MGMP PAI
            </p>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Verifikasi Kaidah Kisi-Kisi, Gaya Bahasa Anti-Robotik & Moderasi Beragama
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
            <span className="font-semibold text-slate-900 font-mono tabular-nums">
              Kepatuhan Kaidah: {validation.score}%
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-800 font-medium">
              {validation.isValid ? 'Terverifikasi Valid' : 'Perlu Penyesuaian'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {validation.checks.map((chk, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs"
            >
              <div className="flex items-start gap-2 font-semibold text-slate-900">
                {chk.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <span>{chk.label}</span>
              </div>
              <p className="text-slate-600 leading-relaxed pl-6">{chk.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Landasan Materi: 5 Elemen PAI & 5 Dimensi Cinta (CP 020 Tahun 2026) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-emerald-800 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 shrink-0" />
              <span>Landasan Materi Regulasi CP PAIBP Terbaru (Kepka Nomor 020 Tahun 2026)</span>
            </p>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Integrasi 5 Elemen Inti PAI & 5 Dimensi Cinta
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Standar KKG/MGMP PAI & Kementerian Agama RI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {(Object.keys(ELEMEN_DIMENSI_CINTA) as ElemenPAI[]).map((el, idx) => {
            const isSelected = pkg.parameters.elemen.includes(el);
            return (
              <div
                key={el}
                className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-mono font-bold text-emerald-900">0{idx + 1}</span>
                  {isSelected && (
                    <span className="text-[11px] font-semibold text-emerald-800">Aktif</span>
                  )}
                </div>
                <p className="font-bold text-slate-900">{el}</p>
                <p className="text-slate-600 leading-relaxed">{ELEMEN_DIMENSI_CINTA[el]}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Peta Adaptasi Karakteristik Fase & Jenjang (Fase A s.d. Fase F) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-emerald-800">
              Pedoman Operasional Kurikulum Merdeka · Anti-Robotik & Sesuai Psikologi Usia Murid
            </p>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Matriks Adaptasi Karakteristik Fase & Jenjang (SD/MI, SMP/MTs, SMA/SMK/MA)
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Klik baris fase untuk memuat parameter dan model stimulus fase tersebut
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                <th className="py-3 px-3 font-semibold w-24">Fase</th>
                <th className="py-3 px-3 font-semibold w-36">Jenjang & Kelas</th>
                <th className="py-3 px-3 font-semibold w-36">Format Opsi PG</th>
                <th className="py-3 px-3 font-semibold w-44">Fokus Taksonomi Bloom</th>
                <th className="py-3 px-3 font-semibold">
                  Karakteristik Stimulus Otentik & Materi PAIBP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(Object.keys(FASE_PROFILES) as FaseCode[]).map((fKey) => {
                const prof = FASE_PROFILES[fKey];
                const isActive = pkg.parameters.fase === fKey;
                return (
                  <tr
                    key={fKey}
                    onClick={() => onSelectFasePreset(fKey)}
                    className={`cursor-pointer transition-colors ${
                      isActive ? 'bg-emerald-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap align-top">
                      {prof.fase}
                    </td>
                    <td className="py-3 px-3 text-slate-700 whitespace-nowrap align-top">
                      {prof.kelasRange}
                    </td>
                    <td className="py-3 px-3 font-mono text-emerald-900 whitespace-nowrap align-top tabular-nums">
                      {prof.optionCount} Opsi ({prof.optionLabels.join('–')})
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800 align-top">
                      {prof.bloomRange}
                    </td>
                    <td className="py-3 px-3 text-slate-600 leading-relaxed align-top">
                      {prof.karakteristik}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
