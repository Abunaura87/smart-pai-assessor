import React from 'react';
import { KopSoalConfig, LogoPresetType } from '../types/assessment';
import { resolveLogoUrl } from '../utils/documentExporter';
import { RotateCcw, Upload } from 'lucide-react';

interface KopPejabatFormProps {
  kopConfig: KopSoalConfig;
  onChangeKopConfig: (next: KopSoalConfig) => void;
  onResetDefault: () => void;
  compact?: boolean;
}

export const KopPejabatForm: React.FC<KopPejabatFormProps> = ({
  kopConfig,
  onChangeKopConfig,
  onResetDefault,
  compact = false,
}) => {
  const logoKiriUrl = resolveLogoUrl(kopConfig.logoKiriPreset, kopConfig.logoKiriCustomUrl);
  const logoKananUrl = resolveLogoUrl(kopConfig.logoKananPreset, kopConfig.logoKananCustomUrl);

  const handleUploadCustomLogo = (
    side: 'kiri' | 'kanan',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = typeof reader.result === 'string' ? reader.result : '';
      if (side === 'kiri') {
        onChangeKopConfig({
          ...kopConfig,
          logoKiriPreset: 'custom',
          logoKiriCustomUrl: base64,
        });
      } else {
        onChangeKopConfig({
          ...kopConfig,
          logoKananPreset: 'custom',
          logoKananCustomUrl: base64,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = (side: 'kiri' | 'kanan') => {
    if (side === 'kiri') {
      onChangeKopConfig({
        ...kopConfig,
        logoKiriPreset: 'pemda',
        logoKiriCustomUrl: undefined,
      });
    } else {
      onChangeKopConfig({
        ...kopConfig,
        logoKananPreset: kopConfig.layoutMode === 'us' ? 'tutwuri' : 'kemenag',
        logoKananCustomUrl: undefined,
      });
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div>
          <span className="font-bold text-slate-900 block">
            Kustomisasi Kop Surat & Identitas Pejabat Penandatangan
          </span>
          <span className="text-[11px] text-slate-500">
            Tersimpan otomatis di browser (localStorage) & sinkron ke Kisi-Kisi, Naskah Soal, Kartu Soal, dan Praktik
          </span>
        </div>
        <button
          type="button"
          onClick={onResetDefault}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Default</span>
        </button>
      </div>

      {/* 1. Upload Logo Kiri & Logo Kanan */}
      <div className={`grid grid-cols-1 ${compact ? ' gap-3' : 'md:grid-cols-2 gap-3'}`}>
        {/* Logo Kiri */}
        <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="font-semibold text-slate-800">Logo Kiri (Pemda / Instansi)</label>
            <button
              type="button"
              onClick={() => handleResetLogo('kiri')}
              className="text-[11px] text-slate-600 hover:text-emerald-800 hover:underline cursor-pointer"
            >
              Reset Logo Kiri
            </button>
          </div>
          <div className="flex items-center gap-3">
            {logoKiriUrl && (
              <img
                src={logoKiriUrl}
                alt="Pratinjau Logo Kiri"
                className="w-10 h-12 object-contain border border-slate-200 rounded p-0.5 bg-white shrink-0"
              />
            )}
            <div className="flex-1 space-y-1.5 min-w-0">
              <select
                aria-label="Pilih Preset Logo Kiri"
                value={kopConfig.logoKiriPreset}
                onChange={(e) =>
                  onChangeKopConfig({
                    ...kopConfig,
                    logoKiriPreset: e.target.value as LogoPresetType,
                  })
                }
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="pemda">Logo Pemda (Kab. Konawe Selatan)</option>
                <option value="kemenag">Logo Kementerian Agama (Ikhlas Beramal)</option>
                <option value="tutwuri">Logo Tut Wuri Handayani</option>
                <option value="custom">Logo Upload Sendiri (Base64)</option>
                <option value="none">Tanpa Logo Kiri</option>
              </select>
              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md font-medium cursor-pointer hover:bg-emerald-100">
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Upload Logo Kiri...</span>
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
          <div className="flex items-center justify-between gap-2">
            <label className="font-semibold text-slate-800">Logo Kanan (Kemenag / Sekolah)</label>
            <button
              type="button"
              onClick={() => handleResetLogo('kanan')}
              className="text-[11px] text-slate-600 hover:text-emerald-800 hover:underline cursor-pointer"
            >
              Reset Logo Kanan
            </button>
          </div>
          <div className="flex items-center gap-3">
            {logoKananUrl && (
              <img
                src={logoKananUrl}
                alt="Pratinjau Logo Kanan"
                className="w-10 h-12 object-contain border border-slate-200 rounded p-0.5 bg-white shrink-0"
              />
            )}
            <div className="flex-1 space-y-1.5 min-w-0">
              <select
                aria-label="Pilih Preset Logo Kanan"
                value={kopConfig.logoKananPreset}
                onChange={(e) =>
                  onChangeKopConfig({
                    ...kopConfig,
                    logoKananPreset: e.target.value as LogoPresetType,
                  })
                }
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="kemenag">Logo Kementerian Agama (Ikhlas Beramal)</option>
                <option value="tutwuri">Logo Tut Wuri Handayani</option>
                <option value="pemda">Logo Pemda (Kab. Konawe Selatan)</option>
                <option value="custom">Logo Upload Sendiri (Base64)</option>
                <option value="none">Tanpa Logo Kanan</option>
              </select>
              <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md font-medium cursor-pointer hover:bg-emerald-100">
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Upload Logo Kanan...</span>
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

      {/* 2. Teks Kop Baris 1, 2, 3 */}
      <div className={`grid grid-cols-1 ${compact ? 'gap-2.5' : 'md:grid-cols-3 gap-3'}`}>
        <div>
          <label className="block font-semibold text-slate-800 mb-1">Teks Kop Baris 1</label>
          <input
            type="text"
            value={kopConfig.barisKop1}
            onChange={(e) => onChangeKopConfig({ ...kopConfig, barisKop1: e.target.value })}
            placeholder="PEMERINTAH KABUPATEN KONAWE SELATAN"
            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Teks Kop Baris 2 (Dinas / KKG PAIBP)
          </label>
          <input
            type="text"
            value={kopConfig.barisKop2}
            onChange={(e) => onChangeKopConfig({ ...kopConfig, barisKop2: e.target.value })}
            placeholder="KELOMPOK KERJA GURU (KKG). PAIBP"
            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Teks Kop Baris 3 (Kecamatan / Sekolah)
          </label>
          <input
            type="text"
            value={kopConfig.barisKop3}
            onChange={(e) => onChangeKopConfig({ ...kopConfig, barisKop3: e.target.value })}
            placeholder="KECAMATAN LALEMBUU"
            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
          />
        </div>
      </div>

      {/* 3. Judul Ujian, Tahun Pelajaran & Tempat Tanggal Penandatanganan */}
      <div className={`grid grid-cols-1 ${compact ? 'gap-2.5' : 'md:grid-cols-3 gap-3'}`}>
        <div>
          <label className="block font-semibold text-slate-800 mb-1">Judul Ujian pada Kop</label>
          <input
            type="text"
            value={kopConfig.judulAsesmenDokumen}
            onChange={(e) =>
              onChangeKopConfig({ ...kopConfig, judulAsesmenDokumen: e.target.value })
            }
            placeholder="SUMATIF AKHIR SEMESTER"
            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-800 mb-1">Tahun Pelajaran</label>
          <input
            type="text"
            value={kopConfig.tahunPelajaran}
            onChange={(e) => onChangeKopConfig({ ...kopConfig, tahunPelajaran: e.target.value })}
            placeholder="TP. 2025/2026"
            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Tempat & Tanggal Penandatanganan
          </label>
          <input
            type="text"
            value={kopConfig.tempatTanggalTandatangan}
            onChange={(e) =>
              onChangeKopConfig({ ...kopConfig, tempatTanggalTandatangan: e.target.value })
            }
            placeholder="Lalembuu, .................... 2026"
            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
          />
        </div>
      </div>

      {/* 4. Identitas Pejabat Kiri Bawah & Guru PAI Kanan Bawah */}
      <div className={`grid grid-cols-1 ${compact ? 'gap-3' : 'md:grid-cols-2 gap-3'}`}>
        {/* Kolom Kiri Bawah: Pengawas PAI / Kepala Sekolah */}
        <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
          <div className="font-semibold text-emerald-900 border-b border-slate-100 pb-1">
            Penandatangan Kiri Bawah (Pengawas PAI / Kepala Sekolah)
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Jabatan Pejabat Kiri (Bisa dipilih / diketik)
            </label>
            <div className="flex gap-1.5 mb-1.5 flex-wrap">
              {['Pengawas PAI', 'Kepala Sekolah', 'Ketua KKG PAI'].map((presetJab) => (
                <button
                  key={presetJab}
                  type="button"
                  onClick={() => onChangeKopConfig({ ...kopConfig, jabatanKiri: presetJab })}
                  className={`px-2 py-0.5 text-[11px] rounded border cursor-pointer ${
                    kopConfig.jabatanKiri === presetJab
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {presetJab}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={kopConfig.jabatanKiri}
              onChange={(e) => onChangeKopConfig({ ...kopConfig, jabatanKiri: e.target.value })}
              placeholder="Pengawas PAI / Kepala Sekolah"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Nama Lengkap & Gelar Pejabat Kiri
            </label>
            <input
              type="text"
              value={kopConfig.namaPengawasPai}
              onChange={(e) =>
                onChangeKopConfig({ ...kopConfig, namaPengawasPai: e.target.value })
              }
              placeholder="Seh Alwan, S.Ag., M.Pd."
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">NIP Pejabat Kiri</label>
            <input
              type="text"
              value={kopConfig.nipPengawasPai}
              onChange={(e) =>
                onChangeKopConfig({ ...kopConfig, nipPengawasPai: e.target.value })
              }
              placeholder="197101032000031007"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
            />
          </div>
        </div>

        {/* Kolom Kanan Bawah: Guru PAI Pemakai Aplikasi */}
        <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
          <div className="font-semibold text-emerald-900 border-b border-slate-100 pb-1">
            Penandatangan Kanan Bawah (Identitas Guru PAI / Penyusun)
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Jabatan Kanan (Default: Guru Pendidikan Agama Islam)
            </label>
            <div className="flex gap-1.5 mb-1.5 flex-wrap">
              {['Guru Pendidikan Agama Islam', 'Guru PAI & Budi Pekerti', 'Penyusun Soal'].map(
                (presetJab) => (
                  <button
                    key={presetJab}
                    type="button"
                    onClick={() => onChangeKopConfig({ ...kopConfig, jabatanKanan: presetJab })}
                    className={`px-2 py-0.5 text-[11px] rounded border cursor-pointer ${
                      kopConfig.jabatanKanan === presetJab
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {presetJab}
                  </button>
                )
              )}
            </div>
            <input
              type="text"
              value={kopConfig.jabatanKanan}
              onChange={(e) => onChangeKopConfig({ ...kopConfig, jabatanKanan: e.target.value })}
              placeholder="Guru Pendidikan Agama Islam"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Nama Lengkap & Gelar Guru PAI
            </label>
            <input
              type="text"
              aria-label="Nama Lengkap Guru PAI"
              value={kopConfig.namaGuruPai}
              onChange={(e) => onChangeKopConfig({ ...kopConfig, namaGuruPai: e.target.value })}
              placeholder="Ketik nama lengkap & gelar Guru PAI..."
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">NIP Guru PAI</label>
            <input
              type="text"
              aria-label="NIP Guru PAI"
              value={kopConfig.nipGuruPai}
              onChange={(e) => onChangeKopConfig({ ...kopConfig, nipGuruPai: e.target.value })}
              placeholder="Ketik NIP Guru PAI..."
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
