import { ElemenPAI, FaseCode } from '../types/assessment';

export interface CurriculumTopic {
  id: string;
  fase: FaseCode;
  kelas: string; // 'Kelas 1 SD/MI', 'Kelas 2 SD/MI', 'Semua Kelas', etc.
  semester?: 'Ganjil' | 'Genap' | 'Semua';
  elemen: ElemenPAI[];
  judulTopik: string;
  materiPokok: string;
  rumusanTP: string;
  rekomendasiModerasi?: string;
}

export const CURRICULUM_DATABASE_CP020: CurriculumTopic[] = [
  // =========================================================================
  // FASE A: KELAS 1 & 2 SD/MI (USIA 6–8 TAHUN)
  // =========================================================================
  {
    id: 'fase-a-kls1-hijaiyah',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: 'Huruf Hijaiah & Harakat (Fathah, Kasrah, Dammah)',
    materiPokok: 'Huruf Hijaiah Tunggal dan Berharakat Dasar',
    rumusanTP:
      'Murid mampu mengenal, melafalkan, dan menuliskan huruf hijaiah tunggal berharakat fathah, kasrah, dan dammah dengan makhraj yang benar sebagai wujud kecintaan pada Al-Qur\'an.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-a-kls1-alfatihah',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis', 'Akidah'],
    judulTopik: 'Pesan Pokok Q.S. Al-Fatihah & Pembiasaan Basmalah',
    materiPokok: 'Surah Al-Fatihah dan Pembiasaan Lafal Basmalah',
    rumusanTP:
      'Murid mampu menghafal dan melafalkan Q.S. Al-Fatihah dengan fasih, serta membiasakan membaca basmalah dan hamdalah dalam aktivitas sehari-hari di rumah dan sekolah.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-a-kls1-rukun-iman',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    elemen: ['Akidah'],
    judulTopik: 'Rukun Iman & Kasih Sayang Allah (Ar-Rahman, Ar-Rahim)',
    materiPokok: 'Enam Rukun Iman dan Asmaulhusna Ar-Rahman dan Ar-Rahim',
    rumusanTP:
      'Murid mampu menyebutkan enam rukun iman, meyakini Allah Swt. Maha Pengasih dan Maha Penyayang (Ar-Rahman dan Ar-Rahim), serta meneladani cinta Rasulullah saw.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-a-kls1-bersuci',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    elemen: ['Fikih', 'Akhlak'],
    judulTopik: 'Tata Cara Bersuci (Thaharah) & Wudu Sederhana',
    materiPokok: 'Adab Membersihkan Hadas Kecil dan Praktik Wudu',
    rumusanTP:
      'Murid memahami pentingnya kebersihan diri, mempraktikkan adab buang air dan membersihkan najis, serta menunjukkan tata urutan gerakan wudu dengan tertib dan hemat air.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'fase-a-kls1-adam',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    elemen: ['Sejarah Peradaban Islam (SPI)', 'Akhlak'],
    judulTopik: 'Kisah Keteladanan Nabi Adam a.s. & Sikap Bertobat',
    materiPokok: 'Kisah Nabi Adam a.s. sebagai Manusia Pertama',
    rumusanTP:
      'Murid mampu menceritakan kisah Nabi Adam a.s. secara sederhana, meneladani sikap jujur mengakui kesalahan, dan membiasakan segera meminta maaf jika berbuat salah.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'fase-a-kls2-ikhlas-annas',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis', 'Akidah'],
    judulTopik: 'Surah Pendek: Q.S. Al-Ikhlas, An-Nas, dan Al-Falaq',
    materiPokok: 'Pesan Pokok Q.S. Al-Ikhlas, An-Nas, dan Al-Falaq',
    rumusanTP:
      'Murid mampu membaca, menghafal, dan memahami pesan pokok ketauhidan dalam Q.S. Al-Ikhlas serta memohon perlindungan hanya kepada Allah melalui Q.S. An-Nas dan Al-Falaq.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-a-kls2-asmaulhusna',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    elemen: ['Akidah', 'Akhlak'],
    judulTopik: 'Asmaulhusna: Al-Hafizh dan Al-Wali',
    materiPokok: 'Mengenal Sifat Allah Maha Memelihara dan Maha Melindungi',
    rumusanTP:
      'Murid mampu mengartikan Asmaulhusna Al-Hafizh dan Al-Wali serta meneladaninya dengan gemar menjaga keselamatan diri dan menyayangi sesama teman di sekolah.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-a-kls2-shalat',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    elemen: ['Fikih'],
    judulTopik: 'Salat Fardu Lima Waktu & Bacaan Pokoknya',
    materiPokok: 'Nama Waktu Salat, Jumlah Rakaat, dan Doa Iftitah/Rukuk',
    rumusanTP:
      'Murid mampu menyebutkan nama-nama salat fardu lima waktu beserta jumlah rakaatnya dan mempraktikkan gerakan salat dengan tuma\'ninah.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-a-kls2-nuh',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    elemen: ['Sejarah Peradaban Islam (SPI)', 'Akhlak'],
    judulTopik: 'Kisah Keteladanan Nabi Nuh a.s. & Kerja Keras',
    materiPokok: 'Ketabahan Nabi Nuh a.s. dalam Berdakwah dan Bahtera',
    rumusanTP:
      'Murid mampu menceritakan keteladanan Nabi Nuh a.s. yang sabar, tekun bekerja keras, dan patuh pada perintah Allah Swt.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // =========================================================================
  // FASE B: KELAS 3 & 4 SD/MI (USIA 8–10 TAHUN)
  // =========================================================================
  {
    id: 'fase-b-kls3-alaq',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: 'Q.S. Al-\'Alaq: 1–5 (Perintah Membaca & Cinta Ilmu)',
    materiPokok: 'Wahyu Pertama dan Kewajiban Menuntut Ilmu',
    rumusanTP:
      'Murid mampu membaca, mengartikan kosa kata kunci, dan memahami pesan pokok Q.S. Al-\'Alaq: 1–5 tentang perintah membaca, belajar, dan mengagungkan Allah Swt.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-b-kls3-asmaulhusna',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    elemen: ['Akidah', 'Akhlak'],
    judulTopik: 'Asmaulhusna: Al-Malik, Al-Aziz, Al-Quddus, As-Salam, Al-Mu\'min',
    materiPokok: 'Lima Asmaulhusna Penguasa dan Penjaga Kedamaian',
    rumusanTP:
      'Murid mampu menjelaskan makna Asmaulhusna Al-Malik, Al-Aziz, Al-Quddus, As-Salam, dan Al-Mu\'min serta meneladaninya dengan hidup tertib, menjaga kesucian diri, dan menciptakan rasa aman di lingkungan kelas.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'fase-b-kls3-shalat-sunah',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    elemen: ['Fikih'],
    judulTopik: 'Salat Sunah Rawatib, Salat Dhuha & Salat Tahajud',
    materiPokok: 'Ketentuan dan Keutamaan Salat Sunah Harian',
    rumusanTP:
      'Murid memahami ketentuan, tata cara, dan keutamaan salat sunah rawatib, salat dhuha, serta salat tahajud dalam mempererat hubungan dengan Allah Swt.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-b-kls3-hijrah-madinah',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    elemen: ['Sejarah Peradaban Islam (SPI)', 'Akhlak'],
    judulTopik: 'Peristiwa Hijrah Nabi Muhammad saw. ke Madinah',
    materiPokok: 'Latar Belakang Hijrah dan Persaudaraan Kaum Muhajirin-Ansar',
    rumusanTP:
      'Murid mampu menganalisis sebab-sebab hijrah Nabi Muhammad saw. ke Yatsrib (Madinah) dan meneladani semangat tolong-menolong antara kaum Muhajirin dan kaum Ansar.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'fase-b-kls4-hujurat-tin',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis', 'Akhlak'],
    judulTopik: 'Q.S. Al-Hujurat: 13 & Q.S. At-Tin (Keragaman & Kemuliaan)',
    materiPokok: 'Pesan Pokok Keragaman Manusia dan Kemuliaan Taqwa',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengidentifikasi hukum bacaan tajwid, serta memahami pesan pokok Q.S. Al-Hujurat/49: 13 dan Q.S. At-Tin tentang fitrah keragaman manusia.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'fase-b-kls4-rasul-ululazmi',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    elemen: ['Akidah'],
    judulTopik: 'Sifat Wajib, Jaiz, Mustahil Rasul & 5 Rasul Ulul Azmi',
    materiPokok: 'Keteladanan Siddiq, Amanah, Tabligh, Fathanah & Ulul Azmi',
    rumusanTP:
      'Murid mampu mengidentifikasi sifat-sifat rasul Allah dan meneladani keteguhan hati lima Rasul Ulul Azmi (Nuh, Ibrahim, Musa, Isa, Muhammad saw.) dalam menghadapi ujian.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-b-kls4-tanda-balig',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    elemen: ['Fikih', 'Akhlak'],
    judulTopik: 'Menyambut Usia Balig (Tinjauan Fikih & Tinjauan Biologi)',
    materiPokok: 'Tanda-tanda Balig, Mandi Wajib, dan Konsekuensi Syariat',
    rumusanTP:
      'Murid mampu mengidentifikasi tanda-tanda usia balig menurut ilmu fikih dan ilmu biologi, memahami tata cara mandi wajib, serta siap menjalankan kewajiban syariat dengan bertanggung jawab.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-b-kls4-shalat-jumat-duha',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    elemen: ['Fikih', 'Akhlak'],
    judulTopik: 'Ketentuan Salat Jumat dan Salat Berjemaah',
    materiPokok: 'Hukum, Syarat Sah, Rukun Khotbah Jumat, dan Adab Masjid',
    rumusanTP:
      'Murid memahami ketentuan hukum, syarat, rukun, dan tata cara pelaksanaan salat Jumat serta pembiasaan salat fardu berjemaah di masjid.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-b-kls4-toleransi-piagam-madinah',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    elemen: ['Sejarah Peradaban Islam (SPI)', 'Akhlak'],
    judulTopik: 'Kisah Piagam Madinah & Kerukunan Hidup Bersama',
    materiPokok: 'Toleransi Antarsuku dan Agama dalam Piagam Madinah',
    rumusanTP:
      'Murid mampu memahami nilai-nilai kesepakatan damai dalam Piagam Madinah sebagai landasan hidup berdampingan secara harmonis antarsuku dan pemeluk agama yang berbeda.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },

  // =========================================================================
  // FASE C: KELAS 5 & 6 SD/MI (USIA 10–12 TAHUN)
  // =========================================================================
  {
    id: 'fase-c-kls5-al-maun',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis', 'Akhlak'],
    judulTopik: 'Pesan Pokok Q.S. Al-Ma\'un (Peduli Dhuafa & Anti-Riya)',
    materiPokok: 'Kandungan Surah Al-Ma\'un dan Larangan Menghardik Yatim',
    rumusanTP:
      'Murid mampu membaca dengan makhraj fasih, mengartikan potongan ayat, dan menganalisis pesan pokok Surah Al-Ma\'un tentang ciri-ciri pendusta agama serta menumbuhkan kepedulian pada anak yatim dan fakir miskin.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-c-kls5-asmaulhusna',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    elemen: ['Akidah'],
    judulTopik: 'Asmaulhusna: Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, Al-Ba\'its',
    materiPokok: 'Makna Kemandirian, Kekuatan, Kehidupan, dan Kebangkitan',
    rumusanTP:
      'Murid mampu menganalisis makna Asmaulhusna Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, dan Al-Ba\'its serta meneladaninya melalui sikap mandiri, teguh pendirian, dan menjaga kelestarian makhluk hidup.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-c-kls5-zakat-fitrah',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    elemen: ['Fikih'],
    judulTopik: 'Ketentuan Zakat Fitrah, Zakat Mal, Infak, dan Sedekah',
    materiPokok: 'Kewajiban Zakat Fitrah 2,5 Kg, Nisab, dan 8 Golongan Mustahik',
    rumusanTP:
      'Murid mampu menghitung takaran zakat fitrah per jiwa (2,5 kg atau 3,5 liter beras), membedakan konsep zakat mal, infak, dan sedekah, serta mengidentifikasi 8 golongan mustahik zakat sesuai syariat Islam.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-c-kls5-fathu-makkah',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    elemen: ['Sejarah Peradaban Islam (SPI)', 'Akhlak'],
    judulTopik: 'Peristiwa Fathu Makkah & Akhlak Pemaaf Rasulullah saw.',
    materiPokok: 'Pembebasan Kota Makkah Tanpa Pertumpahan Darah Tahun 8 H',
    rumusanTP:
      'Murid mampu menguraikan kronologi peristiwa Fathu Makkah dan Haji Wada\', serta meneladani kemuliaan akhlak Rasulullah saw. yang memaafkan lawan tanpa dendam dan menjunjung tinggi perdamaian.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'fase-c-kls5-hari-akhir',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    elemen: ['Akidah'],
    judulTopik: 'Iman kepada Hari Akhir (Tahapan Kiamat & Peristiwa Akhirat)',
    materiPokok: 'Tanda Kiamat Sughra/Kubra, Yaumul Ba\'ats, Mahsyar, Mizan, Jaza\'',
    rumusanTP:
      'Murid mampu memahami makna iman kepada hari akhir, menyebutkan tanda-tanda kiamat, mengurutkan tahapan alam akhirat, dan menjadikannya pendorong beramal saleh serta menjauhi perbuatan maksiat.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-c-kls5-haji-kurban',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    elemen: ['Fikih'],
    judulTopik: 'Ketentuan Ibadah Haji dan Penyembelihan Hewan Kurban',
    materiPokok: 'Syarat Istitha\'ah, Rukun Haji (Wukuf, Tawaf, Sa\'i), dan Syariat Kurban',
    rumusanTP:
      'Murid mampu menganalisis syarat, rukun, dan wajib haji, waktu pelaksanaan wukuf di Arafah (9 Dzulhijjah), serta memahami tata cara dan nilai keteladanan ibadah kurban Nabi Ibrahim dan Ismail a.s.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-c-kls5-ukhuwah',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    elemen: ['Akhlak'],
    judulTopik: 'Tiga Pilar Persaudaraan (Ukhuwah Islamiyah, Wathaniyah, Basyariyah)',
    materiPokok: 'Konsep Persaudaraan Iman, Bangsa, dan Sesama Umat Manusia',
    rumusanTP:
      'Murid mampu menjelaskan makna tiga pilar ukhuwah (Islamiyah, Wathaniyah, Basyariyah/Insaniyah) dan mempraktikkan sikap saling menghargai teman yang berbeda latar belakang suku dan agama di sekolah.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'fase-c-kls6-hujurat-baqarah',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis', 'Akhlak'],
    judulTopik: 'Q.S. Al-Hujurat: 13, Q.S. Al-Baqarah: 256 & Ali \'Imran: 64',
    materiPokok: 'Prinsip Lita\'arafu, Kebebasan Beragama, dan Kalimat Sawa\'',
    rumusanTP:
      'Murid mampu mengartikan penggalan ayat tentang kebinekaan (lita\'arafu), menganalisis prinsip tidak ada paksaan dalam beragama (Q.S. Al-Baqarah: 256), serta membangun dialog persaudaraan yang sejuk.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'fase-c-kls6-ad-dhuha-ala',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: 'Hukum Bacaan Tajwid & Pesan Pokok Q.S. Ad-Dhuha dan Q.S. Al-A\'la',
    materiPokok: 'Pesan Optimisme, Bersyukur atas Nikmat, dan Bertasbih',
    rumusanTP:
      'Murid mampu menerapkan hukum tajwid (hukum nun sukun/tanwin, mim sukun, mad thabi\'i), membaca lancar, dan menyimpulkan pesan optimisme hidup dari Q.S. Ad-Dhuha dan Q.S. Al-A\'la.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-c-kls6-halal-haram',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    elemen: ['Fikih'],
    judulTopik: 'Makanan dan Minuman Halal serta Menjauhi yang Haram',
    materiPokok: 'Ketentuan Halalan Thayyiban, Jenis Bangkai, dan Sertifikasi Halal MUI',
    rumusanTP:
      'Murid mampu menganalisis kriteria makanan dan minuman halalan thayyiban, mengidentifikasi hewan yang haram dikonsumsi (bangkai tertabrak/tercekik, darah, babi), dan pentingnya memilih produk bersertifikat halal.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-c-kls6-khulafaurrasyidin',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    elemen: ['Sejarah Peradaban Islam (SPI)', 'Akhlak'],
    judulTopik: 'Keteladanan Khulafaurrasyidin (Abu Bakar, Umar, Utsman, Ali)',
    materiPokok: 'Jasa Kodifikasi Al-Qur\'an, Gelar Ash-Shiddiq & Al-Faruq, Sifat Dermawan',
    rumusanTP:
      'Murid mampu meneladani kepemimpinan Khulafaurrasyidin: kejujuran Abu Bakar Ash-Shiddiq, ketegasan keadilan Umar bin Khattab Al-Faruq, kedermawanan Utsman bin Affan, dan kecerdasan Ali bin Abi Thalib.',
    rekomendasiModerasi: 'Syura (Musyawarah untuk Kemaslahatan Bersama)',
  },
  {
    id: 'fase-c-kls6-qada-qadar',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    elemen: ['Akidah'],
    judulTopik: 'Iman kepada Qada dan Qadar (Takdir Mubram & Muallaq)',
    materiPokok: 'Perbedaan Takdir yang Pasti dan Takdir yang Melibatkan Ikhtiar',
    rumusanTP:
      'Murid mampu membedakan konsep takdir mubram (mutlak, contoh: ajal/kematian) dan takdir muallaq (bisa diupayakan dengan ikhtiar dan doa, contoh: kepandaian/kesehatan), serta membiasakan sikap pantang menyerah dan tawakal.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-c-kls6-peduli-lingkungan',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    elemen: ['Akhlak', 'Fikih'],
    judulTopik: 'Fikih Lingkungan Hidup & Adab terhadap Alam (Peduli Sampah Plastik)',
    materiPokok: 'Larangan Berbuat Kerusakan di Bumi dan Hemat Sumber Daya Air',
    rumusanTP:
      'Murid mampu menganalisis dalil larangan membuat kerusakan di muka bumi (fasad fil ardh), mempraktikkan gaya hidup ramah lingkungan (mengurangi sampah plastik di sekolah), dan menghemat air bersih.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-c-kls6-puasa-sunah',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    elemen: ['Fikih'],
    judulTopik: 'Ketentuan Puasa Wajib Ramadan dan Puasa Sunah',
    materiPokok: 'Syarat Sah, Rukun, Pembatal Puasa, serta Puasa Senin-Kamis & Arafah',
    rumusanTP:
      'Murid memahami ketentuan puasa wajib di bulan Ramadan, hikmah pensyariatannya, serta macam-macam puasa sunah (Senin-Kamis, Arafah, Asyura) dan hari-hari yang diharamkan berpuasa.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },

  // =========================================================================
  // FASE D: KELAS 7–9 SMP/MTS (USIA 13–15 TAHUN)
  // =========================================================================
  {
    id: 'fase-d-kls7-ilmu-lingkungan',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: 'Q.S. Al-Mujadilah: 11 & Ar-Rahman: 33 (Semangat Menuntut Ilmu)',
    materiPokok: 'Kewajiban Menuntut Ilmu, Hukum Tajwid Al-Syamsiyah/Qamariyah, dan Eksplorasi Alam',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menganalisis hukum tajwid, dan mengimplementasikan pesan pokok Q.S. Al-Mujadilah/58: 11 dan Ar-Rahman/55: 33 tentang derajat orang berilmu dan semangat meneliti alam.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-d-kls7-tabayyun-anti-bullying',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis', 'Akhlak'],
    judulTopik: 'Adab Bermedia Sosial (Tabayyun Q.S. Al-Hujurat: 6 & Anti-Perundungan)',
    materiPokok: 'Sikap Tabayyun, Menghindari Ghibah/Fitnah, dan Pencegahan Cyberbullying',
    rumusanTP:
      'Murid memahami kandungan Q.S. Al-Hujurat/49: 6 dan 12 tentang kewajiban tabayyun, menerapkan etika komunikasi digital santun, dan menolak tegas segala bentuk perundungan (bullying) di sekolah maupun media sosial.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'fase-d-kls7-malaikat-allah',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    elemen: ['Akidah'],
    judulTopik: 'Iman kepada Malaikat-Malaikat Allah Swt. & Tugasnya',
    materiPokok: 'Nama 10 Malaikat, Sifat Gaib, dan Pengawasan Amal Perbuatan',
    rumusanTP:
      'Murid mampu memahami sifat-sifat malaikat dan meneladani ketaatan mereka dengan membiasakan sikap jujur dan merasa selalu diawasi oleh Allah Swt. (muraqabatullah) dalam beraktivitas.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-d-kls7-shalat-jamak-qasar',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    elemen: ['Fikih'],
    judulTopik: 'Rukhsah Salat: Salat Jamak, Qasar, dan Salat dalam Keadaan Sakit',
    materiPokok: 'Kemudahan (Rukhsah) Ibadah bagi Musafir dan Orang Sakit',
    rumusanTP:
      'Murid mampu menjelaskan konsep rukhsah dalam Islam, mengidentifikasi syarat dan tata cara salat jamak takdim, jamak takhir, qasar, serta salat bagi orang yang sakit.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-d-kls7-bani-umayyah',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: 'Peradaban Islam Masa Daulah Bani Umayyah di Damaskus & Andalusia',
    materiPokok: 'Kemajuan Pemerintahan, Arsitektur, dan Ilmu Pengetahuan Umayyah',
    rumusanTP:
      'Murid mampu menganalisis sejarah berdirinya Daulah Bani Umayyah, perkembangan administrasi negara, serta kemajuan ilmu pengetahuan di Damaskus dan Cordoba (Andalusia).',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'fase-d-kls8-kitab-allah',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    elemen: ['Akidah'],
    judulTopik: 'Iman kepada Kitab-Kitab Allah Swt. (Taurat, Zabur, Injil, Al-Qur\'an)',
    materiPokok: 'Kedudukan Al-Qur\'an sebagai Penyempurna Kitab Samawi Sebelumnya',
    rumusanTP:
      'Murid mampu memahami kedudukan dan isi pokok kitab-kitab suci yang diturunkan Allah Swt. serta menjadikan Al-Qur\'an sebagai pedoman utama dalam berpikir dan bersikap.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'fase-d-kls8-sujud-khusus',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    elemen: ['Fikih'],
    judulTopik: 'Ketentuan Sujud Syukur, Sujud Sahwi, dan Sujud Tilawah',
    materiPokok: 'Sebab, Syarat, Doa, dan Praktik Tata Cara Ketiga Macam Sujud',
    rumusanTP:
      'Murid mampu membedakan sebab, bacaan, dan tata cara pelaksanaan sujud syukur atas nikmat, sujud sahwi karena lupa dalam salat, dan sujud tilawah saat mendengar ayat sajdah.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-d-kls8-bani-abbasiyah',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: 'Masa Keemasan Bani Abbasiyah & Baitul Hikmah',
    materiPokok: 'Kontribusi Ilmuwan Muslim (Ibnu Sina, Al-Khawarizmi, Al-Biruni) di Baghdad',
    rumusanTP:
      'Murid mampu meneladani etos keilmuan para cendekiawan muslim masa Dinasti Abbasiyah, peran perpustakaan Baitul Hikmah, dan pengaruhnya bagi kemajuan sains dunia.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-d-kls8-kurban-akikah',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    elemen: ['Fikih'],
    judulTopik: 'Ketentuan Penyembelihan Hewan, Kurban, dan Akikah',
    materiPokok: 'Syarat Hewan Sembelihan Syar\'i, Waktu, dan Pembagian Daging Kurban/Akikah',
    rumusanTP:
      'Murid mampu menganalisis tata cara penyembelihan hewan halal secara syar\'i, membedakan ketentuan kurban dan akikah, serta menumbuhkan kepedulian sosial.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-d-kls9-wali-songo',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    elemen: ['Sejarah Peradaban Islam (SPI)', 'Akhlak'],
    judulTopik: 'Sejarah Masuknya Islam di Nusantara & Strategi Dakwah Wali Songo',
    materiPokok: 'Pendekatan Kultural, Wayang, Gamelan, dan Asimilasi Budaya Damai',
    rumusanTP:
      'Murid mampu menganalisis jalur masuknya Islam ke Nusantara dan meneladani metode dakwah kearifan lokal (akulturasi budaya tanpa kekerasan) yang diusung oleh para Wali Songo.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'fase-d-kls9-zakat-mal',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    elemen: ['Fikih'],
    judulTopik: 'Zakat Mal, Perniagaan, Pertanian, Emas & Perak',
    materiPokok: 'Nisab, Haul, dan Perhitungan Zakat Mal untuk Keadilan Sosial',
    rumusanTP:
      'Murid mampu menghitung nisab dan besaran zakat mal (emas, perak, perniagaan, pertanian, dan profesi) serta menyimpulkan fungsinya dalam mengentaskan kemiskinan.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },

  // =========================================================================
  // FASE E & F: KELAS 10–12 SMA/SMK/MA (USIA 16–18 TAHUN)
  // =========================================================================
  {
    id: 'fase-e-kls10-kebaikan-etos-kerja',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis', 'Akhlak'],
    judulTopik: 'Q.S. Al-Ma\'idah: 48 & Q.S. At-Taubah: 105 (Etos Kerja & Kompetisi Kebaikan)',
    materiPokok: 'Fastabiqul Khairat, Integritas Kerja, dan Etika Profesi Islami',
    rumusanTP:
      'Murid mampu menganalisis hukum tajwid dan pesan pokok Q.S. Al-Ma\'idah/5: 48 dan Q.S. At-Taubah/9: 105 tentang perintah berkompetisi dalam kebaikan dan memiliki etos kerja berintegritas tinggi.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-e-kls10-syuabul-iman',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    elemen: ['Akidah'],
    judulTopik: 'Cabang-Cabang Keimanan (Syu\'abul Iman: Niat, Lisan, Perbuatan)',
    materiPokok: '77 Cabang Iman dan Hubungan Integritas Moral dengan Ketaatan',
    rumusanTP:
      'Murid mampu menganalisis cabang-cabang keimanan (syu\'abul iman) yang mencakup ranah niat, lisan, dan perbuatan konkret dalam kehidupan bermasyarakat dan berbangsa.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'fase-e-kls10-muamalah-kontemporer',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    elemen: ['Fikih'],
    judulTopik: 'Fikih Muamalah: Asuransi Syariah, Perbankan, dan Koperasi Syariah',
    materiPokok: 'Prinsip Ta\'awun (Tolong Menolong), Larangan Riba, Gharar, dan Maisir',
    rumusanTP:
      'Murid mampu mengevaluasi prinsip dasar fikih muamalah kontemporer, membedakan akad asuransi syariah (takaful), perbankan syariah, serta menghindari praktik riba dan judi daring (online gambling).',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-e-kls10-organisasi-islam',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: 'Peran Ulama dan Organisasi Islam dalam Memperjuangkan Kemerdekaan RI',
    materiPokok: 'Kontribusi Ormas Islam (Sarekat Islam, Muhammadiyah, NU) bagi NKRI',
    rumusanTP:
      'Murid mampu meneladani komitmen kebangsaan para tokoh ulama dan organisasi Islam di Indonesia dalam merumuskan dasar negara dan mempertahankan kedaulatan NKRI.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'fase-f-kls11-berpikir-kritis-lingkungan',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    elemen: ['Al-Qur\'an dan Hadis', 'Akhlak'],
    judulTopik: 'Q.S. Ali \'Imran: 190–191 (Berpikir Kritis & Kelestarian Alam Semesta)',
    materiPokok: 'Karakter Ulul Albab, Tadabbur Alam, dan Menolak Eksploitasi Merusak',
    rumusanTP:
      'Murid mampu membaca tartil dan menganalisis kandungan Q.S. Ali \'Imran/3: 190–191 tentang ciri kaum ulul albab yang memadukan zikir dan berpikir kritis dalam memelihara keseimbangan lingkungan hidup.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'fase-f-kls11-maqashid-syariah',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    elemen: ['Fikih', 'Akidah'],
    judulTopik: 'Prinsip Maqashid Syariah & Al-Kulliyat Al-Khamsah',
    materiPokok: 'Perlindungan Agama (Ad-Din), Jiwa (An-Nafs), Akal (Al-\'Aql), Keturunan (An-Nasl), Harta (Al-Mal)',
    rumusanTP:
      'Murid mampu menganalisis tujuan umum hukum Islam (Maqashid Syariah) dalam melindungi lima hak asasi dasar (Al-Kulliyat Al-Khamsah) serta merefleksikannya dalam solusi permasalahan sosial modern.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-f-kls11-munakahat',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Genap',
    elemen: ['Fikih', 'Akhlak'],
    judulTopik: 'Fikih Munakahat (Pernikahan dalam Islam & Ketahanan Keluarga)',
    materiPokok: 'Rukun Nikah, Sakinah Mawaddah Warahmah, Hak-Kewajiban Suami Istri, dan Pencegahan Perceraian',
    rumusanTP:
      'Murid mampu mengevaluasi ketentuan hukum pernikahan dalam Islam, syarat sah, hikmah membina keluarga sakinah mawaddah wa rahmah, serta kesiapan mental mencegah pernikahan dini yang tidak matang.',
    rekomendasiModerasi: 'Syura (Musyawarah untuk Kemaslahatan Bersama)',
  },
  {
    id: 'fase-f-kls12-waris-mawaris',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Ganjil',
    elemen: ['Fikih'],
    judulTopik: 'Hukum Waris Islam (Mawaris / Faraidh) & Keadilan Keluarga',
    materiPokok: 'Furudul Muqaddarah, Ashabah, Hijab, dan Perhitungan Pembagian Harta Waris',
    rumusanTP:
      'Murid mampu menganalisis ketentuan hukum faraidh (waris Islam), bagian ahli waris (furudul muqaddarah dan ashabah), serta mengaplikasikan perhitungan pembagian waris secara adil guna mencegah sengketa keluarga.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'fase-f-kls12-ijtihad-moderasi',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    elemen: ['Akidah', 'Akhlak'],
    judulTopik: 'Ijtihad, Mazhab Fikih & Penguatan Moderasi Beragama Global',
    materiPokok: 'Urgensi Ijtihad, Menghormati Khilafiyah Furu\'iyah, dan Rahmatan Lil \'Alamin',
    rumusanTP:
      'Murid mampu menguraikan peran ijtihad dan keberagaman mazhab fikih sebagai khazanah rahmat Islam, serta menunjukkan sikap tasamuh dan komitmen kebangsaan dalam mewujudkan perdamaian dunia.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
];

/**
 * Filter topics based on active Fase and selected Kelas.
 * Returns topics specifically for that class plus any general topics in that phase.
 */
export function getTopicsForFaseAndKelas(
  fase: FaseCode,
  kelas: string
): CurriculumTopic[] {
  // 1. Exact match on both fase and kelas
  const exactMatch = CURRICULUM_DATABASE_CP020.filter(
    (t) => t.fase === fase && (t.kelas === kelas || t.kelas === 'Semua Kelas')
  );

  if (exactMatch.length > 0) {
    return exactMatch;
  }

  // 2. Fallback to all topics within the same Fase
  return CURRICULUM_DATABASE_CP020.filter((t) => t.fase === fase);
}
