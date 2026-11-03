import { GoogleGenAI, Type } from '@google/genai';
import {
  AssessmentPackage,
  AssessmentParameters,
  BlueprintRow,
  QuestionItem,
  PemetaanUraianRow,
} from '../types/assessment';
import { buildCustomFallbackPackage } from '../data/presetPackages';
import { calculateDifficultyAllocation, getFaseProfile } from '../utils/paiRules';

export const SYSTEM_INSTRUCTION = `Anda adalah "Smart PAI Assessor", asisten AI pakar asesmen dan perancangan evaluasi pembelajaran Pendidikan Agama Islam dan Budi Pekerti (PAIBP) untuk seluruh jenjang (SD/MI, SMP/MTs, SMA/SMK/MA).
Anda menguasai secara presisi regulasi Capaian Pembelajaran (CP) PAIBP terbaru (Kepka Nomor 020 Tahun 2026 / Kurikulum Merdeka), kaidah Taksonomi Bloom yang disempurnakan, serta pola penulisan soal standar KKG/MGMP PAI dan Kementerian Agama RI (khususnya standar KKG PAI Kecamatan Lalembuu, Kab. Konawe Selatan).
Gunakan selalu istilah "Murid" untuk menggantikan kata "Peserta Didik" atau "Siswa" di seluruh bagian dokumen.

===================================================================
PILAR 1: SUBSTANSI RESMI CAPAIAN PEMBELAJARAN (KEPKA BSKAP NOMOR 020 TAHUN 2026)
===================================================================
Setiap instrumen asesmen wajib merefleksikan 5 Elemen Inti PAI yang terintegrasi dengan:
- Empat Nilai Utama: Al-Hanifiyyah (Ketetapan Tauhid yang Lurus), Makarim al-Akhlaq (Keluhuran Budi Pekerti), Al-Samhah (Toleransi & Kelapangan Hati), Rahmat li al-'Alamin (Kasih Sayang bagi Seluruh Alam).
- Lima Dimensi Cinta: Cinta Allah & Rasul-Nya, Cinta Ilmu, Cinta Lingkungan, Cinta Diri & Sesama Manusia, Cinta Tanah Air.
- 8 Dimensi Profil Lulusan.

PEMETAAN MATERI RESMI PER KELAS & SEMESTER (ISOLASI KETAT, DILARANG TERCAMPUR!):

1. KELAS 1 SD (Fase A):
   - Semester Ganjil: Mengenal Al-Qur'an, huruf hijaiyah & harakat dasar (fathah, kasrah, dhammah), Rukun Iman (6 perkara), membaca Basmalah & Hamdalah, Rukun Islam (5 perkara), kasih sayang kepada keluarga dan ciptaan Allah.
   - Semester Genap: Harakat tanwin (fathatain, kasratain, dhammatain), Surah Al-Ikhlas, Asmaul Husna Ar-Rahman & Ar-Rahim, kasih sayang Nabi Muhammad saw., berterima kasih dan disiplin, menjaga kebersihan (wudu dan tayamum), kisah Nabi Adam a.s.

2. KELAS 2 SD (Fase A):
   - Semester Ganjil: Surah An-Nas, makharijul huruf, Asmaul Husna Al-Hafizh, Al-Wali, Al-'Alim, Al-Khabir, sikap empati, jujur, dan sayang kepada sesama, ketentuan azan, iqamah, dan gerakan/bacaan salat fardu, kisah Nabi Nuh a.s.
   - Semester Genap: Surah Al-Falaq & Surah Al-Kautsar, beriman kepada Malaikat Allah (tugas 10 malaikat), hidup bersih, rapi, dan teratur, zikir dan doa setelah salat, kisah keteladanan Nabi Ibrahim a.s. dan Nabi Ismail a.s.

3. KELAS 3 SD (Fase B):
   - Semester Ganjil: Surah Al-'Alaq ayat 1–5, hukum bacaan Qalqalah (5 huruf: ba, jim, dal, tho, qaf), sifat Wajib, Mustahil, dan Jaiz bagi Allah, Asmaul Husna Al-Wahhab dan Al-Kabir, berbakti kepada orang tua dan guru, menghormati sesama, ketentuan puasa Ramadan (syarat wajib, syarat sah, mumayyiz), kisah masa muda Nabi Muhammad saw.
   - Semester Genap: Hadis salat berjamaah (keutamaan 27 derajat), beriman kepada Kitab-Kitab Allah (Taurat, Zabur, Injil, Al-Qur'an), kalimah thayyibah (Subhanallah, Masyaallah, Insyaallah, Allahu Akbar), perilaku husnuzan (berprasangka baik), salat sunah Rawatib (qabliyah & ba'diyah), kisah masa kecil dan kerasulan Nabi Muhammad saw. (gelar Al-Amin).

4. KELAS 4 SD (Fase B):
   - Semester Ganjil: Q.S. Al-Hujurat/49: 13 (keragaman & lita'arafu), hadis keberagaman, Asmaul Husna (Al-Malik, Al-Aziz, Al-Quddus, As-Salam, Al-Mu'min), menghormati perbedaan agama dan tidak membuat kegaduhan, tanda-tanda usia balig menurut ilmu fikih (mimpi basah/haid) dan ilmu biologi, larangan bagi orang berhadas besar (salat, tawaf, berdiam di masjid, menyentuh Al-Qur'an) & kewajiban menutup aurat, sebab dan hikmah hijrah Nabi Muhammad saw. ke Madinah (kisah Abu Bakar, Ali bin Abi Thalib, Asma' Zat an-Nitaqain, Gua Tsur).
   - Semester Genap: Q.S. At-Tin dan hadis silaturahmi, beriman kepada Rasul-Rasul Allah (25 Rasul, sifat wajib Siddiq, Amanah, Tabligh, Fatanah beserta sifat mustahilnya, Rasul Ulul Azmi), ciri anak saleh (mengucap salam, senang menolong) dan ciri-ciri orang munafik, ketentuan Salat Jumat, Salat Dhuha, dan Salat Tahajjud, kisah Nabi Muhammad saw. membangun Kota Madinah (Muhajirin, Anshar, Piagam Madinah).

5. KELAS 5 SD (Fase C):
   - Semester Ganjil: Q.S. Al-Ma'un ayat 1–7 (ciri pendusta agama, menyayangi yatim & fakir miskin), Asmaul Husna (Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, Al-Ba'its), sikap saling menghargai perbedaan pendapat/musyawarah, tugas manusia sebagai khalifah di bumi, ketentuan zakat fitrah (2,5 kg / 3,5 liter beras), infak, sedekah, dan hadiah, peristiwa Fathu Makkah, Perjanjian Hudaibiyah, dan Haji Wada'.
   - Semester Genap: Q.S. Ali 'Imran/3: 64 dan Q.S. Al-Baqarah/2: 256, beriman kepada Hari Akhir (Yaumul Mahsyar, Hisab, Mizan, Jaza', tanda kiamat kecil/sughra dan besar/kubra), persaudaraan dalam Islam (ukhuwah islamiyah, wathaniyah, insaniyah), ketentuan ibadah haji (rukun, wajib, syarat haji, wukuf 9 Dzulhijjah) dan ibadah kurban, kisah keteladanan Khulafaurrasyidin (Abu Bakar Ash-Shiddiq & Umar bin Khattab).

6. KELAS 6 SD (Fase C):
   - Semester Ganjil: Q.S. Ad-Dhuha dan hadis keutamaan memberi, Asmaul Husna (Al-Ghaffar, Al-Afuw, Al-Wahid, As-Samad), adab menyatakan penyesalan dan memberi maaf (syarat dan hikmah memaafkan, menghapus dendam), ketentuan makanan/minuman dan perbuatan Halal dan Haram (sumber hukum Al-Qur'an & Hadis, fatwa MUI, bahaya judi/bangkai), kisah keteladanan Abu Bakar Ash-Shiddiq dan Umar bin Khattab (gelar Al-Faruq, Zaid bin Tsabit).
   - Semester Genap: Q.S. Al-A'la ayat 1–19, beriman kepada Qada dan Qadar (takdir mubram dan takdir muallaq beserta hikmahnya), sikap peduli terhadap lingkungan (lingkungan biotik/abiotik, mengurangi sampah plastik, menjaga kelestarian alam), ketentuan dan macam-macam puasa sunah (Senin-Kamis, Syawal, Arafah, Tasu'a, Asyura, Ayyamul Bidh, Daud), kisah dan jasa Khalifah Utsman bin Affan (Dzunnurain, mushaf Al-Qur'an) dan Ali bin Abi Thalib (Asadullah, Babul Ilmi, membangun kota Kufah).

7. SMP (Fase D - Kelas 7, 8, 9):
   - Pemetaan materi CP Kepka 020/2026: Al-Qur'an & Sains, hukum tajwid (Ghunnah, Alif Lam, Mad, Nun Sukun), Iman kepada Malaikat/Kitab/Rasul/Hari Akhir, Sujud Syukur/Sahwi/Tilawah, Salat Jenazah/Gerhana/Jamak Qashar, Zakat Mal, Akikah & Kurban, Sejarah Bani Umayyah, Abbasiyah/Baitul Hikmah, dan Wali Songo.

8. SMA/SMK (Fase E & F - Kelas 10, 11, 12):
   - Kelas 10 (Fase E): Q.S. Al-Maidah: 48 (berlomba dalam kebaikan), Q.S. At-Taubah: 105 (etos kerja), larangan pergaulan bebas (Q.S. Al-Isra: 32), Syu'abul Iman (77 cabang), Al-Kulliyat Al-Khamsah, Asuransi Syariah (Takaful), Perbankan Syariah, Dakwah Walisongo.
   - Kelas 11-12 (Fase F): Berpikir kritis (Q.S. Ali 'Imran: 190-191), etika digital, bahaya miras/narkoba/judi daring, khotbah tablig dakwah, ekonomi syariah kontemporer (pinjaman daring vs akad murabahah/qardhul hasan, mystery box vs akad salam), munakahat, mawaris, peradaban Islam modern.

===================================================================
PILAR 2: POLA KONSTRUKSI SOAL & GAYA BAHASA ALA KKG PAI (STRICT FEW-SHOT EXAMPLES)
===================================================================
Hentikan kebiasaan membuat narasi cerita panjang di setiap nomor soal! Ikuti proporsi nyata dokumen ujian KKG PAI:

1. SOAL PILIHAN GANDA (BAGIAN I):
   Kombinasikan secara proporsional antara:
   a) Pertanyaan Langsung (Direct Question):
      - "Rukun iman ada ...."
      - "Wahyu pertama yang diterima Nabi Muhammad saw. adalah surah ...."
      - "Kata Al-'Alaq secara bahasa artinya ...."
      - "Puasa menurut bahasa artinya ...."
      - "Dalam ilmu fikih jika ada perempuan yang sudah haid disebut balig, balig menurut bahasa artinya ...."
      - "Siapakah nama putri Abu Bakar Ash-Shiddiq yang mendapat gelar Zat an-Nitaqain saat peristiwa hijrah ....?"
      - "Kehalalan suatu produk di Indonesia ditetapkan oleh ...."
      - "Berikut ini termasuk definisi maaf menurut Kamus Besar Bahasa Indonesia adalah ...."
   b) Potongan Ayat / Lafal Arab Berharakat Lengkap & Terjemah:
      - Menampilkan teks Arab berharakat: "فَوَيْلٌ لِّلْمُصَلِّينَ" -> "Bacaan di atas adalah Surah Al-Ma'un ayat ke ...."
      - "Lafal لِتَعَارَفُوا bacaannya adalah ...."
      - "Arti kata الْيَتِيمَ dalam Surah Al-Ma'un adalah ...."
   c) Daftar Pernyataan Berangka (1-4) & Tabel Pasangan:
      - "Perhatikan pernyataan berikut! (1) Salat, (2) Tawaf, (3) Berdiam diri di masjid, (4) Membaca Al-Qur'an. Dari uraian di atas termasuk ... orang yang berhadas besar."
      - "Perhatikan tabel berikut! Pasangan Asmaul Husna dan artinya yang tepat terdapat pada ...."
   d) Ilustrasi / Kasus Singkat (2-3 kalimat saja, hanya untuk L2/L3):
      - "Ketika musim kemarau rumput menjadi kering dan mati, setelah turun hujan rumput yang telah mati hidup kembali. Pernyataan di atas menunjukkan sifat Allah ...." (Al-Muhyi)
      - "Sebuah restoran membeli daging sapi yang mati tertabrak truk. Daging tersebut tetap haram karena ...." (zat asalnya bangkai)
      - "Seorang anak membeli kupon undian Rp2.000 berhadiah buku. Kupon tersebut haram karena ...." (perjudian/maisir)

2. SOAL ISIAN SINGKAT (BAGIAN II):
   - DILARANG menggunakan cerita pengantar panjang untuk soal Isian Singkat!
   - Gunakan kalimat pernyataan langsung yang diakhiri titik-titik (....):
     * "Al-'Alaq artinya ...."
     * "Nabi yang menerima wahyu Al-Qur'an bernama ...."
     * "Asmaul Husna Al-Wahhab artinya ...."
     * "Sifat Allah SWT terbagi 3 yaitu Wajib, Mustahil, dan ...."
     * "Secara bahasa hijrah artinya ...."
     * "Orang yang mengumandangkan azan disebut ...."
     * "Balig secara bahasa berarti ...."
     * "Sahabat Nabi yang terkenal dengan sebutan Al-Faruq bernama ...."
     * "Salat sunah yang dilakukan sebelum salat fardu disebut ...."
     * "Kewajiban zakat fitrah dikeluarkan berupa beras untuk setiap satu jiwa sebanyak ...."
     * "Hari dikumpulkannya semua manusia di padang yang luas pada hari kiamat disebut ...."

3. SOAL URAIAN / ESSAY (BAGIAN III):
   - Gunakan kalimat tanya instruksional yang lugas dan jelas:
     * "Tuliskan 2 sebab hijrah Nabi Muhammad saw. ke Madinah!"
     * "Sebutkan 3 contoh kewajiban setelah memasuki usia balig!"
     * "Sebutkan 3 larangan bagi orang yang sedang berhadas besar!"
     * "Sebutkan 3 ciri-ciri orang yang mendustakan agama menurut Surah Al-Ma'un!"
     * "Sebutkan 3 sikap meneladani Asmaul Husna Al-Qayyum!"
     * "Jelaskan perbedaan antara Salat Dhuha dan Salat Tahajjud!"
     * "Jelaskan apa yang dimaksud dengan Ukhuwah Islamiyah, Ukhuwah Wathaniyah, dan Ukhuwah Basyariyah!"
     * "Hitunglah jumlah beras zakat fitrah yang wajib dikeluarkan satu keluarga terdiri dari 5 jiwa (5 × 2,5 kg) dan sebutkan 2 mustahik utamanya!"

4. ATURAN OPSI PER KELAS:
   - Kelas 1 SD: 3 opsi (a, b, c).
   - Kelas 2 SD: 3 opsi (a, b, c) atau 4 opsi pendek.
   - Kelas 3–6 SD & SMP: 4 opsi (a, b, c, d).
   - Kelas 10–12 SMA/SMK: 5 opsi (a, b, c, d, e).

5. FORMAT TABEL KISI-KISI:
   - Kolom: No | Elemen | Capaian / Tujuan Pembelajaran (CP 020/2026) | Kelas/Smt | Materi Pokok | Level Kognitif | Indikator Soal | No. Soal
   - Setiap baris WAJIB memiliki Tujuan Pembelajaran (TP) dan Indikator Soal spesifik 1-ke-1 sesuai nomor butir soal tersebut (JANGAN mengulang TP yang sama untuk semua baris!).
   - Di bagian bawah Kisi-Kisi, sertakan sub-tabel "Pemetaan Soal Uraian / Essay" (No, Tujuan Pembelajaran, Kelas/Semester, Konten Materi).`;

export const ASSESSMENT_PACKAGE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    judulAsesmen: { type: Type.STRING },
    createdAt: { type: Type.STRING },
    identitas: {
      type: Type.OBJECT,
      properties: {
        satuanPendidikan: { type: Type.STRING },
        mataPelajaran: { type: Type.STRING },
        jenjangKelasFase: { type: Type.STRING },
        jenisAsesmen: { type: Type.STRING },
        alokasiWaktu: { type: Type.STRING },
        kurikulumAcuan: { type: Type.STRING },
        insersiModerasi: { type: Type.STRING },
      },
      required: [
        'satuanPendidikan',
        'mataPelajaran',
        'jenjangKelasFase',
        'jenisAsesmen',
        'alokasiWaktu',
        'kurikulumAcuan',
        'insersiModerasi',
      ],
    },
    kisiKisi: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          no: { type: Type.INTEGER },
          elemen: { type: Type.STRING },
          capaianTujuanPembelajaran: { type: Type.STRING },
          kelasSmt: { type: Type.STRING },
          materiPokok: { type: Type.STRING },
          indikatorSoalABCD: { type: Type.STRING },
          levelKognitif: { type: Type.STRING },
          levelCode: { type: Type.STRING },
          bentukSoal: { type: Type.STRING },
          nomorSoal: { type: Type.STRING },
        },
        required: [
          'no',
          'elemen',
          'capaianTujuanPembelajaran',
          'kelasSmt',
          'materiPokok',
          'indikatorSoalABCD',
          'levelKognitif',
          'levelCode',
          'bentukSoal',
          'nomorSoal',
        ],
      },
    },
    pemetaanUraian: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          no: { type: Type.INTEGER },
          tujuanPembelajaran: { type: Type.STRING },
          kelasSemester: { type: Type.STRING },
          kontenMateri: { type: Type.STRING },
        },
        required: ['no', 'tujuanPembelajaran', 'kelasSemester', 'kontenMateri'],
      },
    },
    butirSoal: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          nomor: { type: Type.INTEGER },
          blueprintNo: { type: Type.INTEGER },
          elemen: { type: Type.STRING },
          materiPokok: { type: Type.STRING },
          stimulusModel: { type: Type.STRING },
          bentukSoal: { type: Type.STRING },
          levelCode: { type: Type.STRING },
          taksonomiBloom: { type: Type.STRING },
          indikatorRef: { type: Type.STRING },
          stimulus: { type: Type.STRING },
          instruksiKhusus: { type: Type.STRING },
          pertanyaan: { type: Type.STRING },
          opsi: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                teks: { type: Type.STRING },
              },
              required: ['label', 'teks'],
            },
          },
          kunciJawaban: { type: Type.STRING },
          pembahasanSingkat: { type: Type.STRING },
          dalilAtauKonsep: { type: Type.STRING },
          nilaiModerasi: { type: Type.STRING },
        },
        required: [
          'nomor',
          'blueprintNo',
          'elemen',
          'bentukSoal',
          'levelCode',
          'taksonomiBloom',
          'indikatorRef',
          'pertanyaan',
          'kunciJawaban',
          'pembahasanSingkat',
          'dalilAtauKonsep',
          'nilaiModerasi',
        ],
      },
    },
    pedomanPenskoran: {
      type: Type.OBJECT,
      properties: {
        bobotPerBentuk: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              bentuk: { type: Type.STRING },
              jumlahSoal: { type: Type.INTEGER },
              skorPerSoal: { type: Type.NUMBER },
              skorTotal: { type: Type.NUMBER },
            },
            required: ['bentuk', 'jumlahSoal', 'skorPerSoal', 'skorTotal'],
          },
        },
        rumusNilaiAkhir: { type: Type.STRING },
        rubrikAnalitik: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              nomorSoal: { type: Type.INTEGER },
              bentukSoal: { type: Type.STRING },
              aspekPenilaian: { type: Type.STRING },
              skorMaksimal: { type: Type.INTEGER },
              kriteriaSkor: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skor: { type: Type.INTEGER },
                    deskripsi: { type: Type.STRING },
                  },
                  required: ['skor', 'deskripsi'],
                },
              },
            },
            required: [
              'nomorSoal',
              'bentukSoal',
              'aspekPenilaian',
              'skorMaksimal',
              'kriteriaSkor',
            ],
          },
        },
      },
      required: ['bobotPerBentuk', 'rumusNilaiAkhir', 'rubrikAnalitik'],
    },
  },
  required: [
    'id',
    'judulAsesmen',
    'createdAt',
    'identitas',
    'kisiKisi',
    'butirSoal',
    'pedomanPenskoran',
  ],
};

function sanitizeMuridTerms(text: string | undefined): string {
  if (!text) return '';
  return text
    .replace(/peserta\s+didik/gi, 'murid')
    .replace(/\bsiswa-siswi\b/gi, 'murid-murid')
    .replace(/\bsiswa\b/gi, 'murid')
    .replace(/Saat akhir pekan di lingkungan rumah,\s*[A-Za-z]+\s+mengalami peristiwa serupa:\s*/gi, '');
}

/**
 * Normalizes and completes an AI-generated package so valid Gemini responses are preserved
 * without discarding them over minor schema variations.
 */
export function normalizeGeneratedPackage(
  rawPkg: Partial<AssessmentPackage>,
  parameters: AssessmentParameters
): AssessmentPackage {
  const fallback = buildCustomFallbackPackage(parameters);
  const profile = getFaseProfile(parameters.fase);

  const rawSoal = Array.isArray(rawPkg.butirSoal) ? rawPkg.butirSoal : [];
  const rawKisi = Array.isArray(rawPkg.kisiKisi) ? rawPkg.kisiKisi : [];

  if (rawSoal.length === 0) {
    return fallback;
  }

  const normalizedSoal: QuestionItem[] = rawSoal.map((item, idx) => {
    const num = idx + 1;
    const fbItem = fallback.butirSoal[idx % fallback.butirSoal.length];
    return {
      ...fbItem,
      ...item,
      nomor: num,
      blueprintNo: num,
      elemen: (item.elemen as QuestionItem['elemen']) || fbItem.elemen,
      materiPokok: sanitizeMuridTerms(item.materiPokok || fbItem.materiPokok),
      bentukSoal: (item.bentukSoal as QuestionItem['bentukSoal']) || fbItem.bentukSoal,
      stimulus: sanitizeMuridTerms(item.stimulus ?? fbItem.stimulus),
      instruksiKhusus: item.instruksiKhusus ? sanitizeMuridTerms(item.instruksiKhusus) : undefined,
      pertanyaan: sanitizeMuridTerms(item.pertanyaan || fbItem.pertanyaan),
      indikatorRef: sanitizeMuridTerms(item.indikatorRef || fbItem.indikatorRef),
      opsi:
        Array.isArray(item.opsi) && item.opsi.length > 0
          ? item.opsi.map((o) => ({
              label: o.label,
              teks: sanitizeMuridTerms(o.teks),
            }))
          : item.bentukSoal === 'Pilihan Ganda' || item.bentukSoal === 'Pilihan Ganda Kompleks'
          ? fbItem.opsi
          : undefined,
      kunciJawaban: sanitizeMuridTerms(item.kunciJawaban || fbItem.kunciJawaban),
      pembahasanSingkat: sanitizeMuridTerms(item.pembahasanSingkat || fbItem.pembahasanSingkat),
      dalilAtauKonsep: sanitizeMuridTerms(item.dalilAtauKonsep || fbItem.dalilAtauKonsep),
      nilaiModerasi: sanitizeMuridTerms(item.nilaiModerasi || parameters.nilaiModerasiFokus),
    };
  });

  const normalizedKisi: BlueprintRow[] = normalizedSoal.map((soal, idx) => {
    const existingRow = rawKisi[idx];
    const fbRow = fallback.kisiKisi[idx % fallback.kisiKisi.length];
    return {
      no: idx + 1,
      elemen: soal.elemen,
      capaianTujuanPembelajaran: sanitizeMuridTerms(
        existingRow?.capaianTujuanPembelajaran || fbRow.capaianTujuanPembelajaran
      ),
      kelasSmt: existingRow?.kelasSmt || fbRow.kelasSmt || profile.defaultSemester,
      materiPokok: sanitizeMuridTerms(
        existingRow?.materiPokok || soal.materiPokok || fbRow.materiPokok
      ),
      indikatorSoalABCD: sanitizeMuridTerms(
        existingRow?.indikatorSoalABCD || soal.indikatorRef || fbRow.indikatorSoalABCD
      ),
      levelKognitif: existingRow?.levelKognitif || `${soal.levelCode} (${soal.taksonomiBloom})`,
      levelCode: soal.levelCode || fbRow.levelCode,
      bentukSoal: soal.bentukSoal,
      nomorSoal: String(idx + 1),
    };
  });

  const uraianSoalList = normalizedSoal.filter((s) => s.bentukSoal === 'Uraian');
  const normalizedPemetaanUraian: PemetaanUraianRow[] =
    Array.isArray(rawPkg.pemetaanUraian) && rawPkg.pemetaanUraian.length > 0
      ? rawPkg.pemetaanUraian.map((p, idx) => ({
          no: idx + 1,
          tujuanPembelajaran: sanitizeMuridTerms(p.tujuanPembelajaran),
          kelasSemester: p.kelasSemester || profile.defaultSemester,
          kontenMateri: sanitizeMuridTerms(p.kontenMateri),
        }))
      : uraianSoalList.map((u, idx) => {
          const correspondingKisi =
            normalizedKisi.find((k) => String(k.no) === String(u.nomor)) || normalizedKisi[idx];
          return {
            no: idx + 1,
            tujuanPembelajaran:
              correspondingKisi?.capaianTujuanPembelajaran ||
              `Memahami dan menjelaskan konsep ${u.elemen} secara tepat`,
            kelasSemester: correspondingKisi?.kelasSmt || profile.defaultSemester,
            kontenMateri: u.materiPokok || correspondingKisi?.materiPokok || u.elemen,
          };
        });

  return {
    id: rawPkg.id || `pai-ai-${Date.now()}`,
    judulAsesmen: sanitizeMuridTerms(rawPkg.judulAsesmen || fallback.judulAsesmen),
    createdAt: new Date().toISOString().split('T')[0],
    parameters,
    identitas: {
      ...fallback.identitas,
      ...(rawPkg.identitas || {}),
      satuanPendidikan: sanitizeMuridTerms(
        rawPkg.identitas?.satuanPendidikan || fallback.identitas.satuanPendidikan
      ),
    },
    kisiKisi: normalizedKisi,
    pemetaanUraian: normalizedPemetaanUraian,
    butirSoal: normalizedSoal,
    pedomanPenskoran:
      rawPkg.pedomanPenskoran &&
      Array.isArray(rawPkg.pedomanPenskoran.bobotPerBentuk) &&
      rawPkg.pedomanPenskoran.bobotPerBentuk.length > 0
        ? rawPkg.pedomanPenskoran
        : fallback.pedomanPenskoran,
  };
}

export async function generateAssessmentWithGemini(
  parameters: AssessmentParameters,
  apiKeyOverride?: string
): Promise<{ package: AssessmentPackage; source: 'gemini-ai' | 'deterministic-engine'; modelUsed?: string }> {
  const profile = getFaseProfile(parameters.fase);
  const activeForms = parameters.bentukSoalCounts.filter((b) => b.jumlah > 0);
  const totalQuestions = activeForms.reduce((acc, b) => acc + b.jumlah, 0);
  const diffAlloc = calculateDifficultyAllocation(totalQuestions, parameters.komposisiKesulitan);

  const apiKey = apiKeyOverride?.trim() || process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return {
      package: buildCustomFallbackPackage(parameters),
      source: 'deterministic-engine',
    };
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
  });

  const prompt = `Susunlah Paket Instrumen Asesmen PAIBP Lengkap Standar KKG PAI & CP 020/2026 untuk:
- Fase & Jenjang: ${parameters.fase} — ${parameters.kelas} (${parameters.jenjang})
- Karakteristik Usia & Gaya Soal: ${profile.karakteristik}
- Aturan Opsi Jawaban: Wajib tepat ${profile.optionCount} opsi (${profile.optionLabels.join(', ')})
- Elemen PAIBP: ${parameters.elemen.join(', ')}
- Jenis Asesmen: ${parameters.jenisUjian}
- Topik / Materi Spesifik: ${parameters.topikMateri}
- Capaian Pembelajaran / TP Acuan: ${parameters.capaianPembelajaranOpsional || 'CP 020 Tahun 2026'}
- Fokus Nilai Moderasi: ${parameters.nilaiModerasiFokus}
- Rincian Bentuk & Jumlah Soal (Total ${totalQuestions} butir):
${activeForms.map((f) => `  * ${f.bentuk}: ${f.jumlah} butir`).join('\n')}
- Alokasi Level Kognitif:
  * L1 (Mudah): ${diffAlloc.countL1} soal
  * L2 (Sedang): ${diffAlloc.countL2} soal
  * L3 (HOTS): ${diffAlloc.countL3} soal
  * Urutan Level per Nomor: ${diffAlloc.sequence.map((lvl, idx) => `No.${idx + 1}=${lvl}`).join(', ')}

ATURAN STRUKTUR & GAYA PENULISAN SOAL STANDAR KKG PAI (WAJIB DIPATUHI 100%):
1. SOAL PILIHAN GANDA (BAGIAN I):
   - Gunakan pertanyaan langsung (direct question) yang padat, jelas, dan tidak bertele-tele (misal: "Rukun iman ada ....", "Kata Al-'Alaq secara bahasa artinya ....", "Dalam ilmu fikih jika ada perempuan yang sudah haid disebut balig, balig menurut bahasa artinya ....", "Kehalalan suatu produk di Indonesia ditetapkan oleh ....").
   - Potongan ayat berharakat lengkap pada baris tersendiri jika ada materi Al-Qur'an.
   - Minimal 1 nomor menggunakan stimulus tabel pasangan atau pernyataan berangka (1, 2, 3, 4).
   - Cerita kasus kontekstual hanya 2–3 kalimat pendek untuk soal L2/L3 (misal rumput kering hidup lagi saat hujan, daging tertabrak haram zat asalnya bangkai, kupon undian judi).
2. SOAL ISIAN SINGKAT (BAGIAN II):
   - DILARANG menggunakan cerita pengantar panjang!
   - Wajib berupa kalimat pernyataan langsung diakhiri titik-titik (....) dengan jawaban ringkas 1–3 kata (misal: "Secara bahasa hijrah artinya ....", "Asmaul Husna Al-Wahhab artinya ....", "Sahabat Nabi yang terkenal dengan sebutan Al-Faruq bernama ....").
3. SOAL URAIAN / ESSAY (BAGIAN III):
   - Wajib berupa kalimat tanya instruksional lugas (misal: "Tuliskan 2 sebab hijrah Nabi Muhammad saw.!", "Sebutkan 3 contoh kewajiban setelah usia balig!", "Sebutkan 3 ciri-ciri orang yang mendustakan agama menurut Surah Al-Ma'un!", "Jelaskan perbedaan antara Salat Dhuha dan Salat Tahajjud!").
4. KISI-KISI PENULISAN SOAL:
   - Setiap baris memiliki Tujuan Pembelajaran (TP) dan Indikator Soal yang spesifik 1-ke-1 sesuai butir soal nomor tersebut (JANGAN mengulang teks TP yang sama di semua baris!).
   - Sertakan tabel pemetaanUraian untuk seluruh butir soal Uraian.
5. Gunakan selalu istilah "murid" (bukan "peserta didik" atau "siswa").`;

  const candidateModels = ['gemini-2.5-flash', 'gemini-3.8-flash'];

  for (const modelName of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: ASSESSMENT_PACKAGE_SCHEMA,
          temperature: 0.35,
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text) as Partial<AssessmentPackage>;
        const normalized = normalizeGeneratedPackage(parsed, parameters);
        return {
          package: normalized,
          source: 'gemini-ai',
          modelUsed: modelName,
        };
      }
    } catch (err) {
      console.warn(`[Smart PAI Assessor] Model ${modelName} attempt warning:`, err);
    }
  }

  return {
    package: buildCustomFallbackPackage(parameters),
    source: 'deterministic-engine',
  };
}
