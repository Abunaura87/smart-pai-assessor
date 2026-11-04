import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Layers,
  ListChecks,
  Printer,
  Settings2,
  Sparkles,
  X,
} from 'lucide-react';

interface AppGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenKopModal?: () => void;
}

type GuideTabId = 'alur-cepat' | 'semester-topik' | 'lima-dokumen' | 'tips-ekspor';

export const AppGuideModal: React.FC<AppGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenKopModal,
}) => {
  const [activeTab, setActiveTab] = useState<GuideTabId>('alur-cepat');

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-xs"
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 id="guide-modal-title" className="text-base sm:text-lg font-bold tracking-tight">
                Panduan Penggunaan Aplikasi — Smart PAI Assessor
              </h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                Alur penyusunan Kisi-Kisi, Naskah Soal, Kartu Soal, Kunci &amp; Rubrik sesuai CP
                Nomor 020 Tahun 2026
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Panduan Aplikasi"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('alur-cepat')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'alur-cepat'
                ? 'border-emerald-800 text-emerald-950 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>1. Alur Cepat (5 Langkah)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('semester-topik')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'semester-topik'
                ? 'border-emerald-800 text-emerald-950 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>2. Memilih Semester &amp; Paket SAS/SAT</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lima-dokumen')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'lima-dokumen'
                ? 'border-emerald-800 text-emerald-950 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5 text-emerald-700" />
            <span>3. Mengenal 5 Dokumen Output</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tips-ekspor')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'tips-ekspor'
                ? 'border-emerald-800 text-emerald-950 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-emerald-700" />
            <span>4. Cetak PDF, Word &amp; Excel</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-700">
          {activeTab === 'alur-cepat' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-emerald-950">
                  <strong>Ringkasan Alur Kerja:</strong> Aplikasi ini dirancang agar Bapak/Ibu Guru
                  PAI dapat menyusun perangkat asesmen lengkap (Kisi-Kisi, Naskah Soal, Kartu Soal,
                  Kunci Jawaban, dan Rubrik) hanya dalam <strong>5 langkah berurutan</strong> sesuai
                  label bagian di panel sebelah kiri.
                </div>
              </div>

              <div className="space-y-4">
                {/* Langkah 1 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        Atur Kop Sekolah &amp; Identitas Pejabat Penandatangan
                      </h3>
                      {onOpenKopModal && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenKopModal();
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-900 bg-emerald-50 border border-emerald-300 rounded-md hover:bg-emerald-100 cursor-pointer"
                        >
                          <Settings2 className="w-3 h-3" />
                          <span>Buka Pengaturan Kop</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Klik tombol <strong>&quot;⚙️ Pengaturan Kop &amp; Pejabat Penandatangan&quot;</strong>{' '}
                      (atau buka akordeon <strong>06. Pengaturan Kop &amp; Identitas Penandatangan</strong>)
                      untuk mengisi Nama Instansi/Dinas, Nama Sekolah/Madrasah, Tahun Pelajaran,
                      Tempat &amp; Tanggal Pengesahan, Nama Pengawas/Kepala Sekolah, serta Nama Guru
                      PAI. Data ini otomatis tersimpan di peramban Anda.
                    </p>
                  </div>
                </div>

                {/* Langkah 2 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      Pilih Fase, Kelas Spesifik, Jenis Asesmen &amp; Semester (Bagian 01)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pada bagian <strong>&quot;01. Pilih Fase &amp; Jenjang Pendidikan&quot;</strong>,
                      pilih Fase (Fase A s.d. Fase F), pilih <strong>Kelas Spesifik</strong> (Kelas 1
                      s.d. Kelas 12), pilih <strong>Jenis Asesmen / Ujian</strong>, lalu pilih tombol{' '}
                      <strong>Pilih Semester Pembelajaran</strong> (<em>Semester 1 Ganjil</em>,{' '}
                      <em>Semester 2 Genap</em>, atau <em>Semua Semester</em>).
                    </p>
                  </div>
                </div>

                {/* Langkah 3 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      Pilih Elemen PAIBP &amp; Topik Materi Resmi CP 020/2026 (Bagian 02 &amp; 03)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pada bagian <strong>&quot;03. Topik Materi &amp; Capaian Pembelajaran (CP/TP)&quot;</strong>,
                      Anda dapat langsung mengeklik tombol <strong>Topik Pilihan Cepat</strong> atau
                      membuka dropdown <strong>Pilih Topik Materi Resmi</strong>. Tersedia pilihan{' '}
                      <strong>📚 [PAKET SAS / SAT / US]</strong> untuk ujian gabungan 5 elemen satu
                      semester penuh maupun pilihan per Bab/Elemen spesifik.
                    </p>
                  </div>
                </div>

                {/* Langkah 4 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    04
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      Atur Jumlah Soal &amp; Klik &quot;Susun Instrumen Asesmen (5 Bagian Resmi)&quot;
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pada <strong>&quot;04. Bentuk &amp; Jumlah Butir Soal&quot;</strong> dan{' '}
                      <strong>&quot;05. Komposisi Kesulitan (Bloom)&quot;</strong>, tentukan jumlah
                      soal Pilihan Ganda, Isian Singkat, atau Uraian beserta persentase L1, L2, dan
                      L3 (HOTS). Setelah selesai, klik tombol hijau{' '}
                      <strong>&quot;Susun Instrumen Asesmen (5 Bagian Resmi)&quot;</strong>.
                    </p>
                  </div>
                </div>

                {/* Langkah 5 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    05
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      Gunakan Bar Tombol Dokumen: Mode Lembar Murid, Salin, Word, Excel, atau PDF
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Di bagian paling atas dokumen hasil (panel kanan), tersedia deretan tombol aksi:{' '}
                      <strong>&quot;Mode Lembar Soal Murid&quot;</strong>,{' '}
                      <strong>&quot;Salin Naskah&quot;</strong>,{' '}
                      <strong>&quot;Unduh Word (.doc)&quot;</strong>,{' '}
                      <strong>&quot;Unduh Excel (.xls)&quot;</strong>, dan{' '}
                      <strong>&quot;Cetak PDF&quot;</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'semester-topik' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Cara Menentukan Semester Ganjil / Genap &amp; Memilih Paket Materi
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aplikasi telah dilengkapi basis data kurikulum resmi{' '}
                <strong>Keputusan Kepala BSKAP Nomor 020 Tahun 2026</strong> untuk Kelas 1 s.d.
                Kelas 12 (Semester 1 Ganjil &amp; Semester 2 Genap). Anda dapat mengatur filter
                semester melalui kontrol berikut:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Cara A: Tombol &quot;Pilih Semester Pembelajaran&quot; (Bagian 01)</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    <li>
                      Klik <strong>Semester 1 (Ganjil)</strong> untuk menampilkan topik dan menyusun
                      kisi-kisi Semester Ganjil.
                    </li>
                    <li>
                      Klik <strong>Semester 2 (Genap)</strong> untuk menampilkan topik dan menyusun
                      kisi-kisi Semester Genap.
                    </li>
                    <li>
                      Klik <strong>Semua Semester</strong> (atau pilih jenis ujian{' '}
                      <em>Asesmen Akhir Jenjang / AAJ</em>) untuk menggabungkan materi lintas
                      semester.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Cara B: Filter &amp; Badge Semester di Bagian 03</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pada bagian <strong>03. Topik Materi &amp; Capaian Pembelajaran (CP/TP)</strong>,
                    terdapat tombol <strong>Smt. 1 (Ganjil)</strong>, <strong>Smt. 2 (Genap)</strong>,
                    dan <strong>Semua Semester</strong>, serta badge bulat di kanan atas yang dapat
                    diklik kapan saja untuk menyaring daftar topik secara instan.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 space-y-2">
                <div className="text-xs font-bold text-amber-950">
                  💡 Kapan Menggunakan &quot;[PAKET SAS/SAT/US]&quot; vs &quot;Per Bab&quot;?
                </div>
                <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong>Pilih 📚 [PAKET SAS / SAT / US] (Grup Paling Atas di Dropdown):</strong>{' '}
                    Gunakan saat menyusun soal ujian akhir semester atau akhir jenjang yang wajib
                    mencakup <strong>5 Elemen PAI sekaligus</strong> (Al-Qur&apos;an Hadis, Akidah,
                    Akhlak, Fikih, dan SPI) secara proporsional.
                  </li>
                  <li>
                    <strong>Pilih [Bab 1 s.d. Bab 10]:</strong> Gunakan saat menyusun{' '}
                    <strong>Asesmen Formatif / Sumatif Lingkup Materi (TP)</strong> yang hanya
                    berfokus pada 1 bab tertentu.
                  </li>
                  <li>
                    <strong>Pilih &quot;➕ Ketik / Kustomisasi Topik &amp; TP Sendiri&quot;:</strong>{' '}
                    Gunakan jika Anda ingin mengetik bebas kalimat Topik Materi dan Tujuan
                    Pembelajaran sendiri.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'lima-dokumen' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                5 Bagian Dokumen Standar KKG/MGMP PAI &amp; Kemenag RI yang Dihasilkan
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-emerald-900">
                    Bagian 1 — Kisi-Kisi Penulisan Soal Resmi (Matriks 9 Kolom)
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Memuat No, Elemen PAI &amp; Dimensi Cinta (CP 020/2026), Capaian/Tujuan
                    Pembelajaran, Kelas/Smt, Materi Pokok, Indikator Soal (ABCD), Level Kognitif
                    (L1/L2/L3), Bentuk Soal, dan Nomor Soal.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-emerald-900">
                    Bagian 2 — Naskah Soal Siap Ujian (PG, Isian Singkat, dan Uraian)
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Dilengkapi Kop Sekolah resmi, kotak identitas peserta, petunjuk pengerjaan,
                    teks Arab berharakat lengkap (khat Utsmani standar Kemenag), tabel pasangan,
                    pernyataan berangka, dan kasus kontekstual sesuai jenjang usia.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-emerald-900">
                    Bagian 3 — Kartu Soal Standar KKG/MGMP PAI
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Representasi kartu soal per butir nomor lengkap dengan rumusan indikator, buku
                    sumber, kunci jawaban, dan pedoman penskoran untuk arsip akreditasi/supervisi
                    guru.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-emerald-900">
                    Bagian 4 — Kunci Jawaban &amp; Pembahasan Pedagogis
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Kunci jawaban lengkap untuk seluruh nomor Pilihan Ganda, Isian Singkat, dan
                    Uraian disertai rasionalisasi pembahasan serta rincian bobot nilai.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-emerald-900">
                    Bagian 5 — Rubrik Penilaian Uraian &amp; Instrumen Praktik / Kinerja
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Tabel kriteria skor uraian serta lembar observasi ujian praktik (seperti praktik
                    wudu, salat, membaca Al-Qur&apos;an/tajwid, atau proyek akhlak) lengkap dengan
                    lembar pengesahan Pejabat &amp; Guru PAI.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips-ekspor' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Fungsi Tombol pada Bar Aksi Dokumen (Salin, Word, Excel, Mode Murid &amp; PDF)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Tombol &quot;Unduh Word (.doc)&quot; &amp; &quot;Salin Naskah&quot;</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Klik <strong>&quot;Unduh Word (.doc)&quot;</strong> untuk mengunduh dokumen
                    Microsoft Word ukuran A4 berhuruf <em>Times New Roman 12pt</em>, atau klik{' '}
                    <strong>&quot;Salin Naskah&quot;</strong> untuk menyalin tabel &amp; naskah
                    berformat <em>Rich Text</em> langsung ke clipboard (tinggal tekan{' '}
                    <em>Ctrl + V</em> di MS Word).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Tombol &quot;Unduh Excel (.xls)&quot;</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Klik tombol <strong>&quot;Unduh Excel (.xls)&quot;</strong> (di sebelah kanan
                    tombol <em>Unduh Word</em>) untuk mengunduh tabel matriks{' '}
                    <strong>Kisi-Kisi 9 Kolom</strong> beserta daftar{' '}
                    <strong>Kunci Jawaban, Skor &amp; Pembahasan</strong> ke dalam format lembar
                    kerja Microsoft Excel (<code>.xls</code>).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Layers className="w-4 h-4 text-slate-700 shrink-0" />
                    <span>Tombol &quot;Mode Lembar Soal Murid&quot;</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Jika Anda hanya ingin mencetak atau mengunduh{' '}
                    <strong>Lembar Soal untuk Siswa</strong> (tanpa Kisi-Kisi dan tanpa Kunci
                    Jawaban), klik terlebih dahulu tombol{' '}
                    <strong>&quot;Mode Lembar Soal Murid&quot;</strong>, lalu klik{' '}
                    <strong>&quot;Unduh Word (.doc)&quot;</strong> atau{' '}
                    <strong>&quot;Cetak PDF&quot;</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Download className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Tombol &quot;Cetak PDF&quot; / &quot;Cetak Naskah Asesmen&quot;</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Klik <strong>&quot;Cetak PDF&quot;</strong> pada bar dokumen (atau{' '}
                    <strong>&quot;Cetak Naskah Asesmen&quot;</strong> di sudut kanan atas). Pilih
                    Destination <strong>&quot;Save as PDF&quot;</strong>, ukuran kertas{' '}
                    <strong>A4</strong>, dan hilangkan centang <em>Headers and footers</em>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Smart PAI Assessor · Kurikulum Merdeka &amp; CP Nomor 020 Tahun 2026
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
          >
            Mengerti, Mulai Gunakan Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
};
