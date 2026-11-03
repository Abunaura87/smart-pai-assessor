import { ElemenPAI, FaseCode } from '../types/assessment';

export interface CurriculumTopic {
  id: string;
  fase: FaseCode;
  kelas: string; // 'Kelas 1 SD/MI', 'Kelas 2 SD/MI', etc.
  semester: 'Ganjil' | 'Genap' | 'Semua';
  babLabel?: string; // e.g. 'Paket SAS Ganjil', 'Bab 1', 'Bab 6'
  isPaketGabungan?: boolean;
  elemen: ElemenPAI[];
  judulTopik: string;
  materiPokok: string;
  rumusanTP: string;
  rekomendasiModerasi?: string;
}

const ALL_FIVE_ELEMEN: ElemenPAI[] = [
  'Al-Qur\'an dan Hadis',
  'Akidah',
  'Akhlak',
  'Fikih',
  'Sejarah Peradaban Islam (SPI)',
];

const ATS_THREE_ELEMEN: ElemenPAI[] = [
  'Al-Qur\'an dan Hadis',
  'Akidah',
  'Akhlak',
];

export const CURRICULUM_DATABASE_CP020: CurriculumTopic[] = [
  // =========================================================================
  // A. FASE A — KELAS 1 SD/MI (SEMESTER 1 GANJIL & SEMESTER 2 GENAP)
  // =========================================================================
  // --- Kelas 1 SD/MI · Semester 1 (Ganjil) ---
  {
    id: 'kls1-smt1-paket-sas',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS GANJIL KELAS 1] Gabungan 5 Elemen PAI Kelas 1 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Semester Ganjil Kelas 1 (Huruf Hijaiah & Al-Fatihah, 6 Rukun Iman, Basmalah & Hamdalah, 5 Rukun Islam & Syahadatain, Kisah 25 Nabi)',
    rumusanTP:
      'Murid mampu mengenal huruf hijaiah berharakat dasar dan melafalkan Q.S. Al-Fatihah, menyebutkan 6 rukun iman, membiasakan membaca basmalah dan hamdalah, mengenal 5 rukun Islam beserta syahadatain, serta meneladani kisah nabi dan rasul.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls1-smt1-paket-ats',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GANJIL KELAS 1] Gabungan Tengah Semester Ganjil (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 1 Ganjil (Huruf Hijaiah & Q.S. Al-Fatihah, 6 Rukun Iman, Basmalah & Hamdalah)',
    rumusanTP:
      'Murid mampu mengenal huruf hijaiah berharakat fathah, kasrah, dammah, menghafal Q.S. Al-Fatihah, menyebutkan enam rukun iman, serta membiasakan kalimat thayyibah basmalah dan hamdalah.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls1-smt1-bab1',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Aku Cinta Al-Qur\'an: Huruf Hijaiah & Harakat Dasar (Fathah, Kasrah, Dammah) & Q.S. Al-Fatihah',
    materiPokok: 'Huruf Hijaiah Berharakat Dasar (Fathah, Kasrah, Dammah) dan Q.S. Al-Fatihah',
    rumusanTP:
      'Murid mampu mengenal, melafalkan, dan membedakan huruf hijaiah tunggal berharakat fathah, kasrah, dan dammah serta menghafal Q.S. Al-Fatihah dengan makhraj yang benar sebagai wujud cinta Al-Qur\'an.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls1-smt1-bab2',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Mengenal Rukun Iman (6 Rukun Iman) & Cinta Allah serta Rasul-Nya',
    materiPokok: 'Enam Rukun Iman serta Cinta kepada Allah Swt. dan Rasul-Nya',
    rumusanTP:
      'Murid mampu menyebutkan enam rukun iman secara berurutan dan menunjukkan bukti kecintaan kepada Allah Swt. (Pencipta alam semesta) serta Rasulullah saw. dalam kehidupan sehari-hari.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls1-smt1-bab3',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Aku Suka Membaca Basmalah, Hamdalah, serta Bersikap Santun & Bersyukur',
    materiPokok: 'Kalimah Thayyibah Basmalah, Hamdalah, Sikap Santun, dan Mensyukuri Nikmat',
    rumusanTP:
      'Murid terbiasa melafalkan basmalah saat memulai kegiatan dan hamdalah setelah selesai beraktivitas, serta menunjukkan sikap santun kepada orang tua, guru, dan teman.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls1-smt1-bab4',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Mengenal 5 Rukun Islam dan Dua Kalimat Syahadat (Syahadatain)',
    materiPokok: 'Lima Rukun Islam serta Lafal dan Arti Syahadat Tauhid & Syahadat Rasul',
    rumusanTP:
      'Murid mampu menyebutkan lima rukun Islam secara berurutan serta melafalkan dua kalimat syahadat (syahadat tauhid dan syahadat rasul) beserta artinya dengan benar.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls1-smt1-bab5',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Nabi dan Rasul Panutanku: Mengenal 25 Nabi dan Mukjizatnya',
    materiPokok: 'Pengertian Nabi dan Rasul, 25 Nabi Utusan Allah, serta Mukjizat Para Nabi',
    rumusanTP:
      'Murid mampu mengenal perbedaan nabi dan rasul, menyebutkan nama-nama nabi utusan Allah Swt., serta meneladani sifat mulia dan mukjizat para nabi dalam kehidupan sehari-hari.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // --- Kelas 1 SD/MI · Semester 2 (Genap) ---
  {
    id: 'kls1-smt2-paket-sat',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET SAT GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT GENAP KELAS 1] Gabungan 5 Elemen PAI Kelas 1 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Semester Genap Kelas 1 (Harakat Tanwin & Q.S. Al-Ikhlas, Ar-Rahman & Ar-Rahim, Berterima Kasih & Disiplin, Bersuci/Wudu/Tayamum, Kisah Nabi Adam a.s.)',
    rumusanTP:
      'Murid mampu membaca huruf hijaiah berharakat tanwin dan menghafal Q.S. Al-Ikhlas, meneladani Asmaulhusna Ar-Rahman dan Ar-Rahim, membiasakan berterima kasih dan disiplin, mempraktikkan tata cara bersuci (istinja, wudu, tayamum), serta meneladani kisah Nabi Adam a.s.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls1-smt2-paket-ats',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET ATS GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GENAP KELAS 1] Gabungan Tengah Semester Genap (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 1 Genap (Harakat Tanwin & Q.S. Al-Ikhlas, Ar-Rahman & Ar-Rahim, Berterima Kasih & Disiplin)',
    rumusanTP:
      'Murid mampu membaca harakat tanwin dan melafalkan Q.S. Al-Ikhlas, memahami makna Ar-Rahman dan Ar-Rahim, serta menunjukkan perilaku berterima kasih dan disiplin di rumah maupun sekolah.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls1-smt2-bab6',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Al-Qur\'an Pedoman Hidupku: Harakat Tanwin (Fathatain, Kasratain, Dammatain) & Q.S. Al-Ikhlas',
    materiPokok: 'Harakat Tanwin (Fathatain, Kasratain, Dammatain) dan Pesan Pokok Q.S. Al-Ikhlas',
    rumusanTP:
      'Murid mampu membaca huruf hijaiah berharakat fathatain, kasratain, dan dammatain dengan tepat serta menghafal Q.S. Al-Ikhlas beserta pesan pokok keesaan Allah Swt. (Al-Ahad).',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls1-smt2-bab7',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Kasih Sayang terhadap Sesama: Asmaulhusna Ar-Rahman dan Ar-Rahim & Kasih Sayang Nabi Muhammad saw.',
    materiPokok: 'Asmaulhusna Ar-Rahman (Maha Pengasih), Ar-Rahim (Maha Penyayang), dan Teladan Kasih Sayang Nabi',
    rumusanTP:
      'Murid mampu menjelaskan arti Asmaulhusna Ar-Rahman dan Ar-Rahim serta meneladani sifat kasih sayang Nabi Muhammad saw. terhadap keluarga, teman, dan makhluk ciptaan Allah Swt.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls1-smt2-bab8',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Aku Suka Berterima Kasih dan Disiplin',
    materiPokok: 'Adab Berterima Kasih kepada Sesama dan Membiasakan Hidup Disiplin',
    rumusanTP:
      'Murid mampu membiasakan sikap berterima kasih saat menerima bantuan serta menerapkan perilaku disiplin waktu, tertib belajar, dan mematuhi aturan di sekolah.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls1-smt2-bab9',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Membiasakan Hidup Bersih: Tata Cara Bersuci (Istinja, Wudu, dan Tayamum)',
    materiPokok: 'Pengertian Bersuci (Thaharah), Tata Cara Istinja, Urutan Rukun Wudu, dan Tayamum',
    rumusanTP:
      'Murid memahami arti bersuci dari najis dan hadas, serta mampu mempraktikkan tata cara istinja, urutan gerakan wudu, dan tayamum dengan tertib serta hemat air.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls1-smt2-bab10',
    fase: 'Fase A',
    kelas: 'Kelas 1 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Nabi Adam a.s. Manusia Pertama: Kisah Keteladanan, Meminta Maaf, dan Bersabar',
    materiPokok: 'Kisah Penciptaan Nabi Adam a.s., Berani Meminta Maaf, dan Bersabar Menghadapi Ujian',
    rumusanTP:
      'Murid mampu menceritakan kisah keteladanan Nabi Adam a.s. sebagai manusia pertama, serta membiasakan sikap berani mengakui kesalahan, meminta maaf, dan bersabar.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },

  // =========================================================================
  // B. FASE A — KELAS 2 SD/MI (SEMESTER 1 GANJIL & SEMESTER 2 GENAP)
  // =========================================================================
  // --- Kelas 2 SD/MI · Semester 1 (Ganjil) ---
  {
    id: 'kls2-smt1-paket-sas',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS GANJIL KELAS 2] Gabungan 5 Elemen PAI Kelas 2 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Semester Ganjil Kelas 2 (Q.S. An-Nas & Huruf Bersambung, Asmaulhusna Al-Hafizh/Al-Wali/Al-\'Alim/Al-Khabir, Sikap Empati & Jujur, Azan/Ikamah/Salat Fardu, Kisah Nabi Nuh a.s.)',
    rumusanTP:
      'Murid mampu menghafal Q.S. An-Nas dan membaca huruf hijaiah bersambung, memahami Asmaulhusna Al-Hafizh, Al-Wali, Al-\'Alim, dan Al-Khabir, menerapkan perilaku empati, bertutur lembut, dan jujur, mempraktikkan azan, ikamah, dan salat fardu, serta meneladani kisah Nabi Nuh a.s.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls2-smt1-paket-ats',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GANJIL KELAS 2] Gabungan Tengah Semester Ganjil (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 2 Ganjil (Q.S. An-Nas & Makharijul Huruf, Asmaulhusna Al-Hafizh/Al-Wali/Al-\'Alim/Al-Khabir, Perilaku Empati & Jujur)',
    rumusanTP:
      'Murid mampu membaca dan menghafal Q.S. An-Nas, mengartikan Asmaulhusna Al-Hafizh, Al-Wali, Al-\'Alim, dan Al-Khabir, serta membiasakan sikap empati, jujur, dan bertutur kata lembut.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls2-smt1-bab1',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Ayo Belajar Al-Qur\'an: Q.S. An-Nas & Huruf Hijaiah Bersambung / Makharijul Huruf',
    materiPokok: 'Bacaan, Hafalan, dan Pesan Pokok Q.S. An-Nas serta Huruf Hijaiah Bersambung',
    rumusanTP:
      'Murid mampu membaca huruf hijaiah bersambung sesuai makharijul huruf serta menghafal dan memahami pesan pokok Q.S. An-Nas tentang memohon perlindungan hanya kepada Allah Swt.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls2-smt1-bab2',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Mari Mengenal Allah Swt.: Asmaulhusna Al-Hafizh, Al-Wali, Al-\'Alim, dan Al-Khabir',
    materiPokok: 'Makna dan Keteladanan Asmaulhusna Al-Hafizh, Al-Wali, Al-\'Alim, dan Al-Khabir',
    rumusanTP:
      'Murid mampu menjelaskan arti Asmaulhusna Al-Hafizh (Maha Memelihara), Al-Wali (Maha Melindungi), Al-\'Alim (Maha Mengetahui), dan Al-Khabir (Maha Teliti) serta meneladaninya dalam belajar dan keseharian.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls2-smt1-bab3',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Ayo Berperilaku Terpuji: Sikap Empati, Bertutur Kata Lembut, Jujur, dan Menyayangi Sesama',
    materiPokok: 'Sikap Empati, Bertutur Kata Lembut, Jujur, serta Kasih Sayang terhadap Sesama dan Lingkungan',
    rumusanTP:
      'Murid mampu menunjukkan perilaku empati terhadap teman, bertutur kata lembut kepada orang tua dan guru, bersikap jujur, serta menyayangi sesama makhluk ciptaan Allah Swt.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls2-smt1-bab4',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Alhamdulillah Aku Bisa Salat: Ketentuan Azan, Ikamah, dan Salat Fardu',
    materiPokok: 'Lafal Azan dan Ikamah serta Ketentuan, Gerakan, dan Bacaan Salat Fardu Lima Waktu',
    rumusanTP:
      'Murid mampu melafalkan bacaan azan dan ikamah, menyebutkan lima waktu salat fardu beserta jumlah rakaatnya, serta mempraktikkan gerakan dan bacaan salat dengan tertib.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls2-smt1-bab5',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Asyiknya Belajar Kisah Nabi Nuh a.s.: Dakwah, Kesabaran, dan Kerja Keras',
    materiPokok: 'Kisah Keteladanan Dakwah Nabi Nuh a.s., Pembuatan Bahtera, Sikap Sabar dan Kerja Keras',
    rumusanTP:
      'Murid mampu menceritakan kisah perjuangan dakwah Nabi Nuh a.s. serta meneladani sikap sabar, teguh iman, dan bekerja keras dalam kehidupan sehari-hari.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // --- Kelas 2 SD/MI · Semester 2 (Genap) ---
  {
    id: 'kls2-smt2-paket-sat',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET SAT GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT GENAP KELAS 2] Gabungan 5 Elemen PAI Kelas 2 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Semester Genap Kelas 2 (Q.S. Al-Falaq & Al-Kautsar, 10 Malaikat Allah, Hidup Bersih/Rapi/Teratur, Zikir & Doa Salat, Kisah Nabi Ibrahim & Ismail a.s.)',
    rumusanTP:
      'Murid mampu membaca dan menghafal Q.S. Al-Falaq dan Q.S. Al-Kautsar, mengenal 10 malaikat Allah dan tugasnya, membiasakan gaya hidup bersih, rapi, dan teratur, melafalkan zikir dan doa sesudah salat, serta meneladani kisah Nabi Ibrahim a.s. dan Nabi Ismail a.s.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls2-smt2-paket-ats',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET ATS GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GENAP KELAS 2] Gabungan Tengah Semester Genap (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 2 Genap (Q.S. Al-Falaq & Al-Kautsar, 10 Malaikat Allah, Gaya Hidup Bersih, Rapi, dan Teratur)',
    rumusanTP:
      'Murid mampu menghafal Q.S. Al-Falaq dan Q.S. Al-Kautsar, menyebutkan nama 10 malaikat Allah beserta tugasnya, serta menerapkan perilaku hidup bersih, rapi, dan teratur.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls2-smt2-bab6',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Senang Bisa Membaca Al-Qur\'an: Q.S. Al-Falaq dan Q.S. Al-Kautsar',
    materiPokok: 'Bacaan, Hafalan, dan Pesan Pokok Q.S. Al-Falaq dan Q.S. Al-Kautsar',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menghafal, serta memahami pesan pokok Q.S. Al-Falaq tentang berlindung kepada Allah Swt. dan Q.S. Al-Kautsar tentang mensyukuri nikmat melalui salat dan berkurban.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls2-smt2-bab7',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Ayo Mengenal Malaikat-Malaikat Allah dan Tugasnya',
    materiPokok: 'Pengertian Iman kepada Malaikat serta 10 Nama Malaikat Allah dan Tugasnya',
    rumusanTP:
      'Murid mampu menjelaskan pengertian beriman kepada malaikat Allah Swt., menyebutkan 10 nama malaikat beserta tugasnya, dan meneladani sifat taat malaikat dalam beribadah.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls2-smt2-bab8',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Aku Senang Bisa Berakhlak Terpuji: Gaya Hidup Bersih, Rapi, dan Teratur',
    materiPokok: 'Perilaku Hidup Bersih, Rapi, dan Teratur di Rumah serta Sekolah',
    rumusanTP:
      'Murid mampu menjelaskan arti hidup bersih, rapi, dan teratur sesuai hadis kebersihan sebagian dari iman, serta membiasakannya dalam merawat badan, pakaian, dan lingkungan kelas.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls2-smt2-bab9',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Ayo Zikir dan Doa Setelah Salat',
    materiPokok: 'Bacaan Zikir (Istighfar, Tasbih, Tahmid, Takbir, Tahlil) dan Doa Sesudah Salat Fardu',
    rumusanTP:
      'Murid mampu memahami arti zikir dan doa setelah salat serta melafalkan bacaan istighfar, subhanallah, alhamdulillah, allahu akbar, dan doa untuk kedua orang tua dengan khusyuk.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls2-smt2-bab10',
    fase: 'Fase A',
    kelas: 'Kelas 2 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Asyiknya Belajar Kisah Ayah Para Nabi: Keteladanan Nabi Ibrahim a.s. dan Nabi Ismail a.s.',
    materiPokok: 'Kisah Keteguhan Tauhid Nabi Ibrahim a.s., Pembangunan Ka\'bah, dan Ketaatan Nabi Ismail a.s.',
    rumusanTP:
      'Murid mampu menceritakan kisah keteladanan Nabi Ibrahim a.s. dan Nabi Ismail a.s. serta meneladani sikap patuh kepada Allah Swt. dan berbakti kepada orang tua.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // =========================================================================
  // C. FASE B — KELAS 3 SD/MI (SEMESTER 1 GANJIL & SEMESTER 2 GENAP)
  // =========================================================================
  // --- Kelas 3 SD/MI · Semester 1 (Ganjil) ---
  {
    id: 'kls3-smt1-paket-sas',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS GANJIL KELAS 3] Gabungan 5 Elemen PAI Kelas 3 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Semester Ganjil Kelas 3 (Q.S. Al-\'Alaq 1–5 & Qalqalah, Sifat Allah & Al-Wahhab/Al-Kabir, Berbakti kepada Orang Tua & Guru, Puasa Ramadan, Sejarah Arab Pra-Islam & Masa Remaja Nabi)',
    rumusanTP:
      'Murid mampu memahami Q.S. Al-\'Alaq ayat 1–5 dan hukum bacaan qalqalah, mengidentifikasi sifat wajib, mustahil, jaiz Allah serta Asmaulhusna Al-Wahhab dan Al-Kabir, menerapkan adab berbakti kepada orang tua dan guru, memahami ketentuan puasa Ramadan, serta meneladani kisah masa remaja Nabi Muhammad saw.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls3-smt1-paket-ats',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GANJIL KELAS 3] Gabungan Tengah Semester Ganjil (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 3 Ganjil (Q.S. Al-\'Alaq 1–5 & Qalqalah, Sifat Allah & Al-Wahhab/Al-Kabir, Berbakti kepada Orang Tua & Guru)',
    rumusanTP:
      'Murid mampu membaca Q.S. Al-\'Alaq ayat 1–5 dan mengidentifikasi huruf qalqalah, menjelaskan sifat-sifat Allah serta Asmaulhusna Al-Wahhab dan Al-Kabir, serta mempraktikkan sikap hormat kepada orang tua dan guru.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls3-smt1-bab1',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Asyiknya Belajar Q.S. Al-\'Alaq Ayat 1–5 & Hukum Bacaan Qalqalah',
    materiPokok: 'Bacaan, Arti, Pesan Pokok Q.S. Al-\'Alaq Ayat 1–5 dan Hukum Tajwid Qalqalah (Sughra & Kubra)',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengidentifikasi lima huruf qalqalah (ba, jim, dal, tha, qaf), menghafal, serta menyimpulkan pesan pokok Q.S. Al-\'Alaq ayat 1–5 tentang perintah membaca dan menuntut ilmu.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls3-smt1-bab2',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Ayo Mengenal Tuhan Kita: Sifat Wajib, Mustahil, Jaiz Allah & Asmaulhusna Al-Wahhab dan Al-Kabir',
    materiPokok: 'Sifat Wajib, Mustahil, dan Jaiz bagi Allah Swt. serta Asmaulhusna Al-Wahhab dan Al-Kabir',
    rumusanTP:
      'Murid mampu menjelaskan pembagian sifat Wajib (20 sifat), Mustahil, dan Jaiz bagi Allah Swt., serta memahami makna Asmaulhusna Al-Wahhab (Maha Pemberi Karunia) dan Al-Kabir (Maha Besar).',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls3-smt1-bab3',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Perilaku Terpuji adalah Kepribadianku: Berbakti kepada Orang Tua, Guru, dan Menghormati Orang Lain',
    materiPokok: 'Adab Birrul Walidain (Berbakti kepada Orang Tua), Taat kepada Guru, dan Menghargai Sesama',
    rumusanTP:
      'Murid mampu menjelaskan cara berbakti kepada kedua orang tua dan guru serta menunjukkan sikap menghormati orang lain yang berbeda usia maupun latar belakang.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls3-smt1-bab4',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Aku Bangga Mampu Berpuasa: Ketentuan, Syarat, Rukun, dan Hikmah Puasa Ramadan',
    materiPokok: 'Syarat Wajib, Syarat Sah, Rukun, Sunah, Hal Pembatal, dan Hikmah Puasa Ramadan',
    rumusanTP:
      'Murid mampu menjelaskan pengertian puasa menurut bahasa dan istilah, membedakan syarat wajib, syarat sah (mumayyiz), dan rukun puasa Ramadan, serta menyebutkan hal-hal yang membatalkan puasa.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls3-smt1-bab5',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Aku Suka Belajar Sejarah Islam: Arab Pra-Islam, Kelahiran, dan Masa Remaja Nabi Muhammad saw. (Al-Amin)',
    materiPokok: 'Kondisi Masyarakat Arab Pra-Islam, Peristiwa Kelahiran, dan Kejujuran Masa Muda Nabi Muhammad saw.',
    rumusanTP:
      'Murid mampu menceritakan kondisi masyarakat Arab sebelum Islam, kisah kelahiran dan masa remaja Nabi Muhammad saw., serta meneladani sifat jujur dan dapat dipercaya (Al-Amin).',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // --- Kelas 3 SD/MI · Semester 2 (Genap) ---
  {
    id: 'kls3-smt2-paket-sat',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET SAT GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT GENAP KELAS 3] Gabungan 5 Elemen PAI Kelas 3 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Semester Genap Kelas 3 (Hadis Salat Berjamaah, Iman kepada Kitab Allah, Kalimah Thayyibah & Husnuzan, Salat Rawatib, Kisah Kerasulan Nabi Muhammad saw.)',
    rumusanTP:
      'Murid mampu memahami hadis keutamaan salat berjamaah, meyakini empat kitab suci Allah Swt., membiasakan kalimah thayyibah (Subhanallah, Masyaallah, Insyaallah, Allahu Akbar) dan husnuzan, mempraktikkan salat sunah rawatib, serta meneladani ketabahan dakwah Nabi Muhammad saw.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls3-smt2-paket-ats',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET ATS GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GENAP KELAS 3] Gabungan Tengah Semester Genap (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 3 Genap (Hadis Salat Berjamaah, Iman kepada Kitab-Kitab Allah, Kalimah Thayyibah & Husnuzan)',
    rumusanTP:
      'Murid mampu menjelaskan kandungan hadis salat berjamaah (27 derajat), mengidentifikasi empat kitab Allah beserta rasul penerimanya, serta menerapkan kalimah thayyibah dan sikap husnuzan.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls3-smt2-bab6',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Senangnya Belajar Hadis Salat Berjamaah',
    materiPokok: 'Lafal, Arti, dan Kandungan Hadis tentang Keutamaan Salat Berjamaah (27 Derajat)',
    rumusanTP:
      'Murid mampu membaca, menghafal, dan menjelaskan pesan pokok hadis tentang keutamaan salat berjamaah dibandingkan salat sendirian (munfarid) sebanyak 27 derajat.',
    rekomendasiModerasi: 'Syura (Musyawarah untuk Kemaslahatan Bersama)',
  },
  {
    id: 'kls3-smt2-bab7',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Ayo Beriman kepada Kitab-Kitab Allah Swt. (Taurat, Zabur, Injil, Al-Qur\'an)',
    materiPokok: 'Empat Kitab Suci Allah Swt. (Taurat, Zabur, Injil, Al-Qur\'an) dan Para Rasul Penerimanya',
    rumusanTP:
      'Murid mampu menyebutkan nama kitab-kitab Allah Swt. (Taurat kepada Nabi Musa, Zabur kepada Nabi Daud, Injil kepada Nabi Isa, Al-Qur\'an kepada Nabi Muhammad saw.) serta memahami Al-Qur\'an sebagai penyempurna kitab sebelumnya.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls3-smt2-bab8',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Aku Senang Berkalimah Thayyibah (Subhanallah, Masyaallah, Insyaallah, Allahu Akbar) & Husnuzan',
    materiPokok: 'Arti dan Waktu Pengucapan Subhanallah, Masyaallah, Insyaallah, Allahu Akbar, serta Perilaku Husnuzan',
    rumusanTP:
      'Murid mampu membedakan arti dan waktu pengucapan kalimah thayyibah Subhanallah, Masyaallah, Insyaallah, dan Allahu Akbar serta membiasakan sikap husnuzan (berprasangka baik) kepada Allah dan sesama.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls3-smt2-bab9',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Senangnya Salat Rawatib (Qabliyah & Ba\'diyah)',
    materiPokok: 'Pengertian, Pembagian (Qabliyah dan Ba\'diyah), serta Rakaat Salat Sunah Rawatib Muakkad & Ghairu Muakkad',
    rumusanTP:
      'Murid mampu menjelaskan ketentuan salat sunah rawatib qabliyah (sebelum salat fardu) dan ba\'diyah (sesudah salat fardu), membedakan rawatib muakkad dan ghairu muakkad, serta membiasakannya.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls3-smt2-bab10',
    fase: 'Fase B',
    kelas: 'Kelas 3 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Nabi Muhammad saw. Rasulku: Kisah Kerasulan dan Ketabahan Berdakwah',
    materiPokok: 'Peristiwa Turunnya Wahyu Pertama di Gua Hira, Dakwah Sembunyi-sembunyi & Terang-terangan, serta Ketabahan Rasul',
    rumusanTP:
      'Murid mampu menceritakan peristiwa pengangkatan Nabi Muhammad saw. menjadi rasul di Gua Hira serta meneladani kesabaran dan ketabahan beliau dalam menyampaikan dakwah Islam.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // =========================================================================
  // D. FASE B — KELAS 4 SD/MI (SEMESTER 1 GANJIL & SEMESTER 2 GENAP)
  // =========================================================================
  // --- Kelas 4 SD/MI · Semester 1 (Ganjil) ---
  {
    id: 'kls4-smt1-paket-sas',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS GANJIL KELAS 4] Gabungan 5 Elemen PAI Kelas 4 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Semester Ganjil Kelas 4 (Q.S. Al-Hujurat: 13, 5 Asmaulhusna Al-Malik s.d. Al-Mu\'min, Toleransi Keragaman, Tanda Usia Balig Fikih & Biologi, Hijrah ke Madinah)',
    rumusanTP:
      'Murid mampu memahami pesan pokok Q.S. Al-Hujurat/49: 13 tentang keragaman, meneladani Asmaulhusna Al-Malik, Al-Aziz, Al-Quddus, As-Salam, dan Al-Mu\'min, menerapkan sikap saling menghargai dalam kebinekaan, mengidentifikasi tanda usia balig menurut fikih dan biologi beserta mandi wajib, serta menganalisis kisah hijrah Nabi Muhammad saw. ke Madinah.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls4-smt1-paket-ats',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GANJIL KELAS 4] Gabungan Tengah Semester Ganjil (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 4 Ganjil (Q.S. Al-Hujurat: 13, Asmaulhusna Al-Malik s.d. Al-Mu\'min, Indahnya Saling Menghargai dalam Keragaman)',
    rumusanTP:
      'Murid mampu membaca dan mengartikan Q.S. Al-Hujurat/49: 13, menjelaskan makna lima Asmaulhusna (Al-Malik, Al-Aziz, Al-Quddus, As-Salam, Al-Mu\'min), serta mempraktikkan toleransi antarumat beragama.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls4-smt1-bab1',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Mari Kita Mengaji dan Mengkaji Q.S. Al-Hujurat/49: 13 dan Hadis tentang Keragaman',
    materiPokok: 'Bacaan, Tajwid, Arti, dan Pesan Pokok Q.S. Al-Hujurat/49: 13 serta Hadis tentang Keragaman',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengidentifikasi hukum bacaan tajwid (gunnah, qalqalah, mad), mengartikan kosa kata lita\'arafu, dan memahami pesan pokok Q.S. Al-Hujurat/49: 13 tentang keragaman dan kemuliaan orang bertakwa.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls4-smt1-bab2',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Teladan Mulia Asmaulhusna: Al-Malik, Al-Aziz, Al-Quddus, As-Salam, dan Al-Mu\'min',
    materiPokok: 'Arti dan Perilaku Meneladani Asmaulhusna Al-Malik, Al-Aziz, Al-Quddus, As-Salam, dan Al-Mu\'min',
    rumusanTP:
      'Murid mampu menjelaskan arti Asmaulhusna Al-Malik (Maha Merajai), Al-Aziz (Maha Mulia/Perkasa), Al-Quddus (Maha Suci), As-Salam (Maha Sejahtera), dan Al-Mu\'min (Maha Pemberi Keamanan) serta meneladaninya dengan menahan diri, cinta kebersihan, dan menjaga ketertiban.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls4-smt1-bab3',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Indahnya Saling Menghargai dalam Keragaman (Toleransi & Kebaikan dalam Islam)',
    materiPokok: 'Ajaran Kebaikan dalam Islam, Sikap Saling Menghormati, dan Batasan Toleransi Antarumat Beragama',
    rumusanTP:
      'Murid mampu mendeskripsikan keragaman sebagai sunnatullah, menunjukkan sikap saling menghargai teman yang berbeda suku maupun agama, serta memahami batasan toleransi tanpa mencampuradukkan akidah dan ibadah.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls4-smt1-bab4',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Menyambut Usia Balig: Tanda Balig menurut Ilmu Fikih & Biologi, Hadas Besar, serta Kewajiban Mukalaf',
    materiPokok: 'Tanda-Tanda Balig (Mimpi Basah, Haid, Usia 15 Tahun Hijriah), Larangan Hadas Besar, Mandi Wajib, dan Kewajiban Mukalaf',
    rumusanTP:
      'Murid mampu membedakan tanda-tanda usia balig menurut ilmu fikih dan ilmu biologi, menyebutkan larangan bagi orang yang sedang berhadas besar, memahami tata cara mandi wajib, serta menyadari tanggung jawab sebagai mukalaf.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls4-smt1-bab5',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Kisah Hijrah Nabi Muhammad saw. ke Madinah (Sebab, Perjalanan Gua Tsur, dan Hikmah Hijrah)',
    materiPokok: 'Sebab-Sebab Hijrah, Peran Abu Bakar, Ali bin Abi Thalib, Asma\' Zat an-Nitaqain, Gua Tsur, dan Hikmah Hijrah',
    rumusanTP:
      'Murid mampu menjelaskan sebab-sebab Nabi Muhammad saw. hijrah ke Madinah, menguraikan kisah perjalanan hijrah (peran Ali bin Abi Thalib, Abu Bakar Ash-Shiddiq, dan Asma\' binti Abu Bakar), serta menyimpulkan hikmah hijrah.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // --- Kelas 4 SD/MI · Semester 2 (Genap) ---
  {
    id: 'kls4-smt2-paket-sat',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET SAT GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT GENAP KELAS 4] Gabungan 5 Elemen PAI Kelas 4 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Semester Genap Kelas 4 (Q.S. At-Tin & Hadis Silaturahmi, Iman kepada Rasul & Ulul Azmi, Salam/Tolong-Menolong/Anti-Munafik, Salat Jumat/Dhuha/Tahajud, Membangun Kota Madinah)',
    rumusanTP:
      'Murid mampu memahami Q.S. At-Tin dan hadis silaturahmi, mengidentifikasi sifat wajib dan mustahil rasul serta Rasul Ulul Azmi, membiasakan mengucap salam, menolong sesama, dan menjauhi sifat munafik, memahami ketentuan salat Jumat, Dhuha, dan Tahajud, serta meneladani kisah Nabi Muhammad saw. membangun Kota Madinah.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls4-smt2-paket-ats',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET ATS GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GENAP KELAS 4] Gabungan Tengah Semester Genap (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 4 Genap (Q.S. At-Tin & Hadis Silaturahmi, Sifat Rasul & Ulul Azmi, Salam, Senang Menolong & Menghindari Ciri Munafik)',
    rumusanTP:
      'Murid mampu membaca dan memahami pesan pokok Q.S. At-Tin, menjelaskan sifat wajib dan mustahil rasul beserta 5 Rasul Ulul Azmi, serta menerapkan adab mengucap salam, tolong-menolong, dan menjauhi ciri munafik.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls4-smt2-bab6',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Mari Mengaji dan Mengkaji Q.S. At-Tin dan Hadis tentang Silaturahmi',
    materiPokok: 'Bacaan, Tajwid, Arti, dan Pesan Pokok Q.S. At-Tin serta Hadis Keutamaan Menyambung Silaturahmi',
    rumusanTP:
      'Murid mampu membaca, menghafal, dan memahami pesan pokok Q.S. At-Tin tentang penciptaan manusia dalam bentuk sebaik-baiknya (ahsani taqwim) serta menjelaskan keutamaan menjaga silaturahmi.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls4-smt2-bab7',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Beriman kepada Rasul-Rasul Allah (Sifat Wajib Siddiq, Amanah, Tabligh, Fatanah & Rasul Ulul Azmi)',
    materiPokok: 'Sifat Wajib (Siddiq, Amanah, Tabligh, Fatanah), Sifat Mustahil (Kizib, Khianat, Kitman, Baladah), dan 5 Rasul Ulul Azmi',
    rumusanTP:
      'Murid mampu menjelaskan sifat wajib, mustahil, dan jaiz bagi rasul Allah, menyebutkan lima Rasul Ulul Azmi (Nuh, Ibrahim, Musa, Isa, Muhammad saw.), serta meneladani kejujuran dan amanah rasul.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls4-smt2-bab8',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Aku Anak Saleh: Mengucapkan Salam, Senang Menolong, dan Menghindari Ciri Munafik',
    materiPokok: 'Keutamaan Menyebarkan Salam, Sikap Tolong-Menolong (Ta\'awun), dan Tiga Ciri Orang Munafik',
    rumusanTP:
      'Murid mampu membiasakan mengucapkan dan menjawab salam secara santun, gemar menolong teman yang membutuhkan, serta mengidentifikasi dan menjauhi tiga ciri sifat munafik (dusta, ingkar janji, khianat).',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls4-smt2-bab9',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Mengenal Salat Jumat, Salat Dhuha, dan Salat Tahajud',
    materiPokok: 'Hukum, Syarat Wajib/Sah, dan Tata Cara Salat Jumat, Salat Dhuha, serta Salat Tahajud',
    rumusanTP:
      'Murid mampu menjelaskan ketentuan hukum, syarat, waktu pelaksanaan, dan tata cara salat Jumat (wajib bagi laki-laki muslim), salat sunah Dhuha, serta salat sunah Tahajud di malam hari.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls4-smt2-bab10',
    fase: 'Fase B',
    kelas: 'Kelas 4 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Kisah Nabi Muhammad saw. Membangun Kota Madinah (Masjid Nabawi, Ukhuwah Muhajirin-Anshar, Piagam Madinah)',
    materiPokok: 'Pembangunan Masjid Nabawi, Persaudaraan Kaum Muhajirin dan Anshar, serta Perjanjian Piagam Madinah',
    rumusanTP:
      'Murid mampu menceritakan langkah-langkah strategis Nabi Muhammad saw. dalam membangun masyarakat Madinah yang beradab melalui pembangunan Masjid Nabawi, mempersaudarakan Muhajirin-Anshar, dan merumuskan Piagam Madinah.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },

  // =========================================================================
  // E. FASE C — KELAS 5 SD/MI (SEMESTER 1 GANJIL & SEMESTER 2 GENAP)
  // =========================================================================
  // --- Kelas 5 SD/MI · Semester 1 (Ganjil) ---
  {
    id: 'kls5-smt1-paket-sas',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS GANJIL KELAS 5] Gabungan 5 Elemen PAI Kelas 5 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Semester Ganjil Kelas 5 (Q.S. Al-Ma\'un & Hadis Yatim, 5 Asmaulhusna Al-Qawiyyu s.d. Al-Ba\'its, Menghargai Perbedaan & Khalifah, Zakat/Infak/Sedekah/Hadiah, Fathu Makkah & Haji Wada\')',
    rumusanTP:
      'Murid mampu menganalisis pesan pokok Q.S. Al-Ma\'un tentang menyayangi anak yatim, meneladani Asmaulhusna Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, dan Al-Ba\'its, menerapkan sikap menghargai perbedaan pendapat dan peran khalifah, menghitung ketentuan zakat fitrah, zakat mal, infak, sedekah, dan hadiah, serta meneladani peristiwa Fathu Makkah dan Haji Wada\'.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls5-smt1-paket-ats',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GANJIL KELAS 5] Gabungan Tengah Semester Ganjil (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 5 Ganjil (Q.S. Al-Ma\'un & Hadis Yatim, Asmaulhusna Al-Qawiyyu s.d. Al-Ba\'its, Menghargai Perbedaan Pendapat & Tugas Khalifah)',
    rumusanTP:
      'Murid mampu memahami Q.S. Al-Ma\'un dan hadis menyayangi yatim, menjelaskan makna lima Asmaulhusna (Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, Al-Ba\'its), serta mempraktikkan adab musyawarah dan tugas manusia sebagai khalifah.',
    rekomendasiModerasi: 'Syura (Musyawarah untuk Kemaslahatan Bersama)',
  },
  {
    id: 'kls5-smt1-bab1',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Menyayangi Anak Yatim: Pesan Pokok Q.S. Al-Ma\'un dan Hadis Yatim',
    materiPokok: 'Bacaan, Hukum Mim Sukun, Arti, dan Pesan Pokok Q.S. Al-Ma\'un Ayat 1–7 serta Hadis Menyayangi Anak Yatim',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengidentifikasi hukum bacaan mim sukun (izhar syafawi, ikhfa syafawi, idgham mimi), mengartikan ayat, serta menganalisis ciri-ciri pendusta agama dalam Q.S. Al-Ma\'un dan keutamaan menyantuni anak yatim.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls5-smt1-bab2',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Lebih Dekat dengan Nama-Nama Allah: Asmaulhusna Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, Al-Ba\'its',
    materiPokok: 'Makna dan Keteladanan Asmaulhusna Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, dan Al-Ba\'its',
    rumusanTP:
      'Murid mampu menjelaskan arti Asmaulhusna Al-Qawiyyu (Maha Kuat), Al-Qayyum (Maha Mandiri), Al-Muhyi (Maha Menghidupkan), Al-Mumit (Maha Mematikan), dan Al-Ba\'its (Maha Membangkitkan) serta meneladaninya dengan sikap mandiri dan peduli sesama.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls5-smt1-bab3',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Aku Anak Saleh: Saling Menghargai Perbedaan Pendapat dan Tugas Manusia sebagai Khalifah',
    materiPokok: 'Sikap Menghargai Perbedaan Suku/Budaya/Pendapat, Musyawarah, dan Tanggung Jawab Manusia sebagai Khalifah di Bumi',
    rumusanTP:
      'Murid mampu menerapkan adab saling menghargai perbedaan pendapat dalam musyawarah serta menjalankan tugas manusia sebagai khalifah Allah untuk memakmurkan dan menjaga kedamaian di muka bumi.',
    rekomendasiModerasi: 'Syura (Musyawarah untuk Kemaslahatan Bersama)',
  },
  {
    id: 'kls5-smt1-bab4',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Hidup Lapang dengan Berbagi: Ketentuan Zakat Fitrah, Zakat Mal, Infak, Sedekah, dan Hadiah',
    materiPokok: 'Ketentuan Zakat Fitrah (2,5 Kg / 3,5 Liter), Zakat Mal, 8 Golongan Mustahik (Q.S. At-Taubah: 60), serta Perbedaan Infak, Sedekah, dan Hadiah',
    rumusanTP:
      'Murid mampu menghitung takaran zakat fitrah (2,5 kg atau 3,5 liter beras per jiwa), mengidentifikasi 8 golongan penerima zakat (mustahik), serta membedakan pengertian dan hikmah zakat, infak, sedekah, dan hadiah.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls5-smt1-bab5',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Meneladani Perjuangan Rasulullah saw.: Perjanjian Hudaibiyah, Fathu Makkah, dan Haji Wada\'',
    materiPokok: 'Kronologi Perjanjian Hudaibiyah, Peristiwa Fathu Makkah Tanpa Pertumpahan Darah, dan Pesan Khotbah Haji Wada\'',
    rumusanTP:
      'Murid mampu menguraikan latar belakang Perjanjian Hudaibiyah, peristiwa Fathu Makkah yang damai tanpa balas dendam, serta pesan persaudaraan universal Rasulullah saw. pada Haji Wada\'.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },

  // --- Kelas 5 SD/MI · Semester 2 (Genap) ---
  {
    id: 'kls5-smt2-paket-sat',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET SAT GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT GENAP KELAS 5] Gabungan 5 Elemen PAI Kelas 5 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Semester Genap Kelas 5 (Q.S. Ali \'Imran: 64 & Al-Baqarah: 256, Iman kepada Hari Akhir, Ukhuwah Islamiyah/Wathaniyah/Insaniyah, Ibadah Haji & Kurban, Khulafaurrasyidin Abu Bakar & Umar)',
    rumusanTP:
      'Murid mampu memahami pesan pokok Q.S. Ali \'Imran/3: 64 dan Q.S. Al-Baqarah/2: 256 tentang hidup damai, meyakini tahapan Hari Akhir, menerapkan tiga konsep ukhuwah dan berteman tanpa membedakan agama, menganalisis ketentuan ibadah haji dan kurban, serta meneladani kepemimpinan Abu Bakar Ash-Shiddiq dan Umar bin Khattab.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls5-smt2-paket-ats',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET ATS GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GENAP KELAS 5] Gabungan Tengah Semester Genap (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 5 Genap (Q.S. Ali \'Imran: 64 & Al-Baqarah: 256, Iman kepada Hari Akhir, Ukhuwah Islamiyah/Wathaniyah/Insaniyah)',
    rumusanTP:
      'Murid mampu menganalisis pesan toleransi dalam Q.S. Ali \'Imran/3: 64 dan Q.S. Al-Baqarah/2: 256, mengurutkan tahapan peristiwa Hari Akhir, serta mempraktikkan persaudaraan (ukhuwah) di lingkungan sekolah.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls5-smt2-bab6',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Hidup Damai dalam Kebersamaan: Q.S. Ali \'Imran/3: 64 dan Q.S. Al-Baqarah/2: 256',
    materiPokok: 'Bacaan, Tajwid, dan Pesan Pokok Q.S. Ali \'Imran/3: 64 (Kalimatun Sawa\') serta Q.S. Al-Baqarah/2: 256 (Tidak Ada Paksaan dalam Agama)',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengartikan penggalan ayat, dan menyimpulkan pesan pokok Q.S. Ali \'Imran/3: 64 dan Q.S. Al-Baqarah/2: 256 tentang dialog damai dan menghormati kebebasan beragama.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls5-smt2-bab7',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Ketika Kehidupan Telah Berhenti: Beriman kepada Hari Akhir (Tanda Kiamat & Tahapan Akhirat)',
    materiPokok: 'Kiamat Sughra dan Kubra, Tahapan Hari Akhir (Yaumul Ba\'ats, Mahsyar, Hisab, Mizan, Jaza\'), serta Hikmah Beriman kepada Hari Akhir',
    rumusanTP:
      'Murid mampu membedakan kiamat sughra dan kiamat kubra, mengurutkan tahapan peristiwa di alam akhirat (Yaumul Ba\'ats, Mahsyar, Hisab, Mizan, Jaza\'), serta terdorong beramal saleh dan berhati-hati dalam bertindak.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls5-smt2-bab8',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Senangnya Berteman: Persaudaraan dalam Islam (Ukhuwah Islamiyah, Wathaniyah, Insaniyah) & Berteman Beda Agama',
    materiPokok: 'Tiga Konsep Ukhuwah (Islamiyah, Wathaniyah, Insaniyah/Basyariyah) dan Adab Berteman Tanpa Membedakan Agama',
    rumusanTP:
      'Murid mampu menjelaskan pengertian ukhuwah islamiyah, ukhuwah wathaniyah, dan ukhuwah insaniyah serta mempraktikkan sikap rukun dan tolong-menolong dengan teman yang berbeda agama.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls5-smt2-bab9',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Ibadah Haji dan Kurban: Syarat, Rukun, Wajib Haji, dan Ketentuan Penyembelihan Kurban',
    materiPokok: 'Syarat Wajib, Rukun Haji (Ihram, Wukuf 9 Dzulhijjah, Tawaf, Sa\'i, Tahallul), Wajib Haji, serta Hukum dan Syarat Hewan Kurban',
    rumusanTP:
      'Murid mampu membedakan syarat, rukun, dan wajib ibadah haji, menjelaskan ketentuan waktu dan syarat hewan kurban (unta, sapi, kambing), serta menghayati hikmah kepedulian sosial ibadah haji dan kurban.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls5-smt2-bab10',
    fase: 'Fase C',
    kelas: 'Kelas 5 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Keteladanan Khulafaurrasyidin Bagian 1: Kisah Abu Bakar Ash-Shiddiq r.a. dan Umar bin Khattab r.a.',
    materiPokok: 'Kepemimpinan, Kejujuran, dan Pengumpulan Mushaf Masa Abu Bakar Ash-Shiddiq serta Ketegasan Keadilan Umar bin Khattab (Al-Faruq)',
    rumusanTP:
      'Murid mampu menganalisis kisah perjuangan dan jasa Khalifah Abu Bakar Ash-Shiddiq r.a. dan Umar bin Khattab r.a. serta meneladani sifat jujur, dermawan, tegas membela kebenaran, dan adil.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // =========================================================================
  // F. FASE C — KELAS 6 SD/MI (SEMESTER 1 GANJIL & SEMESTER 2 GENAP)
  // =========================================================================
  // --- Kelas 6 SD/MI · Semester 1 (Ganjil) ---
  {
    id: 'kls6-smt1-paket-sas',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS GANJIL KELAS 6] Gabungan 5 Elemen PAI Kelas 6 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Semester Ganjil Kelas 6 (Q.S. Ad-Dhuha & Hadis Memberi, Asmaulhusna Al-Ghaffar/Al-Afuw/Al-Wahid/As-Samad, Menyatakan Penyesalan & Memaafkan, Hukum Halal & Haram, Jasa Abu Bakar & Umar)',
    rumusanTP:
      'Murid mampu memahami pesan pokok Q.S. Ad-Dhuha dan hadis keutamaan memberi, meneladani Asmaulhusna Al-Ghaffar, Al-Afuw, Al-Wahid, dan As-Samad, mempraktikkan adab meminta maaf dan memberi maaf, menganalisis ketentuan halal dan haram serta sertifikasi halal, serta meneladani jasa Khalifah Abu Bakar dan Umar bin Khattab.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls6-smt1-paket-ats',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GANJIL KELAS 6] Gabungan Tengah Semester Ganjil (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 6 Ganjil (Q.S. Ad-Dhuha & Hadis Memberi, Asmaulhusna Al-Ghaffar/Al-Afuw/Al-Wahid/As-Samad, Adab Menyatakan Penyesalan & Memberi Maaf)',
    rumusanTP:
      'Murid mampu membaca dan menyimpulkan kandungan Q.S. Ad-Dhuha, menjelaskan makna Asmaulhusna Al-Ghaffar, Al-Afuw, Al-Wahid, dan As-Samad, serta menerapkan sikap pemaaf dalam kehidupan sehari-hari.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls6-smt1-bab1',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Belajar Al-Qur\'an dan Hadis: Pesan Pokok Q.S. Ad-Dhuha dan Hadis Keutamaan Memberi',
    materiPokok: 'Bacaan, Tajwid (Tafkhim & Tarqiq), Arti, dan Pesan Pokok Q.S. Ad-Dhuha Ayat 1–11 serta Hadis Tangan di Atas Lebih Baik daripada Tangan di Bawah',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengidentifikasi hukum bacaan tafkhim dan tarqiq, menghafal, serta menyimpulkan pesan optimisme, syukur nikmat, dan kepedulian sosial dalam Q.S. Ad-Dhuha serta hadis keutamaan memberi.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls6-smt1-bab2',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Allah Swt. Maha Segalanya: Asmaulhusna Al-Ghaffar, Al-Afuw, Al-Wahid, dan As-Samad',
    materiPokok: 'Arti, Perbedaan, dan Keteladanan Asmaulhusna Al-Ghaffar, Al-Afuw, Al-Wahid, dan As-Samad',
    rumusanTP:
      'Murid mampu menjelaskan arti dan perbedaan Asmaulhusna Al-Ghaffar (Maha Pengampun) dan Al-Afuw (Maha Pemaaf), serta makna Al-Wahid (Maha Tunggal) dan As-Samad (Maha Dibutuhkan) dalam pengamalan sehari-hari.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls6-smt1-bab3',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Hidup Damai dengan Saling Memaafkan: Adab Menyatakan Penyesalan dan Memberi Maaf',
    materiPokok: 'Pengertian Maaf, Adab Meminta Maaf (Menyatakan Penyesalan), Syarat Memberi Maaf, dan Hikmah Menghapus Dendam',
    rumusanTP:
      'Murid mampu menjelaskan pengertian maaf, mempraktikkan adab menyatakan penyesalan saat bersalah dan memberi maaf dengan tulus tanpa menyisakan dendam, serta menguraikan hikmah saling memaafkan.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls6-smt1-bab4',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Hukum Halal dan Haram: Pengertian, Dasar Hukum, Sebab Halal-Haram, dan Sertifikasi Halal',
    materiPokok: 'Pengertian Halal dan Haram, Dasar Hukum (Al-Qur\'an & Hadis), Sebab Makanan/Minuman/Perbuatan Haram (Zat, Cara Memperoleh, Proses), serta Lembaga Fatwa/Sertifikasi Halal (MUI & BPJPH)',
    rumusanTP:
      'Murid mampu menganalisis pengertian, dasar hukum, dan sebab-sebab kehalalan serta keharaman suatu makanan, minuman, atau perbuatan, serta pentingnya memilih produk bersertifikat halal resmi di Indonesia.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls6-smt1-bab5',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Jasa Khulafaurrasyidin bagi Dunia: Kisah Perjuangan Abu Bakar Ash-Shiddiq dan Umar bin Khattab (Al-Faruq)',
    materiPokok: 'Silsilah, Gelar Ash-Shiddiq & Al-Faruq, Pengumpulan Mushaf Al-Qur\'an (Zaid bin Tsabit), Penetapan Kalender Hijriah, dan Perluasan Wilayah',
    rumusanTP:
      'Murid mampu menguraikan jasa dan keteladanan Khalifah Abu Bakar Ash-Shiddiq r.a. dan Khalifah Umar bin Khattab r.a. (Al-Faruq) dalam menjaga keutuhan umat, kodifikasi Al-Qur\'an, dan penegakan keadilan sosial.',
    rekomendasiModerasi: 'Syura (Musyawarah untuk Kemaslahatan Bersama)',
  },

  // --- Kelas 6 SD/MI · Semester 2 (Genap) ---
  {
    id: 'kls6-smt2-paket-us',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET US / AAJ SD',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '🎓 [PAKET US / ASESMEN AKHIR JENJANG SD] Paket Komprehensif Ujian Sekolah Lintas Fase B & C (Kelas 4, 5, 6)',
    materiPokok: 'Kompilasi Materi Inti Ujian Sekolah SD/MI Lintas Kelas 4, 5, dan 6 (Al-Qur\'an Hadis, Akidah, Akhlak, Fikih, dan SPI)',
    rumusanTP:
      'Murid mampu menguasai capaian pembelajaran komprehensif jenjang SD/MI (Surah pilihan Al-Hujurat: 13, Al-Ma\'un, Ad-Dhuha, Al-A\'la; Asmaulhusna, Iman kepada Rasul, Hari Akhir, Qada-Qadar; Toleransi, Memaafkan, Peduli Lingkungan; Balig, Zakat, Haji/Kurban, Halal-Haram, Puasa Sunah; Hijrah, Fathu Makkah, dan Khulafaurrasyidin).',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls6-smt2-paket-sat',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET SAT GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT GENAP KELAS 6] Gabungan 5 Elemen PAI Kelas 6 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Semester Genap Kelas 6 (Q.S. Al-A\'la, Iman kepada Qada & Qadar, Peduli Lingkungan & Sampah Plastik, Puasa Sunah, Khalifah Utsman bin Affan & Ali bin Abi Thalib)',
    rumusanTP:
      'Murid mampu membaca dan memahami pesan pokok Q.S. Al-A\'la, membedakan takdir mubram dan takdir muallaq dalam iman kepada Qada dan Qadar, mempraktikkan kepedulian lingkungan (mengelola sampah plastik), memahami ketentuan macam-macam puasa sunah, serta meneladani jasa Khalifah Utsman bin Affan dan Ali bin Abi Thalib.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls6-smt2-paket-ats',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    babLabel: 'PAKET ATS GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS GENAP KELAS 6] Gabungan Tengah Semester Genap (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 6 Genap (Q.S. Al-A\'la, Iman kepada Qada & Qadar, Peduli Lingkungan & Kelestarian Alam)',
    rumusanTP:
      'Murid mampu memahami pesan pokok Q.S. Al-A\'la, menganalisis contoh takdir mubram dan muallaq, serta menerapkan akhlak peduli lingkungan biotik dan abiotik di sekolah.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls6-smt2-bab6',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Mengaji Al-Qur\'an Surah Al-A\'la (Bacaan, Hafalan, dan Pesan Pokok)',
    materiPokok: 'Bacaan Tartil, Hafalan, Arti Kosa Kata, dan Pesan Pokok Q.S. Al-A\'la Ayat 1–19 (Bertasbih, Berdakwah, dan Mengutamakan Akhirat)',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menghafal, serta menyimpulkan pesan pokok Q.S. Al-A\'la tentang menyucikan nama Allah Yang Maha Tinggi, saling mengingatkan dalam kebaikan, dan menjaga kemurnian jiwa.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls6-smt2-bab7',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Indahnya Ketetapan Allah: Beriman kepada Qada dan Qadar (Takdir Mubram & Muallaq)',
    materiPokok: 'Pengertian Qada dan Qadar, Perbedaan Takdir Mubram dan Takdir Muallaq, serta Sikap Ikhtiar, Doa, dan Tawakal',
    rumusanTP:
      'Murid mampu menjelaskan pengertian qada dan qadar, membedakan contoh takdir mubram (mutlak) dan takdir muallaq (melibatkan ikhtiar), serta membiasakan sikap optimis berikhtiar, berdoa, dan bertawakal kepada Allah Swt.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls6-smt2-bab8',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Peduli Lingkungan: Menjaga Kelestarian Alam, Biotik-Abiotik, dan Mengelola Sampah Plastik',
    materiPokok: 'Konsep Cinta Lingkungan dalam Islam (Q.S. Ar-Rum: 41), Lingkungan Biotik & Abiotik, Penghijauan, dan Pengelolaan Sampah Plastik',
    rumusanTP:
      'Murid mampu menjelaskan ajaran Islam tentang larangan merusak alam, membedakan kepedulian terhadap komponen biotik dan abiotik, serta mempraktikkan pengelolaan sampah plastik dan penghematan energi di sekolah.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls6-smt2-bab9',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Mengamalkan Puasa Sunah: Senin-Kamis, Syawal, Arafah, Tasu\'a, Asyura, Ayyamul Bidh, dan Daud',
    materiPokok: 'Ketentuan, Niat, Waktu Pelaksanaan, Hikmah Macam-Macam Puasa Sunah, serta Hari-Hari yang Diharamkan Berpuasa',
    rumusanTP:
      'Murid mampu mengidentifikasi waktu pelaksanaan dan keutamaan puasa sunah (Senin-Kamis, 6 hari bulan Syawal, Arafah 9 Dzulhijjah, Tasu\'a 9 Muharram, Asyura 10 Muharram, Ayyamul Bidh, dan puasa Daud) serta waktu yang diharamkan berpuasa.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls6-smt2-bab10',
    fase: 'Fase C',
    kelas: 'Kelas 6 SD/MI',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Meneladani Jasa Khalifah Utsman bin Affan (Dzunnurain) dan Ali bin Abi Thalib (Babul Ilmi / Asadullah)',
    materiPokok: 'Gelar Dzunnurain, Kodifikasi Mushaf Utsmani, Renovasi Masjid Nabawi, serta Gelar Babul Ilmi/Asadullah dan Kemajuan Ilmu Bahasa Masa Ali bin Abi Thalib',
    rumusanTP:
      'Murid mampu menganalisis jasa dan keteladanan Khalifah Utsman bin Affan r.a. (kedermawanan dan pembukuan Mushaf Utsmani) serta Khalifah Ali bin Abi Thalib k.w. (keberanian dan kecerdasan ilmu pengetahuan).',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // =========================================================================
  // G. FASE D — KELAS 7, 8, & 9 SMP/MTs (SEMESTER 1 GANJIL & SEMESTER 2 GENAP)
  // =========================================================================
  // --- Kelas 7 SMP/MTs · Semester 1 (Ganjil) ---
  {
    id: 'kls7-smt1-paket-sas',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS 7 GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS 7 Ganjil] Gabungan 5 Elemen PAI Kelas 7 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Kelas 7 Semester Ganjil (Q.S. Al-Anbiya: 30 & Al-A\'raf: 54 + Tajwid Alif Lam, Asmaulhusna Al-\'Alim/Al-Khabir/As-Sami\'/Al-Bashir, Makna Salat & Zikir, Sujud Syukur/Sahwi/Tilawah, Daulah Umayyah di Damaskus)',
    rumusanTP:
      'Murid mampu menganalisis kandungan Q.S. Al-Anbiya/21: 30 dan Q.S. Al-A\'raf/7: 54 beserta hukum bacaan Alif Lam, meneladani Asmaulhusna Al-\'Alim, Al-Khabir, As-Sami\', dan Al-Bashir, menghayati makna salat dan zikir untuk mencegah perbuatan keji dan munkar, mempraktikkan sujud syukur, sahwi, dan tilawah, serta menganalisis sejarah Daulah Umayyah di Damaskus.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls7-smt1-paket-ats',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS 7 GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 7 Ganjil] Gabungan Tengah Semester Ganjil Kelas 7 (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 7 Ganjil (Q.S. Al-Anbiya: 30 & Al-A\'raf: 54 + Tajwid Alif Lam, Asmaulhusna, Makna Salat & Zikir)',
    rumusanTP:
      'Murid mampu membaca dan menganalisis Q.S. Al-Anbiya/21: 30 dan Q.S. Al-A\'raf/7: 54 dengan tajwid Alif Lam Syamsiyah/Qamariyah, menerapkan Asmaulhusna Al-\'Alim, Al-Khabir, As-Sami\', dan Al-Bashir, serta menghayati hikmah salat dan zikir.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls7-smt1-bab1',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Q.S. Al-Anbiya: 30 & Al-A\'raf: 54 (Penciptaan Alam Semesta) + Tajwid Alif Lam',
    materiPokok: 'Kandungan Q.S. Al-Anbiya/21: 30 & Q.S. Al-A\'raf/7: 54 tentang Penciptaan Alam Semesta serta Hukum Tajwid Alif Lam Qamariyah dan Syamsiyah',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengidentifikasi hukum bacaan Alif Lam Qamariyah dan Alif Lam Syamsiyah, serta menganalisis pesan pokok Q.S. Al-Anbiya/21: 30 dan Q.S. Al-A\'raf/7: 54 tentang keteraturan penciptaan alam semesta dan rasa syukur atas ilmu pengetahuan.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls7-smt1-bab2',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Asmaulhusna (Al-\'Alim, Al-Khabir, As-Sami\', Al-Bashir)',
    materiPokok: 'Makna dan Perilaku Meneladani Asmaulhusna Al-\'Alim, Al-Khabir, As-Sami\', dan Al-Bashir',
    rumusanTP:
      'Murid mampu menganalisis makna Asmaulhusna Al-\'Alim (Maha Mengetahui), Al-Khabir (Maha Teliti), As-Sami\' (Maha Mendengar), dan Al-Bashir (Maha Melihat) serta meneladaninya dengan sikap tekun belajar, teliti, dan berhati-hati dalam bertindak.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls7-smt1-bab3',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Makna Salat & Zikir Mencegah Perbuatan Keji dan Munkar',
    materiPokok: 'Hakikat Salat dan Zikir (Q.S. Al-\'Ankabut: 45) dalam Membentuk Karakter Takwa dan Mencegah Perbuatan Keji',
    rumusanTP:
      'Murid mampu menghayati makna spiritual salat dan zikir sebagai sarana mengingat Allah Swt. yang membentengi diri dari perbuatan keji dan munkar dalam pergaulan sehari-hari.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls7-smt1-bab4',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Sujud Syukur, Sujud Sahwi, dan Sujud Tilawah',
    materiPokok: 'Pengertian, Sebab, Hukum, Bacaan, dan Tata Cara Pelaksanaan Sujud Syukur, Sujud Sahwi, dan Sujud Tilawah',
    rumusanTP:
      'Murid mampu membedakan ketentuan, sebab-sebab, bacaan doa, dan tata cara pelaksanaan sujud syukur, sujud sahwi, serta sujud tilawah baik di dalam maupun di luar salat.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls7-smt1-bab5',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Sejarah Peradaban Islam Masa Daulah Umayyah di Damaskus',
    materiPokok: 'Berdirinya Daulah Bani Umayyah di Damaskus, Sistem Pemerintahan, dan Kemajuan Ilmu Pengetahuan',
    rumusanTP:
      'Murid mampu menguraikan sejarah berdirinya Daulah Bani Umayyah di Damaskus, mengidentifikasi kemajuan tata kelola pemerintahan dan ilmu pengetahuan, serta mengambil ibrah kepemimpinan yang amanah.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },

  // --- Kelas 7 SMP/MTs · Semester 2 (Genap) ---
  {
    id: 'kls7-smt2-paket-sat',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    babLabel: 'PAKET SAT 7 GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT 7 Genap] Gabungan 5 Elemen PAI Kelas 7 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Kelas 7 Semester Genap (Q.S. An-Nisa: 59 & An-Nahl: 64 + Tajwid Nun/Mim Sukun, Iman kepada Malaikat, Ghibah & Tabayyun Media Sosial, Rukhsah Ibadah, Daulah Umayyah di Andalusia)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. An-Nisa/4: 59 dan Q.S. An-Nahl/16: 64 beserta hukum bacaan nun sukun/tanwin dan mim sukun, menghayati iman kepada malaikat Allah, menghindari ghibah dan menerapkan tabayyun di media sosial (anti-perundungan), memahami rukhsah dalam ibadah (salat, puasa, zakat, haji), serta meneladani kemajuan peradaban Islam masa Daulah Umayyah di Andalusia.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls7-smt2-paket-ats',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    babLabel: 'PAKET ATS 7 GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 7 Genap] Gabungan Tengah Semester Genap Kelas 7 (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 7 Genap (Q.S. An-Nisa: 59 & An-Nahl: 64 + Tajwid Nun/Mim Sukun, Iman kepada Malaikat, Ghibah & Tabayyun di Media Sosial)',
    rumusanTP:
      'Murid mampu menerapkan hukum nun sukun/tanwin dan mim sukun pada Q.S. An-Nisa/4: 59 dan Q.S. An-Nahl/16: 64, meneladani ketaatan malaikat Allah, serta mempraktikkan sikap tabayyun dan menolak cyberbullying.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls7-smt2-bab6',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Q.S. An-Nisa: 59 & An-Nahl: 64 + Hukum Nun Sukun/Tanwin & Mim Sukun',
    materiPokok: 'Pesan Pokok Q.S. An-Nisa/4: 59 dan Q.S. An-Nahl/16: 64 tentang Ketaatan pada Aturan serta Hukum Tajwid Nun Sukun/Tanwin dan Mim Sukun',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menerapkan hukum bacaan nun sukun/tanwin (izhar, idgham, iqlab, ikhfa) dan mim sukun, serta menganalisis kandungan Q.S. An-Nisa/4: 59 dan Q.S. An-Nahl/16: 64 tentang ketaatan kepada Allah, Rasul, dan ulil amri.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls7-smt2-bab7',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Iman kepada Malaikat Allah Swt. & Pengawasan Amal Perbuatan',
    materiPokok: 'Hakikat Penciptaan Malaikat, Perbedaan Malaikat/Jin/Manusia, Tugas 10 Malaikat, dan Sikap Muraqabatullah',
    rumusanTP:
      'Murid mampu menganalisis sifat dan tugas malaikat-malaikat Allah Swt. serta mengimplementasikan keimanan kepada malaikat melalui perilaku jujur, disiplin, dan merasa diawasi Allah (muraqabatullah).',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls7-smt2-bab8',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Ghibah & Tabayyun di Media Sosial (Anti-Perundungan)',
    materiPokok: 'Larangan Ghibah dan Fitnah (Q.S. Al-Hujurat: 6 & 12), Etika Tabayyun Informasi Digital, dan Pencegahan Cyberbullying',
    rumusanTP:
      'Murid mampu menganalisis bahaya ghibah, fitnah, dan penyebaran berita bohong (hoaks), menerapkan prinsip tabayyun (klarifikasi berita) sesuai Q.S. Al-Hujurat/49: 6, serta menolak perundungan di sekolah maupun media sosial.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls7-smt2-bab9',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Rukhsah dalam Ibadah (Salat, Puasa, Zakat, Haji)',
    materiPokok: 'Konsep Rukhsah (Keringanan Syariat) dalam Salat Jamak dan Qasar, Puasa Ramadan (Fidyah/Qadha), Zakat, dan Ibadah Haji',
    rumusanTP:
      'Murid mampu menjelaskan pengertian dan hikmah rukhsah dalam Islam serta menganalisis ketentuan salat jamak (takdim/takhir), salat qasar, dan keringanan ibadah bagi musafir atau orang sakit.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls7-smt2-bab10',
    fase: 'Fase D',
    kelas: 'Kelas 7 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Peradaban Islam Masa Daulah Umayyah di Andalusia',
    materiPokok: 'Sejarah Masuknya Islam di Spanyol (Thariq bin Ziyad), Kejayaan Sains dan Arsitektur di Cordoba, serta Toleransi Beragama di Andalusia',
    rumusanTP:
      'Murid mampu menganalisis perkembangan ilmu pengetahuan, arsitektur (Masjid Cordoba & Istana Al-Hamra), serta kehidupan toleransi beragama pada masa Daulah Bani Umayyah di Andalusia (Spanyol).',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },

  // --- Kelas 8 SMP/MTs · Semester 1 (Ganjil) ---
  {
    id: 'kls8-smt1-paket-sas',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS 8 GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS 8 Ganjil] Gabungan 5 Elemen PAI Kelas 8 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Kelas 8 Semester Ganjil (Q.S. Ar-Rum: 41, Ibrahim: 32, Az-Zukhruf: 13 + Tajwid Lam & Ra, Iman kepada Kitab Allah, Amanah & Jujur, Salat Gerhana/Istisqa/Jenazah, Masa Keemasan Daulah Abbasiyah / Baitul Hikmah)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Ar-Rum/30: 41, Q.S. Ibrahim/14: 32, dan Q.S. Az-Zukhruf/43: 13 tentang pelestarian alam beserta tajwid Lam dan Ra, menghayati iman kepada kitab-kitab Allah, menerapkan perilaku amanah dan jujur, mempraktikkan salat gerhana, istisqa, dan jenazah, serta meneladani kemajuan sains masa Daulah Abbasiyah (Baitul Hikmah).',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls8-smt1-paket-ats',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS 8 GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 8 Ganjil] Gabungan Tengah Semester Ganjil Kelas 8 (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 8 Ganjil (Q.S. Ar-Rum: 41, Ibrahim: 32, Az-Zukhruf: 13 + Tajwid Lam & Ra, Iman kepada Kitab-Kitab Allah, Amanah dan Jujur)',
    rumusanTP:
      'Murid mampu membaca ayat-ayat pelestarian alam dengan hukum bacaan Lam dan Ra yang tepat, memahami kedudukan kitab-kitab Allah Swt., serta menerapkan integritas amanah dan jujur di sekolah.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls8-smt1-bab1',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Q.S. Ar-Rum: 41, Ibrahim: 32, Az-Zukhruf: 13 (Pelestarian Alam) + Tajwid Lam dan Ra',
    materiPokok: 'Kandungan Q.S. Ar-Rum/30: 41, Ibrahim/14: 32, Az-Zukhruf/43: 13 tentang Pelestarian Alam serta Hukum Bacaan Tafkhim dan Tarqiq pada Huruf Lam & Ra',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengidentifikasi hukum bacaan Lam Jalalah dan Ra (tafkhim/tarqiq), serta menganalisis pesan pokok Q.S. Ar-Rum/30: 41, Q.S. Ibrahim/14: 32, dan Q.S. Az-Zukhruf/43: 13 tentang kewajiban menjaga kelestarian lingkungan hidup.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls8-smt1-bab2',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Iman kepada Kitab-Kitab Allah (Taurat, Zabur, Injil, Al-Qur\'an)',
    materiPokok: 'Sejarah Turunnya Kitab Samawi, Suhuf dan Kitab, Kedudukan Al-Qur\'an, serta Sikap Mencintai Al-Qur\'an dan Toleran',
    rumusanTP:
      'Murid mampu menjelaskan perbedaan kitab dan suhuf, menguraikan sejarah turunnya Taurat, Zabur, Injil, dan Al-Qur\'an, serta mencintai Al-Qur\'an sekaligus menghormati pemeluk agama lain.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls8-smt1-bab3',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Amanah dan Jujur dalam Kehidupan Sehari-hari',
    materiPokok: 'Macam-Macam Amanah (terhadap Allah, Sesama Manusia, dan Diri Sendiri), Perilaku Jujur (Shiddiq), dan Hikmah Integritas',
    rumusanTP:
      'Murid mampu mengklasifikasikan bentuk-bentuk amanah (kepada Allah, sesama, dan diri sendiri) serta mempraktikkan sikap jujur dalam perkataan maupun perbuatan di sekolah dan masyarakat.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls8-smt1-bab4',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Salat Gerhana, Istisqa, dan Salat Jenazah',
    materiPokok: 'Ketentuan Hukum, Rukun, dan Tata Cara Salat Gerhana (Kusuf/Khusuf), Salat Istisqa (Meminta Hujan), dan Salat Jenazah (Fardu Kifayah)',
    rumusanTP:
      'Murid mampu menganalisis ketentuan hukum dan mempraktikkan tata cara salat gerhana matahari/bulan (2 rakaat 4 rukuk), salat istisqa, serta urutan 4 takbir dalam salat jenazah sebagai wujud kepedulian sosial.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls8-smt1-bab5',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Masa Keemasan Daulah Abbasiyah (Baitul Hikmah)',
    materiPokok: 'Sejarah Berdirinya Daulah Bani Abbasiyah di Baghdad, Khalifah Harun Ar-Rasyid & Al-Ma\'mun, serta Peran Perpustakaan Baitul Hikmah',
    rumusanTP:
      'Murid mampu menganalisis faktor-faktor kemajuan peradaban Islam pada masa keemasan Daulah Bani Abbasiyah di Baghdad serta fungsi Baitul Hikmah sebagai pusat riset dan penerjemahan ilmu pengetahuan dunia.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // --- Kelas 8 SMP/MTs · Semester 2 (Genap) ---
  {
    id: 'kls8-smt2-paket-sat',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    babLabel: 'PAKET SAT 8 GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT 8 Genap] Gabungan 5 Elemen PAI Kelas 8 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Kelas 8 Semester Genap (Q.S. Al-Baqarah: 143 + Tajwid Nun/Mim Tasydid & Mad, Iman kepada Nabi & Rasul, Toleransi & Hakikat Perbedaan, Jual Beli/Utang Piutang/Riba, Ilmuwan Muslim Masa Abbasiyah)',
    rumusanTP:
      'Murid mampu memahami Q.S. Al-Baqarah/2: 143 tentang moderasi beragama (ummatan wasathan) beserta tajwid ghunnah dan mad, meneladani sifat nabi dan rasul, mempraktikkan sikap toleransi dalam kemajemukan, menganalisis ketentuan jual beli, utang piutang, dan larangan riba, serta meneladani kontribusi ilmuwan muslim masa Daulah Abbasiyah.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls8-smt2-paket-ats',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    babLabel: 'PAKET ATS 8 GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 8 Genap] Gabungan Tengah Semester Genap Kelas 8 (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 8 Genap (Q.S. Al-Baqarah: 143 + Tajwid Ghunnah & Mad, Iman kepada Nabi dan Rasul, Toleransi & Hakikat Perbedaan)',
    rumusanTP:
      'Murid mampu membaca Q.S. Al-Baqarah/2: 143 sesuai hukum bacaan nun/mim tasydid dan mad, menjelaskan keteladanan para nabi dan rasul, serta menerapkan sikap tasamuh (toleransi) di masyarakat.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls8-smt2-bab6',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Q.S. Al-Baqarah: 143 (Moderasi Beragama) + Hukum Bacaan Nun/Mim Tasydid & Mad',
    materiPokok: 'Kandungan Q.S. Al-Baqarah/2: 143 tentang Ummatan Wasathan (Umat yang Moderat & Adil) serta Hukum Tajwid Ghunnah (Nun/Mim Tasydid) dan Macam-Macam Mad',
    rumusanTP:
      'Murid mampu membaca dengan tartil, mengidentifikasi hukum bacaan nun/mim bertasydid (ghunnah) dan hukum mad, serta menganalisis pesan pokok Q.S. Al-Baqarah/2: 143 tentang karakter umat Islam yang moderat (wasathiyah) dan menegakkan keadilan.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls8-smt2-bab7',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Iman kepada Nabi dan Rasul Allah Swt. (Sifat Wajib, Mustahil, Jaiz & Ulul Azmi)',
    materiPokok: 'Tugas Para Nabi dan Rasul, Sifat Wajib/Mustahil/Jaiz Rasul, Keteguhan Rasul Ulul Azmi, dan Jiwa Kepemimpinan',
    rumusanTP:
      'Murid mampu menganalisis tugas para nabi dan rasul, sifat-sifatnya, serta meneladani ketangguhan lima Rasul Ulul Azmi dalam membangun jiwa kepemimpinan yang berakhlak mulia.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls8-smt2-bab8',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Toleransi & Menghargai Hakikat Perbedaan (Al-Samhah)',
    materiPokok: 'Konsep Toleransi (Tasamuh) dalam Islam, Menghargai Perbedaan Pendapat/Mazhab dan Antarumat Beragama, serta Menjaga Kerukunan Bangsa',
    rumusanTP:
      'Murid mampu menjelaskan batasan dan etika toleransi dalam Islam, menghormati perbedaan pendapat (khilafiyah) di kalangan umat Islam maupun perbedaan keyakinan antarwarga negara demi menjaga keutuhan bangsa.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls8-smt2-bab9',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Jual Beli, Utang Piutang, dan Riba dalam Fikih Muamalah',
    materiPokok: 'Rukun dan Syarat Sah Jual Beli, Khiyar dalam Jual Beli, Adab Utang Piutang (Qardh), serta Macam-Macam dan Bahaya Riba',
    rumusanTP:
      'Murid mampu menganalisis rukun, syarat sah, dan macam-macam khiyar dalam jual beli, memahami adab utang piutang, serta mengidentifikasi bahaya dan larangan praktik riba dalam transaksi sehari-hari.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls8-smt2-bab10',
    fase: 'Fase D',
    kelas: 'Kelas 8 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Ilmuwan Muslim Masa Daulah Abbasiyah & Karya Monumentalnya',
    materiPokok: 'Kontribusi Cendekiawan Muslim (Ibnu Sina, Al-Khawarizmi, Jabir bin Hayyan, Al-Biruni, Imam Al-Ghazali, dan Empat Imam Mazhab)',
    rumusanTP:
      'Murid mampu mengidentifikasi biografi singkat dan karya ilmuwan muslim masa Daulah Abbasiyah di bidang kedokteran, matematika, kimia, astronomi, fikih, dan tafsir, serta meneladani semangat literasinya.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },

  // --- Kelas 9 SMP/MTs · Semester 1 (Ganjil) ---
  {
    id: 'kls9-smt1-paket-sas',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS 9 GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS 9 Ganjil] Gabungan 5 Elemen PAI Kelas 9 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Kelas 9 Semester Ganjil (Q.S. Al-Mujadilah: 11 & Az-Zumar: 9 + Tajwid Waqaf, Iman kepada Hari Akhir, Etika Pergaulan & Komunikasi Islami, Penyembelihan/Kurban/Akikah, Peradaban Daulah Utsmani)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Al-Mujadilah/58: 11 dan Q.S. Az-Zumar/39: 9 tentang keutamaan menuntut ilmu beserta tanda waqaf, meyakini peristiwa Hari Akhir dengan mawas diri, menerapkan etika pergaulan dan komunikasi Islami, memahami ketentuan penyembelihan hewan, kurban, dan akikah, serta mengapresiasi peradaban Daulah Utsmani.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls9-smt1-paket-ats',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS 9 GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 9 Ganjil] Gabungan Tengah Semester Ganjil Kelas 9 (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 9 Ganjil (Q.S. Al-Mujadilah: 11 & Az-Zumar: 9 + Tajwid Waqaf, Iman kepada Hari Akhir, Etika Pergaulan dan Komunikasi Islami)',
    rumusanTP:
      'Murid mampu membaca Q.S. Al-Mujadilah/58: 11 dan Q.S. Az-Zumar/39: 9 dengan menerapkan tanda waqaf secara tepat, menguraikan tahapan Hari Akhir, serta mempraktikkan adab pergaulan dan komunikasi santun.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls9-smt1-bab1',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Q.S. Al-Mujadilah: 11 & Az-Zumar: 9 (Semangat Menuntut Ilmu) + Tajwid Waqaf',
    materiPokok: 'Kandungan Q.S. Al-Mujadilah/58: 11 dan Q.S. Az-Zumar/39: 9 tentang Kemuliaan Orang Beriman dan Berilmu serta Hukum Tanda Waqaf dalam Al-Qur\'an',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menerapkan kaidah tanda-tanda waqaf (waqaf lazim, jaiz, washal aula, waqaf aula, mu\'anaqah), serta menganalisis pesan pokok Q.S. Al-Mujadilah/58: 11 dan Q.S. Az-Zumar/39: 9 tentang etika majelis ilmu dan kemuliaan orang berilmu.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls9-smt1-bab2',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Iman kepada Hari Akhir & Mawas Diri',
    materiPokok: 'Dalil Naqli dan Aqli Kiamat, Kiamat Sughra/Kubra, Rangkaian Alam Akhirat (Barzakh, Ba\'ats, Mahsyar, Hisab, Mizan, Shirath, Surga/Neraka), dan Sikap Mawas Diri',
    rumusanTP:
      'Murid mampu menganalisis dalil dan rangkaian peristiwa kehidupan setelah mati (alam barzakh hingga yaumul jaza\') serta menjadikan keimanan kepada Hari Akhir sebagai landasan sikap mawas diri dan bertanggung jawab.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls9-smt1-bab3',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Etika Pergaulan dan Komunikasi Islami',
    materiPokok: 'Adab Bergaul dengan Orang yang Lebih Tua, Teman Sebaya, Lebih Muda, dan Lawan Jenis, serta Etika Komunikasi Lisan dan Digital',
    rumusanTP:
      'Murid mampu menerapkan etika pergaulan Islami (terhadap orang tua/guru, teman sebaya, adik kelas, dan lawan jenis) serta menjaga kesantunan komunikasi lisan maupun tulisan di ruang publik dan media sosial.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls9-smt1-bab4',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Ketentuan Penyembelihan Hewan, Kurban, dan Akikah',
    materiPokok: 'Syarat dan Tata Cara Penyembelihan Hewan secara Syar\'i (Tradisional & Mekanik), Ketentuan Hewan Kurban dan Akikah, serta Pembagian Dagingnya',
    rumusanTP:
      'Murid mampu menganalisis syarat dan tata cara penyembelihan hewan sesuai syariat Islam, membedakan ketentuan hukum, waktu, syarat hewan, dan pembagian daging antara kurban dan akikah, serta menghayati nilai kepedulian sosialnya.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls9-smt1-bab5',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Sejarah Peradaban Daulah Utsmani & Keteladanan Sultan Muhammad Al-Fatih',
    materiPokok: 'Sejarah Berdirinya Daulah Turki Utsmani, Kemajuan Kebudayaan dan Arsitektur, serta Keteladanan Sultan Muhammad Al-Fatih dan Sulaiman Al-Qanuni',
    rumusanTP:
      'Murid mampu menganalisis sejarah kejayaan peradaban Islam masa Daulah Utsmani serta meneladani kepemimpinan visioner, kedisiplinan ibadah, dan sikap toleran Sultan Muhammad Al-Fatih.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },

  // --- Kelas 9 SMP/MTs · Semester 2 (Genap) ---
  {
    id: 'kls9-smt2-paket-us',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Genap',
    babLabel: 'PAKET US / AAJ SMP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '🎓 [PAKET US / AKHIR JENJANG SMP] Paket Komprehensif Ujian Sekolah SMP/MTs Lintas Kelas 7, 8, & 9 (Fase D)',
    materiPokok: 'Kompilasi Materi Inti Ujian Sekolah SMP/MTs Lintas Kelas 7, 8, dan 9 (Al-Qur\'an & Tajwid, Rukun Iman, Akhlak Pergaulan & Media Sosial, Fikih Ibadah & Muamalah, serta Sejarah Peradaban Islam)',
    rumusanTP:
      'Murid mampu menguasai capaian pembelajaran komprehensif Fase D SMP/MTs mencakup analisis ayat Al-Qur\'an dan hukum tajwid, keimanan kepada malaikat, kitab, rasul, hari akhir, dan qada-qadar, etika tabayyun dan toleransi, fikih sujud, rukhsah, salat jenazah, jual beli, kurban/akikah, dan wakaf, serta sejarah Daulah Umayyah, Abbasiyah, Utsmani, dan tradisi Nusantara.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls9-smt2-paket-sat',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Genap',
    babLabel: 'PAKET SAT 9 GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT 9 Genap] Gabungan 5 Elemen PAI Kelas 9 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Kelas 9 Semester Genap (Q.S. Al-Baqarah: 30 & Al-Qashash: 77, Iman kepada Qada & Qadar, Seni & Tradisi Islam Nusantara, Mazhab Fikih & Ketentuan Wakaf, Sejarah Daulah Syafawi & Mughal)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Al-Baqarah/2: 30 dan Q.S. Al-Qashash/28: 77 tentang peran khalifah di bumi, menghayati iman kepada Qada dan Qadar, mengapresiasi seni dan tradisi Islam di Nusantara, memahami mazhab fikih dan ketentuan wakaf, serta menganalisis sejarah peradaban Daulah Syafawi dan Daulah Mughal.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls9-smt2-paket-ats',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Genap',
    babLabel: 'PAKET ATS 9 GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 9 Genap] Gabungan Tengah Semester Genap Kelas 9 (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 9 Genap (Q.S. Al-Baqarah: 30 & Al-Qashash: 77, Iman kepada Qada dan Qadar, Seni dan Tradisi Islam di Nusantara)',
    rumusanTP:
      'Murid mampu menyimpulkan tanggung jawab manusia sebagai khalifah dalam Q.S. Al-Baqarah/2: 30 dan Q.S. Al-Qashash/28: 77, membedakan takdir mubram dan muallaq, serta menghargai kearifan lokal tradisi Islam Nusantara.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls9-smt2-bab6',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Q.S. Al-Baqarah: 30 & Al-Qashash: 77 (Khalifah di Bumi & Keseimbangan Hidup)',
    materiPokok: 'Kandungan Q.S. Al-Baqarah/2: 30 dan Q.S. Al-Qashash/28: 77 tentang Amanah Manusia sebagai Khalifah di Muka Bumi dan Larangan Berbuat Kerusakan',
    rumusanTP:
      'Murid mampu membaca dengan tartil serta menganalisis pesan pokok Q.S. Al-Baqarah/2: 30 dan Q.S. Al-Qashash/28: 77 tentang keseimbangan meraih kebahagiaan akhirat dan dunia serta tanggung jawab memelihara kelestarian bumi.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls9-smt2-bab7',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Iman kepada Qada dan Qadar (Ketenangan Jiwa, Ikhtiar, dan Tawakal)',
    materiPokok: 'Hubungan Qada, Qadar, Ikhtiar, Doa, dan Tawakal, Perbedaan Takdir Mubram dan Muallaq, serta Hikmah Ketenangan Jiwa',
    rumusanTP:
      'Murid mampu menganalisis keterkaitan antara ketetapan Allah (qada dan qadar) dengan kewajiban manusia berikhtiar dan bertawakal, serta menumbuhkan sikap optimis, sabar, dan syukur.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls9-smt2-bab8',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Seni dan Tradisi Islam di Nusantara & Kearifan Budaya Lokal',
    materiPokok: 'Ragaman Seni Budaya dan Tradisi Islam Nusantara (Sekaten, Grebeg, Tabot, Halalbihalal, Wayang Wali Songo) sebagai Media Dakwah Damai',
    rumusanTP:
      'Murid mampu mengapresiasi keragaman seni dan tradisi Islam di Nusantara yang bernafaskan nilai-nilai tauhid dan dakwah kultural para Wali Songo serta merawat harmoni budaya bangsa.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls9-smt2-bab9',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Mazhab Fikih (Hanafi, Maliki, Syafi\'i, Hanbali) dan Ketentuan Wakaf',
    materiPokok: 'Biografi Singkat dan Metodologi Empat Imam Mazhab Fikih, Sikap Toleran terhadap Khilafiyah, serta Rukun, Syarat, dan Pengelolaan Wakaf Produktif',
    rumusanTP:
      'Murid mampu mengenal empat imam mazhab fikih Ahlussunnah wal Jamaah untuk menumbuhkan sikap menghargai perbedaan furu\'iyah, serta menganalisis rukun, syarat, dan manfaat sosial wakaf.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls9-smt2-bab10',
    fase: 'Fase D',
    kelas: 'Kelas 9 SMP/MTs',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Sejarah Peradaban Daulah Syafawi di Persia dan Daulah Mughal di India',
    materiPokok: 'Kemajuan Seni Arsitektur, Sains, dan Tata Kota Masa Daulah Syafawi (Isfahan) serta Toleransi dan Kejayaan Daulah Mughal (Taj Mahal)',
    rumusanTP:
      'Murid mampu menganalisis perkembangan peradaban Islam pada masa Daulah Syafawi di Persia dan Daulah Mughal di India serta mengambil ibrah pentingnya persatuan dan kemajemukan masyarakat.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },

  // =========================================================================
  // H. FASE E & F — KELAS 10, 11, & 12 SMA/SMK/MA (GANJIL & GENAP)
  // =========================================================================
  // --- Kelas 10 SMA/SMK/MA (Fase E) · Semester 1 (Ganjil) ---
  {
    id: 'kls10-smt1-paket-sas',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS 10 GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS 10 Ganjil] Gabungan 5 Elemen PAI Kelas 10 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Kelas 10 Semester Ganjil (Q.S. Al-Maidah: 48 & At-Taubah: 105, Ketauhidan & Syu\'abul Iman, Menghindari Foya-foya/Riya\'/Sum\'ah/Takabur/Hasad, Asuransi/Bank/Koperasi Syariah, Sejarah Masuknya Islam & Ulama Nusantara)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Al-Maidah/5: 48 dan Q.S. At-Taubah/9: 105 tentang kompetisi dalam kebaikan dan etos kerja, mewujudkan ketauhidan melalui syu\'abul iman, menghindari sifat hidup berfoya-foya, riya\', sum\'ah, takabur, dan hasad, mengevaluasi praktik asuransi, perbankan, dan koperasi syariah, serta meneladani peran ulama penyebar Islam di Indonesia.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls10-smt1-paket-ats',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS 10 GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 10 Ganjil] Gabungan Tengah Semester Ganjil Kelas 10 (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 10 Ganjil (Q.S. Al-Maidah: 48 & At-Taubah: 105, Hakikat Syu\'abul Iman, Menghindari Foya-foya, Riya\', Sum\'ah, Takabur, dan Hasad)',
    rumusanTP:
      'Murid mampu menganalisis ayat-ayat kompetisi dalam kebaikan dan etos kerja, mengklasifikasikan cabang-cabang iman (syu\'abul iman), serta membentengi diri dari penyakit hati riya\', sum\'ah, takabur, hasad, dan israf.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls10-smt1-bab1',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Q.S. Al-Maidah: 48 & At-Taubah: 105 (Kompetisi dalam Kebaikan & Etos Kerja)',
    materiPokok: 'Bacaan Tartil, Hukum Tajwid, Asbabun Nuzul, dan Kandungan Q.S. Al-Maidah/5: 48 (Fastabiqul Khairat) serta Q.S. At-Taubah/9: 105 (Etos Kerja Profesional)',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menganalisis hukum tajwid, serta mengimplementasikan pesan pokok Q.S. Al-Maidah/5: 48 tentang berlomba-lomba dalam kebaikan dan Q.S. At-Taubah/9: 105 tentang etos kerja berintegritas.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls10-smt1-bab2',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Hakikat dan Mewujudkan Ketauhidan dengan Syu\'abul Iman',
    materiPokok: 'Pengertian Iman (Tashdiq bil Qalb, Iqrar bil Lisan, \'Amal bil Arkan) dan Klasifikasi 77 Cabang Iman (Syu\'abul Iman)',
    rumusanTP:
      'Murid mampu menganalisis hakikat ketauhidan dan mengklasifikasikan 77 cabang keimanan (syu\'abul iman) pada dimensi niat/hati, lisan, dan amal perbuatan nyata dalam kehidupan sosial.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls10-smt1-bab3',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Menjalani Hidup Penuh Manfaat dengan Menghindari Foya-foya, Riya\', Sum\'ah, Takabur, dan Hasad',
    materiPokok: 'Bahaya Perilaku Israf/Tabdzir (Foya-foya/Flexing), Riya\', Sum\'ah, Takabur, dan Hasad, serta Pembiasaan Hidup Sederhana, Ikhlas, dan Tawadhu\'',
    rumusanTP:
      'Murid mampu menganalisis dampak buruk perilaku foya-foya (israf/tabdzir), pamer (riya\' dan sum\'ah), sombong (takabur), dan iri dengki (hasad) di era digital serta membiasakan sikap hidup bersahaja, ikhlas, dan tawadhu\'.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls10-smt1-bab4',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Asuransi, Bank, dan Koperasi Syariah (Ekonomi Syariah)',
    materiPokok: 'Prinsip Dasar dan Akad dalam Asuransi Syariah (Takaful/Tabarru\'), Perbankan Syariah (Mudharabah, Musyarakah, Murabahah, Wadiah), dan Koperasi Syariah',
    rumusanTP:
      'Murid mampu mengevaluasi perbedaan mendasar lembaga keuangan konvensional dan syariah serta menganalisis penerapan akad tabarru\', mudharabah, musyarakah, murabahah, dan qardhul hasan dalam asuransi, bank, serta koperasi syariah.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls10-smt1-bab5',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Sejarah Masuknya Islam dan Peran Tokoh Ulama di Indonesia',
    materiPokok: 'Teori dan Jalur Masuknya Islam ke Nusantara (Perdagangan, Perkawinan, Pendidikan, Kesenian, Tasawuf), Kesultanan Islam, dan Keteladanan Ulama Nusantara',
    rumusanTP:
      'Murid mampu menganalisis jalur dan strategi dakwah damai masuknya Islam di kepulauan Nusantara serta meneladani perjuangan para ulama dan kesultanan Islam dalam membangun peradaban dan persatuan bangsa.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },

  // --- Kelas 10 SMA/SMK/MA (Fase E) · Semester 2 (Genap) ---
  {
    id: 'kls10-smt2-paket-sat',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    babLabel: 'PAKET SAT 10 GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT 10 Genap] Gabungan 5 Elemen PAI Kelas 10 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Kelas 10 Semester Genap (Q.S. Al-Isra\': 32 & An-Nur: 2, Mahabbah/Khauf/Raja\'/Tawakal, Kontrol Diri dari Ghadhab & Syaja\'ah, Al-Kulliyat Al-Khamsah / Maqashid Syariah, Dakwah Wali Songo di Tanah Jawa)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Al-Isra\'/17: 32 dan Q.S. An-Nur/24: 2 tentang larangan pergaulan bebas dan zina, menghayati hakikat mahabbah, khauf, raja\', dan tawakal kepada Allah Swt., menerapkan kontrol diri (mujahadah an-nafs) dari sifat temperamental (ghadhab) serta sikap syaja\'ah, menganalisis Al-Kulliyat Al-Khamsah (Maqashid Syariah), serta meneladani metode dakwah Wali Songo.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls10-smt2-paket-ats',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    babLabel: 'PAKET ATS 10 GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 10 Genap] Gabungan Tengah Semester Genap Kelas 10 (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 10 Genap (Q.S. Al-Isra\': 32 & An-Nur: 2, Mahabbah/Khauf/Raja\'/Tawakal, Kontrol Diri dari Temperamental/Ghadhab & Syaja\'ah)',
    rumusanTP:
      'Murid mampu menganalisis ayat larangan mendekati zina, memahami keseimbangan mahabbah, khauf, raja\', dan tawakal, serta mempraktikkan pengendalian amarah (ghadhab) dan keberanian membela kebenaran (syaja\'ah).',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls10-smt2-bab6',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Q.S. Al-Isra\': 32 & An-Nur: 2 (Menjauhi Pergaulan Bebas dan Perbuatan Zina)',
    materiPokok: 'Hukum Tajwid, Asbabun Nuzul, dan Kandungan Q.S. Al-Isra\'/17: 32 serta Q.S. An-Nur/24: 2 tentang Larangan Mendekati Zina dan Menjaga Kehormatan Diri',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menganalisis hukum tajwid, serta menyimpulkan pesan pokok Q.S. Al-Isra\'/17: 32 dan Q.S. An-Nur/24: 2 tentang bahaya pergaulan bebas dan upaya menjaga kehormatan martabat manusia.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls10-smt2-bab7',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Hakikat Mencintai Allah Swt. (Mahabbah, Khauf, Raja\', dan Tawakal)',
    materiPokok: 'Konsep dan Implementasi Mahabbah (Cinta kepada Allah), Khauf (Takut Murka-Nya), Raja\' (Berharap Rahmat-Nya), dan Tawakal (Berserah Diri setelah Ikhtiar)',
    rumusanTP:
      'Murid mampu menganalisis hakikat dan tanda-tanda mahabbah kepada Allah Swt. serta memadukan sikap khauf, raja\', dan tawakal secara seimbang dalam menghadapi tantangan hidup.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls10-smt2-bab8',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Menghindari Akhlak Madzmumah dan Membiasakan Akhlak Mahmudah (Temperamental/Ghadhab, Kontrol Diri, dan Berani Membela Kebenaran/Syaja\'ah)',
    materiPokok: 'Manajemen Emosi dari Sifat Temperamental (Ghadhab), Mujahadah an-Nafs (Kontrol Diri), serta Sikap Syaja\'ah (Berani Membela Kebenaran secara Santun)',
    rumusanTP:
      'Murid mampu menganalisis cara mengendalikan sifat temperamental (ghadhab) sesuai tuntunan Rasulullah saw., menerapkan kontrol diri (mujahadah an-nafs), serta menunjukkan keberanian moral (syaja\'ah) dalam membela kejujuran dan keadilan.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls10-smt2-bab9',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Al-Kulliyat Al-Khamsah (Maqashid Syariah)',
    materiPokok: 'Lima Prinsip Dasar Tujuan Syariat Islam (Al-Kulliyat Al-Khamsah): Hifzh ad-Din, Hifzh an-Nafs, Hifzh al-\'Aql, Hifzh an-Nasl, dan Hifzh al-Mal',
    rumusanTP:
      'Murid mampu menganalisis urutan dan penerapan Al-Kulliyat Al-Khamsah (menjaga agama, jiwa, akal, keturunan, dan harta) sebagai fondasi maqashid syariah dalam mewujudkan kemaslahatan umat manusia.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls10-smt2-bab10',
    fase: 'Fase E',
    kelas: 'Kelas 10 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Peran Wali Songo dalam Dakwah Islam di Tanah Jawa',
    materiPokok: 'Biografi, Wilayah Dakwah, dan Strategi Kebudayaan Sembilan Wali (Sunan Gresik, Ampel, Bonang, Drajat, Kudus, Giri, Kalijaga, Muria, Gunung Jati)',
    rumusanTP:
      'Murid mampu mengevaluasi strategi dakwah kultural, pedagogis, dan moderat yang diterapkan para Wali Songo di Tanah Jawa serta meneladani sikap bijaksana merawat kearifan budaya lokal.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },

  // --- Kelas 11 SMA/SMK/MA (Fase F) · Semester 1 (Ganjil) ---
  {
    id: 'kls11-smt1-paket-sas',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS 11 GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS 11 Ganjil] Gabungan 5 Elemen PAI Kelas 11 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Kelas 11 Semester Ganjil (Q.S. Ali \'Imran: 190–191 & Ar-Rahman: 33, Memenuhi Janji/Syukur/Memelihara Lisan/Menutupi Aib, Anti-Perkelahian Pelajar/Khamr/Narkoba, Khotbah/Tablig/Dakwah, Ulama Indonesia yang Mendunia)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Ali \'Imran/3: 190–191 dan Q.S. Ar-Rahman/55: 33 tentang berpikir kritis dan cinta IPTEK, mengamalkan bukti keimanan (memenuhi janji, bersyukur, menjaga lisan, menutupi aib orang lain), menghindari perkelahian pelajar, miras (khamr), dan narkoba, memahami ketentuan khotbah, tablig, dan dakwah, serta meneladani karya ulama Indonesia yang mendunia.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls11-smt1-paket-ats',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS 11 GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 11 Ganjil] Gabungan Tengah Semester Ganjil Kelas 11 (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 11 Ganjil (Q.S. Ali \'Imran: 190–191 & Ar-Rahman: 33, Bukti Beriman: Janji/Syukur/Lisan/Menutupi Aib, Menghindari Tawuran, Khamr, dan Narkoba)',
    rumusanTP:
      'Murid mampu menganalisis karakter ulul albab dan cinta IPTEK, menerapkan integritas memenuhi janji dan memelihara lisan, serta menolak perkelahian pelajar, miras, dan penyalahgunaan narkoba.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls11-smt1-bab1',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Q.S. Ali \'Imran: 190–191 & Ar-Rahman: 33 (Berpikir Kritis & Mencintai IPTEK)',
    materiPokok: 'Hukum Tajwid, Asbabun Nuzul, dan Kandungan Q.S. Ali \'Imran/3: 190–191 (Ulul Albab) serta Q.S. Ar-Rahman/55: 33 (Penguasaan Sains & Teknologi)',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menganalisis hukum tajwid, serta mengaitkan kandungan Q.S. Ali \'Imran/3: 190–191 dan Q.S. Ar-Rahman/55: 33 dengan karakter berpikir kritis (ulul albab) dan pengembangan IPTEK yang ramah lingkungan.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls11-smt1-bab2',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Bukti Beriman: Memenuhi Janji, Mensyukuri Nikmat, Memelihara Lisan, Menutupi Aib Orang Lain',
    materiPokok: 'Implementasi Cabang Iman: Menepati Janji (\'Aqd), Bersyukur dengan Hati/Lisan/Amal, Menjaga Lisan dari Fitnah, dan Menutupi Aib Sesama',
    rumusanTP:
      'Murid mampu menganalisis dalil dan urgensi memenuhi janji, mensyukuri nikmat Allah Swt., memelihara lisan dari perkataan sia-sia, serta menutupi aib sesama manusia di era keterbukaan informasi.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls11-smt1-bab3',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Menghindari Perkelahian Pelajar, Minuman Keras (Khamr), dan Narkoba',
    materiPokok: 'Faktor Penyebab dan Pencegahan Tawuran/Perkelahian Pelajar, Dalil Keharaman Khamr (Q.S. Al-Maidah: 90–91), serta Bahaya Narkoba bagi Akal dan Masa Depan',
    rumusanTP:
      'Murid mampu menganalisis bahaya perkelahian antarpelajar, minuman keras (khamr), dan penyalahgunaan psikotropika/narkoba dari perspektif syariat Islam (hifzh al-\'aql wa an-nafs) serta merumuskan solusi pencegahannya.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls11-smt1-bab4',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Ketentuan Khotbah, Tablig, dan Dakwah',
    materiPokok: 'Syarat, Rukun, dan Sunah Khotbah Jumat, Perbedaan Khotbah, Tablig, dan Dakwah, serta Etika Dakwah Bil Hikmah (Q.S. An-Nahl: 125)',
    rumusanTP:
      'Murid mampu membedakan ketentuan syarat dan rukun khotbah, tablig, serta dakwah, dan mampu menyusun naskah khotbah/dakwah yang sejuk, menyejukkan, serta menjunjung tinggi nilai moderasi beragama.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls11-smt1-bab5',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Meneladani Jejak Ulama Indonesia yang Mendunia (Syekh Nawawi Al-Bantani, Syekh Abdurrauf As-Singkili, dll.)',
    materiPokok: 'Biografi, Jaringan Keilmuan Haramain-Nusantara, dan Karya Kitab Ulama Indonesia (Syekh Nawawi Al-Bantani, Syekh Abdurrauf As-Singkili, Syekh Muhammad Arsyad Al-Banjari, Syekh Yusuf Al-Makassari, Syekh Ahmad Khatib Al-Minangkabawi)',
    rumusanTP:
      'Murid mampu menganalisis biografi, karya intelektual, dan kontribusi ulama Nusantara kaliber internasional serta meneladani semangat keilmuan dan kecintaan mereka kepada tanah air.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },

  // --- Kelas 11 SMA/SMK/MA (Fase F) · Semester 2 (Genap) ---
  {
    id: 'kls11-smt2-paket-sat',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Genap',
    babLabel: 'PAKET SAT 11 GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT 11 Genap] Gabungan 5 Elemen PAI Kelas 11 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Kelas 11 Semester Genap (Q.S. Yunus: 40–41 & Al-Maidah: 32, Menjaga Kehormatan/Ikhlas/Malu/Zuhud, Adab Media Sosial dalam Islam, Fikih Pernikahan / Munakahat, Peradaban Islam Masa Modern)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Yunus/10: 40–41 dan Q.S. Al-Maidah/5: 32 tentang toleransi dan menjaga kehidupan manusia, menguatkan iman melalui sikap menjaga kehormatan (muru\'ah), ikhlas, malu (haya\'), dan zuhud, menerapkan adab bermedia sosial, mengevaluasi ketentuan pernikahan dalam Islam (munakahat), serta menganalisis pembaruan peradaban Islam masa modern.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls11-smt2-paket-ats',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Genap',
    babLabel: 'PAKET ATS 11 GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 11 Genap] Gabungan Tengah Semester Genap Kelas 11 (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 11 Genap (Q.S. Yunus: 40–41 & Al-Maidah: 32, Menjaga Kehormatan/Ikhlas/Malu/Zuhud, Adab Menggunakan Media Sosial)',
    rumusanTP:
      'Murid mampu menyimpulkan pesan toleransi dan anti-kekerasan dalam Q.S. Yunus/10: 40–41 dan Q.S. Al-Maidah/5: 32, mengamalkan sifat muru\'ah, ikhlas, haya\', dan zuhud, serta mempraktikkan etika bermedia sosial.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls11-smt2-bab6',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Q.S. Yunus: 40–41 & Al-Maidah: 32 (Menguatkan Kerukunan melalui Toleransi dan Memelihara Kehidupan Manusia)',
    materiPokok: 'Hukum Tajwid, Asbabun Nuzul, dan Kandungan Q.S. Yunus/10: 40–41 tentang Toleransi serta Q.S. Al-Maidah/5: 32 tentang Larangan Kekerasan dan Penghargaan atas Nyawa Manusia',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menganalisis hukum tajwid, serta mengimplementasikan kandungan Q.S. Yunus/10: 40–41 dan Q.S. Al-Maidah/5: 32 dalam merawat kerukunan hidup beragama dan menolak segala bentuk kekerasan/ekstremisme.',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
  {
    id: 'kls11-smt2-bab7',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Menguatkan Iman dengan Menjaga Kehormatan, Ikhlas, Malu, dan Zuhud',
    materiPokok: 'Konsep dan Implementasi Menjaga Kehormatan Diri (\'Iffah/Muru\'ah), Ikhlas Beramal, Budaya Malu (Haya\') Berbuat Dosa, dan Sikap Zuhud',
    rumusanTP:
      'Murid mampu menganalisis hakikat menjaga kehormatan diri (muru\'ah), keikhlasan niat, rasa malu (haya\') sebagai cabang iman, serta sikap zuhud (tidak diperbudak dunia) di tengah gaya hidup hedonisme modern.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls11-smt2-bab8',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Adab Menggunakan Media Sosial dalam Islam',
    materiPokok: 'Prinsip Etika Komunikasi Digital, Tabayyun Berita, Larangan Ghibah/Namimah/Hoaks/Ujaran Kebencian, dan Dakwah Kreatif di Media Sosial',
    rumusanTP:
      'Murid mampu mengevaluasi fenomena penggunaan media sosial dari sudut pandang akhlak Islam serta mempraktikkan literasi digital yang santun, produktif, dan membawa kemaslahatan.',
    rekomendasiModerasi: 'Ishlah (Perdamaian & Anti-Kekerasan / Anti-Perundungan)',
  },
  {
    id: 'kls11-smt2-bab9',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Ketentuan Pernikahan dalam Islam (Munakahat / UU Perkawinan)',
    materiPokok: 'Tujuan dan Hukum Pernikahan, Rukun dan Syarat Sah Nikah (Wali, Mahar, Ijab Kabul), Larangan Pernikahan (Mahram), Talak/Iddah/Rujuk, serta UU Perkawinan di Indonesia',
    rumusanTP:
      'Murid mampu menganalisis ketentuan hukum pernikahan dalam Islam (munakahat) dan Undang-Undang Perkawinan di Indonesia, syarat dan rukun nikah, serta upaya membangun keluarga sakinah, mawaddah, wa rahmah.',
    rekomendasiModerasi: 'Syura (Musyawarah untuk Kemaslahatan Bersama)',
  },
  {
    id: 'kls11-smt2-bab10',
    fase: 'Fase F',
    kelas: 'Kelas 11 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Peradaban Islam pada Masa Modern (1800–Sekarang)',
    materiPokok: 'Karakteristik Periode Modern (1800 M–Sekarang), Tokoh-Tokoh Pembaru Islam (Muhammad Abduh, Jamaluddin Al-Afghani, Rasyid Ridha, Muhammad Iqbal, KH. Ahmad Dahlan, KH. Hasyim Asy\'ari), dan Dampak Kebangkitan Islam',
    rumusanTP:
      'Murid mampu menganalisis latar belakang dan gagasan pembaruan (tajdid) para tokoh pemikir Islam masa modern serta pengaruhnya terhadap kebangkitan pendidikan dan kemerdekaan bangsa Indonesia.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },

  // --- Kelas 12 SMA/SMK/MA (Fase F) · Semester 1 (Ganjil) ---
  {
    id: 'kls12-smt1-paket-sas',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'PAKET SAS 12 GANJIL',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAS 12 Ganjil] Gabungan 5 Elemen PAI Kelas 12 Semester Ganjil',
    materiPokok: 'Gabungan Seluruh Bab Kelas 12 Semester Ganjil (Q.S. Al-Baqarah: 155–156 & Ibrahim: 9, Keterkaitan Iman/Islam/Ihsan, Menghindari Sifat Munafik & Keras Hati, Ilmu Mawaris / Kewarisan Islam, Peran Organisasi Islam di Indonesia)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Al-Baqarah/2: 155–156 dan Q.S. Ibrahim/14: 9 tentang kesabaran dan syukur atas ujian, menghayati integrasi Iman, Islam, dan Ihsan, menghindari sifat munafik dan keras hati (qaswatul qalb), menghitung pembagian harta waris (ilmu mawaris/faraidh), serta mengevaluasi peran organisasi Islam di Indonesia.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls12-smt1-paket-ats',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'PAKET ATS 12 GANJIL',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 12 Ganjil] Gabungan Tengah Semester Ganjil Kelas 12 (Bab 1–3)',
    materiPokok: 'Gabungan Bab 1–3 Kelas 12 Ganjil (Q.S. Al-Baqarah: 155–156 & Ibrahim: 9, Keterkaitan Iman, Islam, dan Ihsan, Menghindari Sifat Munafik dan Keras Hati)',
    rumusanTP:
      'Murid mampu menganalisis ayat-ayat kesabaran menghadapi musibah dan ujian, menjelaskan keterpaduan Iman, Islam, dan Ihsan dalam membentuk insan kamil, serta menjauhi sifat nifak dan keras hati.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls12-smt1-bab1',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 1',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 1 · Al-Qur\'an Hadis] Q.S. Al-Baqarah: 155–156 & Ibrahim: 9 (Sabar dalam Menghadapi Musibah dan Ujian)',
    materiPokok: 'Hukum Tajwid, Asbabun Nuzul, dan Kandungan Q.S. Al-Baqarah/2: 155–156 (Istirja\' & Kesabaran) serta Q.S. Ibrahim/14: 9 tentang Mengambil Ibrah Sejarah',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menganalisis hukum tajwid, serta mengimplementasikan kandungan Q.S. Al-Baqarah/2: 155–156 dan Q.S. Ibrahim/14: 9 dengan menunjukkan ketangguhan mental (resiliensi), sabar, dan tawakal saat menghadapi ujian kehidupan.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls12-smt1-bab2',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 2',
    elemen: ['Akidah'],
    judulTopik: '[Bab 2 · Akidah] Indahnya Kehidupan Bermakna (Keterkaitan Iman, Islam, dan Ihsan)',
    materiPokok: 'Hadis Jibril tentang Dimensi Iman (Akidah), Islam (Syariat), dan Ihsan (Akhlak/Tasawuf) serta Karakter Insan Kamil',
    rumusanTP:
      'Murid mampu menganalisis hubungan tak terpisahkan antara Iman, Islam, dan Ihsan berdasarkan Hadis Jibril serta merefleksikannya dalam integritas ibadah dan kemuliaan akhlak.',
    rekomendasiModerasi: 'Qudwah (Keteladanan Akhlak Mulia / Makarim Al-Akhlaq)',
  },
  {
    id: 'kls12-smt1-bab3',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 3',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 3 · Akhlak] Munafik dan Keras Hati Takkan Pernah Maju',
    materiPokok: 'Klasifikasi Nifak (I\'tiqadi & \'Amali), Bahaya Sifat Munafik dan Keras Hati (Qaswatul Qalb), serta Terapi Kelembutan Hati',
    rumusanTP:
      'Murid mampu menganalisis ciri-ciri dan dampak negatif sifat munafik serta keras hati (qaswatul qalb) bagi kemajuan pribadi maupun masyarakat, serta membiasakan kejujuran dan keterbukaan menerima nasihat kebenaran.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls12-smt1-bab4',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 4',
    elemen: ['Fikih'],
    judulTopik: '[Bab 4 · Fikih] Ketentuan Kewarisan dalam Islam (Ilmu Mawaris / Faraidh)',
    materiPokok: 'Dasar Hukum Waris (Q.S. An-Nisa: 7, 11, 12, 176), Sebab dan Penghalang Waris, Golongan Ahli Waris, Dzawil Furudh (Furudhul Muqaddarah), Ashabah, Hijab, serta Simulasi Perhitungan Waris',
    rumusanTP:
      'Murid mampu menganalisis ketentuan hukum kewarisan Islam (faraidh), menentukan bagian masing-masing ahli waris (dzawil furudh dan ashabah), serta menghitung pembagian harta warisan secara adil dan maslahat.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls12-smt1-bab5',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Ganjil',
    babLabel: 'Bab 5',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 5 · SPI] Peran Organisasi Islam di Indonesia (Nahdlatul Ulama, Muhammadiyah, Nahdlatul Wathan, Persis, Al-Irsyad, dll.)',
    materiPokok: 'Sejarah Berdiri, Tokoh Pendiri, dan Kontribusi Ormas Islam (Muhammadiyah, Nahdlatul Ulama, Persis, Al-Irsyad, Mathla\'ul Anwar, Nahdlatul Wathan, Al-Washliyah) di Bidang Pendidikan, Sosial, dan Kebangsaan',
    rumusanTP:
      'Murid mampu mengevaluasi peran strategis organisasi-organisasi kemasyarakatan Islam di Indonesia dalam mencerdaskan kehidupan bangsa, memperjuangkan kemerdekaan, dan merawat moderasi beragama dalam bingkai NKRI.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },

  // --- Kelas 12 SMA/SMK/MA (Fase F) · Semester 2 (Genap) ---
  {
    id: 'kls12-smt2-paket-us',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    babLabel: 'PAKET US / AAJ SMA/SMK',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '🎓 [PAKET US / AKHIR JENJANG SMA/SMK] Paket Komprehensif Ujian Sekolah Lintas Fase E & F (Kelas 10, 11, 12)',
    materiPokok: 'Kompilasi Materi Inti Ujian Sekolah SMA/SMK/MA Lintas Kelas 10, 11, dan 12 (Al-Qur\'an Hadis, Akidah, Akhlak, Fikih Muamalah/Munakahat/Mawaris/Kontemporer, serta Sejarah Peradaban Islam)',
    rumusanTP:
      'Murid mampu menguasai capaian pembelajaran komprehensif Fase E dan Fase F SMA/SMK/MA mencakup analisis ayat Al-Qur\'an (etos kerja, berpikir kritis, toleransi, moderasi, cinta tanah air), syu\'abul iman dan integrasi iman-islam-ihsan, akhlak digital (anti-judi daring, anti-pinjol ilegal, anti-narkoba), fikih ekonomi syariah, maqashid syariah, munakahat, mawaris, dan ijtihad, serta sejarah Islam Nusantara dan dunia.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls12-smt2-paket-sat',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    babLabel: 'PAKET SAT 12 GENAP',
    isPaketGabungan: true,
    elemen: ALL_FIVE_ELEMEN,
    judulTopik: '📚 [PAKET SAT 12 Genap] Gabungan 5 Elemen PAI Kelas 12 Semester Genap',
    materiPokok: 'Gabungan Seluruh Bab Kelas 12 Semester Genap (Q.S. Al-Qashash: 85 & Al-Baqarah: 143, Cabang Iman Ranah Sosial & Profesi, Etika Digital/Anti-Judi Daring/Anti-Pinjol Ilegal, Ijtihad & Fikih Kontemporer, Kontribusi Islam bagi Peradaban Dunia)',
    rumusanTP:
      'Murid mampu menganalisis Q.S. Al-Qashash/28: 85 dan Q.S. Al-Baqarah/2: 143 tentang cinta tanah air dan moderasi beragama, mengimplementasikan cabang iman dalam ranah sosial dan etika profesi, mengevaluasi bahaya judi daring dan pinjol ilegal, memahami metodologi ijtihad dan fikih kontemporer, serta mengapresiasi kontribusi peradaban Islam bagi dunia.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls12-smt2-paket-ats',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    babLabel: 'PAKET ATS 12 GENAP',
    isPaketGabungan: true,
    elemen: ATS_THREE_ELEMEN,
    judulTopik: '📘 [PAKET ATS 12 Genap] Gabungan Tengah Semester Genap Kelas 12 (Bab 6–8)',
    materiPokok: 'Gabungan Bab 6–8 Kelas 12 Genap (Q.S. Al-Qashash: 85 & Al-Baqarah: 143, Cabang Iman Ranah Sosial & Profesi, Etika Digital, Anti-Judi Daring, dan Anti-Pinjol Ilegal)',
    rumusanTP:
      'Murid mampu menganalisis dalil cinta tanah air dan moderasi beragama, menerapkan etika profesi berbasis keimanan, serta menolak praktik judi daring (maisir) dan pinjaman daring ilegal (riba).',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls12-smt2-bab6',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 6',
    elemen: ['Al-Qur\'an dan Hadis'],
    judulTopik: '[Bab 6 · Al-Qur\'an Hadis] Q.S. Al-Qashash: 85 & Al-Baqarah: 143 (Cinta Tanah Air dan Moderasi Beragama)',
    materiPokok: 'Hukum Tajwid, Asbabun Nuzul, dan Kandungan Q.S. Al-Qashash/28: 85 tentang Cinta Tanah Air (Hubbul Wathan) serta Q.S. Al-Baqarah/2: 143 tentang Moderasi Beragama (Wasathiyah)',
    rumusanTP:
      'Murid mampu membaca dengan tartil, menganalisis hukum tajwid, serta menginternalisasi nilai cinta tanah air dalam Q.S. Al-Qashash/28: 85 dan karakter umat moderat berkeadilan (ummatan wasathan) dalam Q.S. Al-Baqarah/2: 143.',
    rekomendasiModerasi: 'Muwathanah (Cinta Tanah Air & Komitmen Kebangsaan)',
  },
  {
    id: 'kls12-smt2-bab7',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 7',
    elemen: ['Akidah'],
    judulTopik: '[Bab 7 · Akidah] Cabang Iman dalam Ranah Sosial dan Profesi',
    materiPokok: 'Implementasi Syu\'abul Iman di Dunia Kerja dan Masyarakat: Integritas Profesi, Anti-Korupsi, Tanggung Jawab Sosial, dan Keadilan Publik',
    rumusanTP:
      'Murid mampu menganalisis perwujudan cabang-cabang iman dalam ranah sosial dan dunia kerja/profesi melalui budaya jujur, profesional, anti-korupsi, dan peduli terhadap kemaslahatan umum.',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls12-smt2-bab8',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 8',
    elemen: ['Akhlak'],
    judulTopik: '[Bab 8 · Akhlak] Etika Digital, Anti-Judi Daring, dan Anti-Pinjol Ilegal',
    materiPokok: 'Hukum dan Bahaya Judi Daring (Online Gambling/Maisir), Jerat Pinjaman Daring Ilegal (Riba Qardh Berlipat Ganda), Perlindungan Data Pribadi, dan Literasi Keuangan Syariah',
    rumusanTP:
      'Murid mampu mengevaluasi bahaya sosial, psikologis, dan keharaman judi daring (maisir) serta pinjaman daring ilegal (riba) dari sudut pandang akhlak dan maqashid syariah (hifzh al-mal wa al-\'aql).',
    rekomendasiModerasi: 'I\'tidal (Tegak Lurus & Berlaku Adil)',
  },
  {
    id: 'kls12-smt2-bab9',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 9',
    elemen: ['Fikih'],
    judulTopik: '[Bab 9 · Fikih] Ijtihad dan Fikih Kontemporer',
    materiPokok: 'Pengertian, Kedudukan, Syarat Mujtahid, dan Metode Ijtihad (Ijma\', Qiyas, Istihsan, Maslahah Mursalah) serta Solusi Fikih atas Isu Kontemporer (Transaksi Digital, Medis Modern, Lingkungan)',
    rumusanTP:
      'Murid mampu menganalisis konsep, syarat, dan metode ijtihad sebagai sumber hukum Islam yang dinamis serta mengapresiasi peran fatwa ulama dalam menjawab persoalan fikih kontemporer secara moderat.',
    rekomendasiModerasi: 'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  },
  {
    id: 'kls12-smt2-bab10',
    fase: 'Fase F',
    kelas: 'Kelas 12 SMA/MA',
    semester: 'Genap',
    babLabel: 'Bab 10',
    elemen: ['Sejarah Peradaban Islam (SPI)'],
    judulTopik: '[Bab 10 · SPI] Kontribusi Islam bagi Peradaban Dunia & Perdamaian Global',
    materiPokok: 'Warisan Peradaban Islam di Bidang Sains, Kedokteran, Filsafat, Seni Arsitektur, dan Diplomasi Perdamaian Dunia (Islam Rahmatan lil \'Alamin)',
    rumusanTP:
      'Murid mampu mengevaluasi kontribusi peradaban Islam terhadap kemajuan sains dan humanisme global serta merumuskan peran generasi muda muslim dalam mewujudkan perdamaian dunia (rahmatan lil \'alamin).',
    rekomendasiModerasi: 'Tasamuh (Toleransi & Menghargai Perbedaan / Al-Samhah)',
  },
];

function extractGradeNumber(kelasStr: string): string | null {
  const match = kelasStr.match(/\b(\d{1,2})\b/);
  return match ? match[1] : null;
}

/**
 * Checks whether a selected topic title represents a multi-chapter / 5-element combined package
 * (e.g., [PAKET SAS ...], [PAKET SAT ...], [PAKET ATS ...], [PAKET US ...]).
 */
export function isPaketGabunganTopic(judulTopik: string | undefined): boolean {
  if (!judulTopik) return false;
  return (
    judulTopik.includes('[PAKET') ||
    judulTopik.toLowerCase().includes('gabungan 5 elemen') ||
    judulTopik.toLowerCase().includes('gabungan seluruh bab') ||
    judulTopik.toLowerCase().includes('paket komprehensif ujian sekolah')
  );
}

/**
 * Filter topics based on active Fase, selected Kelas, and optional Semester ('Ganjil' | 'Genap' | 'Semua').
 * Returns 7–8 complete options per semester (Paket SAS/SAT/US + Paket ATS + 5 Bab Inti PAI).
 */
export function getTopicsForFaseAndKelas(
  fase: FaseCode,
  kelas: string,
  semester?: 'Ganjil' | 'Genap' | 'Semua'
): CurriculumTopic[] {
  const targetGradeNum = extractGradeNumber(kelas);

  // 1. Filter by Fase and Kelas (matching exact string or same grade number e.g. Kelas 12 SMK/MAK -> 12)
  let classMatched = CURRICULUM_DATABASE_CP020.filter((t) => {
    if (t.fase !== fase) return false;
    if (t.kelas === kelas || t.kelas === 'Semua Kelas') return true;
    const topicGradeNum = extractGradeNumber(t.kelas);
    return targetGradeNum !== null && topicGradeNum === targetGradeNum;
  });

  if (classMatched.length === 0) {
    classMatched = CURRICULUM_DATABASE_CP020.filter((t) => t.fase === fase);
  }

  // 2. Filter by Semester if 'Ganjil' or 'Genap' is selected
  if (semester && semester !== 'Semua') {
    const semesterMatched = classMatched.filter(
      (t) => !t.semester || t.semester === 'Semua' || t.semester === semester
    );
    if (semesterMatched.length > 0) {
      return semesterMatched;
    }
  }

  return classMatched;
}

/**
 * Returns the individual chapter (Bab 1..10) topics for a given Fase, Kelas, and Semester
 * (excluding combined [PAKET ...] rows) so that multi-element SAS/SAT/US packages can map
 * each question to its exact chapter TP and Materi Pokok.
 */
export function getChapterTopicsForClassSemester(
  fase: FaseCode,
  kelas: string,
  semester?: 'Ganjil' | 'Genap' | 'Semua'
): CurriculumTopic[] {
  const all = getTopicsForFaseAndKelas(fase, kelas, semester);
  const chaptersOnly = all.filter((t) => !t.isPaketGabungan && !isPaketGabunganTopic(t.judulTopik));
  return chaptersOnly.length > 0 ? chaptersOnly : all;
}
