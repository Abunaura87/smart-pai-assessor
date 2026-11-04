import {
  AssessmentPackage,
  KopSoalConfig,
  LogoPresetType,
  QuestionOption,
} from '../types/assessment';
import {
  ELEMEN_DIMENSI_CINTA,
  formatKelasSemester,
  getPracticeInstrument,
} from './paiRules';
import { renderStimulusHtmlString } from './stimulusParser';

// Embedded SVG Data URLs for official Indonesian education & ministry emblems
const PEMDA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" width="72" height="84">
  <path d="M60 6 L110 26 L110 76 C110 108 86 126 60 134 C34 126 10 108 10 76 L10 26 Z" fill="#0284c7" stroke="#0f172a" stroke-width="4"/>
  <path d="M60 14 L102 31 L102 74 C102 101 81 117 60 124 C39 117 18 101 18 74 L18 31 Z" fill="#38bdf8" stroke="#facc15" stroke-width="2.5"/>
  <polygon points="60,22 63,31 72,31 65,36 68,45 60,40 52,45 55,36 48,31 57,31" fill="#facc15"/>
  <rect x="38" y="48" width="44" height="36" rx="4" fill="#fef08a" stroke="#854d0e" stroke-width="2"/>
  <path d="M44 76 L60 54 L76 76 Z" fill="#15803d"/>
  <path d="M38 78 Q60 72 82 78 L82 84 L38 84 Z" fill="#0369a1"/>
  <path d="M30 40 C24 62 30 88 46 104" fill="none" stroke="#facc15" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M90 40 C96 62 90 88 74 104" fill="none" stroke="#16a34a" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="22" y="104" width="76" height="14" rx="3" fill="#facc15" stroke="#0f172a" stroke-width="1.5"/>
  <text x="60" y="114" font-family="Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#0f172a" text-anchor="middle">KONAWE SELATAN</text>
</svg>`;

const KEMENAG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 130" width="72" height="78">
  <polygon points="60,6 112,42 94,116 26,116 8,42" fill="#065f46" stroke="#facc15" stroke-width="4"/>
  <polygon points="60,14 104,45 88,108 32,108 16,45" fill="#047857" stroke="#fef08a" stroke-width="1.5"/>
  <polygon points="60,22 63.5,32 74,32 65.5,38 69,48 60,42 51,48 54.5,38 46,32 56.5,32" fill="#facc15"/>
  <path d="M42 56 L60 51 L78 56 L78 78 L60 73 L42 78 Z" fill="#fef08a" stroke="#064e3b" stroke-width="2"/>
  <line x1="60" y1="51" x2="60" y2="73" stroke="#064e3b" stroke-width="2"/>
  <path d="M30 48 C24 68 32 88 48 96" fill="none" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
  <path d="M90 48 C96 68 88 88 72 96" fill="none" stroke="#86efac" stroke-width="3" stroke-linecap="round"/>
  <rect x="28" y="94" width="64" height="12" rx="3" fill="#fef08a" stroke="#064e3b" stroke-width="1.2"/>
  <text x="60" y="102.5" font-family="Arial, sans-serif" font-size="6.8" font-weight="bold" fill="#064e3b" text-anchor="middle">IKHLAS BERAMAL</text>
</svg>`;

const TUTWURI_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 130" width="72" height="78">
  <polygon points="60,6 112,42 94,116 26,116 8,42" fill="#0284c7" stroke="#0f172a" stroke-width="3.5"/>
  <polygon points="60,14 104,45 88,108 32,108 16,45" fill="#0369a1" stroke="#bae6fd" stroke-width="1.5"/>
  <path d="M30 34 Q60 18 90 34" fill="none" stroke="#ffffff" stroke-width="2"/>
  <text x="60" y="34" font-family="Arial, sans-serif" font-size="6.5" font-weight="bold" fill="#ffffff" text-anchor="middle">TUT WURI HANDAYANI</text>
  <polygon points="60,40 76,64 60,84 44,64" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
  <path d="M36 58 C44 50 52 54 60 62 C68 54 76 50 84 58 C78 72 68 80 60 84 C52 80 42 72 36 58 Z" fill="#facc15"/>
  <path d="M44 88 L60 83 L76 88 L76 100 L60 95 L44 100 Z" fill="#ffffff" stroke="#0369a1" stroke-width="1.5"/>
</svg>`;

export const LOGO_PRESET_DATA_URLS: Record<Exclude<LogoPresetType, 'custom' | 'none'>, string> = {
  pemda: `data:image/svg+xml;utf8,${encodeURIComponent(PEMDA_SVG)}`,
  kemenag: `data:image/svg+xml;utf8,${encodeURIComponent(KEMENAG_SVG)}`,
  tutwuri: `data:image/svg+xml;utf8,${encodeURIComponent(TUTWURI_SVG)}`,
};

export function resolveLogoUrl(
  preset: LogoPresetType,
  customUrl?: string
): string | null {
  if (preset === 'none') return null;
  if (preset === 'custom') return customUrl || LOGO_PRESET_DATA_URLS.pemda;
  return LOGO_PRESET_DATA_URLS[preset];
}

export function getDefaultKopConfig(pkg: AssessmentPackage): KopSoalConfig {
  const isUS =
    pkg.parameters.jenisUjian === 'Asesmen Akhir Jenjang (AAJ / Ujian Praktik)';
  const smtUpper =
    pkg.parameters.semester === 'Ganjil'
      ? ' GANJIL'
      : pkg.parameters.semester === 'Genap'
      ? ' GENAP'
      : '';
  const jenisUpper = isUS
    ? 'UJIAN SEKOLAH ( US ) PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI'
    : pkg.parameters.jenisUjian === 'Sumatif Akhir Semester (SAS)'
    ? `SUMATIF AKHIR SEMESTER${smtUpper}`
    : pkg.parameters.jenisUjian === 'Asesmen Tengah Semester (ATS)'
    ? `ASESMEN TENGAH SEMESTER (ATS)${smtUpper}`
    : pkg.parameters.jenisUjian.toUpperCase();

  return {
    layoutMode: isUS ? 'us' : 'kkg',
    logoKiriPreset: 'pemda',
    logoKananPreset: isUS ? 'tutwuri' : 'kemenag',
    barisKop1: 'PEMERINTAH KABUPATEN KONAWE SELATAN',
    barisKop2: isUS
      ? 'DINAS PENDIDIKAN DAN KEBUDAYAAN'
      : 'KELOMPOK KERJA GURU (KKG). PAIBP',
    barisKop3: 'KECAMATAN LALEMBUU',
    judulAsesmenDokumen: jenisUpper,
    tahunPelajaran: 'TP. 2025/2026',
    hariTanggal: '........................................ 2026',
    waktuUjian: isUS ? '120 Menit' : pkg.identitas.alokasiWaktu || '90 Menit',
    namaSekolah:
      pkg.parameters.jenjang === 'SD/MI'
        ? 'SEKOLAH DASAR (SD)'
        : pkg.parameters.jenjang === 'SMP/MTs'
        ? 'SEKOLAH MENENGAH PERTAMA (SMP)'
        : 'SMA / SMK / MA',
    kabupatenKota: 'Kabupaten Konawe Selatan',
    tempatTanggalTandatangan: 'Lalembuu, .................... 2026',
    jabatanKiri: 'Pengawas PAI',
    namaPengawasPai: 'Seh Alwan, S.Ag., M.Pd.',
    nipPengawasPai: '197101032000031007',
    jabatanKanan: 'Guru Pendidikan Agama Islam',
    namaGuruPai: '_____________________________',
    nipGuruPai: '............................................',
  };
}

export const KOP_STORAGE_KEY = 'smart_pai_kop_config_v1';

export function loadKopConfigFromStorage(pkg: AssessmentPackage): KopSoalConfig {
  const defaults = getDefaultKopConfig(pkg);
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(KOP_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<KopSoalConfig>;
        return {
          ...defaults,
          ...parsed,
        };
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return defaults;
}

export function saveKopConfigToStorage(kop: KopSoalConfig): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(KOP_STORAGE_KEY, JSON.stringify(kop));
    }
  } catch {
    // Ignore storage write errors
  }
}


export function getOptionColumnsMode(
  opsi?: QuestionOption[]
): '4-col' | '2-col' | '1-col' {
  if (!opsi || opsi.length === 0) return '1-col';
  const maxLen = Math.max(...opsi.map((o) => o.teks.trim().length));
  if (opsi.length === 4 && maxLen <= 18) return '4-col';
  if (maxLen <= 38) return '2-col';
  return '1-col';
}

export function formatKelasDisplay(kelas: string): string {
  const numMatch = kelas.match(/\d+/);
  if (!numMatch) return kelas;
  const n = parseInt(numMatch[0], 10);
  const map: Record<number, string> = {
    1: 'I (Satu)',
    2: 'II (Dua)',
    3: 'III (Tiga)',
    4: 'IV (Empat)',
    5: 'V (Lima)',
    6: 'VI (Enam)',
    7: 'VII (Tujuh)',
    8: 'VIII (Delapan)',
    9: 'IX (Sembilan)',
    10: 'X (Sepuluh)',
    11: 'XI (Sebelas)',
    12: 'XII (Dua Belas)',
  };
  return map[n] || kelas;
}

function escapeHtml(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface ExportDocumentOptions {
  studentSheetOnly?: boolean;
}

/**
 * Generates pure Rich HTML (zero Markdown symbols) suitable for:
 * 1) Pasting directly into Microsoft Word via ClipboardItem ('text/html')
 * 2) Wrapping into a native .doc / .docx Word document
 */
export function buildRichDocumentHtml(
  pkg: AssessmentPackage,
  kop: KopSoalConfig,
  options: ExportDocumentOptions = {}
): string {
  const { studentSheetOnly = false } = options;
  const defaultKelasSmt = formatKelasSemester(
    pkg.parameters.kelas,
    pkg.parameters.jenisUjian,
    pkg.parameters.semester
  );
  const kelasFormatted = formatKelasDisplay(pkg.parameters.kelas);
  const logoKiri = resolveLogoUrl(kop.logoKiriPreset, kop.logoKiriCustomUrl);
  const logoKanan = resolveLogoUrl(kop.logoKananPreset, kop.logoKananCustomUrl);
  const logoKemenag = LOGO_PRESET_DATA_URLS.kemenag;
  const logoTutWuri = LOGO_PRESET_DATA_URLS.tutwuri;

  const pgSoal = pkg.butirSoal.filter(
    (s) => s.bentukSoal !== 'Uraian' && s.bentukSoal !== 'Isian Singkat'
  );
  const isianSoal = pkg.butirSoal.filter((s) => s.bentukSoal === 'Isian Singkat');
  const uraianMurniSoal = pkg.butirSoal.filter((s) => s.bentukSoal === 'Uraian');
  const uraianSoal = pkg.butirSoal.filter(
    (s) => s.bentukSoal === 'Uraian' || s.bentukSoal === 'Isian Singkat'
  );
  const practiceInstrument = getPracticeInstrument(pkg);

  const pageBreakHtml = `<br clear="all" style="page-break-before:always; mso-special-character:line-break;" />`;

  // Render Options for PG in Word-friendly table or list
  const renderQuestionOptionsHtml = (opsi?: QuestionOption[]) => {
    if (!opsi || opsi.length === 0) return '';
    const colMode = getOptionColumnsMode(opsi);
    if (colMode === '4-col') {
      return `<table style="width:100%; border-collapse:collapse; border:none; margin-top:4pt; margin-bottom:6pt; font-family:'Times New Roman', Times, serif; font-size:12pt;">
        <tr>
          ${opsi
            .map(
              (o) =>
                `<td style="width:25%; border:none; padding:2pt 6pt 2pt 0; vertical-align:top;">${escapeHtml(
                  o.label.toLowerCase()
                )}. ${escapeHtml(o.teks)}</td>`
            )
            .join('')}
        </tr>
      </table>`;
    }
    if (colMode === '2-col' && opsi.length >= 4) {
      const half = Math.ceil(opsi.length / 2);
      const leftCol = opsi.slice(0, half);
      const rightCol = opsi.slice(half);
      const rows = leftCol.map((leftOpt, i) => {
        const rightOpt = rightCol[i];
        return `<tr>
          <td style="width:50%; border:none; padding:2pt 10pt 2pt 0; vertical-align:top;">${escapeHtml(
            leftOpt.label.toLowerCase()
          )}. ${escapeHtml(leftOpt.teks)}</td>
          <td style="width:50%; border:none; padding:2pt 0; vertical-align:top;">${
            rightOpt
              ? `${escapeHtml(rightOpt.label.toLowerCase())}. ${escapeHtml(
                  rightOpt.teks
                )}`
              : ''
          }</td>
        </tr>`;
      });
      return `<table style="width:100%; border-collapse:collapse; border:none; margin-top:4pt; margin-bottom:6pt; font-family:'Times New Roman', Times, serif; font-size:12pt;">
        ${rows.join('')}
      </table>`;
    }
    return `<table style="width:100%; border-collapse:collapse; border:none; margin-top:4pt; margin-bottom:6pt; font-family:'Times New Roman', Times, serif; font-size:12pt;">
      ${opsi
        .map(
          (o) =>
            `<tr>
              <td style="width:22pt; border:none; padding:1.5pt 0; vertical-align:top;">${escapeHtml(
                o.label.toLowerCase()
              )}.</td>
              <td style="border:none; padding:1.5pt 0; vertical-align:top;">${escapeHtml(
                o.teks
              )}</td>
            </tr>`
        )
        .join('')}
    </table>`;
  };

  // Render Butir Soal list (Clean without AI badges)
  const renderSoalListHtml = (
    items: typeof pgSoal,
    isUraianSection: boolean
  ) => {
    return `<table style="width:100%; border-collapse:collapse; border:none; font-family:'Times New Roman', Times, serif; font-size:12pt;">
      ${items
        .map((soal, idx) => {
          const displayNum = isUraianSection && kop.layoutMode === 'kkg' ? idx + 1 : soal.nomor;
          const stimulusHtml = soal.stimulus ? renderStimulusHtmlString(soal.stimulus) : '';
          const instruksiHtml = soal.instruksiKhusus
            ? `<div style="margin-bottom:3pt; font-style:italic; font-weight:bold;">${escapeHtml(
                soal.instruksiKhusus
              )}</div>`
            : '';

          let extraTableHtml = '';
          if (soal.pernyataanBenarSalah && soal.pernyataanBenarSalah.length > 0) {
            extraTableHtml = `<table style="width:100%; border-collapse:collapse; border:1px solid #000; margin-top:4pt; margin-bottom:6pt; font-size:11pt;">
              <thead>
                <tr style="background-color:#f1f5f9;">
                  <th style="border:1px solid #000; padding:4pt 6pt; text-align:left;">Pernyataan</th>
                  <th style="border:1px solid #000; padding:4pt 6pt; text-align:center; width:60pt;">Benar</th>
                  <th style="border:1px solid #000; padding:4pt 6pt; text-align:center; width:60pt;">Salah</th>
                </tr>
              </thead>
              <tbody>
                ${soal.pernyataanBenarSalah
                  .map(
                    (bs, bIdx) => `<tr>
                      <td style="border:1px solid #000; padding:4pt 6pt;">${bIdx + 1}. ${escapeHtml(
                        bs.pernyataan
                      )}</td>
                      <td style="border:1px solid #000; padding:4pt 6pt; text-align:center;">[ &nbsp; ]</td>
                      <td style="border:1px solid #000; padding:4pt 6pt; text-align:center;">[ &nbsp; ]</td>
                    </tr>`
                  )
                  .join('')}
              </tbody>
            </table>`;
          }

          if (soal.pasanganMenjodohkan && soal.pasanganMenjodohkan.length > 0) {
            extraTableHtml += `<table style="width:100%; border-collapse:collapse; border:1px solid #000; margin-top:4pt; margin-bottom:6pt; font-size:11pt;">
              <thead>
                <tr style="background-color:#f1f5f9;">
                  <th style="border:1px solid #000; padding:4pt 6pt; text-align:left;">Premis</th>
                  <th style="border:1px solid #000; padding:4pt 6pt; text-align:left;">Pasangan</th>
                </tr>
              </thead>
              <tbody>
                ${soal.pasanganMenjodohkan
                  .map(
                    (pm, pIdx) => `<tr>
                      <td style="border:1px solid #000; padding:4pt 6pt;">${pIdx + 1}. ${escapeHtml(
                        pm.premis
                      )}</td>
                      <td style="border:1px solid #000; padding:4pt 6pt;">${String.fromCharCode(
                        65 + pIdx
                      )}. ${escapeHtml(pm.respon)}</td>
                    </tr>`
                  )
                  .join('')}
              </tbody>
            </table>`;
          }

          return `<tr style="page-break-inside:avoid;">
            <td style="width:24pt; border:none; padding:3pt 0; vertical-align:top;">${displayNum}.</td>
            <td style="border:none; padding:3pt 0; vertical-align:top;">
              ${stimulusHtml}
              ${instruksiHtml}
              <div style="margin-bottom:3pt; text-align:justify; line-height:1.4;">${escapeHtml(
                soal.pertanyaan
              ).replace(/\n/g, '<br/>')}</div>
              ${!isUraianSection ? renderQuestionOptionsHtml(soal.opsi) : ''}
              ${extraTableHtml}
            </td>
          </tr>`;
        })
        .join('')}
    </table>`;
  };

  // BAGIAN 1: Kisi-Kisi Penulisan Soal (Tabel Resmi 9 Kolom)
  const kisiKisiSectionHtml = !studentSheetOnly
    ? `<div style="font-family:'Times New Roman', Times, serif; font-size:11pt; color:#000000;">
        <div style="text-align:center; font-weight:bold; font-size:13pt; margin-bottom:2pt; text-transform:uppercase;">
          KISI-KISI PENULISAN SOAL ${escapeHtml(kop.judulAsesmenDokumen)}
        </div>
        <div style="text-align:center; font-weight:bold; font-size:11pt; margin-bottom:10pt; text-transform:uppercase;">
          ${escapeHtml(kop.barisKop1)} — ${escapeHtml(kop.tahunPelajaran)}
        </div>
        <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:8pt; font-size:11pt;">
          <tr>
            <td style="width:18%; border:none; padding:2pt 0; font-weight:bold;">Mata Pelajaran</td>
            <td style="width:32%; border:none; padding:2pt 0;">: Pendidikan Agama Islam dan Budi Pekerti</td>
            <td style="width:18%; border:none; padding:2pt 0; font-weight:bold;">Kelas / Semester</td>
            <td style="width:32%; border:none; padding:2pt 0;">: ${escapeHtml(
              kelasFormatted
            )} (${escapeHtml(defaultKelasSmt)})</td>
          </tr>
          <tr>
            <td style="border:none; padding:2pt 0; font-weight:bold;">Kurikulum Acuan</td>
            <td style="border:none; padding:2pt 0;">: Kurikulum Merdeka (Kepka No. 020 Tahun 2026)</td>
            <td style="border:none; padding:2pt 0; font-weight:bold;">Alokasi Waktu</td>
            <td style="border:none; padding:2pt 0;">: ${escapeHtml(kop.waktuUjian)}</td>
          </tr>
        </table>
        <table style="width:100%; border-collapse:collapse; border:1px solid #000000; font-size:10.5pt;">
          <thead>
            <tr style="background-color:#e2e8f0; font-weight:bold; text-align:center;">
              <th style="border:1px solid #000000; padding:5pt; width:26pt;">No</th>
              <th style="border:1px solid #000000; padding:5pt; width:85pt;">Elemen &amp; Dimensi Cinta</th>
              <th style="border:1px solid #000000; padding:5pt;">Tujuan Pembelajaran (TP)</th>
              <th style="border:1px solid #000000; padding:5pt; width:55pt;">Kelas/Smt</th>
              <th style="border:1px solid #000000; padding:5pt; width:90pt;">Materi Pokok</th>
              <th style="border:1px solid #000000; padding:5pt; width:65pt;">Level Kognitif</th>
              <th style="border:1px solid #000000; padding:5pt;">Indikator Soal (Rumusan ABCD)</th>
              <th style="border:1px solid #000000; padding:5pt; width:65pt;">Bentuk Soal</th>
              <th style="border:1px solid #000000; padding:5pt; width:40pt;">No. Soal</th>
            </tr>
          </thead>
          <tbody>
            ${pkg.kisiKisi
              .map((row) => {
                const kSmt = row.kelasSmt || defaultKelasSmt;
                const mPokok =
                  row.materiPokok ||
                  `${row.elemen} (${ELEMEN_DIMENSI_CINTA[row.elemen]})`;
                return `<tr>
                  <td style="border:1px solid #000000; padding:4pt; text-align:center; vertical-align:top;">${
                    row.no
                  }</td>
                  <td style="border:1px solid #000000; padding:4pt; vertical-align:top;"><strong>${escapeHtml(
                    row.elemen
                  )}</strong><br/><span style="font-size:9.5pt;">${escapeHtml(
                    ELEMEN_DIMENSI_CINTA[row.elemen]
                  )}</span></td>
                  <td style="border:1px solid #000000; padding:4pt; vertical-align:top;">${escapeHtml(
                    row.capaianTujuanPembelajaran
                  )}</td>
                  <td style="border:1px solid #000000; padding:4pt; text-align:center; vertical-align:top;">${escapeHtml(
                    kSmt
                  )}</td>
                  <td style="border:1px solid #000000; padding:4pt; vertical-align:top;">${escapeHtml(
                    mPokok
                  )}</td>
                  <td style="border:1px solid #000000; padding:4pt; text-align:center; vertical-align:top;">${escapeHtml(
                    row.levelKognitif
                  )}</td>
                  <td style="border:1px solid #000000; padding:4pt; vertical-align:top;">${escapeHtml(
                    row.indikatorSoalABCD
                  )}</td>
                  <td style="border:1px solid #000000; padding:4pt; text-align:center; vertical-align:top;">${escapeHtml(
                    row.bentukSoal
                  )}</td>
                  <td style="border:1px solid #000000; padding:4pt; text-align:center; font-weight:bold; vertical-align:top;">${escapeHtml(
                    row.nomorSoal
                  )}</td>
                </tr>`;
              })
              .join('')}
          </tbody>
        </table>
        ${
          pkg.pemetaanUraian && pkg.pemetaanUraian.length > 0
            ? `<div style="font-weight:bold; font-size:11pt; margin-top:14pt; margin-bottom:4pt; text-transform:uppercase;">
                PEMETAAN SOAL URAIAN / ESSAY
              </div>
              <table style="width:100%; border-collapse:collapse; border:1px solid #000000; font-size:10.5pt; margin-bottom:10pt;">
                <thead>
                  <tr style="background-color:#e2e8f0; font-weight:bold; text-align:center;">
                    <th style="border:1px solid #000000; padding:5pt; width:30pt;">No</th>
                    <th style="border:1px solid #000000; padding:5pt;">Tujuan Pembelajaran</th>
                    <th style="border:1px solid #000000; padding:5pt; width:80pt;">Kelas / Smt</th>
                    <th style="border:1px solid #000000; padding:5pt; width:140pt;">Konten / Materi</th>
                  </tr>
                </thead>
                <tbody>
                  ${pkg.pemetaanUraian
                    .map(
                      (r) => `<tr>
                        <td style="border:1px solid #000000; padding:4pt; text-align:center; vertical-align:top;">${r.no}</td>
                        <td style="border:1px solid #000000; padding:4pt; vertical-align:top;">${escapeHtml(r.tujuanPembelajaran)}</td>
                        <td style="border:1px solid #000000; padding:4pt; text-align:center; vertical-align:top;">${escapeHtml(r.kelasSemester)}</td>
                        <td style="border:1px solid #000000; padding:4pt; vertical-align:top;">${escapeHtml(r.kontenMateri)}</td>
                      </tr>`
                    )
                    .join('')}
                </tbody>
              </table>`
            : ''
        }
        <table style="width:100%; border-collapse:collapse; border:none; margin-top:14pt; font-size:11pt;">
          <tr>
            <td style="width:50%; border:none; padding:4pt 16pt; vertical-align:top;">
              <div>Mengetahui,</div>
              <strong>${escapeHtml(kop.jabatanKiri || 'Pengawas PAI')}</strong><br/><br/><br/><br/>
              <strong><u>${escapeHtml(kop.namaPengawasPai)}</u></strong><br/>
              <strong>NIP. ${escapeHtml(kop.nipPengawasPai)}</strong>
            </td>
            <td style="width:50%; border:none; padding:4pt 16pt; vertical-align:top;">
              <div>${escapeHtml(kop.tempatTanggalTandatangan || 'Lalembuu, .................... 2026')}</div>
              <strong>${escapeHtml(kop.jabatanKanan || 'Guru Pendidikan Agama Islam')}</strong><br/><br/><br/><br/>
              <strong><u>${escapeHtml(kop.namaGuruPai)}</u></strong><br/>
              <strong>NIP. ${escapeHtml(kop.nipGuruPai)}</strong>
            </td>
          </tr>
        </table>
      </div>${pageBreakHtml}`
    : '';

  // KOP SURAT TABLE (Reusable for KKG and US)
  const kopSuratTableHtml = `<table style="width:100%; border-collapse:collapse; border:none; border-bottom:3px double #000000; padding-bottom:6pt; margin-bottom:10pt; font-family:'Times New Roman', Times, serif;">
    <tr>
      <td style="width:80px; border:none; text-align:center; vertical-align:middle; padding:2pt;">
        ${
          logoKiri
            ? `<img src="${logoKiri}" alt="Logo Kiri" width="68" height="76" style="width:68px; height:auto; display:inline-block;" />`
            : ''
        }
      </td>
      <td style="border:none; text-align:center; vertical-align:middle; padding:2pt 6pt; line-height:1.25;">
        <div style="font-size:13pt; font-weight:bold; text-transform:uppercase;">${escapeHtml(
          kop.barisKop1
        )}</div>
        <div style="font-size:13pt; font-weight:bold; text-transform:uppercase;">${escapeHtml(
          kop.barisKop2
        )}</div>
        <div style="font-size:13pt; font-weight:bold; text-transform:uppercase;">${escapeHtml(
          kop.barisKop3
        )}</div>
        <div style="font-size:12pt; font-weight:bold; text-transform:uppercase;">${escapeHtml(
          kop.judulAsesmenDokumen
        )}</div>
        <div style="font-size:12pt; font-weight:bold; text-transform:uppercase;">${escapeHtml(
          kop.tahunPelajaran
        )}</div>
      </td>
      <td style="width:80px; border:none; text-align:center; vertical-align:middle; padding:2pt;">
        ${
          logoKanan
            ? `<img src="${logoKanan}" alt="Logo Kanan" width="68" height="76" style="width:68px; height:auto; display:inline-block;" />`
            : ''
        }
      </td>
    </tr>
  </table>`;

  // MODE B EXTRA PAGES: Cover US, Berita Acara, Daftar Hadir 20 Baris
  const usCoverAndAdminHtml =
    kop.layoutMode === 'us'
      ? `<div style="font-family:'Times New Roman', Times, serif; font-size:12pt; color:#000000;">
          <!-- HALAMAN COVER LEMBAR SOAL US -->
          <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:18pt;">
            <tr>
              <td style="width:75px; border:none; vertical-align:middle;">
                ${
                  logoKiri
                    ? `<img src="${logoKiri}" alt="Logo Pemda" width="64" height="72" />`
                    : ''
                }
              </td>
              <td style="border:none; vertical-align:middle; padding-left:6pt;">
                <div style="font-size:12pt; font-weight:bold; text-transform:uppercase;">${escapeHtml(
                  kop.barisKop1
                )}</div>
                <div style="font-size:12pt; font-weight:bold; text-transform:uppercase;">${escapeHtml(
                  kop.barisKop2
                )}</div>
              </td>
              <td style="width:120px; border:2px solid #000000; text-align:center; vertical-align:middle; font-size:18pt; font-weight:bold; padding:8pt;">
                UTAMA
              </td>
            </tr>
          </table>

          <table style="width:100%; border-collapse:collapse; border:none; margin-top:20pt; margin-bottom:24pt;">
            <tr>
              <td style="width:85px; border:none; text-align:center; vertical-align:middle;">
                <img src="${logoKemenag}" alt="Logo Kemenag" width="68" height="72" />
              </td>
              <td style="border:none; text-align:center; vertical-align:middle; font-weight:bold; font-size:12.5pt; line-height:1.4; text-transform:uppercase;">
                <div>${escapeHtml(kop.judulAsesmenDokumen)}</div>
                <div>TINGKAT ${escapeHtml(kop.namaSekolah)}</div>
                <div>TAHUN PELAJARAN ${escapeHtml(
                  kop.tahunPelajaran.replace(/^TP\.?\s*/i, '')
                )}</div>
                <div style="margin-top:4pt;">LEMBAR SOAL</div>
              </td>
              <td style="width:85px; border:none; text-align:center; vertical-align:middle;">
                <img src="${logoTutWuri}" alt="Logo Tut Wuri" width="68" height="72" />
              </td>
            </tr>
          </table>

          <table style="width:88%; margin:0 auto 24pt auto; border-collapse:collapse; border:none; font-size:12pt; font-weight:bold;">
            <tr>
              <td style="width:36%; border:none; padding:4pt 0;">MATA UJIAN</td>
              <td style="border:none; padding:4pt 0;">: PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI</td>
            </tr>
            <tr>
              <td style="border:none; padding:4pt 0;">SATUAN PENDIDIKAN</td>
              <td style="border:none; padding:4pt 0;">: ${escapeHtml(kop.namaSekolah)}</td>
            </tr>
            <tr>
              <td style="border:none; padding:4pt 0;">HARI/TANGGAL</td>
              <td style="border:none; padding:4pt 0;">: ${escapeHtml(kop.hariTanggal)}</td>
            </tr>
            <tr>
              <td style="border:none; padding:4pt 0;">WAKTU</td>
              <td style="border:none; padding:4pt 0;">: ${escapeHtml(
                kop.waktuUjian.toUpperCase()
              )}</td>
            </tr>
          </table>

          <div style="text-align:center; font-weight:bold; font-size:12pt; text-decoration:underline; margin-bottom:10pt;">
            PETUNJUK UMUM
          </div>
          <ol style="font-size:11.5pt; line-height:1.5; margin-left:18pt;">
            <li>Isikan identitas Anda pada lembar jawaban Ujian Sekolah (US).</li>
            <li>Beri tanda silang (X) pada jawaban yang dianggap paling tepat:<br/>
              <table style="border-collapse:collapse; margin:4pt 0;">
                <tr>
                  <td style="border:1px solid #000; width:22pt; height:18pt; text-align:center;">A</td>
                  <td style="border:1px solid #000; width:22pt; height:18pt; text-align:center; font-weight:bold;">X</td>
                  <td style="border:1px solid #000; width:22pt; height:18pt; text-align:center;">C</td>
                  <td style="border:1px solid #000; width:22pt; height:18pt; text-align:center;">D</td>
                </tr>
              </table>
            </li>
            <li>Bila jawaban hendak diperbaiki untuk mengganti dengan pilihan jawaban lain, maka berilah tanda dua garis mendatar pada jawaban semula lalu silang pilihan baru:<br/>
              <table style="border-collapse:collapse; margin:4pt 0;">
                <tr>
                  <td style="border:1px solid #000; width:22pt; height:18pt; text-align:center; text-decoration:line-through;">X</td>
                  <td style="border:1px solid #000; width:22pt; height:18pt; text-align:center;">B</td>
                  <td style="border:1px solid #000; width:22pt; height:18pt; text-align:center; font-weight:bold;">X</td>
                  <td style="border:1px solid #000; width:22pt; height:18pt; text-align:center;">D</td>
                </tr>
              </table>
            </li>
            <li>Tulis nomor peserta pada kolom yang disediakan.</li>
            <li>Jumlah soal sebanyak ${pkg.butirSoal.length} butir (${pgSoal.length} soal pilihan ganda dan ${uraianSoal.length} soal uraian).</li>
            <li>Periksa dan bacalah setiap butir soal sebelum Anda menjawabnya.</li>
            <li>Laporkan kepada Pengawas Ujian apabila terdapat lembar soal yang kurang jelas, rusak, atau tidak lengkap.</li>
            <li>Periksa kembali pekerjaan Anda sebelum diserahkan kepada Pengawas Ujian.</li>
          </ol>
        </div>
        ${pageBreakHtml}
        <!-- BERITA ACARA PELAKSANAAN UJIAN SEKOLAH -->
        <div style="font-family:'Times New Roman', Times, serif; font-size:12pt; color:#000000; line-height:1.6;">
          <div style="text-align:center; font-weight:bold; font-size:13pt; text-transform:uppercase;">
            BERITA ACARA<br/>
            PELAKSANAAN UJIAN SEKOLAH TAHUN PELAJARAN ${escapeHtml(
              kop.tahunPelajaran.replace(/^TP\.?\s*/i, '')
            )}
          </div>
          <p style="margin-top:14pt; text-align:justify;">
            Pada hari ini ............................ tanggal ............................ bulan ............................ tahun <strong>dua ribu dua puluh enam</strong>.
          </p>
          <p style="text-align:justify;">
            a. Telah diselenggarakan Ujian Sekolah (US) dari pukul ................. sampai dengan pukul .................<br/>
            Pada Sekolah .................................................... Ruang ....................................................<br/>
            Jumlah peserta seharusnya : .................................................. Orang murid<br/>
            Jumlah peserta yang tidak hadir : .................................................. Orang murid<br/>
            Jumlah yang hadir : .................................................. Orang murid
          </p>
          <p style="text-align:justify;">
            b. Telah dibuka sampul Ujian Sekolah (US) untuk mata pelajaran <strong>Pendidikan Agama Islam dan Budi Pekerti (PAIBP)</strong> dengan nomor kode ................. di Ruang Ujian Sekolah dengan disaksikan oleh para peserta yang berisi lembar Soal sebanyak ............... Eksemplar, Lembar Jawaban sebanyak ............... Eksemplar, dan Blanko Daftar Hadir sebanyak ............... Eksemplar. Sebelum dibuka sampul Ujian Sekolah (US) tersebut dalam keadaan baik.
          </p>
          <p>
            c. Catatan selama pelaksanaan Ujian Sekolah (US):<br/>
            ........................................................................................................................................................................<br/>
            ........................................................................................................................................................................
          </p>
          <p>Berita acara ini dibuat dengan sesungguhnya.</p>
          <div style="text-align:center; font-weight:bold; margin-top:12pt; margin-bottom:10pt;">Pembuat Berita Acara</div>
          <table style="width:100%; border-collapse:collapse; border:none; font-size:12pt;">
            <tr>
              <td style="width:50%; border:none; padding:4pt 12pt; vertical-align:top;">
                <strong>Pengawas I</strong><br/><br/>
                Tanda tangan : ..........................................<br/><br/>
                Nama : ..........................................<br/>
                NIP. : ..........................................
              </td>
              <td style="width:50%; border:none; padding:4pt 12pt; vertical-align:top;">
                <strong>Pengawas II</strong><br/><br/>
                Tanda tangan : ..........................................<br/><br/>
                Nama : ..........................................<br/>
                NIP. : ..........................................
              </td>
            </tr>
          </table>
        </div>
        ${pageBreakHtml}
        <!-- DAFTAR HADIR PESERTA UJIAN SEKOLAH (20 BARIS) -->
        <div style="font-family:'Times New Roman', Times, serif; font-size:11pt; color:#000000;">
          <div style="text-align:center; font-weight:bold; font-size:12.5pt; margin-bottom:10pt; text-transform:uppercase;">
            DAFTAR HADIR PESERTA UJIAN SEKOLAH (US)<br/>
            TAHUN PELAJARAN ${escapeHtml(kop.tahunPelajaran.replace(/^TP\.?\s*/i, ''))}
          </div>
          <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:8pt; font-size:11pt;">
            <tr><td style="width:22%; border:none; padding:2pt 0;">Kab./Kota</td><td style="border:none; padding:2pt 0;">: ${escapeHtml(kop.kabupatenKota)}</td></tr>
            <tr><td style="border:none; padding:2pt 0;">Nama Sekolah</td><td style="border:none; padding:2pt 0;">: .................................................</td></tr>
            <tr><td style="border:none; padding:2pt 0;">Mata Pelajaran</td><td style="border:none; padding:2pt 0;">: Pendidikan Agama Islam dan Budi Pekerti</td></tr>
          </table>
          <table style="width:100%; border-collapse:collapse; border:1px solid #000000; font-size:10.5pt;">
            <thead>
              <tr style="background-color:#f1f5f9; font-weight:bold; text-align:center;">
                <th style="border:1px solid #000; padding:4pt; width:30pt;">No</th>
                <th style="border:1px solid #000; padding:4pt; width:130pt;">Nomor Peserta</th>
                <th style="border:1px solid #000; padding:4pt;">Nama Peserta (Isi dengan huruf balok)</th>
                <th style="border:1px solid #000; padding:4pt; width:130pt;">Tanda Tangan</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: 20 }, (_, i) => i + 1)
                .map(
                  (num) => `<tr>
                    <td style="border:1px solid #000; padding:3.5pt; text-align:center;">${num}</td>
                    <td style="border:1px solid #000; padding:3.5pt;">&nbsp;</td>
                    <td style="border:1px solid #000; padding:3.5pt;">&nbsp;</td>
                    <td style="border:1px solid #000; padding:3.5pt; ${
                      num % 2 === 1 ? 'text-align:left;' : 'text-align:center;'
                    }">${num}. ...........</td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>
          <div style="border:1px solid #000; padding:6pt 10pt; margin-top:8pt; font-size:10.5pt;">
            Jumlah peserta seharusnya : .................................................. murid<br/>
            Jumlah peserta yang tidak hadir : .................................................. murid<br/>
            Jumlah yang hadir : .................................................. murid
          </div>
          <table style="width:100%; border-collapse:collapse; border:none; margin-top:10pt; font-size:11pt;">
            <tr>
              <td style="width:50%; border:none; padding:4pt;">
                Pengawas I<br/>Tanda tangan : ..........................................<br/>Nama : ..........................................<br/>NIP. : ..........................................
              </td>
              <td style="width:50%; border:none; padding:4pt;">
                Pengawas II<br/>Tanda tangan : ..........................................<br/>Nama : ..........................................<br/>NIP. : ..........................................
              </td>
            </tr>
          </table>
        </div>
        ${pageBreakHtml}`
      : '';

  // BAGIAN 2: NASKAH LEMBAR SOAL MURID
  const studentIdentityBoxHtml = `<table style="width:100%; border-collapse:collapse; border:none; margin-bottom:12pt; font-family:'Times New Roman', Times, serif; font-size:12pt; font-weight:bold;">
    <tr>
      <td style="width:13%; border:none; padding:3pt 0;">Nama</td>
      <td style="width:42%; border:none; padding:3pt 0;">: ..................................................</td>
      <td style="width:18%; border:none; padding:3pt 0;">Hari/Tanggal</td>
      <td style="width:27%; border:none; padding:3pt 0;">: ${escapeHtml(kop.hariTanggal)}</td>
    </tr>
    <tr>
      <td style="border:none; padding:3pt 0;">Kelas</td>
      <td style="border:none; padding:3pt 0;">: ${escapeHtml(kelasFormatted)}</td>
      <td style="border:none; padding:3pt 0;">Waktu</td>
      <td style="border:none; padding:3pt 0;">: ${escapeHtml(kop.waktuUjian)}</td>
    </tr>
  </table>`;

  const optionCommandLetters =
    pkg.parameters.fase === 'Fase A'
      ? 'a, b, atau c'
      : pkg.parameters.fase === 'Fase E' || pkg.parameters.fase === 'Fase F'
      ? 'a, b, c, d, atau e'
      : 'a, b, c, atau d';

  const naskahSoalSectionHtml = `<div style="font-family:'Times New Roman', Times, serif; font-size:12pt; color:#000000;">
    ${kopSuratTableHtml}
    ${studentIdentityBoxHtml}
    <div style="border:1px solid #000000; padding:6pt 8pt; margin-top:4pt; margin-bottom:10pt; font-size:11pt; line-height:1.4;">
      <div style="font-weight:bold; text-transform:uppercase; margin-bottom:2pt;">Petunjuk Umum:</div>
      <ol style="margin:0; padding-left:16pt;">
        <li>Berdoalah sebelum mengerjakan soal!</li>
        <li>Tulislah nama dan nomor presensimu pada lembar jawaban yang telah disediakan!</li>
        <li>Bacalah dengan teliti setiap butir soal sebelum Anda menjawabnya!</li>
        <li>Kerjakan terlebih dahulu soal-soal yang kamu anggap paling mudah!</li>
      </ol>
    </div>
    ${
      pgSoal.length > 0
        ? `<div style="font-weight:bold; margin-top:6pt; margin-bottom:6pt;">
            ${
              kop.layoutMode === 'us'
                ? `I. Pilihan Ganda<br/><span style="font-weight:normal; font-style:italic;">Pilihlah salah satu jawaban yang paling benar di antara ${optionCommandLetters}!</span>`
                : `I. Berilah tanda silang (X) pada huruf ${optionCommandLetters} sesuai jawaban yang paling tepat!`
            }
          </div>
          ${renderSoalListHtml(pgSoal, false)}`
        : ''
    }
    ${
      isianSoal.length > 0
        ? `<div style="font-weight:bold; margin-top:12pt; margin-bottom:6pt;">
            ${
              kop.layoutMode === 'us'
                ? `II. Isilah titik-titik di bawah ini dengan jawaban yang singkat dan tepat!`
                : `B. Isian Singkat<br/><span style="font-weight:normal; font-style:italic;">II. Isilah titik-titik di bawah ini dengan jawaban yang singkat dan tepat!</span>`
            }
          </div>
          ${renderSoalListHtml(isianSoal, true)}`
        : ''
    }
    ${
      uraianMurniSoal.length > 0
        ? `<div style="font-weight:bold; margin-top:12pt; margin-bottom:6pt;">
            ${
              kop.layoutMode === 'us'
                ? isianSoal.length > 0
                  ? `III. Kerjakanlah soal Essay / Uraian berikut ini dengan benar dan jelas!`
                  : `II. Kerjakanlah soal Essay / Uraian berikut ini dengan benar dan jelas!`
                : isianSoal.length > 0
                ? `C. Uraian<br/><span style="font-weight:normal; font-style:italic;">III. Jawablah pertanyaan-pertanyaan di bawah ini dengan jelas dan tepat!</span>`
                : `B. Uraian<br/><span style="font-weight:normal; font-style:italic;">II. Jawablah pertanyaan-pertanyaan di bawah ini dengan jelas dan tepat!</span>`
            }
          </div>
          ${renderSoalListHtml(uraianMurniSoal, true)}`
        : ''
    }
    <div style="text-align:center; font-style:italic; font-size:10pt; color:#475569; margin-top:18pt; padding-top:8pt; border-top:1px solid #cbd5e1;">
      Disusun oleh KKG PAI / Smart PAI Assessor
    </div>
  </div>`;

  // LJK (Lembar Jawaban) for Mode US
  const ljkSectionHtml =
    kop.layoutMode === 'us'
      ? `${pageBreakHtml}
        <div style="font-family:'Times New Roman', Times, serif; font-size:11.5pt; color:#000000;">
          <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:10pt;">
            <tr>
              <td style="width:65px; border:none; vertical-align:middle;">
                ${logoKiri ? `<img src="${logoKiri}" width="58" height="66" alt="Logo"/>` : ''}
              </td>
              <td style="border:none; vertical-align:middle;">
                <div style="font-weight:bold; font-size:11.5pt;">${escapeHtml(kop.barisKop1)}</div>
                <div style="font-weight:bold; font-size:11.5pt;">${escapeHtml(kop.barisKop2)}</div>
              </td>
              <td style="width:220px; border:none; vertical-align:top;">
                <table style="width:100%; border-collapse:collapse; border:1px solid #000; font-size:10.5pt; font-weight:bold;">
                  <tr>
                    <td style="border:1px solid #000; padding:4pt; width:40%;">NAMA</td>
                    <td style="border:1px solid #000; padding:4pt;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="border:1px solid #000; padding:4pt;">NO. UJIAN</td>
                    <td style="border:1px solid #000; padding:4pt;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="text-align:center; font-weight:bold; border-bottom:2px solid #000; padding-bottom:6pt; margin-bottom:10pt; text-transform:uppercase;">
            LEMBAR JAWABAN<br/>
            ${escapeHtml(kop.judulAsesmenDokumen)}<br/>
            TAHUN PELAJARAN ${escapeHtml(kop.tahunPelajaran.replace(/^TP\.?\s*/i, ''))}
          </div>
          <div style="font-weight:bold; margin-bottom:6pt;">I. PILIHAN GANDA</div>
          <table style="width:100%; border-collapse:collapse; border:1px solid #000; margin-bottom:14pt; font-size:10.5pt; text-align:center;">
            <tbody>
              ${Array.from({ length: Math.max(10, Math.ceil(pgSoal.length / 2)) }, (_, r) => {
                const n1 = r + 1;
                const n2 = r + 1 + Math.max(10, Math.ceil(pgSoal.length / 2));
                return `<tr>
                  <td style="border:1px solid #000; padding:3pt; font-weight:bold; width:28pt;">${n1}</td>
                  <td style="border:1px solid #000; padding:3pt; width:24pt;">A</td>
                  <td style="border:1px solid #000; padding:3pt; width:24pt;">B</td>
                  <td style="border:1px solid #000; padding:3pt; width:24pt;">C</td>
                  <td style="border:1px solid #000; padding:3pt; width:24pt;">D</td>
                  <td style="border:none; width:24pt;">&nbsp;</td>
                  <td style="border:1px solid #000; padding:3pt; font-weight:bold; width:28pt;">${n2}</td>
                  <td style="border:1px solid #000; padding:3pt; width:24pt;">A</td>
                  <td style="border:1px solid #000; padding:3pt; width:24pt;">B</td>
                  <td style="border:1px solid #000; padding:3pt; width:24pt;">C</td>
                  <td style="border:1px solid #000; padding:3pt; width:24pt;">D</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
          <div style="font-weight:bold; margin-bottom:6pt;">II. ESSAY TEST</div>
          <div style="border:1.5px solid #000; min-height:220pt; padding:10pt;">&nbsp;</div>
        </div>`
      : '';

  // BAGIAN 3 (Saat Cetak/Salin): KUNCI JAWABAN MENYAMPING + URAIAN + RUBRIK + NILAI PRAKTIK
  const rowsPerKeyCol = Math.max(5, Math.ceil(pgSoal.length / 4));
  const keyGridRowsHtml = Array.from({ length: rowsPerKeyCol }, (_, rIdx) => {
    const cols = [0, 1, 2, 3].map((cIdx) => {
      const itemIdx = cIdx * rowsPerKeyCol + rIdx;
      const item = pgSoal[itemIdx];
      if (!item) {
        return `<td style="border:none; padding:2pt 8pt; width:25%;">&nbsp;</td>`;
      }
      return `<td style="border:none; padding:2pt 8pt; width:25%;"><strong>${item.nomor}.</strong> &nbsp; ${escapeHtml(
        item.kunciJawaban
      )}</td>`;
    });
    return `<tr>${cols.join('')}</tr>`;
  }).join('');

  const kunciDanRubrikSectionHtml = !studentSheetOnly
    ? `${pageBreakHtml}
      <div style="font-family:'Times New Roman', Times, serif; font-size:12pt; color:#000000;">
        <div style="text-align:center; font-weight:bold; font-size:13pt; margin-bottom:10pt; text-transform:uppercase;">
          KUNCI JAWABAN &amp; PEDOMAN PENSKORAN<br/>
          ${escapeHtml(kop.judulAsesmenDokumen)} (${escapeHtml(kop.tahunPelajaran)})
        </div>

        ${
          pgSoal.length > 0
            ? `<div style="font-weight:bold; margin-bottom:4pt;">A. Pilihan Ganda</div>
              <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:14pt; font-size:12pt;">
                ${keyGridRowsHtml}
              </table>`
            : ''
        }

        ${
          uraianSoal.length > 0
            ? `<div style="font-weight:bold; margin-bottom:6pt;">B. Uraian / Essay</div>
              <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:12pt; font-size:12pt;">
                ${uraianSoal
                  .map(
                    (u, idx) => `<tr>
                      <td style="width:24pt; border:none; padding:3pt 0; vertical-align:top; font-weight:bold;">${
                        kop.layoutMode === 'kkg' ? idx + 1 : u.nomor
                      }.</td>
                      <td style="border:none; padding:3pt 0; vertical-align:top;">
                        <div>${escapeHtml(u.kunciJawaban).replace(/\n/g, '<br/>')}</div>
                        <div style="font-size:10.5pt; color:#334155; margin-top:2pt;"><em>Pembahasan / Dalil: ${escapeHtml(
                          u.pembahasanSingkat
                        )} (${escapeHtml(u.dalilAtauKonsep)})</em></div>
                      </td>
                    </tr>`
                  )
                  .join('')}
              </table>`
            : ''
        }

        <p style="font-style:italic; margin-top:8pt; margin-bottom:14pt;">
          <strong>Catatan:</strong> Kebijakan penilaian jawaban uraian diserahkan kepada masing-masing Guru PAI berdasarkan rubrik penskoran berikut.
        </p>

        <div style="font-weight:bold; margin-bottom:6pt;">C. Rubrik Analitik Penskoran Soal Uraian (Skor 1–4)</div>
        <table style="width:100%; border-collapse:collapse; border:1px solid #000000; font-size:10.5pt; margin-bottom:14pt;">
          <thead>
            <tr style="background-color:#f1f5f9; font-weight:bold;">
              <th style="border:1px solid #000; padding:4pt; width:45pt; text-align:center;">No. Soal</th>
              <th style="border:1px solid #000; padding:4pt; width:140pt;">Aspek Penilaian</th>
              <th style="border:1px solid #000; padding:4pt;">Kriteria Penskoran (Skor 1–4)</th>
              <th style="border:1px solid #000; padding:4pt; width:50pt; text-align:center;">Skor Maks</th>
            </tr>
          </thead>
          <tbody>
            ${pkg.pedomanPenskoran.rubrikAnalitik
              .map(
                (r) => `<tr>
                  <td style="border:1px solid #000; padding:4pt; text-align:center; vertical-align:top;">${
                    r.nomorSoal
                  }</td>
                  <td style="border:1px solid #000; padding:4pt; vertical-align:top; font-weight:bold;">${escapeHtml(
                    r.aspekPenilaian
                  )}</td>
                  <td style="border:1px solid #000; padding:4pt; vertical-align:top;">
                    ${r.kriteriaSkor
                      .map(
                        (k) =>
                          `<div><strong>Skor ${k.skor}:</strong> ${escapeHtml(k.deskripsi)}</div>`
                      )
                      .join('')}
                  </td>
                  <td style="border:1px solid #000; padding:4pt; text-align:center; font-weight:bold; vertical-align:top;">${
                    r.skorMaksimal
                  }</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>

      ${pageBreakHtml}
      <!-- INSTRUMEN ASESMEN NILAI PRAKTIK PAI DAN BUDI PEKERTI (STANDAR US / KKG) -->
      <div style="font-family:'Times New Roman', Times, serif; font-size:10.5pt; color:#000000;">
        <div style="text-align:center; font-weight:bold; font-size:12pt; margin-bottom:10pt; text-transform:uppercase;">
          INSTRUMEN ASESMEN<br/>
          NILAI PRAKTIK UJIAN SEKOLAH (US) PAI DAN BUDI PEKERTI<br/>
          TAHUN PELAJARAN ${escapeHtml(kop.tahunPelajaran.replace(/^TP\.?\s*/i, ''))}
        </div>
        <table style="width:100%; border-collapse:collapse; border:1px solid #000000; font-size:9.5pt; text-align:center;">
          <thead>
            <tr style="background-color:#f1f5f9; font-weight:bold;">
              <th rowspan="4" style="border:1px solid #000; padding:3pt; width:24pt;">No.</th>
              <th rowspan="4" style="border:1px solid #000; padding:3pt; width:110pt;">NAMA MURID</th>
              <th colspan="6" style="border:1px solid #000; padding:3pt;">(A) ASPEK AL-QUR'AN YANG DINILAI</th>
              <th colspan="5" style="border:1px solid #000; padding:3pt;">(B) ASPEK FIQIH YANG DINILAI</th>
              <th colspan="6" style="border:1px solid #000; padding:3pt;">(C) ASPEK IBADAH YANG DINILAI</th>
              <th rowspan="4" style="border:1px solid #000; padding:3pt; width:42pt;">Nilai Akhir<br/>(A+B+C)/3</th>
            </tr>
            <tr style="background-color:#f8fafc; font-weight:bold;">
              <th colspan="2" style="border:1px solid #000; padding:2.5pt;">BACAAN</th>
              <th colspan="2" style="border:1px solid #000; padding:2.5pt;">HAFALAN</th>
              <th style="border:1px solid #000; padding:2.5pt;">TERJEMAHAN</th>
              <th rowspan="3" style="border:1px solid #000; padding:2.5pt;">Skor Jml (A)</th>
              <th colspan="4" style="border:1px solid #000; padding:2.5pt;">Wudhu</th>
              <th rowspan="3" style="border:1px solid #000; padding:2.5pt;">Skor Jml (B)</th>
              <th colspan="5" style="border:1px solid #000; padding:2.5pt;">SHALAT</th>
              <th rowspan="3" style="border:1px solid #000; padding:2.5pt;">Skor Jml (C)</th>
            </tr>
            <tr style="font-weight:bold;">
              <th style="border:1px solid #000; padding:2pt;">Tajwid</th>
              <th style="border:1px solid #000; padding:2pt;">Lancar</th>
              <th style="border:1px solid #000; padding:2pt;">Lancar</th>
              <th style="border:1px solid #000; padding:2pt;">Tajwid</th>
              <th style="border:1px solid #000; padding:2pt;">Ketepatan</th>
              <th style="border:1px solid #000; padding:2pt;">Niat</th>
              <th style="border:1px solid #000; padding:2pt;">Gerakan</th>
              <th style="border:1px solid #000; padding:2pt;">Tertib</th>
              <th style="border:1px solid #000; padding:2pt;">Do'a</th>
              <th style="border:1px solid #000; padding:2pt;">Bacaan</th>
              <th style="border:1px solid #000; padding:2pt;">Gerakan shalat</th>
              <th style="border:1px solid #000; padding:2pt;">Keserasian</th>
              <th style="border:1px solid #000; padding:2pt;">Duduk Tuma'ninah</th>
              <th style="border:1px solid #000; padding:2pt;">Tertib</th>
            </tr>
            <tr style="font-weight:bold; background-color:#f1f5f9;">
              <th style="border:1px solid #000; padding:2pt;">10</th>
              <th style="border:1px solid #000; padding:2pt;">10</th>
              <th style="border:1px solid #000; padding:2pt;">10</th>
              <th style="border:1px solid #000; padding:2pt;">10</th>
              <th style="border:1px solid #000; padding:2pt;">10</th>
              <th style="border:1px solid #000; padding:2pt;">3</th>
              <th style="border:1px solid #000; padding:2pt;">8</th>
              <th style="border:1px solid #000; padding:2pt;">4</th>
              <th style="border:1px solid #000; padding:2pt;">5</th>
              <th style="border:1px solid #000; padding:2pt;">6</th>
              <th style="border:1px solid #000; padding:2pt;">10</th>
              <th style="border:1px solid #000; padding:2pt;">6</th>
              <th style="border:1px solid #000; padding:2pt;">4</th>
              <th style="border:1px solid #000; padding:2pt;">4</th>
            </tr>
          </thead>
          <tbody>
            ${Array.from({ length: 16 }, (_, idx) => idx + 1)
              .map(
                (n) => `<tr>
                  <td style="border:1px solid #000; padding:3pt;">${n}</td>
                  <td style="border:1px solid #000; padding:3pt; text-align:left;">&nbsp;</td>
                  ${Array.from({ length: 18 })
                    .map(() => `<td style="border:1px solid #000; padding:3pt;">&nbsp;</td>`)
                    .join('')}
                </tr>`
              )
              .join('')}
          </tbody>
        </table>

        <table style="width:100%; border-collapse:collapse; border:none; margin-top:14pt; font-size:11pt;">
          <tr>
            <td style="width:50%; border:none; padding:4pt 16pt; vertical-align:top;">
              <div>Mengetahui,</div>
              <strong>${escapeHtml(kop.jabatanKiri || 'Pengawas PAI')}</strong><br/><br/><br/><br/>
              <strong><u>${escapeHtml(kop.namaPengawasPai)}</u></strong><br/>
              <strong>NIP. ${escapeHtml(kop.nipPengawasPai)}</strong>
            </td>
            <td style="width:50%; border:none; padding:4pt 16pt; vertical-align:top;">
              <div>${escapeHtml(kop.tempatTanggalTandatangan || 'Lalembuu, .................... 2026')}</div>
              <strong>${escapeHtml(kop.jabatanKanan || 'Guru Pendidikan Agama Islam')}</strong><br/><br/><br/><br/>
              <strong><u>${escapeHtml(kop.namaGuruPai)}</u></strong><br/>
              <strong>NIP. ${escapeHtml(kop.nipGuruPai)}</strong>
            </td>
          </tr>
        </table>

        <div style="margin-top:12pt; font-size:10pt;">
          <strong>Pedoman Kriteria Praktik (${practiceInstrument.length} Aspek Utama):</strong>
          ${practiceInstrument
            .map(
              (p) =>
                `<div>${p.no}. <strong>${escapeHtml(p.aspekPraktik)}</strong> (Bobot ${
                  p.bobotMaksimal
                }): ${escapeHtml(p.indikatorKinerja)}</div>`
            )
            .join('')}
        </div>
      </div>`
    : '';

  return `<div style="font-family:'Times New Roman', Times, serif; font-size:12pt; color:#000000; line-height:1.45;">
    ${kisiKisiSectionHtml}
    ${usCoverAndAdminHtml}
    ${naskahSoalSectionHtml}
    ${ljkSectionHtml}
    ${kunciDanRubrikSectionHtml}
  </div>`;
}

/**
 * Generates clean plain text WITHOUT any Markdown syntax (#, ###, **, ---)
 * as the text/plain fallback for ClipboardItem.
 */
export function buildPlainTextWithoutMarkdown(
  pkg: AssessmentPackage,
  kop: KopSoalConfig,
  options: ExportDocumentOptions = {}
): string {
  const { studentSheetOnly = false } = options;
  const kelasFormatted = formatKelasDisplay(pkg.parameters.kelas);
  const defaultKelasSmt = formatKelasSemester(
    pkg.parameters.kelas,
    pkg.parameters.jenisUjian,
    pkg.parameters.semester
  );
  const pgSoal = pkg.butirSoal.filter(
    (s) => s.bentukSoal !== 'Uraian' && s.bentukSoal !== 'Isian Singkat'
  );
  const isianSoal = pkg.butirSoal.filter((s) => s.bentukSoal === 'Isian Singkat');
  const uraianMurniSoal = pkg.butirSoal.filter((s) => s.bentukSoal === 'Uraian');
  const uraianSoal = pkg.butirSoal.filter(
    (s) => s.bentukSoal === 'Uraian' || s.bentukSoal === 'Isian Singkat'
  );

  const lines: string[] = [];

  lines.push(kop.barisKop1.toUpperCase());
  lines.push(kop.barisKop2.toUpperCase());
  lines.push(kop.barisKop3.toUpperCase());
  lines.push(kop.judulAsesmenDokumen.toUpperCase());
  lines.push(kop.tahunPelajaran.toUpperCase());
  lines.push('================================================================');
  lines.push(`Nama         : ....................................\tHari/Tanggal : ${kop.hariTanggal}`);
  lines.push(`Kelas        : ${kelasFormatted} (${defaultKelasSmt})\tWaktu        : ${kop.waktuUjian}`);
  lines.push('');

  if (!studentSheetOnly) {
    lines.push('BAGIAN 1: KISI-KISI PENULISAN SOAL');
    for (const r of pkg.kisiKisi) {
      lines.push(
        `${r.no}. [${r.elemen} | Kelas/Smt: ${r.kelasSmt || defaultKelasSmt} | ${r.levelKognitif}] TP: ${
          r.capaianTujuanPembelajaran
        } | Indikator: ${r.indikatorSoalABCD} (${r.bentukSoal}, No. ${r.nomorSoal})`
      );
    }
    if (pkg.pemetaanUraian && pkg.pemetaanUraian.length > 0) {
      lines.push('');
      lines.push('PEMETAAN SOAL URAIAN / ESSAY:');
      for (const u of pkg.pemetaanUraian) {
        lines.push(`${u.no}. TP: ${u.tujuanPembelajaran} | Kelas/Smt: ${u.kelasSemester} | Konten: ${u.kontenMateri}`);
      }
    }
    lines.push('');
  }

  lines.push('PETUNJUK UMUM:');
  lines.push('1. Berdoalah sebelum mengerjakan soal!');
  lines.push('2. Tulislah nama dan nomor presensimu pada lembar jawaban yang telah disediakan!');
  lines.push('3. Bacalah dengan teliti setiap butir soal sebelum Anda menjawabnya!');
  lines.push('4. Kerjakan terlebih dahulu soal-soal yang kamu anggap paling mudah!');
  lines.push('');

  const optionLetters =
    pkg.parameters.fase === 'Fase A'
      ? 'a, b, atau c'
      : pkg.parameters.fase === 'Fase E' || pkg.parameters.fase === 'Fase F'
      ? 'a, b, c, d, atau e'
      : 'a, b, c, atau d';

  if (pgSoal.length > 0) {
    lines.push(
      `I. Berilah tanda silang (X) pada huruf ${optionLetters} sesuai jawaban yang paling tepat!`
    );
    lines.push('');
    for (const s of pgSoal) {
      lines.push(`${s.nomor}. ${s.stimulus ? `${s.stimulus}\n   ` : ''}${s.pertanyaan}`);
      if (s.opsi && s.opsi.length > 0) {
        for (const o of s.opsi) {
          lines.push(`   ${o.label.toLowerCase()}. ${o.teks}`);
        }
      }
      lines.push('');
    }
  }

  if (isianSoal.length > 0) {
    lines.push('B. Isian Singkat');
    lines.push('II. Isilah titik-titik di bawah ini dengan jawaban yang singkat dan tepat!');
    lines.push('');
    isianSoal.forEach((s, idx) => {
      const num = kop.layoutMode === 'kkg' ? idx + 1 : s.nomor;
      lines.push(`${num}. ${s.stimulus ? `${s.stimulus}\n   ` : ''}${s.pertanyaan}`);
      lines.push('');
    });
  }

  if (uraianMurniSoal.length > 0) {
    lines.push(isianSoal.length > 0 ? 'C. Uraian' : 'B. Uraian');
    lines.push(
      isianSoal.length > 0
        ? 'III. Jawablah pertanyaan-pertanyaan di bawah ini dengan jelas dan tepat!'
        : 'II. Jawablah pertanyaan-pertanyaan di bawah ini dengan jelas dan tepat!'
    );
    lines.push('');
    uraianMurniSoal.forEach((s, idx) => {
      const num = kop.layoutMode === 'kkg' ? idx + 1 : s.nomor;
      lines.push(`${num}. ${s.stimulus ? `${s.stimulus}\n   ` : ''}${s.pertanyaan}`);
      lines.push('');
    });
  }

  if (!studentSheetOnly) {
    lines.push('KUNCI JAWABAN');
    if (pgSoal.length > 0) {
      lines.push('A. Pilihan Ganda');
      lines.push(pgSoal.map((s) => `${s.nomor}. ${s.kunciJawaban}`).join('    '));
      lines.push('');
    }
    if (uraianSoal.length > 0) {
      lines.push('B. Uraian');
      uraianSoal.forEach((u, idx) => {
        const num = kop.layoutMode === 'kkg' ? idx + 1 : u.nomor;
        lines.push(`${num}. ${u.kunciJawaban}`);
      });
      lines.push('');
    }
    lines.push('Catatan: Jawaban diserahkan kepada masing-masing guru PAI.');
  }

  return lines.join('\n');
}

/**
 * Wraps the Rich HTML document with Microsoft Office Word namespaces and styles
 * so Microsoft Word opens the downloaded .doc file with native tables, page breaks, and 12pt Times New Roman.
 */
export function buildWordDocContent(
  pkg: AssessmentPackage,
  kop: KopSoalConfig,
  options: ExportDocumentOptions = {}
): string {
  const bodyHtml = buildRichDocumentHtml(pkg, kop, options);
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(pkg.judulAsesmen)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 21cm 29.7cm;
      margin: 2cm 2cm 2cm 2cm;
      mso-page-orientation: portrait;
    }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 12pt;
      color: #000000;
      line-height: 1.4;
    }
    table {
      border-collapse: collapse;
    }
    p, div {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
}

/**
 * Generates an Excel-compatible HTML workbook (.xls) containing:
 * 1) Matriks Kisi-Kisi Penulisan Soal Resmi (9 Kolom)
 * 2) Tabel Pemetaan Soal Uraian / Essay
 * 3) Daftar Kunci Jawaban, Skor & Pembahasan
 */
export function buildExcelDocContent(
  pkg: AssessmentPackage,
  kop: KopSoalConfig
): string {
  const defaultKelasSmt = formatKelasSemester(
    pkg.parameters.kelas,
    pkg.parameters.jenisUjian,
    pkg.parameters.semester
  );
  const kelasFormatted = formatKelasDisplay(pkg.parameters.kelas);

  const getQuestionMaxScore = (s: AssessmentPackage['butirSoal'][number]): number => {
    const rubricMatch = pkg.pedomanPenskoran?.rubrikAnalitik?.find(
      (r) => r.nomorSoal === s.nomor
    );
    if (rubricMatch) return rubricMatch.skorMaksimal;
    const bobotMatch = pkg.pedomanPenskoran?.bobotPerBentuk?.find(
      (b) => b.bentuk === s.bentukSoal
    );
    if (bobotMatch) return bobotMatch.skorPerSoal;
    return s.bentukSoal === 'Uraian' ? 4 : s.bentukSoal === 'Isian Singkat' ? 2 : 1;
  };

  const kisiRowsHtml = pkg.kisiKisi
    .map(
      (r) => `<tr>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${r.no}</td>
        <td style="border:1pt solid #000000; padding:4pt;">${escapeHtml(r.elemen)} (${escapeHtml(
          ELEMEN_DIMENSI_CINTA[r.elemen] || '-'
        )})</td>
        <td style="border:1pt solid #000000; padding:4pt;">${escapeHtml(
          r.capaianTujuanPembelajaran
        )}</td>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${escapeHtml(
          r.kelasSmt || defaultKelasSmt
        )}</td>
        <td style="border:1pt solid #000000; padding:4pt;">${escapeHtml(
          r.materiPokok || pkg.parameters.topikMateri
        )}</td>
        <td style="border:1pt solid #000000; padding:4pt;">${escapeHtml(r.indikatorSoalABCD)}</td>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${escapeHtml(
          r.levelKognitif || r.levelCode
        )}</td>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${escapeHtml(
          r.bentukSoal
        )}</td>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${escapeHtml(
          r.nomorSoal || r.no
        )}</td>
      </tr>`
    )
    .join('');

  const pemetaanUraianSectionHtml =
    pkg.pemetaanUraian && pkg.pemetaanUraian.length > 0
      ? `
    <tr><td colspan="9"></td></tr>
    <tr>
      <td colspan="9" style="font-weight:bold; font-size:12pt;">PEMETAAN SOAL URAIAN / ESSAY</td>
    </tr>
    <tr style="background-color:#e0f2fe; font-weight:bold;">
      <th style="border:1pt solid #000000; padding:6pt;">No</th>
      <th colspan="4" style="border:1pt solid #000000; padding:6pt;">Tujuan Pembelajaran (TP)</th>
      <th style="border:1pt solid #000000; padding:6pt;">Kelas / Smt</th>
      <th colspan="3" style="border:1pt solid #000000; padding:6pt;">Konten / Materi Pokok</th>
    </tr>
    ${pkg.pemetaanUraian
      .map(
        (u) => `<tr>
      <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${u.no}</td>
      <td colspan="4" style="border:1pt solid #000000; padding:4pt;">${escapeHtml(
        u.tujuanPembelajaran
      )}</td>
      <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${escapeHtml(
        u.kelasSemester
      )}</td>
      <td colspan="3" style="border:1pt solid #000000; padding:4pt;">${escapeHtml(
        u.kontenMateri
      )}</td>
    </tr>`
      )
      .join('')}
  `
      : '';

  const kunciRowsHtml = pkg.butirSoal
    .map(
      (s) => `<tr>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${s.nomor}</td>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${escapeHtml(
          s.bentukSoal
        )}</td>
        <td style="border:1pt solid #000000; padding:4pt;">${escapeHtml(s.elemen)}</td>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${escapeHtml(
          `${s.levelCode} (${s.taksonomiBloom})`
        )}</td>
        <td style="border:1pt solid #000000; padding:4pt; font-weight:bold;">${escapeHtml(
          s.kunciJawaban
        )}</td>
        <td style="text-align:center; border:1pt solid #000000; padding:4pt;">${getQuestionMaxScore(
          s
        )}</td>
        <td colspan="2" style="border:1pt solid #000000; padding:4pt;">${escapeHtml(
          s.pembahasanSingkat
        )}</td>
        <td style="border:1pt solid #000000; padding:4pt;">${escapeHtml(
          s.dalilAtauKonsep
        )}</td>
      </tr>`
    )
    .join('');

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:x="urn:schemas-microsoft-com:office:excel"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>Kisi-Kisi & Kunci Jawaban - ${escapeHtml(pkg.judulAsesmen)}</title>
  <!--[if gte mso 9]>
  <xml>
    <x:ExcelWorkbook>
      <x:ExcelWorksheets>
        <x:ExcelWorksheet>
          <x:Name>Kisi-Kisi dan Kunci</x:Name>
          <x:WorksheetOptions>
            <x:DisplayGridlines/>
          </x:WorksheetOptions>
        </x:ExcelWorksheet>
      </x:ExcelWorksheets>
    </x:ExcelWorkbook>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 11pt;
    }
    table {
      border-collapse: collapse;
    }
  </style>
</head>
<body>
  <table style="width:100%; border-collapse:collapse;">
    <tr>
      <td colspan="9" style="font-weight:bold; font-size:13pt; text-align:center;">KISI-KISI PENULISAN SOAL &amp; KUNCI JAWABAN</td>
    </tr>
    <tr>
      <td colspan="9" style="font-weight:bold; font-size:12pt; text-align:center;">${escapeHtml(
        kop.barisKop1.toUpperCase()
      )} - ${escapeHtml(kop.barisKop2.toUpperCase())}</td>
    </tr>
    <tr>
      <td colspan="9" style="font-weight:bold; font-size:11pt; text-align:center;">${escapeHtml(
        kop.judulAsesmenDokumen.toUpperCase()
      )} (${escapeHtml(kop.tahunPelajaran)})</td>
    </tr>
    <tr>
      <td colspan="9" style="text-align:center;">Mata Pelajaran: Pendidikan Agama Islam dan Budi Pekerti | Kelas: ${escapeHtml(
        kelasFormatted
      )} (${escapeHtml(defaultKelasSmt)})</td>
    </tr>
    <tr><td colspan="9"></td></tr>
    <tr style="background-color:#d1fae5; font-weight:bold;">
      <th style="border:1pt solid #000000; padding:6pt;">No</th>
      <th style="border:1pt solid #000000; padding:6pt;">Elemen PAI &amp; Dimensi Cinta</th>
      <th style="border:1pt solid #000000; padding:6pt;">Capaian / Tujuan Pembelajaran (CP/TP)</th>
      <th style="border:1pt solid #000000; padding:6pt;">Kelas / Smt</th>
      <th style="border:1pt solid #000000; padding:6pt;">Materi Pokok</th>
      <th style="border:1pt solid #000000; padding:6pt;">Indikator Soal (ABCD)</th>
      <th style="border:1pt solid #000000; padding:6pt;">Level Kognitif</th>
      <th style="border:1pt solid #000000; padding:6pt;">Bentuk Soal</th>
      <th style="border:1pt solid #000000; padding:6pt;">Nomor Soal</th>
    </tr>
    ${kisiRowsHtml}
    ${pemetaanUraianSectionHtml}
    <tr><td colspan="9"></td></tr>
    <tr>
      <td colspan="9" style="font-weight:bold; font-size:12pt;">DAFTAR KUNCI JAWABAN, SKOR &amp; PEMBAHASAN PEDAGOGIS</td>
    </tr>
    <tr style="background-color:#fef3c7; font-weight:bold;">
      <th style="border:1pt solid #000000; padding:6pt;">No Soal</th>
      <th style="border:1pt solid #000000; padding:6pt;">Bentuk Soal</th>
      <th style="border:1pt solid #000000; padding:6pt;">Elemen PAI</th>
      <th style="border:1pt solid #000000; padding:6pt;">Level Kognitif</th>
      <th style="border:1pt solid #000000; padding:6pt;">Kunci Jawaban</th>
      <th style="border:1pt solid #000000; padding:6pt;">Skor Maks</th>
      <th colspan="2" style="border:1pt solid #000000; padding:6pt;">Pembahasan Singkat</th>
      <th style="border:1pt solid #000000; padding:6pt;">Dalil / Konsep Utama</th>
    </tr>
    ${kunciRowsHtml}
  </table>
</body>
</html>`;
}

