import React, { useEffect, useState } from 'react';
import {
  AssessmentPackage,
  DocumentLayoutMode,
  KopSoalConfig,
  LogoPresetType,
} from '../types/assessment';
import {
  ELEMEN_DIMENSI_CINTA,
  formatKelasSemester,
  getPracticeInstrument,
} from '../utils/paiRules';
import {
  buildPlainTextWithoutMarkdown,
  buildRichDocumentHtml,
  buildWordDocContent,
  formatKelasDisplay,
  getDefaultKopConfig,
  getOptionColumnsMode,
  LOGO_PRESET_DATA_URLS,
  resolveLogoUrl,
} from '../utils/documentExporter';
import {
  Copy,
  Check,
  Download,
  Eye,
  EyeOff,
  Printer,
  Settings2,
  FileSpreadsheet,
  Upload,
} from 'lucide-react';

interface AssessmentDocumentProps {
  pkg: AssessmentPackage;
  onPrint: () => void;
}

type UsSubTab = 'all' | 'cover' | 'berita-acara' | 'naskah' | 'ljk' | 'praktik';

export const AssessmentDocument: React.FC<AssessmentDocumentProps> = ({ pkg, onPrint }) => {
  const [studentSheetOnly, setStudentSheetOnly] = useState(false);
  const [showKopSettings, setShowKopSettings] = useState(false);
  const [showAllKartuSoal, setShowAllKartuSoal] = useState(false);
  const [copiedRichText, setCopiedRichText] = useState(false);
  const [highlightedBlueprintNo, setHighlightedBlueprintNo] = useState<number | null>(null);
  const [kopConfig, setKopConfig] = useState<KopSoalConfig>(() => getDefaultKopConfig(pkg));
  const [usSubTab, setUsSubTab] = useState<UsSubTab>('all');

  // Synchronize default Kop judul & layoutMode when assessment package changes
  useEffect(() => {
    const nextDefault = getDefaultKopConfig(pkg);
    setKopConfig((prev) => ({
      ...prev,
      layoutMode: nextDefault.layoutMode,
      barisKop2: nextDefault.barisKop2,
      logoKananPreset:
        prev.logoKananPreset === 'custom' ? 'custom' : nextDefault.logoKananPreset,
      judulAsesmenDokumen: nextDefault.judulAsesmenDokumen,
      waktuUjian: nextDefault.waktuUjian,
      namaSekolah: nextDefault.namaSekolah,
    }));
  }, [pkg.id, pkg.parameters.jenisUjian, pkg.parameters.jenjang]);

  const defaultKelasSmt = formatKelasSemester(pkg.parameters.kelas, pkg.parameters.jenisUjian);
  const kelasFormatted = formatKelasDisplay(pkg.parameters.kelas);
  const practiceInstrument = getPracticeInstrument(pkg);

  const pgAndObjektifSoal = pkg.butirSoal.filter(
    (s) => s.bentukSoal !== 'Uraian' && s.bentukSoal !== 'Isian Singkat'
  );
  const uraianAndIsianSoal = pkg.butirSoal.filter(
    (s) => s.bentukSoal === 'Uraian' || s.bentukSoal === 'Isian Singkat'
  );

  const sampleKartuSoal = showAllKartuSoal
    ? pkg.butirSoal
    : pkg.butirSoal
        .filter(
          (s, idx) =>
            idx === 0 ||
            s.bentukSoal === 'Uraian' ||
            (pkg.butirSoal.length > 2 && idx === pkg.butirSoal.length - 1)
        )
        .slice(0, 3);

  const logoKiriUrl = resolveLogoUrl(kopConfig.logoKiriPreset, kopConfig.logoKiriCustomUrl);
  const logoKananUrl = resolveLogoUrl(kopConfig.logoKananPreset, kopConfig.logoKananCustomUrl);

  const optionCommandLetters =
    pkg.parameters.fase === 'Fase A'
      ? 'a, b, atau c'
      : pkg.parameters.fase === 'Fase E' || pkg.parameters.fase === 'Fase F'
      ? 'a, b, c, d, atau e'
      : 'a, b, c, atau d';

  // Rich Text Copy (HTML + Clean Plain Text fallback, zero raw Markdown symbols)
  const handleCopyRichText = async () => {
    const richHtml = buildRichDocumentHtml(pkg, kopConfig, { studentSheetOnly });
    const cleanPlainText = buildPlainTextWithoutMarkdown(pkg, kopConfig, { studentSheetOnly });

    try {
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        const htmlBlob = new Blob([richHtml], { type: 'text/html' });
        const textBlob = new Blob([cleanPlainText], { type: 'text/plain' });
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob,
          }),
        ]);
        setCopiedRichText(true);
        setTimeout(() => setCopiedRichText(false), 2500);
        return;
      }
    } catch {
      // Fallback to rich DOM selection copy below
    }

    const container = document.createElement('div');
    container.innerHTML = richHtml;
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.backgroundColor = '#ffffff';
    container.style.color = '#000000';
    document.body.appendChild(container);

    const range = document.createRange();
    range.selectNodeContents(container);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }
    document.body.removeChild(container);
    setCopiedRichText(true);
    setTimeout(() => setCopiedRichText(false), 2500);
  };

  // Download native Microsoft Word (.doc) with Office XML namespaces & Times New Roman 12pt
  const handleDownloadWord = () => {
    const wordContent = buildWordDocContent(pkg, kopConfig, { studentSheetOnly });
    const blob = new Blob(['\ufeff', wordContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const modeSlug = kopConfig.layoutMode === 'us' ? 'ujian-sekolah' : 'kkg-sekolah';
    a.download = `${pkg.id}-${modeSlug}-paibp.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadCustomLogo = (
    side: 'kiri' | 'kanan',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (side === 'kiri') {
        setKopConfig((prev) => ({
          ...prev,
          logoKiriPreset: 'custom',
          logoKiriCustomUrl: result,
        }));
      } else {
        setKopConfig((prev) => ({
          ...prev,
          logoKananPreset: 'custom',
          logoKananCustomUrl: result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Compute Horizontal Answer Key Grid (4 columns side-by-side like official KKG / US sheets)
  const rowsPerKeyCol = Math.max(5, Math.ceil(pgAndObjektifSoal.length / 4));

  return (
    <div className="space-y-6">
      {/* Document Action Bar */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900">
              Tata Naskah Resmi ({kopConfig.layoutMode === 'us' ? 'Format Ujian Sekolah / AAJ' : 'Format Standar KKG / Sekolah'})
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
              onClick={() => setShowKopSettings((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                showKopSettings
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Kustomisasi Kop Soal</span>
            </button>

            <button
              type="button"
              onClick={() => setStudentSheetOnly(!studentSheetOnly)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {studentSheetOnly ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Tampilkan Seluruh Bagian</span>
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
              onClick={handleCopyRichText}
              title="Salin sebagai Rich Text (Tabel & Kop Surat langsung rapi saat di-paste ke Microsoft Word tanpa simbol Markdown)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedRichText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-800 font-semibold">
                    Tersalin (Format Word / Rich Text)
                  </span>
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
              onClick={handleDownloadWord}
              title="Unduh dokumen Microsoft Word (.doc) dengan font Times New Roman 12pt"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Word (.doc)</span>
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

        {/* Quick Mode Switcher: Mode A (Standar KKG/Sekolah) vs Mode B (Standar Ujian Sekolah / Akhir Jenjang) */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <FileSpreadsheet className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>Pilih Mode Layout Dokumen Resmi:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setKopConfig((prev) => ({
                  ...prev,
                  layoutMode: 'kkg',
                  barisKop2:
                    prev.barisKop2 === 'DINAS PENDIDIKAN DAN KEBUDAYAAN'
                      ? 'KELOMPOK KERJA GURU (KKG). PAIBP'
                      : prev.barisKop2,
                  logoKananPreset:
                    prev.logoKananPreset === 'tutwuri' ? 'kemenag' : prev.logoKananPreset,
                }))
              }
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                kopConfig.layoutMode === 'kkg'
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              A. Format Standar KKG / Sekolah (Formatif, ATS, SAS)
            </button>
            <button
              type="button"
              onClick={() =>
                setKopConfig((prev) => ({
                  ...prev,
                  layoutMode: 'us',
                  barisKop2: 'DINAS PENDIDIKAN DAN KEBUDAYAAN',
                  judulAsesmenDokumen:
                    'UJIAN SEKOLAH ( US ) PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI',
                  waktuUjian: '120 Menit',
                }))
              }
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                kopConfig.layoutMode === 'us'
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              B. Format Standar Ujian Sekolah / Akhir Jenjang (Cover, Berita Acara, LJK & Praktik)
            </button>
          </div>
        </div>

        {/* Collapsible Form Pengaturan Kustomisasi Kop Soal */}
        {showKopSettings && (
          <div className="pt-4 border-t border-slate-200 bg-slate-50/80 p-4 rounded-xl space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Pengaturan Kustomisasi Kop Soal & Identitas Dokumen
                </h3>
                <p className="text-slate-600">
                  Sesuaikan logo kiri/kanan, baris instansi kop surat, judul asesmen, dan nama
                  pengawas/guru PAI sebelum cetak atau salin ke Word.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setKopConfig(getDefaultKopConfig(pkg))}
                className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Reset ke Default KKG/Konawe Selatan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Logo Kiri */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                <label className="block font-semibold text-slate-800">
                  Opsi Logo Kiri (Default: Pemda Konawe Selatan)
                </label>
                <div className="flex items-center gap-3">
                  {logoKiriUrl && (
                    <img
                      src={logoKiriUrl}
                      alt="Pratinjau Logo Kiri"
                      className="w-10 h-12 object-contain border border-slate-200 rounded p-0.5 bg-white shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-1.5">
                    <select
                      aria-label="Pilih Preset Logo Kiri"
                      value={kopConfig.logoKiriPreset}
                      onChange={(e) =>
                        setKopConfig((prev) => ({
                          ...prev,
                          logoKiriPreset: e.target.value as LogoPresetType,
                        }))
                      }
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    >
                      <option value="pemda">Logo Pemda (Kab. Konawe Selatan)</option>
                      <option value="kemenag">Logo Kementerian Agama (Ikhlas Beramal)</option>
                      <option value="tutwuri">Logo Tut Wuri Handayani</option>
                      <option value="custom">Logo Upload Sendiri</option>
                      <option value="none">Tanpa Logo Kiri</option>
                    </select>
                    <label className="inline-flex items-center gap-1.5 text-emerald-800 font-medium cursor-pointer hover:underline">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Gambar Logo Kiri...</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadCustomLogo('kiri', e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Logo Kanan */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                <label className="block font-semibold text-slate-800">
                  Opsi Logo Kanan (Default: Kemenag / Tut Wuri Handayani)
                </label>
                <div className="flex items-center gap-3">
                  {logoKananUrl && (
                    <img
                      src={logoKananUrl}
                      alt="Pratinjau Logo Kanan"
                      className="w-10 h-12 object-contain border border-slate-200 rounded p-0.5 bg-white shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-1.5">
                    <select
                      aria-label="Pilih Preset Logo Kanan"
                      value={kopConfig.logoKananPreset}
                      onChange={(e) =>
                        setKopConfig((prev) => ({
                          ...prev,
                          logoKananPreset: e.target.value as LogoPresetType,
                        }))
                      }
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    >
                      <option value="kemenag">Logo Kementerian Agama (Ikhlas Beramal)</option>
                      <option value="tutwuri">Logo Tut Wuri Handayani</option>
                      <option value="pemda">Logo Pemda (Kab. Konawe Selatan)</option>
                      <option value="custom">Logo Upload Sendiri</option>
                      <option value="none">Tanpa Logo Kanan</option>
                    </select>
                    <label className="inline-flex items-center gap-1.5 text-emerald-800 font-medium cursor-pointer hover:underline">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Gambar Logo Kanan...</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadCustomLogo('kanan', e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Baris Kop 1, 2, 3, Judul & Tahun Pelajaran */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Baris Kop 1</label>
                <input
                  type="text"
                  value={kopConfig.barisKop1}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, barisKop1: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Baris Kop 2 (Dinas / KKG PAIBP)
                </label>
                <input
                  type="text"
                  value={kopConfig.barisKop2}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, barisKop2: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Baris Kop 3 (Kecamatan / Sekolah)
                </label>
                <input
                  type="text"
                  value={kopConfig.barisKop3}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, barisKop3: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-800 mb-1">
                  Judul Asesmen pada Kop
                </label>
                <input
                  type="text"
                  value={kopConfig.judulAsesmenDokumen}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, judulAsesmenDokumen: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Tahun Pelajaran</label>
                <input
                  type="text"
                  value={kopConfig.tahunPelajaran}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, tahunPelajaran: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Waktu Ujian</label>
                <input
                  type="text"
                  value={kopConfig.waktuUjian}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, waktuUjian: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Nama Pengawas PAI
                </label>
                <input
                  type="text"
                  value={kopConfig.namaPengawasPai}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, namaPengawasPai: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-800 mb-1">NIP Pengawas PAI</label>
                <input
                  type="text"
                  value={kopConfig.nipPengawasPai}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, nipPengawasPai: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Nama Guru PAI</label>
                <input
                  type="text"
                  value={kopConfig.namaGuruPai}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, namaGuruPai: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-800 mb-1">NIP Guru PAI</label>
                <input
                  type="text"
                  value={kopConfig.nipGuruPai}
                  onChange={(e) =>
                    setKopConfig((prev) => ({ ...prev, nipGuruPai: e.target.value }))
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* Sub-tab selector when Mode B (Format Standar Ujian Sekolah / Akhir Jenjang) is active */}
        {kopConfig.layoutMode === 'us' && (
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-900 mr-1">
              Kelengkapan Dokumen Ujian Sekolah (US):
            </span>
            {[
              { id: 'all', label: 'Semua Lembar US (Lengkap)' },
              { id: 'cover', label: '1. Cover & Petunjuk Umum' },
              { id: 'berita-acara', label: '2. Berita Acara & Daftar Hadir (20 Baris)' },
              { id: 'naskah', label: '3. Naskah Soal PG & Essay' },
              { id: 'ljk', label: '4. Lembar Jawaban (LJK)' },
              { id: 'praktik', label: '5. Tabel Nilai Praktik US (16 Baris)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setUsSubTab(tab.id as UsSubTab)}
                className={`px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                  usSubTab === tab.id
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MAIN OFFICIAL DOCUMENT CANVAS */}
      <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-10 print-clean-card">
        {/* 1. KISI-KISI PENULISAN SOAL (TABEL RESMI 9 KOLOM) */}
        {!studentSheetOnly && (
          <section id="bagian-1" className="space-y-4 scroll-mt-24">
            <div className="no-print border-b border-slate-200 pb-2 flex flex-wrap items-baseline justify-between gap-2">
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

            {/* Print header for Kisi-Kisi */}
            <div className="text-center font-serif space-y-0.5 pb-2">
              <div className="text-sm sm:text-base font-bold uppercase text-slate-900">
                KISI-KISI PENULISAN SOAL {kopConfig.judulAsesmenDokumen}
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase text-slate-800">
                {kopConfig.barisKop1} — {kopConfig.tahunPelajaran}
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-300 rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 border-b border-slate-300">
                    <th className="py-2.5 px-2 font-semibold w-10 text-center border-r border-slate-300">
                      No
                    </th>
                    <th className="py-2.5 px-2.5 font-semibold w-32 border-r border-slate-300">
                      Elemen
                    </th>
                    <th className="py-2.5 px-2.5 font-semibold min-w-[170px] border-r border-slate-300">
                      Tujuan Pembelajaran (TP)
                    </th>
                    <th className="py-2.5 px-2 font-semibold w-24 text-center border-r border-slate-300">
                      Kelas/Smt
                    </th>
                    <th className="py-2.5 px-2.5 font-semibold min-w-[140px] border-r border-slate-300">
                      Materi Pokok
                    </th>
                    <th className="py-2.5 px-2 font-semibold w-28 border-r border-slate-300">
                      Level Kognitif (L1/L2/L3)
                    </th>
                    <th className="py-2.5 px-2.5 font-semibold min-w-[210px] border-r border-slate-300">
                      Indikator Soal (Rumusan ABCD)
                    </th>
                    <th className="py-2.5 px-2 font-semibold w-24 border-r border-slate-300">
                      Bentuk Soal
                    </th>
                    <th className="py-2.5 px-2 font-semibold w-14 text-center">No. Soal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
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
                        <td className="py-2.5 px-2 font-mono text-center font-semibold text-slate-900 tabular-nums align-top border-r border-slate-300">
                          {row.no}
                        </td>
                        <td className="py-2.5 px-2.5 align-top border-r border-slate-300">
                          <div className="font-semibold text-slate-900">{row.elemen}</div>
                          <div className="text-[11px] text-emerald-800 mt-0.5 leading-snug">
                            {ELEMEN_DIMENSI_CINTA[row.elemen]}
                          </div>
                        </td>
                        <td className="py-2.5 px-2.5 text-slate-800 leading-relaxed align-top border-r border-slate-300">
                          {row.capaianTujuanPembelajaran}
                        </td>
                        <td className="py-2.5 px-2 font-mono text-center text-slate-900 whitespace-nowrap align-top border-r border-slate-300">
                          {kelasSmt}
                        </td>
                        <td className="py-2.5 px-2.5 font-medium text-slate-900 leading-snug align-top border-r border-slate-300">
                          {materiPokok}
                        </td>
                        <td className="py-2.5 px-2 font-mono text-slate-900 align-top border-r border-slate-300">
                          {row.levelKognitif}
                        </td>
                        <td className="py-2.5 px-2.5 text-slate-900 leading-relaxed align-top border-r border-slate-300">
                          {row.indikatorSoalABCD}
                        </td>
                        <td className="py-2.5 px-2 text-slate-900 align-top border-r border-slate-300">
                          {row.bentukSoal}
                        </td>
                        <td className="py-2.5 px-2 font-mono text-center font-semibold text-emerald-900 tabular-nums align-top">
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

        {/* MODE B SPECIAL SECTIONS: COVER LEMBAR SOAL US & BERITA ACARA + DAFTAR HADIR 20 BARIS */}
        {kopConfig.layoutMode === 'us' && (usSubTab === 'all' || usSubTab === 'cover') && (
          <section className="print-page-break border border-slate-300 rounded-xl p-6 sm:p-8 bg-white font-serif text-black space-y-6 print-clean-card">
            {/* Top Bar: Logo Pemda + Instansi + Kotak UTAMA */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {logoKiriUrl && (
                  <img
                    src={logoKiriUrl}
                    alt="Logo Instansi"
                    className="w-14 h-16 object-contain shrink-0"
                  />
                )}
                <div className="font-bold text-xs sm:text-sm uppercase leading-snug">
                  <div>{kopConfig.barisKop1}</div>
                  <div>{kopConfig.barisKop2}</div>
                </div>
              </div>
              <div className="border-2 border-black px-5 py-2 text-lg sm:text-2xl font-bold tracking-wider uppercase">
                UTAMA
              </div>
            </div>

            {/* Center Banner: Logo Kemenag + Judul Ujian Sekolah + Logo Tut Wuri */}
            <div className="flex items-center justify-between gap-4 py-4">
              <img
                src={LOGO_PRESET_DATA_URLS.kemenag}
                alt="Logo Kementerian Agama"
                className="w-14 h-16 object-contain shrink-0"
              />
              <div className="text-center font-bold text-xs sm:text-sm uppercase leading-relaxed">
                <div>{kopConfig.judulAsesmenDokumen}</div>
                <div>TINGKAT {kopConfig.namaSekolah}</div>
                <div>
                  TAHUN PELAJARAN {kopConfig.tahunPelajaran.replace(/^TP\.?\s*/i, '')}
                </div>
                <div className="mt-1 underline">LEMBAR SOAL</div>
              </div>
              <img
                src={LOGO_PRESET_DATA_URLS.tutwuri}
                alt="Logo Tut Wuri Handayani"
                className="w-14 h-16 object-contain shrink-0"
              />
            </div>

            {/* Tabel Identitas Mata Ujian */}
            <div className="max-w-xl mx-auto text-xs sm:text-sm font-bold space-y-1.5">
              <div className="grid grid-cols-12">
                <div className="col-span-5">MATA UJIAN</div>
                <div className="col-span-7">: PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-5">SATUAN PENDIDIKAN</div>
                <div className="col-span-7">: {kopConfig.namaSekolah}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-5">HARI/TANGGAL</div>
                <div className="col-span-7">: {kopConfig.hariTanggal}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-5">WAKTU</div>
                <div className="col-span-7">: {kopConfig.waktuUjian.toUpperCase()}</div>
              </div>
            </div>

            {/* PETUNJUK UMUM */}
            <div className="pt-2 space-y-3 text-xs sm:text-sm">
              <div className="text-center font-bold uppercase underline">PETUNJUK UMUM</div>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>Isikan identitas Anda pada lembar jawaban Ujian Sekolah (US).</li>
                <li>
                  Beri tanda silang (X) pada jawaban yang dianggap paling tepat:
                  <div className="inline-flex items-center ml-3 align-middle border border-black text-xs font-mono">
                    <span className="px-2 py-0.5 border-r border-black">A</span>
                    <span className="px-2 py-0.5 border-r border-black font-bold bg-slate-100">
                      X
                    </span>
                    <span className="px-2 py-0.5 border-r border-black">C</span>
                    <span className="px-2 py-0.5">D</span>
                  </div>
                </li>
                <li>
                  Bila jawaban hendak diperbaiki untuk mengganti dengan pilihan jawaban lain, maka
                  berilah tanda horizontal pada jawaban semula lalu silang pilihan baru:
                  <div className="inline-flex items-center ml-3 align-middle border border-black text-xs font-mono">
                    <span className="px-2 py-0.5 border-r border-black line-through">X</span>
                    <span className="px-2 py-0.5 border-r border-black">B</span>
                    <span className="px-2 py-0.5 border-r border-black font-bold bg-slate-100">
                      X
                    </span>
                    <span className="px-2 py-0.5">D</span>
                  </div>
                </li>
                <li>Tulis nomor peserta pada kolom yang disediakan.</li>
                <li>
                  Jumlah soal sebanyak {pkg.butirSoal.length} butir ({pgAndObjektifSoal.length}{' '}
                  soal pilihan ganda dan {uraianAndIsianSoal.length} soal uraian).
                </li>
                <li>Periksa dan bacalah setiap butir soal sebelum Anda menjawabnya.</li>
                <li>
                  Laporkan kepada Pengawas Ujian apabila terdapat lembar soal yang kurang jelas,
                  rusak, atau tidak lengkap.
                </li>
                <li>
                  Periksa kembali pekerjaan Anda sebelum diserahkan kepada Pengawas Ujian.
                </li>
              </ol>
            </div>
          </section>
        )}

        {kopConfig.layoutMode === 'us' &&
          (usSubTab === 'all' || usSubTab === 'berita-acara') && (
            <section className="print-page-break space-y-8 font-serif text-black">
              {/* Lembar Berita Acara Pelaksanaan Ujian */}
              <div className="border border-slate-300 rounded-xl p-6 sm:p-8 bg-white space-y-4 text-xs sm:text-sm leading-relaxed print-clean-card">
                <div className="text-center font-bold uppercase text-sm sm:text-base">
                  <div>BERITA ACARA</div>
                  <div>
                    PELAKSANAAN UJIAN SEKOLAH TAHUN PELAJARAN{' '}
                    {kopConfig.tahunPelajaran.replace(/^TP\.?\s*/i, '')}
                  </div>
                </div>
                <p>
                  Pada hari ini ............................ tanggal ............................
                  bulan ............................ tahun <strong>dua ribu dua puluh enam</strong>.
                </p>
                <div className="space-y-1.5">
                  <p>
                    a. Telah diselenggarakan Ujian Sekolah (US) dari pukul ................. sampai
                    dengan pukul : .............
                  </p>
                  <p className="pl-4">
                    Pada Sekolah ............................................. Ruang
                    ....................................................
                  </p>
                  <p className="pl-4">
                    Jumlah peserta seharusnya : ..................................................
                    Orang murid
                  </p>
                  <p className="pl-4">
                    Jumlah peserta yang tidak hadir :
                    .................................................. Orang murid
                  </p>
                  <p className="pl-4">
                    Jumlah yang hadir : .................................................. Orang
                    murid
                  </p>
                </div>
                <p>
                  b. Telah dibuka sampul Ujian Sekolah (US) untuk mata pelajaran{' '}
                  <strong>Pendidikan Agama Islam dan Budi Pekerti</strong> dengan nomor kode
                  ................. di Ruang Ujian Sekolah dengan disaksikan oleh para peserta yang
                  berisi lembar Soal sebanyak ............... Eksemplar, lembar jawaban sebanyak
                  ............... Eksemplar, dan Blanko daftar hadir sebanyak ...............
                  Eksemplar. Sebelum dibuka sampul Ujian Sekolah (US) tersebut dalam keadaan baik.
                </p>
                <div className="space-y-1">
                  <p>c. Catatan selama pelaksanaan Ujian Sekolah (US)</p>
                  <div className="border-b border-dotted border-black h-5" />
                  <div className="border-b border-dotted border-black h-5" />
                </div>
                <p>Berita acara ini dibuat dengan sesungguhnya.</p>
                <div className="text-center font-bold pt-2">Pembuat Berita Acara</div>
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1">
                    <div className="font-bold">Pengawas I</div>
                    <div className="pt-3">Tanda tangan : ....................................</div>
                    <div className="pt-2">Nama : ....................................</div>
                    <div>NIP. : ....................................</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold">Pengawas II</div>
                    <div className="pt-3">Tanda tangan : ....................................</div>
                    <div className="pt-2">Nama : ....................................</div>
                    <div>NIP. : ....................................</div>
                  </div>
                </div>
              </div>

              {/* Daftar Hadir Peserta Ujian Sekolah (Tabel 20 Baris) */}
              <div className="print-page-break border border-slate-300 rounded-xl p-6 sm:p-8 bg-white space-y-4 text-xs print-clean-card">
                <div className="text-center font-bold uppercase text-sm sm:text-base">
                  <div>DAFTAR HADIR PESERTA UJIAN SEKOLAH (US)</div>
                  <div>
                    TAHUN PELAJARAN {kopConfig.tahunPelajaran.replace(/^TP\.?\s*/i, '')}
                  </div>
                </div>
                <div className="space-y-1 font-medium">
                  <div>Kab./Kota : {kopConfig.kabupatenKota}</div>
                  <div>Nama Sekolah : .................................................</div>
                  <div>Mata Pelajaran : Pendidikan Agama Islam dan Budi Pekerti</div>
                </div>
                <table className="w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-center">
                      <th className="border border-black py-1.5 px-2 w-10">No</th>
                      <th className="border border-black py-1.5 px-3 w-40">Nomor Peserta</th>
                      <th className="border border-black py-1.5 px-3">
                        Nama Peserta (Isi dengan huruf balok)
                      </th>
                      <th className="border border-black py-1.5 px-3 w-44">Tanda Tangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <tr key={num}>
                        <td className="border border-black py-1 px-2 text-center font-mono">
                          {num}
                        </td>
                        <td className="border border-black py-1 px-2">&nbsp;</td>
                        <td className="border border-black py-1 px-2">&nbsp;</td>
                        <td
                          className={`border border-black py-1 px-3 font-mono text-[11px] text-slate-500 ${
                            num % 2 === 1 ? 'text-left' : 'text-center'
                          }`}
                        >
                          {num}. ...........
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border border-black p-3 space-y-1">
                  <div>
                    Jumlah peserta seharusnya : ..................................................
                    murid
                  </div>
                  <div>
                    Jumlah peserta yang tidak hadir :
                    .................................................. murid
                  </div>
                  <div>
                    Jumlah yang hadir : .................................................. murid
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1">
                    <div className="font-bold">Pengawas I</div>
                    <div>Tanda tangan : ....................................</div>
                    <div>Nama : ....................................</div>
                    <div>NIP. : ....................................</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold">Pengawas II</div>
                    <div>Tanda tangan : ....................................</div>
                    <div>Nama : ....................................</div>
                    <div>NIP. : ....................................</div>
                  </div>
                </div>
              </div>
            </section>
          )}

        {/* 2. NASKAH SOAL SIAP CETAK (KOP SURAT RESMI + IDENTITAS 2 KOLOM + SOAL TANPA BADGE AI SAAT MODE MURID/CETAK) */}
        {(kopConfig.layoutMode === 'kkg' || usSubTab === 'all' || usSubTab === 'naskah') && (
          <section id="bagian-2" className="print-page-break space-y-6 scroll-mt-24">
            <div className="no-print border-b border-slate-200 pb-2 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 block">
                  BAGIAN 2 · FORMAT KOP RESMI, IDENTITAS 2 KOLOM & NASKAH SOAL SIAP CETAK
                </span>
                <h2 className="text-lg font-bold text-slate-900">2. NASKAH SOAL SIAP CETAK</h2>
              </div>
              <span className="text-xs text-slate-500">
                Garis Bawah Ganda · Opsi Jawaban Rapi · Bebas Simbol Markdown
              </span>
            </div>

            {/* OFFICIAL KOP SURAT (Logo Kiri, Teks Kop Rata Tengah Huruf Kapital Tebal, Logo Kanan + Garis Bawah Ganda 3px double black) */}
            <div
              style={{ borderBottom: '3px double #000000' }}
              className="pb-3 mb-4 font-serif text-black"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="w-16 sm:w-20 flex justify-center shrink-0">
                  {logoKiriUrl && (
                    <img
                      src={logoKiriUrl}
                      alt="Logo Kiri Kop"
                      className="w-14 h-16 sm:w-16 sm:h-20 object-contain"
                    />
                  )}
                </div>
                <div className="flex-1 text-center font-bold uppercase leading-snug tracking-tight space-y-0.5">
                  <div className="text-sm sm:text-base">{kopConfig.barisKop1}</div>
                  <div className="text-sm sm:text-base">{kopConfig.barisKop2}</div>
                  <div className="text-sm sm:text-base">{kopConfig.barisKop3}</div>
                  <div className="text-xs sm:text-sm">{kopConfig.judulAsesmenDokumen}</div>
                  <div className="text-xs sm:text-sm">{kopConfig.tahunPelajaran}</div>
                </div>
                <div className="w-16 sm:w-20 flex justify-center shrink-0">
                  {logoKananUrl && (
                    <img
                      src={logoKananUrl}
                      alt="Logo Kanan Kop"
                      className="w-14 h-16 sm:w-16 sm:h-20 object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* KOTAK / TABEL IDENTITAS MURID 2 KOLOM DI BAWAH KOP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs sm:text-sm font-serif font-bold text-black pb-2">
              <div className="space-y-1.5">
                <div className="flex items-baseline">
                  <span className="w-24 shrink-0">Nama</span>
                  <span>: ..................................................</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-24 shrink-0">Kelas</span>
                  <span>: {kelasFormatted}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-baseline">
                  <span className="w-28 shrink-0">Hari/Tanggal</span>
                  <span>: {kopConfig.hariTanggal}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-28 shrink-0">Waktu</span>
                  <span>: {kopConfig.waktuUjian}</span>
                </div>
              </div>
            </div>

            {/* Sub-bagian I / A: Soal Pilihan Ganda */}
            {pgAndObjektifSoal.length > 0 && (
              <div className="space-y-4 font-serif text-black">
                <div className="text-xs sm:text-sm font-bold text-black pt-1">
                  {kopConfig.layoutMode === 'us' ? (
                    <div>
                      <div>I. Pilihan Ganda</div>
                      <div className="italic font-normal">
                        Pilihlah salah satu jawaban yang paling benar di antara{' '}
                        {optionCommandLetters}!
                      </div>
                    </div>
                  ) : (
                    <div>
                      A. Berilah tanda silang (X) pada huruf {optionCommandLetters} sesuai jawaban
                      yang paling tepat!
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {pgAndObjektifSoal.map((soal) => {
                    const isHighlighted = highlightedBlueprintNo === soal.blueprintNo;
                    const optColMode = getOptionColumnsMode(soal.opsi);
                    return (
                      <div
                        key={soal.nomor}
                        id={`soal-${soal.nomor}`}
                        className={`p-4 rounded-lg border transition-colors print-break-inside-avoid print-clean-card space-y-2 ${
                          isHighlighted
                            ? 'border-emerald-700 bg-emerald-50/30'
                            : studentSheetOnly
                            ? 'border-transparent bg-white py-1 px-0'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        {/* Teacher Metadata Bar — Hidden in Student Sheet Mode and Hidden in Print */}
                        {!studentSheetOnly && (
                          <div className="no-print flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-1.5 text-[11px] font-sans text-slate-500">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-slate-800">
                                {soal.bentukSoal}
                              </span>
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
                            </div>
                            <span className="font-mono">Kisi-Kisi #{soal.blueprintNo}</span>
                          </div>
                        )}

                        <div className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                          <span className="font-semibold shrink-0 w-5">{soal.nomor}.</span>
                          <div className="flex-1 space-y-2 min-w-0">
                            {soal.stimulus && (
                              <div className="whitespace-pre-line text-justify leading-relaxed">
                                {soal.stimulus}
                              </div>
                            )}

                            {soal.instruksiKhusus && (
                              <p className="italic font-semibold">{soal.instruksiKhusus}</p>
                            )}

                            <p className="whitespace-pre-line text-justify">{soal.pertanyaan}</p>

                            {/* Options formatted dynamically in 4 columns, 2 columns, or 1 vertical column */}
                            {soal.opsi && soal.opsi.length > 0 && (
                              <div
                                className={
                                  optColMode === '4-col'
                                    ? 'grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 pt-1'
                                    : optColMode === '2-col'
                                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pt-1'
                                    : 'space-y-1 pt-1'
                                }
                              >
                                {soal.opsi.map((opt) => (
                                  <div key={opt.label} className="flex items-start gap-1.5">
                                    <span className="shrink-0 w-4">
                                      {opt.label.toLowerCase()}.
                                    </span>
                                    <span>{opt.teks}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {soal.pernyataanBenarSalah &&
                              soal.pernyataanBenarSalah.length > 0 && (
                                <div className="overflow-x-auto border border-black rounded mt-2">
                                  <table className="w-full text-xs text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-100 border-b border-black">
                                        <th className="py-1.5 px-2.5 font-semibold border-r border-black">
                                          Pernyataan
                                        </th>
                                        <th className="py-1.5 px-2.5 font-semibold text-center w-16 border-r border-black">
                                          Benar
                                        </th>
                                        <th className="py-1.5 px-2.5 font-semibold text-center w-16">
                                          Salah
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black">
                                      {soal.pernyataanBenarSalah.map((item, idx) => (
                                        <tr key={idx}>
                                          <td className="py-1.5 px-2.5 border-r border-black">
                                            {idx + 1}. {item.pernyataan}
                                          </td>
                                          <td className="py-1.5 px-2.5 text-center border-r border-black">
                                            [ &nbsp; ]
                                          </td>
                                          <td className="py-1.5 px-2.5 text-center">[ &nbsp; ]</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}

                            {soal.pasanganMenjodohkan &&
                              soal.pasanganMenjodohkan.length > 0 && (
                                <div className="overflow-x-auto border border-black rounded mt-2">
                                  <table className="w-full text-xs text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-100 border-b border-black">
                                        <th className="py-1.5 px-2.5 font-semibold border-r border-black">
                                          Lajur A (Premis)
                                        </th>
                                        <th className="py-1.5 px-2.5 font-semibold">
                                          Lajur B (Pasangan Konsep)
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black">
                                      {soal.pasanganMenjodohkan.map((pair, idx) => (
                                        <tr key={idx}>
                                          <td className="py-1.5 px-2.5 border-r border-black">
                                            {idx + 1}. {pair.premis}
                                          </td>
                                          <td className="py-1.5 px-2.5">
                                            {String.fromCharCode(65 + idx)}. {pair.respon}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sub-bagian II / B: Soal Uraian / Essay */}
            {uraianAndIsianSoal.length > 0 && (
              <div className="space-y-4 pt-3 font-serif text-black">
                <div className="text-xs sm:text-sm font-bold text-black">
                  {kopConfig.layoutMode === 'us'
                    ? 'II. Kerjakanlah soal Essay berikut ini dengan tepat dan jelas!'
                    : 'B. Uraian'}
                </div>

                <div className="space-y-4">
                  {uraianAndIsianSoal.map((soal, idx) => {
                    const isHighlighted = highlightedBlueprintNo === soal.blueprintNo;
                    const displayNum = kopConfig.layoutMode === 'kkg' ? idx + 1 : soal.nomor;
                    return (
                      <div
                        key={soal.nomor}
                        id={`soal-${soal.nomor}`}
                        className={`p-4 rounded-lg border transition-colors print-break-inside-avoid print-clean-card space-y-2 ${
                          isHighlighted
                            ? 'border-emerald-700 bg-emerald-50/30'
                            : studentSheetOnly
                            ? 'border-transparent bg-white py-1 px-0'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        {!studentSheetOnly && (
                          <div className="no-print flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-1.5 text-[11px] font-sans text-slate-500">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-slate-800">
                                {soal.bentukSoal}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{soal.elemen}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono text-emerald-800">
                                {soal.levelCode} / {soal.taksonomiBloom}
                              </span>
                            </div>
                            <span className="font-mono">Kisi-Kisi #{soal.blueprintNo}</span>
                          </div>
                        )}

                        <div className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                          <span className="font-semibold shrink-0 w-5">{displayNum}.</span>
                          <div className="flex-1 space-y-2 min-w-0">
                            {soal.stimulus && (
                              <div className="whitespace-pre-line text-justify leading-relaxed">
                                {soal.stimulus}
                              </div>
                            )}
                            <p className="whitespace-pre-line text-justify">{soal.pertanyaan}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* MODE B SPECIAL SECTION: LEMBAR JAWABAN (LJK TABEL PILIHAN GANDA A-B-C-D & ESSAY) */}
        {kopConfig.layoutMode === 'us' && (usSubTab === 'all' || usSubTab === 'ljk') && (
          <section className="print-page-break border border-slate-300 rounded-xl p-6 sm:p-8 bg-white font-serif text-black space-y-5 print-clean-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {logoKiriUrl && (
                  <img
                    src={logoKiriUrl}
                    alt="Logo Pemda"
                    className="w-12 h-14 object-contain shrink-0"
                  />
                )}
                <div className="font-bold text-xs sm:text-sm uppercase">
                  <div>{kopConfig.barisKop1}</div>
                  <div>{kopConfig.barisKop2}</div>
                </div>
              </div>
              <table className="border-collapse border border-black text-xs font-bold w-64">
                <tbody>
                  <tr>
                    <td className="border border-black py-1.5 px-2.5 w-24">NAMA</td>
                    <td className="border border-black py-1.5 px-2.5">&nbsp;</td>
                  </tr>
                  <tr>
                    <td className="border border-black py-1.5 px-2.5">NO. UJIAN</td>
                    <td className="border border-black py-1.5 px-2.5">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between gap-4 border-b-2 border-black pb-3">
              <img
                src={LOGO_PRESET_DATA_URLS.kemenag}
                alt="Logo Kemenag"
                className="w-12 h-14 object-contain shrink-0"
              />
              <div className="text-center font-bold text-xs sm:text-sm uppercase">
                <div>LEMBAR JAWABAN</div>
                <div>{kopConfig.judulAsesmenDokumen}</div>
                <div>TINGKAT {kopConfig.namaSekolah}</div>
                <div>
                  TAHUN PELAJARAN {kopConfig.tahunPelajaran.replace(/^TP\.?\s*/i, '')}
                </div>
              </div>
              <img
                src={LOGO_PRESET_DATA_URLS.tutwuri}
                alt="Logo Tut Wuri"
                className="w-12 h-14 object-contain shrink-0"
              />
            </div>

            <div className="space-y-2">
              <div className="font-bold text-xs sm:text-sm uppercase">I. PILIHAN GANDA</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[0, 1, 2].map((colGroup) => {
                  const rowsPerGroup = Math.max(5, Math.ceil(pgAndObjektifSoal.length / 3));
                  return (
                    <table
                      key={colGroup}
                      className="w-full border-collapse border border-black text-xs text-center"
                    >
                      <tbody>
                        {Array.from({ length: rowsPerGroup }, (_, r) => {
                          const qNum = colGroup * rowsPerGroup + r + 1;
                          return (
                            <tr key={qNum}>
                              <td className="border border-black py-1 px-2 font-bold w-8">
                                {qNum}
                              </td>
                              <td className="border border-black py-1 px-2">A</td>
                              <td className="border border-black py-1 px-2">B</td>
                              <td className="border border-black py-1 px-2">C</td>
                              <td className="border border-black py-1 px-2">D</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="font-bold text-xs sm:text-sm uppercase">II. ESSAY TEST</div>
              <div className="border-2 border-black h-64 p-4" />
            </div>
          </section>
        )}

        {/* 3. KARTU SOAL (REPRESENTASI RESMI KKG/MGMP PAI) */}
        {!studentSheetOnly && (
          <section id="bagian-3" className="print-page-break space-y-5 scroll-mt-24">
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
                    ? 'Tampilkan Sampel Utama (3 Kartu)'
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

        {/* 4. KUNCI JAWABAN (KOLOM MENYAMPING RESMI) & PEMBAHASAN LENGKAP */}
        {!studentSheetOnly && (
          <section id="bagian-4" className="print-page-break space-y-5 scroll-mt-24">
            <div className="no-print border-b border-slate-200 pb-2 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 block">
                  BAGIAN 4 · KUNCI JAWABAN KOLOM MENYAMPING, URAIAN & PEMBAHASAN DALIL
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  4. KUNCI JAWABAN & PEMBAHASAN LENGKAP
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                Format Kunci Jawaban Menyamping Standar KKG / Ujian Sekolah
              </span>
            </div>

            <div className="text-center font-serif font-bold text-base uppercase text-black">
              KUNCI JAWABAN
            </div>

            {/* A. Kunci Jawaban Pilihan Ganda (Tabel Kolom Menyamping 1-5, 6-10, 11-15, 16-20 / 1-10, 11-20) */}
            {pgAndObjektifSoal.length > 0 && (
              <div className="space-y-3 font-serif text-black">
                <h3 className="text-sm font-bold">A. Pilihan Ganda</h3>
                <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg print-clean-card">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <tbody>
                      {Array.from({ length: rowsPerKeyCol }, (_, rIdx) => (
                        <tr key={rIdx}>
                          {[0, 1, 2, 3].map((cIdx) => {
                            const itemIdx = cIdx * rowsPerKeyCol + rIdx;
                            const item = pgAndObjektifSoal[itemIdx];
                            return (
                              <td key={cIdx} className="py-1 px-2 w-1/4 font-mono">
                                {item ? (
                                  <span>
                                    <strong className="inline-block w-7">{item.nomor}.</strong>{' '}
                                    <span className="font-bold text-emerald-950">
                                      {item.kunciJawaban}
                                    </span>
                                  </span>
                                ) : (
                                  <span>&nbsp;</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* B. Kunci Jawaban Uraian & Pembahasan */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-serif text-black">
                B. Uraian & Pembahasan Ringkas Berbasis Dalil
              </h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
                {pkg.butirSoal.map((soal) => (
                  <div key={soal.nomor} className="p-4 space-y-1.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-semibold text-slate-900">
                        <span className="font-mono tabular-nums">Nomor {soal.nomor}</span> ·{' '}
                        <span>{soal.bentukSoal}</span> — Kunci Jawaban:{' '}
                        <span className="font-mono font-bold text-emerald-900 whitespace-pre-line">
                          {soal.kunciJawaban}
                        </span>
                      </div>
                      <span className="text-slate-500">Moderasi: {soal.nilaiModerasi}</span>
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
              <p className="text-xs italic font-serif text-slate-700 pt-1">
                <strong>Catatan :</strong> Jawaban uraian diserahkan kepada masing-masing guru PAI.
              </p>
            </div>
          </section>
        )}

        {/* 5. RUBRIK PENILAIAN / PEDOMAN PENSKORAN & INSTRUMEN ASESMEN NILAI PRAKTIK PAI & BP */}
        {!studentSheetOnly && (
          <section id="bagian-5" className="print-page-break space-y-6 scroll-mt-24">
            <div className="no-print border-b border-slate-200 pb-2 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 block">
                  BAGIAN 5 · PEDOMAN PENSKORAN OBJEKTIF & INSTRUMEN NILAI PRAKTIK PAI & BP
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  5. RUBRIK PENILAIAN / PEDOMAN PENSKORAN & ASESMEN PRAKTIK
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                Rubrik Analitik Uraian (Skor 1–4) & Tabel Nilai Praktik Ujian Sekolah (16 Baris)
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
                      Soal Nomor {rubrik.nomorSoal} ({rubrik.bentukSoal}) — {rubrik.aspekPenilaian}
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

            {/* C. TABEL INSTRUMEN ASESMEN NILAI PRAKTIK UJIAN SEKOLAH (US) PAI DAN BUDI PEKERTI */}
            <div className="print-page-break space-y-4 pt-4 font-serif text-black">
              <div className="text-center font-bold uppercase text-xs sm:text-sm space-y-0.5">
                <div>INSTRUMEN ASESMEN</div>
                <div>NILAI PRAKTIK UJIAN SEKOLAH (US) PAI DAN BUDI PEKERTI</div>
                <div>
                  TAHUN PELAJARAN {kopConfig.tahunPelajaran.replace(/^TP\.?\s*/i, '')}
                </div>
              </div>

              {/* Tabel Resmi Penilaian Praktik (Aspek Al-Qur'an, Aspek Fiqih Wudhu, Aspek Ibadah Shalat) */}
              <div className="overflow-x-auto border border-black">
                <table className="w-full text-[11px] text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th rowSpan={4} className="border border-black py-1.5 px-1.5 w-8">
                        No.
                      </th>
                      <th rowSpan={4} className="border border-black py-1.5 px-2.5 min-w-[130px]">
                        NAMA MURID
                      </th>
                      <th colSpan={6} className="border border-black py-1 px-1.5">
                        (A) ASPEK AL-QUR&apos;AN YANG DINILAI
                      </th>
                      <th colSpan={5} className="border border-black py-1 px-1.5">
                        (B) ASPEK FIQIH YANG DINILAI
                      </th>
                      <th colSpan={6} className="border border-black py-1 px-1.5">
                        (C) ASPEK IBADAH YANG DINILAI
                      </th>
                      <th rowSpan={4} className="border border-black py-1 px-1.5 w-14">
                        Nilai Akhir
                        <br />
                        <span className="underline">A+B+C</span>
                        <br />3
                      </th>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <th colSpan={2} className="border border-black py-1 px-1">
                        BACAAN
                      </th>
                      <th colSpan={2} className="border border-black py-1 px-1">
                        HAFALAN
                      </th>
                      <th className="border border-black py-1 px-1">TERJEMAHAN</th>
                      <th rowSpan={3} className="border border-black py-1 px-1 w-10">
                        Skor Jml (A)
                      </th>
                      <th colSpan={4} className="border border-black py-1 px-1">
                        Wudhu
                      </th>
                      <th rowSpan={3} className="border border-black py-1 px-1 w-10">
                        Skor Jml (B)
                      </th>
                      <th colSpan={5} className="border border-black py-1 px-1">
                        SHALAT
                      </th>
                      <th rowSpan={3} className="border border-black py-1 px-1 w-10">
                        Skor Jml (C)
                      </th>
                    </tr>
                    <tr className="font-semibold text-[10px]">
                      <th className="border border-black py-1 px-1">Tajwid</th>
                      <th className="border border-black py-1 px-1">Lancar</th>
                      <th className="border border-black py-1 px-1">Lancar</th>
                      <th className="border border-black py-1 px-1">Tajwid</th>
                      <th className="border border-black py-1 px-1">Ketepatan</th>
                      <th className="border border-black py-1 px-1">Niat</th>
                      <th className="border border-black py-1 px-1">Gerakan</th>
                      <th className="border border-black py-1 px-1">Tertib</th>
                      <th className="border border-black py-1 px-1">Do&apos;a</th>
                      <th className="border border-black py-1 px-1">Bacaan</th>
                      <th className="border border-black py-1 px-1">Gerakan shalat</th>
                      <th className="border border-black py-1 px-1">
                        Keserasian gerak dan bacaan
                      </th>
                      <th className="border border-black py-1 px-1">Duduk Tuma&apos;ninah</th>
                      <th className="border border-black py-1 px-1">Tertib</th>
                    </tr>
                    <tr className="bg-slate-100 font-mono font-bold text-[10px]">
                      <th className="border border-black py-0.5 px-1">10</th>
                      <th className="border border-black py-0.5 px-1">10</th>
                      <th className="border border-black py-0.5 px-1">10</th>
                      <th className="border border-black py-0.5 px-1">10</th>
                      <th className="border border-black py-0.5 px-1">10</th>
                      <th className="border border-black py-0.5 px-1">3</th>
                      <th className="border border-black py-0.5 px-1">8</th>
                      <th className="border border-black py-0.5 px-1">4</th>
                      <th className="border border-black py-0.5 px-1">5</th>
                      <th className="border border-black py-0.5 px-1">6</th>
                      <th className="border border-black py-0.5 px-1">10</th>
                      <th className="border border-black py-0.5 px-1">6</th>
                      <th className="border border-black py-0.5 px-1">4</th>
                      <th className="border border-black py-0.5 px-1">4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 16 }, (_, idx) => idx + 1).map((rowNum) => (
                      <tr key={rowNum}>
                        <td className="border border-black py-1 px-1 font-mono">{rowNum}</td>
                        <td className="border border-black py-1 px-2 text-left">&nbsp;</td>
                        {Array.from({ length: 18 }, (_, cIdx) => (
                          <td key={cIdx} className="border border-black py-1 px-1">
                            &nbsp;
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tanda Tangan Pengawas PAI & Guru PAI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 text-xs">
                <div className="space-y-12 pl-4">
                  <div className="font-bold">Pengawas PAI</div>
                  <div>
                    <div className="font-bold underline">{kopConfig.namaPengawasPai}</div>
                    <div className="font-bold">NIP. {kopConfig.nipPengawasPai}</div>
                  </div>
                </div>
                <div className="space-y-12 pl-4">
                  <div>
                    <div>........................., .................................... 2026</div>
                    <div className="font-bold">Guru Pendidikan Agama Islam</div>
                  </div>
                  <div>
                    <div className="font-bold">{kopConfig.namaGuruPai}</div>
                    <div className="font-bold">NIP. {kopConfig.nipGuruPai}</div>
                  </div>
                </div>
              </div>

              {/* Deskripsi Indikator Kinerja Praktik (Skor 1-4) */}
              <div className="no-print pt-4 font-sans space-y-2">
                <h4 className="text-xs font-semibold text-slate-800">
                  Deskripsi Kriteria Indikator Kinerja Praktik PAIBP (Acuan Penskoran):
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                        <th className="py-2 px-2.5 font-semibold w-10 text-center">No</th>
                        <th className="py-2 px-2.5 font-semibold w-44">Aspek Penilaian Praktik</th>
                        <th className="py-2 px-2.5 font-semibold">Indikator Kinerja</th>
                        <th className="py-2 px-2.5 font-semibold">Skor 4 (Sangat Baik)</th>
                        <th className="py-2 px-2.5 font-semibold">Skor 1 (Perlu Bimbingan)</th>
                        <th className="py-2 px-2.5 font-semibold w-16 text-center">Bobot</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {practiceInstrument.map((pr) => (
                        <tr key={pr.no}>
                          <td className="py-2 px-2.5 font-mono text-center font-semibold">
                            {pr.no}
                          </td>
                          <td className="py-2 px-2.5 font-semibold text-slate-900">
                            {pr.aspekPraktik}
                          </td>
                          <td className="py-2 px-2.5 text-slate-700">{pr.indikatorKinerja}</td>
                          <td className="py-2 px-2.5 text-slate-700">{pr.kriteriaSkor4}</td>
                          <td className="py-2 px-2.5 text-slate-700">{pr.kriteriaSkor1}</td>
                          <td className="py-2 px-2.5 font-mono font-bold text-center text-emerald-900">
                            {pr.bobotMaksimal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
