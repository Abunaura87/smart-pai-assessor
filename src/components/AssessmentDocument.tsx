import React, { useState } from 'react';
import { AssessmentPackage } from '../types/assessment';
import {
  ELEMEN_DIMENSI_CINTA,
  formatKelasSemester,
  formatStandardOutputMarkdown,
  getPracticeInstrument,
} from '../utils/paiRules';
import { Copy, Check, Download, Eye, EyeOff, Printer, FileText } from 'lucide-react';

interface AssessmentDocumentProps {
  pkg: AssessmentPackage;
  onPrint: () => void;
}

export const AssessmentDocument: React.FC<AssessmentDocumentProps> = ({ pkg, onPrint }) => {
  const [studentSheetOnly, setStudentSheetOnly] = useState(false);
  const [showRawMarkdown, setShowRawMarkdown] = useState(false);
  const [showAllKartuSoal, setShowAllKartuSoal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [highlightedBlueprintNo, setHighlightedBlueprintNo] = useState<number | null>(null);

  const rawMarkdown = formatStandardOutputMarkdown(pkg);
  const defaultKelasSmt = formatKelasSemester(pkg.parameters.kelas, pkg.parameters.jenisUjian);
  const practiceInstrument = getPracticeInstrument(pkg);

  const pgAndObjektifSoal = pkg.butirSoal.filter(
    (s) => s.bentukSoal !== 'Uraian' && s.bentukSoal !== 'Isian Singkat'
  );
  const uraianAndIsianSoal = pkg.butirSoal.filter(
    (s) => s.bentukSoal === 'Uraian' || s.bentukSoal === 'Isian Singkat'
  );

  // Representative main items for Kartu Soal (first PG + first Uraian/HOTS, or all if toggled)
  const sampleKartuSoal = showAllKartuSoal
    ? pkg.butirSoal
    : pkg.butirSoal.filter(
        (s, idx) =>
          idx === 0 ||
          s.bentukSoal === 'Uraian' ||
          (pkg.butirSoal.length > 2 && idx === pkg.butirSoal.length - 1)
      ).slice(0, 3);

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(rawMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = rawMarkdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([rawMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pkg.id}-asesmen-paibp-cp020.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Document Action Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl">
        <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-900">
            Struktur Keluaran Standar (5 Bagian Resmi KKG/MGMP PAI)
          </span>
          <span aria-hidden="true">·</span>
          <span>{pkg.kisiKisi.length} Baris Kisi-Kisi</span>
          <span aria-hidden="true">·</span>
          <span>{pkg.butirSoal.length} Butir Soal</span>
          <span aria-hidden="true">·</span>
          <span>{pkg.identitas.jenjangKelasFase}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setStudentSheetOnly(!studentSheetOnly)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {studentSheetOnly ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Tampilkan Seluruh 5 Bagian</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Mode Lembar Soal Murid</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowRawMarkdown(!showRawMarkdown)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{showRawMarkdown ? 'Tampilan Dokumen Resmi' : 'Format Markdown Standar'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-800">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Naskah</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh .MD</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak PDF</span>
          </button>
        </div>
      </div>

      {showRawMarkdown ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              Format Markdown Standar (5 Bagian Resmi KKG/MGMP PAI & Kepka No. 020 Tahun 2026)
            </h3>
            <span className="text-xs text-slate-500">Siap ditempel ke dokumen kurikulum / LMS</span>
          </div>
          <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200 overflow-x-auto">
            {rawMarkdown}
          </pre>
        </div>
      ) : (
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-10">
          {/* Document Header / Kop Resmi Asesmen */}
          <div className="border-b border-slate-200 pb-6 space-y-4">
            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-emerald-900">
                Kementerian Agama RI · KKG / MGMP PAI
              </span>
              <span aria-hidden="true">·</span>
              <span>Regulasi CP Kepka Nomor 020 Tahun 2026 / Kurikulum Merdeka</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight text-balance">
              {pkg.judulAsesmen}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-slate-500">Mata Pelajaran & Kelas/Smt</div>
                <div className="font-semibold text-slate-900 mt-0.5">
                  {pkg.identitas.mataPelajaran} · {pkg.identitas.jenjangKelasFase} ({defaultKelasSmt})
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-slate-500">Jenis Asesmen & Alokasi Waktu</div>
                <div className="font-semibold text-slate-900 mt-0.5">
                  {pkg.identitas.jenisAsesmen} · {pkg.identitas.alokasiWaktu}
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="text-slate-500">5 Dimensi Cinta & Moderasi Beragama</div>
                <div className="font-semibold text-emerald-900 mt-0.5">
                  {pkg.identitas.insersiModerasi}
                </div>
              </div>
            </div>
          </div>

          {/* 1. KISI-KISI PENULISAN SOAL (TABEL RESMI 9 KOLOM) */}
          {!studentSheetOnly && (
            <section id="bagian-1" className="space-y-4 scroll-mt-24">
              <div className="border-b border-slate-200 pb-2 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-800 block">
                    BAGIAN 1 · STANDAR KKG/MGMP PAI & KEPKA NO. 020 TAHUN 2026
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    1. KISI-KISI PENULISAN SOAL (TABEL RESMI)
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  Klik baris untuk menyorot butir soal & kartu soal terkait
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="py-3 px-2.5 font-semibold w-10 text-center">No</th>
                      <th className="py-3 px-2.5 font-semibold w-32">Elemen</th>
                      <th className="py-3 px-2.5 font-semibold min-w-[180px]">
                        Tujuan Pembelajaran (TP)
                      </th>
                      <th className="py-3 px-2.5 font-semibold w-24 text-center">Kelas/Smt</th>
                      <th className="py-3 px-2.5 font-semibold min-w-[150px]">Materi Pokok</th>
                      <th className="py-3 px-2.5 font-semibold w-32">Level Kognitif (L1/L2/L3)</th>
                      <th className="py-3 px-2.5 font-semibold min-w-[230px]">
                        Indikator Soal (Rumusan ABCD)
                      </th>
                      <th className="py-3 px-2.5 font-semibold w-28">Bentuk Soal</th>
                      <th className="py-3 px-2.5 font-semibold w-16 text-center">No. Soal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {pkg.kisiKisi.map((row) => {
                      const isHighlighted = highlightedBlueprintNo === row.no;
                      const kelasSmt = row.kelasSmt || defaultKelasSmt;
                      const materiPokok =
                        row.materiPokok || `${row.elemen} (${ELEMEN_DIMENSI_CINTA[row.elemen]})`;
                      return (
                        <tr
                          key={row.no}
                          onClick={() =>
                            setHighlightedBlueprintNo(isHighlighted ? null : row.no)
                          }
                          className={`transition-colors cursor-pointer ${
                            isHighlighted ? 'bg-emerald-50/80' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-2.5 font-mono text-center font-semibold text-slate-900 tabular-nums align-top">
                            {row.no}
                          </td>
                          <td className="py-3 px-2.5 align-top">
                            <div className="font-semibold text-slate-900">{row.elemen}</div>
                            <div className="text-[11px] text-emerald-800 mt-0.5 leading-snug">
                              {ELEMEN_DIMENSI_CINTA[row.elemen]}
                            </div>
                          </td>
                          <td className="py-3 px-2.5 text-slate-700 leading-relaxed align-top">
                            {row.capaianTujuanPembelajaran}
                          </td>
                          <td className="py-3 px-2.5 font-mono text-center text-slate-800 whitespace-nowrap align-top">
                            {kelasSmt}
                          </td>
                          <td className="py-3 px-2.5 font-medium text-slate-800 leading-snug align-top">
                            {materiPokok}
                          </td>
                          <td className="py-3 px-2.5 font-mono text-slate-800 align-top">
                            {row.levelKognitif}
                          </td>
                          <td className="py-3 px-2.5 text-slate-800 leading-relaxed align-top">
                            {row.indikatorSoalABCD}
                          </td>
                          <td className="py-3 px-2.5 text-slate-800 align-top">{row.bentukSoal}</td>
                          <td className="py-3 px-2.5 font-mono text-center font-semibold text-emerald-900 tabular-nums align-top">
                            {row.nomorSoal}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 2. NASKAH SOAL SIAP CETAK */}
          <section id="bagian-2" className="space-y-6 scroll-mt-24">
            <div className="border-b border-slate-200 pb-2 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 block">
                  BAGIAN 2 · FORMAT KOP & PETUNJUK UMUM UJIAN
                </span>
                <h2 className="text-lg font-bold text-slate-900">2. NASKAH SOAL SIAP CETAK</h2>
              </div>
              <span className="text-xs text-slate-500">
                Stimulus Otentik Bervariasi (Anti-Robotik) & Opsi Tindakan Konkret
              </span>
            </div>

            {/* Official Exam Header & General Instructions (Kop & Petunjuk Umum Ujian) */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-200 text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900">Nama Murid:</span>{' '}
                  ........................................
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Kelas / Semester:</span>{' '}
                  {pkg.parameters.kelas} ({defaultKelasSmt})
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Nomor Absen / Tanggal:</span>{' '}
                  ........ / ........................
                </div>
              </div>
              <div className="space-y-1 text-slate-700">
                <div className="font-bold text-slate-900">PETUNJUK UMUM UJIAN:</div>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-600 leading-relaxed">
                  <li>
                    Awali pengerjaan soal dengan membaca <em>Basmalah</em> dan berdoa kepada Allah
                    Swt. agar diberi kemudahan.
                  </li>
                  <li>
                    Bacalah setiap stimulus (kutipan ayat/hadis, cerita kasus, tabel, atau daftar
                    pernyataan) dengan saksama sebelum menjawab.
                  </li>
                  <li>
                    Kerjakan soal secara jujur dan mandiri sebagai wujud pengamalan sifat{' '}
                    <em>siddiq</em> dan <em>amanah</em>.
                  </li>
                </ol>
              </div>
            </div>

            {/* Sub-bagian I: Soal Pilihan Ganda / Objektif */}
            {pgAndObjektifSoal.length > 0 && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 px-3.5 py-2 rounded-lg border border-slate-200">
                  I. Naskah Soal Pilihan Ganda & Objektif — Pilihlah jawaban yang paling tepat!
                </div>

                <div className="space-y-5">
                  {pgAndObjektifSoal.map((soal) => {
                    const isHighlighted = highlightedBlueprintNo === soal.blueprintNo;
                    return (
                      <div
                        key={soal.nomor}
                        id={`soal-${soal.nomor}`}
                        className={`p-5 rounded-xl border transition-colors print-break-inside-avoid space-y-3.5 ${
                          isHighlighted
                            ? 'border-emerald-700 bg-emerald-50/30'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 text-xs text-slate-500">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                              Soal {soal.nomor}.
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium text-slate-800">{soal.bentukSoal}</span>
                            {!studentSheetOnly && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{soal.elemen}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono text-emerald-800">
                                  {soal.levelCode} / {soal.taksonomiBloom}
                                </span>
                                {soal.stimulusModel && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="text-slate-600">{soal.stimulusModel}</span>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          {!studentSheetOnly && (
                            <span className="text-[11px] text-slate-500 font-mono">
                              Kisi-Kisi #{soal.blueprintNo}
                            </span>
                          )}
                        </div>

                        {soal.stimulus && (
                          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                            {soal.stimulus}
                          </div>
                        )}

                        {soal.instruksiKhusus && (
                          <p className="text-xs font-semibold text-emerald-900">
                            Instruksi: {soal.instruksiKhusus}
                          </p>
                        )}

                        <p className="text-sm font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                          {soal.pertanyaan}
                        </p>

                        {soal.opsi && soal.opsi.length > 0 && (
                          <ol className="space-y-2 pt-1">
                            {soal.opsi.map((opt) => (
                              <li
                                key={opt.label}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed"
                              >
                                <span className="font-mono font-semibold text-slate-900 shrink-0 w-5">
                                  {opt.label}.
                                </span>
                                <span>{opt.teks}</span>
                              </li>
                            ))}
                          </ol>
                        )}

                        {soal.pernyataanBenarSalah && soal.pernyataanBenarSalah.length > 0 && (
                          <div className="overflow-x-auto border border-slate-200 rounded-lg mt-2">
                            <table className="w-full text-xs text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                                  <th className="py-2 px-3 font-semibold">Pernyataan</th>
                                  <th className="py-2 px-3 font-semibold text-center w-20">
                                    Benar
                                  </th>
                                  <th className="py-2 px-3 font-semibold text-center w-20">
                                    Salah
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {soal.pernyataanBenarSalah.map((item, idx) => (
                                  <tr key={idx}>
                                    <td className="py-2 px-3 text-slate-800 leading-relaxed">
                                      {idx + 1}. {item.pernyataan}
                                    </td>
                                    <td className="py-2 px-3 text-center font-mono text-slate-400">
                                      [ &nbsp; ]
                                    </td>
                                    <td className="py-2 px-3 text-center font-mono text-slate-400">
                                      [ &nbsp; ]
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {soal.pasanganMenjodohkan && soal.pasanganMenjodohkan.length > 0 && (
                          <div className="overflow-x-auto border border-slate-200 rounded-lg mt-2">
                            <table className="w-full text-xs text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                                  <th className="py-2 px-3 font-semibold">Lajur A (Premis)</th>
                                  <th className="py-2 px-3 font-semibold">
                                    Lajur B (Pasangan Konsep)
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {soal.pasanganMenjodohkan.map((pair, idx) => (
                                  <tr key={idx}>
                                    <td className="py-2 px-3 text-slate-800">
                                      {idx + 1}. {pair.premis}
                                    </td>
                                    <td className="py-2 px-3 text-slate-800">
                                      {String.fromCharCode(65 + idx)}. {pair.respon}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sub-bagian II: Soal Uraian / Essay & Isian */}
            {uraianAndIsianSoal.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider bg-slate-100 px-3.5 py-2 rounded-lg border border-slate-200">
                  II. Naskah Soal Isian & Uraian / Essay — Jawablah dengan tepat dan jelas!
                </div>

                <div className="space-y-5">
                  {uraianAndIsianSoal.map((soal) => {
                    const isHighlighted = highlightedBlueprintNo === soal.blueprintNo;
                    return (
                      <div
                        key={soal.nomor}
                        id={`soal-${soal.nomor}`}
                        className={`p-5 rounded-xl border transition-colors print-break-inside-avoid space-y-3.5 ${
                          isHighlighted
                            ? 'border-emerald-700 bg-emerald-50/30'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 text-xs text-slate-500">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                              Soal {soal.nomor}.
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium text-slate-800">{soal.bentukSoal}</span>
                            {!studentSheetOnly && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{soal.elemen}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono text-emerald-800">
                                  {soal.levelCode} / {soal.taksonomiBloom}
                                </span>
                              </>
                            )}
                          </div>
                          {!studentSheetOnly && (
                            <span className="text-[11px] text-slate-500 font-mono">
                              Kisi-Kisi #{soal.blueprintNo}
                            </span>
                          )}
                        </div>

                        {soal.stimulus && (
                          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                            {soal.stimulus}
                          </div>
                        )}

                        <p className="text-sm font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                          {soal.pertanyaan}
                        </p>

                        <div className="pt-2 space-y-2 text-xs text-slate-400">
                          <div className="border-b border-dashed border-slate-300 pb-2">
                            Jawaban: ....................................................................................................................................
                          </div>
                          {soal.bentukSoal === 'Uraian' && (
                            <div className="border-b border-dashed border-slate-300 pb-2">
                              ................................................................................................................................................
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* 3. KARTU SOAL (REPRESENTASI RESMI KKG/MGMP PAI) */}
          {!studentSheetOnly && (
            <section id="bagian-3" className="space-y-5 scroll-mt-24">
              <div className="border-b border-slate-200 pb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-800 block">
                    BAGIAN 3 · DOKUMEN ADMINISTRASI GURU STANDAR KKG/MGMP PAI & KEMENAG RI
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    3. KARTU SOAL (REPRESENTASI RESMI)
                  </h2>
                </div>
                {pkg.butirSoal.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAllKartuSoal((prev) => !prev)}
                    className="no-print px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {showAllKartuSoal
                      ? `Tampilkan Sampel Utama (3 Kartu)`
                      : `Tampilkan Seluruh Kartu Soal (${pkg.butirSoal.length} Nomor)`}
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {sampleKartuSoal.map((soal) => {
                  const bp =
                    pkg.kisiKisi.find((k) => k.no === soal.blueprintNo) || pkg.kisiKisi[0];
                  const kelasSmt = bp?.kelasSmt || defaultKelasSmt;
                  const materiPokok =
                    soal.materiPokok ||
                    bp?.materiPokok ||
                    `${soal.elemen} (${ELEMEN_DIMENSI_CINTA[soal.elemen]})`;

                  return (
                    <div
                      key={soal.nomor}
                      className="border border-slate-300 rounded-xl overflow-hidden bg-white print-break-inside-avoid"
                    >
                      <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-300 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-slate-900">
                          KARTU SOAL NOMOR {soal.nomor} — {soal.bentukSoal.toUpperCase()}
                        </span>
                        <span className="font-mono text-slate-600">
                          {pkg.identitas.mataPelajaran} · Kelas/Smt: {kelasSmt}
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <tbody className="divide-y divide-slate-200">
                            <tr>
                              <th className="py-2.5 px-3 bg-slate-50 font-semibold text-slate-800 w-44 border-r border-slate-200 align-top">
                                Elemen & Dimensi Cinta
                              </th>
                              <td className="py-2.5 px-3 text-slate-900 align-top">
                                <span className="font-semibold">{soal.elemen}</span> —{' '}
                                <span className="text-emerald-900">
                                  {ELEMEN_DIMENSI_CINTA[soal.elemen]}
                                </span>
                              </td>
                              <th className="py-2.5 px-3 bg-slate-50 font-semibold text-slate-800 w-36 border-x border-slate-200 align-top">
                                Level Kognitif
                              </th>
                              <td className="py-2.5 px-3 font-mono text-slate-900 align-top w-48">
                                {soal.levelCode} ({soal.taksonomiBloom})
                              </td>
                            </tr>
                            <tr>
                              <th className="py-2.5 px-3 bg-slate-50 font-semibold text-slate-800 border-r border-slate-200 align-top">
                                Tujuan Pembelajaran (TP)
                              </th>
                              <td className="py-2.5 px-3 text-slate-800 leading-relaxed align-top">
                                {bp?.capaianTujuanPembelajaran}
                              </td>
                              <th className="py-2.5 px-3 bg-slate-50 font-semibold text-slate-800 border-x border-slate-200 align-top">
                                Kunci Jawaban
                              </th>
                              <td className="py-2.5 px-3 font-mono font-bold text-emerald-900 align-top">
                                {soal.kunciJawaban}
                              </td>
                            </tr>
                            <tr>
                              <th className="py-2.5 px-3 bg-slate-50 font-semibold text-slate-800 border-r border-slate-200 align-top">
                                Materi Pokok
                              </th>
                              <td className="py-2.5 px-3 font-medium text-slate-900 align-top">
                                {materiPokok}
                              </td>
                              <th className="py-2.5 px-3 bg-slate-50 font-semibold text-slate-800 border-x border-slate-200 align-top">
                                Regulasi Acuan
                              </th>
                              <td className="py-2.5 px-3 text-slate-700 align-top">
                                Kepka No. 020 Tahun 2026
                              </td>
                            </tr>
                            <tr>
                              <th className="py-2.5 px-3 bg-slate-50 font-semibold text-slate-800 border-r border-slate-200 align-top">
                                Indikator Soal (ABCD)
                              </th>
                              <td
                                colSpan={3}
                                className="py-2.5 px-3 text-slate-800 leading-relaxed align-top"
                              >
                                {bp?.indikatorSoalABCD || soal.indikatorRef}
                              </td>
                            </tr>
                            <tr>
                              <th className="py-3 px-3 bg-slate-50 font-semibold text-slate-800 border-r border-slate-200 align-top">
                                Deskripsi Butir Soal
                              </th>
                              <td
                                colSpan={3}
                                className="py-3 px-3 text-slate-900 space-y-2 leading-relaxed align-top"
                              >
                                {soal.stimulus && (
                                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 whitespace-pre-line">
                                    {soal.stimulus}
                                  </div>
                                )}
                                <div className="font-medium whitespace-pre-line">
                                  {soal.pertanyaan}
                                </div>
                                {soal.opsi && soal.opsi.length > 0 && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 text-slate-700">
                                    {soal.opsi.map((o) => (
                                      <div key={o.label}>
                                        <span className="font-mono font-semibold">{o.label}.</span>{' '}
                                        {o.teks}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 4. KUNCI JAWABAN & PEMBAHASAN LENGKAP */}
          {!studentSheetOnly && (
            <section id="bagian-4" className="space-y-5 scroll-mt-24">
              <div className="border-b border-slate-200 pb-2 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-800 block">
                    BAGIAN 4 · REKAP KUNCI JAWABAN, ARGUMENTASI KONSEPTUAL & DALIL NAQLI
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    4. KUNCI JAWABAN & PEMBAHASAN LENGKAP
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  Tabel Kunci PG, Pembahasan Berbasis Dalil & Kunci Uraian
                </span>
              </div>

              {/* A. Tabel Kunci Jawaban Pilihan Ganda / Objektif */}
              {pgAndObjektifSoal.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    A. Tabel Kunci Jawaban Pilihan Ganda & Objektif
                  </h3>
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                          <th className="py-2.5 px-3 font-semibold w-20 text-center">No. Soal</th>
                          <th className="py-2.5 px-3 font-semibold">Bentuk Soal</th>
                          <th className="py-2.5 px-3 font-semibold text-center">Kunci Jawaban</th>
                          <th className="py-2.5 px-3 font-semibold">Level Kognitif</th>
                          <th className="py-2.5 px-3 font-semibold">Elemen PAI & Dimensi Cinta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {pgAndObjektifSoal.map((s) => (
                          <tr key={s.nomor}>
                            <td className="py-2 px-3 font-mono font-semibold text-center text-slate-900 tabular-nums">
                              {s.nomor}
                            </td>
                            <td className="py-2 px-3 text-slate-800">{s.bentukSoal}</td>
                            <td className="py-2 px-3 font-mono font-bold text-center text-emerald-900">
                              {s.kunciJawaban}
                            </td>
                            <td className="py-2 px-3 font-mono text-slate-700">
                              {s.levelCode} ({s.taksonomiBloom})
                            </td>
                            <td className="py-2 px-3 text-slate-700">
                              <span className="font-medium text-slate-900">{s.elemen}</span> —{' '}
                              {ELEMEN_DIMENSI_CINTA[s.elemen]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* B. Pembahasan Lengkap & Kunci Jawaban Uraian */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  B. Pembahasan Ringkas Berbasis Dalil & Kunci Jawaban Soal Uraian / Essay
                </h3>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
                  {pkg.butirSoal.map((soal) => (
                    <div key={soal.nomor} className="p-4 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-semibold text-slate-900">
                          <span className="font-mono tabular-nums">Nomor {soal.nomor}</span> ·{' '}
                          <span>{soal.bentukSoal}</span> — Kunci Jawaban:{' '}
                          <span className="font-mono font-bold text-emerald-900 whitespace-pre-line">
                            {soal.kunciJawaban}
                          </span>
                        </div>
                        <span className="text-slate-500">
                          Moderasi: {soal.nilaiModerasi}
                        </span>
                      </div>

                      <p className="text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900">Pembahasan: </span>
                        {soal.pembahasanSingkat}
                      </p>

                      <p className="text-slate-600">
                        <span className="font-semibold text-slate-800">
                          Rujukan Dalil / Konsep:{' '}
                        </span>
                        {soal.dalilAtauKonsep}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 5. RUBRIK PENILAIAN / PEDOMAN PENSKORAN & ASESMEN PRAKTIK */}
          {!studentSheetOnly && (
            <section id="bagian-5" className="space-y-6 scroll-mt-24">
              <div className="border-b border-slate-200 pb-2 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-800 block">
                    BAGIAN 5 · PEDOMAN PENSKORAN OBJEKTIF & INSTRUMEN NILAI PRAKTIK PAIBP
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    5. RUBRIK PENILAIAN / PEDOMAN PENSKORAN & ASESMEN PRAKTIK
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  Rubrik Analitik Uraian (Skor 1–4) & Penilaian Praktik Ibadah/Tilawah
                </span>
              </div>

              {/* A. Tabel Rekapitulasi Bobot Skor */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  A. Rekapitulasi Bobot Skor & Rumus Nilai Akhir Tertulis
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                        <th className="py-2.5 px-3 font-semibold">Bentuk Soal</th>
                        <th className="py-2.5 px-3 font-semibold text-center">Jumlah Soal</th>
                        <th className="py-2.5 px-3 font-semibold text-center">
                          Skor Maksimal per Butir
                        </th>
                        <th className="py-2.5 px-3 font-semibold text-center">Total Skor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {pkg.pedomanPenskoran.bobotPerBentuk.map((b, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-3 font-medium text-slate-900">{b.bentuk}</td>
                          <td className="py-2.5 px-3 text-center font-mono tabular-nums text-slate-700">
                            {b.jumlahSoal}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono tabular-nums text-slate-700">
                            {b.skorPerSoal}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-semibold tabular-nums text-slate-900">
                            {b.skorTotal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800">
                  {pkg.pedomanPenskoran.rumusNilaiAkhir}
                </div>
              </div>

              {/* B. Rubrik Analitik Soal Uraian */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  B. Rubrik Analitik Penskoran Soal Uraian / Essay (Kriteria Bobot Skor 1–4)
                </h3>
                {pkg.pedomanPenskoran.rubrikAnalitik.map((rubrik, rIdx) => (
                  <div
                    key={rIdx}
                    className="border border-slate-200 rounded-lg overflow-hidden space-y-0"
                  >
                    <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-slate-900">
                        Soal Nomor {rubrik.nomorSoal} ({rubrik.bentukSoal}) —{' '}
                        {rubrik.aspekPenilaian}
                      </span>
                      <span className="font-mono text-slate-600 tabular-nums">
                        Skor Maksimal: {rubrik.skorMaksimal}
                      </span>
                    </div>
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                          <th className="py-2 px-3 font-semibold w-24 text-center">Bobot Skor</th>
                          <th className="py-2 px-3 font-semibold">
                            Deskripsi Kriteria Penilaian Objektif
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {rubrik.kriteriaSkor.map((k, kIdx) => (
                          <tr key={kIdx}>
                            <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900 tabular-nums align-top">
                              {k.skor}
                            </td>
                            <td className="py-2.5 px-3 text-slate-700 leading-relaxed align-top">
                              {k.deskripsi}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              {/* C. Instrumen Asesmen Nilai Praktik PAIBP */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    C. Instrumen Asesmen Nilai Praktik PAIBP (Membaca Al-Qur&apos;an/Tajwid,
                    Hafalan, Wudhu, dan Gerakan/Bacaan Shalat)
                  </h3>
                  <span className="text-xs text-emerald-800 font-medium">
                    Standar Ujian Praktik & Akhir Jenjang PAIBP
                  </span>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                        <th className="py-2.5 px-2.5 font-semibold w-10 text-center">No</th>
                        <th className="py-2.5 px-2.5 font-semibold w-44">
                          Aspek Penilaian Praktik
                        </th>
                        <th className="py-2.5 px-2.5 font-semibold min-w-[180px]">
                          Indikator Kinerja
                        </th>
                        <th className="py-2.5 px-2.5 font-semibold min-w-[140px]">
                          Skor 4 (Sangat Baik)
                        </th>
                        <th className="py-2.5 px-2.5 font-semibold min-w-[140px]">
                          Skor 3 (Baik)
                        </th>
                        <th className="py-2.5 px-2.5 font-semibold min-w-[140px]">
                          Skor 2 (Cukup)
                        </th>
                        <th className="py-2.5 px-2.5 font-semibold min-w-[140px]">
                          Skor 1 (Perlu Bimbingan)
                        </th>
                        <th className="py-2.5 px-2.5 font-semibold w-16 text-center">Bobot</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {practiceInstrument.map((pr) => (
                        <tr key={pr.no}>
                          <td className="py-2.5 px-2.5 font-mono text-center font-semibold text-slate-900 align-top">
                            {pr.no}
                          </td>
                          <td className="py-2.5 px-2.5 font-semibold text-slate-900 align-top">
                            {pr.aspekPraktik}
                          </td>
                          <td className="py-2.5 px-2.5 text-slate-700 leading-relaxed align-top">
                            {pr.indikatorKinerja}
                          </td>
                          <td className="py-2.5 px-2.5 text-slate-700 leading-snug align-top">
                            {pr.kriteriaSkor4}
                          </td>
                          <td className="py-2.5 px-2.5 text-slate-700 leading-snug align-top">
                            {pr.kriteriaSkor3}
                          </td>
                          <td className="py-2.5 px-2.5 text-slate-700 leading-snug align-top">
                            {pr.kriteriaSkor2}
                          </td>
                          <td className="py-2.5 px-2.5 text-slate-700 leading-snug align-top">
                            {pr.kriteriaSkor1}
                          </td>
                          <td className="py-2.5 px-2.5 font-mono font-bold text-center text-emerald-900 align-top">
                            {pr.bobotMaksimal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </article>
      )}
    </div>
  );
};

