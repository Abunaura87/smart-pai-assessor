import {
  AnalyticRubricRow,
  AssessmentPackage,
  AssessmentParameters,
  BlueprintRow,
  ElemenPAI,
  PemetaanUraianRow,
  QuestionItem,
} from '../types/assessment';
import { calculateDifficultyAllocation, formatKelasSemester, getFaseProfile } from '../utils/paiRules';
import { selectDistinctNarrativeSeed, selectQuestionSeed } from './narrativeBank';
import { getChapterTopicsForClassSemester, isPaketGabunganTopic } from './curriculumData';

const BASE_PRESET_PACKAGES: AssessmentPackage[] = [
  {
    id: 'preset-fase-d-smp',
    judulAsesmen: 'Instrumen Asesmen Sumatif PAIBP — Akhlak Bermedia Sosial, Tabayyun & Anti-Perundungan',
    createdAt: '2026-11-02',
    parameters: {
      fase: 'Fase D',
      kelas: 'Kelas 8 SMP/MTs',
      semester: 'Genap',
      jenjang: 'SMP/MTs',
      elemen: ['Al-Qur\'an dan Hadis', 'Akhlak', 'Fikih'],
      jenisUjian: 'Sumatif Akhir Semester (SAS)',
      topikMateri: 'Adab Bermedia Sosial (Tabayyun Q.S. Al-Hujurat: 6), Pencegahan Perundungan (Bullying), dan Toleransi',
      capaianPembelajaranOpsional:
        'Murid memahami makna Q.S. Al-Hujurat/49: 6 dan 12 tentang tabayyun serta menghindari ghibah, menerapkan etika komunikasi digital, dan menolak perilaku perundungan di sekolah maupun ruang siber.',
      nilaiModerasiFokus: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
      bentukSoalCounts: [
        { bentuk: 'Pilihan Ganda', jumlah: 3 },
        { bentuk: 'Pilihan Ganda Kompleks', jumlah: 1 },
        { bentuk: 'Benar/Salah', jumlah: 1 },
        { bentuk: 'Uraian', jumlah: 1 },
      ],
      komposisiKesulitan: {
        mudahL1: 25,
        sedangL2: 45,
        hotsL3: 30,
      },
    },
    identitas: {
      satuanPendidikan: 'SMP / MTs (Kurikulum Merdeka)',
      mataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti (PAIBP)',
      jenjangKelasFase: 'SMP/MTs — Kelas 8 (Fase D)',
      jenisAsesmen: 'Sumatif Akhir Semester (SAS)',
      alokasiWaktu: '60 Menit',
      kurikulumAcuan: 'Kurikulum Merdeka (Kemendikbudristek & Kemenag RI) + Standar AKM',
      insersiModerasi: 'Ishlah (Perdamaian & Anti-Perundungan), Tasamuh (Toleransi), dan Tabayyun Digital',
    },
    kisiKisi: [
      {
        no: 1,
        elemen: 'Al-Qur\'an dan Hadis',
        capaianTujuanPembelajaran:
          'Memahami kandungan Q.S. Al-Hujurat/49: 6 tentang kewajiban tabayyun (klarifikasi berita) dalam menerima informasi.',
        indikatorSoalABCD:
          'Disajikan kutipan terjemah Q.S. Al-Hujurat/49: 6 dan ilustrasi pesan berantai di grup percakapan kelas (Condition), murid (Audience) dapat mengidentifikasi arti sikap tabayyun secara tepat (Behavior & Degree).',
        levelKognitif: 'L1 (C2 - Memahami)',
        levelCode: 'L1',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '1',
      },
      {
        no: 2,
        elemen: 'Akhlak',
        capaianTujuanPembelajaran:
          'Menerapkan adab berkomunikasi di media sosial serta menghindari ghibah, fitnah, dan perundungan siber (cyberbullying).',
        indikatorSoalABCD:
          'Disajikan narasi kasus seorang murid yang menerima foto editan temannya di grup kelas (Condition), murid (Audience) dapat menentukan tindakan yang mencerminkan akhlak karimah dan pencegahan perundungan dengan tepat (Behavior & Degree).',
        levelKognitif: 'L2 (C3 - Menerapkan)',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L2',
        nomorSoal: '2',
      },
      {
        no: 3,
        elemen: 'Fikih',
        capaianTujuanPembelajaran:
          'Menganalisis hukum menyebarkan berita bohong (hoaks) dan ujaran kebencian ditinjau dari prinsip penjagaan kehormatan diri (hifzh al-\'irdh).',
        indikatorSoalABCD:
          'Disajikan studi kasus dampak psikologis dan sosial akibat penyebaran fitnah di media sosial sekolah (Condition), murid (Audience) dapat menganalisis keterkaitan larangan ghibah/fitnah dengan tujuan syariat menjaga kehormatan manusia secara kritis (Behavior & Degree).',
        levelKognitif: 'L3 (C4 - Menganalisis / HOTS)',
        levelCode: 'L3',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '3',
      },
      {
        no: 4,
        elemen: 'Akhlak',
        capaianTujuanPembelajaran:
          'Menganalisis bentuk-bentuk tindakan literasi digital Islami dalam menjaga persaudaraan (ukhuwah) di sekolah.',
        indikatorSoalABCD:
          'Disajikan infografis tekstual tentang fenomena komentar negatif di akun media sosial ekstrakurikuler (Condition), murid (Audience) dapat memilih dua langkah solutif yang sesuai dengan prinsip moderasi beragama (islar & tasamuh) secara akurat (Behavior & Degree).',
        levelKognitif: 'L3 (C4 - Menganalisis / AKM)',
        levelCode: 'L3',
        bentukSoal: 'Pilihan Ganda Kompleks',
        nomorSoal: '4',
      },
      {
        no: 5,
        elemen: 'Al-Qur\'an dan Hadis',
        capaianTujuanPembelajaran:
          'Mengevaluasi perilaku sehari-hari berdasarkan kandungan Q.S. Al-Hujurat/49: 11–12 tentang larangan mengolok-olok dan berprasangka buruk.',
        indikatorSoalABCD:
          'Disajikan tiga pernyataan kasus interaksi antarmurid di lingkungan sekolah (Condition), murid (Audience) dapat menilai kebenaran setiap pernyataan berdasarkan adab pergaulan Islam dalam Q.S. Al-Hujurat/49: 11–12 secara tepat (Behavior & Degree).',
        levelKognitif: 'L2 (C3 - Menerapkan / AKM)',
        levelCode: 'L2',
        bentukSoal: 'Benar/Salah',
        nomorSoal: '5',
      },
      {
        no: 6,
        elemen: 'Akhlak',
        capaianTujuanPembelajaran:
          'Merumuskan solusi konkret berbasis nilai Islam dan moderasi beragama untuk mengatasi kasus perundungan (bullying) di sekolah.',
        indikatorSoalABCD:
          'Disajikan kasus dilema moral tentang seorang murid baru yang dikucilkan karena perbedaan logat daerah di kelas (Condition), murid (Audience) dapat merumuskan tiga langkah penyelesaian berbasis nilai tasamuh dan ukhuwah beserta landasan dalilnya secara sistematis (Behavior & Degree).',
        levelKognitif: 'L3 (C5 - Mengevaluasi / HOTS)',
        levelCode: 'L3',
        bentukSoal: 'Uraian',
        nomorSoal: '6',
      },
    ],
    butirSoal: [
      {
        nomor: 1,
        blueprintNo: 1,
        elemen: 'Al-Qur\'an dan Hadis',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L1',
        taksonomiBloom: 'C2 (Memahami)',
        indikatorRef: 'Mengidentifikasi sikap tabayyun saat menerima kabar bohong di grup kelas.',
        stimulus:
          'Perhatikan potongan Q.S. Al-Hujurat/49: 6 berikut!\nيَا أَيُّهَا الَّذِينَ آمَنُوا إِنْ جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَنْ تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَىٰ مَا فَعَلْتُمْ نَادِمِينَ\nSebuah pesan berantai yang menjelek-jelekkan salah satu teman kelas tersebar di grup chat. Fikri membaca pesan itu dan tahu bahwa kabar tersebut bohong.',
        pertanyaan:
          'Berdasarkan ayat di atas, tindakan paling tepat yang harus dilakukan Fikri setelah membaca pesan tersebut adalah ....',
        opsi: [
          {
            label: 'A',
            teks: 'Meneruskan pesan itu ke grup lain agar teman-teman lebih cepat tahu',
          },
          {
            label: 'B',
            teks: 'Menghentikan penyebaran pesan tersebut dan menyampaikan kebenarannya secara santun',
          },
          {
            label: 'C',
            teks: 'Menambahkan komentar lelucon agar suasana obrolan grup kelas semakin ramai',
          },
          {
            label: 'D',
            teks: 'Menyimpan tangkapan layar pesan itu untuk dijadikan sindiran di status pribadi',
          },
        ],
        kunciJawaban: 'B',
        pembahasanSingkat:
          'Perintah "fatabayyanu" dalam Q.S. Al-Hujurat/49: 6 menuntun murid untuk tidak ikut menyebarkan berita bohong (hoaks) serta meluruskan informasi secara santun agar tidak mencelakakan teman.',
        dalilAtauKonsep: 'Q.S. Al-Hujurat/49: 6 — Konsep Tabayyun (Verifikasi Informasi)',
        nilaiModerasi: 'I\'tidal (Berlaku Adil & Objektif dalam Informasi)',
      },
      {
        nomor: 2,
        blueprintNo: 2,
        elemen: 'Akhlak',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L2',
        taksonomiBloom: 'C3 (Menerapkan)',
        indikatorRef: 'Menentukan tindakan pencegahan perundungan siber (cyberbullying) di grup kelas.',
        stimulus:
          'Saat jam istirahat, Raka melihat beberapa teman di grup WhatsApp kelas membagikan foto wajah Andi yang telah diedit menjadi stiker lelucon tanpa izin. Andi tampak murung dan memilih duduk menyendiri di pojok kelas karena merasa dipermalukan.',
        pertanyaan:
          'Sikap paling tepat yang harus ditunjukkan Raka sebagai wujud pengamalan akhlak mahmudah dan pencegahan perundungan adalah ....',
        opsi: [
          {
            label: 'A',
            teks: 'Menegur teman secara santun agar menghapus stiker tersebut serta mendampingi Andi',
          },
          {
            label: 'B',
            teks: 'Membiarkan percakapan grup berlangsung karena menganggap hal itu sekadar candaan biasa',
          },
          {
            label: 'C',
            teks: 'Membuat stiker balasan menggunakan foto teman yang memulai candaan agar impas',
          },
          {
            label: 'D',
            teks: 'Keluar dari grup kelas tanpa berkata apa-apa agar tidak ikut disalahkan oleh wali kelas',
          },
        ],
        kunciJawaban: 'A',
        pembahasanSingkat:
          'Dalam Islam, mencegah kemungkaran (termasuk perundungan/istihza\') dilakukan dengan cara yang makruf: mengingatkan teman secara santun untuk menghentikan perbuatan menyakiti hati sesama serta menghibur korban agar tidak merasa terasing.',
        dalilAtauKonsep: 'Q.S. Al-Hujurat/49: 11 (Larangan mengolok-olok) & Hadis mengubah kemungkaran',
        nilaiModerasi: 'Ishlah (Perdamaian & Anti-Perundungan)',
      },
      {
        nomor: 3,
        blueprintNo: 3,
        elemen: 'Fikih',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L3',
        taksonomiBloom: 'C4 (Menganalisis)',
        indikatorRef: 'Menganalisis kaitan larangan fitnah/ghibah dengan prinsip hifzh al-\'irdh (menjaga kehormatan).',
        stimulus:
          'Sebuah akun anonim di media sosial mengunggah tuduhan tanpa bukti bahwa pengurus OSIS menyelewengkan dana kegiatan bakti sosial. Akibat unggahan tersebut, kepercayaan warga sekolah menurun drastis dan para pengurus OSIS mengalami tekanan mental meskipun audit guru pembina membuktikan dana dikelola secara jujur dan transparan.',
        pertanyaan:
          'Berdasarkan prinsip hukum Islam, alasan utama perbuatan pemilik akun anonim tersebut dikategorikan sebagai dosa besar yang merusak tatanan sosial adalah ....',
        opsi: [
          {
            label: 'A',
            teks: 'Menghambat kelancaran administrasi pelaporan keuangan kegiatan ekstrakurikuler di sekolah',
          },
          {
            label: 'B',
            teks: 'Meruntuhkan kehormatan martabat sesama muslim (hifzh al-\'irdh) melalui fitnah yang memecah ukhuwah',
          },
          {
            label: 'C',
            teks: 'Mengurangi jumlah pengikut dan interaksi positif pada akun resmi media sosial milik sekolah',
          },
          {
            label: 'D',
            teks: 'Menyebabkan guru pembina harus mengadakan rapat evaluasi tambahan di luar jam pelajaran',
          },
        ],
        kunciJawaban: 'B',
        pembahasanSingkat:
          'Menuduh orang lain tanpa bukti adalah fitnah (buhtan). Dalam maqashid syariah, menjaga kehormatan diri dan martabat sesama manusia (hifzh al-\'irdh) merupakan hak dasar yang wajib dilindungi; merusaknya dengan fitnah di ruang publik menghancurkan kepercayaan sosial dan ukhuwah.',
        dalilAtauKonsep: 'Q.S. Al-Hujurat/49: 12 & Maqashid Syariah (Hifzh al-\'Irdh)',
        nilaiModerasi: 'I\'tidal & Menjaga Martabat Kemanusiaan',
      },
      {
        nomor: 4,
        blueprintNo: 4,
        elemen: 'Akhlak',
        bentukSoal: 'Pilihan Ganda Kompleks',
        levelCode: 'L3',
        taksonomiBloom: 'C4 (Menganalisis)',
        indikatorRef: 'Memilih dua langkah literasi digital Islami dalam merespons perbedaan pendapat di media sosial.',
        stimulus:
          'Menjelang pemilihan ketua panitia peringatan hari besar Islam di sekolah, kolom komentar media sosial OSIS dipenuhi perdebatan tajam antarpendukung kandidat. Sebagian komentar mulai menyinggung latar belakang organisasi keagamaan keluarga masing-masing kandidat.',
        instruksiKhusus: 'Pilihlah dua jawaban yang benar!',
        pertanyaan:
          'Manakah dua langkah yang paling tepat dilakukan oleh pengurus OSIS dan murid untuk menjaga kemaslahatan serta menerapkan nilai moderasi beragama pada situasi tersebut?',
        opsi: [
          {
            label: 'A',
            teks: 'Menyusun panduan diskusi santun yang fokus pada gagasan program kerja tanpa menyinggung latar belakang kelompok',
          },
          {
            label: 'B',
            teks: 'Membalas komentar yang menyinggung kelompok tertentu dengan serangan balik agar posisi kandidat seimbang',
          },
          {
            label: 'C',
            teks: 'Mengadakan forum musyawarah bersama (syura) antarkandidat untuk memberi teladan persaudaraan di depan murid',
          },
          {
            label: 'D',
            teks: 'Membiarkan perdebatan SARA terus berlangsung demi meningkatkan jumlah tayangan akun media sosial OSIS',
          },
        ],
        kunciJawaban: 'A dan C',
        pembahasanSingkat:
          'Langkah A dan C menerapkan prinsip syura (musyawarah), tasamuh (menghargai perbedaan latar belakang tanpa menjadikannya bahan olok-olok), serta qudwah (keteladanan akhlak di ruang publik). Opsi B dan D justru memperuncing perpecahan.',
        dalilAtauKonsep: 'Q.S. Ali \'Imran/3: 159 (Musyawarah) & Q.S. An-Nahl/16: 125 (Dakwah bil Hikmah)',
        nilaiModerasi: 'Syura (Musyawarah) & Tasamuh (Toleransi)',
      },
      {
        nomor: 5,
        blueprintNo: 5,
        elemen: 'Al-Qur\'an dan Hadis',
        bentukSoal: 'Benar/Salah',
        levelCode: 'L2',
        taksonomiBloom: 'C3 (Menerapkan)',
        indikatorRef: 'Menilai kebenaran pernyataan sikap pergaulan berdasarkan Q.S. Al-Hujurat/49: 11–12.',
        stimulus:
          'Islam mengatur etika pergaulan agar tercipta lingkungan yang aman, damai, dan saling menghormati sebagaimana termaktub dalam Q.S. Al-Hujurat/49: 11–12.',
        instruksiKhusus: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
        pertanyaan:
          'Analisis setiap pernyataan perilaku murid berikut berdasarkan kandungan Q.S. Al-Hujurat/49: 11–12:',
        pernyataanBenarSalah: [
          {
            pernyataan:
              'Memanggil teman dengan julukan fisik yang membuatnya malu diperbolehkan asalkan diniatkan untuk mencairkan suasana kelas.',
            jawaban: 'Salah',
          },
          {
            pernyataan:
              'Menjauhi prasangka buruk (su\'uzhan) dan tidak mencari-cari kesalahan teman (tajassus) merupakan perintah langsung dalam Q.S. Al-Hujurat/49: 12.',
            jawaban: 'Benar',
          },
          {
            pernyataan:
              'Menghargai teman yang berbeda pendapat saat kerja kelompok merupakan wujud nyata menjaga ukhuwah insaniyah dan wathaniyah.',
            jawaban: 'Benar',
          },
        ],
        kunciJawaban: '1: Salah, 2: Benar, 3: Benar',
        pembahasanSingkat:
          'Pernyataan 1 Salah karena Q.S. Al-Hujurat/49: 11 secara tegas melarang memanggil dengan gelar/julukan yang buruk (wala tanabazu bil-alqab) meskipun untuk bercanda jika menyakiti hati. Pernyataan 2 dan 3 Benar sesuai larangan su\'uzhan/tajassus dan perintah menjaga persaudaraan.',
        dalilAtauKonsep: 'Q.S. Al-Hujurat/49: 11–12 (Adab Pergaulan & Persaudaraan)',
        nilaiModerasi: 'Tasamuh & Anti-Perundungan Verbal',
      },
      {
        nomor: 6,
        blueprintNo: 6,
        elemen: 'Akhlak',
        bentukSoal: 'Uraian',
        levelCode: 'L3',
        taksonomiBloom: 'C5 (Mengevaluasi)',
        indikatorRef: 'Merumuskan tiga langkah solutif berbasis nilai tasamuh dan ukhuwah terhadap kasus pengucilan murid baru.',
        stimulus:
          'Di kelas 8 terdapat seorang murid pindahan dari luar pulau yang memiliki logat bicara berbeda. Beberapa murid sering menirukan cara bicaranya sambil tertawa sehingga murid baru tersebut enggan berbicara saat diskusi kelompok dan memilih makan siang sendirian.',
        pertanyaan:
          'Sebagai pengurus kelas yang memahami ajaran akhlak Islam dan moderasi beragama:\na) Jelaskan mengapa perilaku menertawakan logat daerah teman bertentangan dengan Q.S. Al-Hujurat/49: 11 dan 13!\nb) Rumuskan 3 (tiga) langkah konkret yang dapat kamu lakukan bersama teman sekelas untuk membangun kembali suasana inklusif dan persaudaraan di kelas tersebut!',
        kunciJawaban:
          'a) Bertentangan dengan Q.S. Al-Hujurat/49: 11 karena termasuk istihza\' (mengolok-olok kaum lain yang boleh jadi lebih baik di sisi Allah) dan bertentangan dengan Q.S. Al-Hujurat/49: 13 karena keberagaman suku/bahasa diciptakan Allah untuk saling mengenal (lita\'arafu), bukan saling merendahkan.\nb) Tiga langkah konkret: (1) Mengajak teman yang menertawakan untuk berdialog secara santun dan meminta maaf (ishlah); (2) Melibatkan murid baru secara aktif dalam kelompok belajar dan mengenalkan keunikan budaya daerah masing-masing; (3) Menyepakati komitmen kelas ramah keberagaman (anti-bullying) bersama wali kelas.',
        pembahasanSingkat:
          'Jawaban mengintegrasikan pemahaman dalil naqli (Q.S. Al-Hujurat: 11 & 13 tentang larangan olok-olok dan prinsip ta\'aruf dalam keberagaman) dengan tindakan nyata moderasi beragama (tasamuh, ishlah, dan muwathanah).',
        dalilAtauKonsep: 'Q.S. Al-Hujurat/49: 11 & 13 — Prinsip Lita\'arafu & Ukhuwah Wathaniyah',
        nilaiModerasi: 'Tasamuh (Toleransi Keberagaman Budaya) & Ishlah (Perdamaian)',
      },
    ],
    pedomanPenskoran: {
      bobotPerBentuk: [
        { bentuk: 'Pilihan Ganda', jumlahSoal: 3, skorPerSoal: 10, skorTotal: 30 },
        { bentuk: 'Pilihan Ganda Kompleks', jumlahSoal: 1, skorPerSoal: 15, skorTotal: 15 },
        { bentuk: 'Benar/Salah', jumlahSoal: 1, skorPerSoal: 15, skorTotal: 15 },
        { bentuk: 'Uraian', jumlahSoal: 1, skorPerSoal: 40, skorTotal: 40 },
      ],
      rumusNilaiAkhir: 'Nilai Akhir = (Total Skor Perolehan / 100) × 100',
      rubrikAnalitik: [
        {
          nomorSoal: 4,
          bentukSoal: 'Pilihan Ganda Kompleks',
          aspekPenilaian: 'Ketepatan Analisis Dua Solusi Literasi Digital & Moderasi Beragama',
          skorMaksimal: 15,
          kriteriaSkor: [
            { skor: 15, deskripsi: 'Memilih tepat kedua opsi benar (A dan C) tanpa memilih opsi pengecoh.' },
            { skor: 8, deskripsi: 'Memilih satu opsi benar (A atau C) tanpa memilih opsi pengecoh.' },
            { skor: 0, deskripsi: 'Hanya memilih opsi pengecoh atau tidak menjawab.' },
          ],
        },
        {
          nomorSoal: 6,
          bentukSoal: 'Uraian',
          aspekPenilaian: 'Analisis Dalil (Q.S. Al-Hujurat: 11 & 13) serta Rumusan 3 Langkah Solutif Anti-Perundungan',
          skorMaksimal: 4,
          kriteriaSkor: [
            {
              skor: 4,
              deskripsi:
                'Sangat Lengkap: Menjelaskan alasan pelanggaran berdasarkan Q.S. Al-Hujurat: 11 & 13 secara tepat (konsep larangan mengolok-olok & lita\'arafu) SERTA merumuskan 3 langkah konkret yang aplikatif dan berorientasi ishlah/tasamuh.',
            },
            {
              skor: 3,
              deskripsi:
                'Lengkap: Menjelaskan kaitan ayat dengan benar dan merumuskan 2 langkah konkret yang logis dan sesuai prinsip akhlak Islam.',
            },
            {
              skor: 2,
              deskripsi:
                'Cukup: Menjelaskan alasan secara umum tanpa merujuk makna ayat secara spesifik dan hanya menuliskan 1–2 langkah penyelesaian sederhana.',
            },
            {
              skor: 1,
              deskripsi:
                'Kurang: Jawaban masih bersifat normatif singkat, belum mengaitkan dengan dalil maupun langkah konkret.',
            },
            {
              skor: 0,
              deskripsi: 'Tidak menjawab atau jawaban sama sekali tidak relevan dengan permasalahan soal.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'preset-fase-e-sma',
    judulAsesmen: 'Instrumen Asesmen Sumatif PAIBP — Fikih Muamalah Kontemporer, Syu\'abul Iman & Moderasi Beragama',
    createdAt: '2026-11-02',
    parameters: {
      fase: 'Fase E',
      kelas: 'Kelas 10 SMA/MA',
      jenjang: 'SMA/SMK/MA',
      elemen: ['Fikih', 'Akidah', 'Sejarah Peradaban Islam (SPI)'],
      jenisUjian: 'Sumatif Lingkup Materi (TP)',
      topikMateri: 'Prinsip Fikih Muamalah Modern (Transaksi Digital & Riba), Cabang Iman (Syu\'abul Iman), dan Dakwah Damai Wali Songo',
      capaianPembelajaranOpsional:
        'Murid mampu menganalisis implementasi fikih muamalah dan al-kulliyatul khamsah dalam transaksi modern, menghayati syu\'abul iman, serta meneladani strategi dakwah moderat di Nusantara.',
      nilaiModerasiFokus: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
      bentukSoalCounts: [
        { bentuk: 'Pilihan Ganda', jumlah: 3 },
        { bentuk: 'Pilihan Ganda Kompleks', jumlah: 1 },
        { bentuk: 'Uraian', jumlah: 1 },
      ],
      komposisiKesulitan: {
        mudahL1: 20,
        sedangL2: 40,
        hotsL3: 40,
      },
    },
    identitas: {
      satuanPendidikan: 'SMA / SMK / MA (Kurikulum Merdeka)',
      mataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti (PAIBP)',
      jenjangKelasFase: 'SMA/SMK/MA — Kelas 10 (Fase E)',
      jenisAsesmen: 'Sumatif Lingkup Materi (TP)',
      alokasiWaktu: '60 Menit',
      kurikulumAcuan: 'Kurikulum Merdeka Fase E (Dominan HOTS C4–C6 & 5 Opsi A–E)',
      insersiModerasi: 'Tawassuth (Moderat), I\'tidal (Keadilan Ekonomi), dan Penghargaan Budaya Lokal',
    },
    kisiKisi: [
      {
        no: 1,
        elemen: 'Akidah',
        capaianTujuanPembelajaran:
          'Menganalisis makna syu\'abul iman (cabang-cabang iman) dalam dimensi niat/hati, lisan, dan amal perbuatan.',
        indikatorSoalABCD:
          'Disajikan kasus ketidaksinkronan antara unggahan kesalehan di media sosial dengan kejujuran saat ujian sekolah (Condition), murid (Audience) dapat menganalisis integrasi tiga dimensi syu\'abul iman (tasdiq bil qalbi, iqrar bil lisan, \'amal bil arkan) secara tepat (Behavior & Degree).',
        levelKognitif: 'L2 (C4 - Menganalisis)',
        levelCode: 'L2',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '1',
      },
      {
        no: 2,
        elemen: 'Fikih',
        capaianTujuanPembelajaran:
          'Menganalisis prinsip dan praktik asuransi syariah (takaful) serta perbankan syariah berbasis tolong-menolong (ta\'awun) dan bebas riba.',
        indikatorSoalABCD:
          'Disajikan studi kasus prinsip penghimpunan dana asuransi syariah (takaful) berbasis tolong-menolong (Condition), murid (Audience) dapat membedakan akad tabarru\' dari transaksi yang mengandung maisir dan riba secara tepat (Behavior & Degree).',
        levelKognitif: 'L3 (C5 - Mengevaluasi / HOTS)',
        levelCode: 'L3',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '2',
      },
      {
        no: 3,
        elemen: 'Sejarah Peradaban Islam (SPI)',
        capaianTujuanPembelajaran:
          'Menganalisis strategi dakwah damai dan akulturasi budaya Islam di Indonesia sebagai teladan moderasi beragama.',
        indikatorSoalABCD:
          'Disajikan narasi historis metode dakwah Sunan Kudus dan Sunan Kalijaga dalam merangkul masyarakat Nusantara (Condition), murid (Audience) dapat menyimpulkan relevansi pendekatan hikmah tersebut terhadap penguatan toleransi di masyarakat majemuk saat ini (Behavior & Degree).',
        levelKognitif: 'L2 (C4 - Menganalisis)',
        levelCode: 'L2',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '3',
      },
      {
        no: 4,
        elemen: 'Fikih',
        capaianTujuanPembelajaran:
          'Menerapkan ketentuan akad jual beli daring (e-commerce) yang sah dan memenuhi rukun serta syarat muamalah.',
        indikatorSoalABCD:
          'Disajikan wacana transaksi jual beli sistem pre-order dan dropship di lokapasar (marketplace) (Condition), murid (Audience) dapat memilih dua praktik yang sah secara fikih muamalah (akad salam/wakalah) dengan tepat (Behavior & Degree).',
        levelKognitif: 'L3 (C4 - Menganalisis / AKM)',
        levelCode: 'L3',
        bentukSoal: 'Pilihan Ganda Kompleks',
        nomorSoal: '4',
      },
      {
        no: 5,
        elemen: 'Fikih',
        capaianTujuanPembelajaran:
          'Merancang solusi keuangan mikro syariah bagi koperasi murid untuk mencegah praktik ribawi dan menjaga hifzh al-mal.',
        indikatorSoalABCD:
          'Disajikan permasalahan koperasi murid yang ingin membantu anggota membeli perlengkapan praktik sekolah tanpa skema bunga (Condition), murid (Audience) dapat merancang skema akad syariah alternatif (murabahah atau qardhul hasan) beserta mekanisme keadilannya secara komprehensif (Behavior & Degree).',
        levelKognitif: 'L3 (C6 - Mencipta / HOTS)',
        levelCode: 'L3',
        bentukSoal: 'Uraian',
        nomorSoal: '5',
      },
    ],
    butirSoal: [
      {
        nomor: 1,
        blueprintNo: 1,
        elemen: 'Akidah',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L2',
        taksonomiBloom: 'C4 (Menganalisis)',
        indikatorRef: 'Menganalisis integrasi tiga dimensi syu\'abul iman dalam kehidupan pelajar.',
        stimulus:
          'Farhan rajin membagikan kutipan nasihat keislaman di akun media sosialnya dan fasih melafalkan dalil tentang kejujuran. Namun, ketika mengikuti asesmen akhir semester, ia masih menyontek melalui gawai pintar saat pengawas lengah.',
        pertanyaan:
          'Apabila dianalisis berdasarkan konsep syu\'abul iman (cabang-cabang keimanan), evaluasi yang paling tepat terhadap kondisi keimanan Farhan adalah ....',
        opsi: [
          {
            label: 'A',
            teks: 'Keimanannya sudah sempurna karena telah melakukan syiar dakwah melalui lisan dan media digital',
          },
          {
            label: 'B',
            teks: 'Cabang iman pada aspek amal perbuatan (\'amal bil arkan) belum selaras dengan pengakuan lisan dan keyakinan hati',
          },
          {
            label: 'C',
            teks: 'Perbuatan menyontek hanya berkaitan dengan tata tertib sekolah sehingga tidak memengaruhi cabang keimanan',
          },
          {
            label: 'D',
            teks: 'Dimensi keyakinan hati (tasdiq bil qalbi) tidak memerlukan pembuktian perilaku nyata dalam situasi darurat ujian',
          },
          {
            label: 'E',
            teks: 'Pengakuan lisan sudah cukup menggugurkan kewajiban menjaga amanah akademik di lingkungan satuan pendidikan',
          },
        ],
        kunciJawaban: 'B',
        pembahasanSingkat:
          'Iman mencakup tiga dimensi utuh: pembenaran di dalam hati (tasdiq bil qalbi), ikrar dengan lisan (iqrar bil lisan), dan pembuktian dengan amal anggota badan (\'amal bil arkan). Ketidakjujuran saat ujian menunjukkan belum terwujudnya cabang iman amanah pada ranah amal perbuatan.',
        dalilAtauKonsep: 'Hadis Syu\'abul Iman (HR. Muslim) & Integrasi Hati, Lisan, dan Amal',
        nilaiModerasi: 'Qudwah (Integritas & Keteladanan Akhlak)',
      },
      {
        nomor: 2,
        blueprintNo: 2,
        elemen: 'Fikih',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L3',
        taksonomiBloom: 'C5 (Mengevaluasi)',
        indikatorRef: 'Mengevaluasi prinsip tolong-menolong akad tabarru\' pada asuransi syariah (takaful) ditinjau dari fikih muamalah.',
        stimulus:
          'Dalam asuransi syariah (takaful), para peserta menyetorkan sejumlah premi yang diniatkan sebagai dana hibah kebajikan untuk saling tolong-menolong (ta\'awun) apabila ada anggota yang tertimpa musibah sakit atau kecelakaan.',
        pertanyaan:
          'Prinsip utama yang membedakan asuransi syariah dari praktik asuransi konvensional yang dilarang adalah penggunaan akad ....',
        opsi: [
          {
            label: 'A',
            teks: 'Tabarru\' (kebajikan saling tolong-menolong) yang terbebas dari unsur maisir, gharar, dan riba',
          },
          {
            label: 'B',
            teks: 'Mudharabah mutlaqah di mana seluruh risiko kerugian hanya ditanggung oleh peserta secara sepihak',
          },
          {
            label: 'C',
            teks: 'Ijarah muntahiya bittamlik yang mewajibkan penyerahan seluruh aset nasabah kepada pihak pengelola',
          },
          {
            label: 'D',
            teks: 'Qardhul hasan dengan kewajiban memberikan tambahan bunga bulanan kepada perusahaan asuransi',
          },
          {
            label: 'E',
            teks: 'Riba nasi\'ah yang memberikan jaminan keuntungan pasti berlipat ganda pada setiap akhir tahun',
          },
        ],
        kunciJawaban: 'A',
        pembahasanSingkat:
          'Asuransi syariah (takaful) berlandaskan akad tabarru\' (hibah/tolong-menolong) dan tijarah (investasi syariah), sehingga terbebas dari praktik perjudian (maisir), ketidakjelasan (gharar), dan bunga (riba) yang terdapat dalam asuransi konvensional.',
        dalilAtauKonsep: 'Q.S. Al-Ma\'idah/5: 2 — Bertolong-menolonglah Kamu dalam Kebaikan dan Takwa',
        nilaiModerasi: 'I\'tidal (Keadilan Sosial-Ekonomi & Saling Menolong)',
      },
      {
        nomor: 3,
        blueprintNo: 3,
        elemen: 'Sejarah Peradaban Islam (SPI)',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L2',
        taksonomiBloom: 'C4 (Menganalisis)',
        indikatorRef: 'Menyimpulkan relevansi pendekatan dakwah kultural Wali Songo terhadap moderasi beragama.',
        stimulus:
          'Dalam menyebarkan Islam di Jawa, Sunan Kudus membangun Menara Masjid Kudus dengan arsitektur yang akrab bagi masyarakat setempat serta melarang penyembelihan sapi untuk menghormati perasaan warga Hindu pada masa itu. Demikian pula Sunan Kalijaga memanfaatkan seni pertunjukan wayang yang diisi nilai-nilai tauhid dan akhlak.',
        pertanyaan:
          'Pelajaran filosofis yang paling relevan dari strategi dakwah Wali Songo tersebut untuk diterapkan generasi muda muslim Indonesia masa kini adalah ....',
        opsi: [
          {
            label: 'A',
            teks: 'Mencampuradukkan pokok-pokok akidah dan tata cara ibadah mahdhah dengan seluruh kepercayaan lain tanpa batas',
          },
          {
            label: 'B',
            teks: 'Menolak seluruh kesenian dan tradisi Nusantara karena dianggap tidak pernah ada pada masa awal sejarah Islam',
          },
          {
            label: 'C',
            teks: 'Memadukan keteguhan prinsip tauhid dengan sikap ramah terhadap kearifan lokal yang tidak bertentangan dengan syariat',
          },
          {
            label: 'D',
            teks: 'Membatasi penyampaian dakwah Islam hanya melalui pertunjukan kesenian tradisional tanpa penguatan literasi keilmuan',
          },
          {
            label: 'E',
            teks: 'Menjadikan kemegahan bangunan fisik tempat ibadah sebagai satu-satunya tolok ukur keberhasilan dakwah di masyarakat',
          },
        ],
        kunciJawaban: 'C',
        pembahasanSingkat:
          'Strategi Wali Songo mencerminkan prinsip al-muhafazhatu \'ala al-qadim al-shalih wa al-akhdzu bi al-jadid al-ashlah serta indikator moderasi beragama: teguh dalam akidah/tauhid namun akomodatif dan santun terhadap budaya lokal selama tidak bertentangan dengan prinsip syariat.',
        dalilAtauKonsep: 'Q.S. An-Nahl/16: 125 (Dakwah bil Hikmah) & Sejarah Islam Nusantara',
        nilaiModerasi: 'Tawassuth & Akomodatif terhadap Budaya Lokal yang Maslahat',
      },
      {
        nomor: 4,
        blueprintNo: 4,
        elemen: 'Fikih',
        bentukSoal: 'Pilihan Ganda Kompleks',
        levelCode: 'L3',
        taksonomiBloom: 'C4 (Menganalisis)',
        indikatorRef: 'Memilih dua praktik transaksi e-commerce yang memenuhi syarat sah akad muamalah.',
        stimulus:
          'Perkembangan lokapasar (e-commerce) melahirkan berbagai model bisnis baru di kalangan pelajar SMK dan SMA, mulai dari penjualan produk kerajinan secara pre-order, kemitraan dropship, hingga penjualan kotak misteri (mystery box).',
        instruksiKhusus: 'Pilihlah dua jawaban yang benar!',
        pertanyaan:
          'Manakah dua praktik bisnis digital di bawah ini yang memenuhi rukun dan syarat sah akad muamalah dalam Islam?',
        opsi: [
          {
            label: 'A',
            teks: 'Menjual produk kerajinan secara pre-order (akad salam) dengan spesifikasi ukuran, bahan, harga, dan tanggal kirim yang jelas di awal',
          },
          {
            label: 'B',
            teks: 'Menjual kotak misteri (mystery box) seharga Rp100.000,00 yang isinya tidak diketahui pembeli dan bergantung pada keberuntungan',
          },
          {
            label: 'C',
            teks: 'Menjalankan usaha dropship setelah mendapat izin resmi dari produsen pemilik barang (akad wakalah/samsarah) dengan deskripsi jujur',
          },
          {
            label: 'D',
            teks: 'Membuat ulasan dan penilaian palsu menggunakan akun bayangan (fake order) untuk mengelabui calon pembeli mengenai kualitas produk',
          },
          {
            label: 'E',
            teks: 'Menjual barang milik toko orang lain tanpa izin maupun kerja sama terlebih dahulu lalu membatalkan pesanan secara sepihak jika stok habis',
          },
        ],
        kunciJawaban: 'A dan C',
        pembahasanSingkat:
          'Opsi A sah berdasarkan akad salam (pesanan dengan spesifikasi dan waktu penyerahan yang jelas). Opsi C sah berdasarkan akad wakalah bil ujrah atau samsarah (perantara resmi atas izin pemilik barang). Adapun mystery box mengandung gharar/maisir (B), fake order mengandung tadlis/penipuan (D), dan menjual barang yang belum dimiliki/tanpa izin wakalah dilarang (E).',
        dalilAtauKonsep: 'Fikih Muamalah Kontemporer: Akad Salam, Wakalah, dan Larangan Gharar/Tadlis',
        nilaiModerasi: 'I\'tidal (Kejujuran & Keadilan Bermuamalah)',
      },
      {
        nomor: 5,
        blueprintNo: 5,
        elemen: 'Fikih',
        bentukSoal: 'Uraian',
        levelCode: 'L3',
        taksonomiBloom: 'C6 (Mencipta)',
        indikatorRef: 'Merancang skema pembiayaan koperasi murid berbasis akad syariah (murabahah/qardhul hasan).',
        stimulus:
          'Koperasi Murid di sebuah sekolah memiliki dana kas sebesar Rp15.000.000,00. Banyak murid membutuhkan bantuan pengadaan alat praktik kejuruan seharga Rp300.000,00 per paket yang hanya mampu mereka bayar secara mencicil selama 3 bulan dari uang saku. Sebagian pengurus mengusulkan meminjamkan uang tunai Rp300.000,00 dengan syarat murid mengembalikan Rp345.000,00 (bunga 5% per bulan).',
        pertanyaan:
          'Berdasarkan kasus di atas:\na) Mengapa usulan pinjaman uang tunai dengan tambahan bunga 5% per bulan tersebut tidak dibenarkan dalam fikih muamalah?\nb) Rancanglah 1 (satu) skema alternatif berbasis akad syariah (pilih antara akad Murabahah/jual beli cicilan atau Qardhul Hasan/pinjaman kebajikan) yang dapat diterapkan koperasi murid beserta langkah operasionalnya secara adil!',
        kunciJawaban:
          'a) Usulan tersebut tidak dibenarkan karena termasuk riba qardh, yaitu meminjamkan uang tunai dengan syarat pengembalian berlebih yang ditetapkan di muka atas pokok pinjaman.\nb) Rancangan Skema Alternatif:\n- Alternatif 1 (Akad Murabahah/Jual Beli Tangguh): Koperasi membeli terlebih dahulu paket alat praktik dari pemasok (misal Rp270.000,00 secara grosir atau Rp300.000,00), lalu menjual barang tersebut kepada murid dengan menyebutkan harga pokok dan margin keuntungan yang disepakati di awal secara tetap (misal harga jual Rp315.000,00 dicicil Rp105.000,00 × 3 bulan tanpa denda bunga keterlambatan).\n- Alternatif 2 (Akad Qardhul Hasan): Koperasi memberikan pinjaman kebajikan Rp300.000,00 dan murid mengembalikan tepat sebesar pokok Rp300.000,00 (dicicil Rp100.000,00 × 3 bulan) demi ta\'awun (tolong-menolong).',
        pembahasanSingkat:
          'Soal C6 (Mencipta) ini menguji kemampuan murid mengevaluasi praktik ribawi sekaligus menyusun desain operasional akad syariah yang sah, transparan, dan memenuhi maqashid syariah (hifzh al-mal & ta\'awun).',
        dalilAtauKonsep: 'Q.S. Al-Baqarah/2: 275 ("Allah menghalalkan jual beli dan mengharamkan riba") & Akad Murabahah/Qardh',
        nilaiModerasi: 'Tawassuth & I\'tidal (Solusi Ekonomi Berkeadilan dan Maslahat)',
      },
    ],
    pedomanPenskoran: {
      bobotPerBentuk: [
        { bentuk: 'Pilihan Ganda', jumlahSoal: 3, skorPerSoal: 15, skorTotal: 45 },
        { bentuk: 'Pilihan Ganda Kompleks', jumlahSoal: 1, skorPerSoal: 20, skorTotal: 20 },
        { bentuk: 'Uraian', jumlahSoal: 1, skorPerSoal: 35, skorTotal: 35 },
      ],
      rumusNilaiAkhir: 'Nilai Akhir = (Total Skor Perolehan / 100) × 100',
      rubrikAnalitik: [
        {
          nomorSoal: 4,
          bentukSoal: 'Pilihan Ganda Kompleks',
          aspekPenilaian: 'Analisis Keabsahan Akad Bisnis Digital (Salam & Wakalah)',
          skorMaksimal: 20,
          kriteriaSkor: [
            { skor: 20, deskripsi: 'Memilih tepat dua jawaban benar (A dan C) tanpa memilih pengecoh.' },
            { skor: 10, deskripsi: 'Memilih satu jawaban benar (A atau C) tanpa memilih pengecoh.' },
            { skor: 0, deskripsi: 'Memilih jawaban salah atau tidak menjawab.' },
          ],
        },
        {
          nomorSoal: 5,
          bentukSoal: 'Uraian',
          aspekPenilaian: 'Evaluasi Hukum Riba Qardh & Perancangan Skema Akad Koperasi Syariah (C6)',
          skorMaksimal: 4,
          kriteriaSkor: [
            {
              skor: 4,
              deskripsi:
                'Sangat Lengkap: Menjelaskan alasan keharaman bunga pinjaman (riba qardh) secara tepat SERTA merancang skema Murabahah atau Qardhul Hasan lengkap dengan objek akad, mekanisme harga/cicilan tetap, dan ketiadaan denda ribawi.',
            },
            {
              skor: 3,
              deskripsi:
                'Lengkap: Menjelaskan alasan keharaman riba dengan benar dan menyebutkan nama akad alternatif beserta alur dasarnya namun rincian angka/syarat rukunnya belum detail.',
            },
            {
              skor: 2,
              deskripsi:
                'Cukup: Menyebutkan bahwa usulan tersebut riba dan menyarankan jual beli/pinjaman tanpa bunga secara umum tanpa menjelaskan mekanisme akadnya.',
            },
            {
              skor: 1,
              deskripsi:
                'Kurang: Hanya menjawab salah satu sub-pertanyaan secara singkat tanpa dasar konsep fikih muamalah.',
            },
            {
              skor: 0,
              deskripsi: 'Tidak menjawab atau jawaban keliru secara keseluruhan.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'preset-fase-a-sd',
    judulAsesmen: 'Instrumen Asesmen Formatif PAIBP — Kasih Sayang dalam Keluarga, Kalimat Thayyibah & Rukun Islam',
    createdAt: '2026-11-02',
    parameters: {
      fase: 'Fase A',
      kelas: 'Kelas 1 SD/MI',
      jenjang: 'SD/MI',
      elemen: ['Akhlak', 'Akidah', 'Fikih'],
      jenisUjian: 'Asesmen Formatif',
      topikMateri: 'Membiasakan Basmalah dan Hamdalah, Sayang kepada Orang Tua dan Teman, serta Mengenal 5 Rukun Islam',
      capaianPembelajaranOpsional:
        'Murid terbiasa melafalkan basmalah dan hamdalah, menunjukkan perilaku kasih sayang terhadap keluarga dan teman, serta mengenal lima rukun Islam.',
      nilaiModerasiFokus: 'Tasamuh (Toleransi & Menghargai Perbedaan)',
      bentukSoalCounts: [
        { bentuk: 'Pilihan Ganda', jumlah: 3 },
        { bentuk: 'Isian Singkat', jumlah: 1 },
        { bentuk: 'Uraian', jumlah: 1 },
      ],
      komposisiKesulitan: {
        mudahL1: 50,
        sedangL2: 40,
        hotsL3: 10,
      },
    },
    identitas: {
      satuanPendidikan: 'SD / MI (Kurikulum Merdeka)',
      mataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti (PAIBP)',
      jenjangKelasFase: 'SD/MI — Kelas 1 (Fase A)',
      jenisAsesmen: 'Asesmen Formatif',
      alokasiWaktu: '35 Menit',
      kurikulumAcuan: 'Kurikulum Merdeka Fase A (Kalimat Pendek, Konkret, 3 Opsi A–C, Fokus C1–C2)',
      insersiModerasi: 'Kasih Sayang Sesama Teman & Rukun di Rumah maupun Sekolah',
    },
    kisiKisi: [
      {
        no: 1,
        elemen: 'Akidah',
        capaianTujuanPembelajaran:
          'Membiasakan membaca kalimat basmalah setiap memulai perbuatan baik sehari-hari.',
        indikatorSoalABCD:
          'Disajikan cerita pendek tentang Siti yang hendak belajar membaca di meja belajar (Condition), murid (Audience) dapat menyebutkan kalimat thayyibah yang diucapkan sebelum memulai kegiatan dengan benar (Behavior & Degree).',
        levelKognitif: 'L1 (C1 - Mengingat)',
        levelCode: 'L1',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '1',
      },
      {
        no: 2,
        elemen: 'Akhlak',
        capaianTujuanPembelajaran:
          'Menunjukkan sikap kasih sayang terhadap hewan dan makhluk ciptaan Allah Swt. di sekitar rumah.',
        indikatorSoalABCD:
          'Disajikan cerita singkat tentang Ahmad yang melihat kucing kecil kelaparan di teras rumah (Condition), murid (Audience) dapat memilih sikap kasih sayang yang tepat (Behavior & Degree).',
        levelKognitif: 'L1 (C2 - Memahami)',
        levelCode: 'L1',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '2',
      },
      {
        no: 3,
        elemen: 'Fikih',
        capaianTujuanPembelajaran:
          'Mengenal lima rukun Islam secara berurutan sebagai dasar ibadah seorang muslim.',
        indikatorSoalABCD:
          'Disajikan cerita Budi yang mendengar suara azan dan pergi ke masjid bersama ayahnya (Condition), murid (Audience) dapat mengidentifikasi ibadah wajib lima waktu sebagai rukun Islam kedua dengan benar (Behavior & Degree).',
        levelKognitif: 'L2 (C2 - Memahami)',
        levelCode: 'L2',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '3',
      },
      {
        no: 4,
        elemen: 'Akidah',
        capaianTujuanPembelajaran:
          'Memahami waktu pengucapan kalimat hamdalah sebagai wujud rasa syukur kepada Allah Swt.',
        indikatorSoalABCD:
          'Disajikan kalimat cerita pendek tentang anak yang selesai makan bersama keluarga (Condition), murid (Audience) dapat menuliskan bacaan kalimat hamdalah sebagai tanda syukur dengan tepat (Behavior & Degree).',
        levelKognitif: 'L1 (C1 - Mengingat)',
        levelCode: 'L1',
        bentukSoal: 'Isian Singkat',
        nomorSoal: '4',
      },
      {
        no: 5,
        elemen: 'Akhlak',
        capaianTujuanPembelajaran:
          'Menerapkan sikap rukun dan saling menolong dengan teman di sekolah tanpa membeda-bedakan.',
        indikatorSoalABCD:
          'Disajikan cerita singkat tentang teman sebangku yang lupa membawa pensil saat menggambar di kelas (Condition), murid (Audience) dapat menuliskan dua sikap baik yang sebaiknya dilakukan terhadap teman tersebut dengan bahasa sederhana (Behavior & Degree).',
        levelKognitif: 'L2 (C3 - Menerapkan)',
        levelCode: 'L2',
        bentukSoal: 'Uraian',
        nomorSoal: '5',
      },
    ],
    butirSoal: [
      {
        nomor: 1,
        blueprintNo: 1,
        elemen: 'Akidah',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L1',
        taksonomiBloom: 'C1 (Mengingat)',
        indikatorRef: 'Menyebutkan bacaan basmalah sebelum memulai kegiatan belajar.',
        stimulus:
          'Siti duduk rapi di kursi belajar. Ia membuka buku dan mulai menulis.',
        pertanyaan:
          'Sebelum mulai belajar, Siti membaca kalimat ....',
        opsi: [
          { label: 'A', teks: 'Bismillahirrahmanirrahim' },
          { label: 'B', teks: 'Alhamdulillahi rabbil \'alamin' },
          { label: 'C', teks: 'Astaghfirullahal \'azhim' },
        ],
        kunciJawaban: 'A',
        pembahasanSingkat:
          'Setiap memulai kegiatan yang baik seperti belajar, makan, dan memakai pakaian, anak muslim dianjurkan membaca basmalah (Bismillahirrahmanirrahim) agar mendapat berkah dari Allah Swt.',
        dalilAtauKonsep: 'Adab Membaca Basmalah sebelum Memulai Pekerjaan Baik',
        nilaiModerasi: 'Qudwah (Kebiasaan Baik Sejak Dini)',
      },
      {
        nomor: 2,
        blueprintNo: 2,
        elemen: 'Akhlak',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L1',
        taksonomiBloom: 'C2 (Memahami)',
        indikatorRef: 'Memilih contoh perbuatan kasih sayang kepada hewan ciptaan Allah.',
        stimulus:
          'Ahmad melihat kucing kecil sedang kelaparan di depan teras rumah. Ahmad lalu mengambil sedikit sisa ikannya untuk diberikan ke kucing itu.',
        pertanyaan:
          'Perbuatan Ahmad memberi makan kucing itu menunjukkan sikap ....',
        opsi: [
          { label: 'A', teks: 'Menyayangi hewan ciptaan Allah dengan tulus' },
          { label: 'B', teks: 'Membiarkan kucing kelaparan di halaman rumah' },
          { label: 'C', teks: 'Mengusir kucing kecil agar pergi menjauh' },
        ],
        kunciJawaban: 'A',
        pembahasanSingkat:
          'Anak yang saleh memiliki sifat kasih sayang kepada seluruh ciptaan Allah Swt., termasuk memberi makan hewan peliharaan atau kucing yang lapar.',
        dalilAtauKonsep: 'Hadis Kasih Sayang terhadap Makhluk Ciptaan Allah Swt.',
        nilaiModerasi: 'Kasih Sayang terhadap Sesama Makhluk',
      },
      {
        nomor: 3,
        blueprintNo: 3,
        elemen: 'Fikih',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L2',
        taksonomiBloom: 'C2 (Memahami)',
        indikatorRef: 'Mengidentifikasi ibadah salat lima waktu sebagai rukun Islam kedua.',
        stimulus:
          'Suara azan Magrib terdengar dari masjid. Budi segera berwudu lalu berangkat bersama Ayah.',
        pertanyaan:
          'Ibadah lima waktu yang dikerjakan Budi dan Ayah adalah ....',
        opsi: [
          { label: 'A', teks: 'Membayar zakat kepada fakir miskin' },
          { label: 'B', teks: 'Mendirikan salat lima waktu' },
          { label: 'C', teks: 'Pergi berhaji ke Baitullah' },
        ],
        kunciJawaban: 'B',
        pembahasanSingkat:
          'Urutan lima rukun Islam adalah: (1) Mengucapkan dua kalimat syahadat, (2) Mendirikan salat, (3) Menunaikan zakat, (4) Berpuasa di bulan Ramadan, dan (5) Pergi haji bagi yang mampu.',
        dalilAtauKonsep: 'Hadis Lima Rukun Islam (HR. Bukhari dan Muslim)',
        nilaiModerasi: 'Ketaatan Beribadah dengan Tertib',
      },
      {
        nomor: 4,
        blueprintNo: 4,
        elemen: 'Akidah',
        bentukSoal: 'Isian Singkat',
        levelCode: 'L1',
        taksonomiBloom: 'C1 (Mengingat)',
        indikatorRef: 'Menuliskan kalimat hamdalah setelah selesai makan.',
        stimulus:
          'Rani selesai makan siang bersama Ibu. Perut Rani kenyang dan badannya sehat.',
        pertanyaan:
          'Selesai makan siang, Rani bersyukur dengan mengucap "....................................................".',
        kunciJawaban: 'Alhamdulillahi rabbil \'alamin (atau Alhamdulillah)',
        pembahasanSingkat:
          'Kalimat hamdalah (Alhamdulillahi rabbil \'alamin) diucapkan setelah selesai melakukan kegiatan atau saat menerima nikmat dari Allah Swt.',
        dalilAtauKonsep: 'Kalimat Thayyibah Hamdalah & Syukur Nikmat',
        nilaiModerasi: 'Sikap Rendah Hati dan Bersyukur',
      },
      {
        nomor: 5,
        blueprintNo: 5,
        elemen: 'Akhlak',
        bentukSoal: 'Uraian',
        levelCode: 'L2',
        taksonomiBloom: 'C3 (Menerapkan)',
        indikatorRef: 'Menuliskan dua sikap baik menolong teman sebangku.',
        stimulus:
          'Dika lupa membawa pensil warna hari ini. Di mejamu ada satu kotak pensil warna.',
        pertanyaan:
          'Tuliskan 2 (dua) sikap baikmu kepada Dika agar kalian gembira menggambar bersama!',
        kunciJawaban:
          '1. Meminjamkan pensil warna kepada Dika dengan senang hati.\n2. Mengajak Dika mewarnai gambar bersama dengan rukun.',
        pembahasanSingkat:
          'Islam mengajarkan anak-anak untuk saling menyayangi, berbagi dengan teman yang membutuhkan, dan menjaga kerukunan di dalam kelas.',
        dalilAtauKonsep: 'Q.S. Al-Ma\'idah/5: 2 (Tolong-menolong dalam kebaikan) & Hadis Kasih Sayang',
        nilaiModerasi: 'Tasamuh (Rukun dan Peduli Sesama Teman)',
      },
    ],
    pedomanPenskoran: {
      bobotPerBentuk: [
        { bentuk: 'Pilihan Ganda', jumlahSoal: 3, skorPerSoal: 20, skorTotal: 60 },
        { bentuk: 'Isian Singkat', jumlahSoal: 1, skorPerSoal: 15, skorTotal: 15 },
        { bentuk: 'Uraian', jumlahSoal: 1, skorPerSoal: 25, skorTotal: 25 },
      ],
      rumusNilaiAkhir: 'Nilai Akhir = (Total Skor Perolehan / 100) × 100',
      rubrikAnalitik: [
        {
          nomorSoal: 4,
          bentukSoal: 'Isian Singkat',
          aspekPenilaian: 'Ketepatan Menuliskan Lafal Kalimat Hamdalah',
          skorMaksimal: 15,
          kriteriaSkor: [
            { skor: 15, deskripsi: 'Menuliskan "Alhamdulillahi rabbil \'alamin" atau "Alhamdulillah" dengan tepat.' },
            { skor: 8, deskripsi: 'Menuliskan lafal hamdalah namun terdapat sedikit kekeliruan ejaan yang masih dapat dipahami.' },
            { skor: 0, deskripsi: 'Menuliskan kalimat lain yang tidak sesuai atau kosong.' },
          ],
        },
        {
          nomorSoal: 5,
          bentukSoal: 'Uraian',
          aspekPenilaian: 'Kemampuan Menyebutkan Dua Sikap Tolong-Menolong dan Kerukunan di Kelas',
          skorMaksimal: 4,
          kriteriaSkor: [
            {
              skor: 4,
              deskripsi:
                'Menuliskan 2 contoh sikap baik yang konkret dan relevan (misal: meminjamkan pensil warna dengan ikhlas dan menghibur/mengajak belajar bersama).',
            },
            {
              skor: 3,
              deskripsi:
                'Menuliskan 2 sikap baik namun salah satunya masih bersifat sangat umum.',
            },
            {
              skor: 2,
              deskripsi:
                'Hanya menuliskan 1 contoh perbuatan baik yang tepat (misal: meminjamkan pensil).',
            },
            {
              skor: 1,
              deskripsi:
                'Menuliskan jawaban singkat yang kurang jelas namun menunjukkan niat membantu.',
            },
            {
              skor: 0,
              deskripsi: 'Tidak menjawab atau menuliskan sikap yang tidak baik.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'preset-fase-c-sd',
    judulAsesmen: 'Instrumen Asesmen Sumatif PAIBP — Q.S. Al-Hujurat: 13, Asmaul Husna, Zakat & Moderasi Beragama',
    createdAt: '2026-11-02',
    parameters: {
      fase: 'Fase C',
      kelas: 'Kelas 5 SD/MI',
      jenjang: 'SD/MI',
      elemen: ['Al-Qur\'an dan Hadis', 'Akidah', 'Akhlak', 'Fikih'],
      jenisUjian: 'Asesmen Tengah Semester (ATS)',
      topikMateri: 'Pesan Pokok Q.S. Al-Hujurat/49: 13, Keteladanan Asmaul Husna, Takdir Muallaq, Zakat Fitrah & Hidup Damai (Al-Samhah)',
      capaianPembelajaranOpsional:
        'Murid memahami pesan pokok Q.S. Al-Hujurat/49: 13 tentang keragaman, meneladani Asmaul Husna dan semangat ikhtiar, memahami ketentuan zakat, serta menerapkan sikap saling menghargai antarumat beragama.',
      nilaiModerasiFokus: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
      bentukSoalCounts: [
        { bentuk: 'Pilihan Ganda', jumlah: 4 },
        { bentuk: 'Uraian', jumlah: 1 },
      ],
      komposisiKesulitan: {
        mudahL1: 30,
        sedangL2: 40,
        hotsL3: 30,
      },
    },
    identitas: {
      satuanPendidikan: 'SD / MI (Kurikulum Merdeka — Kepka No. 020 Tahun 2026)',
      mataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti (PAIBP)',
      jenjangKelasFase: 'SD/MI — Kelas 5 (Fase C)',
      jenisAsesmen: 'Asesmen Tengah Semester (ATS)',
      alokasiWaktu: '60 Menit',
      kurikulumAcuan: 'Kepka No. 020 Tahun 2026 / Kurikulum Merdeka Fase C (Variasi Stimulus Model A, B, C, D)',
      insersiModerasi: 'Muwathanah (Cinta Tanah Air) & Tasamuh / Al-Samhah dalam Kebinekaan',
    },
    kisiKisi: [
      {
        no: 1,
        elemen: 'Al-Qur\'an dan Hadis',
        capaianTujuanPembelajaran:
          'Memahami pesan pokok Q.S. Al-Hujurat/49: 13 tentang penciptaan manusia yang bersuku-suku dan berbangsa-bangsa untuk saling mengenal.',
        kelasSmt: 'V / Ganjil',
        materiPokok: 'Q.S. Al-Hujurat/49: 13 (Keragaman & Lita\'arafu)',
        indikatorSoalABCD:
          'Disajikan penggalan ayat Q.S. Al-Hujurat/49: 13 yang bergaris bawah [Model A] (Condition), murid (Audience) dapat mengartikan lafal yang digarisbawahi dengan tepat (Behavior & Degree).',
        levelKognitif: 'L1 (C2 - Memahami)',
        levelCode: 'L1',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '1',
      },
      {
        no: 2,
        elemen: 'Akhlak',
        capaianTujuanPembelajaran:
          'Menerapkan sikap menghargai teman yang berbeda agama dalam pergaulan sehari-hari tanpa mencampuradukkan ibadah.',
        kelasSmt: 'V / Ganjil',
        materiPokok: 'Indahnya Saling Menghargai (Al-Samhah)',
        indikatorSoalABCD:
          'Disajikan narasi studi kasus Dedi dan Made yang sedang belajar kelompok saat azan Asar berkumandang [Model B] (Condition), murid (Audience) dapat menyimpulkan sikap menghargai teman yang sedang beribadah dengan tepat (Behavior & Degree).',
        levelKognitif: 'L2 (C3 - Menerapkan)',
        levelCode: 'L2',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '2',
      },
      {
        no: 3,
        elemen: 'Akidah',
        capaianTujuanPembelajaran:
          'Memahami makna Asmaul Husna Al-Qawiyyu, Al-Qayyum, Al-Muhyi, dan Al-Mumit serta meneladaninya dalam perilaku sehari-hari.',
        kelasSmt: 'V / Ganjil',
        materiPokok: 'Asmaul Husna (Al-Qayyum, Al-Qawiyyu, Al-Muhyi)',
        indikatorSoalABCD:
          'Disajikan tabel pasangan Asmaul Husna dan contoh perilaku sehari-hari [Model C] (Condition), murid (Audience) dapat menentukan pasangan yang tepat (Behavior & Degree).',
        levelKognitif: 'L2 (C3 - Menerapkan)',
        levelCode: 'L2',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '3',
      },
      {
        no: 4,
        elemen: 'Akidah',
        capaianTujuanPembelajaran:
          'Memahami makna iman kepada Qada dan Qadar (takdir muallaq dan mubram) yang menumbuhkan semangat ikhtiar.',
        kelasSmt: 'V / Ganjil',
        materiPokok: 'Iman kepada Qada dan Qadar (Takdir Muallaq)',
        indikatorSoalABCD:
          'Disajikan daftar pernyataan berangka (1), (2), (3), (4) tentang peristiwa kehidupan [Model D] (Condition), murid (Audience) dapat menganalisis contoh takdir muallaq dengan benar (Behavior & Degree).',
        levelKognitif: 'L3 (C4 - Menganalisis / HOTS)',
        levelCode: 'L3',
        bentukSoal: 'Pilihan Ganda',
        nomorSoal: '4',
      },
      {
        no: 5,
        elemen: 'Al-Qur\'an dan Hadis',
        capaianTujuanPembelajaran:
          'Menyimpulkan kemuliaan manusia di sisi Allah Swt. berdasarkan ketakwaan dalam Q.S. Al-Hujurat/49: 13.',
        kelasSmt: 'V / Ganjil',
        materiPokok: 'Kemuliaan Berbasis Ketakwaan (Q.S. Al-Hujurat: 13)',
        indikatorSoalABCD:
          'Disajikan terjemah akhir Q.S. Al-Hujurat/49: 13 tentang ukuran kemuliaan di sisi Allah Swt. (Condition), murid (Audience) dapat menjelaskan alasan larangan menyombongkan diri beserta dua contoh perilaku takwa di sekolah secara jelas (Behavior & Degree).',
        levelKognitif: 'L3 (C4 - Menganalisis / HOTS)',
        levelCode: 'L3',
        bentukSoal: 'Uraian',
        nomorSoal: '5',
      },
    ],
    butirSoal: [
      {
        nomor: 1,
        blueprintNo: 1,
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Q.S. Al-Hujurat/49: 13 (Keragaman & Lita\'arafu)',
        stimulusModel: 'Model A: Penggalan Ayat Bergaris Bawah',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L1',
        taksonomiBloom: 'C2 (Memahami)',
        indikatorRef: 'Mengartikan penggalan ayat bergaris bawah [lita\'arafu] pada Q.S. Al-Hujurat/49: 13.',
        stimulus:
          'Perhatikan potongan Q.S. Al-Hujurat/49: 13 berikut!\nيَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُمْ مِنْ ذَكَرٍ وَأُنْثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِنْدَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ\n"Wa ja\'alnakum syu\'uban wa qaba\'ila [lita\'arafu] — Inna akramakum \'indallahi atqakum."',
        pertanyaan:
          'Arti yang tepat untuk penggalan ayat lita\'arafu (لِتَعَارَفُوا) pada Q.S. Al-Hujurat/49: 13 di atas adalah ....',
        opsi: [
          { label: 'A', teks: 'Agar kalian saling mengenal dan menghargai satu sama lain' },
          { label: 'B', teks: 'Agar kalian saling berlomba mengumpulkan harta kekayaan' },
          { label: 'C', teks: 'Supaya setiap suku bangsa hidup terpisah di daerahnya sendiri' },
          { label: 'D', teks: 'Supaya manusia membanggakan kehebatan sukunya masing-masing' },
        ],
        kunciJawaban: 'A',
        pembahasanSingkat:
          'Kata "lita\'arafu" berarti agar kalian saling mengenal, memahami, dan menghargai keberagaman suku serta budaya sebagai anugerah Allah Swt. untuk memperkuat persaudaraan.',
        dalilAtauKonsep: 'Q.S. Al-Hujurat/49: 13 — Konsep Lita\'arafu dalam Kebinekaan',
        nilaiModerasi: 'Muwathanah & Tasamuh (Menghargai Kebinekaan Nusantara)',
      },
      {
        nomor: 2,
        blueprintNo: 2,
        elemen: 'Akhlak',
        materiPokok: 'Indahnya Saling Menghargai (Al-Samhah)',
        stimulusModel: 'Model B: Narasi Studi Kasus Sehari-hari',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L2',
        taksonomiBloom: 'C3 (Menerapkan)',
        indikatorRef: 'Menyimpulkan sikap menghargai teman berbeda agama saat waktu ibadah tiba.',
        stimulus:
          'Dedi dan Made sedang belajar kelompok di rumah Dedi. Saat azan Asar berkumandang, Dedi pamit sebentar untuk salat di masjid. Made yang berbeda agama menunggu dengan tenang dan tidak menyalakan televisi dengan suara keras.',
        pertanyaan:
          'Berdasarkan narasi di atas, sikap terpuji yang ditunjukkan oleh Made adalah ....',
        opsi: [
          { label: 'A', teks: 'Mengajak Made ikut salat ke masjid' },
          { label: 'B', teks: 'Menghargai kesempatan temannya beribadah dengan tidak membuat kegaduhan' },
          { label: 'C', teks: 'Menyuruh Made segera pulang ke rumahnya' },
          { label: 'D', teks: 'Membatalkan salat Asar demi menemani Made' },
        ],
        kunciJawaban: 'B',
        pembahasanSingkat:
          'Dalam berteman dengan sesama warga bangsa yang berbeda agama, sikap saling menghormati ditunjukkan dengan memberikan kesempatan teman beribadah dengan tenang tanpa membuat kegaduhan.',
        dalilAtauKonsep: 'Q.S. Al-Kafirun/109: 6 & Sikap Toleransi (Al-Samhah)',
        nilaiModerasi: 'Tasamuh & Muwathanah (Kerukunan Antarumat Beragama)',
      },
      {
        nomor: 3,
        blueprintNo: 3,
        elemen: 'Akidah',
        materiPokok: 'Asmaul Husna (Al-Qayyum, Al-Qawiyyu, Al-Muhyi)',
        stimulusModel: 'Model C: Tabel Pencocokan Asmaul Husna & Perilaku',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L2',
        taksonomiBloom: 'C3 (Menerapkan)',
        indikatorRef: 'Menentukan pasangan Asmaul Husna dan contoh perilaku sehari-hari yang tepat pada tabel.',
        stimulus:
          'Perhatikan tabel berikut!\n| Kode | Asmaul Husna | Contoh Perilaku Murid Sehari-hari |\n| 1 | Al-Qayyum (Maha Mandiri) | Merapikan tempat tidur dan menyiapkan buku pelajaran sendiri |\n| 2 | Al-Qawiyyu (Maha Kuat) | Menggunakan tenaga fisik untuk menakut-nakuti teman yang kecil |\n| 3 | Al-Muhyi (Maha Menghidupkan) | Menyiram tanaman di taman kelas secara rutin agar tumbuh subur |',
        pertanyaan:
          'Berdasarkan tabel di atas, pasangan Asmaul Husna dan perilaku keteladanan yang benar ditunjukkan oleh nomor ....',
        opsi: [
          { label: 'A', teks: 'Nomor 1 dan 2' },
          { label: 'B', teks: 'Nomor 1 dan 3' },
          { label: 'C', teks: 'Nomor 2 dan 3' },
          { label: 'D', teks: 'Nomor 2 saja' },
        ],
        kunciJawaban: 'B',
        pembahasanSingkat:
          'Pasangan 1 benar (Al-Qayyum diteladani dengan sikap mandiri) dan pasangan 3 benar (Al-Muhyi diteladani dengan merawat kehidupan tanaman). Pasangan 2 salah karena kekuatan harus digunakan untuk menolong sesama.',
        dalilAtauKonsep: 'Q.S. Al-Baqarah/2: 255 (Al-Hayyu Al-Qayyum) & Keteladanan Asmaul Husna',
        nilaiModerasi: 'Qudwah (Kemandirian & Kepedulian Lingkungan)',
      },
      {
        nomor: 4,
        blueprintNo: 4,
        elemen: 'Akidah',
        materiPokok: 'Iman kepada Qada dan Qadar (Takdir Muallaq)',
        stimulusModel: 'Model D: Daftar Pernyataan Berangka (1), (2), (3), (4)',
        bentukSoal: 'Pilihan Ganda',
        levelCode: 'L3',
        taksonomiBloom: 'C4 (Menganalisis)',
        indikatorRef: 'Menganalisis contoh takdir muallaq dari daftar pernyataan berangka (1)–(4).',
        stimulus:
          'Perhatikan beberapa pernyataan berikut!\n(1) Bima belajar dengan tekun setiap malam agar memperoleh nilai rapor yang memuaskan.\n(2) Jenis kelamin bayi laki-laki atau perempuan ketika dilahirkan ke dunia.\n(3) Pak Ahmad rajin berolahraga dan makan sayur agar tubuhnya tetap sehat dan bugar.\n(4) Matahari terbit dari sebelah timur dan tenggelam di sebelah barat.',
        pertanyaan:
          'Berdasarkan beberapa pernyataan di atas, contoh takdir muallaq (ketentuan Allah yang berkaitan dengan ikhtiar manusia) ditunjukkan oleh nomor ....',
        opsi: [
          { label: 'A', teks: '(1) dan (2)' },
          { label: 'B', teks: '(1) dan (3)' },
          { label: 'C', teks: '(2) dan (4)' },
          { label: 'D', teks: '(3) dan (4)' },
        ],
        kunciJawaban: 'B',
        pembahasanSingkat:
          'Pernyataan (1) kepandaian melalui belajar dan (3) kesehatan melalui olahraga adalah contoh takdir muallaq yang melibatkan usaha (ikhtiar) manusia. Sedangkan (2) dan (4) adalah takdir mubram.',
        dalilAtauKonsep: 'Q.S. Ar-Ra\'d/13: 11 — Kewajiban Berikhtiar dalam Takdir Muallaq',
        nilaiModerasi: 'Tawassuth (Keseimbangan antara Ikhtiar, Doa, dan Tawakal)',
      },
      {
        nomor: 5,
        blueprintNo: 5,
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Kemuliaan Berbasis Ketakwaan (Q.S. Al-Hujurat: 13)',
        stimulusModel: 'Model A: Terjemah Ayat & Analisis Konseptual',
        bentukSoal: 'Uraian',
        levelCode: 'L3',
        taksonomiBloom: 'C4 (Menganalisis)',
        indikatorRef: 'Menjelaskan ukuran kemuliaan manusia menurut Q.S. Al-Hujurat/49: 13 dan contoh penerapannya.',
        stimulus:
          'Perhatikan potongan Q.S. Al-Hujurat/49: 13 berikut!\nإِنَّ أَكْرَمَكُمْ عِنْدَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ\n"Sesungguhnya yang paling mulia di antara kamu di sisi Allah ialah orang yang paling bertakwa."',
        pertanyaan:
          'Tuliskan arti dari potongan ayat "Inna akramakum \'indallahi atqakum" dan jelaskan 2 (dua) contoh sikap anak yang bertakwa dalam pergaulan sehari-hari di sekolah!',
        kunciJawaban:
          'a) Karena di hadapan Allah Swt. semua manusia setara; kemuliaan seseorang tidak diukur dari kekayaan, rupa, atau sukunya, melainkan dari ketakwaan dan amal salehnya.\nb) Dua contoh sikap: (1) Berteman dengan siapa saja secara adil tanpa pilih kasih; (2) Rajin beribadah, berkata jujur, dan gemar membantu teman yang kesulitan.',
        pembahasanSingkat:
          'Ayat "Inna akramakum \'indallahi atqakum" mengajarkan prinsip kesetaraan manusia (al-musawah) dan menempatkan ketakwaan sebagai satu-satunya standar kemuliaan di sisi Allah Swt.',
        dalilAtauKonsep: 'Q.S. Al-Hujurat/49: 13 (Inna akramakum \'indallahi atqakum)',
        nilaiModerasi: 'I\'tidal (Kesetaraan Martabat Manusia) & Rendah Hati',
      },
    ],
    pedomanPenskoran: {
      bobotPerBentuk: [
        { bentuk: 'Pilihan Ganda', jumlahSoal: 4, skorPerSoal: 15, skorTotal: 60 },
        { bentuk: 'Uraian', jumlahSoal: 1, skorPerSoal: 40, skorTotal: 40 },
      ],
      rumusNilaiAkhir: 'Nilai Akhir = (Total Skor Perolehan / 100) × 100',
      rubrikAnalitik: [
        {
          nomorSoal: 5,
          bentukSoal: 'Uraian',
          aspekPenilaian: 'Pemahaman Makna Kemuliaan Berbasis Takwa (Q.S. Al-Hujurat: 13) & 2 Contoh Sikap',
          skorMaksimal: 4,
          kriteriaSkor: [
            {
              skor: 4,
              deskripsi:
                'Sangat Lengkap: Menjelaskan alasan kesetaraan manusia di hadapan Allah berdasarkan ketakwaan secara tepat SERTA memberikan 2 contoh perilaku nyata di sekolah.',
            },
            {
              skor: 3,
              deskripsi:
                'Lengkap: Menjelaskan alasan dengan tepat dan memberikan 1 contoh perilaku nyata yang sesuai.',
            },
            {
              skor: 2,
              deskripsi:
                'Cukup: Menuliskan alasan secara singkat atau hanya menuliskan 2 contoh sikap tanpa penjelasan alasan ayat.',
            },
            {
              skor: 1,
              deskripsi: 'Kurang: Jawaban masih sangat umum dan belum mengaitkan dengan konsep takwa.',
            },
          ],
        },
      ],
    },
  },
];

/**
 * Generates a deterministic, curriculum-compliant AssessmentPackage tailored to any user
 * AssessmentParameters using age-calibrated, zero-boilerplate real-life scenarios and concrete action options.
 */
export function buildCustomFallbackPackage(
  params: AssessmentParameters,
  customId?: string
): AssessmentPackage {
  const profile = getFaseProfile(params.fase);
  const activeCounts = params.bentukSoalCounts.filter((c) => c.jumlah > 0);
  const effectiveCounts =
    activeCounts.length > 0
      ? activeCounts
      : [
          { bentuk: 'Pilihan Ganda' as const, jumlah: 3 },
          { bentuk: 'Uraian' as const, jumlah: 1 },
        ];

  const totalSoal = effectiveCounts.reduce((acc, c) => acc + c.jumlah, 0);
  const diffAlloc = calculateDifficultyAllocation(totalSoal, params.komposisiKesulitan);

  const kisiKisi: BlueprintRow[] = [];
  const butirSoal: QuestionItem[] = [];
  const rubrikAnalitik: AnalyticRubricRow[] = [];
  const usedStimuli = new Set<string>();

  const isCombinedPkg = isPaketGabunganTopic(params.topikMateri);
  const allFiveElemen: ElemenPAI[] = [
    'Al-Qur\'an dan Hadis',
    'Akidah',
    'Akhlak',
    'Fikih',
    'Sejarah Peradaban Islam (SPI)',
  ];
  const elemenList: ElemenPAI[] =
    isCombinedPkg && !params.topikMateri.toUpperCase().includes('ATS')
      ? allFiveElemen
      : params.elemen.length > 0
      ? params.elemen
      : ['Al-Qur\'an dan Hadis', 'Akhlak', 'Fikih'];

  let currentNo = 1;
  const targetSemester: 'Ganjil' | 'Genap' | undefined =
    params.semester === 'Semua'
      ? undefined
      : params.semester === 'Genap'
      ? 'Genap'
      : params.semester === 'Ganjil'
      ? 'Ganjil'
      : params.jenisUjian?.includes('Genap') || params.jenisUjian?.includes('Akhir Jenjang')
      ? 'Genap'
      : 'Ganjil';

  const chapterTopicsForClass = getChapterTopicsForClassSemester(
    params.fase,
    params.kelas,
    params.semester || targetSemester || 'Ganjil'
  );

  for (const group of effectiveCounts) {
    for (let i = 0; i < group.jumlah; i++) {
      const no = currentNo++;
      const preferredElemen = elemenList[(no - 1) % elemenList.length];
      const seed = selectQuestionSeed(
        params.fase,
        group.bentuk,
        preferredElemen,
        no - 1,
        usedStimuli,
        params.kelas,
        targetSemester
      );
      const elemen = preferredElemen;
      const levelCode = diffAlloc.sequence[no - 1] ?? 'L2';
      const bloomMap: Record<string, string> = {
        L1: profile.fase === 'Fase A' ? 'C1 (Mengingat)' : 'C2 (Memahami)',
        L2: 'C3 (Menerapkan)',
        L3:
          profile.jenjang === 'SMA/SMK/MA'
            ? 'C5 (Mengevaluasi / HOTS)'
            : 'C4 (Menganalisis / HOTS)',
      };
      const bloomLabel = bloomMap[levelCode];

      const matchingChapterTopic = chapterTopicsForClass.find((ct) =>
        ct.elemen.includes(elemen)
      );

      const cpText = isCombinedPkg
        ? seed.cpRingkas ||
          matchingChapterTopic?.rumusanTP ||
          params.capaianPembelajaranOpsional?.trim() ||
          'Memahami dan mengamalkan ajaran Islam secara tepat.'
        : no === 1 && params.capaianPembelajaranOpsional?.trim()
        ? params.capaianPembelajaranOpsional.trim()
        : seed.cpRingkas ||
          params.capaianPembelajaranOpsional?.trim() ||
          'Memahami dan mengamalkan ajaran Islam secara tepat.';

      const materiPokok = isCombinedPkg
        ? seed.materiPokok ||
          matchingChapterTopic?.materiPokok ||
          `${elemen} — ${seed.indikatorTopik.slice(0, 48)}`
        : no === 1 && params.topikMateri?.trim()
        ? params.topikMateri.trim()
        : seed.materiPokok ||
          params.topikMateri?.trim() ||
          `${elemen} — ${seed.indikatorTopik.slice(0, 48)}`;

      let indikatorABCD = '';
      if (group.bentuk === 'Pilihan Ganda') {
        if (seed.stimulusModel === 'Tabel Pasangan') {
          indikatorABCD = `Disajikan tabel ${materiPokok}, murid dapat menentukan pasangan yang tepat dengan benar.`;
        } else if (seed.stimulusModel?.includes('Ayat') || seed.stimulus?.includes('\n')) {
          indikatorABCD = `Disajikan potongan ayat ${materiPokok}, murid dapat menentukan lanjutan ayat atau artinya dengan tepat.`;
        } else if (seed.stimulusModel?.includes('Pernyataan')) {
          indikatorABCD = `Disajikan beberapa pernyataan tentang ${materiPokok}, murid dapat memilih pernyataan yang benar dengan tepat.`;
        } else if (seed.stimulus) {
          indikatorABCD = `Disajikan ilustrasi singkat tentang ${materiPokok}, murid dapat menganalisis ${seed.indikatorTopik} dengan benar.`;
        } else {
          indikatorABCD = `Murid dapat ${seed.indikatorTopik} dengan tepat dan benar.`;
        }
      } else if (group.bentuk === 'Isian Singkat') {
        indikatorABCD = `Murid dapat menyebutkan ${seed.indikatorTopik} dengan singkat dan tepat.`;
      } else if (group.bentuk === 'Uraian') {
        indikatorABCD = `Murid dapat menjelaskan ${seed.indikatorTopik} secara rinci dan tepat.`;
      } else {
        indikatorABCD = `Murid dapat menganalisis ${seed.indikatorTopik} dengan tepat.`;
      }

      const rowSemesterLabel = formatKelasSemester(
        params.kelas,
        params.jenisUjian,
        params.semester === 'Semua' ? seed.semester || 'Semua' : params.semester || seed.semester
      );

      kisiKisi.push({
        no,
        elemen,
        capaianTujuanPembelajaran: cpText,
        kelasSmt: rowSemesterLabel,
        materiPokok,
        indikatorSoalABCD: indikatorABCD,
        levelKognitif: `${levelCode} (${bloomLabel})`,
        levelCode,
        bentukSoal: group.bentuk,
        nomorSoal: String(no),
      });

      const optLabels =
        group.bentuk === 'Pilihan Ganda Kompleks'
          ? profile.optionCount < 4
            ? ['A', 'B', 'C', 'D']
            : profile.optionLabels
          : profile.optionLabels;

      if (group.bentuk === 'Pilihan Ganda') {
        const optionPool: Record<string, string> = {
          A: seed.opsiPG.A,
          B: seed.opsiPG.B,
          C: seed.opsiPG.C,
          D: seed.opsiPG.D ?? seed.opsiPG.C,
          E: seed.opsiPG.E ?? seed.opsiPG.D ?? seed.opsiPG.C,
        };

        butirSoal.push({
          nomor: no,
          blueprintNo: no,
          elemen,
          materiPokok,
          stimulusModel: seed.stimulusModel,
          bentukSoal: 'Pilihan Ganda',
          levelCode,
          taksonomiBloom: bloomLabel,
          indikatorRef: indikatorABCD,
          stimulus: seed.stimulus,
          pertanyaan: seed.pertanyaanPG,
          opsi: optLabels.map((lbl) => ({
            label: lbl,
            teks: optionPool[lbl] || optionPool.C,
          })),
          kunciJawaban: seed.kunciPG,
          pembahasanSingkat: seed.pembahasan,
          dalilAtauKonsep: seed.dalil,
          nilaiModerasi: params.nilaiModerasiFokus,
        });
      } else if (group.bentuk === 'Pilihan Ganda Kompleks') {
        const rawOpsiFromPGK = typeof seed.pertanyaanPGK === 'object' && seed.pertanyaanPGK !== null ? (seed.pertanyaanPGK as any) : null;
        const pgkPool = seed.opsiPGK || rawOpsiFromPGK || {
          A: seed.opsiPG.A,
          B: seed.opsiPG.B,
          C: seed.opsiPG.C,
          D: seed.opsiPG.D || seed.opsiPG.C,
          E: seed.opsiPG.E ?? seed.opsiPG.D ?? seed.opsiPG.C,
        };
        const optionPool: Record<string, string> = {
          A: pgkPool.A,
          B: pgkPool.B,
          C: pgkPool.C,
          D: pgkPool.D,
          E: pgkPool.E ?? pgkPool.D,
        };
        const pertanyaanPGK =
          typeof seed.pertanyaanPGK === 'string' && seed.pertanyaanPGK.trim()
            ? seed.pertanyaanPGK
            : seed.pertanyaanPG || 'Pilihlah dua jawaban yang paling tepat!';
        const kunciPGK = seed.kunciPGK || (seed.kunciPG === 'A' ? 'A dan B' : `${seed.kunciPG} dan A`);

        butirSoal.push({
          nomor: no,
          blueprintNo: no,
          elemen,
          materiPokok,
          stimulusModel: seed.stimulusModel,
          bentukSoal: 'Pilihan Ganda Kompleks',
          levelCode,
          taksonomiBloom: bloomLabel,
          indikatorRef: indikatorABCD,
          stimulus: seed.stimulus,
          instruksiKhusus: 'Pilihlah dua jawaban yang benar!',
          pertanyaan: pertanyaanPGK,
          opsi: optLabels.map((lbl) => ({
            label: lbl,
            teks: optionPool[lbl] || optionPool.D,
          })),
          kunciJawaban: kunciPGK,
          pembahasanSingkat: seed.pembahasan,
          dalilAtauKonsep: seed.dalil,
          nilaiModerasi: params.nilaiModerasiFokus,
        });

        rubrikAnalitik.push({
          nomorSoal: no,
          bentukSoal: 'Pilihan Ganda Kompleks',
          aspekPenilaian: `Ketepatan Memilih Dua Tindakan/Pernyataan Benar (${elemen})`,
          skorMaksimal: 4,
          kriteriaSkor: [
            { skor: 4, deskripsi: `Memilih tepat kedua opsi benar (${kunciPGK}) tanpa memilih opsi pengecoh.` },
            { skor: 2, deskripsi: 'Memilih satu opsi benar tanpa memilih opsi pengecoh.' },
            { skor: 1, deskripsi: 'Memilih satu opsi benar disertai satu opsi pengecoh.' },
          ],
        });
      } else if (group.bentuk === 'Benar/Salah') {
        const pernyataanBS = seed.pernyataanBS && seed.pernyataanBS.length > 0
          ? seed.pernyataanBS
          : [
              { pernyataan: `Penerapan ${materiPokok} merupakan wujud ketaatan kepada Allah Swt.`, jawaban: 'Benar' as const },
              { pernyataan: `Mengabaikan adab sesama teman sesuai dengan nilai ${params.nilaiModerasiFokus}.`, jawaban: 'Salah' as const },
            ];
        const kunciBS = pernyataanBS
          .map((item, idx) => `${idx + 1}: ${item.jawaban}`)
          .join(', ');
        butirSoal.push({
          nomor: no,
          blueprintNo: no,
          elemen,
          materiPokok,
          stimulusModel: seed.stimulusModel,
          bentukSoal: 'Benar/Salah',
          levelCode,
          taksonomiBloom: bloomLabel,
          indikatorRef: indikatorABCD,
          stimulus: seed.stimulus,
          instruksiKhusus: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
          pertanyaan: 'Tentukan Benar atau Salah pernyataan berikut:',
          pernyataanBenarSalah: pernyataanBS,
          kunciJawaban: kunciBS,
          pembahasanSingkat: seed.pembahasan,
          dalilAtauKonsep: seed.dalil,
          nilaiModerasi: params.nilaiModerasiFokus,
        });
      } else if (group.bentuk === 'Menjodohkan') {
        const pasanganMenjodohkan = seed.pasanganMenjodohkan && seed.pasanganMenjodohkan.length > 0
          ? seed.pasanganMenjodohkan
          : [
              { premis: `Penerapan ${materiPokok}`, respon: 'Diamalkan dengan sungguh-sungguh' },
              { premis: `Nilai ${params.nilaiModerasiFokus}`, respon: 'Diteladani dalam kehidupan sehari-hari' },
            ];
        const kunciMatch = pasanganMenjodohkan
          .map((item, idx) => `${idx + 1} -> ${item.respon}`)
          .join('; ');
        butirSoal.push({
          nomor: no,
          blueprintNo: no,
          elemen,
          materiPokok,
          stimulusModel: seed.stimulusModel,
          bentukSoal: 'Menjodohkan',
          levelCode,
          taksonomiBloom: bloomLabel,
          indikatorRef: indikatorABCD,
          stimulus: seed.stimulus,
          instruksiKhusus:
            'Pasangkanlah pernyataan pada lajur kiri (Premis) dengan tindakan/konsep yang tepat pada lajur kanan (Respon)!',
          pertanyaan: 'Pasangkanlah pernyataan berikut dengan jawaban yang tepat:',
          pasanganMenjodohkan,
          kunciJawaban: kunciMatch,
          pembahasanSingkat: seed.pembahasan,
          dalilAtauKonsep: seed.dalil,
          nilaiModerasi: params.nilaiModerasiFokus,
        });
      } else if (group.bentuk === 'Isian Singkat') {
        butirSoal.push({
          nomor: no,
          blueprintNo: no,
          elemen,
          materiPokok,
          stimulusModel: seed.stimulusModel,
          bentukSoal: 'Isian Singkat',
          levelCode,
          taksonomiBloom: bloomLabel,
          indikatorRef: indikatorABCD,
          stimulus: seed.stimulus,
          pertanyaan: seed.pertanyaanIsian || seed.pertanyaanPG || 'Isilah titik-titik di bawah ini dengan tepat!',
          kunciJawaban: seed.kunciIsian || seed.kunciPG,
          pembahasanSingkat: seed.pembahasan,
          dalilAtauKonsep: seed.dalil,
          nilaiModerasi: params.nilaiModerasiFokus,
        });

        rubrikAnalitik.push({
          nomorSoal: no,
          bentukSoal: 'Isian Singkat',
          aspekPenilaian: `Ketepatan Jawaban Isian Singkat (${elemen})`,
          skorMaksimal: 4,
          kriteriaSkor: [
            { skor: 4, deskripsi: `Menuliskan jawaban "${seed.kunciIsian || seed.kunciPG}" secara tepat dan lengkap.` },
            { skor: 3, deskripsi: 'Menuliskan istilah yang tepat namun terdapat sedikit kekurangan ejaan.' },
            { skor: 2, deskripsi: 'Menuliskan istilah yang semakna secara umum.' },
            { skor: 1, deskripsi: 'Menuliskan jawaban yang kurang tepat.' },
          ],
        });
      } else {
        // Uraian
        butirSoal.push({
          nomor: no,
          blueprintNo: no,
          elemen,
          materiPokok,
          stimulusModel: seed.stimulusModel,
          bentukSoal: 'Uraian',
          levelCode,
          taksonomiBloom: bloomLabel,
          indikatorRef: indikatorABCD,
          stimulus: seed.stimulus,
          pertanyaan: seed.pertanyaanUraian || seed.pertanyaanPG || 'Jelaskanlah jawaban atas pertanyaan berikut dengan benar dan tepat!',
          kunciJawaban: seed.kunciUraian || seed.kunciPG,
          pembahasanSingkat: seed.pembahasan,
          dalilAtauKonsep: seed.dalil,
          nilaiModerasi: params.nilaiModerasiFokus,
        });

        rubrikAnalitik.push({
          nomorSoal: no,
          bentukSoal: 'Uraian',
          aspekPenilaian: `Ketepatan Analisis & Tindakan Konkret pada Soal Uraian No. ${no}`,
          skorMaksimal: 4,
          kriteriaSkor: [
            {
              skor: 4,
              deskripsi:
                'Sangat Baik: Menjawab seluruh pertanyaan secara tepat disertai alasan yang logis dan contoh tindakan nyata yang santun.',
            },
            {
              skor: 3,
              deskripsi:
                'Baik: Menjawab pertanyaan dengan benar dan memberikan contoh tindakan yang sesuai namun alasan masih singkat.',
            },
            {
              skor: 2,
              deskripsi:
                'Cukup: Menuliskan jawaban atau contoh tindakan secara umum namun belum lengkap.',
            },
            {
              skor: 1,
              deskripsi: 'Perlu Bimbingan: Jawaban masih sangat singkat dan kurang tepat sasaran.',
            },
          ],
        });
      }
    }
  }

  if (rubrikAnalitik.length === 0) {
    rubrikAnalitik.push({
      nomorSoal: 1,
      bentukSoal: 'Uraian',
      aspekPenilaian: 'Pedoman Umum Penilaian Analitik Konstruk PAIBP (Skor 1–4)',
      skorMaksimal: 4,
      kriteriaSkor: [
        { skor: 4, deskripsi: 'Jawaban tepat, mencakup argumen konseptual, dalil, dan contoh tindakan nyata.' },
        { skor: 3, deskripsi: 'Jawaban tepat dan mencakup argumen konseptual namun contoh belum lengkap.' },
        { skor: 2, deskripsi: 'Jawaban cukup tepat secara umum namun belum menyertakan alasan.' },
        { skor: 1, deskripsi: 'Jawaban kurang tepat dan masih bersifat parsial.' },
      ],
    });
  }

  const bobotPerBentuk = effectiveCounts.map((c) => {
    const skorPerSoal = c.bentuk === 'Uraian' ? 20 : c.bentuk === 'Pilihan Ganda Kompleks' ? 15 : 10;
    return {
      bentuk: c.bentuk,
      jumlahSoal: c.jumlah,
      skorPerSoal,
      skorTotal: c.jumlah * skorPerSoal,
    };
  });
  const grandTotalSkor = bobotPerBentuk.reduce((a, b) => a + b.skorTotal, 0) || 100;

  const pemetaanUraian: PemetaanUraianRow[] = butirSoal
    .filter((s) => s.bentukSoal === 'Uraian')
    .map((soal, idx) => {
      const kisi = kisiKisi.find((k) => k.nomorSoal === String(soal.nomor));
      return {
        no: idx + 1,
        tujuanPembelajaran: kisi?.capaianTujuanPembelajaran || soal.indikatorRef,
        kelasSemester: kisi?.kelasSmt || profile.defaultSemester,
        kontenMateri: soal.materiPokok || kisi?.materiPokok || soal.elemen,
      };
    });

  const semesterDisplay =
    params.semester === 'Semua'
      ? 'Semester Ganjil & Genap'
      : params.semester
      ? `Semester ${params.semester}`
      : `Semester ${targetSemester || 'Ganjil'}`;

  return {
    id: customId || `custom-${Date.now()}`,
    judulAsesmen: `Instrumen ${params.jenisUjian} (${semesterDisplay}) PAIBP — ${params.topikMateri || 'Kurikulum Merdeka'}`,
    createdAt: new Date().toISOString().slice(0, 10),
    parameters: params,
    identitas: {
      satuanPendidikan: `${params.jenjang} (Kurikulum Merdeka — Kepka No. 020 Tahun 2026)`,
      mataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti (PAIBP)',
      jenjangKelasFase: `${params.jenjang} — ${params.kelas} (${params.fase} · ${semesterDisplay})`,
      jenisAsesmen: params.jenisUjian,
      alokasiWaktu: `${Math.max(30, totalSoal * 8)} Menit`,
      kurikulumAcuan: `Kepka No. 020 Tahun 2026 / Kurikulum Merdeka ${params.fase} (${profile.bloomRange}, ${profile.optionLabels.join('–')})`,
      insersiModerasi: params.nilaiModerasiFokus,
    },
    kisiKisi,
    pemetaanUraian,
    butirSoal,
    pedomanPenskoran: {
      bobotPerBentuk,
      rumusNilaiAkhir: `Nilai Akhir = (Total Skor Perolehan / ${grandTotalSkor}) × 100`,
      rubrikAnalitik,
    },
  };
}

const PRESET_FASE_B_SD = buildCustomFallbackPackage(
  {
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    jenjang: 'SD/MI',
    elemen: ['Akhlak', 'Fikih', 'Al-Qur\'an dan Hadis'],
    jenisUjian: 'Sumatif Lingkup Materi (TP)',
    topikMateri: 'Jujur dan Amanah di Sekolah, Ketertiban Salat Berjamaah, serta Kepedulian terhadap Sesama',
    capaianPembelajaranOpsional:
      'Murid menerapkan perilaku jujur saat menemukan barang di sekolah, tertib melaksanakan wudu dan salat berjamaah di musala, serta gemar berbagi bekal dengan teman.',
    nilaiModerasiFokus: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
    bentukSoalCounts: [
      { bentuk: 'Pilihan Ganda', jumlah: 3 },
      { bentuk: 'Isian Singkat', jumlah: 1 },
      { bentuk: 'Uraian', jumlah: 1 },
    ],
    komposisiKesulitan: { mudahL1: 40, sedangL2: 40, hotsL3: 20 },
  },
  'preset-fase-b-sd'
);

const PRESET_FASE_F_SMK = buildCustomFallbackPackage(
  {
    fase: 'Fase F',
    kelas: 'Kelas 12 SMK/MAK',
    jenjang: 'SMA/SMK/MA',
    elemen: ['Akhlak', 'Fikih', 'Al-Qur\'an dan Hadis'],
    jenisUjian: 'Asesmen Akhir Jenjang (AAJ / Ujian Praktik)',
    topikMateri: 'Integritas dan Etika Profesi di Tempat Kerja, Muamalah E-Commerce, serta Toleransi Masyarakat Majemuk',
    capaianPembelajaranOpsional:
      'Murid menerapkan integritas dan etos kerja Islami (Q.S. At-Taubah: 105) saat magang/bekerja, mengevaluasi transaksi digital, serta bekerja sama dalam kebaikan di masyarakat majemuk.',
    nilaiModerasiFokus: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
    bentukSoalCounts: [
      { bentuk: 'Pilihan Ganda', jumlah: 3 },
      { bentuk: 'Pilihan Ganda Kompleks', jumlah: 1 },
      { bentuk: 'Uraian', jumlah: 1 },
    ],
    komposisiKesulitan: { mudahL1: 20, sedangL2: 35, hotsL3: 45 },
  },
  'preset-fase-f-smk'
);

export const PRESET_PACKAGES: AssessmentPackage[] = [
  BASE_PRESET_PACKAGES[0], // Fase D (Kelas 8 SMP)
  BASE_PRESET_PACKAGES[1], // Fase E (Kelas 10 SMA)
  BASE_PRESET_PACKAGES[2], // Fase A (Kelas 1 SD)
  PRESET_FASE_B_SD,        // Fase B (Kelas 4 SD)
  BASE_PRESET_PACKAGES[3], // Fase C (Kelas 5 SD)
  PRESET_FASE_F_SMK,       // Fase F (Kelas 12 SMK)
];

