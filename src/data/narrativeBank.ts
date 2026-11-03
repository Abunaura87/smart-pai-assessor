import { ElemenPAI, FaseCode } from '../types/assessment';

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

export const FASE_NARRATIVE_BANK: Record<FaseCode, NarrativeSeed[]> = {
  'Fase A': [
    {
      elemen: 'Akhlak',
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
      indikatorTopik: 'melafalkan kalimat basmalah sebelum memulai rutinitas pagi',
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
        { pernyataan: 'Sebelum makan pagi kita wajib membaca basmalah.', jawaban: 'Benar' },
        { pernyataan: 'Makan dan minum sebaiknya menggunakan tangan kiri.', jawaban: 'Salah' },
        { pernyataan: 'Selesai makan kita mengucap hamdalah sebagai rasa syukur.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Kalimat sebelum mulai makan pagi', respon: 'Bismillahirrahmanirrahim' },
        { premis: 'Kalimat sesudah selesai makan pagi', respon: 'Alhamdulillahi rabbil alamin' },
        { premis: 'Tangan yang digunakan untuk menyuap nasi', respon: 'Tangan kanan dengan sopan' },
      ],
      pertanyaanIsian:
        'Setelah selesai makan pagi dan merasa kenyang, Siti mengucapkan kalimat ....................................................',
      kunciIsian: 'Alhamdulillahi rabbil alamin (Alhamdulillah)',
      pertanyaanUraian:
        'Sebutkan 2 kegiatan baik di pagi hari sebelum berangkat sekolah yang diawali dengan membaca basmalah!',
      kunciUraian: '1. Memakai seragam sekolah dan sepatu.\n2. Makan sarapan pagi bersama keluarga.',
      pembahasan:
        'Membaca Bismillahirrahmanirrahim sebelum makan dan memulai kegiatan pagi membuat aktivitas kita diberkahi Allah Swt.',
      dalil: 'Hadis Adab Makan: "Bacalah Bismillah dan makanlah dengan tangan kananmu." (HR. Bukhari-Muslim)',
    },
    {
      elemen: 'Akhlak',
      indikatorTopik: 'menunjukkan sikap suka menolong teman sebangku di kelas',
      cpRingkas: 'Murid menunjukkan perilaku sayang dan tolong-menolong kepada teman sebangku di sekolah.',
      stimulus:
        'Saat menggambar di kelas, pensil Dika patah. Dika tampak sedih karena tidak membawa rautan pensil.',
      pertanyaanPG: 'Sebagai teman sebangku Dika, tindakan paling baik yang kamu lakukan adalah ....',
      opsiPG: {
        A: 'Meminjamkan pensil cadangan dengan wajah ramah',
        B: 'Menyembunyikan kotak pensil di dalam tas sekolah',
        C: 'Menertawakan gambar Dika yang belum selesai',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua sikap rukun bersama teman sebangku saat belajar di kelas!',
      opsiPGK: {
        A: 'Meminjamkan penghapus kepada teman yang membutuhkan',
        B: 'Mencoret buku gambar milik teman tanpa meminta izin',
        C: 'Berbagi cerita dengan sopan saat jam istirahat tiba',
        D: 'Merebut mainan teman hingga teman menangis sedih',
      },
      kunciPGK: 'A dan C',
      pernyataanBS: [
        { pernyataan: 'Meminjamkan pensil kepada teman sebangku membuat hati gembira.', jawaban: 'Benar' },
        { pernyataan: 'Kita boleh mengejek teman yang lupa membawa alat tulis.', jawaban: 'Salah' },
        { pernyataan: 'Anak saleh senang bermain dengan semua teman secara rukun.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Teman sebangku lupa membawa pensil', respon: 'Meminjamkan alat tulis dengan ikhlas' },
        { premis: 'Berbicara kepada bapak dan ibu guru', respon: 'Menggunakan suara sopan dan lembut' },
        { premis: 'Selesai bermain balok kayu di kelas', respon: 'Merapikan kembali mainan ke kotak' },
      ],
      pertanyaanIsian:
        'Jika dipinjami pensil warna oleh teman sebangku, kita harus mengucapkan kata ....................................................',
      kunciIsian: 'terima kasih',
      pertanyaanUraian:
        'Mengapa kita harus bersikap ramah dan suka berbagi alat tulis kepada teman sebangku? Tuliskan 2 alasan sederhana!',
      kunciUraian:
        '1. Agar teman tidak sedih dan bisa belajar bersama lagi.\n2. Karena Allah Swt. menyayangi anak yang suka menolong teman.',
      pembahasan:
        'Menolong teman sebangku yang kesulitan alat tulis mempererat persahabatan dan mencerminkan akhlak terpuji seorang murid.',
      dalil: 'Q.S. Al-Ma\'idah/5: 2 — Perintah saling menolong dalam kebaikan',
    },
    {
      elemen: 'Fikih',
      indikatorTopik: 'mengidentifikasi tata cara menjaga kebersihan diri dan wudu sebelum salat',
      cpRingkas: 'Murid mengenal rukun Islam dan membiasakan hidup bersih serta tertib berwudu.',
      stimulus:
        'Sore hari kaki Budi kotor setelah bermain bola. Tak lama kemudian terdengar suara azan Asar dari masjid.',
      pertanyaanPG: 'Hal pertama yang harus dilakukan Budi sebelum ikut ayah salat ke masjid adalah ....',
      opsiPG: {
        A: 'Mencuci kaki, berganti pakaian bersih, lalu berwudu',
        B: 'Langsung masuk masjid dengan pakaian yang masih berlumpur',
        C: 'Melanjutkan bermain bola sampai waktu salat habis',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua kegiatan menjaga kebersihan badan yang disukai Allah Swt.!',
      opsiPGK: {
        A: 'Menggosok gigi setiap selesai makan dan sebelum tidur',
        B: 'Membiarkan kuku tangan panjang dan penuh tanah hitam',
        C: 'Membasuh anggota wudu dengan air bersih secara berurutan',
        D: 'Membuang bungkus permen di kolong meja belajar kelas',
      },
      kunciPGK: 'A dan C',
      pernyataanBS: [
        { pernyataan: 'Sebelum melaksanakan salat kita wajib berwudu dengan air bersih.', jawaban: 'Benar' },
        { pernyataan: 'Kita boleh salat memakai baju yang terkena kotoran ayam.', jawaban: 'Salah' },
        { pernyataan: 'Kebersihan badan dan pakaian adalah sebagian dari iman.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Kegiatan bersuci sebelum mengerjakan salat', respon: 'Berwudu dengan air bersih' },
        { premis: 'Jumlah salat wajib sehari semalam', respon: 'Lima waktu dengan tertib' },
        { premis: 'Tempat membuang bungkus jajanan', respon: 'Tempat sampah yang tersedia' },
      ],
      pertanyaanIsian:
        'Sebelum mendirikan salat lima waktu, umat Islam wajib bersuci terlebih dahulu dengan cara ....................................................',
      kunciIsian: 'berwudu (wudu)',
      pertanyaanUraian:
        'Tuliskan 2 hal yang kamu siapkan di rumah ketika mendengar suara azan berkumandang!',
      kunciUraian:
        '1. Segera berhenti bermain dan mengambil air wudu dengan tertib.\n2. Memakai sarung atau mukena yang bersih dan rapi.',
      pembahasan:
        'Menjaga kebersihan badan, pakaian, dan berwudu dengan tertib merupakan syarat sah sebelum menghadap Allah Swt. dalam salat.',
      dalil: 'Hadis Kebersihan: "Kebersihan itu adalah sebagian dari iman." (HR. Muslim)',
    },
    {
      elemen: 'Al-Qur\'an dan Hadis',
      indikatorTopik: 'mengenal adab membaca Al-Qur\'an dan huruf hijaiyah bersama orang tua',
      cpRingkas: 'Murid mengenal huruf hijaiyah dan membiasakan adab membaca Al-Qur\'an di rumah.',
      stimulus:
        'Selesai salat Magrib, Rina duduk di samping Ibu. Rina membuka buku Iqra untuk belajar membaca huruf hijaiyah.',
      pertanyaanPG: 'Sikap Rina yang sopan saat Ibu mengajari membaca huruf hijaiyah adalah ....',
      opsiPG: {
        A: 'Mendengarkan contoh bacaan Ibu dengan tenang dan teliti',
        B: 'Berlari-lari mengelilingi ruang tamu sambil membawa mainan',
        C: 'Menutup buku mengaji karena ingin menonton televisi',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua adab yang baik ketika sedang belajar mengaji di rumah!',
      opsiPGK: {
        A: 'Memegang buku mengaji dalam keadaan tangan sudah berwudu',
        B: 'Meletakkan Al-Qur\'an di lantai dekat tempat sandal',
        C: 'Mengawali bacaan dengan ta\'awudz dan basmalah dengan khusyuk',
        D: 'Bercanda dan mendorong teman yang sedang membaca ayat',
      },
      kunciPGK: 'A dan C',
      pernyataanBS: [
        { pernyataan: 'Huruf pertama dalam urutan huruf hijaiyah adalah huruf Alif.', jawaban: 'Benar' },
        { pernyataan: 'Saat mengaji kita boleh berteriak-teriak mengganggu adik tidur.', jawaban: 'Salah' },
        { pernyataan: 'Surah pertama di dalam kitab suci Al-Qur\'an adalah Surah Al-Fatihah.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Tanda baca garis atas (fathah) pada huruf Ba', respon: 'Dibaca dengan bunyi "Ba"' },
        { premis: 'Tanda baca garis bawah (kasrah) pada huruf Ba', respon: 'Dibaca dengan bunyi "Bi"' },
        { premis: 'Tempat menyimpan Al-Qur\'an selesai mengaji', respon: 'Rak buku yang tinggi dan bersih' },
      ],
      pertanyaanIsian:
        'Surah pembuka dalam Al-Qur\'an yang selalu kita baca pada setiap rakaat salat adalah Surah ....................................................',
      kunciIsian: 'Al-Fatihah',
      pertanyaanUraian:
        'Tuliskan 2 perbuatan sopan yang kamu lakukan sebelum dan sesudah belajar mengaji bersama ayah atau ibu!',
      kunciUraian:
        '1. Berwudu dan membaca basmalah sebelum mulai mengaji.\n2. Menyimpan kembali buku mengaji di rak yang rapi serta mencium tangan orang tua.',
      pembahasan:
        'Memuliakan Al-Qur\'an sejak dini dilakukan dengan berwudu, duduk sopan mendengarkan guru/orang tua, dan menyimpan mushaf di tempat bersih.',
      dalil: 'Hadis Keutamaan Belajar Al-Qur\'an (HR. Bukhari)',
    },
    {
      elemen: 'Sejarah Peradaban Islam (SPI)',
      indikatorTopik: 'meneladani sifat jujur dan kasih sayang Nabi Muhammad saw. masa kanak-kanak',
      cpRingkas: 'Murid mengenal kisah masa kecil Nabi Muhammad saw. yang jujur dan penyayang.',
      stimulus:
        'Saat bermain kelereng di halaman, bola kaca milik Tono tidak sengaja mengenai pot bunga Ibu hingga retak.',
      pertanyaanPG: 'Meneladani sifat jujur Nabi Muhammad saw., sikap yang harus dilakukan Tono adalah ....',
      opsiPG: {
        A: 'Mengakui kesalahan kepada Ibu dengan jujur dan meminta maaf',
        B: 'Bersembunyi di belakang pintu dan menyalahkan kucing tetangga',
        C: 'Membuang pecahan pot bunga ke selokan agar tidak ketahuan',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua perilaku anak yang meneladani sifat terpuji Nabi Muhammad saw.!',
      opsiPGK: {
        A: 'Berkata jujur kepada orang tua walaupun melakukan kesalahan',
        B: 'Mengambil mainan milik teman saat teman sedang lengah',
        C: 'Berbicara lembut dan tidak pernah berbohong kepada teman',
        D: 'Menangis keras-keras agar dibelikan semua mainan di toko',
      },
      kunciPGK: 'A dan C',
      pernyataanBS: [
        { pernyataan: 'Nabi Muhammad saw. sejak kecil selalu berkata jujur kepada siapa saja.', jawaban: 'Benar' },
        { pernyataan: 'Berbohong kepada ibu diperbolehkan asalkan tidak dimarahi.', jawaban: 'Salah' },
        { pernyataan: 'Anak yang jujur akan dipercaya dan disayangi oleh teman-teman.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Gelar Nabi Muhammad saw. karena selalu dapat dipercaya', respon: 'Al-Amin' },
        { premis: 'Sikap jika tidak sengaja merusak mainan adik', respon: 'Meminta maaf dengan tulus' },
        { premis: 'Lawan dari perbuatan berkata jujur', respon: 'Berkata dusta atau bohong' },
      ],
      pertanyaanIsian:
        'Anak yang selalu berkata apa adanya dan tidak pernah berbohong disebut anak yang ....................................................',
      kunciIsian: 'jujur (siddiq)',
      pertanyaanUraian:
        'Apa yang kamu ucapkan kepada ayah atau ibu jika kamu tidak sengaja menumpahkan air minum di meja? Tuliskan 2 tindakanmu!',
      kunciUraian:
        '1. Segera berkata jujur dan meminta maaf kepada ayah atau ibu.\n2. Mengambil kain lap untuk membantu mengeringkan meja yang basah.',
      pembahasan:
        'Kejujuran adalah sifat utama Nabi Muhammad saw. sejak kecil. Mengakui kesalahan dan meminta maaf adalah ciri anak pemberani dan saleh.',
      dalil: 'Hadis Kejujuran: "Hendaklah kalian selalu berlaku jujur, karena kejujuran menuntun kepada kebaikan." (HR. Muslim)',
    },
  ],

  'Fase B': [
    {
      elemen: 'Akhlak',
      indikatorTopik: 'menerapkan perilaku jujur dan amanah ketika menemukan barang milik orang lain di sekolah',
      cpRingkas: 'Murid menerapkan sifat jujur dan amanah dalam interaksi sehari-hari di sekolah dan keluarga.',
      stimulus:
        'Saat istirahat, Hasan menemukan uang sepuluh ribu rupiah jatuh di dekat lapangan basket. Tidak ada orang lain di sana, padahal Hasan ingin sekali membeli es krim.',
      pertanyaanPG: 'Tindakan paling tepat yang sebaiknya dilakukan Hasan adalah ....',
      opsiPG: {
        A: 'Menyerahkan uang tersebut kepada guru piket agar diumumkan kepada pemiliknya',
        B: 'Membelikan es krim untuk diri sendiri karena tidak ada teman yang melihat',
        C: 'Membagi uang tersebut bersama teman sebangku untuk membeli jajanan kantin',
        D: 'Menyimpan uang itu di dalam saku celana sampai pulang sekolah',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua alasan mengapa Hasan tidak boleh menggunakan uang temuan tersebut!',
      opsiPGK: {
        A: 'Allah Swt. Maha Melihat setiap perbuatan meskipun tidak ada manusia di sekitar kita',
        B: 'Uang tersebut adalah hak milik orang lain yang sedang kebingungan mencarinya',
        C: 'Harga es krim di kantin sekolah lebih murah daripada uang yang ditemukan',
        D: 'Penjaga kantin sekolah hanya menerima pembayaran uang pas dari murid',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Mengembalikan barang temuan kepada guru piket termasuk perbuatan amanah.', jawaban: 'Benar' },
        { pernyataan: 'Kita boleh memakai uang temuan di halaman sekolah jika nilainya kecil.', jawaban: 'Salah' },
        { pernyataan: 'Orang yang jujur merasa hatinya tenang karena tidak mengambil hak teman.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Menemukan uang jatuh di dekat lapangan sekolah', respon: 'Menyerahkan kepada guru piket untuk diumumkan' },
        { premis: 'Diberi uang lebihan kembalian oleh ibu kantin', respon: 'Mengembalikan kelebihan uang dengan sopan' },
        { premis: 'Meminjam buku cerita dari perpustakaan sekolah', respon: 'Mengembalikan tepat waktu dalam keadaan utuh' },
      ],
      pertanyaanIsian:
        'Sikap dapat dipercaya dalam menjaga dan mengembalikan barang titipan atau temuan kepada pemiliknya disebut sikap ....................................................',
      kunciIsian: 'amanah (jujur)',
      pertanyaanUraian:
        'Seandainya kamu berada di posisi Hasan saat menemukan uang di dekat lapangan basket, apa yang akan kamu lakukan dan apa manfaat sikap tersebut bagi teman yang kehilangan?',
      kunciUraian:
        '1. Saya akan membawa uang itu ke ruang guru piket agar diumumkan ke seluruh kelas.\n2. Manfaatnya, teman yang kehilangan uang bekalnya tidak jadi sedih dan tetap bisa membeli makanan saat istirahat.',
      pembahasan:
        'Menyerahkan barang temuan kepada pihak berwenang di sekolah (guru piket) mencerminkan sifat siddiq (jujur) dan amanah (dapat dipercaya) serta kesadaran bahwa Allah Maha Melihat (Al-Bashir).',
      dalil: 'Q.S. An-Nisa\'/4: 58 — Perintah menyampaikan amanah kepada yang berhak menerimanya',
    },
    {
      elemen: 'Fikih',
      indikatorTopik: 'menerapkan ketertiban berwudu dan adab salat berjamaah di musala sekolah',
      cpRingkas: 'Murid memahami dan mempraktikkan ketentuan wudu serta salat berjamaah dengan tertib.',
      stimulus:
        'Bel istirahat kedua berbunyi bersamaan dengan azan Zuhur. Bima dan teman-teman kelas empat bergegas menuju tempat wudu musala sekolah yang sudah mulai antre.',
      pertanyaanPG: 'Sikap Bima yang sesuai dengan adab bersuci dan salat berjamaah di musala sekolah adalah ....',
      opsiPG: {
        A: 'Mengantre dengan sabar, menghemat air keran, dan merapatkan saf salat',
        B: 'Menerobos barisan antrean paling depan agar cepat selesai berwudu',
        C: 'Membuka keran air besar-besaran sambil menyipratkan air ke baju teman',
        D: 'Berbincang dan bercanda keras-keras ketika imam sedang membaca surah',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua ketentuan makmum yang benar saat mengikuti salat Zuhur berjamaah di musala!',
      opsiPGK: {
        A: 'Berdiri di belakang imam dengan meluruskan dan merapatkan barisan saf',
        B: 'Mendahului gerakan rukuk dan sujud sebelum imam melakukannya',
        C: 'Mengikuti setiap gerakan imam dengan tertib setelah imam berpindah rukun',
        D: 'Berdiri menyendiri di pojok belakang padahal saf depan masih kosong',
      },
      kunciPGK: 'A dan C',
      pernyataanBS: [
        { pernyataan: 'Pahala salat berjamaah lebih utama dua puluh tujuh derajat dibanding salat sendirian.', jawaban: 'Benar' },
        { pernyataan: 'Saat teman sedang salat di sebelah kita, kita boleh mendorong bahunya untuk bercanda.', jawaban: 'Salah' },
        { pernyataan: 'Membasuh muka dan kedua tangan sampai siku termasuk rukun wudu.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Orang yang memimpin gerakan salat berjamaah di depan', respon: 'Imam' },
        { premis: 'Orang yang mengikuti gerakan imam di barisan belakang', respon: 'Makmum' },
        { premis: 'Cara bersuci pengganti wudu memakai debu suci saat sakit', respon: 'Tayamum' },
      ],
      pertanyaanIsian:
        'Barisan jamaah dalam salat berjamaah yang harus diluruskan dan dirapatkan disebut ....................................................',
      kunciIsian: 'saf',
      pertanyaanUraian:
        'Tuliskan 3 manfaat melaksanakan salat Zuhur secara berjamaah bersama teman-teman di musala sekolah!',
      kunciUraian:
        '1. Mendapat pahala berlipat ganda (27 derajat) dari Allah Swt.\n2. Melatih kedisiplinan waktu dan ketertiban bersama teman.\n3. Mempererat rasa persaudaraan dan kerukunan antarmurid di sekolah.',
      pembahasan:
        'Salat berjamaah di musala sekolah mendidik murid untuk sabar mengantre saat berwudu, tidak boros air, serta menjaga kekhusyukan dan kerapian saf.',
      dalil: 'Hadis Keutamaan Salat Berjamaah: "Salat berjamaah lebih utama 27 derajat daripada salat sendirian." (HR. Bukhari-Muslim)',
    },
    {
      elemen: 'Akhlak',
      indikatorTopik: 'menerapkan sikap peduli dan berbagi bekal makanan kepada teman di sekolah',
      cpRingkas: 'Murid membiasakan sikap peduli, dermawan, dan tolong-menolong antarteman di sekolah.',
      stimulus:
        'Ketika jam makan bersama di kelas empat, Nisa membuka kotak bekalnya yang berisi empat potong roti lapis buatan Ibu. Di sebelahnya, Lani hanya minum air putih karena ibunya sedang sakit pagi tadi sehingga tidak sempat memasak.',
      pertanyaanPG: 'Tindakan terpuji yang sebaiknya segera dilakukan Nisa adalah ....',
      opsiPG: {
        A: 'Membagi dua potong roti lapisnya kepada Lani dengan tulus dan ramah',
        B: 'Memakan seluruh roti lapis sambil membelakangi meja duduk Lani',
        C: 'Menceritakan kondisi keluarga Lani kepada seluruh teman di kelas',
        D: 'Meminta Lani membelikan minuman manis terlebih dahulu sebagai ganti roti',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua sikap baik yang dapat dilakukan Nisa dan teman-teman untuk menghibur Lani!',
      opsiPGK: {
        A: 'Berbagi bekal makanan secara sopan tanpa membuat Lani merasa rendah diri',
        B: 'Mendoakan bersama-sama agar ibu Lani lekas sembuh dan sehat kembali',
        C: 'Menanyakan berulang-ulang mengapa Lani tidak punya uang jajan hari ini',
        D: 'Pindah duduk ke meja belakang agar tidak perlu berbagi makanan bekal',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Berbagi makanan bekal dengan teman yang membutuhkan termasuk sedekah.', jawaban: 'Benar' },
        { pernyataan: 'Memberi bantuan kepada teman sebaiknya diungkit-ungkit setiap hari.', jawaban: 'Salah' },
        { pernyataan: 'Mendoakan orang tua teman yang sedang sakit adalah perbuatan mulia.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Teman sebangku tidak membawa bekal karena ibunya sakit', respon: 'Berbagi makanan dengan hati ikhlas' },
        { premis: 'Jadwal piket menyapu ruang kelas pagi hari', respon: 'Bekerja sama membersihkan kelas sampai rapi' },
        { premis: 'Bertemu bapak atau ibu guru di koridor sekolah', respon: 'Mengucapkan salam dan menyapa dengan sopan' },
      ],
      pertanyaanIsian:
        'Memberikan sebagian makanan atau bantuan kepada teman dengan mengharap rida Allah Swt. semata tanpa mengharap balasan disebut sikap ....................................................',
      kunciIsian: 'ikhlas (dermawan)',
      pertanyaanUraian:
        'Mengapa saat berbagi bekal kepada teman kita tidak boleh menyombongkan diri atau menceritakannya untuk pamer? Jelaskan dengan bahasamu!',
      kunciUraian:
        'Karena sikap pamer (riya) dapat menyakiti perasaan teman yang diberi dan menghilangkan pahala kebaikan di sisi Allah Swt.',
      pembahasan:
        'Berbagi bekal dengan ikhlas dan menjaga perasaan teman merupakan wujud nyata akhlak mulia serta kepedulian sosial di lingkungan sekolah.',
      dalil: 'Q.S. Al-Baqarah/2: 264 — Larangan merusak sedekah dengan menyebut-nyebutnya dan menyakiti perasaan penerima',
    },
    {
      elemen: 'Al-Qur\'an dan Hadis',
      indikatorTopik: 'memahami pesan pokok Q.S. Al-Ma\'un dan Q.S. Al-Fil dalam kehidupan sehari-hari',
      cpRingkas: 'Murid memahami pesan pokok surah-surah pendek Al-Qur\'an tentang kepedulian terhadap anak yatim.',
      stimulus:
        'Setiap hari Jumat, kelas empat mengadakan gerakan celengan infak kelas. Uang yang terkumpul digunakan untuk membeli buku tulis bagi teman-teman di panti asuhan dekat sekolah.',
      pertanyaanPG: 'Kegiatan menyantuni anak yatim dan fakir miskin tersebut merupakan pengamalan dari Surah ....',
      opsiPG: {
        A: 'Surah Al-Ma\'un yang memerintahkan menyayangi anak yatim dan memberi makan orang miskin',
        B: 'Surah Al-Lahab yang menceritakan balasan bagi orang yang menghalangi dakwah nabi',
        C: 'Surah Al-Fil yang mengisahkan kehancuran pasukan bergajah Raja Abrahah di Makkah',
        D: 'Surah Al-Kafirun yang menegaskan batas toleransi dalam urusan ibadah mahdhah',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua ciri orang yang mendustakan agama menurut kandungan Surah Al-Ma\'un!',
      opsiPGK: {
        A: 'Menghardik dan bersikap kasar kepada anak yatim yang membutuhkan bantuan',
        B: 'Enggan menganjurkan memberi makan kepada orang-orang miskin yang kelaparan',
        C: 'Menyisihkan sebagian uang jajan untuk dimasukkan ke kotak amal masjid',
        D: 'Menjaga pelaksanaan salat lima waktu dengan khusyuk dan tepat waktu',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Menyayangi dan membantu anak yatim adalah ciri orang yang beriman.', jawaban: 'Benar' },
        { pernyataan: 'Salat dengan tujuan hanya ingin dipuji teman disebut perbuatan riya.', jawaban: 'Benar' },
        { pernyataan: 'Kita hanya wajib menolong teman jika diberi hadiah terlebih dahulu.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Arti nama Surah Al-Ma\'un', respon: 'Barang-barang yang berguna' },
        { premis: 'Sikap terhadap anak yatim di sekitar kita', respon: 'Menyayangi dan membantu kebutuhannya' },
        { premis: 'Lawan dari sifat kikir atau pelit', respon: 'Dermawan dan suka berbagi' },
      ],
      pertanyaanIsian:
        'Menurut Surah Al-Ma\'un, orang yang lalai dalam salatnya dan berbuat .................... (ingin dilihat dan dipuji orang lain) akan celaka.',
      kunciIsian: 'riya (pamer)',
      pertanyaanUraian:
        'Tuliskan 2 cara sederhana yang bisa dilakukan murid kelas empat untuk membantu teman yang kurang mampu di sekolah!',
      kunciUraian:
        '1. Menyisihkan sebagian uang jajan untuk kegiatan infak Jumat di kelas.\n2. Meminjamkan atau memberikan alat tulis dan buku pelajaran yang masih layak pakai.',
      pembahasan:
        'Q.S. Al-Ma\'un ayat 1–7 menegaskan bahwa ibadah ritual (salat) harus tercermin dalam kepedulian sosial, khususnya menyantuni anak yatim dan fakir miskin dengan ikhlas.',
      dalil: 'Q.S. Al-Ma\'un/107: 1–7 — Kepedulian terhadap Anak Yatim dan Fakir Miskin',
    },
    {
      elemen: 'Sejarah Peradaban Islam (SPI)',
      indikatorTopik: 'meneladani kesabaran dan kejujuran Nabi Muhammad saw. saat berdagang dan bergaul',
      cpRingkas: 'Murid meneladani sifat jujur, sabar, dan pemaaf Nabi Muhammad saw. dalam pergaulan.',
      stimulus:
        'Ketika melakukan jadwal piket kelas bersama, Rio tidak sengaja menyenggol ember pel hingga airnya membasahi sepatu baru milik Фариd. Rio segera meminta maaf dengan wajah menyesal.',
      pertanyaanPG: 'Sikap Farid yang meneladani sifat pemaaf Nabi Muhammad saw. adalah ....',
      opsiPG: {
        A: 'Memaafkan Rio dengan lapang dada lalu bersama-sama mengeringkan lantai kelas',
        B: 'Memarahi Rio di depan teman-teman dan menuntut ganti sepatu baru saat itu juga',
        C: 'Menumpahkan sisa air ember ke tas milik Rio agar merasakan hal yang sama',
        D: 'Mogok melaksanakan tugas piket kelas selama satu semester penuh',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua keteladanan akhlak Nabi Muhammad saw. yang patut diterapkan saat bermain bersama teman!',
      opsiPGK: {
        A: 'Bermain secara sportif dan tidak pernah berbuat curang demi menang sendiri',
        B: 'Mudah memaafkan kesalahan teman yang tidak sengaja menyenggol saat berlari',
        C: 'Memusuhi teman yang berbeda pendapat saat menentukan permainan olahraga',
        D: 'Meninggalkan teman yang terjatuh di lapangan tanpa memberikan pertolongan',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Memaafkan kesalahan teman yang sudah meminta maaf adalah akhlak mulia.', jawaban: 'Benar' },
        { pernyataan: 'Menyimpan dendam kepada teman sekelas akan membuat belajar menjadi nyaman.', jawaban: 'Salah' },
        { pernyataan: 'Kerja sama saat piket kelas membuat pekerjaan cepat selesai dan ringan.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Sifat Nabi Muhammad saw. yang selalu berkata benar', respon: 'Siddiq' },
        { premis: 'Sifat Nabi Muhammad saw. yang cerdas dalam menyelesaikan masalah', respon: 'Fathanah' },
        { premis: 'Sikap ketika teman tidak sengaja melakukan kesalahan', respon: 'Memaafkan dengan ikhlas' },
      ],
      pertanyaanIsian:
        'Sifat wajib bagi rasul yang artinya cerdas dan bijaksana dalam menyelesaikan persoalan umat adalah ....................................................',
      kunciIsian: 'fathanah',
      pertanyaanUraian:
        'Bagaimana cara kamu menyelesaikan masalah jika saat bermain kasti di lapangan ada dua temanmu yang berselisih paham? Tuliskan 2 langkahmu!',
      kunciUraian:
        '1. Melerai kedua teman dengan bahasa yang sopan dan menenangkan mereka.\n2. Mengajak mereka berjabat tangan saling memaafkan dan melanjutkan permainan dengan jujur.',
      pembahasan:
        'Rasulullah saw. adalah teladan terbaik (uswatun hasanah) dalam kesabaran, kejujuran, dan kelapangan hati memaafkan kesalahan orang lain.',
      dalil: 'Q.S. Al-Ahzab/33: 21 — Uswatun Hasanah pada diri Rasulullah saw.',
    },
  ],

  'Fase C': [
    {
      elemen: 'Akhlak',
      materiPokok: 'Indahnya Saling Menghargai (Moderasi Beragama / Al-Samhah)',
      stimulusModel: 'Model B: Narasi Studi Kasus Sehari-hari',
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
        { premis: 'Ukuran kemuliaan manusia di hadapan Allah Swt.', respon: 'Ketakwaan dan akhlak mulia' },
        { premis: 'Sikap terhadap teman yang berbeda suku daerah', respon: 'Berteman dengan rukun tanpa membeda-bedakan' },
      ],
      pertanyaanIsian:
        'Di hadapan Allah Swt., orang yang paling mulia di antara manusia bukanlah yang paling kaya atau paling bagus rupanya, melainkan orang yang paling ....',
      kunciIsian: 'bertakwa',
      pertanyaanUraian:
        'Tuliskan arti dari potongan ayat "Inna akramakum \'indallahi atqakum" beserta 2 contoh pengamalannya dalam pergaulan di sekolah!',
      kunciUraian:
        '1. Artinya: "Sesungguhnya yang paling mulia di antara kamu di sisi Allah ialah orang yang paling bertakwa."\n2. Contoh pengamalan: (a) Berteman dengan semua murid tanpa memandang suku atau kekayaan; (b) Berbuat jujur, rajin beribadah, dan menghormati sesama teman.',
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
      materiPokok: 'Iman kepada Hari Akhir serta Qada dan Qadar (Takdir Muallaq)',
      stimulusModel: 'Model D: Daftar Pernyataan Berangka (1), (2), (3), (4)',
      indikatorTopik: 'menganalisis daftar pernyataan berangka (1)–(4) tentang contoh takdir muallaq dan ikhtiar',
      cpRingkas: 'Murid memahami makna iman kepada Hari Akhir serta Qada dan Qadar yang mendorong semangat berikhtiar.',
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
      stimulusModel: 'Model B: Narasi Studi Kasus Perhitungan Zakat',
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
  ],

  'Fase D': [
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
        { pernyataan: 'Meneliti kebenaran berita sebelum menyebarkannya disebut sikap tabayyun.', jawaban: 'Benar' },
        { pernyataan: 'Menyebarkan kabar bohong di grup WhatsApp diperbolehkan jika sekadar bercanda.', jawaban: 'Salah' },
        { pernyataan: 'Q.S. Al-Hujurat ayat 6 mengingatkan kita agar tidak mencelakakan orang lain karena kecerobohan informasi.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Meneliti dan memastikan kebenaran suatu berita yang datang', respon: 'Tabayyun' },
        { premis: 'Membicarakan keburukan teman di belakangnya', respon: 'Ghibah' },
        { premis: 'Menuduh orang lain melakukan kesalahan tanpa bukti yang benar', respon: 'Fitnah (Buhtan)' },
      ],
      pertanyaanIsian:
        'Sikap memeriksa dan meneliti kebenaran suatu berita terlebih dahulu agar tidak menimbulkan penyesalan sebagaimana diperintahkan dalam Q.S. Al-Hujurat ayat 6 disebut ....',
      kunciIsian: 'tabayyun',
      pertanyaanUraian:
        'Tuliskan arti dari perintah "fatabayyanu" (فَتَبَيَّنُوا) dalam Q.S. Al-Hujurat/49: 6 dan jelaskan bagaimana sikap yang seharusnya dilakukan Fikri terhadap temannya yang mengirim pesan hoaks tersebut!',
      kunciUraian:
        '1. Arti "fatabayyanu": Maka telitilah / periksalah dengan saksama kebenarannya.\n2. Sikap Fikri: Menghubungi pengirim pesan secara pribadi dengan bahasa sopan, menjelaskan fakta sebenarnya, dan memintanya menghapus pesan tersebut dari grup.',
      pembahasan:
        'Q.S. Al-Hujurat/49: 6 memerintahkan umat Islam melakukan tabayyun (klarifikasi) dan melarang menyebarkan berita dusta yang merugikan kehormatan sesama.',
      dalil: 'Q.S. Al-Hujurat/49: 6 — Kewajiban Tabayyun dalam Menerima Informasi',
    },
    {
      elemen: 'Akhlak',
      indikatorTopik: 'mencegah perundungan siber (cyberbullying) terhadap teman di media sosial',
      cpRingkas: 'Murid menerapkan adab pergaulan remaja di media sosial serta menolak segala bentuk perundungan.',
      stimulus:
        'Saat jam istirahat, Raka melihat beberapa teman di grup WhatsApp kelas membagikan foto wajah Andi yang telah diedit menjadi stiker lelucon tanpa izin. Andi tampak murung dan memilih duduk menyendiri di pojok kelas karena merasa dipermalukan.',
      pertanyaanPG: 'Tindakan paling tepat yang harus dilakukan Raka sebagai teman sekelas adalah ....',
      opsiPG: {
        A: 'Menegur teman secara santun agar menghapus stiker tersebut serta menemani Andi',
        B: 'Membiarkan percakapan grup berlangsung karena menganggap hal itu candaan biasa',
        C: 'Membuat stiker balasan menggunakan foto teman yang memulai candaan agar impas',
        D: 'Keluar dari grup kelas tanpa berkata apa-apa agar tidak ikut ditegur wali kelas',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua contoh perilaku terpuji dalam menjaga etika pertemanan di media sosial!',
      opsiPGK: {
        A: 'Meminta izin terlebih dahulu sebelum mengunggah foto atau video yang menampilkan wajah teman',
        B: 'Menuliskan komentar yang memberi semangat pada unggahan karya kreatif teman sekelas',
        C: 'Memberikan julukan fisik yang memalukan pada kolom komentar foto profil teman',
        D: 'Membagikan rahasia pribadi teman ke grup obrolan agar suasana grup menjadi ramai',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Memanggil teman dengan julukan buruk yang menyakiti hatinya dilarang dalam Al-Qur\'an.', jawaban: 'Benar' },
        { pernyataan: 'Mengedit foto teman menjadi bahan ejekan di grup kelas termasuk perundungan siber.', jawaban: 'Benar' },
        { pernyataan: 'Perundungan di dunia maya tidak berdosa karena tidak menyentuh fisik secara langsung.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Larangan memanggil teman dengan panggilan yang buruk', respon: 'Wala tanabazu bil-alqab (Q.S. Al-Hujurat: 11)' },
        { premis: 'Menjauhi prasangka buruk terhadap sesama teman', respon: 'Menghindari sifat su\'uzhan' },
        { premis: 'Mendamaikan dua teman sekelas yang sedang berselisih', respon: 'Perilaku ishlah' },
      ],
      pertanyaanIsian:
        'Sikap berprasangka baik kepada sesama teman dan tidak mudah menuduh tanpa bukti disebut sikap ....................................................',
      kunciIsian: 'husnuzhan',
      pertanyaanUraian:
        'Tuliskan 3 langkah nyata yang dapat dilakukan pengurus kelas bersama murid-murid untuk mencegah terjadinya perundungan (bullying) di kelas maupun di grup WhatsApp!',
      kunciUraian:
        '1. Membuat kesepakatan kelas untuk saling menghormati dan melarang candaan yang merendahkan fisik atau keluarga teman.\n2. Segera mengingatkan dengan santun jika ada anggota grup yang mengirim stiker atau komentar mengejek.\n3. Merangkul dan melibatkan semua teman secara adil dalam kegiatan belajar kelompok.',
      pembahasan:
        'Mencegah perundungan (bullying) dilakukan dengan menegur pelaku secara makruf, menghapus konten yang merendahkan martabat teman, serta mendampingi korban.',
      dalil: 'Q.S. Al-Hujurat/49: 11 — Larangan Mengolok-olok dan Memanggil dengan Gelar Buruk',
    },
    {
      elemen: 'Akidah',
      indikatorTopik: 'menerapkan perilaku jujur saat mengerjakan ujian sekolah sebagai wujud iman kepada malaikat pencatat amal',
      cpRingkas: 'Murid menghayati iman kepada malaikat Allah Swt. dengan membiasakan perilaku jujur dan disiplin.',
      stimulus:
        'Ketika ujian akhir semester berlangsung, pengawas ujian keluar ruangan selama lima menit karena dipanggil kepala sekolah. Beberapa murid mulai membuka catatan kecil di kolong meja, sementara Dina tetap tenang mengerjakan soal sendiri.',
      pertanyaanPG: 'Alasan utama Dina tetap menjaga kejujuran meskipun tidak diawasi guru di kelas adalah ....',
      opsiPG: {
        A: 'Menyadari bahwa Allah Maha Melihat dan Malaikat Raqib serta Atid selalu mencatat setiap perbuatan',
        B: 'Khawatir ada kamera pengawas tersembunyi yang dipasang di sudut plafon ruang kelas',
        C: 'Takut teman sebangku melaporkan perbuatannya kepada wali kelas setelah ujian selesai',
        D: 'Merasa soal ujian kali ini sangat mudah sehingga tidak memerlukan bantuan catatan',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua perilaku murid SMP yang mencerminkan keimanan kepada malaikat Allah Swt.!',
      opsiPGK: {
        A: 'Membayar jajanan di kantin kejujuran sesuai harga barang meskipun tidak ada penjaga',
        B: 'Gemar menghadiri majelis ilmu dan membaca Al-Qur\'an dengan tertib setiap hari',
        C: 'Menyalin pekerjaan rumah milik teman lima menit sebelum bel masuk berbunyi',
        D: 'Berpura-pura tertidur di musala sekolah saat jam pelaksanaan salat Zuhur berjamaah',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Malaikat Raqib bertugas mencatat setiap amal kebaikan manusia.', jawaban: 'Benar' },
        { pernyataan: 'Malaikat Atid hanya mencatat perbuatan buruk jika dilakukan di tempat ramai.', jawaban: 'Salah' },
        { pernyataan: 'Kejujuran saat ujian melahirkan ketenangan hati dan keberkahan ilmu.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Malaikat yang bertugas menyampaikan wahyu kepada para rasul', respon: 'Malaikat Jibril' },
        { premis: 'Malaikat yang bertugas mencatat amal baik manusia', respon: 'Malaikat Raqib' },
        { premis: 'Malaikat yang bertugas mencatat amal buruk manusia', respon: 'Malaikat Atid' },
      ],
      pertanyaanIsian:
        'Kesadaran bahwa setiap ucapan dan tindakan kita selalu diawasi oleh Allah Swt. dan dicatat oleh malaikat disebut sikap ....................................................',
      kunciIsian: 'muraqabah (jujur / amanah)',
      pertanyaanUraian:
        'Bagaimana pendapatmu jika ada teman dekatmu yang meminta jawaban saat ujian berlangsung dengan alasan solidaritas pertemanan? Jelaskan sikap yang harus kamu ambil!',
      kunciUraian:
        'Menolak permintaan tersebut dengan sopan karena membantu teman berbuat curang saat ujian bukanlah solidaritas yang baik, melainkan kerja sama dalam ketidakjujuran. Setelah ujian selesai, barulah kita menawarkan bantuan belajar bersama agar ia paham materi.',
      pembahasan:
        'Beriman kepada Malaikat Raqib dan Atid menumbuhkan kejujuran dari dalam diri (integritas) tanpa bergantung pada ada atau tidaknya pengawasan manusia.',
      dalil: 'Q.S. Qaf/50: 18 — "Tidak ada suatu kata pun yang diucapkannya melainkan ada di sisinya malaikat pengawas yang selalu siap (mencatat)."',
    },
    {
      elemen: 'Fikih',
      indikatorTopik: 'menerapkan ketentuan sujud syukur, sujud sahwi, dan sujud tilawah dalam kehidupan',
      cpRingkas: 'Murid memahami ketentuan dan mempraktikkan sujud syukur, sujud sahwi, serta sujud tilawah.',
      stimulus:
        'Setelah berbulan-bulan berlatih dengan tekun, tim robotik MTs Harapan akhirnya diumumkan meraih juara pertama tingkat provinsi. Mendengar pengumuman resmi tersebut, Zaki dan rekan satu timnya segera menghadap kiblat dan melakukan sujud satu kali di luar salat.',
      pertanyaanPG: 'Sujud yang dilakukan oleh Zaki dan rekan satu timnya tersebut dinamakan ....',
      opsiPG: {
        A: 'Sujud syukur karena menerima nikmat keberhasilan dari Allah Swt.',
        B: 'Sujud sahwi karena lupa jumlah rakaat saat melaksanakan salat',
        C: 'Sujud tilawah karena mendengar bacaan ayat-ayat sajdah dalam Al-Qur\'an',
        D: 'Sujud rukun yang wajib dikerjakan dua kali pada setiap rakaat salat',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua sebab yang mengharuskan atau menganjurkan seseorang melakukan sujud sahwi di akhir salat!',
      opsiPGK: {
        A: 'Ragu-ragu mengenai jumlah rakaat salat yang baru saja dikerjakan (misal antara 3 atau 4 rakaat)',
        B: 'Lupa tidak mengerjakan tasyahud awal lalu sudah terlanjur berdiri tegak pada rakaat ketiga',
        C: 'Mendengar kabar gembira bahwa kakak kandung lulus seleksi masuk perguruan tinggi',
        D: 'Membaca atau mendengar salah satu ayat sajdah ketika sedang tadarus Al-Qur\'an',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Sujud syukur hanya boleh dilakukan di luar salat, tidak boleh di dalam salat.', jawaban: 'Benar' },
        { pernyataan: 'Sujud sahwi dilakukan sebanyak dua kali sujud sebelum atau sesudah salam.', jawaban: 'Benar' },
        { pernyataan: 'Sujud tilawah dilakukan ketika seseorang lupa membaca doa qunut.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Selamat dari musibah kecelakaan atau mendapat nikmat besar', respon: 'Sujud Syukur' },
        { premis: 'Lupa tasyahud awal atau ragu jumlah rakaat dalam salat', respon: 'Sujud Sahwi' },
        { premis: 'Membaca atau mendengar ayat sajdah dalam Al-Qur\'an', respon: 'Sujud Tilawah' },
      ],
      pertanyaanIsian:
        'Sujud yang dilakukan sebanyak satu kali ketika membaca atau mendengar ayat-ayat sajdah baik di dalam maupun di luar salat disebut sujud ....................................................',
      kunciIsian: 'tilawah',
      pertanyaanUraian:
        'Jelaskan perbedaan antara sujud syukur dan sujud sahwi dilihat dari: (a) sebab pelaksanaannya, dan (b) waktu pelaksanaannya (di dalam atau di luar salat)!',
      kunciUraian:
        'a) Sebab pelaksanaan: Sujud syukur dilakukan karena mendapat nikmat atau terhindar dari bahaya, sedangkan sujud sahwi dilakukan karena lupa atau ragu-ragu dalam gerakan/bacaan salat.\nb) Waktu pelaksanaan: Sujud syukur hanya dilakukan di luar salat (1 kali sujud), sedangkan sujud sahwi dilakukan di dalam rangkaian akhir salat sebelum atau sesudah salam (2 kali sujud).',
      pembahasan:
        'Sujud syukur merupakan ekspresi terima kasih hamba kepada Allah Swt. atas nikmat atau keselamatan yang diperoleh, dikerjakan satu kali di luar salat dalam keadaan suci menghadap kiblat.',
      dalil: 'Hadis Abu Bakrah r.a. tentang Sujud Syukur Rasulullah saw. (HR. Abu Dawud dan Tirmidzi)',
    },
    {
      elemen: 'Sejarah Peradaban Islam (SPI)',
      indikatorTopik: 'meneladani semangat literasi dan keilmuan ilmuwan muslim pada masa Bani Abbasiyah',
      cpRingkas: 'Murid meneladani semangat keilmuan dan literasi dari sejarah kejayaan Islam masa Bani Abbasiyah.',
      stimulus:
        'Di perpustakaan sekolah, Nabila membaca buku sejarah tentang Baitul Hikmah di kota Baghdad. Pada masa itu, para ilmuwan seperti Al-Khawarizmi dan Ibnu Sina tekun meneliti ilmu matematika dan kedokteran serta berdiskusi secara terbuka dengan berbagai kalangan.',
      pertanyaanPG: 'Perilaku murid SMP masa kini yang paling tepat dalam meneladani semangat ilmuwan Baitul Hikmah adalah ....',
      opsiPG: {
        A: 'Rajin membaca buku, memanfaatkan internet untuk belajar sains, dan menghargai karya ilmiah',
        B: 'Menghafal nama-nama ilmuwan masa lalu tetapi malas mengerjakan tugas praktikum di sekolah',
        C: 'Menggunakan gawai sepanjang malam hanya untuk bermain gim daring hingga terlambat sekolah',
        D: 'Menolak mempelajari ilmu matematika dan kesehatan karena menganggapnya bukan pelajaran agama',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua kontribusi besar ilmuwan muslim masa Bani Abbasiyah bagi perkembangan ilmu pengetahuan dunia!',
      opsiPGK: {
        A: 'Al-Khawarizmi menyusun dasar-dasar ilmu aljabar dan sistem angka yang dipakai hingga kini',
        B: 'Ibnu Sina menulis kitab kedokteran Al-Qanun fi Ath-Thibb yang menjadi rujukan medis selama berabad-abad',
        C: 'Melarang penerjemahan buku-buku ilmu pengetahuan dari bahasa asing ke dalam bahasa Arab',
        D: 'Menutup perpustakaan umum agar ilmu pengetahuan hanya dimiliki oleh keluarga kerajaan',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Dalam pandangan Islam, menuntut ilmu agama dan ilmu sains sama-sama bernilai ibadah.', jawaban: 'Benar' },
        { pernyataan: 'Baitul Hikmah di Baghdad berfungsi sebagai pusat perpustakaan, penerjemahan, dan penelitian ilmiah.', jawaban: 'Benar' },
        { pernyataan: 'Kemajuan peradaban dapat dicapai tanpa perlu kebiasaan membaca dan meneliti.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Tokoh ilmuwan muslim penemu konsep Aljabar dan Algoritma', respon: 'Al-Khawarizmi' },
        { premis: 'Tokoh ilmuwan muslim penulis kitab kedokteran Al-Qanun fi Ath-Thibb', respon: 'Ibnu Sina' },
        { premis: 'Pusat perpustakaan dan riset terkenal di Baghdad masa Khalifah Al-Ma\'mun', respon: 'Baitul Hikmah' },
      ],
      pertanyaanIsian:
        'Pusat perpustakaan, penerjemahan, dan penelitian ilmu pengetahuan yang didirikan di kota Baghdad pada masa keemasan Bani Abbasiyah bernama ....................................................',
      kunciIsian: 'Baitul Hikmah',
      pertanyaanUraian:
        'Mengapa umat Islam tidak boleh memisahkan antara ketaatan beribadah dengan semangat mempelajari ilmu pengetahuan modern (sains dan teknologi)? Berikan 2 alasanmu!',
      kunciUraian:
        '1. Karena wahyu pertama Al-Qur\'an (Q.S. Al-\'Alaq: 1–5) memerintahkan kita membaca dan meneliti ciptaan Allah dengan menyebut nama Tuhan.\n2. Penguasaan sains dan teknologi yang dilandasi iman akan menghasilkan karya yang bermanfaat luas bagi kesehatan, pendidikan, dan kesejahteraan masyarakat.',
      pembahasan:
        'Sejarah Bani Abbasiyah membuktikan bahwa integrasi keimanan dan semangat riset ilmiah melahirkan peradaban yang maju serta memberi manfaat bagi seluruh umat manusia.',
      dalil: 'Q.S. Al-Mujadilah/58: 11 — Allah mengangkat derajat orang beriman dan berilmu pengetahuan',
    },
  ],

  'Fase E': [
    {
      elemen: 'Fikih',
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
        E: 'Wakalah bil ujrah karena penyelenggara aplikasi mengenakan biaya langganan bulanan tetap',
      },
      kunciPG: 'C',
      pertanyaanPGK: 'Pilihlah dua sikap bijak pelajar SMA agar terhindar dari jeratan transaksi ribawi dan gaya hidup konsumtif di era digital!',
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
        { pernyataan: 'Pinjaman berbunga mencekik diperbolehkan dalam Islam asalkan digunakan untuk membeli barang hiburan.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Tambahan yang disyaratkan atas pokok utang pinjaman uang', respon: 'Riba Qardh' },
        { premis: 'Jual beli dengan menyebutkan harga pokok dan margin keuntungan yang disepakati', respon: 'Akad Murabahah' },
        { premis: 'Pinjaman kebajikan untuk menolong sesama tanpa tambahan bunga sama sekali', respon: 'Akad Qardhul Hasan' },
      ],
      pertanyaanIsian:
        'Akad pinjam-meminjam uang dalam fikih muamalah yang bertujuan murni tolong-menolong dan wajib dikembalikan tepat sebesar pokok pinjaman tanpa tambahan disebut akad ....................................................',
      kunciIsian: 'qardhul hasan (qardh)',
      pertanyaanUraian:
        'Koperasi murid di sekolahmu ingin membantu anggota membeli perlengkapan praktik seharga Rp300.000,00 secara mencicil 3 bulan tanpa sistem bunga pinjaman. Rancanglah skema alternatif menggunakan akad Murabahah atau Qardhul Hasan yang adil dan sah secara syariah!',
      kunciUraian:
        '1. Skema Qardhul Hasan: Koperasi meminjamkan dana Rp300.000,00 tanpa bunga, lalu murid mencicil Rp100.000,00 per bulan selama 3 bulan hingga lunas Rp300.000,00.\n2. Skema Murabahah: Koperasi membeli alat praktik tersebut dari pemasok secara grosir (misal Rp275.000,00), lalu menjual barang itu kepada murid seharga Rp300.000,00 secara cicilan tetap Rp100.000,00 × 3 bulan tanpa denda bunga keterlambatan.',
      pembahasan:
        'Syariat Islam menghalalkan jual beli (seperti murabahah) dan mengharamkan riba (tambahan atas pokok utang/qardh maupun denda berlipat/jahiliyah) untuk melindungi harta (hifzh al-mal) dari kezaliman.',
      dalil: 'Q.S. Al-Baqarah/2: 275 — "Allah telah menghalalkan jual beli dan mengharamkan riba."',
    },
    {
      elemen: 'Akidah',
      indikatorTopik: 'menganalisis keselarasan hati, lisan, dan amal perbuatan dalam konsep syu\'abul iman',
      cpRingkas: 'Murid menganalisis cabang-cabang iman (syu\'abul iman) pada ranah hati, lisan, dan perbuatan.',
      stimulus:
        'Farhan aktif membagikan poster kutipan hadis tentang kejujuran di akun media sosial miliknya. Namun, saat mengerjakan ujian kimia di kelas, ia diam-diam membuka kunci jawaban melalui jam tangan pintar ketika guru pengawas menghadap ke papan tulis.',
      pertanyaanPG: 'Apabila dianalisis menggunakan konsep syu\'abul iman, kesimpulan yang paling tepat mengenai sikap Farhan adalah ....',
      opsiPG: {
        A: 'Keimanannya sudah utuh karena ia telah menyebarkan dakwah kebaikan di media sosial',
        B: 'Cabang iman pada amal perbuatan belum selaras dengan pengakuan lisan dan keyakinan hatinya',
        C: 'Perbuatan menyontek hanya melanggar tata tertib sekolah dan tidak berkaitan dengan cabang iman',
        D: 'Keyakinan di dalam hati sudah cukup tanpa perlu dibuktikan dengan kejujuran saat ujian',
        E: 'Pahala membagikan poster dakwah secara otomatis menghapus ketidakjujuran dalam ujian akademik',
      },
      kunciPG: 'B',
      pertanyaanPGK: 'Pilihlah dua contoh pengamalan syu\'abul iman yang memadukan keyakinan hati, lisan, dan tindakan nyata seorang pelajar!',
      opsiPGK: {
        A: 'Meyakini Allah Maha Melihat, berkata jujur kepada guru, dan mengerjakan ujian secara mandiri',
        B: 'Bersyukur di dalam hati, mengucapkan hamdalah, dan menggunakan uang bekal untuk hal bermanfaat',
        C: 'Menghafal seluruh dalil tentang amanah tetapi sering memalsukan tanda tangan orang tua di buku rapor',
        D: 'Menulis komentar religius di media sosial sambil menyebarkan gosip keburukan teman sekelas',
        E: 'Mengaku beriman kepada takdir Allah namun malas belajar dan menyalahkan guru saat nilai rendah',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Iman mencakup pembenaran hati (tasdiq bil qalbi), ikrar lisan, dan pembuktian amal perbuatan.', jawaban: 'Benar' },
        { pernyataan: 'Menyingkirkan duri atau pecahan kaca yang membahayakan di jalan termasuk cabang iman.', jawaban: 'Benar' },
        { pernyataan: 'Rasa malu berbuat curang tidak memiliki hubungan dengan cabang-cabang keimanan.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Cabang iman pada dimensi hati (niat dan akidah)', respon: 'Tawakal, ikhlas, dan mahabbah kepada Allah' },
        { premis: 'Cabang iman pada dimensi lisan (ucapan)', respon: 'Membaca Al-Qur\'an, berzikir, dan berkata jujur' },
        { premis: 'Cabang iman pada dimensi anggota badan (amal)', respon: 'Mendirikan salat, menolong sesama, dan menjaga amanah' },
      ],
      pertanyaanIsian:
        'Dalam hadis riwayat Muslim disebutkan bahwa rasa .................... (enggan melakukan perbuatan tercela dan maksiat) merupakan salah satu cabang dari iman.',
      kunciIsian: 'malu (al-haya\')',
      pertanyaanUraian:
        'Mengapa keimanan seseorang dapat bertambah dan berkurang dalam kehidupan sehari-hari, serta bagaimana 2 cara konkret bagi pelajar SMA untuk menjaga agar imannya tetap kuat?',
      kunciUraian:
        'Iman bertambah dengan ketaatan (amal saleh) dan berkurang karena kemaksiatan/kelalaian. Dua cara menjaganya:\n1. Membiasakan ibadah wajib tepat waktu, membaca Al-Qur\'an, dan jujur dalam belajar.\n2. Memilih lingkungan pertemanan yang baik serta bijak menyaring tontonan di media sosial.',
      pembahasan:
        'Hakikat iman menurut Ahlussunnah wal Jama\'ah adalah kesatuan utuh antara keyakinan hati (tasdiq bil qalbi), ucapan lisan (iqrar bil lisan), dan pengamalan anggota tubuh (\'amal bil arkan).',
      dalil: 'Hadis Syu\'abul Iman: "Iman itu memiliki tujuh puluh lebih cabang..." (HR. Bukhari dan Muslim)',
    },
    {
      elemen: 'Sejarah Peradaban Islam (SPI)',
      indikatorTopik: 'menganalisis strategi dakwah kultural dan toleransi Wali Songo di Nusantara',
      cpRingkas: 'Murid menganalisis sejarah masuknya Islam di Indonesia dan meneladani dakwah moderat Wali Songo.',
      stimulus:
        'Ketika berdakwah di Kudus, Sunan Kudus membangun menara masjid dengan arsitektur bata merah yang akrab bagi warga setempat dan melarang penyembelihan sapi saat Iduladha untuk menghormati perasaan tetangga beragama Hindu. Sementara itu, Sunan Kalijaga menyisipkan ajaran tauhid dan akhlak mulia melalui pertunjukan wayang kulit.',
      pertanyaanPG: 'Sikap generasi muda muslim masa kini yang paling tepat dalam meneladani strategi dakwah tersebut adalah ....',
      opsiPG: {
        A: 'Mencampuradukkan tata cara ibadah wajib umat Islam dengan ritual agama lain secara bebas',
        B: 'Menolak seluruh tradisi dan kesenian daerah Nusantara karena dianggap bukan budaya Timur Tengah',
        C: 'Memegang teguh akidah tauhid sambil menghargai kearifan budaya lokal yang sejalan dengan nilai kebaikan',
        D: 'Membatasi kegiatan dakwah hanya melalui pertunjukan kesenian tradisional tanpa kajian ilmiah',
        E: 'Mengharuskan seluruh bangunan masjid di Indonesia memiliki bentuk menara yang seragam',
      },
      kunciPG: 'C',
      pertanyaanPGK: 'Pilihlah dua faktor utama yang menyebabkan dakwah Islam berkembang pesat secara damai di kepulauan Nusantara!',
      opsiPGK: {
        A: 'Para mubalig menyampaikan ajaran Islam dengan pendekatan santun, ramah, dan tanpa pemaksaan',
        B: 'Ajaran Islam menghargai kesetaraan derajat manusia serta memanfaatkan jalur perdagangan dan seni budaya',
        C: 'Para pedagang muslim menggunakan kekuatan armada militer untuk menaklukkan pelabuhan-pelabuhan lokal',
        D: 'Masyarakat pribumi dipaksa meninggalkan seluruh bahasa daerahnya saat pertama kali memeluk Islam',
        E: 'Dakwah hanya ditujukan kepada kalangan bangsawan istana dan menutup diri dari rakyat biasa',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Pendekatan dakwah Wali Songo selaras dengan perintah dakwah bil hikmah dalam Q.S. An-Nahl ayat 125.', jawaban: 'Benar' },
        { pernyataan: 'Tradisi lokal seperti Sekaten dan Grebeg Maulud digunakan Wali Songo sebagai media syiar Islam.', jawaban: 'Benar' },
        { pernyataan: 'Menghormati tetangga berbeda agama menuntut kita untuk mengubah pokok keimanan kita.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Wali Songo yang berdakwah melalui tembang Lir-Ilir dan seni pertunjukan wayang', respon: 'Sunan Kalijaga' },
        { premis: 'Wali Songo yang mendirikan pesantren Ampel Denta di Surabaya dan mengajarkan Moh Limo', respon: 'Sunan Ampel' },
        { premis: 'Wali Songo yang menghormati masyarakat Kudus dengan tidak menyembelih sapi', respon: 'Sunan Kudus' },
      ],
      pertanyaanIsian:
        'Ajaran falsafah moral dari Sunan Ampel untuk memperbaiki akhlak masyarakat dengan menolak lima perbuatan maksiat (tidak berjudi, tidak mabuk, tidak mencuri, tidak madat, tidak berzina) dikenal dengan istilah ....................................................',
      kunciIsian: 'Moh Limo',
      pertanyaanUraian:
        'Bagaimana cara pelajar SMA menerapkan metode dakwah yang bijaksana (bil hikmah) dan santun (mau\'izhah hasanah) melalui konten kreatif di media sosial masa kini? Berikan 2 contoh konkret!',
      kunciUraian:
        '1. Membuat video pendek atau infografis inspiratif tentang adab sehari-hari dan kesehatan mental berbasis Al-Qur\'an dengan bahasa yang sopan dan menyejukkan.\n2. Berdiskusi di kolom komentar secara santun berbasis ilmu tanpa mencaci maki atau merendahkan kelompok lain.',
      pembahasan:
        'Wali Songo menerapkan dakwah moderat (tawassuth): kokoh dalam prinsip tauhid dan syariat, namun santun merangkul budaya Nusantara yang tidak bertentangan dengan ajaran Islam.',
      dalil: 'Q.S. An-Nahl/16: 125 — "Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pengajaran yang baik..."',
    },
    {
      elemen: 'Al-Qur\'an dan Hadis',
      indikatorTopik: 'menganalisis etika bermedia sosial dan larangan menyebarluaskan aib sesama berdasarkan Q.S. Al-Hujurat: 12',
      cpRingkas: 'Murid menganalisis dalil naqli tentang larangan tajassus (mencari-cari kesalahan) dan ghibah di ruang digital.',
      stimulus:
        'Sebuah akun gosip remaja di media sosial mengunggah rekaman video amatir seorang murid yang sedang mengalami musibah jatuh dari sepeda motor di depan gerbang sekolah. Bukannya menolong, pemilik akun justru menambahkan keterangan kalimat olok-olok demi mengejar ribuan tanda suka dan komentar.',
      pertanyaanPG: 'Berdasarkan kandungan Q.S. Al-Hujurat ayat 12 dan etika bermedia sosial dalam Islam, evaluasi yang paling tepat terhadap tindakan pemilik akun tersebut adalah ....',
      opsiPG: {
        A: 'Dilarang karena mengeksploitasi kesusahan orang lain dan menyebarkan aib sesama demi popularitas semata',
        B: 'Diperbolehkan selama video tersebut direkam di jalan umum di luar jam kegiatan belajar mengajar sekolah',
        C: 'Sah dilakukan sebagai bentuk jurnalisme warga agar pengendara lain lebih berhati-hati di jalan raya',
        D: 'Boleh diunggah asalkan pemilik akun menyumbangkan sebagian pendapatan iklannya ke kotak amal',
        E: 'Tidak melanggar etika selama wajah korban di dalam video masih terlihat samar dari kejauhan',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua sikap pelajar SMA yang bijak ketika menemukan unggahan video yang mempermalukan orang lain di linimasa media sosial!',
      opsiPGK: {
        A: 'Tidak ikut menyebarkan tautan video tersebut dan melaporkan unggahan agar segera diturunkan',
        B: 'Mengingatkan pengunggah secara santun untuk menghapus konten demi menjaga martabat korban',
        C: 'Menandai akun teman-teman sekelas di kolom komentar agar video tersebut semakin viral',
        D: 'Mengunduh video tersebut untuk disimpan sebagai bahan lelucon di grup obrolan angkatan',
        E: 'Menuliskan komentar sindiran yang menyalahkan korban tanpa mengetahui kronologi kejadian',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Mencari-cari kesalahan dan mengumbar aib orang lain di media sosial termasuk perbuatan tajassus yang dilarang.', jawaban: 'Benar' },
        { pernyataan: 'Barangsiapa menutupi aib saudaranya di dunia, niscaya Allah akan menutupi aibnya pada hari kiamat.', jawaban: 'Benar' },
        { pernyataan: 'Jejak digital berupa komentar menghina tidak akan dimintai pertanggungjawaban di akhirat.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Mencari-cari kesalahan atau memata-matai aib orang lain', respon: 'Tajassus' },
        { premis: 'Prinsip perlindungan kehormatan dan martabat manusia dalam syariat', respon: 'Hifzh al-\'Irdh' },
        { premis: 'Menyaring kebenaran dan manfaat konten sebelum diunggah ke ruang publik', respon: 'Literasi Digital Islami' },
      ],
      pertanyaanIsian:
        'Perbuatan mencari-cari kesalahan atau mengorek privasi dan aib orang lain yang dilarang secara tegas dalam Q.S. Al-Hujurat ayat 12 disebut ....................................................',
      kunciIsian: 'tajassus',
      pertanyaanUraian:
        'Bagaimana dampak psikologis dan sosial dari budaya mengumbar aib orang lain (doxing/shaming) di media sosial, serta bagaimana solusi Islam untuk mengatasinya?',
      kunciUraian:
        '1. Dampak: Korban mengalami trauma mental, kehilangan rasa aman, dan rusaknya kepercayaan sosial di masyarakat.\n2. Solusi Islam: Menanamkan kesadaran hifzh al-\'irdh (menjaga kehormatan sesama), membiasakan tabayyun, serta mengamalkan hadis menutupi aib sesama dan berkata baik atau diam.',
      pembahasan:
        'Islam melarang keras tajassus (mengorek aib) dan ghibah, termasuk menjadikan musibah orang lain sebagai tontonan olok-olok di media sosial.',
      dalil: 'Q.S. Al-Hujurat/49: 12 & Hadis: "Barangsiapa menutupi aib seorang muslim, Allah akan menutupi aibnya di dunia dan akhirat." (HR. Muslim)',
    },
    {
      elemen: 'Akhlak',
      indikatorTopik: 'menganalisis bahaya pergaulan bebas, minuman keras, dan narkoba ditinjau dari al-kulliyatul khamsah',
      cpRingkas: 'Murid menganalisis larangan perbuatan dosa besar dan menjaga lima prinsip dasar syariat (al-kulliyatul khamsah).',
      stimulus:
        'Dalam sebuah penyuluhan kesehatan remaja di aula SMA, dokter memaparkan kasus seorang remaja yang mengalami kerusakan saraf otak permanen dan putus sekolah akibat mengonsumsi obat-obatan terlarang setelah dibujuk teman nongkrongnya dengan alasan untuk menghilangkan stres belajar.',
      pertanyaanPG: 'Berdasarkan konsep lima tujuan pokok syariat Islam (al-kulliyatul khamsah), larangan keras mengonsumsi narkoba dan minuman keras bertujuan utama untuk menjaga ....',
      opsiPG: {
        A: 'Kelangsungan akal pikiran yang sehat (hifzh al-\'aql) dan keselamatan jiwa (hifzh an-nafs)',
        B: 'Kebebasan mutlak setiap remaja untuk mencoba berbagai produk kimia tanpa batas',
        C: 'Keuntungan finansial perusahaan farmasi yang memproduksi obat-obatan tanpa resep',
        D: 'Popularitas pergaulan remaja agar diterima di lingkungan kelompok sebaya di luar sekolah',
        E: 'Tradisi perayaan malam minggu di kalangan pemuda perkotaan secara turun-temurun',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua langkah preventif yang efektif bagi pelajar SMA/SMK untuk membentengi diri dari penyalahgunaan narkoba dan pergaulan bebas!',
      opsiPGK: {
        A: 'Memperkuat ketaatan ibadah serta memilih sahabat yang saling mendukung dalam kegiatan positif',
        B: 'Mengisi waktu luang dengan olahraga, riset ilmiah, atau organisasi ekstrakurikuler yang bermanfaat',
        C: 'Mencoba sedikit zat adiktif sekadar untuk membuktikan bahwa dirinya mampu berhenti kapan saja',
        D: 'Menyimpan masalah berat sendirian dan mencari pelarian di tempat hiburan malam tanpa izin orang tua',
        E: 'Mengikuti seluruh ajakan teman pergaulan meskipun bertentangan dengan ajaran agama dan hukum negara',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Segala zat yang memabukkan dan merusak fungsi akal sehat dihukumi haram seperti khamr.', jawaban: 'Benar' },
        { pernyataan: 'Menjaga kesehatan akal (hifzh al-\'aql) merupakan salah satu dari lima tujuan pokok syariat Islam.', jawaban: 'Benar' },
        { pernyataan: 'Mengonsumsi narkoba dalam dosis kecil diperbolehkan jika bertujuan menambah keberanian tampil.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Menjaga keselamatan akal pikiran dari zat memabukkan dan narkoba', respon: 'Hifzh al-\'Aql' },
        { premis: 'Menjaga keselamatan nyawa dan kesehatan tubuh dari tindakan berbahaya', respon: 'Hifzh an-Nafs' },
        { premis: 'Menjaga kesucian garis keturunan dan kehormatan keluarga', respon: 'Hifzh an-Nasl' },
      ],
      pertanyaanIsian:
        'Prinsip penjagaan dan perlindungan terhadap akal pikiran manusia dari segala hal yang memabukkan atau merusak kesadaran dalam maqashid syariah disebut ....................................................',
      kunciIsian: 'hifzh al-\'aql',
      pertanyaanUraian:
        'Jelaskan mengapa perbuatan mengonsumsi khamr (minuman keras/narkoba) disebut sebagai induk dari berbagai kejahatan (ummul khabaits) dan bagaimana dampaknya terhadap masa depan generasi muda!',
      kunciUraian:
        '1. Disebut ummul khabaits karena ketika akal sehat seseorang tertutup oleh efek memabukkan, ia kehilangan kontrol diri sehingga mudah melakukan kejahatan lain seperti kekerasan, kecelakaan, pencurian, dan pergaulan bebas.\n2. Dampaknya merusak kesehatan fisik dan mental, menghancurkan prestasi akademik, serta menghilangkan potensi generasi muda untuk membangun bangsa.',
      pembahasan:
        'Narkoba dan khamr merusak akal (hifzh al-\'aql), jiwa (hifzh an-nafs), dan harta (hifzh al-mal). Setiap zat yang memabukkan dan merusak akal adalah haram.',
      dalil: 'Q.S. Al-Ma\'idah/5: 90 & Hadis: "Setiap yang memabukkan adalah khamr, dan setiap khamr adalah haram." (HR. Muslim)',
    },
  ],

  'Fase F': [
    {
      elemen: 'Akhlak',
      indikatorTopik: 'menerapkan integritas dan etika profesi Islami saat menjalani praktik kerja lapangan (magang)',
      cpRingkas: 'Murid menerapkan etos kerja, integritas, dan etika profesi Islami di dunia kerja dan masyarakat.',
      stimulus:
        'Reza sedang menjalani Praktik Kerja Lapangan (PKL) di sebuah bengkel resmi otomotif. Suatu siang, seorang pelanggan meminta Reza memasang suku cadang tiruan yang murah tetapi mencatatnya di kuitansi kantor sebagai suku cadang asli agar pelanggan tersebut mendapat klaim ganti rugi lebih besar dari perusahaannya. Pelanggan itu menjanjikan uang tip Rp150.000,00 kepada Reza.',
      pertanyaanPG: 'Tindakan paling tepat yang harus diambil Reza sebagai calon profesional muslim yang berintegritas adalah ....',
      opsiPG: {
        A: 'Menolak permintaan tersebut dengan sopan dan mencatat kuitansi sesuai jenis suku cadang yang sebenarnya',
        B: 'Menerima tawaran pelanggan tersebut karena uang tip itu dapat membantu biaya transportasi magang',
        C: 'Memenuhi permintaan pelanggan asalkan pelanggan berjanji tidak memberi tahu kepala bengkel',
        D: 'Meminta pelanggan menaikkan jumlah uang tip menjadi dua kali lipat karena risikonya cukup tinggi',
        E: 'Memasang suku cadang tiruan tanpa sepengetahuan pelanggan maupun kepala bengkel untuk keuntungan sendiri',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua dampak buruk apabila seorang pekerja memalsukan nota pembelian atau melakukan kecurangan di tempat kerja!',
      opsiPGK: {
        A: 'Menghilangkan keberkahan rezeki karena harta yang diperoleh bercampur dengan perbuatan curang (tadlis/ghulul)',
        B: 'Meruntuhkan kepercayaan pelanggan dan merusak reputasi perusahaan tempatnya bekerja',
        C: 'Meningkatkan penilaian kinerja magang dari pihak sekolah karena mendapat banyak uang tip',
        D: 'Mempercepat kenaikan jabatan karyawan karena dianggap pintar mencari celah keuntungan',
        E: 'Menambah pahala sedekah apabila sebagian uang hasil memalsukan nota dimasukkan ke kotak amal',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Bekerja secara jujur, tekun, dan profesional untuk mencari nafkah halal bernilai ibadah di sisi Allah Swt.', jawaban: 'Benar' },
        { pernyataan: 'Memanipulasi laporan keuangan kantor diperbolehkan jika dilakukan atas perintah rekan senior.', jawaban: 'Salah' },
        { pernyataan: 'Q.S. At-Taubah ayat 105 menegaskan bahwa Allah, Rasul-Nya, dan orang mukmin akan melihat hasil amal pekerjaan kita.', jawaban: 'Benar' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Bekerja dengan sungguh-sungguh, tuntas, dan berkualitas tinggi', respon: 'Sikap Itqan (Profesional)' },
        { premis: 'Menjaga kepercayaan atas tugas, waktu kerja, dan fasilitas kantor', respon: 'Sikap Amanah (Integritas)' },
        { premis: 'Larangan mengurangi takaran atau memalsukan kualitas barang dagangan', respon: 'Q.S. Al-Muthaffifin ayat 1–3' },
      ],
      pertanyaanIsian:
        'Sikap bekerja secara sungguh-sungguh, teliti, dan memberikan kualitas terbaik sesuai keahlian dalam ajaran Islam dikenal dengan istilah ....................................................',
      kunciIsian: 'itqan (ihsan / profesional)',
      pertanyaanUraian:
        'Analisislah kasus Reza di atas:\na) Mengapa menerima uang tip untuk memalsukan kuitansi suku cadang dilarang dalam etika profesi Islam?\nb) Tuliskan 3 prinsip etos kerja Islami yang wajib dipegang murid SMA/SMK ketika memasuki dunia kerja atau wirausaha!',
      kunciUraian:
        'a) Karena perbuatan tersebut merupakan kebohongan (tadlis), pengkhianatan amanah terhadap perusahaan bengkel, serta kerja sama dalam perbuatan dosa dan permusuhan (memakan harta secara batil).\nb) Tiga prinsip etos kerja Islami:\n1. Niat ikhlas mencari rezeki halal karena Allah Swt.\n2. Jujur dan amanah (tidak korupsi waktu maupun anggaran).\n3. Itqan (bekerja secara profesional, disiplin, dan bertanggung jawab).',
      pembahasan:
        'Integritas di tempat kerja menuntut kejujuran mutlak antara fakta barang/jasa dengan catatan transaksi. Rasulullah saw. menegaskan bahwa pedagang dan pekerja yang jujur lagi amanah akan bersama para nabi, shiddiqin, dan syuhada.',
      dalil: 'Q.S. At-Taubah/9: 105 (Etos Kerja) & Q.S. Al-Baqarah/2: 188 (Larangan memakan harta secara batil)',
    },
    {
      elemen: 'Fikih',
      indikatorTopik: 'menganalisis keabsahan transaksi lokapasar (e-commerce) pre-order, dropship, dan mystery box',
      cpRingkas: 'Murid mengevaluasi transaksi ekonomi digital modern berdasarkan rukun, syarat akad, dan maqashid syariah.',
      stimulus:
        'Sebuah artikel berita ekonomi memberitakan maraknya tren belanja daring di kalangan remaja, mulai dari pemesanan sepatu lokal sistem pre-order dengan spesifikasi lengkap, penjualan sistem dropship resmi, hingga pembelian kotak kejutan (mystery box) seharga Rp100.000,00 yang isinya sama sekali dirahasiakan oleh penjual.',
      pertanyaanPG: 'Berdasarkan kajian fikih muamalah, alasan transaksi pembelian kotak kejutan (mystery box) tersebut dilarang adalah ....',
      opsiPG: {
        A: 'Mengandung unsur gharar (ketidakjelasan objek akad) dan maisir (untung-untungan) yang merugikan salah satu pihak',
        B: 'Pembayaran dilakukan menggunakan dompet digital tanpa menyerahkan uang kertas secara tunai',
        C: 'Barang dikirim melalui jasa kurir ekspedisi sehingga pembeli tidak bertemu langsung dengan pemilik toko',
        D: 'Harga kotak kejutan ditetapkan dalam mata uang rupiah dan bukan menggunakan takaran dinar emas',
        E: 'Penjual mengambil keuntungan dari selisih harga modal produksi dengan harga jual kepada konsumen',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua praktik bisnis digital di bawah ini yang memenuhi rukun dan syarat sah akad muamalah dalam Islam!',
      opsiPGK: {
        A: 'Menjual produk kerajinan secara pre-order (akad salam) dengan rincian ukuran, bahan, harga, dan tanggal kirim yang jelas',
        B: 'Menjalankan usaha dropship atas izin resmi produsen pemilik barang (akad wakalah) dengan deskripsi produk yang jujur',
        C: 'Membuat ratusan pesanan dan ulasan palsu menggunakan akun bayangan (fake order) untuk mengelabui calon pembeli',
        D: 'Menjual barang dengan foto produk asli milik toko lain tetapi mengirimkan barang tiruan berkualitas rendah',
        E: 'Menawarkan kupon undian berbayar yang hadiahnya tidak pasti dan uang peserta hangus jika tidak beruntung',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Ijab dan kabul dalam transaksi belanja daring sah dilakukan melalui tombol persetujuan aplikasi elektronik.', jawaban: 'Benar' },
        { pernyataan: 'Hak pembeli untuk membatalkan atau menukar barang yang cacat/tidak sesuai deskripsi disebut khiyar \'aib.', jawaban: 'Benar' },
        { pernyataan: 'Menyembunyikan cacat barang dagangan saat berjualan daring diperbolehkan agar barang cepat laku.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Ketidakjelasan spesifikasi barang atau harga dalam transaksi jual beli', respon: 'Gharar' },
        { premis: 'Jual beli pesanan dengan spesifikasi jelas dan pembayaran di muka', respon: 'Akad Salam' },
        { premis: 'Hak memilih bagi penjual dan pembeli untuk melanjutkan atau membatalkan akad', respon: 'Khiyar' },
      ],
      pertanyaanIsian:
        'Hak pembeli dalam transaksi jual beli (termasuk belanja daring) untuk mengembalikan barang atau meminta ganti rugi karena terdapat cacat tersembunyi yang tidak dijelaskan penjual disebut khiyar ....................................................',
      kunciIsian: '\'aib (khiyar aib)',
      pertanyaanUraian:
        'Jelaskan syarat-syarat agar bisnis penjualan daring dengan sistem pre-order (akad salam) yang dijalankan oleh wirausahawan muda muslim dinyatakan sah menurut fikih muamalah!',
      kunciUraian:
        '1. Objek barang pesanan harus dijelaskan spesifikasinya secara terang (jenis, bahan, ukuran, warna, jumlah) sehingga bebas dari gharar.\n2. Harga barang dan waktu serta tempat pengiriman/penyerahan barang disepakati secara pasti di awal akad.\n3. Penjual amanah memenuhi pesanan tepat waktu dan memberikan hak komplain (khiyar) jika barang cacat.',
      pembahasan:
        'Dalam fikih muamalah, prinsip dasar transaksi adalah boleh selama tidak mengandung unsur yang diharamkan seperti riba, gharar (ketidakpastian objek seperti mystery box), tadlis (penipuan deskripsi/fake review), dan maisir (perjudian).',
      dalil: 'Q.S. An-Nisa\'/4: 29 ("Janganlah kamu memakan harta sesamamu dengan jalan yang batil, kecuali dengan jalan perniagaan atas dasar suka sama suka...") & Hadis Larangan Jual Beli Gharar (HR. Muslim)',
    },
    {
      elemen: 'Al-Qur\'an dan Hadis',
      indikatorTopik: 'menganalisis sikap moderat dan toleransi dalam masyarakat majemuk berdasarkan Q.S. Al-Maidah: 48 dan Al-Kafirun',
      cpRingkas: 'Murid menganalisis dalil naqli tentang kompetisi dalam kebaikan (fastabiqul khairat) dan toleransi masyarakat majemuk.',
      stimulus:
        'Di sebuah kompleks perumahan kota, panitia karang taruna yang beranggotakan pemuda dari berbagai latar belakang agama merancang program beasiswa bimbingan belajar gratis dan bank sampah terpadu. Sebagian warga mempertanyakan apakah pemuda muslim boleh bekerja sama dengan pemuda nonmuslim dalam mengelola program sosial lingkungan tersebut.',
      pertanyaanPG: 'Berdasarkan prinsip muamalah dan moderasi beragama, kesimpulan hukum dan sikap yang paling tepat adalah ....',
      opsiPG: {
        A: 'Boleh dan dianjurkan bekerja sama dalam kebaikan sosial kemasyarakatan selama tidak menyangkut ritual akidah dan ibadah mahdhah',
        B: 'Dilarang bekerja sama dalam seluruh urusan pengelolaan lingkungan apabila anggotanya berbeda keyakinan agama',
        C: 'Wajib menggabungkan doa dan tata cara peribadatan seluruh agama secara bergantian di setiap pembukaan rapat',
        D: 'Pemuda muslim harus memisahkan diri dan membuat bank sampah khusus yang hanya melayani satu kelompok saja',
        E: 'Kegiatan sosial masyarakat baru boleh diikuti apabila seluruh warga perumahan sudah memiliki pandangan politik yang sama',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua wujud nyata perilaku berlomba-lomba dalam kebaikan (fastabiqul khairat) sesuai Q.S. Al-Ma\'idah ayat 48 bagi pelajar kelas 12!',
      opsiPGK: {
        A: 'Menciptakan inovasi teknologi tepat guna bersama rekan lintas daerah untuk membantu petani dan pelaku usaha kecil',
        B: 'Aktif menjadi relawan kemanusiaan dan menjaga kelestarian lingkungan sekolah serta masyarakat sekitar',
        C: 'Bersaing menjatuhkan reputasi sekolah lain di media sosial demi meraih gelar juara umum perlombaan',
        D: 'Menolak berbagi ilmu dan buku catatan kepada teman sekelas agar nilai peringkat rapor tidak tersaingi',
        E: 'Memaksakan pendapat kelompok sendiri dalam rapat organisasi dengan cara mengintimidasi peserta lain',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Dalam urusan akidah dan ibadah mahdhah berlaku prinsip "Untukmu agamamu, dan untukkulah agamaku".', jawaban: 'Benar' },
        { pernyataan: 'Dalam urusan muamalah dan kemanusiaan, umat Islam diperintahkan berbuat adil dan bekerja sama dalam kebajikan.', jawaban: 'Benar' },
        { pernyataan: 'Sikap ekstrem yang mudah menyalahkan dan mengafirkan sesama muslim mencerminkan ajaran ummatan wasathan.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Perintah berlomba-lomba dalam berbuat kebaikan di tengah keragaman', respon: 'Fastabiqul Khairat (Q.S. Al-Ma\'idah: 48)' },
        { premis: 'Umat pertengahan yang adil, moderat, dan menjadi teladan kebaikan', respon: 'Ummatan Wasathan (Q.S. Al-Baqarah: 143)' },
        { premis: 'Persaudaraan sesama warga sebangsa dan setanah air Indonesia', respon: 'Ukhuwah Wathaniyah' },
      ],
      pertanyaanIsian:
        'Persaudaraan yang terjalin antar-sesama umat manusia di seluruh dunia tanpa memandang perbedaan agama, ras, maupun bangsa disebut ukhuwah ....................................................',
      kunciIsian: 'basyariyah (insaniyah)',
      pertanyaanUraian:
        'Jelaskan bagaimana cara menerapkan keseimbangan antara keteguhan menjaga akidah (Q.S. Al-Kafirun: 6) dengan semangat berlomba dalam kebaikan sosial (Q.S. Al-Ma\'idah: 48) ketika kamu kelak kuliah atau bekerja di lingkungan yang majemuk!',
      kunciUraian:
        '1. Dalam ranah akidah dan ibadah mahdhah (seperti salat, puasa, keyakinan tauhid), kita memegang teguh prinsip "Lakum dinukum waliya din" tanpa mencampuradukkan ritual agama.\n2. Dalam ranah muamalah, profesi, riset ilmiah, dan aksi sosial kemanusiaan, kita bekerja sama secara adil, santun, dan profesional bersama seluruh rekan kerja untuk memberi manfaat terbaik (fastabiqul khairat).',
      pembahasan:
        'Islam membedakan secara jernih antara ranah akidah/ibadah mahdhah (yang bersifat tegas dan tidak dapat dicampuradukkan) dengan ranah muamalah sosial (yang terbuka untuk kolaborasi kebajikan dan keadilan bersama seluruh warga bangsa).',
      dalil: 'Q.S. Al-Ma\'idah/5: 48 (Fastabiqul Khairat), Q.S. Al-Mumtahanah/60: 8 & Q.S. Al-Kafirun/109: 6',
    },
    {
      elemen: 'Akidah',
      indikatorTopik: 'menganalisis sikap menghindari sifat munafik, keras hati, dan riya dalam kehidupan modern',
      cpRingkas: 'Murid menganalisis bahaya penyakit hati (munafik, riya, sum\'ah, dan takabur) serta cara mengobatinya.',
      stimulus:
        'Seorang kreator konten muda mendokumentasikan kegiatan pembagian paket sembako kepada seorang lansia di pinggir jalan. Namun, setelah kamera dimatikan dan video selesai direkam untuk kebutuhan sponsor, ia meminta kembali sebagian isi paket sembako tersebut dan berbicara dengan nada kasar kepada lansia itu.',
      pertanyaanPG: 'Berdasarkan ajaran akhlak dan akidah Islam, perbuatan kreator konten tersebut sangat tercela karena menggabungkan sifat ....',
      opsiPG: {
        A: 'Riya (pamer amal demi pujian/keuntungan duniawi) dan menyakiti perasaan penerima sedekah (al-mann wa al-adza)',
        B: 'Tawadhu (rendah hati) dan zuhud dalam mengelola harta benda titipan Allah Swt. di ruang publik',
        C: 'Tasamuh (toleransi) dan syaja\'ah (keberanian membela kebenaran) di hadapan para penonton media sosial',
        D: 'Qana\'ah (merasa cukup) dan ikhlas karena ingin menginspirasi penonton lain agar ikut bersedekah',
        E: 'Iffah (menjaga kehormatan diri) dan amanah dalam menyalurkan dana bantuan dari pihak sponsor',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua adab bersedekah dan berbagi di era digital agar amal kebaikan tetap bernilai pahala di sisi Allah Swt.!',
      opsiPGK: {
        A: 'Menjaga kehormatan dan privasi penerima bantuan dengan tidak memperlihatkan wajah atau kesedihannya untuk konten',
        B: 'Meluruskan niat semata-mata mengharap rida Allah Swt. dan menyerahkan bantuan secara utuh dengan bahasa santun',
        C: 'Menyebut-nyebut jumlah uang yang telah diberikan di setiap kolom komentar agar penerima selalu merasa berutang budi',
        D: 'Hanya mau memberikan pertolongan apabila ada wartawan atau kamera yang meliput kegiatan tersebut secara langsung',
        E: 'Membatalkan pemberian bantuan sedekah apabila jumlah penonton video di media sosial tidak mencapai target',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Q.S. Al-Baqarah ayat 264 mengumpamakan sedekah yang disertai riya dan menyakiti hati penerima seperti batu licin yang ditimpa hujan lebat.', jawaban: 'Benar' },
        { pernyataan: 'Publikasi laporan penyaluran dana lembaga zakat resmi diperbolehkan sebagai bentuk transparansi amanah publik.', jawaban: 'Benar' },
        { pernyataan: 'Mengungkit-ungkit pemberian di depan umum dapat menambah pahala sedekah berkali-kali lipat.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Melakukan amal ibadah dengan tujuan ingin dilihat dan dipuji manusia', respon: 'Riya' },
        { premis: 'Menceritakan amal kebaikan agar didengar dan dikagumi orang lain', respon: 'Sum\'ah' },
        { premis: 'Menyebut-nyebut pemberian dan menyakiti perasaan penerima sedekah', respon: 'Al-Mann wa al-Adza' },
      ],
      pertanyaanIsian:
        'Perbuatan memperlihatkan amal ibadah atau sedekah dengan tujuan semata-mata mencari pujian dan sanjungan manusia sehingga merusak kemurnian niat disebut ....................................................',
      kunciIsian: 'riya',
      pertanyaanUraian:
        'Jelaskan perbedaan antara "mempublikasikan kegiatan sosial untuk transparansi lembaga/menginspirasi kebaikan" dengan "riya yang membatalkan pahala sedekah" menurut tuntunan Islam!',
      kunciUraian:
        '1. Publikasi yang dibenarkan (transparansi & syiar kebaikan): Dilakukan dengan niat pertanggungjawaban amanah donatur atau mengajak masyarakat berbuat baik, tetap menjaga martabat penerima (tidak mempermalukan), dan memberikan bantuan secara tulus.\n2. Riya yang membatalkan pahala: Niat utamanya semata-mata mencari pujian/ketenaran pribadi, mengeksploitasi kesedihan penerima, atau disertai sikap mengungkit-ungkit dan menyakiti hati penerima (Q.S. Al-Baqarah: 264).',
      pembahasan:
        'Q.S. Al-Baqarah/2: 264 memperingatkan umat Islam agar tidak merusak pahala sedekah dengan al-mann (menyebut-nyebut pemberian), al-adza (menyakiti perasaan penerima), dan riya (pamer).',
      dalil: 'Q.S. Al-Baqarah/2: 264 — Larangan Merusak Pahala Sedekah dengan Riya dan Menyakiti Penerima',
    },
    {
      elemen: 'Sejarah Peradaban Islam (SPI)',
      indikatorTopik: 'menganalisis peran organisasi Islam dan ulama Nusantara dalam memperjuangkan kemerdekaan serta menjaga keutuhan NKRI',
      cpRingkas: 'Murid menganalisis kontribusi ulama dan organisasi Islam Indonesia dalam merumuskan kebangsaan yang inklusif.',
      stimulus:
        'Pada sidang perumusan dasar negara tahun 1945, para tokoh ulama dan pemimpin bangsa seperti KH. Abdul Wahid Hasyim, Ki Bagus Hadikusumo, dan Kasman Singodimedjo dengan jiwa besar menyepakati sila pertama Pancasila menjadi "Ketuhanan Yang Maha Esa" demi menjaga persatuan seluruh rakyat Indonesia dari Sabang sampai Merauke yang majemuk.',
      pertanyaanPG: 'Keputusan bersejarah para tokoh ulama bangsa tersebut membuktikan bahwa pandangan Islam di Indonesia mengedepankan prinsip ....',
      opsiPG: {
        A: 'Muwathanah (komitmen kebangsaan) dan persaudaraan sebangsa demi menjaga keutuhan negara di atas ego kelompok',
        B: 'Mengabaikan nilai-nilai ketuhanan demi mengikuti sistem pemerintahan sekuler bangsa penjajah',
        C: 'Mengutamakan kepentingan satu golongan daerah tertentu dan mengesampingkan wilayah Indonesia timur',
        D: 'Menolak segala bentuk musyawarah nasional apabila pesertanya berasal dari latar belakang suku yang berbeda',
        E: 'Memisahkan tanggung jawab bela negara dari kewajiban keagamaan seorang warga negara muslim',
      },
      kunciPG: 'A',
      pertanyaanPGK: 'Pilihlah dua kontribusi nyata ulama, pesantren, dan organisasi Islam (seperti Muhammadiyah dan Nahdlatul Ulama) bagi kemajuan bangsa Indonesia!',
      opsiPGK: {
        A: 'Mendirikan ribuan sekolah, madrasah, perguruan tinggi, dan rumah sakit yang melayani masyarakat luas',
        B: 'Menggerakkan perjuangan mempertahankan kemerdekaan (seperti Resolusi Jihad) serta merawat kerukunan nasional',
        C: 'Melarang generasi muda mempelajari ilmu pengetahuan modern seperti kedokteran dan teknik rekayasa',
        D: 'Membatasi pelayanan kesehatan rumah sakit Islam hanya untuk warga dari satu suku bangsa saja',
        E: 'Menolak penggunaan bahasa Indonesia sebagai bahasa persatuan dalam kegiatan pendidikan nasional',
      },
      kunciPGK: 'A dan B',
      pernyataanBS: [
        { pernyataan: 'Pancasila dan UUD 1945 sebagai kesepakatan luhur bangsa (darul \'ahdi wa asy-syahadah) selaras dengan nilai-nilai ajaran Islam.', jawaban: 'Benar' },
        { pernyataan: 'Mencintai tanah air, mematuhi hukum yang adil, dan menjaga kerukunan bangsa merupakan bagian dari pengamalan agama.', jawaban: 'Benar' },
        { pernyataan: 'Seorang muslim yang taat harus menolak bekerja sama membangun desa dengan warga yang berbeda suku.', jawaban: 'Salah' },
      ],
      pasanganMenjodohkan: [
        { premis: 'Pendiri organisasi Muhammadiyah di Yogyakarta pada tahun 1912', respon: 'KH. Ahmad Dahlan' },
        { premis: 'Pendiri organisasi Nahdlatul Ulama di Surabaya pada tahun 1926', respon: 'KH. Hasyim Asy\'ari' },
        { premis: 'Sikap cinta tanah air dan menjaga komitmen persatuan kebangsaan', respon: 'Muwathanah' },
      ],
      pertanyaanIsian:
        'Prinsip moderasi beragama yang menegaskan keselarasan antara ketaatan beragama dengan rasa cinta tanah air serta kesetiaan menjaga keutuhan Negara Kesatuan Republik Indonesia disebut ....................................................',
      kunciIsian: 'muwathanah (komitmen kebangsaan)',
      pertanyaanUraian:
        'Mengapa para ulama pendiri bangsa menyebut Negara Kesatuan Republik Indonesia yang berdasarkan Pancasila sebagai kesepakatan luhur bersama yang wajib dijaga oleh umat Islam? Jelaskan disertai 2 wujud pengamalannya bagi pelajar!',
      kunciUraian:
        '1. Alasan: Karena Pancasila dirumuskan melalui musyawarah para pendiri bangsa (termasuk para ulama) yang sejalan dengan nilai tauhid, kemanusiaan, persatuan, musyawarah, dan keadilan sosial sebagaimana teladan Piagam Madinah.\n2. Wujud pengamalan pelajar: (a) Belajar dengan tekun dan berprestasi mengharumkan nama bangsa; (b) Menjaga toleransi, mematuhi aturan hukum, dan menolak provokasi perpecahan.',
      pembahasan:
        'Keteladanan para ulama bangsa dalam merumuskan Pancasila menunjukkan harmoni antara keislaman dan keindonesiaan (ukhuwah islamiyah, ukhuwah wathaniyah, dan ukhuwah basyariyah).',
      dalil: 'Q.S. Al-Hujurat/49: 13, Piagam Madinah & Prinsip Muwathanah',
    },
  ],
};

/**
 * Selects a distinct, age-appropriate narrative seed for a given Fase, Elemen, and Question Number,
 * WITHOUT ever prepending any static prefix or template sentence to the stimulus.
 */
export function selectDistinctNarrativeSeed(
  fase: FaseCode,
  preferredElemen: ElemenPAI,
  questionIndex: number,
  usedStimuli: Set<string>
): NarrativeSeed {
  const bank = FASE_NARRATIVE_BANK[fase];
  const matchingElemenUnused = bank.filter(
    (s) => s.elemen === preferredElemen && !usedStimuli.has(s.stimulus)
  );
  if (matchingElemenUnused.length > 0) {
    const chosen = matchingElemenUnused[questionIndex % matchingElemenUnused.length];
    usedStimuli.add(chosen.stimulus);
    return chosen;
  }

  const anyUnusedInFase = bank.filter((s) => !usedStimuli.has(s.stimulus));
  if (anyUnusedInFase.length > 0) {
    const chosen = anyUnusedInFase[questionIndex % anyUnusedInFase.length];
    usedStimuli.add(chosen.stimulus);
    return chosen;
  }

  // Fallback across all phases without ever adding any static template prefix
  const allSeeds = Object.values(FASE_NARRATIVE_BANK).flat();
  const anyUnusedGlobal = allSeeds.filter((s) => !usedStimuli.has(s.stimulus));
  if (anyUnusedGlobal.length > 0) {
    const chosen = anyUnusedGlobal[questionIndex % anyUnusedGlobal.length];
    usedStimuli.add(chosen.stimulus);
    return chosen;
  }

  const base = bank[questionIndex % bank.length];
  return { ...base };
}

