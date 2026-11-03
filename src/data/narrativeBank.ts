import { ElemenPAI, FaseCode, BentukSoalType } from '../types/assessment';

export interface NarrativeSeed {
  elemen: ElemenPAI;
  materiPokok?: string;
  stimulusModel?: string;
  indikatorTopik: string;
  cpRingkas: string;
  stimulus: string;
  pertanyaanPG: string;
  opsiPG: {
    A: string;
    B: string;
    C: string;
    D?: string;
    E?: string;
  };
  kunciPG: 'A' | 'B' | 'C' | 'D' | 'E';
  pertanyaanPGK: string;
  opsiPGK: {
    A: string;
    B: string;
    C: string;
    D: string;
    E?: string;
  };
  kunciPGK: string;
  pernyataanBS: { pernyataan: string; jawaban: 'Benar' | 'Salah' }[];
  pasanganMenjodohkan: { premis: string; respon: string }[];
  pertanyaanIsian: string;
  kunciIsian: string;
  pertanyaanUraian: string;
  kunciUraian: string;
  pembahasan: string;
  dalil: string;
}

export interface PhaseQuestionPool {
  pg: NarrativeSeed[];
  isian: NarrativeSeed[];
  uraian: NarrativeSeed[];
}

export const QUESTION_BANK_BY_PHASE: Record<FaseCode, PhaseQuestionPool> = {
  // =========================================================================
  // FASE A: KELAS 1–2 SD/MI (USIA 6–8 TAHUN)
  // Kalimat pendek, bahasa harian, konteks rumah, keluarga, hewan peliharaan
  // =========================================================================
  'Fase A': {
    pg: [
      {
        elemen: 'Akhlak',
        materiPokok: 'Kasih Sayang terhadap Ciptaan Allah Swt.',
        stimulusModel: 'Model B: Narasi Konkret Sehari-hari',
        indikatorTopik: 'menunjukkan kasih sayang kepada hewan ciptaan Allah Swt. di sekitar rumah',
        cpRingkas: 'Murid membiasakan sikap kasih sayang terhadap sesama makhluk ciptaan Allah Swt. di rumah.',
        stimulus:
          'Ahmad melihat kucing kecil sedang kelaparan di depan teras rumah. Ahmad lalu mengambil sedikit sisa ikannya untuk diberikan ke kucing itu.',
        pertanyaanPG: 'Perbuatan Ahmad memberi makan kucing yang lapar menunjukkan sikap ....',
        opsiPG: {
          A: 'Menyayangi hewan ciptaan Allah dengan tulus',
          B: 'Membiarkan hewan kelaparan di halaman rumah',
          C: 'Mengusir kucing kecil agar pergi menjauh',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua perbuatan baik terhadap hewan peliharaan di rumah!',
        opsiPGK: {
          A: 'Memberi makan dan minum secara teratur setiap hari',
          B: 'Menarik ekor kucing saat sedang tidur di teras',
          C: 'Membersihkan kandang hewan agar tetap sehat dan bersih',
          D: 'Melempar batu kecil ke arah kucing yang lewat',
        },
        kunciPGK: 'A dan C',
        pernyataanBS: [
          { pernyataan: 'Memberi makan kucing lapar adalah perbuatan yang disayang Allah Swt.', jawaban: 'Benar' },
          { pernyataan: 'Kita boleh menyakiti hewan kecil jika sedang bosan di rumah.', jawaban: 'Salah' },
          { pernyataan: 'Menyayangi hewan termasuk akhlak anak muslim yang baik.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Melihat kucing lapar di teras rumah', respon: 'Memberinya makan dengan kasih sayang' },
          { premis: 'Sebelum memberi makan hewan', respon: 'Membaca kalimat basmalah' },
          { premis: 'Kucing selesai makan dengan lahap', respon: 'Mengucapkan kalimat hamdalah' },
        ],
        pertanyaanIsian:
          'Memberi makan kucing yang kelaparan di teras rumah adalah contoh sikap kasih .................... kepada makhluk Allah.',
        kunciIsian: 'sayang',
        pertanyaanUraian:
          'Apa yang sebaiknya kamu lakukan jika melihat anak kucing kehausan di dekat rumahmu? Tuliskan 2 tindakan baikmu!',
        kunciUraian:
          '1. Mengambilkan air minum di wadah bersih untuk kucing itu.\n2. Mengelus atau membiarkannya minum dengan tenang tanpa mengganggunya.',
        pembahasan:
          'Anak muslim diajarkan menyayangi seluruh makhluk ciptaan Allah Swt., termasuk memberi makan dan minum hewan yang kelaparan.',
        dalil: 'Hadis Kasih Sayang: "Sayangilah makhluk yang ada di bumi, niscaya yang di langit menyayangimu."',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Kalimat Thayyibah Basmalah dan Hamdalah',
        stimulusModel: 'Model B: Narasi Kebiasaan Baik di Rumah',
        indikatorTopik: 'melafalkan kalimat basmalah sebelum memulai rutinitas makan pagi',
        cpRingkas: 'Murid terbiasa melafalkan kalimat thayyibah basmalah dan hamdalah dalam kegiatan harian.',
        stimulus:
          'Pagi hari Siti duduk rapi di meja makan. Ibu sudah menyiapkan nasi goreng hangat untuk sarapan.',
        pertanyaanPG: 'Sebelum menyuap makanan, kalimat baik yang harus dibaca Siti adalah ....',
        opsiPG: {
          A: 'Bismillahirrahmanirrahim dengan suara lembut',
          B: 'Alhamdulillahi rabbil alamin sambil berdiri',
          C: 'Astaghfirullahal azhim dengan tergesa-gesa',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua adab yang baik saat makan pagi bersama ayah dan ibu!',
        opsiPGK: {
          A: 'Mencuci kedua tangan dan membaca basmalah sebelum makan',
          B: 'Makan menggunakan tangan kanan sambil duduk dengan rapi',
          C: 'Berbicara keras-keras ketika mulut masih penuh makanan',
          D: 'Menyisakan banyak makanan di piring lalu membuangnya',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Membaca basmalah mendatangkan berkah pada makanan kita.', jawaban: 'Benar' },
          { pernyataan: 'Kita boleh makan sambil berjalan-jalan dan melompat.', jawaban: 'Salah' },
          { pernyataan: 'Mencuci tangan sebelum makan menjaga tubuh tetap sehat.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Sebelum makan dan minum', respon: 'Membaca bismillahirrahmanirrahim' },
          { premis: 'Setelah selesai makan dan minum', respon: 'Membaca alhamdulillahi rabbil alamin' },
          { premis: 'Tangan yang digunakan untuk menyuap makanan', respon: 'Tangan kanan yang bersih' },
        ],
        pertanyaanIsian:
          'Sebelum makan nasi goreng, Siti membaca lafal bismillahirrahmanirrahim yang disebut kalimat ....................',
        kunciIsian: 'basmalah',
        pertanyaanUraian:
          'Sebutkan 2 adab makan yang baik sesuai ajaran Nabi Muhammad saw. saat sarapan bersama keluarga!',
        kunciUraian:
          '1. Mencuci tangan dan membaca doa sebelum makan (basmalah).\n2. Duduk tertib dan makan menggunakan tangan kanan.',
        pembahasan:
          'Memulai makan dengan membaca basmalah dan mencuci tangan adalah adab mulia yang mendatangkan keberkahan serta kesehatan.',
        dalil: 'Hadis Adab Makan: "Wahai anak, sebutlah nama Allah, makanlah dengan tangan kananmu..." (HR. Bukhari-Muslim)',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Bersuci (Thaharah) dan Berwudu',
        stimulusModel: 'Model B: Narasi Kebersihan Diri Murid',
        indikatorTopik: 'menerapkan cara bersuci dari kotoran sebelum melaksanakan salat',
        cpRingkas: 'Murid mengenal tata cara bersuci (thaharah) dan menjaga kebersihan badan sebelum beribadah.',
        stimulus:
          'Sore hari kaki Budi kotor setelah bermain bola di lapangan rumput. Tak lama kemudian terdengar suara azan Asar dari masjid dekat rumah.',
        pertanyaanPG: 'Tindakan yang harus dilakukan Budi sebelum berwudu untuk salat Asar adalah ....',
        opsiPG: {
          A: 'Membersihkan kotoran di kaki dengan air bersih mengalir',
          B: 'Langsung memakai sarung tanpa mencuci kaki yang kotor',
          C: 'Masuk ke dalam masjid dengan kaki yang masih berlumpur',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua urutan berwudu yang benar sebelum melaksanakan salat!',
        opsiPGK: {
          A: 'Mencuci kedua telapak tangan hingga bersih',
          B: 'Membasuh muka sebanyak tiga kali secara merata',
          C: 'Melompat-lompat di atas lantai kamar mandi',
          D: 'Memercikkan air ke baju teman yang sedang antre',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Salat kita menjadi sah apabila badan dan pakaian suci dari kotoran.', jawaban: 'Benar' },
          { pernyataan: 'Budi boleh langsung salat meskipun kakinya masih terkena lumpur.', jawaban: 'Salah' },
          { pernyataan: 'Wudu dilakukan menggunakan air bersih yang suci dan menyucikan.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Anggota wudu pertama yang dibasuh', respon: 'Kedua telapak tangan' },
          { premis: 'Membasuh muka saat berwudu', respon: 'Disertai dengan membaca niat wudu' },
          { premis: 'Setelah selesai berwudu', respon: 'Menghadap kiblat dan berdoa' },
        ],
        pertanyaanIsian:
          'Kebersihan itu sebagian dari ....................',
        kunciIsian: 'iman',
        pertanyaanUraian:
          'Mengapa kita harus mencuci kaki dan anggota badan hingga bersih sebelum berwudu untuk salat? Jelaskan alasanmu!',
        kunciUraian:
          '1. Agar badan kita bersih dan suci dari kotoran.\n2. Supaya ibadah salat kita diterima oleh Allah Swt.',
        pembahasan:
          'Syarat sah salat adalah suci badan, pakaian, dan tempat dari najis serta berwudu dengan tertib.',
        dalil: 'Hadis Thaharah: "Kebersihan itu sebagian dari iman." (HR. Muslim)',
      },
      {
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Mengenal Huruf Hijaiyah Berharakat',
        stimulusModel: 'Model B: Narasi Belajar Mengaji di Rumah',
        indikatorTopik: 'mengenal bunyi harakat fathah, kasrah, dan dhammah pada huruf hijaiyah',
        cpRingkas: 'Murid mampu melafalkan huruf hijaiyah berharakat secara benar.',
        stimulus:
          'Rani duduk di samping Ibu membuka buku Iqra. Rani belajar membaca huruf ba yang diberi tanda garis miring di atasnya.',
        pertanyaanPG: 'Tanda baca garis miring di atas huruf yang berbunyi "a" disebut tanda ....',
        opsiPG: {
          A: 'Fathah',
          B: 'Kasrah',
          C: 'Dhammah',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua bunyi huruf hijaiyah yang benar saat diberi harakat!',
        opsiPGK: {
          A: 'Huruf ba berharakat kasrah berbunyi "bi"',
          B: 'Huruf ba berharakat dhammah berbunyi "bu"',
          C: 'Huruf ba berharakat fathah berbunyi "bu"',
          D: 'Huruf ba tanpa harakat berbunyi "ba"',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Al-Qur\'an ditulis menggunakan huruf hijaiyah.', jawaban: 'Benar' },
          { pernyataan: 'Belajar membaca Al-Qur\'an sejak kecil mendapat pahala dari Allah.', jawaban: 'Benar' },
          { pernyataan: 'Tanda kasrah letaknya berada di atas huruf hijaiyah.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Tanda garis di atas huruf (fathah)', respon: 'Menghasilkan bunyi vokal "a"' },
          { premis: 'Tanda garis di bawah huruf (kasrah)', respon: 'Menghasilkan bunyi vokal "i"' },
          { premis: 'Tanda mirip wau kecil di atas huruf (dhammah)', respon: 'Menghasilkan bunyi vokal "u"' },
        ],
        pertanyaanIsian:
          'Kitab suci umat Islam yang berisi firman Allah Swt. adalah Al-....................',
        kunciIsian: 'Qur\'an',
        pertanyaanUraian:
          'Sebutkan 3 nama tanda baca (harakat) dasar pada huruf hijaiyah beserta bunyinya!',
        kunciUraian:
          '1. Fathah (bunyi a)\n2. Kasrah (bunyi i)\n3. Dhammah (bunyi u)',
        pembahasan:
          'Mengenal harakat fathah, kasrah, dan dhammah adalah dasar utama belajar membaca ayat Al-Qur\'an dengan lancar.',
        dalil: 'Hadis Belajar Al-Qur\'an: "Sebaik-baik kalian adalah orang yang belajar Al-Qur\'an dan mengajarkannya." (HR. Bukhari)',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Membantu Orang Tua di Rumah',
        stimulusModel: 'Model B: Narasi Membantu Ibu',
        indikatorTopik: 'menunjukkan perilaku berbakti dan membantu ibu merapikan rumah',
        cpRingkas: 'Murid membiasakan sikap membantu orang tua di rumah.',
        stimulus:
          'Setelah selesai makan siang, Riko melihat ibu sedang sibuk mencuci piring di dapur sendirian.',
        pertanyaanPG: 'Tindakan terpuji yang dapat dilakukan Riko untuk membantu ibu adalah ....',
        opsiPG: {
          A: 'Membawa piring dan gelas kotor miliknya ke tempat cuci piring',
          B: 'Meninggalkan piring kotor di lantai kamar bermain',
          C: 'Menyuruh adik kecil yang mencuci seluruh piring',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua tindakan baik yang membuat ayah dan ibu senang di rumah!',
        opsiPGK: {
          A: 'Merapikan mainan sendiri setelah selesai digunakan di ruang tamu',
          B: 'Menjawab panggilan ibu dengan kata yang sopan dan segera datang',
          C: 'Berdiam diri di kamar sambil bermain gim saat dipanggil ayah',
          D: 'Membuang bungkus roti ke bawah tempat tidur kamar tidur',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Membantu orang tua merupakan perbuatan yang disukai Allah.', jawaban: 'Benar' },
          { pernyataan: 'Anak yang saleh selalu menyayangi ayah dan ibunya.', jawaban: 'Benar' },
          { pernyataan: 'Kita boleh membantah perkataan ibu dengan suara keras.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Dipanggil oleh ibu di rumah', respon: 'Menjawab dengan sopan dan lembut' },
          { premis: 'Selesai bermain mobil-mobilan', respon: 'Menyimpan kembali ke kotak mainan' },
          { premis: 'Bangun tidur di pagi hari', respon: 'Merapikan selimut dan bantal tidur' },
        ],
        pertanyaanIsian:
          'Kepada ayah dan ibu di rumah, anak yang saleh harus selalu berbuat ....................',
        kunciIsian: 'baik (berbakti)',
        pertanyaanUraian:
          'Tuliskan 2 contoh perbuatan baik yang dapat kamu lakukan untuk membantu orang tua di rumah!',
        kunciUraian:
          '1. Merapikan tempat tidur sendiri setelah bangun tidur pagi.\n2. Menaruh sepatu dan tas sekolah di tempat yang rapi.',
        pembahasan: 'Berbakti kepada orang tua adalah kewajiban setiap anak muslim.',
        dalil: 'Q.S. Luqman: 14 tentang berbakti kepada kedua orang tua.',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Mengenal Waktu Salat Fardu',
        stimulusModel: 'Model B: Narasi Ajakan Salat Berjamaah',
        indikatorTopik: 'mengenal waktu salat fardu lima waktu sehari semalam',
        cpRingkas: 'Murid mengenal nama-nama salat fardu lima waktu.',
        stimulus:
          'Matahari mulai terbenam di ufuk barat dan langit tampak kemerahan. Dari musala dekat rumah terdengar suara azan berkumandang merdu.',
        pertanyaanPG: 'Azan yang berkumandang saat matahari terbenam menandakan waktu salat ....',
        opsiPG: {
          A: 'Magrib',
          B: 'Zuhur',
          C: 'Subuh',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua nama salat fardu yang jumlah rakaatnya empat rakaat!',
        opsiPGK: {
          A: 'Salat Zuhur yang dikerjakan pada siang hari',
          B: 'Salat Isya yang dikerjakan pada malam hari',
          C: 'Salat Subuh yang dikerjakan sebelum fajar menyingsing',
          D: 'Salat Magrib yang dikerjakan saat matahari terbenam',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Salat fardu wajib dikerjakan lima kali dalam sehari semalam.', jawaban: 'Benar' },
          { pernyataan: 'Salat Subuh berjumlah dua rakaat.', jawaban: 'Benar' },
          { pernyataan: 'Salat Magrib boleh digabung tanpa sebab yang dibenarkan.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Salat Subuh', respon: 'Dua rakaat' },
          { premis: 'Salat Magrib', respon: 'Tiga rakaat' },
          { premis: 'Salat Zuhur', respon: 'Empat rakaat' },
        ],
        pertanyaanIsian:
          'Jumlah rakaat salat Subuh ada .................... rakaat.',
        kunciIsian: '2 (dua)',
        pertanyaanUraian:
          'Sebutkan 5 nama salat fardu yang wajib dikerjakan umat Islam sehari semalam!',
        kunciUraian:
          '1. Salat Subuh\n2. Salat Zuhur\n3. Salat Asar\n4. Salat Magrib\n5. Salat Isya',
        pembahasan: 'Salat fardu lima waktu adalah tiang agama Islam.',
        dalil: 'Hadis tentang kewajiban salat lima waktu.',
      },
    ],
    isian: [
      {
        elemen: 'Akidah',
        materiPokok: 'Membaca Basmalah',
        stimulusModel: 'Model B: Kalimat Thayyibah',
        indikatorTopik: 'menyebutkan kalimat basmalah sebelum memulai kegiatan',
        cpRingkas: 'Murid membiasakan membaca basmalah.',
        stimulus: 'Sebelum makan, minum, atau belajar, anak muslim selalu berdoa kepada Allah.',
        pertanyaanPG: 'Kalimat yang dibaca sebelum memulai belajar adalah ....',
        opsiPG: { A: 'Basmalah', B: 'Hamdalah', C: 'Takbir' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua waktu yang tepat untuk membaca kalimat basmalah!',
        opsiPGK: {
          A: 'Saat hendak membaca buku pelajaran di ruang belajar',
          B: 'Saat hendak memulai makan siang bersama keluarga',
          C: 'Saat sedang tidur pulas di kasur kamar tidur',
          D: 'Saat sedang buang air kecil di kamar mandi',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Basmalah dibaca di awal setiap kebaikan.', jawaban: 'Benar' },
          { pernyataan: 'Membaca basmalah mendatangkan pahala kebaikan.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Sebelum makan', respon: 'Membaca basmalah' },
          { premis: 'Sesudah makan', respon: 'Membaca hamdalah' },
        ],
        pertanyaanIsian: 'Sebelum mulai makan atau belajar, anak yang saleh selalu membaca kalimat ....................',
        kunciIsian: 'basmalah (bismillahirrahmanirrahim)',
        pertanyaanUraian: 'Tuliskan bacaan basmalah lengkap dengan artinya!',
        kunciUraian: 'Bismillahirrahmanirrahim artinya dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.',
        pembahasan: 'Basmalah dibaca di awal setiap kebaikan.',
        dalil: 'Hadis permulaan amal dengan bismillah.',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Adab Mengucapkan Salam',
        stimulusModel: 'Model B: Salam Masuk Rumah',
        indikatorTopik: 'mengucapkan salam ketika masuk rumah',
        cpRingkas: 'Murid membiasakan adab mengucapkan salam.',
        stimulus: 'Sepulang dari sekolah, Dika mengetuk pintu rumah dengan sopan.',
        pertanyaanPG: 'Ucapan saat mengetuk pintu rumah adalah ....',
        opsiPG: { A: 'Salam', B: 'Teriak', C: 'Diam' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua manfaat menebarkan salam kepada sesama muslim!',
        opsiPGK: {
          A: 'Mendoakan keselamatan dan rahmat bagi yang disapa',
          B: 'Menumbuhkan rasa kasih sayang dan persaudaraan rukun',
          C: 'Membuat orang lain merasa takut dan menghindar',
          D: 'Mendapat pujian bahwa dirinya anak paling hebat',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Mengucapkan salam adalah doa keselamatan.', jawaban: 'Benar' },
          { pernyataan: 'Menjawab salam hukumnya wajib bagi yang mendengar.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Mengucapkan salam', respon: 'Assalamu\'alaikum' },
          { premis: 'Menjawab salam', respon: 'Wa\'alaikumussalam' },
        ],
        pertanyaanIsian: 'Ucapan salam yang kita sampaikan saat masuk ke dalam rumah adalah Assalamu\'alaikum wa ....................',
        kunciIsian: 'rahmatullahi wabarakatuh',
        pertanyaanUraian: 'Mengapa kita dianjurkan mengucapkan salam saat bertemu teman atau masuk rumah?',
        kunciUraian: 'Karena salam adalah doa keselamatan dan mempererat kasih sayang antar sesama.',
        pembahasan: 'Menebarkan salam menumbuhkan cinta kasih.',
        dalil: 'Hadis tebarkan salam (HR. Muslim).',
      },
    ],
    uraian: [
      {
        elemen: 'Akhlak',
        materiPokok: 'Adab Mengakui Kesalahan & Meminta Maaf',
        stimulusModel: 'Model B: Kasus Kejujuran di Rumah',
        indikatorTopik: 'menunjukkan sikap jujur dan meminta maaf saat berbuat salah di rumah',
        cpRingkas: 'Murid berani berkata jujur dan meminta maaf ketika berbuat keliru.',
        stimulus:
          'Saat bermain di ruang tengah, Tono tidak sengaja menyenggol gelas hingga air minum tumpah ke meja dan mengenai buku Ibu.',
        pertanyaanPG: 'Sikap yang harus ditunjukkan Tono kepada Ibu adalah ....',
        opsiPG: { A: 'Meminta maaf dengan jujur dan membantu mengelap meja', B: 'Menyalahkan kucing yang sedang lewat', C: 'Lari keluar rumah' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua tindakan yang benar saat kita tidak sengaja menumpahkan air di meja!',
        opsiPGK: {
          A: 'Segera meminta maaf dengan santun kepada ayah atau ibu',
          B: 'Mengambil kain lap bersih untuk mengeringkan air di meja',
          C: 'Menangis keras-keras dan bersembunyi di balik pintu kamar',
          D: 'Berpura-pura tidak tahu dan meninggalkan meja tetap basah',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Meminta maaf saat berbuat salah adalah perbuatan terpuji.', jawaban: 'Benar' },
          { pernyataan: 'Kita boleh berbohong agar tidak dimarahi orang tua.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Berbuat salah tidak sengaja', respon: 'Segera meminta maaf dengan jujur' },
          { premis: 'Meja basah terkena tumpahan air', respon: 'Dibersihkan memakai lap kering' },
        ],
        pertanyaanIsian: 'Jika tidak sengaja berbuat salah kepada orang tua, kita harus segera meminta ....................',
        kunciIsian: 'maaf',
        pertanyaanUraian:
          'Apa yang kamu ucapkan kepada ayah atau ibu jika kamu tidak sengaja menumpahkan air minum di meja? Tuliskan 2 tindakanmu!',
        kunciUraian:
          '1. Mengucapkan perkataan jujur dan meminta maaf dengan santun kepada ayah atau ibu.\n2. Segera mengambil kain lap bersih untuk membersihkan air yang tumpah.',
        pembahasan:
          'Kejujuran dan keberanian meminta maaf adalah tanda akhlak mulia yang dicintai oleh Allah Swt.',
        dalil: 'Hadis Kejujuran: "Hendaklah kalian berlaku jujur, karena kejujuran membawa kepada kebaikan." (HR. Muslim)',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Kebaikan terhadap Sesama',
        stimulusModel: 'Model B: Perilaku Anak Saleh di Rumah',
        indikatorTopik: 'menuliskan perilaku berbakti kepada orang tua',
        cpRingkas: 'Murid menunjukkan sikap hormat dan patuh kepada orang tua di rumah.',
        stimulus: 'Ibu sedang sibuk merapikan dapur setelah memasak sarapan pagi.',
        pertanyaanPG: 'Tindakan terpuji yang dapat dilakukan anak di rumah adalah ....',
        opsiPG: { A: 'Membantu ibu merapikan barang yang ringan', B: 'Membuat rumah semakin berantakan', C: 'Bermain tanpa peduli' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua perbuatan anak yang berbakti kepada kedua orang tua!',
        opsiPGK: {
          A: 'Mendoakan kedua orang tua setiap selesai salat lima waktu',
          B: 'Membantu pekerjaan rumah tangga yang ringan dengan senang hati',
          C: 'Menuntut uang saku yang banyak melebihi kemampuan orang tua',
          D: 'Membantah nasihat ayah dengan kata-kata yang kasar dan keras',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Berbakti kepada orang tua mendatangkan rida Allah Swt.', jawaban: 'Benar' },
          { pernyataan: 'Membantu ibu merapikan rumah adalah tanda anak berbakti.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Ibu selesai memasak', respon: 'Membantu menata piring di meja' },
          { premis: 'Ayah pulang bekerja', respon: 'Menyambut dengan salam dan senyuman' },
        ],
        pertanyaanIsian: 'Kepada kedua orang tua, seorang anak wajib berbakti dan bersikap ....................',
        kunciIsian: 'hormat (patuh / santun)',
        pertanyaanUraian:
          'Tuliskan 2 perbuatan nyata yang dapat kamu lakukan setiap hari untuk membantu ayah dan ibu di rumah!',
        kunciUraian:
          '1. Merapikan tempat tidur sendiri setelah bangun tidur.\n2. Membantu menaruh piring bekas makan ke tempat cucian.',
        pembahasan: 'Berbakti kepada kedua orang tua (birrul walidain) merupakan jalan menuju rida Allah Swt.',
        dalil: 'Hadis Rida Allah: "Rida Allah terletak pada rida kedua orang tua." (HR. Tirmidzi)',
      },
    ],
  },

  // =========================================================================
  // FASE B: KELAS 3–4 SD/MI (USIA 8–10 TAHUN)
  // Konteks: Sekolah, piket kelas, berbagi bekal, salat berjamaah di musala
  // =========================================================================
  'Fase B': {
    pg: [
      {
        elemen: 'Akhlak',
        materiPokok: 'Amanah dan Kejujuran di Lingkungan Sekolah',
        stimulusModel: 'Model B: Kasus Kejujuran di Koridor Sekolah',
        indikatorTopik: 'menerapkan perilaku amanah saat menemukan barang berharga milik orang lain di sekolah',
        cpRingkas: 'Murid membiasakan perilaku jujur dan amanah di sekolah serta lingkungan sekitar.',
        stimulus:
          'Saat berjalan menuju kantin saat jam istirahat, Fajar melihat selembar uang Rp10.000,00 terjatuh di dekat tempat cuci tangan. Tidak ada nama pemilik pada uang tersebut.',
        pertanyaanPG: 'Tindakan jujur yang paling tepat dilakukan oleh Fajar adalah ....',
        opsiPG: {
          A: 'Menyerahkan uang tersebut kepada guru piket agar diumumkan kepada pemiliknya',
          B: 'Memasukkan uang tersebut ke saku sendiri untuk membeli jajan di kantin',
          C: 'Membagikan uang temuan itu kepada teman-teman bermainnya',
          D: 'Menyembunyikan uang tersebut di bawah batu taman sekolah',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua tindakan terpuji yang mencerminkan sifat jujur seorang murid di sekolah!',
        opsiPGK: {
          A: 'Mengakui secara terus terang apabila lupa membawa buku tugas pekerjaan rumah',
          B: 'Menyerahkan barang temuan di lapangan upacara kepada guru piket',
          C: 'Melihat lembar jawaban teman sebangku saat ulangan harian berlangsung',
          D: 'Menceritakan keburukan teman sekelas agar disukai oleh teman lainnya',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Menyerahkan barang temuan kepada guru adalah perbuatan yang amanah.', jawaban: 'Benar' },
          { pernyataan: 'Uang yang ditemukan di jalan boleh langsung kita pakai belanja sesuka hati.', jawaban: 'Salah' },
          { pernyataan: 'Sikap jujur membuat seseorang dipercaya oleh teman dan guru.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Menemukan tempat pensil teman di kolong meja', respon: 'Mengembalikan kepada pemiliknya' },
          { premis: 'Mengerjakan lembar soal ulangan harian', respon: 'Percaya diri pada kemampuan sendiri' },
          { premis: 'Dipasrahi uang iuran kas kelas oleh ketua kelas', respon: 'Menjaga dan mencatatnya dengan teliti' },
        ],
        pertanyaanIsian:
          'Sikap dapat dipercaya dalam memegang titipan barang atau rahasia disebut sifat ....................................................',
        kunciIsian: 'amanah',
        pertanyaanUraian:
          'Mengapa seorang murid harus membiasakan diri bersikap jujur dan amanah sejak kecil? Tuliskan 2 manfaatnya!',
        kunciUraian:
          '1. Dicintai oleh Allah Swt. dan meneladani sifat Rasulullah saw.\n2. Disukai dan dipercaya oleh bapak/ibu guru serta teman-teman di sekolah.',
        pembahasan:
          'Menyerahkan barang temuan kepada guru piket adalah wujud perilaku amanah dan jujur yang wajib dimiliki setiap anak muslim.',
        dalil: 'Q.S. An-Nisa/4: 58 — Perintah Menyampaikan Amanah kepada yang Berhak',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Ketertiban Berwudu dan Salat Berjamaah di Musala',
        stimulusModel: 'Model B: Praktik Ibadah di Sekolah',
        indikatorTopik: 'menerapkan adab berwudu dan salat berjamaah secara tertib di musala sekolah',
        cpRingkas: 'Murid mempraktikkan wudu dan salat berjamaah dengan tertib dan hemat air.',
        stimulus:
          'Saat waktu salat Zuhur tiba, murid-murid kelas empat bergegas menuju musala sekolah. Di tempat wudu, keran air mengalir deras.',
        pertanyaanPG: 'Adab yang benar ketika berwudu di keran musala sekolah adalah ....',
        opsiPG: {
          A: 'Membuka keran air secukupnya agar tidak membuang-buang air bersih',
          B: 'Membuka keran sebesar-besarnya sambil memercikkan air ke pakaian teman',
          C: 'Mendorong antrean teman agar bisa selesai wudu lebih awal',
          D: 'Membiarkan keran terus menyala setelah selesai berwudu',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua keutamaan melaksanakan salat fardu secara berjamaah di musala!',
        opsiPGK: {
          A: 'Mendapatkan pahala dua puluh tujuh derajat dibandingkan salat sendirian',
          B: 'Menumbuhkan kebersamaan dan kerukunan antarsesama murid di sekolah',
          C: 'Boleh berbicara dan bercanda saat imam sedang membaca surah pendek',
          D: 'Dapat mendahului gerakan sujud imam agar salat lebih cepat selesai',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Membuang-buang air saat berwudu termasuk perbuatan mubazir yang dibenci Allah.', jawaban: 'Benar' },
          { pernyataan: 'Makmum wajib mengikuti gerakan imam dan tidak mendahuluinya.', jawaban: 'Benar' },
          { pernyataan: 'Salat berjamaah pahalanya sama persis dengan salat sendirian di rumah.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Orang yang memimpin salat berjamaah', respon: 'Imam' },
          { premis: 'Orang yang mengikuti gerakan pemimpin salat', respon: 'Makmum' },
          { premis: 'Pahala salat fardu berjamaah', respon: '27 derajat' },
        ],
        pertanyaanIsian:
          'Orang yang memimpin jalannya salat berjamaah di musala disebut ....................................................',
        kunciIsian: 'imam',
        pertanyaanUraian:
          'Jelaskan 3 adab yang harus diperhatikan seorang makmum saat mengikuti salat berjamaah di musala sekolah!',
        kunciUraian:
          '1. Merapatkan dan meluruskan saf salat sebelum takbiratul ihram dimulai.\n2. Mengikuti gerakan imam dan dilarang mendahului imam.\n3. Tenang dan khusyuk mendengarkan bacaan imam tanpa bercanda.',
        pembahasan:
          'Salat berjamaah melatih kedisiplinan, ketaatan pada pemimpin yang benar, dan meluruskan saf merupakan kesempurnaan salat.',
        dalil: 'Hadis Salat Berjamaah: "Salat berjamaah lebih utama daripada salat sendirian dengan dua puluh tujuh derajat." (HR. Bukhari-Muslim)',
      },
      {
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Adab Membaca dan Menghafal Al-Qur\'an',
        stimulusModel: 'Model B: Tadarus Al-Qur\'an di Kelas',
        indikatorTopik: 'menerapkan adab membaca Al-Qur\'an secara tartil dan khusyuk',
        cpRingkas: 'Murid mampu membaca Al-Qur\'an dengan memperhatikan adab dan tajwid dasar.',
        stimulus:
          'Sebelum pelajaran dimulai, murid kelas empat membiasakan kegiatan tadarus membaca surah pendek bersama-sama secara tartil.',
        pertanyaanPG: 'Adab yang benar ketika Al-Qur\'an sedang dibacakan di kelas adalah ....',
        opsiPG: {
          A: 'Mendengarkan dengan tenang dan khusyuk tanpa membuat kegaduhan',
          B: 'Bermain lempar kertas bersama teman sebangku di pojok kelas',
          C: 'Membaca buku komik sambil mendengarkan musik lewat pelantang',
          D: 'Berbicara dengan suara keras melebihi suara bacaan ayat Al-Qur\'an',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua adab utama seorang muslim ketika memegang dan membaca mushaf Al-Qur\'an!',
        opsiPGK: {
          A: 'Dalam keadaan suci dari hadas kecil dengan berwudu terlebih dahulu',
          B: 'Duduk menghadap kiblat dengan pakaian yang bersih dan menutup aurat',
          C: 'Meletakkan mushaf Al-Qur\'an di lantai dekat tempat kaki berpijak',
          D: 'Membaca ayat dengan tergesa-gesa tanpa memperhatikan tanda waqaf',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Membaca Al-Qur\'an secara tartil berarti membacanya dengan tenang dan benar tajwidnya.', jawaban: 'Benar' },
          { pernyataan: 'Al-Qur\'an boleh diletakkan sembarangan di tempat yang kotor.', jawaban: 'Salah' },
          { pernyataan: 'Mendengarkan lantunan ayat Al-Qur\'an mendatangkan rahmat dari Allah Swt.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Membaca Al-Qur\'an dengan perlahan dan benar', respon: 'Tartil' },
          { premis: 'Hukum membaca ta\'awudz sebelum tilawah', respon: 'Sunnah muakkad' },
          { premis: 'Tempat meletakkan mushaf Al-Qur\'an', respon: 'Tempat yang tinggi dan bersih' },
        ],
        pertanyaanIsian:
          'Membaca ayat suci Al-Qur\'an secara perlahan, tenang, dan sesuai kaidah tajwid disebut membaca secara ....................',
        kunciIsian: 'tartil',
        pertanyaanUraian:
          'Mengapa kita harus menjaga adab dan kesucian badan saat membaca Al-Qur\'an? Tuliskan 2 alasannya!',
        kunciUraian:
          '1. Karena Al-Qur\'an adalah kalamullah (firman Allah Swt.) yang suci dan mulia.\n2. Agar kita memperoleh keberkahan pahala serta mudah memahami petunjuk di dalamnya.',
        pembahasan: 'Menghormati mushaf dan membacanya secara tartil adalah bukti cinta kepada firman Allah.',
        dalil: 'Q.S. Al-Muzzammil/73: 4 — Dan bacalah Al-Qur\'an itu dengan perlahan-lahan (tartil).',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Mengenal Sifat-Sifat Mulia Para Rasul Allah',
        stimulusModel: 'Model B: Kisah Keteladanan Rasulullah',
        indikatorTopik: 'meneladani sifat amanah dan fathanah para rasul dalam kehidupan murid',
        cpRingkas: 'Murid memahami dan meneladani sifat-sifat wajib bagi para rasul.',
        stimulus:
          'Sejak masa mudanya sebelum diangkat menjadi nabi, Muhammad saw. sudah dikenal oleh seluruh penduduk Makkah sebagai sosok yang sangat jujur dan dapat dipercaya.',
        pertanyaanPG: 'Karena kejujuran dan sifat amanahnya, penduduk Makkah memberi gelar kepada beliau berupa gelar ....',
        opsiPG: {
          A: 'Al-Amin yang artinya orang yang dapat dipercaya',
          B: 'Al-Faruq yang artinya pembeda yang benar dan salah',
          C: 'Ash-Shiddiq yang artinya membenarkan kebenaran',
          D: 'Dzun Nurain yang artinya pemilik dua cahaya',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua sifat wajib bagi para rasul Allah beserta artinya yang benar!',
        opsiPGK: {
          A: 'Siddiq yang artinya selalu berkata benar dan tidak pernah berdusta',
          B: 'Fathanah yang artinya memiliki kecerdasan dan kebijaksanaan tinggi',
          C: 'Kizib yang artinya selalu menyembunyikan kebenaran risalah',
          D: 'Khianat yang artinya melanggar janji yang telah disepakati',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Nabi Muhammad saw. diberi gelar Al-Amin oleh bangsa Quraisy.', jawaban: 'Benar' },
          { pernyataan: 'Sifat tabligh artinya rasul selalu menyampaikan wahyu Allah tanpa menyembunyikannya.', jawaban: 'Benar' },
          { pernyataan: 'Para rasul boleh berbohong apabila menghadapi musuh.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Sifat Siddiq', respon: 'Benar dalam perkataan dan perbuatan' },
          { premis: 'Sifat Amanah', respon: 'Dapat dipercaya memegang titipan' },
          { premis: 'Sifat Fathanah', respon: 'Cerdas dan bijaksana' },
        ],
        pertanyaanIsian:
          'Gelar yang diberikan masyarakat Makkah kepada Nabi Muhammad saw. karena kejujuran beliau adalah Al-....................',
        kunciIsian: 'Amin',
        pertanyaanUraian:
          'Sebutkan 4 sifat wajib bagi rasul Allah Swt. beserta artinya secara lengkap!',
        kunciUraian:
          '1. Siddiq artinya berkata benar dan jujur.\n2. Amanah artinya dapat dipercaya.\n3. Tabligh artinya menyampaikan wahyu Allah.\n4. Fathanah artinya cerdas dan bijaksana.',
        pembahasan: 'Empat sifat wajib rasul adalah pedoman utama dalam membentuk karakter anak saleh.',
        dalil: 'Q.S. Al-Ahzab/33: 21 — Sesungguhnya telah ada pada diri Rasulullah itu suri teladan yang baik.',
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Kisah Ketabahan Nabi Ayyub a.s. dalam Menghadapi Ujian',
        stimulusModel: 'Model B: Kisah Teladan Kesabaran Nabi',
        indikatorTopik: 'meneladani kesabaran dan keikhlasan Nabi Ayyub a.s. saat ditimpa cobaan',
        cpRingkas: 'Murid mengambil ibrah kesabaran dan keikhlasan dari kisah para nabi.',
        stimulus:
          'Nabi Ayyub a.s. diuji oleh Allah Swt. dengan kehilangan harta benda, anak-anaknya wafat, dan menderita sakit menahun. Meskipun demikian, lidah beliau tidak pernah berhenti berzikir dan memuji Allah.',
        pertanyaanPG: 'Sikap terpuji paling utama yang dapat kita teladani dari kisah Nabi Ayyub a.s. adalah ....',
        opsiPG: {
          A: 'Sabar dan ikhlas menerima ujian serta tetap beribadah kepada Allah',
          B: 'Menyalahkan orang lain ketika sedang sakit atau tertimpa kemalangan',
          C: 'Berhenti beribadah karena menganggap doa tidak dikabulkan',
          D: 'Membalas perbuatan buruk orang lain dengan kemarahan besar',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua sikap seorang murid yang mencerminkan keteladanan sifat sabar di sekolah!',
        opsiPGK: {
          A: 'Tidak mudah marah dan memaafkan teman yang tidak sengaja menyenggol tangannya',
          B: 'Tetap tabah dan rajin belajar meskipun pernah mendapatkan nilai ujian yang kurang memuaskan',
          C: 'Langsung memukul teman yang berbeda pendapat saat berdiskusi di kelompok',
          D: 'Mengeluh terus-menerus ketika diberikan tugas pekerjaan rumah oleh bapak guru',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Nabi Ayyub a.s. terkenal dengan kesabarannya yang luar biasa menghadapi ujian hidup.', jawaban: 'Benar' },
          { pernyataan: 'Sabar berarti berdiam diri tanpa berusaha mencari kesembuhan saat sakit.', jawaban: 'Salah' },
          { pernyataan: 'Allah mencintai orang-orang yang sabar dalam menghadapi cobaan.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Ujian penyakit berat dan kehilangan harta', respon: 'Nabi Ayyub a.s.' },
          { premis: 'Mukjizat selamat dari kobaran api besar', respon: 'Nabi Ibrahim a.s.' },
          { premis: 'Mukjizat membuat bahtera besar di atas bukit', respon: 'Nabi Nuh a.s.' },
        ],
        pertanyaanIsian:
          'Nabi yang terkenal sangat sabar dan tabah menghadapi penyakit menahun dan kehilangan harta adalah Nabi ....................',
        kunciIsian: 'Ayyub a.s.',
        pertanyaanUraian:
          'Apa hikmah yang dapat kamu petik dari kisah kesabaran Nabi Ayyub a.s. ketika kamu sedang sakit atau menghadapi kesulitan?',
        kunciUraian:
          '1. Mengajarkan agar kita senantiasa sabar, tidak berputus asa, dan selalu berbaik sangka kepada Allah Swt.\n2. Selalu berdoa dan berikhtiar memohon kesembuhan serta pertolongan kepada Allah.',
        pembahasan: 'Kesabaran Nabi Ayyub a.s. adalah lambang keteguhan iman sejati.',
        dalil: 'Q.S. Al-Anbiya/21: 83–84 tentang doa Nabi Ayyub a.s.',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Adab Berteman dan Menjaga Kerukunan Kelas',
        stimulusModel: 'Model B: Kerja Bakti Kebersihan Kelas',
        indikatorTopik: 'menerapkan sikap tolong menolong dan gotong royong saat piket kelas',
        cpRingkas: 'Murid membiasakan sikap tolong-menolong dan gotong royong di lingkungan sekolah.',
        stimulus:
          'Jumat bersih di sekolah, regu piket kelas empat bersama-sama membersihkan ruang kelas. Dito menyapu lantai, sedangkan Roni mengepel dan merapikan meja guru.',
        pertanyaanPG: 'Manfaat utama dari kegiatan gotong royong membersihkan kelas bersama-sama adalah ....',
        opsiPG: {
          A: 'Pekerjaan yang berat menjadi lebih ringan dan kelas menjadi bersih serta nyaman',
          B: 'Dapat saling menyuruh teman lain agar kita bisa bersantai di luar kelas',
          C: 'Membuat suasana kelas menjadi gaduh dan penuh perdebatan antarmurid',
          D: 'Menghabiskan waktu jam pelajaran agar tidak perlu belajar matematika',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua perilaku terpuji saat melaksanakan tugas piket kebersihan kelas!',
        opsiPGK: {
          A: 'Membagi tugas secara adil dan mengerjakannya dengan penuh tanggung jawab',
          B: 'Saling membantu teman yang belum selesai menyelesaikan tugas piketnya',
          C: 'Segera pulang ke rumah sebelum menyelesaikan tugas membersihkan papan tulis',
          D: 'Menyapu sampah ke bawah kolong meja murid lain secara sembunyi-sembunyi',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Piket kelas yang dikerjakan bersama-sama mempererat kerukunan teman sekelas.', jawaban: 'Benar' },
          { pernyataan: 'Menjaga kebersihan kelas hanya merupakan tugas penjaga sekolah saja.', jawaban: 'Salah' },
          { pernyataan: 'Kelas yang bersih dan rapi membuat suasana belajar menjadi lebih menyenangkan.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Papan tulis penuh coretan spidol', respon: 'Dihapus memakai penghapus bersih' },
          { premis: 'Lantai kelas banyak debu dan kertas', respon: 'Disapu lalu dikumpulkan ke tempat sampah' },
          { premis: 'Meja dan kursi berantakan setelah belajar', respon: 'Dirapikan lurus sesuai barisan' },
        ],
        pertanyaanIsian:
          'Bekerja sama saling membantu membersihkan kelas secara sukarela merupakan wujud sikap gotong ....................',
        kunciIsian: 'royong',
        pertanyaanUraian:
          'Tuliskan 3 manfaat yang dirasakan murid apabila ruang kelas selalu dijaga kebersihan dan kerapiannya!',
        kunciUraian:
          '1. Suasana belajar di kelas menjadi nyaman, sejuk, dan menyenangkan.\n2. Terhindar dari kuman penyakit dan gigitan nyamuk.\n3. Melatih rasa tanggung jawab dan kerja sama antarmurid.',
        pembahasan: 'Kebersihan lingkungan belajar adalah cerminan keimanan warga kelas.',
        dalil: 'Hadis Thaharah dan tolong menolong dalam kebajikan.',
      },
    ],
    isian: [
      {
        elemen: 'Akhlak',
        materiPokok: 'Kedermawanan dan Empati',
        stimulusModel: 'Model B: Berbagi Bekal di Sekolah',
        indikatorTopik: 'menjelaskan manfaat gemar berbagi bekal kepada teman yang membutuhkan',
        cpRingkas: 'Murid membiasakan sikap dermawan dan peduli kawan.',
        stimulus: 'Riko lupa membawa bekal makan siang. Hanif membagi sebagian rotinya untuk Riko.',
        pertanyaanPG: 'Sikap Hanif membagi bekal menunjukkan sifat ....',
        opsiPG: { A: 'Dermawan', B: 'Kikir', C: 'Pamer' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua keutamaan sikap dermawan dan suka menolong teman di sekolah!',
        opsiPGK: {
          A: 'Dicintai oleh Allah Swt. dan disukai oleh banyak teman di sekolah',
          B: 'Menumbuhkan rasa persaudaraan dan kebahagiaan dalam tolong-menolong',
          C: 'Menjadikan murid merasa paling kaya dan berhak memerintah teman lain',
          D: 'Membuat orang yang ditolong merasa terhina dan berutang budi seumur hidup',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Berbagi rezeki dengan teman tidak akan mengurangi keberkahan harta kita.', jawaban: 'Benar' },
          { pernyataan: 'Memberi bantuan harus disertai rasa ikhlas tanpa mengharap pujian manusia.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Memberi bantuan dengan ikhlas', respon: 'Mendapat rida dan pahala dari Allah' },
          { premis: 'Pemberian yang diungkit-ungkit', respon: 'Menghilangkan pahala kebaikan' },
        ],
        pertanyaanIsian: 'Suka membagikan sebagian makanan atau rezeki kepada teman yang membutuhkan disebut sifat ....................',
        kunciIsian: 'dermawan (gemar berbagi)',
        pertanyaanUraian: 'Tuliskan 2 manfaat gemar berbagi makanan dengan teman di sekolah!',
        kunciUraian: '1. Mempererat tali persahabatan.\n2. Mendapat pahala dan keberkahan rezeki dari Allah Swt.',
        pembahasan: 'Berbagi melatih empati dan kedermawanan.',
        dalil: 'Hadis tangan di atas lebih baik daripada tangan di bawah.',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Mengenal Sifat Tabligh',
        stimulusModel: 'Model B: Karakter Rasulullah',
        indikatorTopik: 'mengenal sifat wajib Rasulullah saw.',
        cpRingkas: 'Murid mengenal sifat mulia Rasulullah saw.',
        stimulus: 'Nabi Muhammad saw. selalu menyampaikan kebenaran wahyu Allah tanpa menyembunyikannya sedikit pun.',
        pertanyaanPG: 'Sifat rasul yang menyampaikan wahyu disebut ....',
        opsiPG: { A: 'Tabligh', B: 'Siddiq', C: 'Kadzib' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua sifat mustahil bagi para rasul yang tidak mungkin dimiliki utusan Allah!',
        opsiPGK: {
          A: 'Kadzib yang memiliki arti suka berkata dusta atau bohong',
          B: 'Khianat yang memiliki arti tidak dapat dipercaya atau curang',
          C: 'Amanah yang memiliki arti dapat dipercaya memegang titipan',
          D: 'Fathanah yang memiliki arti cerdas dan memiliki ilmu luas',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Sifat tabligh artinya menyampaikan kebenaran wahyu Allah Swt.', jawaban: 'Benar' },
          { pernyataan: 'Para rasul memiliki sifat kitman yang artinya menyembunyikan ajaran.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Lawan dari sifat Siddiq (jujur)', respon: 'Kadzib (bohong)' },
          { premis: 'Lawan dari sifat Amanah (dipercaya)', respon: 'Khianat (curang)' },
        ],
        pertanyaanIsian: 'Sifat wajib bagi para rasul yang berarti selalu menyampaikan kebenaran wahyu Allah adalah ....................',
        kunciIsian: 'tabligh',
        pertanyaanUraian: 'Sebutkan 4 sifat wajib bagi rasul beserta artinya!',
        kunciUraian: '1. Siddiq (benar), 2. Amanah (dapat dipercaya), 3. Tabligh (menyampaikan), 4. Fathanah (cerdas).',
        pembahasan: 'Empat sifat wajib rasul adalah teladan akhlak terbaik.',
        dalil: 'Q.S. Al-Ahzab: 21.',
      },
    ],
    uraian: [
      {
        elemen: 'Fikih',
        materiPokok: 'Ketentuan Tanda-Tanda Balig',
        stimulusModel: 'Model B: Pemahaman Kewajiban Ibadah',
        indikatorTopik: 'menjelaskan tanda balig dan kewajiban ibadah',
        cpRingkas: 'Murid memahami konsep balig dan tanggung jawab ibadah.',
        stimulus: 'Pak Guru menjelaskan bahwa ketika seseorang telah memasuki usia balig, maka seluruh amal perbuatannya mulai dicatat oleh malaikat.',
        pertanyaanPG: 'Seseorang yang telah balig dan berakal sehat serta dikenai kewajiban syariat disebut ....',
        opsiPG: { A: 'Mukallaf', B: 'Mualaf', C: 'Mubalig' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua kewajiban ibadah utama bagi seorang muslim yang telah balig!',
        opsiPGK: {
          A: 'Melaksanakan salat fardu lima waktu tanpa boleh ditinggalkan secara sengaja',
          B: 'Menjalankan ibadah puasa di bulan Ramadan bagi yang mampu secara fisik',
          C: 'Membayar zakat mal meskipun belum memiliki penghasilan dan harta sendiri',
          D: 'Melaksanakan ibadah haji ke kota Makkah setiap tahun secara berturut-turut',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Usia balig menandai awal tanggung jawab pribadi seorang muslim.', jawaban: 'Benar' },
          { pernyataan: 'Anak yang sudah balig boleh meninggalkan salat jika sedang lelah.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Batas mulainya kewajiban syariat', respon: 'Usia balig' },
          { premis: 'Kewajiban paling utama setelah balig', respon: 'Salat lima waktu' },
        ],
        pertanyaanIsian: 'Seseorang yang telah mencapai usia balig dan dibebani kewajiban syariat agama disebut ....................',
        kunciIsian: 'mukallaf',
        pertanyaanUraian:
          'Mengapa seorang anak yang telah balig wajib melaksanakan salat fardu lima waktu tanpa boleh ditinggalkan? Jelaskan alasanmu!',
        kunciUraian:
          '1. Karena balig merupakan batas dimulainya tanggung jawab keagamaan (mukallaf) secara mandiri di hadapan Allah Swt.\n2. Salat fardu adalah rukun Islam kedua yang menjadi tiang agama dan pembeda antara kebaikan dan kemaksiatan.',
        pembahasan: 'Tanda balig menandai awal kewajiban syariat (taklif).',
        dalil: 'Hadis tentang diangkatnya pena pencatat amal bagi tiga golongan.',
      },
    ],
  },

  // =========================================================================
  // FASE C: KELAS 5–6 SD/MI (USIA 10–12 TAHUN)
  // Konteks: Q.S. Al-Hujurat 13, Asmaul Husna, Takdir Muallaq & Ikhtiar, Zakat Fitrah, Halalan Thayyiban, Anti-Bullying, Musyawarah Khulafaurrasyidin
  // DILARANG KERAS SOAL SMA (pinjol, tiket konser, mystery box, dropship, syu'abul iman, maqashid syariah) atau SOAL KELAS 1 SD (kucing teras, tumpah air minum)
  // =========================================================================
  'Fase C': {
    pg: [
      {
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Pesan Pokok Q.S. Al-Hujurat/49: 13 tentang Keragaman',
        stimulusModel: 'Model A: Penggalan Ayat/Hadis Bergaris Bawah',
        indikatorTopik: 'mengartikan penggalan ayat bergaris bawah pada Q.S. Al-Hujurat/49: 13 tentang tujuan penciptaan manusia yang beragam',
        cpRingkas: 'Murid memahami pesan pokok Q.S. Al-Hujurat/49: 13 tentang keragaman manusia untuk saling mengenal.',
        stimulus:
          'Perhatikan potongan Q.S. Al-Hujurat/49: 13 berikut!\nيَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُمْ مِنْ ذَكَرٍ وَأُنْثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِنْدَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ\n"Wa ja\'alnakum syu\'uban wa qaba\'ila [lita\'arafu] — Inna akramakum \'indallahi atqakum."',
        pertanyaanPG: 'Arti yang tepat untuk penggalan ayat lita\'arafu (لِتَعَارَفُوا) pada Q.S. Al-Hujurat/49: 13 di atas adalah ....',
        opsiPG: {
          A: 'Agar kalian saling mengenal dan menghargai satu sama lain',
          B: 'Agar kalian saling berlomba mengumpulkan harta kekayaan',
          C: 'Supaya setiap suku bangsa hidup terpisah di daerahnya sendiri',
          D: 'Supaya manusia membanggakan kehebatan sukunya masing-masing',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua perilaku nyata di sekolah yang sesuai dengan penggalan ayat di atas!',
        opsiPGK: {
          A: 'Kita dapat saling mengenal kebiasaan baik dan bahasa daerah teman dari berbagai pulau',
          B: 'Melatih sikap saling menghormati dan bekerja sama menjaga kerukunan kelas',
          C: 'Memudahkan kita mencari alasan untuk membentuk kelompok yang saling bersaing',
          D: 'Menentukan suku mana yang paling hebat dan berhak menjadi ketua kelas',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Allah menciptakan manusia bersuku-suku agar saling mengenal dan menghargai.', jawaban: 'Benar' },
          { pernyataan: 'Anak yang berasal dari keluarga kaya lebih mulia di hadapan Allah daripada anak sederhana.', jawaban: 'Salah' },
          { pernyataan: 'Kemuliaan seseorang di sisi Allah diukur dari ketakwaan dan amal baiknya.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Arti kata "lita\'arafu" dalam Surah Al-Hujurat ayat 13', respon: 'Agar kalian saling mengenal' },
          { premis: 'Ukuran kemuliaan manusia di hadapan Allah Swt.', respon: 'Ketakwaan dan amal saleh' },
          { premis: 'Sikap terhadap teman yang berbeda suku daerah', respon: 'Berteman dengan rukun tanpa membeda-bedakan' },
        ],
        pertanyaanIsian:
          'Di hadapan Allah Swt., orang yang paling mulia di antara manusia bukanlah yang paling kaya atau rupawan, melainkan orang yang paling ....',
        kunciIsian: 'bertakwa',
        pertanyaanUraian:
          'Tuliskan arti dari potongan ayat "Inna akramakum \'indallahi atqakum" beserta 2 contoh pengamalannya dalam pergaulan di sekolah!',
        kunciUraian:
          '1. Artinya: "Sesungguhnya yang paling mulia di antara kamu di sisi Allah ialah orang yang paling bertakwa."\n2. Contoh pengamalan: (a) Berteman dengan semua murid tanpa memandang latar belakang suku atau kekayaan; (b) Berbuat jujur, rajin beribadah, dan menghormati sesama teman.',
        pembahasan:
          'Q.S. Al-Hujurat/49: 13 mengajarkan bahwa perbedaan suku dan bangsa adalah ciptaan Allah agar manusia saling mengenal (lita\'arafu), dan yang paling mulia di sisi-Nya adalah yang paling bertakwa.',
        dalil: 'Q.S. Al-Hujurat/49: 13 — Saling Mengenal dalam Keberagaman',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Keteladanan Asmaul Husna (Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit)',
        stimulusModel: 'Model C: Tabel Pencocokan Asmaul Husna & Perilaku Sehari-hari',
        indikatorTopik: 'menganalisis pasangan Asmaul Husna dan contoh perilaku sehari-hari yang tepat pada tabel',
        cpRingkas: 'Murid memahami makna Asmaul Husna Al-Qawiyyu, Al-Qayyum, Al-Muhyi, dan Al-Mumit serta meneladaninya dalam perilaku.',
        stimulus:
          'Perhatikan tabel berikut!\n| Kode | Asmaul Husna | Contoh Perilaku Murid Sehari-hari |\n| 1 | Al-Qayyum (Maha Mandiri) | Merapikan tempat tidur dan menyiapkan buku pelajaran sendiri tanpa menyuruh orang lain |\n| 2 | Al-Qawiyyu (Maha Kuat) | Menggunakan tenaga fisik untuk menakut-nakuti teman yang bertubuh kecil |\n| 3 | Al-Muhyi (Maha Menghidupkan) | Menyiram tanaman di taman kelas secara rutin agar tumbuh subur |',
        pertanyaanPG: 'Berdasarkan tabel di atas, pasangan Asmaul Husna dan perilaku keteladanan yang benar ditunjukkan oleh nomor ....',
        opsiPG: {
          A: 'Nomor 1 dan 2',
          B: 'Nomor 1 dan 3',
          C: 'Nomor 2 dan 3',
          D: 'Nomor 2 saja',
        },
        kunciPG: 'B',
        pertanyaanPGK: 'Pilihlah dua perilaku murid kelas lima yang meneladani sifat Allah Al-Qayyum (Maha Mandiri)!',
        opsiPGK: {
          A: 'Mengerjakan soal ulangan dengan jujur dan usaha sendiri tanpa menyontek teman',
          B: 'Mencuci piring bekas makan sendiri di rumah tanpa menunggu disuruh ibu',
          C: 'Meminta kakak mengerjakan seluruh tugas prakarya sekolah sampai selesai',
          D: 'Menangis setiap pagi jika sepatu sekolahnya belum dipakaikan oleh ayah',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Meneladani sifat Al-Qayyum dilakukan dengan membiasakan hidup mandiri sejak kecil.', jawaban: 'Benar' },
          { pernyataan: 'Anak yang kuat boleh memaksakan kehendaknya kepada teman yang lemah.', jawaban: 'Salah' },
          { pernyataan: 'Menjaga kelestarian tumbuhan dan hewan adalah wujud syukur kepada Allah Al-Muhyi.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Al-Qayyum (Allah Maha Mandiri / Berdiri Sendiri)', respon: 'Menyiapkan perlengkapan sekolah secara mandiri' },
          { premis: 'Al-Qawiyyu (Allah Maha Kuat)', respon: 'Membantu teman membawa tumpukan buku ke ruang guru' },
          { premis: 'Al-Muhyi (Allah Maha Menghidupkan)', respon: 'Merawat tanaman di halaman sekolah agar tidak layu' },
        ],
        pertanyaanIsian:
          'Asmaul Husna yang memiliki arti bahwa Allah Swt. Maha Mandiri dan tidak membutuhkan bantuan makhluk-Nya adalah ....',
        kunciIsian: 'Al-Qayyum',
        pertanyaanUraian:
          'Jelaskan 3 contoh sikap mandiri seorang murid di rumah dan di sekolah sebagai wujud meneladani Asmaul Husna Al-Qayyum!',
        kunciUraian:
          '1. Merapikan tempat tidur dan menyiapkan perlengkapan sekolah sendiri setiap malam.\n2. Mencuci piring makan sendiri tanpa membebani orang tua.\n3. Mengerjakan tugas dan ujian sekolah dengan jujur tanpa menyontek.',
        pembahasan:
          'Nomor 1 benar (Al-Qayyum diteladani dengan sikap mandiri) dan Nomor 3 benar (Al-Muhyi diteladani dengan memelihara kehidupan tumbuhan). Nomor 2 salah karena kekuatan harus digunakan untuk menolong yang lemah, bukan menindas.',
        dalil: 'Q.S. Al-Baqarah/2: 255 (Ayat Kursi — Al-Hayyu Al-Qayyum)',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Iman kepada Qada dan Qadar (Takdir Muallaq & Ikhtiar)',
        stimulusModel: 'Model D: Daftar Pernyataan Berangka (1), (2), (3), (4)',
        indikatorTopik: 'menganalisis daftar pernyataan berangka (1)–(4) tentang contoh takdir muallaq dan ikhtiar',
        cpRingkas: 'Murid memahami makna iman kepada Qada dan Qadar yang mendorong semangat berikhtiar.',
        stimulus:
          'Perhatikan beberapa pernyataan berikut!\n(1) Bima belajar dengan tekun setiap malam agar memperoleh nilai rapor yang memuaskan.\n(2) Jenis kelamin bayi laki-laki atau perempuan ketika dilahirkan ke dunia.\n(3) Pak Ahmad rajin berolahraga dan makan sayur agar tubuhnya tetap sehat dan bugar.\n(4) Matahari terbit dari sebelah timur dan tenggelam di sebelah barat.',
        pertanyaanPG: 'Berdasarkan beberapa pernyataan di atas, contoh takdir muallaq (ketentuan Allah yang berkaitan dengan ikhtiar/usaha manusia) ditunjukkan oleh nomor ....',
        opsiPG: {
          A: '(1) dan (2)',
          B: '(1) dan (3)',
          C: '(2) dan (4)',
          D: '(3) dan (4)',
        },
        kunciPG: 'B',
        pertanyaanPGK: 'Pilihlah dua sikap terpuji seorang murid dalam mengimani takdir Allah Swt.!',
        opsiPGK: {
          A: 'Belajar bersungguh-sungguh dan berdoa sebelum menghadapi ujian sekolah',
          B: 'Bersikap tawakal dan tidak putus asa ketika hasil usaha belum sesuai harapan',
          C: 'Tidak perlu belajar sama sekali karena nilai ujian sudah ditentukan takdir',
          D: 'Menyalahkan teman sebangku apabila mendapatkan nilai ulangan yang rendah',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Takdir muallaq adalah ketentuan Allah yang mengikutsertakan usaha dan doa manusia.', jawaban: 'Benar' },
          { pernyataan: 'Orang yang beriman kepada takdir tidak perlu berobat ketika sedang sakit.', jawaban: 'Salah' },
          { pernyataan: 'Setelah berusaha sekuat tenaga, kita wajib bertawakal menyerahkan hasil kepada Allah Swt.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Ketentuan Allah yang dapat diupayakan melalui ikhtiar dan doa', respon: 'Takdir Muallaq' },
          { premis: 'Ketentuan mutlak Allah yang tidak dapat diubah manusia', respon: 'Takdir Mubram' },
          { premis: 'Berserah diri kepada Allah setelah berusaha maksimal', respon: 'Tawakal' },
        ],
        pertanyaanIsian:
          'Usaha sungguh-sungguh yang dilakukan manusia untuk mencapai cita-cita atau kebaikan sebelum bertawakal kepada Allah Swt. disebut ....................................................',
        kunciIsian: 'ikhtiar',
        pertanyaanUraian:
          'Jelaskan perbedaan antara takdir muallaq dan takdir mubram beserta masing-masing 1 contohnya!',
        kunciUraian:
          '1. Takdir muallaq adalah ketentuan Allah yang melibatkan ikhtiar/usaha manusia, contohnya kepandaian diperoleh dengan rajin belajar.\n2. Takdir mubram adalah ketentuan mutlak Allah yang tidak dapat diubah manusia, contohnya waktu kematian atau jenis kelamin saat lahir.',
        pembahasan:
          'Pernyataan (1) kepandaian melalui belajar dan (3) kesehatan melalui olahraga merupakan contoh takdir muallaq. Sedangkan pernyataan (2) dan (4) adalah ketetapan mutlak Allah (takdir mubram/sunnatullah).',
        dalil: 'Q.S. Ar-Ra\'d/13: 11 — Allah tidak mengubah keadaan suatu kaum hingga mereka mengubah keadaan diri mereka sendiri',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Ketentuan Zakat Fitrah, Infak, dan Sedekah',
        stimulusModel: 'Model B: Narasi Perhitungan Zakat Keluarga',
        indikatorTopik: 'menghitung takaran zakat fitrah keluarga dan memahami hikmah berbagi menjelang Idulfitri',
        cpRingkas: 'Murid memahami ketentuan zakat fitrah, infak, dan sedekah serta hikmahnya bagi masyarakat.',
        stimulus:
          'Dua hari menjelang Hari Raya Idulfitri, Pak Rahmat mengajak Ilham ke masjid untuk menyerahkan zakat fitrah. Di rumah Pak Rahmat tinggal lima orang, yaitu Pak Rahmat, Ibu, Ilham, dan kedua adik Ilham.',
        pertanyaanPG:
          'Jika setiap orang wajib membayar zakat fitrah sebanyak 2,5 kilogram beras, berapa total beras yang harus dibawa Pak Rahmat dan Ilham?',
        opsiPG: {
          A: '7,5 kilogram beras',
          B: '10,0 kilogram beras',
          C: '12,5 kilogram beras',
          D: '15,0 kilogram beras',
        },
        kunciPG: 'C',
        pertanyaanPGK: 'Pilihlah dua manfaat utama membayar zakat fitrah sebelum pelaksanaan salat Idulfitri!',
        opsiPGK: {
          A: 'Membersihkan diri orang yang berpuasa dari perbuatan dan ucapan sia-sia',
          B: 'Membantu tetangga fakir miskin agar ikut bergembira memiliki makanan di hari raya',
          C: 'Mendapatkan pujian dan pengumuman nama penyumbang terbesar lewat pengeras suara',
          D: 'Menggugurkan kewajiban salat lima waktu selama libur Hari Raya Idulfitri',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Zakat fitrah paling lambat dikeluarkan sebelum salat Idulfitri dimulai.', jawaban: 'Benar' },
          { pernyataan: 'Fakir dan miskin termasuk golongan yang berhak menerima zakat fitrah.', jawaban: 'Benar' },
          { pernyataan: 'Zakat fitrah hanya wajib dibayar oleh orang dewasa yang sudah bekerja.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Takaran zakat fitrah untuk setiap satu jiwa', respon: '2,5 kilogram atau 3,5 liter beras' },
          { premis: 'Sebutan bagi orang yang wajib mengeluarkan zakat', respon: 'Muzaki' },
          { premis: 'Sebutan bagi orang yang berhak menerima zakat', respon: 'Mustahik' },
        ],
        pertanyaanIsian:
          'Apabila seseorang menyerahkan beras zakat fitrah setelah selesai pelaksanaan salat Idulfitri, maka pemberian tersebut dinilai sebagai ....',
        kunciIsian: 'sedekah biasa',
        pertanyaanUraian:
          'Hitunglah jumlah zakat fitrah yang wajib dikeluarkan keluarga Pak Rahmat (5 jiwa × 2,5 kg beras) dan jelaskan 3 hikmah menunaikan zakat fitrah sebelum salat Idulfitri!',
        kunciUraian:
          '1. Perhitungan: 5 jiwa × 2,5 kg beras = 12,5 kg beras.\n2. Tiga hikmah zakat fitrah: (a) Menyucikan jiwa orang yang berpuasa dari perbuatan sia-sia; (b) Membahagiakan fakir miskin di Hari Raya Idulfitri; (c) Menumbuhkan rasa syukur dan kepedulian sosial.',
        pembahasan:
          '5 jiwa × 2,5 kg beras = 12,5 kg beras. Zakat fitrah berfungsi menyucikan jiwa orang yang berpuasa (thuhratan lish-shaim) dan memberi kecukupan makanan bagi kaum miskin pada hari raya.',
        dalil: 'Hadis Ibnu Abbas r.a. tentang Zakat Fitrah (HR. Abu Dawud dan Ibnu Majah)',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Indahnya Saling Menghargai (Al-Samhah dalam Pergaulan)',
        stimulusModel: 'Model B: Narasi Belajar Kelompok Antarteman',
        indikatorTopik: 'menerapkan sikap menghargai teman berbeda agama saat belajar kelompok',
        cpRingkas: 'Murid menerapkan sikap saling menghargai antarumat beragama dalam kehidupan sehari-hari.',
        stimulus:
          'Dedi dan Made sedang belajar kelompok di rumah Dedi. Saat azan Asar berkumandang, Dedi pamit sebentar untuk salat di masjid. Made yang berbeda agama menunggu dengan tenang dan tidak menyalakan televisi dengan suara keras.',
        pertanyaanPG: 'Sikap terpuji yang ditunjukkan oleh Made pada cerita di atas adalah ....',
        opsiPG: {
          A: 'Mengajak Made ikut salat ke masjid',
          B: 'Menghargai kesempatan temannya beribadah dengan tidak membuat kegaduhan',
          C: 'Menyuruh Made segera pulang ke rumahnya',
          D: 'Membatalkan salat Asar demi menemani Made',
        },
        kunciPG: 'B',
        pertanyaanPGK: 'Pilihlah dua sikap yang tepat dilakukan Dedi dan Made agar tugas kelompok selesai tanpa melalaikan ibadah!',
        opsiPGK: {
          A: 'Dedi meminta izin dengan sopan untuk melaksanakan salat Asar tepat waktu',
          B: 'Made menjaga ketenangan di ruang belajar sambil merapikan catatan tugas',
          C: 'Dedi menunda salat Asar sampai waktu Magrib tiba karena malu kepada Made',
          D: 'Made mendesak Dedi agar tidak usah salat supaya tugas kelompok cepat selesai',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Belajar kelompok bersama teman yang berbeda agama boleh dilakukan dengan rukun.', jawaban: 'Benar' },
          { pernyataan: 'Kita boleh meninggalkan salat lima waktu demi mengerjakan PR kelompok.', jawaban: 'Salah' },
          { pernyataan: 'Menjaga ketenangan saat teman sedang beribadah adalah wujud sikap toleransi.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Azan Asar berkumandang saat sedang kerja kelompok', respon: 'Pamit dengan sopan untuk menunaikan salat' },
          { premis: 'Teman yang berbeda agama sedang berdoa', respon: 'Menjaga ketenangan dan tidak mengganggu' },
          { premis: 'Tetangga kampung mengalami musibah banjir', respon: 'Bergotong royong membantu tanpa membedakan suku' },
        ],
        pertanyaanIsian:
          'Sikap saling menghormati dan memberikan kesempatan kepada teman yang berbeda agama untuk menjalankan ibadahnya dengan tenang disebut sikap ....................................................',
        kunciIsian: 'toleransi (tasamuh)',
        pertanyaanUraian:
          'Mengapa Dedi tetap wajib melaksanakan salat Asar tepat waktu meskipun sedang ada tamu belajar kelompok di rumahnya, dan bagaimana cara menyampaikannya dengan santun?',
        kunciUraian:
          '1. Karena salat lima waktu adalah kewajiban utama seorang muslim yang tidak boleh ditinggalkan.\n2. Cara menyampaikannya adalah dengan meminta izin secara sopan kepada Made dan mempersilakannya menunggu sebentar dengan nyaman.',
        pembahasan:
          'Toleransi antarumat beragama ditunjukkan dengan saling menghormati waktu ibadah masing-masing tanpa meninggalkan kewajiban agama sendiri dan tanpa membuat kegaduhan.',
        dalil: 'Q.S. Al-Kafirun/109: 6 & Q.S. Al-Hujurat/49: 13',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Kepedulian dan Gotong Royong Antartetangga',
        stimulusModel: 'Model B: Narasi Musibah Warga Kampung',
        indikatorTopik: 'menerapkan semangat gotong royong saat tetangga kampung tertimpa musibah',
        cpRingkas: 'Murid menerapkan sikap peduli dan gotong royong dalam kehidupan bertetangga di masyarakat.',
        stimulus:
          'Hujan deras semalam membuat atap dapur rumah Pak Surya bocor parah. Padahal Pak Surya sedang dirawat di rumah sakit. Warga kampung bersama anak-anak remaja segera berkumpul di depan rumah Pak Surya pagi itu.',
        pertanyaanPG: 'Tindakan paling tepat yang dapat dilakukan murid kelas enam untuk ikut membantu keluarga Pak Surya adalah ....',
        opsiPG: {
          A: 'Membantu memindahkan perabotan yang ringan ke tempat kering dan menyumbang makanan',
          B: 'Menonton dari pinggir jalan sambil merekam kesedihan keluarga Pak Surya',
          C: 'Ikut memanjat ke atas genteng yang licin tanpa izin orang dewasa',
          D: 'Menolak membantu karena keluarga Pak Surya berasal dari luar daerah',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua adab bertetangga yang baik sesuai tuntunan Rasulullah saw.!',
        opsiPGK: {
          A: 'Menjenguk dan mendoakan tetangga yang sedang sakit di rumah sakit',
          B: 'Membagikan sebagian masakan berkuah kepada tetangga sebelah rumah',
          C: 'Menyalakan musik dengan suara sangat keras saat malam hari jam istirahat',
          D: 'Membuang sampah daun kering ke halaman rumah tetangga sebelah',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Menolong tetangga yang tertimpa musibah dilakukan tanpa memandang agamanya.', jawaban: 'Benar' },
          { pernyataan: 'Kita hanya perlu berbuat baik kepada tetangga yang pernah memberi kita hadiah.', jawaban: 'Salah' },
          { pernyataan: 'Gotong royong membersihkan selokan kampung dapat mencegah bencana banjir.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Tetangga sedang dirawat karena sakit', respon: 'Menjenguk dan mendoakan kesembuhannya' },
          { premis: 'Lingkungan kampung mengadakan kerja bakti Minggu pagi', respon: 'Ikut menyapu dan mengumpulkan sampah plastik' },
          { premis: 'Ibu memasak sup ayam dalam jumlah cukup banyak', respon: 'Mengantarkan semangkuk sup ke rumah tetangga dekat' },
        ],
        pertanyaanIsian:
          'Bekerja bersama-sama dengan warga sekitar untuk menyelesaikan pekerjaan kampung secara sukarela disebut kegiatan ....................................................',
        kunciIsian: 'gotong royong (kerja bakti)',
        pertanyaanUraian:
          'Tuliskan 3 manfaat kegiatan kerja bakti dan gotong royong bersama warga di lingkungan tempat tinggalmu!',
        kunciUraian:
          '1. Pekerjaan yang berat menjadi lebih ringan dan cepat selesai.\n2. Lingkungan kampung menjadi bersih, sehat, dan bebas banjir.\n3. Hubungan antarwarga menjadi rukun, akrab, dan saling peduli.',
        pembahasan:
          'Islam sangat memuliakan hak tetangga. Membantu tetangga yang tertimpa musibah sesuai kemampuan adalah bukti iman kepada Allah dan hari akhir.',
        dalil: 'Hadis Hak Tetangga: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tetangganya." (HR. Bukhari-Muslim)',
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Musyawarah dalam Kepemimpinan Khulafaurrasyidin',
        stimulusModel: 'Model B: Narasi Musyawarah Kelas',
        indikatorTopik: 'meneladani sikap bijaksana Khulafaurrasyidin dalam musyawarah dan kepemimpinan',
        cpRingkas: 'Murid meneladani sifat bijaksana, adil, dan gemar bermusyawarah dari kisah Khulafaurrasyidin.',
        stimulus:
          'Murid-murid kelas enam sedang berdiskusi menentukan tujuan kunjungan belajar akhir tahun. Sebagian murid mengusulkan pergi ke museum sejarah, sedangkan sebagian lainnya ingin berkunjung ke kebun raya.',
        pertanyaanPG: 'Cara terbaik yang dilakukan ketua kelas untuk mengambil keputusan bersama adalah ....',
        opsiPG: {
          A: 'Mendengarkan alasan kedua usulan dengan tenang lalu bermusyawarah mencari kesepakatan',
          B: 'Menetapkan tujuan sesuai keinginan ketua kelas sendiri tanpa peduli pendapat teman',
          C: 'Membatalkan seluruh rencana kunjungan belajar karena teman-teman berbeda pendapat',
          D: 'Menyuruh kedua kelompok berdebat keras sampai salah satu pihak menyerah',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua adab yang harus dijaga murid ketika menyampaikan pendapat dalam musyawarah kelas!',
        opsiPGK: {
          A: 'Mengangkat tangan terlebih dahulu dan berbicara dengan kalimat yang sopan',
          B: 'Menghargai dan menerima hasil keputusan bersama meskipun berbeda dengan usulan pribadi',
          C: 'Memotong pembicaraan teman yang sedang menyampaikan usul di depan kelas',
          D: 'Menolak melaksanakan hasil keputusan kelas karena usulannya tidak terpilih',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Khalifah Abu Bakar Ash-Shiddiq dan Umar bin Khattab selalu mengutamakan musyawarah.', jawaban: 'Benar' },
          { pernyataan: 'Keputusan hasil musyawarah hanya wajib dipatuhi oleh murid yang setuju saja.', jawaban: 'Salah' },
          { pernyataan: 'Musyawarah dilakukan untuk mencapai mufakat dan menjaga persatuan kelas.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Gelar Khalifah Abu Bakar karena membenarkan peristiwa Isra Mikraj', respon: 'Ash-Shiddiq' },
          { premis: 'Gelar Khalifah Umar bin Khattab karena tegas membedakan yang benar dan salah', respon: 'Al-Faruq' },
          { premis: 'Gelar Khalifah Utsman bin Affan karena kedermawanan dan sifat santunnya', respon: 'Dzun Nurain' },
        ],
        pertanyaanIsian:
          'Kegiatan berunding bersama untuk membicarakan masalah dan mengambil keputusan secara mufakat disebut ....................................................',
        kunciIsian: 'musyawarah (syura)',
        pertanyaanUraian:
          'Apa yang harus kamu lakukan apabila usulanmu saat rapat kelas tidak terpilih menjadi keputusan bersama? Jelaskan 2 sikapmu!',
        kunciUraian:
          '1. Menerima hasil keputusan bersama dengan lapang dada dan ikhlas.\n2. Tetap ikut melaksanakan dan mendukung kegiatan yang telah disepakati kelas dengan kompak.',
        pembahasan:
          'Bermusyawarah (syura) melatih murid menghargai pendapat orang lain, menghindari sikap egois, dan bertanggung jawab melaksanakan keputusan bersama.',
        dalil: 'Q.S. Asy-Syura/42: 38 & Q.S. Ali \'Imran/3: 159 — Perintah Bermusyawarah',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Makanan dan Minuman yang Halalan Thayyiban',
        stimulusModel: 'Model B: Narasi Memilih Makanan di Kantin',
        indikatorTopik: 'membedakan ciri makanan halalan thayyiban bagi kesehatan jasmani dan rohani',
        cpRingkas: 'Murid memahami ketentuan makanan dan minuman yang halal dan bergizi dalam kehidupan.',
        stimulus:
          'Saat istirahat, Fajar dan teman-temannya membeli makan siang di kantin sekolah. Penjual menyediakan berbagai pilihan makanan olahan lokal dan minuman segar.',
        pertanyaanPG: 'Kriteria makanan yang disebut "halalan thayyiban" menurut ajaran Islam adalah ....',
        opsiPG: {
          A: 'Makanan yang halal zatnya, diperoleh dengan cara yang sah, serta bersih dan bergizi bagi tubuh',
          B: 'Makanan yang mahal harganya dan diimpor dari luar negeri dengan kemasan mewah',
          C: 'Makanan yang rasanya manis dan pedas meskipun bungkusnya sudah rusak dan kedaluwarsa',
          D: 'Makanan apa saja asalkan disukai banyak orang dan cepat mengenyangkan perut',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua manfaat mengonsumsi makanan yang halalan thayyiban bagi murid sekolah!',
        opsiPGK: {
          A: 'Menjaga kesehatan tubuh agar berenergi dalam menuntut ilmu dan beribadah',
          B: 'Membuat doa-doa yang dipanjatkan kepada Allah Swt. lebih mudah diijabah',
          C: 'Menjadikan murid kebal terhadap segala kuman penyakit tanpa perlu cuci tangan',
          D: 'Membuat murid merasa lebih hebat dan sombong dibandingkan teman lainnya',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Makanan yang halal tetapi kotor dan basi tidak boleh dikonsumsi karena membahayakan tubuh.', jawaban: 'Benar' },
          { pernyataan: 'Bangkai ikan dan belalang termasuk hewan yang halal dimakan tanpa disembelih.', jawaban: 'Benar' },
          { pernyataan: 'Minuman yang memabukkan diperbolehkan jika diminum sedikit saat cuaca dingin.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Daging sapi yang disembelih dengan menyebut nama Allah', respon: 'Halal zat dan cara perolehannya' },
          { premis: 'Minuman keras atau beralkohol yang memabukkan', respon: 'Haram dikonsumsi dalam jumlah berapapun' },
          { premis: 'Sayur dan buah segar yang bersih dari kotoran', respon: 'Thayyib (baik dan menyehatkan)' },
        ],
        pertanyaanIsian:
          'Makanan yang halal secara syariat sekaligus bergizi, bersih, dan menyehatkan disebut makanan yang halalan ....................',
        kunciIsian: 'thayyiban',
        pertanyaanUraian:
          'Jelaskan 3 kriteria makanan yang halalan thayyiban serta akibat buruk jika seseorang terbiasa memakan makanan haram!',
        kunciUraian:
          '1. Tiga kriteria: halal zatnya, halal cara memperolehnya, dan thayyib (bersih, sehat, tidak membahayakan tubuh).\n2. Akibat buruk makanan haram: merusak kesehatan tubuh, mengeruhkan hati, dan doa sulit dikabulkan Allah Swt.',
        pembahasan:
          'Islam memerintahkan konsumsi pangan halalan thayyiban untuk menjaga kesehatan fisik dan kesucian jiwa (hifzh al-nafs).',
        dalil: 'Q.S. Al-Baqarah/2: 168 — Perintah Mengonsumsi yang Halalan Thayyiban',
      },
    ],
    isian: [
      {
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Pesan Pokok Q.S. Al-Hujurat: 13',
        stimulusModel: 'Model A: Makna Ayat',
        indikatorTopik: 'mengartikan lita\'arafu dalam Q.S. Al-Hujurat: 13',
        cpRingkas: 'Murid memahami pesan keragaman manusia untuk saling mengenal.',
        stimulus: 'Potongan ayat Q.S. Al-Hujurat/49: 13 berbunyi "wa ja\'alnakum syu\'uban wa qaba\'ila lita\'arafu".',
        pertanyaanPG: 'Arti lita\'arafu adalah ....',
        opsiPG: { A: 'Agar saling mengenal', B: 'Agar saling bersaing', C: 'Agar saling menjauh', D: 'Agar saling mencela' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua sikap menghargai keberagaman suku dan bahasa di lingkungan sekolah!',
        opsiPGK: {
          A: 'Berteman akrab dengan teman yang berasal dari luar daerah atau pulau lain',
          B: 'Menghargai bahasa daerah teman dan belajar mengenal kebudayaan Nusantara',
          C: 'Mengejek logat bicara teman yang berbeda dari bahasa pergaulan sehari-hari',
          D: 'Hanya mau berkelompok dengan teman yang memiliki suku bangsa yang sama',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Allah menciptakan perbedaan suku agar manusia saling mengenal.', jawaban: 'Benar' },
          { pernyataan: 'Perbedaan suku boleh dijadikan alasan untuk saling bermusuhan.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Lita\'arafu', respon: 'Agar kalian saling mengenal' },
          { premis: 'Ukuran kemuliaan', respon: 'Ketakwaan kepada Allah Swt.' },
        ],
        pertanyaanIsian: 'Penggalan ayat Surah Al-Hujurat ayat 13 menyatakan bahwa manusia diciptakan bersuku-suku agar saling ....................',
        kunciIsian: 'mengenal (lita\'arafu)',
        pertanyaanUraian: 'Jelaskan mengapa Allah menciptakan manusia beraneka ragam suku dan bangsa!',
        kunciUraian: 'Agar manusia saling mengenal, saling menghargai, dan bekerja sama dalam kebaikan.',
        pembahasan: 'Keragaman adalah fitrah ilahi untuk memperkuat persaudaraan.',
        dalil: 'Q.S. Al-Hujurat/49: 13.',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Asmaul Husna Al-Qayyum',
        stimulusModel: 'Model B: Kemandirian Murid',
        indikatorTopik: 'mengartikan Asmaul Husna Al-Qayyum',
        cpRingkas: 'Murid memahami makna Asmaul Husna Al-Qayyum.',
        stimulus: 'Allah Swt. tidak memerlukan bantuan siapa pun dalam mengatur seluruh alam semesta.',
        pertanyaanPG: 'Asmaul Husna yang berarti Maha Mandiri adalah ....',
        opsiPG: { A: 'Al-Qayyum', B: 'Al-Qawiyyu', C: 'Al-Muhyi', D: 'Al-Mumit' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua contoh sikap mandiri seorang murid di sekolah!',
        opsiPGK: {
          A: 'Mempersiapkan buku pelajaran sendiri sesuai jadwal sebelum berangkat ke sekolah',
          B: 'Mengerjakan soal ulangan harian dengan jujur tanpa mengharapkan contekan teman',
          C: 'Menyuruh teman sebangku mencatatkan materi pelajaran di buku tulis miliknya',
          D: 'Meminta orang tua membawakan tas sekolah sampai ke depan pintu kelas',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Al-Qayyum artinya Allah Maha Mandiri dan berdiri sendiri.', jawaban: 'Benar' },
          { pernyataan: 'Manusia tidak perlu mandiri karena selalu bisa bergantung pada orang lain.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Al-Qayyum', respon: 'Maha Mandiri' },
          { premis: 'Al-Qawiyyu', respon: 'Maha Kuat' },
        ],
        pertanyaanIsian: 'Asmaul Husna yang memiliki arti bahwa Allah Swt. Maha Mandiri dan berdiri sendiri adalah ....................',
        kunciIsian: 'Al-Qayyum',
        pertanyaanUraian: 'Bagaimana cara murid meneladani sifat Al-Qayyum di sekolah?',
        kunciUraian: 'Mempersiapkan alat belajar sendiri dan mandiri mengerjakan tugas tanpa bergantung pada orang lain.',
        pembahasan: 'Al-Qayyum mengajarkan kemandirian jiwa.',
        dalil: 'Q.S. Al-Baqarah: 255.',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Kewajiban Zakat Fitrah',
        stimulusModel: 'Model B: Takaran Zakat Fitrah',
        indikatorTopik: 'menyebutkan takaran zakat fitrah per jiwa',
        cpRingkas: 'Murid memahami takaran beras zakat fitrah.',
        stimulus: 'Umat Islam menunaikan zakat fitrah sebelum salat Idulfitri tiba.',
        pertanyaanPG: 'Takaran zakat fitrah per jiwa adalah ....',
        opsiPG: { A: '2,5 kg beras', B: '5 kg beras', C: '1 kg beras', D: '10 kg beras' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua golongan mustahik yang paling berhak menerima zakat fitrah!',
        opsiPGK: {
          A: 'Golongan fakir yang tidak memiliki penghasilan mencukupi untuk kebutuhan pokok',
          B: 'Golongan miskin yang penghasilannya tidak dapat menutupi biaya makan sehari-hari',
          C: 'Orang yang kaya raya dan memiliki banyak tanah serta kendaraan bermotor',
          D: 'Pengusaha sukses yang memiliki banyak cabang toko di berbagai pusat perbelanjaan',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Zakat fitrah wajib dibayar sebelum salat Idulfitri dimulai.', jawaban: 'Benar' },
          { pernyataan: 'Zakat fitrah yang diberikan setelah salat Id dinilai sebagai sedekah biasa.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Takaran zakat fitrah per jiwa', respon: '2,5 kg atau 3,5 liter beras' },
          { premis: 'Waktu utama pembayaran zakat', respon: 'Akhir bulan Ramadan sebelum salat Id' },
        ],
        pertanyaanIsian: 'Takaran zakat fitrah berupa makanan pokok (beras) yang wajib dikeluarkan untuk setiap satu jiwa adalah sebanyak ....................',
        kunciIsian: '2,5 kilogram (atau 3,5 liter beras)',
        pertanyaanUraian: 'Sebutkan 3 golongan mustahik yang berhak menerima zakat fitrah!',
        kunciUraian: '1. Fakir, 2. Miskin, 3. Amil zakat (atau fi sabilillah).',
        pembahasan: 'Zakat fitrah membersihkan jiwa dan memberi kecukupan bagi yang membutuhkan.',
        dalil: 'Hadis Ibnu Abbas r.a. tentang Zakat Fitrah.',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Sikap Tasamuh dan Al-Samhah dalam Pergaulan',
        stimulusModel: 'Model B: Toleransi Beragama di Sekolah',
        indikatorTopik: 'menyebutkan istilah sikap saling menghargai perbedaan keyakinan',
        cpRingkas: 'Murid menerapkan sikap saling menghormati keragaman agama.',
        stimulus: 'Murid muslim dan non-muslim saling menghargai saat menjalankan ibadah masing-masing tanpa mengganggu.',
        pertanyaanPG: 'Sikap saling menghormati dan toleransi disebut ....',
        opsiPG: { A: 'Tasamuh (toleransi)', B: 'Takabur', C: 'Riya', D: 'Tadarus' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua contoh sikap tasamuh di lingkungan sekolah!',
        opsiPGK: {
          A: 'Memberi kesempatan teman yang berbeda agama beribadah dengan tenang',
          B: 'Bekerja sama dalam piket kebersihan kelas tanpa membeda-bedakan keyakinan',
          C: 'Memaksa teman mengikuti tata cara ibadah agama kita sendiri',
          D: 'Menghindari berteman dengan anak yang berlainan suku dan agama',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Sikap tasamuh memperkuat persatuan dan kerukunan di sekolah.', jawaban: 'Benar' },
          { pernyataan: 'Toleransi berarti kita harus ikut serta dalam ritual ibadah agama lain.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Tasamuh', respon: 'Sikap saling menghormati dan toleransi' },
          { premis: 'Ta\'awun', respon: 'Tolong-menolong dalam kebaikan' },
        ],
        pertanyaanIsian: 'Sikap saling menghargai perbedaan keyakinan dan menghormati ibadah sesama teman disebut sikap ....................',
        kunciIsian: 'tasamuh (toleransi / al-samhah)',
        pertanyaanUraian: 'Jelaskan mengapa sikap tasamuh sangat penting dalam kehidupan bermasyarakat di Indonesia!',
        kunciUraian: 'Karena Indonesia adalah bangsa yang majemuk dengan beragam suku dan agama, sehingga toleransi menjaga kerukunan dan persatuan bangsa.',
        pembahasan: 'Islam mengajarkan moderasi dan tasamuh dalam kebinekaan.',
        dalil: 'Q.S. Al-Kafirun: 6.',
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Keteladanan Sahabat Abu Bakar ash-Siddiq r.a.',
        stimulusModel: 'Model B: Sahabat Nabi dan Khulafaurrasyidin',
        indikatorTopik: 'menyebutkan nama khalifah pertama pengganti Rasulullah saw.',
        cpRingkas: 'Murid memahami keteladanan Khulafaurrasyidin.',
        stimulus: 'Sahabat yang selalu membenarkan peristiwa Isra Mikraj dan terpilih menjadi khalifah pertama setelah Rasulullah saw. wafat.',
        pertanyaanPG: 'Khalifah pertama umat Islam adalah ....',
        opsiPG: { A: 'Abu Bakar ash-Siddiq r.a.', B: 'Umar bin Khattab r.a.', C: 'Utsman bin Affan r.a.', D: 'Ali bin Abi Thalib r.a.' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua sifat mulia sahabat Abu Bakar ash-Siddiq r.a. yang patut diteladani!',
        opsiPGK: {
          A: 'Jujur dalam bertutur kata dan setia membela kebenaran ajaran Islam',
          B: 'Gemar mendermakan hartanya untuk menolong kaum duafa dan membebaskan budak',
          C: 'Bangga dengan kekayaan pribadi dan menuntut perlakuan istimewa di masyarakat',
          D: 'Mudah marah jika pendapatnya tidak disetujui dalam musyawarah bersama',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Abu Bakar diberi gelar ash-Siddiq karena selalu membenarkan ajaran Nabi saw.', jawaban: 'Benar' },
          { pernyataan: 'Abu Bakar memimpin umat Islam dengan sikap sombong dan otoriter.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Abu Bakar r.a.', respon: 'Khalifah pertama bergelar Ash-Siddiq' },
          { premis: 'Umar bin Khattab r.a.', respon: 'Khalifah kedua bergelar Al-Faruq' },
        ],
        pertanyaanIsian: 'Sahabat Nabi Muhammad saw. yang terpilih menjadi khalifah pertama menggantikan beliau adalah ....................',
        kunciIsian: 'Abu Bakar ash-Siddiq r.a.',
        pertanyaanUraian: 'Sebutkan 2 keteladanan khalifah Abu Bakar ash-Siddiq r.a. yang patut ditiru murid di sekolah!',
        kunciUraian: '1. Bersikap jujur dalam perkataan dan perbuatan. 2. Gemar berbagi dan menolong teman yang membutuhkan bantuan.',
        pembahasan: 'Abu Bakar ash-Siddiq adalah teladan kejujuran dan kedermawanan.',
        dalil: 'Kisah Khulafaurrasyidin dalam Tarikh Islam.',
      },
    ],
    uraian: [
      {
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Kemuliaan Berbasis Ketakwaan (Q.S. Al-Hujurat: 13)',
        stimulusModel: 'Model A: Terjemah Ayat & Analisis Konseptual',
        indikatorTopik: 'menjelaskan ukuran kemuliaan manusia menurut Q.S. Al-Hujurat/49: 13 dan contoh penerapannya',
        cpRingkas: 'Murid menyimpulkan kemuliaan di sisi Allah berdasarkan takwa.',
        stimulus:
          'Perhatikan potongan terjemah Q.S. Al-Hujurat/49: 13 berikut!\n"Sesungguhnya yang paling mulia di antara kamu di sisi Allah ialah orang yang paling bertakwa. Sesungguhnya Allah Maha Mengetahui lagi Maha Teliti."',
        pertanyaanPG: 'Ukuran kemuliaan manusia di sisi Allah adalah ....',
        opsiPG: { A: 'Ketakwaan dan amal saleh', B: 'Kekayaan harta melimpah', C: 'Keturunan bangsawan', D: 'Kekuatan fisik' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua contoh sikap bertakwa murid dalam pergaulan di sekolah!',
        opsiPGK: {
          A: 'Berteman dengan siapa saja secara tulus tanpa membeda-bedakan status kekayaan teman',
          B: 'Menjaga kejujuran saat ulangan dan rajin melaksanakan salat berjamaah di musala',
          C: 'Memilih-milih teman bermain hanya yang berasal dari suku atau kelompok daerah yang sama',
          D: 'Menghina teman yang memakai seragam sederhana dan sepatu yang sudah usang',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Kemuliaan di sisi Allah Swt. diukur dari ketakwaan seseorang.', jawaban: 'Benar' },
          { pernyataan: 'Kekayaan materi menjadikan seseorang lebih mulia di hadapan Allah.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Orang yang paling mulia', respon: 'Orang yang paling bertakwa' },
          { premis: 'Prinsip kesetaraan manusia', respon: 'Al-Musawah di hadapan Allah' },
        ],
        pertanyaanIsian: 'Ukuran kemuliaan di hadapan Allah Swt. adalah ....................',
        kunciIsian: 'ketakwaan',
        pertanyaanUraian:
          'Tuliskan arti dari potongan ayat "Inna akramakum \'indallahi atqakum" dan jelaskan 2 (dua) contoh sikap anak yang bertakwa dalam pergaulan sehari-hari di sekolah!',
        kunciUraian:
          '1. Arti ayat: "Sesungguhnya orang yang paling mulia di antara kamu di sisi Allah ialah orang yang paling bertakwa."\n2. Dua contoh sikap bertakwa di sekolah:\n(a) Berteman dengan siapa saja secara tulus tanpa membeda-bedakan status kekayaan atau suku bangsa;\n(b) Bersikap jujur saat mengerjakan ujian, menghormati guru, dan gemar menolong teman yang kesusahan.',
        pembahasan:
          'Ayat ini menegaskan prinsip kesetaraan manusia (al-musawah) di mana kemuliaan sejati hanya ditentukan oleh ketakwaan.',
        dalil: 'Q.S. Al-Hujurat/49: 13',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Keteladanan Asmaul Husna Al-Qayyum dan Al-Qawiyyu',
        stimulusModel: 'Model B: Kasus Kemandirian Belajar',
        indikatorTopik: 'menjelaskan contoh kemandirian murid sebagai wujud meneladani Al-Qayyum',
        cpRingkas: 'Murid meneladani Asmaul Husna dalam kehidupan.',
        stimulus:
          'Seorang murid kelas enam sedang mempersiapkan diri menghadapi asesmen akhir jenjang. Ia tidak ingin membebani orang tuanya.',
        pertanyaanPG: 'Sikap mandiri meneladani nama Allah ....',
        opsiPG: { A: 'Al-Qayyum', B: 'Al-Muhyi', C: 'Al-Mumit', D: 'Al-Qawiyyu' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua contoh kemandirian murid di lingkungan keluarga dan sekolah!',
        opsiPGK: {
          A: 'Merapikan tempat tidur sendiri setiap pagi tanpa menunggu disuruh orang tua',
          B: 'Menyiapkan buku pelajaran dan seragam sekolah secara tertib di malam hari',
          C: 'Meminta bantuan teman sekelas untuk mengerjakan seluruh soal tugas pekerjaan rumah',
          D: 'Membiarkan buku dan pensil berserakan di ruang tamu setelah selesai belajar',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Al-Qayyum artinya Allah Maha Mandiri dan tidak membutuhkan makhluk-Nya.', jawaban: 'Benar' },
          { pernyataan: 'Kemandirian melatih murid menjadi pribadi yang tangguh dan bertanggung jawab.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Al-Qayyum', respon: 'Maha Mandiri' },
          { premis: 'Al-Qawiyyu', respon: 'Maha Kuat' },
        ],
        pertanyaanIsian: 'Sifat mandiri meneladani Asmaul Husna ....................',
        kunciIsian: 'Al-Qayyum',
        pertanyaanUraian:
          'Jelaskan 3 contoh perilaku mandiri seorang murid di rumah dan di sekolah sebagai wujud meneladani Asmaul Husna Al-Qayyum!',
        kunciUraian:
          '1. Merapikan kamar tidur dan menyiapkan perlengkapan tas sekolah sendiri setiap malam tanpa disuruh orang tua.\n2. Mengerjakan tugas rumah dan soal ulangan secara jujur dengan kemampuan sendiri tanpa menyontek.\n3. Mencuci peralatan makan sendiri setelah selesai sarapan pagi.',
        pembahasan:
          'Al-Qayyum (Maha Mandiri) menginspirasi murid agar tidak menjadi pribadi yang manja dan bergantung pada orang lain.',
        dalil: 'Q.S. Al-Baqarah/2: 255',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Indahnya Saling Menghargai & Sikap Al-Samhah di Sekolah',
        stimulusModel: 'Model B: Kerukunan Teman Berbeda Agama',
        indikatorTopik: 'menganalisis sikap menghargai teman berbeda keyakinan dalam belajar kelompok',
        cpRingkas: 'Murid menerapkan sikap saling menghargai antarpemeluk agama dalam pergaulan sehari-hari.',
        stimulus:
          'Saat istirahat di sekolah dasar, Made yang beragama Hindu dan Dedi yang beragama Islam sedang menyelesaikan tugas kelompok. Ketika azan berkumandang, Made mempersilakan Dedi ke musala sekolah untuk salat.',
        pertanyaanPG: 'Sikap Made terhadap Dedi mencerminkan sikap ....',
        opsiPG: { A: 'Al-Samhah (toleransi)', B: 'Takabur', C: 'Isyraf', D: 'Tadarus' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua contoh sikap saling menghargai teman berbeda agama di sekolah!',
        opsiPGK: {
          A: 'Memberikan kesempatan dan ketenangan saat teman menjalankan ibadah agamanya',
          B: 'Menjalin pertemanan akrab dan tolong-menolong tanpa membeda-bedakan keyakinan',
          C: 'Mencampuradukkan tata cara ibadah antarpemeluk agama saat belajar bersama',
          D: 'Memaksa teman memeluk agama yang sama agar dapat terus berteman akrab',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Sikap al-samhah menciptakan kerukunan dan kedamaian di lingkungan sekolah.', jawaban: 'Benar' },
          { pernyataan: 'Toleransi mengharuskan kita mencampuradukkan ritual ibadah antaragama.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Al-Samhah', respon: 'Sikap toleran dan lapang dada' },
          { premis: 'Ukhuwah Wathaniyah', respon: 'Persaudaraan sebangsa dan setanah air' },
        ],
        pertanyaanIsian: 'Sikap menghargai perbedaan agama saat belajar kelompok di sekolah disebut sikap ....................',
        kunciIsian: 'al-samhah (toleransi)',
        pertanyaanUraian:
          'Tuliskan 2 (dua) contoh sikap nyata menghargai teman yang berbeda agama saat belajar kelompok di sekolah dan jelaskan mengapa kita tidak boleh memaksakan agama kita kepada orang lain!',
        kunciUraian:
          '1. Dua contoh sikap nyata:\n(a) Memberi waktu dan kesempatan kepada teman untuk beribadah sesuai agamanya dengan tertib dan tenang;\n(b) Berteman akrab, saling menolong saat belajar, dan tidak mengejek tata cara berpakaian atau ibadah teman.\n2. Alasan tidak boleh memaksakan agama: Karena dalam ajaran Islam (Q.S. Al-Baqarah: 256) ditegaskan "La ikraha fid-din" (tidak ada paksaan dalam memeluk agama), dan setiap manusia berhak memilih keyakinannya secara damai.',
        pembahasan:
          'Al-Samhah mengedepankan toleransi beragama tanpa mengorbankan akidah masing-masing (lakum dinukum waliyadin).',
        dalil: 'Q.S. Al-Baqarah/2: 256 & Q.S. Al-Kafirun/109: 1–6',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Ketentuan dan Perhitungan Zakat Fitrah Keluarga',
        stimulusModel: 'Model B: Studi Kasus Perhitungan Zakat',
        indikatorTopik: 'menghitung total zakat fitrah keluarga dan menyebutkan mustahik yang berhak menerima',
        cpRingkas: 'Murid memahami ketentuan, takaran, dan hikmah zakat fitrah.',
        stimulus:
          'Menjelang Hari Raya Idulfitri, panitia amil zakat di sekolah mengumpulkan beras zakat fitrah dari para murid. Pak Guru menjelaskan bahwa zakat fitrah wajib berupa makanan pokok seberat 2,5 kg beras per jiwa.',
        pertanyaanPG: 'Takaran zakat fitrah per jiwa adalah ....',
        opsiPG: { A: '2,5 kg beras', B: '5 kg beras', C: '1 kg beras', D: '3 kg beras' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua golongan mustahik yang paling berhak menerima zakat fitrah!',
        opsiPGK: {
          A: 'Golongan fakir yang tidak memiliki kecukupan nafkah pokok',
          B: 'Golongan miskin yang penghasilannya tidak menutupi kebutuhan pangan sehari-hari',
          C: 'Orang yang kaya raya dan memiliki banyak tabungan di bank',
          D: 'Pengusaha yang memiliki usaha perniagaan besar di kota',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Zakat fitrah wajib ditunaikan sebelum pelaksanaan salat Idulfitri dimulai.', jawaban: 'Benar' },
          { pernyataan: 'Beras zakat fitrah boleh diganti dengan barang mainan anak.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Takaran zakat per jiwa', respon: '2,5 kg atau 3,5 liter beras' },
          { premis: 'Muzaki', respon: 'Orang yang wajib membayar zakat' },
        ],
        pertanyaanIsian: 'Kewajiban zakat fitrah ditunaikan dalam bentuk makanan pokok seberat ....................',
        kunciIsian: '2,5 kilogram beras (atau 3,5 liter)',
        pertanyaanUraian:
          'Keluarga Pak Rahmat terdiri dari ayah, ibu, dan 3 orang anak. Hitunglah berapa total kilogram beras zakat fitrah yang wajib dikeluarkan keluarga tersebut, dan sebutkan 2 (dua) golongan mustahik yang paling berhak menerimanya!',
        kunciUraian:
          '1. Perhitungan jumlah beras zakat fitrah:\nJumlah anggota keluarga = 5 jiwa (ayah, ibu, dan 3 anak).\nTotal zakat = 5 jiwa × 2,5 kg = 12,5 kg beras (atau 5 × 3,5 liter = 17,5 liter beras).\n2. Dua golongan mustahik yang berhak menerima:\n(a) Fakir (orang yang tidak memiliki harta dan penghasilan untuk kebutuhan pokok);\n(b) Miskin (orang yang mempunyai penghasilan tetapi tidak mencukupi kebutuhan pokok sehari-hari).',
        pembahasan:
          'Zakat fitrah menyucikan orang yang berpuasa dari dosa kecil dan memberi kegembiraan makan bagi kaum duafa di hari raya.',
        dalil: 'Hadis Ibnu Abbas r.a. (HR. Abu Dawud)',
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Keteladanan Musyawarah Khulafaurrasyidin',
        stimulusModel: 'Model B: Teladan Kepemimpinan Sahabat',
        indikatorTopik: 'menganalisis keteladanan musyawarah Khulafaurrasyidin dalam kehidupan kelas murid',
        cpRingkas: 'Murid meneladani sifat musyawarah, adil, dan amanah Khulafaurrasyidin.',
        stimulus:
          'Setelah Rasulullah saw. wafat, empat sahabat terkemuka (Khulafaurrasyidin) memimpin umat Islam dengan selalu mengutamakan musyawarah untuk mencapai mufakat, bersikap adil, dan tidak mementingkan keuntungan pribadi.',
        pertanyaanPG: 'Kepemimpinan Khulafaurrasyidin selalu mengutamakan ....',
        opsiPG: { A: 'Musyawarah mufakat', B: 'Kehendak penguasa semata', C: 'Kekuatan fisik pasukan', D: 'Bangsawan terkaya' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua keteladanan Khulafaurrasyidin dalam musyawarah pemilihan ketua kelas di sekolah!',
        opsiPGK: {
          A: 'Mendengarkan dan menghargai usulan teman dengan lapang dada tanpa memaksakan kehendak',
          B: 'Menjalankan tugas kepengurusan kelas dengan jujur, amanah, dan penuh tanggung jawab',
          C: 'Memilih calon ketua kelas hanya karena berasal dari kelompok bermain yang sama',
          D: 'Marah dan mogok belajar jika pendapat diri sendiri tidak diterima oleh sebagian besar teman',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Musyawarah merupakan prinsip utama kepemimpinan Khulafaurrasyidin.', jawaban: 'Benar' },
          { pernyataan: 'Seorang pemimpin boleh mengambil keputusan sendiri tanpa mendengar pendapat rakyat.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Abu Bakar r.a.', respon: 'Ketegasan dan kejujuran memimpin musyawarah' },
          { premis: 'Umar bin Khattab r.a.', respon: 'Keadilan dan keberpihakan pada rakyat lemah' },
        ],
        pertanyaanIsian: 'Empat sahabat Nabi yang memimpin umat Islam setelah wafatnya Rasulullah saw. disebut ....................',
        kunciIsian: 'Khulafaurrasyidin',
        pertanyaanUraian:
          'Jelaskan 2 (dua) nilai keteladanan dari kepemimpinan Khulafaurrasyidin (seperti musyawarah dan amanah) yang dapat diterapkan oleh murid-murid saat pemilihan ketua kelas di sekolah!',
        kunciUraian:
          '1. Mengutamakan Musyawarah Mufakat: Mendengarkan pendapat setiap teman sekelas secara santun dan menghargai hasil keputusan bersama tanpa memaksakan kehendak pribadi.\n2. Bersikap Amanah dan Bertanggung Jawab: Murid yang terpilih menjalankan tugasnya untuk melayani dan membantu semua teman sekelas dengan adil, bukan untuk bersikap sombong.',
        pembahasan:
          'Khulafaurrasyidin mencontohkan demokrasi musyawarah (syura) yang menempatkan keadilan dan amanah sebagai pilar utama kepemimpinan.',
        dalil: 'Q.S. Asy-Syura/42: 38 — Urusan Mereka Diputuskan dengan Musyawarah Antara Mereka',
      },
    ],
  },

  // =========================================================================
  // FASE D: KELAS 7–9 SMP/MTS (USIA 13–15 TAHUN)
  // Konteks: Tabayyun di media sosial, anti-perundungan siber di grup WA, sujud syukur tim robotik MTs, salat jamak qashar, Piagam Madinah
  // =========================================================================
  'Fase D': {
    pg: [
      {
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Sikap Tabayyun dalam Menerima Informasi (Q.S. Al-Hujurat/49: 6)',
        stimulusModel: 'Model A: Penggalan Ayat/Hadis Bergaris Bawah',
        indikatorTopik: 'menerapkan sikap tabayyun terhadap pesan berantai bohong (hoaks) berdasarkan Q.S. Al-Hujurat/49: 6',
        cpRingkas: 'Murid memahami kandungan Q.S. Al-Hujurat/49: 6 tentang tabayyun dan menolak penyebaran hoaks.',
        stimulus:
          'Perhatikan potongan Q.S. Al-Hujurat/49: 6 berikut!\nيَا أَيُّهَا الَّذِينَ آمَنُوا إِنْ جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَنْ تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَىٰ مَا فَعَلْتُمْ نَادِمِينَ\nSebuah pesan berantai yang menjelek-jelekkan salah satu teman kelas tersebar di grup chat. Fikri membaca pesan itu dan tahu bahwa kabar tersebut belum jelas kebenarannya.',
        pertanyaanPG: 'Berdasarkan ayat di atas, tindakan paling tepat yang harus dilakukan Fikri adalah ....',
        opsiPG: {
          A: 'Meneruskan pesan itu ke grup kelas lain agar semakin banyak yang membaca',
          B: 'Menghentikan penyebaran pesan tersebut dan melakukan tabayyun (klarifikasi) secara santun',
          C: 'Ikut memberikan komentar ejekan supaya terlihat kompak dengan pengirim pesan',
          D: 'Menyimpan tangkapan layar pesan bohong itu untuk mengancam teman yang bersangkutan',
        },
        kunciPG: 'B',
        pertanyaanPGK: 'Pilihlah dua langkah bijak remaja muslim ketika menerima informasi mencurigakan di media sosial!',
        opsiPGK: {
          A: 'Memeriksa kebenaran kabar tersebut kepada pihak yang berwenang atau guru wali kelas',
          B: 'Menahan jari untuk tidak langsung membagikan informasi yang belum jelas buktinya',
          C: 'Menambahkan judul yang heboh lalu mengunggahnya kembali ke status pribadi',
          D: 'Menuduh teman sekelas secara terbuka di kolom komentar tanpa bukti nyata',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Sikap tabayyun dapat mencegah perpecahan dan rasa penyesalan akibat menuduh orang tak bersalah.', jawaban: 'Benar' },
          { pernyataan: 'Setiap informasi yang viral di internet pasti benar dan boleh langsung disebarkan.', jawaban: 'Salah' },
          { pernyataan: 'Memeriksa kebenaran berita kepada sumbernya merupakan perintah Allah dalam Surah Al-Hujurat ayat 6.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Menerima kabar miring tentang teman di grup WhatsApp', respon: 'Melakukan tabayyun dan tidak langsung percaya' },
          { premis: 'Mengetahui ada berita fitnah yang merugikan teman', respon: 'Membela kehormatan teman dan meluruskan kabar' },
          { premis: 'Perintah dalam Q.S. Al-Hujurat ayat 6', respon: 'Meneliti kebenaran berita dari orang fasik' },
        ],
        pertanyaanIsian:
          'Sikap meneliti, memeriksa, dan mencari kejelasan kebenaran suatu berita sebelum mempercayai atau menyebarkannya disebut ....................................................',
        kunciIsian: 'tabayyun',
        pertanyaanUraian:
          'Jelaskan bahaya menyebarkan berita bohong (hoaks) di media sosial bagi kerukunan murid di sekolah dan bagaimana cara mencegahnya sesuai Q.S. Al-Hujurat/49: 6!',
        kunciUraian:
          '1. Bahaya hoaks: Dapat merusak nama baik seseorang, memicu pertengkaran, dan menimbulkan fitnah serta penyesalan.\n2. Cara mencegah: Memeriksa sumber kabar (tabayyun), tidak mudah terprovokasi, dan menahan diri dari menyebarkan hal yang belum tentu benar.',
        pembahasan:
          'Tabayyun adalah prinsip komunikasi Qur\'ani untuk memverifikasi kebenaran informasi sebelum mengambil tindakan agar terhindar dari perbuatan zalim.',
        dalil: 'Q.S. Al-Hujurat/49: 6 — Kewajiban Melakukan Tabayyun atas Berita',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Adab Bermedia Sosial & Pencegahan Perundungan Siber',
        stimulusModel: 'Model B: Kasus Etika di Grup WhatsApp Kelas',
        indikatorTopik: 'menganalisis dampak perundungan di media sosial dan merumuskan tindakan pencegahannya',
        cpRingkas: 'Murid menerapkan etika berkomunikasi santun di ruang digital dan menolak segala bentuk perundungan.',
        stimulus:
          'Saat jam istirahat, Raka melihat beberapa teman di grup WhatsApp kelas membagikan foto wajah Andi yang telah diedit menjadi stiker lelucon tanpa izin. Andi tampak murung dan memilih duduk menyendiri di pojok kelas karena merasa dipermalukan.',
        pertanyaanPG: 'Tindakan yang paling tepat dan berani dilakukan Raka sebagai teman yang berakhlak mulia adalah ....',
        opsiPG: {
          A: 'Menasihati teman-teman di grup secara santun agar menghapus stiker tersebut dan meminta maaf kepada Andi',
          B: 'Ikut membagikan stiker tersebut ke grup lain agar suasana ruang obrolan semakin ramai',
          C: 'Menertawakan Andi bersama teman-teman agar tidak dianggap sok suci',
          D: 'Membiarkan perbuatan tersebut karena menganggap mengedit foto teman adalah candaan biasa',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua tindakan nyata yang mencerminkan etika bermedia sosial seorang remaja muslim!',
        opsiPGK: {
          A: 'Menggunakan kata-kata yang santun dan tidak menyinggung perasaan orang lain saat berkomentar',
          B: 'Meminta izin terlebih dahulu sebelum mengunggah foto atau karya orang lain ke ruang publik',
          C: 'Membuat akun palsu (fake account) untuk menyindir teman yang tidak disukai',
          D: 'Menyebarkan tangkapan layar curhat pribadi teman ke status media sosial umum',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Membuat stiker ejekan dari foto teman tanpa izin termasuk bentuk perundungan siber (cyberbullying).', jawaban: 'Benar' },
          { pernyataan: 'Bercanda boleh saja dilakukan meskipun membuat teman merasa terhina dan menangis.', jawaban: 'Salah' },
          { pernyataan: 'Menjaga lisan dan jemari dari menyakiti sesama muslim adalah bukti keimanan.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Mengunggah konten positif dan menginspirasi', respon: 'Etika bermedia sosial yang terpuji' },
          { premis: 'Menghina fisik teman di kolom komentar (body shaming)', respon: 'Bentuk perundungan yang dilarang agama' },
          { premis: 'Melihat teman menjadi korban perundungan', respon: 'Memberikan dukungan moral dan melaporkan pada guru' },
        ],
        pertanyaanIsian:
          'Perbuatan mempermalukan, mengejek, atau mengintimidasi seseorang melalui media elektronik dan internet dikenal dengan istilah perundungan siber atau ....................................................',
        kunciIsian: 'cyberbullying',
        pertanyaanUraian:
          'Tuliskan 3 dampak psikologis dan sosial perundungan siber (cyberbullying) bagi murid yang menjadi korban serta 2 upaya sekolah untuk mencegahnya!',
        kunciUraian:
          '1. Tiga dampak bagi korban: (a) Merasa malu, cemas, dan rendah diri; (b) Menurunnya semangat dan prestasi belajar di sekolah; (c) Menarik diri dari pergaulan sosial.\n2. Dua upaya pencegahan: (a) Sosialisasi adab digital dan sanksi tegas anti-bullying di sekolah; (b) Membentuk wadah konseling teman sebaya yang ramah dan saling mendukung.',
        pembahasan:
          'Menjaga kehormatan sesama muslim adalah kewajiban agama. Perundungan di media sosial hukumnya haram karena menyakiti hati dan melanggar hak asasi.',
        dalil: 'Hadis Muslim Sejati: "Seorang muslim adalah orang yang muslim lainnya selamat dari lisan dan tangannya." (HR. Bukhari)',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Ketentuan Sujud Syukur, Sujud Tilawah, dan Sujud Sahwi',
        stimulusModel: 'Model B: Narasi Prestasi Lomba Murid MTs',
        indikatorTopik: 'menganalisis tata cara dan ketentuan sujud syukur saat meraih keberhasilan',
        cpRingkas: 'Murid memahami ketentuan dan tata cara sujud syukur, sujud sahwi, dan sujud tilawah.',
        stimulus:
          'Setelah berbulan-bulan berlatih dengan tekun, tim robotik MTs Harapan akhirnya diumumkan meraih juara pertama tingkat provinsi. Mendengar pengumuman resmi tersebut, Zaki dan rekan satu timnya segera menghadap kiblat dan melakukan sujud satu kali di luar salat.',
        pertanyaanPG: 'Sujud yang dilakukan oleh Zaki dan rekan satu timnya tersebut dinamakan sujud ....',
        opsiPG: {
          A: 'Sujud syukur karena memperoleh kenikmatan besar dan kabar gembira dari Allah Swt.',
          B: 'Sujud sahwi karena lupa jumlah rakaat saat melaksanakan salat fardu',
          C: 'Sujud tilawah karena mendengar ayat sajdah dibacakan dalam perlombaan',
          D: 'Sujud rukun salat yang wajib dilakukan berulang kali',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua sebab utama seseorang disunnahkan untuk melakukan sujud syukur!',
        opsiPGK: {
          A: 'Mendapatkan kenikmatan atau kabar gembira yang luar biasa dari Allah Swt.',
          B: 'Terhindar dari marabahaya atau bencana besar yang mengancam keselamatan jiwanya',
          C: 'Ragu-ragu terhadap jumlah rakaat salat yang sedang dikerjakannya di musala',
          D: 'Membaca atau mendengar ayat sajdah saat mengaji di rumah atau masjid',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Sujud syukur dilakukan sebanyak satu kali sujud di luar pelaksanaan salat.', jawaban: 'Benar' },
          { pernyataan: 'Sujud syukur boleh dilakukan saat sedang berada di tengah-tengah salat fardu.', jawaban: 'Salah' },
          { pernyataan: 'Menghadap kiblat dan dalam keadaan suci dari hadas merupakan adab utama sujud syukur.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Meraih juara lomba atau sembuh dari sakit berat', respon: 'Sujud Syukur (1 kali di luar salat)' },
          { premis: 'Lupa tasyahud awal saat salat Zuhur', respon: 'Sujud Sahwi (2 kali sebelum/sesudah salam)' },
          { premis: 'Mendengar pembacaan ayat sajdah dalam Al-Qur\'an', respon: 'Sujud Tilawah (1 kali sujud)' },
        ],
        pertanyaanIsian:
          'Sujud yang dikerjakan sebagai ungkapan terima kasih kepada Allah Swt. atas nikmat luar biasa atau terhindar dari marabahaya disebut sujud ....................................................',
        kunciIsian: 'syukur',
        pertanyaanUraian:
          'Jelaskan tata cara pelaksanaan sujud syukur yang benar mulai dari niat hingga salam!',
        kunciUraian:
          '1. Berdiri menghadap kiblat dalam keadaan suci dari hadas.\n2. Niat sujud syukur diiringi takbiratul ihram (Allahu Akbar).\n3. Langsung sujud satu kali sambil membaca doa sujud syukur.\n4. Bangkit dari sujud lalu duduk sejenak dan diakhiri dengan salam.',
        pembahasan:
          'Sujud syukur adalah wujud kerendahan hati seorang hamba saat diberi kebahagiaan atau lolos dari musibah, dilakukan 1 kali di luar salat.',
        dalil: 'Hadis Abu Bakrah r.a.: "Nabi saw. apabila mendapat perkara yang menyenangkan, beliau bersujud syukur kepada Allah." (HR. Abu Dawud)',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Ketentuan Salat Jamak dan Qashar bagi Musafir',
        stimulusModel: 'Model B: Perjalanan Studi Wisata Sekolah',
        indikatorTopik: 'menerapkan rukhsah salat jamak dan qashar saat menempuh perjalanan jauh',
        cpRingkas: 'Murid memahami ketentuan keringanan (rukhsah) salat jamak dan qashar dalam perjalanan safar.',
        stimulus:
          'Rombongan murid madrasah menempuh perjalanan studi wisata ke luar kota sejauh 120 kilometer. Saat waktu Zuhur tiba di tempat peristirahatan, mereka berniat mengerjakan salat Zuhur dan Asar sekaligus.',
        pertanyaanPG: 'Cara yang paling tepat dilakukan rombongan untuk melaksanakan salat Zuhur dan Asar adalah ....',
        opsiPG: {
          A: 'Salat jamak takdim qashar (Zuhur 2 rakaat dilanjutkan Asar 2 rakaat)',
          B: 'Menunda salat sampai pulang ke rumah masing-masing setelah malam tiba',
          C: 'Salat Zuhur 4 rakaat dan meninggalkan salat Asar karena sedang safar',
          D: 'Salat Asar 2 rakaat terlebih dahulu baru kemudian salat Zuhur 4 rakaat',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua syarat diperbolehkannya seorang muslim menjamak dan mengqashar salat!',
        opsiPGK: {
          A: 'Jarak perjalanan safar telah mencapai batas minimal syariat (sekitar 80 km atau lebih)',
          B: 'Tujuan perjalanan bukan untuk melakukan kemaksiatan atau perbuatan yang melanggar hukum',
          C: 'Merasa malas pergi ke musala terdekat meskipun sedang berada di rumah sendiri',
          D: 'Ingin menghemat waktu istirahat bermain gim daring saat waktu salat fardu tiba',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Salat jamak dan qashar merupakan hadiah keringanan (rukhsah) dari Allah Swt.', jawaban: 'Benar' },
          { pernyataan: 'Salat Magrib dan Subuh dapat diqashar menjadi satu rakaat.', jawaban: 'Salah' },
          { pernyataan: 'Salat Zuhur dan Asar boleh dijamak baik secara takdim maupun takkhir.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Menggabungkan dua salat fardu pada waktu yang pertama', respon: 'Jamak Takdim' },
          { premis: 'Menggabungkan dua salat fardu pada waktu yang kedua', respon: 'Jamak Takkhir' },
          { premis: 'Meringkas salat empat rakaat menjadi dua rakaat', respon: 'Salat Qashar' },
        ],
        pertanyaanIsian:
          'Keringanan dalam syariat Islam yang membolehkan meringkas salat empat rakaat menjadi dua rakaat disebut salat ....................',
        kunciIsian: 'qashar',
        pertanyaanUraian:
          'Jelaskan syarat-syarat seseorang diperbolehkan melaksanakan salat jamak dan qashar dalam perjalanan jauh (safar)!',
        kunciUraian:
          '1. Perjalanan bukan untuk tujuan maksiat melainkan kebaikan atau keperluan mubah.\n2. Jarak tempuh perjalanan telah mencapai batas safar minimal (kurang lebih 80 km atau lebih).\n3. Berniat jamak/qashar saat takbiratul ihram dan berurutan antar salat.',
        pembahasan: 'Rukhsah salat jamak dan qashar adalah bukti kasih sayang Allah yang memudahkan hamba-Nya.',
        dalil: 'Q.S. An-Nisa/4: 101 tentang mengqashar salat dalam perjalanan.',
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Piagam Madinah dan Kerukunan Umat Beragama',
        stimulusModel: 'Model B: Analisis Piagam Madinah',
        indikatorTopik: 'menganalisis nilai moderasi beragama dalam Piagam Madinah',
        cpRingkas: 'Murid meneladani nilai-nilai moderasi dan persatuan dalam Piagam Madinah.',
        stimulus:
          'Setelah hijrah ke Yatsrib (Madinah), Nabi Muhammad saw. mempersatukan kaum Muhajirin, Anshar, serta kabilah-kabilah Yahudi dalam satu ikatan perjanjian tertulis yang menjamin kebebasan beragama dan pertahanan bersama.',
        pertanyaanPG: 'Perjanjian bersejarah yang menjadi tonggak konstitusi masyarakat Madinah tersebut adalah ....',
        opsiPG: {
          A: 'Piagam Madinah (Mitsaq al-Madinah)',
          B: 'Perjanjian Hudaibiyah',
          C: 'Baiat Aqabah Pertama',
          D: 'Fathu Makkah',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua prinsip pokok yang termaktub dalam Piagam Madinah!',
        opsiPGK: {
          A: 'Setiap kelompok agama memiliki kebebasan menjalankan keyakinan dan ibadahnya masing-masing',
          B: 'Seluruh warga Madinah berkewajiban bahu-membahu membela kota Madinah dari serangan musuh',
          C: 'Kaum Muhajirin berhak menguasai seluruh harta kekayaan warga Madinah lainnya',
          D: 'Penduduk non-muslim dipaksa masuk ke dalam agama Islam secara sepihak',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Piagam Madinah adalah konstitusi tertulis pertama yang menjamin hak asasi manusia.', jawaban: 'Benar' },
          { pernyataan: 'Rasulullah saw. melarang umat Islam bekerja sama dengan warga non-muslim.', jawaban: 'Salah' },
          { pernyataan: 'Keadilan hukum dalam Piagam Madinah berlaku sama bagi seluruh warga negara.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Kaum muslim yang ikut hijrah dari Makkah', respon: 'Kaum Muhajirin' },
          { premis: 'Penduduk asli Madinah yang menyambut dan menolong', respon: 'Kaum Anshar' },
          { premis: 'Konstitusi pemersatu keberagaman Madinah', respon: 'Piagam Madinah' },
        ],
        pertanyaanIsian:
          'Dokumen perjanjian tertulis yang dibuat Nabi Muhammad saw. untuk mempersatukan penduduk Madinah disebut Piagam ....................',
        kunciIsian: 'Madinah',
        pertanyaanUraian:
          'Bagaimana nilai-nilai toleransi dan keadilan dalam Piagam Madinah dapat diterapkan oleh pelajar SMP dalam kehidupan berbangsa saat ini? Jelaskan 2 contohnya!',
        kunciUraian:
          '1. Bekerja sama dalam kegiatan sosial sekolah dan OSIS dengan teman dari berbagai latar belakang agama dan suku tanpa diskriminasi.\n2. Bersama-sama menjaga ketertiban, keamanan, dan kedamaian lingkungan sekolah sebagai wujud cinta tanah air.',
        pembahasan: 'Piagam Madinah membuktikan Islam menjunjung tinggi toleransi, hak warga, dan keadilan hukum.',
        dalil: 'Teks Piagam Madinah Pasal 16 & 25 tentang perlindungan hak kelompok beragama.',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Iman kepada Kitab-Kitab Allah Swt.',
        stimulusModel: 'Model B: Fungsi Al-Qur\'an sebagai Penyempurna',
        indikatorTopik: 'menganalisis fungsi Al-Qur\'an sebagai petunjuk dan penyempurna kitab-kitab suci terdahulu',
        cpRingkas: 'Murid memahami kedudukan kitab suci Al-Qur\'an dan beriman kepada kitab-kitab Allah.',
        stimulus:
          'Allah Swt. menurunkan kitab-kitab suci kepada para rasul pilihan-Nya untuk menjadi petunjuk hidup umat manusia. Al-Qur\'an diturunkan kepada Nabi Muhammad saw. sebagai kitab suci terakhir yang menyempurnakan kitab-kitab sebelumnya.',
        pertanyaanPG: 'Kedudukan Al-Qur\'an terhadap kitab-kitab suci terdahulu (Taurat, Zabur, dan Injil) adalah sebagai ....',
        opsiPG: {
          A: 'Penyempurna ajaran tauhid dan pembenar isi kitab-kitab terdahulu (muhaiminan \'alaih)',
          B: 'Pengganti nama Allah menjadi beraneka ragam sebutan',
          C: 'Kitab sejarah kuno yang tidak lagi relevan dengan perkembangan zaman modern',
          D: 'Kitab yang hanya wajib diyakini oleh bangsa Arab pada abad ketujuh masehi',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua pasangan nama rasul dan kitab suci yang diterimanya secara benar!',
        opsiPGK: {
          A: 'Nabi Daud a.s. menerima Kitab Zabur',
          B: 'Nabi Musa a.s. menerima Kitab Taurat',
          C: 'Nabi Isa a.s. menerima Kitab Zabur',
          D: 'Nabi Ibrahim a.s. menerima Kitab Injil',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Al-Qur\'an terpelihara keasliannya oleh Allah Swt. hingga akhir zaman.', jawaban: 'Benar' },
          { pernyataan: 'Umat Islam tidak perlu mempercayai adanya kitab suci sebelum Al-Qur\'an.', jawaban: 'Salah' },
          { pernyataan: 'Semua kitab suci yang diturunkan Allah mengajarkan ajaran tauhid mengesakan Allah.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Kitab Taurat diturunkan kepada', respon: 'Nabi Musa a.s.' },
          { premis: 'Kitab Injil diturunkan kepada', respon: 'Nabi Isa a.s.' },
          { premis: 'Kitab Al-Qur\'an diturunkan kepada', respon: 'Nabi Muhammad saw.' },
        ],
        pertanyaanIsian:
          'Kitab suci yang diturunkan kepada Nabi Daud a.s. bernama Kitab ....................',
        kunciIsian: 'Zabur',
        pertanyaanUraian:
          'Jelaskan 3 fungsi Al-Qur\'an bagi kehidupan manusia dalam menjalani kehidupan sehari-hari!',
        kunciUraian:
          '1. Sebagai petunjuk (hudan) bagi orang-orang yang bertakwa.\n2. Sebagai pembeda (furqan) antara yang hak dan yang batil.\n3. Sebagai penyembuh penyakit hati dan penenang jiwa (syifa\').',
        pembahasan: 'Beriman kepada kitab Allah menuntut kita untuk membaca, memahami, dan mengamalkannya.',
        dalil: 'Q.S. Al-Baqarah/2: 2 & Q.S. Al-Ma\'idah/5: 48.',
      },
    ],
    isian: [
      {
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Kaidah Tabayyun',
        stimulusModel: 'Model A: Konsep Qur\'ani',
        indikatorTopik: 'menyebutkan istilah verifikasi kabar dalam Al-Qur\'an',
        cpRingkas: 'Murid memahami istilah tabayyun.',
        stimulus: 'Menerima pesan di grup media sosial yang mencurigakan.',
        pertanyaanPG: 'Mencari kebenaran informasi disebut ....',
        opsiPG: { A: 'Tabayyun', B: 'Tafakkur', C: 'Tadabbur', D: 'Ta\'aruf' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua dampak positif dari membiasakan sikap tabayyun di media sosial!',
        opsiPGK: {
          A: 'Mencegah terjadinya fitnah dan perpecahan di antara sesama teman',
          B: 'Menyelamatkan orang yang tidak bersalah dari tuduhan bohong',
          C: 'Membuat akun media sosial kita cepat terkenal dan viral luas',
          D: 'Memudahkan kita mencari kelemahan dan kesalahan teman sekelas',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Tabayyun diperintahkan dalam Surah Al-Hujurat ayat 6.', jawaban: 'Benar' },
          { pernyataan: 'Kabar viral di internet boleh langsung dipercaya tanpa dicek.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Tabayyun', respon: 'Memverifikasi kebenaran berita' },
          { premis: 'Tajassus', respon: 'Mencari-cari kesalahan orang lain' },
        ],
        pertanyaanIsian: 'Meneliti dan memeriksa kebenaran suatu informasi sebelum menyebarkannya di media sosial disebut ....................',
        kunciIsian: 'tabayyun',
        pertanyaanUraian: 'Tuliskan dalil Al-Qur\'an yang memerintahkan tabayyun!',
        kunciUraian: 'Q.S. Al-Hujurat ayat 6 memerintahkan memeriksa berita dari orang fasik.',
        pembahasan: 'Tabayyun mencegah fitnah.',
        dalil: 'Q.S. Al-Hujurat: 6.',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Rukhsah Salat Musafir',
        stimulusModel: 'Model B: Safar Kebaikan',
        indikatorTopik: 'menyebutkan salat musafir',
        cpRingkas: 'Murid mengenal rukhsah salat jamak dan qashar.',
        stimulus: 'Rombongan murid bepergian jauh ke luar kota melintasi jarak lebih dari 80 km.',
        pertanyaanPG: 'Keringanan mengumpulkan dua waktu salat disebut ....',
        opsiPG: { A: 'Jamak', B: 'Qashar', C: 'Qadha', D: 'Fidyah' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua salat fardu yang boleh diringkas rakaatnya menjadi dua rakaat!',
        opsiPGK: {
          A: 'Salat Zuhur yang asalnya empat rakaat',
          B: 'Salat Asar yang asalnya empat rakaat',
          C: 'Salat Subuh yang asalnya dua rakaat',
          D: 'Salat Magrib yang asalnya tiga rakaat',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Salat jamak artinya mengumpulkan dua waktu salat fardu.', jawaban: 'Benar' },
          { pernyataan: 'Salat Subuh dapat dijamak dengan salat Zuhur.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Jamak takdim', respon: 'Dikerjakan di waktu salat pertama' },
          { premis: 'Jamak takkhir', respon: 'Dikerjakan di waktu salat kedua' },
        ],
        pertanyaanIsian: 'Mengumpulkan pelaksanaan dua salat fardu dalam satu waktu bagi musafir disebut salat ....................',
        kunciIsian: 'jamak',
        pertanyaanUraian: 'Jelaskan perbedaan antara salat jamak takdim dan jamak takkhir!',
        kunciUraian: 'Jamak takdim dikerjakan di waktu salat yang pertama, sedangkan jamak takkhir dikerjakan di waktu salat yang kedua.',
        pembahasan: 'Rukhsah salat dalam perjalanan.',
        dalil: 'Hadis tentang jamak dan qashar Rasulullah saw.',
      },
    ],
    uraian: [
      {
        elemen: 'Akhlak',
        materiPokok: 'Pencegahan Cyberbullying di Lingkungan Remaja',
        stimulusModel: 'Model B: Kasus Dinamika Media Sosial',
        indikatorTopik: 'merumuskan langkah pencegahan perundungan siber di grup obrolan kelas',
        cpRingkas: 'Murid menyusun strategi santun menolak perundungan digital.',
        stimulus:
          'Di sebuah grup obrolan kelas, beberapa murid kerap mengirimkan lelucon kasar yang menyinggung perasaan teman lain.',
        pertanyaanPG: 'Tindakan yang tepat adalah ....',
        opsiPG: { A: 'Mengingatkan dengan bahasa santun dan membuat kesepakatan etika bersama', B: 'Membalas dengan kata lebih kasar', C: 'Keluar dari grup dan memusuhi teman', D: 'Merekam dan menyebarkannya ke publik' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua langkah nyata mencegah perundungan siber di kalangan remaja!',
        opsiPGK: {
          A: 'Menolak meneruskan konten yang merendahkan martabat atau fisik teman',
          B: 'Mendampingi teman yang menjadi korban dan melaporkan pada pihak sekolah',
          C: 'Ikut membagikan lelucon fisik teman agar dianggap kompak dan populer',
          D: 'Menyebarkan rahasia pribadi orang lain untuk membalas perbuatan buruk',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Mengolok-olok teman di media sosial dilarang dalam ajaran Islam.', jawaban: 'Benar' },
          { pernyataan: 'Cyberbullying dapat menimbulkan dampak trauma psikologis pada korban.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Menjaga lisan dan jemari', respon: 'Etika berkomunikasi di media sosial' },
          { premis: 'Mendamaikan teman berselisih', respon: 'Sikap ishlah yang terpuji' },
        ],
        pertanyaanIsian: 'Mengolok-olok teman di dunia maya disebut ....................',
        kunciIsian: 'cyberbullying',
        pertanyaanUraian:
          'Tuliskan 3 langkah nyata yang dapat dilakukan pengurus kelas bersama murid-murid untuk mencegah perundungan (cyberbullying) di grup WhatsApp kelas!',
        kunciUraian:
          '1. Membuat kesepakatan aturan etika bersama di grup kelas yang melarang penyebaran stiker mengejek atau kata-kata kasar.\n2. Mengingatkan secara langsung dengan bahasa yang santun ketika ada teman yang mulai melewati batas bercanda.\n3. Memberikan perlindungan dan dukungan moril kepada teman yang menjadi korban serta berkoordinasi dengan wali kelas atau guru BK.',
        pembahasan:
          'Menciptakan ruang digital yang aman dan santun adalah tanggung jawab bersama seluruh warga kelas.',
        dalil: 'Q.S. Al-Hujurat/49: 11 — Larangan Mengolok-olok Kaum Lain',
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Piagam Madinah dan Kerukunan Umat Beragama',
        stimulusModel: 'Model B: Analisis Sejarah Kenabian',
        indikatorTopik: 'menganalisis prinsip keadilan dan kerukunan dalam Piagam Madinah',
        cpRingkas: 'Murid meneladani nilai moderasi dalam Piagam Madinah.',
        stimulus:
          'Ketika hijrah ke Madinah, Rasulullah saw. mempersatukan kaum Muhajirin, Anshar, serta suku-suku Yahudi melalui sebuah piagam kesepakatan tertulis.',
        pertanyaanPG: 'Perjanjian bersejarah di Madinah tersebut adalah ....',
        opsiPG: { A: 'Piagam Madinah', B: 'Perjanjian Hudaibiyah', C: 'Baiat Aqabah', D: 'Fathu Makkah' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua nilai penting dalam Piagam Madinah yang patut diteladani!',
        opsiPGK: {
          A: 'Jaminan kebebasan beribadah bagi setiap kelompok pemeluk agama',
          B: 'Semangat persatuan dalam mempertahankan keamanan dan kedamaian negeri',
          C: 'Hak istimewa kelompok mayoritas untuk menindas kelompok minoritas',
          D: 'Larangan melakukan musyawarah bersama jika ada perbedaan pendapat',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Piagam Madinah menjamin perlindungan bagi seluruh warga Madinah.', jawaban: 'Benar' },
          { pernyataan: 'Islam mengajarkan hidup berdampingan secara damai dengan umat lain.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Piagam Madinah', respon: 'Konstitusi kerukunan dan persatuan' },
          { premis: 'Tasamuh', respon: 'Sikap toleran menghargai perbedaan' },
        ],
        pertanyaanIsian: 'Piagam perdamaian yang dirumuskan Rasulullah di Madinah bernama Piagam ....................',
        kunciIsian: 'Madinah',
        pertanyaanUraian:
          'Bagaimana nilai-nilai toleransi dan keadilan dalam Piagam Madinah dapat diterapkan oleh pelajar SMP dalam kehidupan berbangsa saat ini? Jelaskan 2 contohnya!',
        kunciUraian:
          '1. Bekerja sama dalam kegiatan sosial sekolah dan OSIS dengan teman dari berbagai latar belakang agama dan suku tanpa diskriminasi.\n2. Bersama-sama menjaga ketertiban, keamanan, dan kedamaian lingkungan sekolah sebagai wujud cinta tanah air.',
        pembahasan:
          'Piagam Madinah adalah konstitusi tertulis pertama di dunia yang menjamin hak kebebasan beragama dan perlindungan warga negara.',
        dalil: 'Teks Piagam Madinah tentang Satu Umat yang Saling Melindungi',
      },
    ],
  },

  // =========================================================================
  // FASE E: KELAS 10 SMA/MA (USIA 15–16 TAHUN)
  // Konteks: Kearifan lokal dakwah Walisongo (Sunan Kudus & Sunan Kalijaga), Syu'abul Iman, Asuransi Syariah Takaful, Fastabiqul Khairat, Ukhuwah Basyariyah
  // DILARANG: Pinjaman daring konser & mystery box (Strictly Fase F!)
  // =========================================================================
  'Fase E': {
    pg: [
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Strategi Dakwah Kultural Sunan Kudus dan Sunan Kalijaga',
        stimulusModel: 'Model B: Narasi Historis Kearifan Lokal',
        indikatorTopik: 'mengevaluasi strategi dakwah kultural para wali dalam membangun toleransi di Nusantara',
        cpRingkas: 'Murid menganalisis pendekatan dakwah bil-hikmah para penyebar Islam di Nusantara.',
        stimulus:
          'Ketika berdakwah di Kudus, Sunan Kudus membangun menara masjid dengan arsitektur bata merah yang akrab bagi warga setempat dan melarang penyembelihan sapi saat Iduladha untuk menghormati perasaan tetangga beragama Hindu. Sementara itu, Sunan Kalijaga menyisipkan ajaran tauhid dan akhlak mulia melalui pertunjukan wayang kulit.',
        pertanyaanPG: 'Berdasarkan narasi sejarah di atas, strategi dakwah yang dicontohkan oleh para wali tersebut adalah ....',
        opsiPG: {
          A: 'Mengikis paksa seluruh peninggalan budaya lokal tanpa kompromi',
          B: 'Dakwah dengan pendekatan kultural yang santun dan menghargai kearifan lokal (bil-hikmah)',
          C: 'Mencampuradukkan tata cara ibadah salat dengan ritual sesajen zaman dahulu',
          D: 'Menghindari interaksi sosial dengan masyarakat yang belum memeluk agama Islam',
          E: 'Memaksakan hukum agama secara militer kepada penduduk setempat',
        },
        kunciPG: 'B',
        pertanyaanPGK: 'Pilihlah dua nilai keteladanan dari metode dakwah Walisongo yang relevan untuk generasi muda saat ini!',
        opsiPGK: {
          A: 'Sikap toleran dan menghargai tradisi budaya lokal yang tidak menyimpang dari akidah tauhid',
          B: 'Menyampaikan pesan kebenaran dengan cara damai, kreatif, dan menyejukkan hati masyarakat',
          C: 'Menolak kerja sama sosial dengan warga sekitar yang berbeda suku atau keyakinan agama',
          D: 'Menganggap kebudayaan Nusantara tidak memiliki nilai luhur dalam membangun peradaban',
          E: 'Menghakimi perbedaan pemahaman agama di masyarakat dengan narasi kebencian',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Pendekatan dakwah Sunan Kudus menunjukkan contoh moderasi beragama dalam sejarah Nusantara.', jawaban: 'Benar' },
          { pernyataan: 'Sunan Kalijaga melarang penggunaan media seni dalam kegiatan penyebaran Islam.', jawaban: 'Salah' },
          { pernyataan: 'Dakwah Islam di Nusantara berkembang pesat karena disebarkan secara damai tanpa kekerasan.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Wali Songo yang menghormati masyarakat Kudus dengan tidak menyembelih sapi', respon: 'Sunan Kudus' },
          { premis: 'Wali Songo yang memanfaatkan pertunjukan wayang kulit untuk dakwah tauhid', respon: 'Sunan Kalijaga' },
          { premis: 'Masjid dengan arsitektur menara akulturasi budaya bata merah', respon: 'Masjid Menara Kudus' },
        ],
        pertanyaanIsian:
          'Strategi dakwah para ulama Nusantara yang memadukan ajaran Islam dengan kearifan budaya lokal disebut pendekatan dakwah secara ....................................................',
        kunciIsian: 'kultural (bil-hikmah)',
        pertanyaanUraian:
          'Analisislah mengapa strategi dakwah Sunan Kudus yang melarang penyembelihan sapi berhasil menarik simpati masyarakat setempat dan apa relevansinya bagi moderasi beragama di Indonesia saat ini!',
        kunciUraian:
          '1. Analisis strategi: Karena Sunan Kudus menunjukkan tenggang rasa (tasamuh) yang tinggi terhadap keyakinan warga Hindu yang memuliakan sapi, sehingga masyarakat merasa dihormati dan tidak terancam oleh kehadiran Islam.\n2. Relevansi masa kini: Mengajarkan pentingnya berdakwah dengan empati, mengutamakan persaudaraan kemanusiaan (ukhuwah basyariyah), dan menjaga kerukunan dalam kebinekaan tanpa menggadaikan akidah.',
        pembahasan:
          'Pendekatan dakwah kultural para wali membuktikan bahwa Islam hadir sebagai rahmatan lil \'alamin yang menghargai nilai-nilai kemanusiaan dan kearifan lokal.',
        dalil: 'Q.S. An-Nahl/16: 125 — Perintah Berdakwah dengan Hikmah dan Nasihat yang Baik',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Konsep Syu\'abul Iman (Cabang-Cabang Iman)',
        stimulusModel: 'Model B: Analisis Dimensi Keimanan Pelajar',
        indikatorTopik: 'menganalisis implementasi cabang-cabang iman dalam ranah niat, lisan, dan perbuatan',
        cpRingkas: 'Murid menganalisis 77 cabang keimanan dan penerapannya dalam kehidupan sehari-hari.',
        stimulus:
          'Rasulullah saw. bersabda bahwa iman memiliki lebih dari tujuh puluh cabang. Cabang yang paling utama adalah ucapan "Laa ilaaha illallah", sedangkan cabang yang paling rendah adalah menyingkirkan duri atau gangguan dari jalanan, dan rasa malu adalah sebagian dari iman.',
        pertanyaanPG: 'Berdasarkan hadis di atas, hubungan antara keyakinan hati, lisan, dan perbuatan fisik dalam konsep iman adalah ....',
        opsiPG: {
          A: 'Iman hanya cukup diyakini dalam hati tanpa perlu diucapkan dengan lisan dan perbuatan',
          B: 'Iman merupakan satu kesatuan utuh yang mencakup pembenaran hati, ikrar lisan, dan pembuktian amal nyata',
          C: 'Amal perbuatan menyingkirkan duri di jalan tidak memiliki nilai pahala dalam keimanan',
          D: 'Rasa malu hanya dibutuhkan dalam urusan ibadah khusus di masjid',
          E: 'Ucapan Laa ilaaha illallah menggugurkan kewajiban berbuat baik kepada sesama manusia',
        },
        kunciPG: 'B',
        pertanyaanPGK: 'Pilihlah dua contoh pengamalan syu\'abul iman ranah lisan dan perbuatan seorang murid di sekolah!',
        opsiPGK: {
          A: 'Menjaga lisan dari perkataan dusta, ghibah, dan ujaran kebencian di media sosial',
          B: 'Menyingkirkan pecahan kaca atau sampah yang berserakan di lorong tangga sekolah',
          C: 'Menceritakan aib keluarga teman sebangku agar menjadi bahan obrolan santai',
          D: 'Menolak memberikan bantuan kepada teman yang sedang tertimpa musibah',
          E: 'Mengabaikan sampah yang menumpuk di depan pintu ruang kelas',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Syu\'abul iman mencakup pilar keimanan yang menyentuh ranah hati, lisan, dan tindakan nyata.', jawaban: 'Benar' },
          { pernyataan: 'Rasa malu melakukan perbuatan maksiat adalah bukti kesempurnaan iman seorang muslim.', jawaban: 'Benar' },
          { pernyataan: 'Menyingkirkan gangguan dari jalanan tidak termasuk bagian dari cabang iman.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Cabang iman paling utama (Ma\'rifat bil qalbi & lisan)', respon: 'Mengucapkan kalimat Laa ilaaha illallah' },
          { premis: 'Cabang iman ranah akhlak batin', respon: 'Memelihara rasa malu (al-haya\') dari perbuatan dosa' },
          { premis: 'Cabang iman paling sederhana dalam ranah perbuatan sosial', respon: 'Menyingkirkan duri/gangguan dari jalanan' },
        ],
        pertanyaanIsian:
          'Cabang-cabang keimanan yang mencakup dimensi hati, ucapan lisan, dan perbuatan amal saleh disebut ....................................................',
        kunciIsian: 'syu\'abul iman',
        pertanyaanUraian:
          'Jelaskan bagaimana konsep Syu\'abul Iman (cabang-cabang iman) membentuk integritas moral seorang pelajar di era digital saat ini!',
        kunciUraian:
          '1. Ranah hati: Menanamkan niat ikhlas dan kesadaran bahwa Allah Maha Mengawasi (muraqabah) aktivitas di ruang digital.\n2. Ranah lisan: Menggunakan media sosial untuk menyebarkan kebaikan, menghindari hoaks, ghibah, dan caci maki.\n3. Ranah perbuatan: Menghasilkan karya positif yang bermanfaat bagi masyarakat dan menolong sesama di dunia nyata.',
        pembahasan:
          'Iman bukan sekadar pengakuan verbal melainkan integritas hidup yang tercermin dalam ucapan dan kontribusi sosial nyata.',
        dalil: 'Hadis Riwayat Muslim tentang Syu\'abul Iman (Iman memiliki 70 lebih cabang)',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Prinsip Asuransi Syariah (Takaful) dan Tolong Menolong (Ta\'awun)',
        stimulusModel: 'Model B: Analisis Muamalah Kontemporer',
        indikatorTopik: 'menganalisis perbedaan prinsip asuransi syariah berbasis ta\'awun dengan asuransi konvensional',
        cpRingkas: 'Murid menganalisis prinsip asuransi syariah (takaful) dan menghindari riba, gharar, dan maysir.',
        stimulus:
          'Sekolah membentuk program dana santunan kesehatan siswa untuk membantu biaya pengobatan murid yang sakit. Setiap murid menyisihkan infak sukarela ke dalam rekening bersama yang dikelola secara transparan atas dasar tolong-menolong tanpa mencari keuntungan komersial.',
        pertanyaanPG: 'Program dana santunan kesehatan siswa di atas sesuai dengan prinsip utama dalam asuransi syariah yaitu ....',
        opsiPG: {
          A: 'Takaful dan ta\'awun (saling tolong menolong menanggung risiko kemalangan sesama)',
          B: 'Tabadul (pertukaran keuntungan komersial semata untuk mencari laba maksimal)',
          C: 'Ihtikar (menimbun dana untuk kepentingan pengurus program saja)',
          D: 'Gharar (ketidakjelasan penggunaan dana dan risiko yang ditanggung)',
          E: 'Maysir (perjudian mencari keuntungan dari penderitaan pihak lain)',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua unsur terlarang dalam transaksi keuangan yang harus dihindari oleh lembaga keuangan syariah!',
        opsiPGK: {
          A: 'Riba (tambahan bunga yang memberatkan atas pinjaman pokok)',
          B: 'Gharar (ketidakpastian dan ketidakjelasan barang atau akad)',
          C: 'Toleransi (kemudahan dan kelapangan dalam memberi tempo pembayaran)',
          D: 'Amanah (kejujuran dalam pengelolaan dana bersama secara transparan)',
          E: 'Ta\'awun (gotong royong dalam kebajikan dan ketakwaan)',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Asuransi syariah berlandaskan akad tolong-menolong (ta\'awun) dan saling menanggung risiko (takaful).', jawaban: 'Benar' },
          { pernyataan: 'Dalam asuransi konvensional terjadi transfer of risk dari nasabah ke perusahaan dengan sistem premi komersial.', jawaban: 'Benar' },
          { pernyataan: 'Praktik bunga bank majemuk dalam syariat Islam dinilai sejalan dengan akad bagi hasil.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Prinsip saling menanggung risiko dalam asuransi syariah', respon: 'Takaful' },
          { premis: 'Prinsip tolong menolong dalam kebaikan dan ketakwaan', respon: 'Ta\'awun' },
          { premis: 'Dana hibah ikhlas yang disisihkan nasabah untuk membantu sesama', respon: 'Dana Tabarru\'' },
        ],
        pertanyaanIsian:
          'Prinsip saling tolong-menolong dan menanggung risiko antara sesama peserta dalam asuransi syariah disebut asas ....................................................',
        kunciIsian: 'takaful (ta\'awun)',
        pertanyaanUraian:
          'Jelaskan perbedaan mendasar antara asuransi syariah (takaful) dengan asuransi konvensional dari aspek akad dan pengelolaan risikonya!',
        kunciUraian:
          '1. Aspek Akad: Asuransi syariah menggunakan akad tolong-menolong (tabarru\'/ta\'awun) dan akad bagi hasil (mudharabah), sedangkan asuransi konvensional menggunakan akad jual beli pertukaran (mu\'awadhah).\n2. Aspek Pengelolaan Risiko: Asuransi syariah menganut sistem saling menanggung risiko antarpeserta (sharing of risk), sedangkan asuransi konvensional mengalihkan seluruh risiko dari peserta ke perusahaan (transfer of risk).',
        pembahasan:
          'Takaful membersihkan transaksi keuangan dari unsur maisir, gharar, dan riba melalui konsep kepemilikan dana bersama (dana tabarru\').',
        dalil: 'Q.S. Al-Ma\'idah/5: 2 — Dan tolong-menolonglah kamu dalam kebajikan dan takwa',
      },
      {
        elemen: 'Al-Qur\'an dan Hadis',
        materiPokok: 'Fastabiqul Khairat dan Etos Kerja Produktif (Q.S. Al-Ma\'idah/5: 48)',
        stimulusModel: 'Model A: Kajian Ayat Qur\'ani',
        indikatorTopik: 'menerapkan semangat berlomba dalam kebaikan (fastabiqul khairat) dan etos kerja produktif',
        cpRingkas: 'Murid menganalisis kandungan Q.S. Al-Ma\'idah/5: 48 tentang fastabiqul khairat.',
        stimulus:
          'Perhatikan potongan firman Allah dalam Q.S. Al-Ma\'idah/5: 48 berikut:\nفَاسْتَبِقُوا الْخَيْرَاتِ ۚ إِلَى اللَّهِ مَرْجِعُكُمْ جَمِيعًا فَيُنَبِّئُكُمْ بِمَا كُنْتُمْ فِيهِ تَخْتَلِفُونَ\nAyat ini memerintahkan umat Islam untuk tidak menyia-nyiakan waktu dan selalu terdepan dalam berbuat kebajikan serta meningkatkan kompetensi diri.',
        pertanyaanPG: 'Penerapan konsep "fastabiqul khairat" yang paling tepat bagi seorang murid SMA di sekolah adalah ....',
        opsiPG: {
          A: 'Berlomba menguasai ilmu pengetahuan dan aktif berorganisasi demi kemaslahatan bersama',
          B: 'Menjatuhkan teman yang berprestasi agar posisi juara kelas dapat direbut sendiri',
          C: 'Menyimpan catatan rumus pelajaran secara rahasia agar teman lain tidak bisa belajar',
          D: 'Memamerkan hasil karya seni di media sosial dengan nada merendahkan karya orang lain',
          E: 'Hanya mau mengikuti perlombaan jika dijanjikan hadiah berupa uang tunai yang besar',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua ciri pribadi muslim yang mengamalkan semangat fastabiqul khairat!',
        opsiPGK: {
          A: 'Disiplin mengelola waktu belajar dan tidak menunda pekerjaan yang bermanfaat',
          B: 'Senang berkolaborasi dan saling memotivasi dalam kebaikan dengan teman sebaya',
          C: 'Merasa iri dan dengki ketika melihat sahabat satu kelas meraih penghargaan lomba',
          D: 'Menghabiskan sebagian besar waktu luang untuk bermain gim daring tanpa henti',
          E: 'Cepat berpuas diri sehingga enggan mempelajari keterampilan dan ilmu baru',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Fastabiqul khairat mengajarkan persaingan sehat yang dilandasi niat ikhlas karena Allah.', jawaban: 'Benar' },
          { pernyataan: 'Berlomba dalam kebaikan berarti menghalalkan segala cara untuk mengalahkan teman.', jawaban: 'Salah' },
          { pernyataan: 'Setiap amal kebaikan yang dilakukan dengan sungguh-sungguh akan dibalas oleh Allah.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Fastabiqul khairat', respon: 'Berlomba-lomba dalam kebajikan' },
          { premis: 'Etos kerja Islami', respon: 'Bekerja keras, ikhlas, dan profesional' },
          { premis: 'Tujuan akhir setiap amal', respon: 'Mencari rida dan ampunan Allah Swt.' },
        ],
        pertanyaanIsian:
          'Perintah dalam Q.S. Al-Ma\'idah ayat 48 untuk saling berlomba-lomba dalam kebajikan dikenal dengan istilah ....................',
        kunciIsian: 'fastabiqul khairat',
        pertanyaanUraian:
          'Jelaskan bagaimana semangat fastabiqul khairat (Q.S. Al-Ma\'idah: 48) dapat diterapkan oleh murid SMA dalam meningkatkan prestasi akademik dan kepedulian sosial!',
        kunciUraian:
          '1. Prestasi Akademik: Belajar dengan sungguh-sungguh, berani berinovasi, dan saling berbagi ilmu dengan teman yang kesulitan tanpa rasa pelit.\n2. Kepedulian Sosial: Mempelopori aksi kepedulian sosial, gemar berinfak, dan aktif dalam kegiatan bakti sosial di lingkungan sekolah dan masyarakat.',
        pembahasan: 'Fastabiqul khairat adalah energi penggerak kemajuan peradaban umat Islam.',
        dalil: 'Q.S. Al-Ma\'idah/5: 48 & Q.S. Al-Baqarah/2: 148.',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Adab Pergaulan Islami dan Menjauhi Zina (Q.S. Al-Isra\'/17: 32)',
        stimulusModel: 'Model B: Analisis Etika Pergaulan Generasi Muda',
        indikatorTopik: 'menganalisis prinsip menjaga pergaulan dan menjauhi perbuatan yang mendekati zina',
        cpRingkas: 'Murid menganalisis adab pergaulan remaja dan larangan mendekati zina dalam kehidupan.',
        stimulus:
          'Kemajuan teknologi gawai pintar memudahkan interaksi daring antarlawan jenis. Islam mengajarkan prinsip ghadhul bashar (menjaga pandangan) dan membatasi khalwat (berdua-duaan tanpa mahram) demi menjaga kehormatan diri.',
        pertanyaanPG: 'Hikmah utama di balik larangan mendekati zina dalam firman Allah Q.S. Al-Isra\'/17: 32 adalah ....',
        opsiPG: {
          A: 'Memelihara kesucian garis keturunan (hifzh al-nasl) dan martabat kehormatan manusia',
          B: 'Membatasi kebebasan bersosialisasi dan berteman di kalangan remaja modern',
          C: 'Mengharuskan setiap remaja untuk tidak menggunakan media komunikasi gawai pintar',
          D: 'Melarang segala bentuk kerja sama akademik antara murid laki-laki dan perempuan',
          E: 'Menghapuskan hak berekspresi anak muda dalam kegiatan organisasi sekolah',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua adab pergaulan antarlawan jenis yang dianjurkan dalam ajaran Islam!',
        opsiPGK: {
          A: 'Menjaga pandangan mata dan berbusana menutup aurat secara sopan dan rapi',
          B: 'Berkomunikasi dengan bahasa yang wajar dan menghindari candaan yang menjurus ke pornografi',
          C: 'Berduaan di tempat yang tersembunyi dan sepi tanpa ada orang lain yang mengetahui',
          D: 'Mengirimkan foto atau video pribadi yang vulgar melalui pesan obrolan rahasia',
          E: 'Mengabaikan nasihat orang tua dan guru dalam memilih teman bergaul di luar sekolah',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Menjaga pandangan mata (ghadhul bashar) berlaku bagi laki-laki dan perempuan.', jawaban: 'Benar' },
          { pernyataan: 'Mendekati perbuatan yang memicu zina diperbolehkan asalkan tidak sampai melakukannya.', jawaban: 'Salah' },
          { pernyataan: 'Menjaga kehormatan diri merupakan bagian dari pilar Maqashid Syariah.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Ghadhul bashar', respon: 'Menundukkan atau menjaga pandangan mata' },
          { premis: 'Khalwat', respon: 'Berduaan antarlawan jenis tanpa mahram' },
          { premis: 'Hifzh al-Nasl', respon: 'Perlindungan kesucian garis keturunan' },
        ],
        pertanyaanIsian:
          'Perintah dalam Islam untuk menundukkan atau menjaga pandangan mata dari hal-hal yang diharamkan disebut ....................',
        kunciIsian: 'ghadhul bashar',
        pertanyaanUraian:
          'Jelaskan 3 langkah preventif bagi seorang murid SMA agar terhindar dari pergaulan bebas dan pornografi di era keterbukaan informasi digital!',
        kunciUraian:
          '1. Memperkuat ibadah salat fardu dan sunnah yang berfungsi mencegah perbuatan keji dan mungkar.\n2. Menggunakan gawai secara produktif untuk hal-hal positif dan menjauhi situs-situs terlarang.\n3. Memilih lingkungan pertemanan yang saleh dan saling mengingatkan dalam kebaikan.',
        pembahasan: 'Q.S. Al-Isra\': 32 melarang segala bentuk pintu yang mendekatkan diri pada perzinaan.',
        dalil: 'Q.S. Al-Isra\'/17: 32 — Dan janganlah kamu mendekati zina; sesungguhnya zina itu adalah suatu perbuatan yang keji.',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Prinsip Perbankan Syariah dan Akad Mudharabah',
        stimulusModel: 'Model B: Analisis Tabungan Pendidikan Pelajar',
        indikatorTopik: 'menganalisis perbedaan prinsip bagi hasil perbankan syariah dengan bunga bank konvensional',
        cpRingkas: 'Murid menganalisis prinsip perbankan syariah dan akad bagi hasil.',
        stimulus:
          'Keluarga Arman hendak membuka rekening tabungan pendidikan di bank syariah. Pihak bank menjelaskan bahwa dana nasabah akan dikelola dalam sektor riil dengan sistem nisbah bagi hasil keuntungan usaha secara adil tanpa bunga pinjaman.',
        pertanyaanPG: 'Akad kerja sama usaha antara nasabah pemilik dana (shahibul mal) dan pihak bank sebagai pengelola dana (mudharib) dalam perbankan syariah dinamakan akad ....',
        opsiPG: {
          A: 'Mudharabah (kerja sama permodalan dengan pembagian nisbah hasil keuntungan usaha)',
          B: 'Ijarah (sewa menyewa manfaat suatu barang dalam jangka waktu tertentu)',
          C: 'Rahn (menggadaikan barang berharga sebagai jaminan pelunasan utang)',
          D: 'Kafalah (jaminan yang diberikan penanggung kepada pihak ketiga)',
          E: 'Hawalah (pengalihan utang dari satu pihak kepada pihak lain yang berkewajiban)',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua perbedaan pokok antara tabungan bank syariah dengan bank konvensional!',
        opsiPGK: {
          A: 'Bank syariah menggunakan sistem nisbah bagi hasil keuntungan usaha riil',
          B: 'Bank konvensional menerapkan bunga tetap yang dipatok di muka atas saldo simpanan',
          C: 'Bank syariah menyalurkan pembiayaan ke semua jenis usaha termasuk pabrik minuman keras',
          D: 'Bank konvensional diawasi oleh Dewan Pengawas Syariah (DPS) Majelis Ulama Indonesia',
          E: 'Bank syariah menjamin keuntungan pasti tanpa ada risiko kerugian usaha sama sekali',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Sistem bagi hasil di bank syariah disepakati dalam bentuk rasio persentase nisbah.', jawaban: 'Benar' },
          { pernyataan: 'Bank syariah diperbolehkan menyalurkan dana pada sektor usaha perjudian dan miras.', jawaban: 'Salah' },
          { pernyataan: 'Dewan Pengawas Syariah memastikan seluruh produk bank syariah sesuai fatwa DSN-MUI.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Pemilik modal / nasabah penyimpan', respon: 'Shahibul Mal' },
          { premis: 'Pengelola modal / pihak bank', respon: 'Mudharib' },
          { premis: 'Porsi bagi hasil yang disepakati', respon: 'Nisbah' },
        ],
        pertanyaanIsian:
          'Porsi perbandingan pembagian keuntungan antara bank syariah dan nasabah yang disepakati di awal akad disebut ....................',
        kunciIsian: 'nisbah bagi hasil',
        pertanyaanUraian:
          'Jelaskan mengapa sistem bagi hasil (mudharabah/musyarakah) pada perbankan syariah dinilai lebih adil bagi perekonomian dibandingkan sistem bunga pinjaman tetap!',
        kunciUraian:
          '1. Keadilan Risiko: Sistem bagi hasil membagi risiko dan keuntungan secara proporsional sesuai kinerja usaha riil, sedangkan sistem bunga menuntut hasil tetap tanpa peduli mitra usaha untung atau rugi.\n2. Mencegah Eksploitasi: Menghindari riba yang membebani salah satu pihak dan mendorong investasi produktif pada sektor-sektor yang halal dan bermanfaat.',
        pembahasan: 'Perbankan syariah menggerakkan sektor riil dan bebas riba.',
        dalil: 'Hadis tentang keberkahan jual beli tangguh, muqaradhah (mudharabah), dan mencampur gandum untuk rumah tangga.',
      },
    ],
    isian: [
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Trilogi Ukhuwah',
        stimulusModel: 'Model B: Ukhuwah Kebangsaan',
        indikatorTopik: 'menyebutkan istilah persaudaraan sesama manusia',
        cpRingkas: 'Murid memahami trilogi ukhuwah.',
        stimulus: 'Para pendiri bangsa merumuskan persaudaraan antarsesama umat manusia lintas bangsa dan agama.',
        pertanyaanPG: 'Persaudaraan sesama manusia disebut ....',
        opsiPG: { A: 'Ukhuwah basyariyah', B: 'Ukhuwah islamiyah', C: 'Ukhuwah wathaniyah', D: 'Ukhuwah diniyah', E: 'Ukhuwah nasabiyah' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua pilar persaudaraan kebangsaan yang dirumuskan para ulama Indonesia!',
        opsiPGK: {
          A: 'Ukhuwah wathaniyah yaitu persaudaraan sebangsa dan setanah air dalam bingkai NKRI',
          B: 'Ukhuwah basyariyah yaitu persaudaraan sesama umat manusia tanpa memandang perbedaan',
          C: 'Fanatisme kedaerahan yang menganggap suku daerah sendiri lebih unggul dari suku lain',
          D: 'Chauvinisme yang menolak kerja sama internasional dengan negara-negara tetangga',
          E: 'Esklusivisme kelompok yang enggan berbaur dengan warga masyarakat luas',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Ukhuwah basyariyah adalah persaudaraan seluruh umat manusia.', jawaban: 'Benar' },
          { pernyataan: 'Ukhuwah wathaniyah memperkuat persatuan dan keutuhan NKRI.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Ukhuwah islamiyah', respon: 'Persaudaraan sesama muslim' },
          { premis: 'Ukhuwah wathaniyah', respon: 'Persaudaraan sebangsa setanah air' },
          { premis: 'Ukhuwah basyariyah', respon: 'Persaudaraan seluruh umat manusia' },
        ],
        pertanyaanIsian: 'Persaudaraan sesama umat manusia tanpa memandang perbedaan agama, suku, dan bangsa disebut ukhuwah ....................',
        kunciIsian: 'basyariyah (insaniyah)',
        pertanyaanUraian: 'Jelaskan 3 konsep ukhuwah: ukhuwah islamiyah, ukhuwah wathaniyah, dan ukhuwah basyariyah!',
        kunciUraian: 'Ukhuwah islamiyah (persaudaraan seagama), ukhuwah wathaniyah (persaudaraan sebangsa dan setanah air), ukhuwah basyariyah (persaudaraan seluruh umat manusia).',
        pembahasan: 'Trilogi ukhuwah menjaga keutuhan NKRI.',
        dalil: 'Q.S. Al-Hujurat: 10 & 13.',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Syu\'abul Iman',
        stimulusModel: 'Model B: Cabang-Cabang Keimanan',
        indikatorTopik: 'menyebutkan pilar cabang iman',
        cpRingkas: 'Murid mengenal syu\'abul iman.',
        stimulus: 'Iman mencakup pembenaran hati, ucapan lisan, dan pembuktian amal perbuatan.',
        pertanyaanPG: 'Cabang iman berjumlah ....',
        opsiPG: { A: 'Lebih dari 70 cabang', B: '5 cabang', C: '6 cabang', D: '10 cabang', E: '99 cabang' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua contoh cabang iman yang berkaitan erat dengan amalan lisan!',
        opsiPGK: {
          A: 'Membaca kalimat zikir Laa ilaaha illallah dengan penuh keikhlasan',
          B: 'Menjaga tutur kata santun dan menghindari perkataan dusta atau fitnah',
          C: 'Melaksanakan ibadah puasa fardu di bulan Ramadan dengan ikhlas',
          D: 'Menyingkirkan paku atau duri tajam yang menghalangi jalanan umum',
          E: 'Mendirikan salat tahajud di sepertiga malam yang sunyi di rumah',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Syu\'abul iman berjumlah lebih dari 70 cabang.', jawaban: 'Benar' },
          { pernyataan: 'Menyingkirkan duri di jalan merupakan cabang iman yang paling rendah.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Cabang iman tertinggi', respon: 'Kalimat tauhid Laa ilaaha illallah' },
          { premis: 'Cabang iman terendah', respon: 'Menyingkirkan gangguan dari jalanan' },
        ],
        pertanyaanIsian: 'Cabang-cabang keimanan dalam sabda Rasulullah saw. yang berjumlah lebih dari 70 cabang disebut ....................',
        kunciIsian: 'syu\'abul iman',
        pertanyaanUraian: 'Sebutkan 3 ranah utama dalam pembagian syu\'abul iman!',
        kunciUraian: '1. Ma\'rifatun bil qalbi (meyakini dengan hati)\n2. Iqrarun bil lisan (mengucapkan dengan lisan)\n3. \'Amalun bil arkan (mengamalkan dengan anggota badan).',
        pembahasan: 'Syu\'abul iman mencakup seluruh aspek kehidupan.',
        dalil: 'Hadis Syu\'abul Iman riwayat Muslim.',
      },
    ],
    uraian: [
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Pendekatan Hikmah dalam Dakwah Walisongo',
        stimulusModel: 'Model B: Analisis Sejarah Dakwah',
        indikatorTopik: 'menganalisis pendekatan dakwah Sunan Kudus dalam merajut kerukunan',
        cpRingkas: 'Murid menyimpulkan keteladanan toleransi Walisongo.',
        stimulus:
          'Sejarah mencatat keberhasilan Sunan Kudus dalam merangkul masyarakat Hindu melalui penghormatan terhadap kearifan lokal tanpa mengorbankan akidah tauhid.',
        pertanyaanPG: 'Metode dakwah Sunan Kudus menunjukkan ....',
        opsiPG: { A: 'Kebijaksanaan dan toleransi tinggi', B: 'Pemaksaan keyakinan', C: 'Pemisahan diri dari warga', D: 'Sikap acuh tak acuh', E: 'Penindasan budaya lokal' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua keteladanan metode dakwah para wali di tanah Jawa yang patut dicontoh!',
        opsiPGK: {
          A: 'Menghargai tradisi masyarakat lokal yang tidak bertentangan dengan ajaran tauhid',
          B: 'Menyampaikan dakwah dengan lemah lembut, kasih sayang, dan keteladanan nyata',
          C: 'Memaksakan kehendak dan membongkar tempat ibadah warga lain secara sewenang-wenang',
          D: 'Menolak berdialog dengan tokoh adat setempat karena menganggap mereka sesat',
          E: 'Menggunakan kekuatan senjata untuk menaklukkan wilayah-wilayah perkampungan',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Sunan Kudus melarang menyembelih sapi demi menghormati umat Hindu.', jawaban: 'Benar' },
          { pernyataan: 'Pendekatan dakwah kultural terbukti efektif dalam menyebarkan Islam damai.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Dakwah bil hikmah', respon: 'Berdakwah dengan bijaksana dan teladan' },
          { premis: 'Mau\'izhah hasanah', respon: 'Nasihat dan tutur kata yang menyejukkan' },
        ],
        pertanyaanIsian: 'Dakwah dengan bijaksana disebut dakwah bil ....................',
        kunciIsian: 'hikmah',
        pertanyaanUraian:
          'Analisislah bagaimana strategi dakwah kultural Sunan Kudus dan Sunan Kalijaga dapat menjadi inspirasi dalam menguatkan moderasi beragama di kalangan generasi muda saat ini!',
        kunciUraian:
          '1. Meneladani sikap santun dan tidak merendahkan tradisi lokal masyarakat selama tidak bertentangan dengan prinsip dasar syariat.\n2. Mengedepankan dialog kebaikan dan ukhuwah basyariyah daripada memicu perdebatan yang memecah belah.\n3. Menggunakan media seni, teknologi, dan pendekatan kreatif untuk menyebarkan pesan perdamaian Islam yang rahmatan lil \'alamin.',
        pembahasan:
          'Keteladanan para wali membuktikan bahwa dakwah yang sejuk dan toleran lebih berakar kuat di hati masyarakat.',
        dalil: 'Q.S. An-Nahl/16: 125',
      },
    ],
  },

  // =========================================================================
  // FASE F: KELAS 11–12 SMA/SMK (USIA 17–18 TAHUN)
  // Konteks: Pinjaman Daring vs Murabahah/Qardhul Hasan, Mystery Box vs Salam, Etika Profesi PKL, Maqashid Syariah (Hifzh al-'Aql, Hifzh al-Mal)
  // TEMPAT EKSKLUSIF SOAL PINJAMAN DARING & BELANJA DARING
  // =========================================================================
  'Fase F': {
    pg: [
      {
        elemen: 'Fikih',
        materiPokok: 'Fikih Muamalah Kontemporer: Bahaya Pinjaman Daring & Larangan Riba',
        stimulusModel: 'Model B: Kasus Pinjaman Daring Pelajar',
        indikatorTopik: 'mengevaluasi bahaya pinjaman daring (pinjol) berbunga majemuk ditinjau dari fikih muamalah',
        cpRingkas: 'Murid menganalisis prinsip fikih muamalah kontemporer dan larangan riba dalam transaksi digital.',
        stimulus:
          'Seorang murid SMA tergiur membeli tiket konser musik menggunakan layanan pinjaman daring tidak resmi di gawainya. Pinjaman awal sebesar Rp500.000,00 diwajibkan kembali Rp650.000,00 dalam waktu 14 hari, dan setiap keterlambatan satu hari dikenakan denda berlipat ganda hingga melampaui pokok utang.',
        pertanyaanPG: 'Ditinjau dari hukum fikih muamalah, praktik pinjaman daring tersebut dilarang karena mengandung unsur ....',
        opsiPG: {
          A: 'Mudharabah mutlaqah karena pemilik aplikasi tidak ikut mengelola penggunaan uang peminjam',
          B: 'Khiyar majelis karena kedua pihak telah menyetujui syarat kontrak secara elektronik',
          C: 'Riba qardh dan riba jahiliyah yang menetapkan tambahan pokok pinjaman serta denda berlipat ganda',
          D: 'Syirkah abdan karena kerja sama dilakukan melalui aplikasi digital tanpa tatap muka',
          E: 'Wakalah bil ujrah karena aplikasi memungut biaya administrasi server yang wajar',
        },
        kunciPG: 'C',
        pertanyaanPGK: 'Pilihlah dua sikap cerdas finansial yang sejalan dengan syariat Islam bagi pelajar ketika menghadapi kebutuhan mendesak!',
        opsiPGK: {
          A: 'Membeli barang sesuai kebutuhan pokok dan kemampuan uang saku tanpa berutang untuk gengsi',
          B: 'Memilih layanan keuangan syariah yang menggunakan akad jelas serta bebas dari bunga pinjaman',
          C: 'Menggunakan fitur dana talangan berbunga tinggi demi mengikuti tren gawai terbaru teman sebaya',
          D: 'Meminjam identitas kartu tanda penduduk milik kakak untuk mendaftar aplikasi pinjaman kilat',
          E: 'Menutup utang pinjaman daring pertama dengan cara meminjam lagi di aplikasi berbunga lainnya',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Tambahan yang disyaratkan di muka atas pokok pinjaman uang tunai termasuk kategori riba qardh.', jawaban: 'Benar' },
          { pernyataan: 'Jual beli barang secara cicilan dengan harga tetap yang disepakati di awal (akad murabahah) hukumnya boleh.', jawaban: 'Benar' },
          { pernyataan: 'Denda keterlambatan berbunga harian yang berlipat ganda diperbolehkan dalam hukum Islam.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Tambahan yang disyaratkan atas pokok utang piutang uang', respon: 'Riba Qardh' },
          { premis: 'Jual beli barang dengan menegaskan harga pokok dan margin keuntungan', respon: 'Akad Murabahah' },
          { premis: 'Pinjaman kebajikan murni tanpa meminta tambahan bunga sepeserpun', respon: 'Akad Qardhul Hasan' },
        ],
        pertanyaanIsian:
          'Penetapan keuntungan atau bunga yang disyaratkan di awal atas transaksi utang piutang uang tunai termasuk perbuatan terlarang yang disebut ....',
        kunciIsian: 'riba (riba qardh)',
        pertanyaanUraian:
          'Seorang murid SMA tergiur membeli tiket konser musik menggunakan layanan pinjaman daring tidak resmi di gawainya. Pinjaman awal sebesar Rp500.000,00 diwajibkan kembali Rp650.000,00 dalam waktu 14 hari, dan setiap keterlambatan satu hari dikenakan denda berlipat ganda hingga melampaui pokok utang. Koperasi murid di sekolahmu ingin membantu anggota membeli perlengkapan praktik seharga Rp300.000,00 secara mencicil 3 bulan tanpa sistem bunga pinjaman. Rancanglah skema alternatif menggunakan akad Murabahah atau Qardhul Hasan yang adil dan sah secara syariah!',
        kunciUraian:
          '1. Analisis Pelanggaran Pinjol: Mengandung riba qardh (tambahan Rp150.000 atas utang pokok Rp500.000) dan riba jahiliyah (denda bunga berlipat ganda harian).\n2. Skema Alternatif Akad Murabahah (Jual Beli Cicil):\n- Koperasi membeli perlengkapan praktik secara tunai seharga Rp300.000,00.\n- Koperasi menjualnya kepada murid dengan margin laba yang disepakati bersama (misalnya harga jual Rp330.000,00).\n- Murid mengangsur tetap sebesar Rp110.000,00 per bulan selama 3 bulan tanpa denda bunga keterlambatan.\n3. Skema Alternatif Akad Qardhul Hasan (Pinjaman Kebajikan):\n- Koperasi meminjamkan dana talangan Rp300.000,00 tanpa tambahan bunga sepeser pun.\n- Murid mengangsur pokok pinjaman sebesar Rp100.000,00 per bulan selama 3 bulan.',
        pembahasan:
          'Islam mengharamkan segala bentuk riba qardh dan riba jahiliyah karena memeras orang yang membutuhkan. Solusi syariah adalah jual beli murabahah atau pinjaman qardhul hasan.',
        dalil: 'Q.S. Al-Baqarah/2: 275 — Allah Menghalalkan Jual Beli dan Mengharamkan Riba',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Fikih Jual Beli Daring: Larangan Gharar & Praktik Mystery Box',
        stimulusModel: 'Model B: Kasus E-Commerce dan Mystery Box',
        indikatorTopik: 'mengevaluasi keabsahan transaksi jual beli daring sistem mystery box berdasarkan prinsip anti-gharar',
        cpRingkas: 'Murid mengevaluasi transaksi e-commerce kontemporer berdasarkan syarat sah jual beli Islam.',
        stimulus:
          'Sebuah artikel berita ekonomi memberitakan maraknya tren belanja daring di kalangan remaja, mulai dari pemesanan sepatu lokal sistem pre-order dengan spesifikasi lengkap, penjualan sistem dropship resmi, hingga pembelian kotak kejutan (mystery box) seharga Rp100.000,00 yang isinya sama sekali dirahasiakan oleh penjual.',
        pertanyaanPG: 'Ditinjau dari hukum jual beli Islam, penjualan sistem kotak kejutan (mystery box) tersebut dinyatakan tidak sah karena ....',
        opsiPG: {
          A: 'Dilakukan melalui media aplikasi gawai pintar tanpa tatap muka langsung',
          B: 'Mengandung unsur gharar (ketidakjelasan barang) dan spekulasi menyerupai judi (maysir)',
          C: 'Penjual menggunakan jasa kurir ekspedisi pihak ketiga untuk mengirimkan paket',
          D: 'Harga yang ditawarkan terlalu murah dibandingkan harga pasar tradisional',
          E: 'Pembayaran dilakukan menggunakan dompet digital (e-wallet) tanpa uang tunai',
        },
        kunciPG: 'B',
        pertanyaanPGK: 'Pilihlah dua rukun dan syarat jual beli yang wajib dipenuhi dalam transaksi e-commerce syariah!',
        opsiPGK: {
          A: 'Objek barang yang diperjualbelikan harus jelas spesifikasi, kuantitas, dan kualitasnya',
          B: 'Barang yang dijual merupakan milik sah penjual atau penjual memiliki izin resmi sebagai wakil',
          C: 'Pembeli tidak boleh mengetahui sama sekali isi paket barang sampai paket dibuka di rumah',
          D: 'Penjual berhak menyembunyikan cacat tersembunyi barang agar barang cepat laku terjual',
          E: 'Uang pembayaran harus ditransfer tanpa ada kejelasan kepastian pengiriman barang',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Jual beli sistem pesanan (akad salam) sah apabila kriteria, ukuran, dan waktu penyerahan barang disepakati jelas di awal.', jawaban: 'Benar' },
          { pernyataan: 'Transaksi mystery box yang mengundi keberuntungan barang mahal atau murah dihukumi maysir dan haram.', jawaban: 'Benar' },
          { pernyataan: 'Hak khiyar \'aib gugur secara otomatis apabila transaksi dilakukan di marketplace daring.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Jual beli barang dengan pembayaran di muka dan penyerahan barang di kemudian hari dengan spesifikasi jelas', respon: 'Akad Salam (Pre-Order Syariah)' },
          { premis: 'Penjualan kotak misteri yang isinya untung-untungan tanpa kejelasan barang', respon: 'Gharar dan Maysir' },
          { premis: 'Hak pembeli mengembalikan barang yang ternyata rusak atau cacat saat sampai di rumah', respon: 'Khiyar \'Aib' },
        ],
        pertanyaanIsian:
          'Hak pembeli dalam transaksi belanja daring untuk membatalkan akad atau meminta ganti rugi karena barang memiliki cacat tersembunyi disebut khiyar ....................................................',
        kunciIsian: '\'aib',
        pertanyaanUraian:
          'Sebuah artikel berita ekonomi memberitakan maraknya tren belanja daring sistem kotak kejutan (mystery box). Evaluasilah keabsahan transaksi mystery box tersebut berdasarkan rukun dan syarat jual beli serta prinsip larangan gharar dalam fikih muamalah Islam!',
        kunciUraian:
          '1. Ketidakabsahan Transaksi: Praktik mystery box hukumnya tidak sah (haram) karena melanggar syarat rukun objek jual beli (ma\'qud \'alaih), di mana barang yang dibeli tidak diketahui wujud, ukuran, dan kualitasnya (gharar fahisy).\n2. Unsur Maysir (Perjudian): Pembeli membayar sejumlah uang tertentu dengan spekulasi berharap mendapatkan barang mewah bernilai jutaan atau mendapatkan barang murah yang tidak berguna.\n3. Rekomendasi Syariah: Berbelanja secara halal harus dilakukan dengan spesifikasi barang yang transparan (akad salam atau murabahah) dan menjamin hak khiyar bagi pembeli.',
        pembahasan:
          'Rasulullah saw. melarang jual beli gharar karena menimbulkan sengketa, penipuan, dan memakan harta sesama secara batil.',
        dalil: 'Hadis Abu Hurairah r.a.: "Rasulullah saw. melarang jual beli dengan lemparan kerikil dan jual beli gharar." (HR. Muslim)',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Etika Profesi, Integritas Kerja, dan Tanggung Jawab Sosial',
        stimulusModel: 'Model B: Kasus Pelajar saat Praktik Kerja Lapangan (PKL)',
        indikatorTopik: 'menganalisis integritas etos kerja muslim saat menghadapi dilema kejujuran di tempat kerja',
        cpRingkas: 'Murid menerapkan etos kerja Islami dan integritas profesional di tempat magang/dunia industri.',
        stimulus:
          'Ketika menjalani Praktik Kerja Lapangan (PKL) di sebuah perusahaan retail, seorang murid SMK diminta oleh salah seorang staf senior untuk membuat kuitansi fiktif dengan menambah nominal belanja inventaris kantor agar sisa uangnya dapat dibagi bersama.',
        pertanyaanPG: 'Tindakan yang paling tepat dan berintegritas tinggi yang harus diambil oleh murid PKL tersebut adalah ....',
        opsiPG: {
          A: 'Menolak permintaan tersebut dengan sopan dan melaporkannya kepada pembimbing industri atau guru pamong',
          B: 'Menuruti perintah staf senior demi mendapatkan nilai evaluasi praktik magang yang tinggi',
          C: 'Menerima bagian uang haram tersebut lalu menyedekahkannya ke kotak amal masjid',
          D: 'Ikut memalsukan kuitansi kantor karena merasa masih berstatus sebagai anak magang',
          E: 'Mengabaikan perintah tersebut namun tidak berani melapor karena takut dimarahi',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua prinsip etika profesi yang harus dijunjung tinggi seorang pekerja muslim sesuai ajaran Islam!',
        opsiPGK: {
          A: 'Itqan (bekerja secara profesional, tekun, dan sungguh-sungguh menghasilkan kualitas terbaik)',
          B: 'Amanah (menjaga kepercayaan, rahasia jabatan, dan tidak menggelapkan aset perusahaan)',
          C: 'Opportunis (memanfaatkan celah hukum perusahaan demi memperkaya diri sendiri)',
          D: 'Ghulul (mengambil barang inventaris kantor untuk keperluan pribadi di rumah)',
          E: 'Tadlis (menutupi cacat barang produksi agar target penjualan bulanan tercapai)',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Memanipulasi laporan keuangan kantor termasuk perbuatan khianat dan memakan harta haram (suht).', jawaban: 'Benar' },
          { pernyataan: 'Pekerja muslim diwajibkan bekerja dengan prinsip itqan (profesional dan bertanggung jawab).', jawaban: 'Benar' },
          { pernyataan: 'Perintah atasan yang bertentangan dengan hukum agama dan negara wajib ditaati tanpa bantahan.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Bekerja dengan sungguh-sungguh, rapi, dan profesional', respon: 'Itqan' },
          { premis: 'Menjaga aset dan laporan keuangan perusahaan dengan jujur', respon: 'Amanah' },
          { premis: 'Tindakan memanipulasi nota belanja kantor untuk keuntungan pribadi', respon: 'Korupsi / Khianat' },
        ],
        pertanyaanIsian:
          'Sikap profesionalisme kerja dalam Islam di mana seseorang menyelesaikan tugas secara tuntas, rapi, dan berkualitas tinggi disebut ....................................................',
        kunciIsian: 'itqan',
        pertanyaanUraian:
          'Jelaskan mengapa seorang muslim wajib memelihara integritas dan menolak kecurangan di tempat kerja meskipun dijanjikan imbalan materi yang besar berdasarkan Q.S. At-Taubah/9: 105!',
        kunciUraian:
          '1. Makna Q.S. At-Taubah: 105: Bekerja adalah ibadah yang diawasi langsung oleh Allah Swt., Rasul-Nya, dan orang-orang mukmin, serta seluruh perbuatan akan dipertanggungjawabkan di akhirat.\n2. Dampak Kecurangan: Memakan harta haram (suht) menghilangkan keberkahan hidup, merusak kepercayaan publik, dan mendatangkan azab di dunia dan akhirat.\n3. Pembuktian Integritas: Menjaga kejujuran adalah pembuktian iman dan wujud menjaga nama baik almamater serta keluarga.',
        pembahasan:
          'Integritas kerja (al-amanah wal-itqan) adalah pilar kehormatan seorang muslim. Tidak ada ketaatan kepada makhluk dalam bermaksiat kepada Al-Khaliq.',
        dalil: 'Q.S. At-Taubah/9: 105 — Bekerjalah kamu, niscaya Allah dan Rasul-Nya serta orang-orang mukmin melihat pekerjaanmu',
      },
      {
        elemen: 'Akidah',
        materiPokok: 'Maqashid Syariah: Perlindungan Akal (Hifzh al-\'Aql)',
        stimulusModel: 'Model B: Analisis Dampak Penyalahgunaan Zat Berbahaya',
        indikatorTopik: 'menganalisis urgensi menjaga akal (hifzh al-\'aql) dalam konteks perlindungan generasi muda',
        cpRingkas: 'Murid menganalisis konsep Maqashid Syariah terutama perlindungan akal (hifzh al-\'aql).',
        stimulus:
          'Peredaran zat adiktif dan obat-obatan terlarang di kalangan remaja mengancam masa depan bangsa. Syariat Islam secara tegas menetapkan pengharaman segala zat yang memabukkan (khamr) demi menjaga kejernihan akal manusia.',
        pertanyaanPG: 'Tujuan pensyariatan hukum Islam (Maqashid Syariah) dalam mengharamkan narkoba dan miras adalah untuk ....',
        opsiPG: {
          A: 'Hifzh al-\'aql (memelihara keselamatan akal pikiran agar tetap berfungsi optimal)',
          B: 'Hifzh al-mal (memperbanyak perputaran uang di pasar gelap tanpa pajak)',
          C: 'Hifzh al-nasl (membatasi jumlah kelahiran anak dalam keluarga modern)',
          D: 'Hifzh al-bi\'ah (menghabiskan stok tanaman tertentu agar tidak berbuah)',
          E: 'Hifzh al-amn (meningkatkan anggaran persenjataan militer perbatasan)',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua tindakan nyata pelajar SMA dalam mewujudkan prinsip hifzh al-\'aql di lingkungan sekolah!',
        opsiPGK: {
          A: 'Menolak secara tegas ajakan mencoba rokok, minuman beralkohol, dan narkoba',
          B: 'Mengisi waktu muda dengan kegiatan riset ilmiah, literasi membaca, dan olahraga positif',
          C: 'Membeli obat penenang tanpa resep dokter untuk mengatasi stres menjelang ujian',
          D: 'Menyimpan minuman keras di loker kelas untuk merayakan kelulusan sekolah',
          E: 'Mengabaikan teman yang mulai terjerat pergaulan bebas narkoba di luar sekolah',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Menjaga akal pikiran dari kerusakan zat berbahaya adalah kewajiban agama.', jawaban: 'Benar' },
          { pernyataan: 'Khamr dalam Islam hanya terbatas pada minuman hasil fermentasi anggur tradisional saja.', jawaban: 'Salah' },
          { pernyataan: 'Segala sesuatu yang memabukkan dan merusak fungsi akal dihukumi haram.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Hifzh al-Din', respon: 'Memelihara kesucian agama dan akidah' },
          { premis: 'Hifzh al-Nafs', respon: 'Memelihara keselamatan jiwa manusia' },
          { premis: 'Hifzh al-\'Aql', respon: 'Memelihara fungsi akal pikiran dari narkoba' },
        ],
        pertanyaanIsian:
          'Salah satu dari lima tujuan pokok syariat Islam (Maqashid Syariah) yang bertujuan memelihara akal pikiran disebut hifzh al-....................',
        kunciIsian: '\'aql',
        pertanyaanUraian:
          'Jelaskan mengapa akal pikiran manusia menempati kedudukan yang sangat terhormat dalam syariat Islam dan bagaimana cara menjaganya (hifzh al-\'aql)!',
        kunciUraian:
          '1. Kedudukan Akal: Akal adalah anugerah terbesar yang membedakan manusia dari hewan, menjadi syarat sah pembebanan syariat (taklif), dan sarana memahami ayat kauniyah serta syar\'iyyah Allah Swt.\n2. Cara Menjaganya: (a) Menghindari narkoba, miras, pornografi, dan konten perusak mental; (b) Mengasah potensi akal dengan menuntut ilmu, tadabbur, dan berpikir kritis demi kemaslahatan umat.',
        pembahasan: 'Akal adalah prasyarat taklif. Rusaknya akal menggugurkan kesadaran moral dan merusak tatanan sosial.',
        dalil: 'Q.S. Al-Ma\'idah/5: 90 — Larangan Meminum Khamr, Berjudi, dan Mengundi Nasib',
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        materiPokok: 'Ijtihad Kontemporer dalam Masalah Bioetika dan Sains Modern',
        stimulusModel: 'Model B: Analisis Fatwa Sains Kedokteran',
        indikatorTopik: 'menganalisis peran ijtihad jama\'i para ulama dalam merespons kemajuan teknologi kedokteran modern',
        cpRingkas: 'Murid menganalisis sumber hukum Islam dan ijtihad dalam merespons isu-isu kontemporer.',
        stimulus:
          'Perkembangan teknologi kedokteran modern seperti transplantasi organ dan rekayasa genetika memerlukan kejelasan hukum Islam. Majelis ulama melakukan ijtihad jama\'i (kolektif) bersama para dokter ahli untuk melahirkan fatwa hukum yang maslahat.',
        pertanyaanPG: 'Metode ijtihad yang dilakukan secara bersama-sama oleh para pakar fikih dan ilmuwan lintas disiplin ilmu tersebut dinamakan ....',
        opsiPG: {
          A: 'Ijtihad jama\'i (musyawarah ijtihad kolektif para ulama dan ahli)',
          B: 'Taklid buta (mengikuti pendapat orang lain tanpa mengetahui dalilnya)',
          C: 'Ihtikar (menimbun barang dagangan untuk mencari keuntungan sepihak)',
          D: 'Ta\'ashub (fanatisme golongan yang menolak pendapat kelompok lain)',
          E: 'Talbiq (mencampuradukkan rukun ibadah dengan niat yang keliru)',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua syarat utama seseorang atau lembaga yang berhak melakukan ijtihad dalam hukum Islam!',
        opsiPGK: {
          A: 'Menguasai bahasa Arab, ilmu tafsir Al-Qur\'an, dan ilmu hadis secara mendalam',
          B: 'Memahami kaidah ushul fikih, maqashid syariah, dan realitas konteks zaman',
          C: 'Memiliki pengikut atau pengagum terbanyak di media sosial dan internet',
          D: 'Berani mengeluarkan fatwa kontroversial demi menarik perhatian masyarakat luas',
          E: 'Menolak bermusyawarah dengan pakar ilmu pengetahuan dari bidang lainnya',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Pintu ijtihad senantiasa terbuka untuk merespons persoalan baru yang belum ada nash qath\'i.', jawaban: 'Benar' },
          { pernyataan: 'Ijtihad boleh dilakukan pada perkara ibadah mahdhah yang rukunnya sudah pasti.', jawaban: 'Salah' },
          { pernyataan: 'Ijtihad kolektif meminimalkan kekeliruan dalam menetapkan hukum masalah kontemporer.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Ijtihad Jama\'i', respon: 'Ijtihad kolektif oleh majelis ulama' },
          { premis: 'Ijtihad Fardi', respon: 'Ijtihad yang dilakukan mujtahid perseorangan' },
          { premis: 'Ijmak', respon: 'Kesepakatan seluruh mujtahid setelah Nabi wafat' },
        ],
        pertanyaanIsian:
          'Proses pengerahan segenap kemampuan berpikir untuk menetapkan hukum syariat atas perkara baru disebut ....................',
        kunciIsian: 'ijtihad',
        pertanyaanUraian:
          'Jelaskan mengapa ijtihad jama\'i (kolektif) menjadi metode yang sangat penting dalam memecahkan persoalan bioetika dan teknologi medis modern saat ini!',
        kunciUraian:
          '1. Kompleksitas Masalah: Masalah kedokteran modern memerlukan integrasi antara ilmu fikih dan sains medis agar hukum yang dihasilkan tepat sasaran.\n2. Menjaga Kemaslahatan: Menghindari fatwa yang keliru dan memastikan keputusan yang diambil memenuhi prinsip Maqashid Syariah (menjaga jiwa dan keturunan).',
        pembahasan: 'Ijtihad menjaga dinamika dan relevansi hukum Islam di setiap zaman.',
        dalil: 'Hadis Mu\'adz bin Jabal r.a. tentang berijtihad dengan ra\'yu jika tidak ditemukan di Al-Qur\'an dan Sunnah.',
      },
      {
        elemen: 'Akhlak',
        materiPokok: 'Etika Kepemimpinan dan Pencegahan Korupsi (Anti-Risywah)',
        stimulusModel: 'Model B: Kasus Kepemimpinan Organisasi Murid',
        indikatorTopik: 'mengevaluasi bahaya praktik risywah (suap) dalam pemilihan pimpinan dan kehidupan bermasyarakat',
        cpRingkas: 'Murid menerapkan nilai integritas kepemimpinan Islam dan menolak praktik risywah.',
        stimulus:
          'Dalam pemilihan ketua organisasi pemuda di lingkungan tempat tinggal, salah seorang tim sukses membagikan amplop berisi uang kepada calon pemilih agar memberikan suaranya. Sebagian pemuda menolak tegas pemberian tersebut karena termasuk perbuatan suap (risywah).',
        pertanyaanPG: 'Ditinjau dari hukum Islam, tindakan membagikan uang untuk mempengaruhi suara dalam pemilihan kepemimpinan tersebut dihukumi ....',
        opsiPG: {
          A: 'Risywah (suap) yang diharamkan secara tegas dalam syariat Islam dan dilaknat pelakunya',
          B: 'Sedekah sunnah yang mendatangkan pahala berlipat ganda bagi pemberinya',
          C: 'Hibah murni yang halal diterima oleh siapa saja tanpa ikatan apa pun',
          D: 'Hadiah silaturahmi yang dianjurkan untuk mempererat kerukunan pemuda',
          E: 'Zakat mal yang wajib dibagikan sebelum pemilihan organisasi dimulai',
        },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua dampak buruk praktik risywah (suap) dalam kehidupan berbangsa dan bernegara!',
        opsiPGK: {
          A: 'Melahirkan pemimpin yang tidak kompeten dan merusak keadilan tatanan hukum',
          B: 'Menumbuhkan budaya korupsi yang merugikan keuangan negara dan hak rakyat miskin',
          C: 'Meningkatkan kejujuran dan transparansi dalam pengelolaan anggaran daerah',
          D: 'Mendorong terciptanya meritokrasi dan keadilan bagi seluruh warga masyarakat',
          E: 'Mempercepat pengentasan kemiskinan dan pemerataan fasilitas kesehatan daerah',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Pemberi suap dan penerima suap sama-sama mendapatkan laknat dari Allah Swt.', jawaban: 'Benar' },
          { pernyataan: 'Menerima uang suap diperbolehkan asalkan uangnya disedekahkan ke anak yatim.', jawaban: 'Salah' },
          { pernyataan: 'Integritas kepemimpinan dalam Islam dibangun atas dasar amanah dan keadilan.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Risywah', respon: 'Praktik suap yang diharamkan' },
          { premis: 'Ar-Rasyi', respon: 'Pemberi uang suap' },
          { premis: 'Al-Murtasyi', respon: 'Penerima uang suap' },
        ],
        pertanyaanIsian:
          'Pemberian sesuatu kepada pihak lain dengan tujuan memenangkan perkara yang batil atau menyuap jabatan disebut praktik ....................',
        kunciIsian: 'risywah (suap)',
        pertanyaanUraian:
          'Jelaskan bahaya praktik politik uang (risywah) dalam pemilihan pemimpin dan bagaimana sikap yang harus diambil seorang pemuda muslim berintegritas!',
        kunciUraian:
          '1. Bahaya Risywah: Menghancurkan moralitas publik, mengkhianati amanah rakyat, dan menghasilkan pejabat yang korup karena ingin mengembalikan modal politiknya.\n2. Sikap Pemuda Muslim: Menolak tegas segala bentuk amplop suap, memilih pemimpin berdasarkan rekam jejak kompetensi dan akhlaknya, serta mengedukasi masyarakat tentang bahaya suap.',
        pembahasan: 'Rasulullah saw. melaknat penyuap dan penerima suap dalam hukum dan kepemimpinan.',
        dalil: 'Hadis Abdullah bin Amr r.a.: "Rasulullah saw. melaknat penyuap dan penerima suap." (HR. Abu Dawud dan Tirmidzi)',
      },
    ],
    isian: [
      {
        elemen: 'Fikih',
        materiPokok: 'Maqashid Syariah: Hifzh al-\'Aql',
        stimulusModel: 'Model B: Perlindungan Generasi',
        indikatorTopik: 'menyebutkan istilah pemeliharaan akal dalam maqashid syariah',
        cpRingkas: 'Murid memahami lima pilar maqashid syariah.',
        stimulus: 'Syariat Islam mengharamkan narkoba, minuman keras, dan judi demi menjaga fungsi akal pikiran dan harta manusia.',
        pertanyaanPG: 'Perlindungan akal disebut ....',
        opsiPG: { A: 'Hifzh al-\'aql', B: 'Hifzh al-din', C: 'Hifzh al-nafs', D: 'Hifzh al-mal', E: 'Hifzh al-nasl' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua dampak negatif konsumsi narkoba terhadap lima pilar Maqashid Syariah!',
        opsiPGK: {
          A: 'Merusak akal pikiran (hifzh al-\'aql) dan mengancam keselamatan jiwa (hifzh al-nafs)',
          B: 'Menghabiskan harta secara batil (hifzh al-mal) dan merusak kehormatan keturunan (hifzh al-nasl)',
          C: 'Meningkatkan produktivitas kerja dan prestasi belajar di sekolah menengah kejuruan',
          D: 'Mempererat tali ukhuwah islamiyah dan keharmonisan rumah tangga para penggunanya',
          E: 'Menjadikan tubuh lebih kebal dari serangan penyakit fisik maupun gangguan kejiwaan',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Hifzh al-\'aql merupakan salah satu dari lima pilar utama Maqashid Syariah.', jawaban: 'Benar' },
          { pernyataan: 'Narkoba dan miras diperbolehkan jika digunakan untuk bersenang-senang saat liburan.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Hifzh al-Mal', respon: 'Perlindungan kepemilikan harta halal' },
          { premis: 'Hifzh al-\'Aql', respon: 'Perlindungan fungsi akal pikiran manusia' },
        ],
        pertanyaanIsian: 'Tujuan utama syariat Islam dalam melindungi akal pikiran manusia dari bahaya narkoba dan miras disebut prinsip ....................',
        kunciIsian: 'hifzh al-\'aql',
        pertanyaanUraian: 'Sebutkan 5 pilar utama Maqashid Syariah (Kulliyyat al-Khamsah)!',
        kunciUraian: '1. Hifzh al-Din (menjaga agama), 2. Hifzh al-Nafs (menjaga jiwa), 3. Hifzh al-\'Aql (menjaga akal), 4. Hifzh al-Nasl (menjaga keturunan), 5. Hifzh al-Mal (menjaga harta).',
        pembahasan: 'Maqashid syariah memayungi kemaslahatan manusia.',
        dalil: 'Konsep Maqashid Syariah Imam Asy-Syathibi.',
      },
      {
        elemen: 'Fikih',
        materiPokok: 'Akad Qardhul Hasan',
        stimulusModel: 'Model B: Keuangan Sosial Syariah',
        indikatorTopik: 'menyebutkan akad pinjaman kebajikan tanpa bunga',
        cpRingkas: 'Murid memahami alternatif pembiayaan syariah.',
        stimulus: 'Membantu modal usaha murid tanpa menarik bunga tambahan sepeser pun.',
        pertanyaanPG: 'Pinjaman tanpa bunga disebut akad ....',
        opsiPG: { A: 'Qardhul Hasan', B: 'Murabahah', C: 'Ijarah', D: 'Riba', E: 'Mudarabah' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua keutamaan akad Qardhul Hasan dalam ekonomi Islam!',
        opsiPGK: {
          A: 'Membantu masyarakat yang kesulitan dana darurat tanpa menjerat mereka dengan bunga ribawi',
          B: 'Menumbuhkan rasa persaudaraan dan solidaritas sosial berbasis tolong-menolong ikhlas',
          C: 'Mencari keuntungan materiil sebesar-besarnya bagi pemilik modal dalam waktu singkat',
          D: 'Membebankan denda keterlambatan berlipat ganda setiap hari kepada peminjam dana',
          E: 'Menyita seluruh harta benda peminjam secara paksa tanpa melalui prosedur yang adil',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Qardhul Hasan adalah pinjaman kebajikan murni tanpa mensyaratkan bunga.', jawaban: 'Benar' },
          { pernyataan: 'Pemberi pinjaman Qardhul Hasan boleh meminta tambahan uang sewa 10% di muka.', jawaban: 'Salah' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Qardhul Hasan', respon: 'Pinjaman dana tanpa bunga' },
          { premis: 'Riba Qardh', respon: 'Bunga yang disyaratkan atas utang' },
        ],
        pertanyaanIsian: 'Akad pinjaman dana kebajikan tanpa mensyaratkan bunga tambahan demi membantu sesama disebut akad ....................',
        kunciIsian: 'Qardhul Hasan',
        pertanyaanUraian: 'Bandingkan perbedaan antara pinjaman online konvensional dengan akad Qardhul Hasan!',
        kunciUraian: 'Pinjaman online membebankan bunga majemuk dan denda harian (riba), sedangkan Qardhul Hasan murni tolong-menolong tanpa bunga dan tanpa mengambil laba tambahan.',
        pembahasan: 'Qardhul Hasan menolong sesama tanpa riba.',
        dalil: 'Q.S. Al-Hadid: 11.',
      },
    ],
    uraian: [
      {
        elemen: 'Fikih',
        materiPokok: 'Maqashid Syariah dalam Perlindungan Harta dan Jiwa',
        stimulusModel: 'Model B: Analisis Regulasi dan Kemaslahatan',
        indikatorTopik: 'menganalisis penerapan lima pilar Maqashid Syariah dalam etika profesi',
        cpRingkas: 'Murid menganalisis konsep kemaslahatan maqashid syariah.',
        stimulus:
          'Setiap aturan hukum dalam syariat Islam diturunkan untuk mewujudkan kemaslahatan dan menolak kemudaratan bagi umat manusia (jalbul mashalih wa dar\'ul mafasid).',
        pertanyaanPG: 'Tujuan utama syariat Islam disebut ....',
        opsiPG: { A: 'Maqashid Syariah', B: 'Ushul Fikih', C: 'Kaidah Fiqhiyah', D: 'Tarikh Tasyri\'', E: 'Fiqh Siyasah' },
        kunciPG: 'A',
        pertanyaanPGK: 'Pilihlah dua tujuan luhur dari perumusan Maqashid Syariah!',
        opsiPGK: {
          A: 'Mewujudkan kemaslahatan hidup manusia di dunia dan kebahagiaan di akhirat',
          B: 'Menolak segala bentuk kemudaratan, kezaliman, dan kerusakan moral di masyarakat',
          C: 'Membatasi kebebasan berpikir manusia dalam melakukan inovasi teknologi baru',
          D: 'Mempermudah kelompok penguasa untuk memonopoli sumber daya alam suatu bangsa',
          E: 'Mengabaikan hak-hak kaum lemah demi kemajuan ekonomi korporasi raksasa',
        },
        kunciPGK: 'A dan B',
        pernyataanBS: [
          { pernyataan: 'Maqashid Syariah bertujuan mendatangkan maslahat dan menolak mafsadat.', jawaban: 'Benar' },
          { pernyataan: 'Hifzh al-mal melarang penipuan dan transaksi ribawi dalam muamalah.', jawaban: 'Benar' },
        ],
        pasanganMenjodohkan: [
          { premis: 'Jalbul mashalih', respon: 'Meraih dan mewujudkan kemaslahatan' },
          { premis: 'Dar\'ul mafasid', respon: 'Menolak dan mencegah kerusakan' },
        ],
        pertanyaanIsian: 'Tujuan-tujuan mulia syariat Islam disebut ....................',
        kunciIsian: 'Maqashid Syariah',
        pertanyaanUraian:
          'Jelaskan penerapan 5 prinsip Maqashid Syariah (Hifzh al-Din, Hifzh al-Nafs, Hifzh al-\'Aql, Hifzh al-Nasl, dan Hifzh al-Mal) dalam membentuk etika profesi pekerja atau siswa PKL di dunia industri!',
        kunciUraian:
          '1. Hifzh al-Din (Menjaga Agama): Beribadah tepat waktu di tempat kerja dan menjaga niat bekerja sebagai ibadah.\n2. Hifzh al-Nafs (Menjaga Jiwa): Menjunjung tinggi protokol keselamatan dan kesehatan kerja (K3) serta tidak membahayakan rekan kerja.\n3. Hifzh al-\'Aql (Menjaga Akal): Menghindari narkoba, miras, dan menjaga kejernihan pikiran dalam bekerja secara inovatif.\n4. Hifzh al-Nasl (Menjaga Keturunan/Kehormatan): Menjaga etika pergaulan profesional dan adab santun antarkaryawan.\n5. Hifzh al-Mal (Menjaga Harta): Menjaga aset perusahaan, menolak korupsi/gratifikasi, dan mengelola keuangan dengan jujur.',
        pembahasan:
          'Maqashid syariah menjadi kompas moral holistik bagi pekerja profesional muslim di era modern.',
        dalil: 'Prinsip Umum Maqashid Asy-Syathibi (Al-Muwafaqat)',
      },
    ],
  },
};

// Backward-compatible flat array by phase
export const FASE_NARRATIVE_BANK: Record<FaseCode, NarrativeSeed[]> = {
  'Fase A': QUESTION_BANK_BY_PHASE['Fase A'].pg,
  'Fase B': QUESTION_BANK_BY_PHASE['Fase B'].pg,
  'Fase C': QUESTION_BANK_BY_PHASE['Fase C'].pg,
  'Fase D': QUESTION_BANK_BY_PHASE['Fase D'].pg,
  'Fase E': QUESTION_BANK_BY_PHASE['Fase E'].pg,
  'Fase F': QUESTION_BANK_BY_PHASE['Fase F'].pg,
};

/**
 * Selects a distinct, age-appropriate question seed for a given Fase and question type (bentuk),
 * GUARANTEEING 100% strict phase isolation (NEVER pulls from other phases or global arrays).
 */
export function selectQuestionSeed(
  fase: FaseCode,
  bentuk: BentukSoalType,
  preferredElemen: ElemenPAI,
  questionIndex: number,
  usedStimuli: Set<string>
): NarrativeSeed {
  const phasePool = QUESTION_BANK_BY_PHASE[fase];

  // Pick target sub-pool based on bentuk soal
  let pool: NarrativeSeed[];
  if (bentuk === 'Isian Singkat') {
    pool = phasePool.isian.length > 0 ? phasePool.isian : phasePool.pg;
  } else if (bentuk === 'Uraian') {
    pool = phasePool.uraian.length > 0 ? phasePool.uraian : phasePool.pg;
  } else {
    // Pilihan Ganda, PG Kompleks, Benar/Salah, Menjodohkan
    pool = phasePool.pg;
  }

  // 1. Try matching preferredElemen and not yet used in this session
  const matchingElemenUnused = pool.filter(
    (s) => s.elemen === preferredElemen && !usedStimuli.has(s.stimulus)
  );
  if (matchingElemenUnused.length > 0) {
    const chosen = matchingElemenUnused[questionIndex % matchingElemenUnused.length];
    usedStimuli.add(chosen.stimulus);
    return chosen;
  }

  // 2. Try any unused in this specific pool
  const anyUnusedInPool = pool.filter((s) => !usedStimuli.has(s.stimulus));
  if (anyUnusedInPool.length > 0) {
    const chosen = anyUnusedInPool[questionIndex % anyUnusedInPool.length];
    usedStimuli.add(chosen.stimulus);
    return chosen;
  }

  // 3. Try any unused across all pools OF THIS FASE ONLY
  const allSeedsInThisFase = [...phasePool.pg, ...phasePool.isian, ...phasePool.uraian];
  const anyUnusedInFase = allSeedsInThisFase.filter((s) => !usedStimuli.has(s.stimulus));
  if (anyUnusedInFase.length > 0) {
    const chosen = anyUnusedInFase[questionIndex % anyUnusedInFase.length];
    usedStimuli.add(chosen.stimulus);
    return chosen;
  }

  // 4. STRICT PHASE ISOLATION:
  // When question count exceeds total seeds in this phase (e.g., 30+ questions),
  // cycle ONLY within this phase's items. NEVER cross-contaminate across phases!
  const fallbackList = pool.length > 0 ? pool : phasePool.pg;
  const base = fallbackList[questionIndex % fallbackList.length];
  return { ...base };
}

/**
 * Backward compatibility wrapper for selectDistinctNarrativeSeed.
 * Strictly adheres to 100% phase isolation.
 */
export function selectDistinctNarrativeSeed(
  fase: FaseCode,
  preferredElemen: ElemenPAI,
  questionIndex: number,
  usedStimuli: Set<string>
): NarrativeSeed {
  return selectQuestionSeed(fase, 'Pilihan Ganda', preferredElemen, questionIndex, usedStimuli);
}
