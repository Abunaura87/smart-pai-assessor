import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { AssessmentPackage, AssessmentParameters } from './src/types/assessment';
import {
  calculateDifficultyAllocation,
  getFaseProfile,
  validateAssessmentPackage,
} from './src/utils/paiRules';
import { buildCustomFallbackPackage } from './src/data/presetPackages';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `Anda adalah "Smart PAI Assessor", asisten AI pakar asesmen dan perancangan evaluasi pembelajaran Pendidikan Agama Islam dan Budi Pekerti (PAIBP) untuk seluruh jenjang (SD/MI, SMP/MTs, SMA/SMK/MA). Anda menguasai secara presisi regulasi Capaian Pembelajaran (CP) PAIBP terbaru (Kepka Nomor 020 Tahun 2026 / Kurikulum Merdeka), kaidah Taksonomi Bloom yang disempurnakan, serta pola penulisan soal standar KKG/MGMP PAI dan Kementerian Agama RI.

LANDASAN MATERI (5 ELEMEN PAI & 5 DIMENSI CINTA CP 020 TAHUN 2026):
1. Al-Qur'an dan Hadis (Cinta Allah, Rasul-Nya, dan Cinta Ilmu)
2. Akidah (Menanamkan pilar keimanan yang mendorong amal saleh)
3. Akhlak (Makarim al-akhlaq, adab terhadap sesama, moderasi/al-samhah, anti-perundungan)
4. Fikih (Ibadah dan muamalah sosial, thaharah, zakat, puasa, halal-haram)
5. Sejarah Peradaban Islam/SPI (Ibrah keteladanan Nabi, Khulafaurrasyidin, dan cinta tanah air)

ATURAN WAJIB (WORKFLOW & STRICT OPERATIONAL RULES):
1. BLUEPRINT FIRST (ATURAN KISI-KISI 9 KOLOM RESMI):
   - Susun tabel Matriks Kisi-Kisi Asesmen terlebih dahulu (No, Elemen, Tujuan Pembelajaran, Kelas/Smt, Materi Pokok, Level Kognitif L1/L2/L3, Indikator Soal Rumusan ABCD, Bentuk Soal, No. Soal).
   - Setiap butir soal WAJIB berakar langsung 1-ke-1 dari indikator soal (Rumusan ABCD: Audience, Behavior, Condition, Degree) pada tabel kisi-kisi.
   - Gunakan istilah "Murid" (atau "murid") untuk menggantikan kata "Peserta Didik" di seluruh bagian dokumen.

2. ATURAN GAYA BAHASA & STIMULUS SESUAI FASE / USIA MURID (STRICT ANTI-ROBOTIC):
   DILARANG KERAS menggunakan kalimat template berulang atau bahasa akademis abstrak (seperti: "Dalam kehidupan masyarakat modern yang majemuk...", "pemahaman yang komprehensif...", "mengamalkan prinsip materi...")!
   - FASE A (Kelas 1–2 SD/MI | Usia 6–8 Tahun):
     * Kalimat sangat pendek (5–8 kata per kalimat). Kosakata konkret, hangat, seputar rumah, keluarga, dan teman bermain.
     * Stimulus: Cerita mini 1–2 kalimat atau situasi langsung.
     * Pilihan: 3 Opsi (A, B, C) berupa tindakan nyata harian.
   - FASE B (Kelas 3–4 SD/MI | Usia 8–10 Tahun):
     * Bahasa cerita mengalir (storytelling). Konteks sekolah, musala, adab berteman, toleransi di kelas.
     * Stimulus: Percakapan ringkas, tabel pasangan arti Asmaul Husna sederhana, potongan ayat pendek bergaris bawah.
     * Pilihan: 4 Opsi (A, B, C, D).
   - FASE C (Kelas 5–6 SD/MI | Usia 10–12 Tahun):
     * Bahasa naratif komunikatif pra-remaja. Mengangkat isu nyata: menghargai teman beda suku/agama saat kerja kelompok, peduli sampah di sekolah, kejujuran saat ulangan, perhitungan praktis zakat, tanda-tanda balig.
     * Stimulus Wajib Bervariasi Antar-Nomor:
       - Model A: Penggalan ayat/hadis yang digarisbawahi untuk diartikan/dilengkapi.
       - Model B: Narasi studi kasus anak sehari-hari.
       - Model C: Tabel pencocokan/pasangan (misal: Asmaul Husna Al-Qayyum, Al-Qawiyyu, Al-Muhyi dengan perilaku sehari-hari).
       - Model D: Daftar pernyataan berangka (1), (2), (3), (4) untuk dianalisis.
     * Pilihan: 4 Opsi (A, B, C, D) yang homogen dan logis.
   - FASE D (Kelas 7–9 SMP/MTs | Usia 13–15 Tahun):
     * Bahasa remaja yang kritis, santun, dan reflektif.
     * Stimulus: Kasus etika pergaulan dan media sosial (tabayyun terhadap berita hoaks, cyberbullying), studi kasus rukhsah ibadah, moderasi beragama, serta sejarah ilmuwan Islam masa keemasan.
     * Pilihan: 4 Opsi (A, B, C, D) atau AKM (Pilihan Ganda Kompleks).
   - FASE E & F (Kelas 10–12 SMA/SMK/MA | Usia 16–18 Tahun):
     * Bahasa analitis-kontekstual (HOTS C4–C6).
     * Stimulus: Kutipan fenomena aktual/berita faktual, problematika fikih kontemporer (transaksi online/e-commerce, asuransi syariah, etika profesi/kerja, pernikahan, waris, hingga isu medis/bioteknologi), serta peran Islam dalam menjaga keutuhan bangsa dan peradaban global.
     * Pilihan: 5 Opsi (A, B, C, D, E).`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  app.post('/api/assess/generate', async (req, res) => {
    try {
      const params: AssessmentParameters = req.body.parameters;
      if (!params || !params.fase || !params.topikMateri) {
        res.status(400).json({ error: 'Parameter asesmen (Fase dan Topik Materi) wajib diisi.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        // Use deterministic curriculum engine when API key is not configured
        const fallbackPkg = buildCustomFallbackPackage(params);
        res.json({ package: fallbackPkg, source: 'curriculum-engine' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const profile = getFaseProfile(params.fase);
      const activeShapes = params.bentukSoalCounts.filter((c) => c.jumlah > 0);
      const totalSoal = activeShapes.reduce((a, b) => a + b.jumlah, 0);
      const diffAlloc = calculateDifficultyAllocation(totalSoal, params.komposisiKesulitan);

      const prompt = `Susunlah paket lengkap Instrumen Asesmen PAIBP sesuai Regulasi CP PAIBP Terbaru (Kepka Nomor 020 Tahun 2026 / Kurikulum Merdeka) dan Standar KKG/MGMP PAI (5 Bagian Resmi: Kisi-Kisi Penulisan Soal 9 Kolom, Naskah Soal Siap Cetak, Kartu Soal, Kunci Jawaban & Pembahasan Lengkap, serta Rubrik Penilaian Skor 1-4) berdasarkan parameter berikut:
- Jenjang & Fase: ${params.jenjang} / ${params.fase} (${params.kelas})
- Karakteristik Fase: ${profile.karakteristik}
- Jumlah Opsi Pilihan Ganda Wajib: ${profile.optionCount} opsi (${profile.optionLabels.join(', ')})
- Elemen PAI: ${params.elemen.join(', ')}
- Jenis Ujian: ${params.jenisUjian}
- Topik / Materi Spesifik: ${params.topikMateri}
- Capaian Pembelajaran: ${params.capaianPembelajaranOpsional || 'Sesuaikan dengan CP PAIBP Kepka Nomor 020 Tahun 2026 pada Fase ini'}
- Fokus Insersi Moderasi Beragama: ${params.nilaiModerasiFokus}
- Rincian Bentuk & Jumlah Soal (Total ${totalSoal} soal): ${activeShapes
        .map((s) => `${s.bentuk}: ${s.jumlah} butir`)
        .join(', ')}
- Alokasi Level Kognitif (Total ${totalSoal} soal): L1 (Mudah) = ${diffAlloc.countL1} soal, L2 (Sedang) = ${
        diffAlloc.countL2
      } soal, L3 (HOTS) = ${diffAlloc.countL3} soal. Urutan level per nomor: ${diffAlloc.sequence.join(', ')}.

Pastikan:
1. Jumlah baris pada 'kisiKisi' SAMA PERSIS dengan jumlah 'butirSoal' (${totalSoal} butir) dan nomornya berurutan 1 sampai ${totalSoal}. Sertakan 'kelasSmt' dan 'materiPokok' pada setiap baris 'kisiKisi'.
2. Setiap 'indikatorSoalABCD' memuat unsur Audience ("murid"), Behavior, Condition, dan Degree secara eksplisit.
3. ZERO-BOILERPLATE & ANTI-ROBOTIK: Setiap nomor soal WAJIB memiliki cerita 'stimulus' yang UNIK dan bervariasi modelnya. DILARANG menyebutkan judul topik ("${params.topikMateri}"), nama elemen, atau nama kurikulum di dalam teks cerita stimulus.
4. Sesuaikan gaya bahasa dan psikologi usia murid ${params.fase} (${params.kelas}): ${profile.stimulusStyle}
5. Untuk soal Pilihan Ganda pada ${params.fase}, sediakan tepat ${profile.optionCount} opsi (${profile.optionLabels.join(
        ', '
      )}) berupa tindakan konkret atau kesimpulan langsung (bukan pengulangan judul topik).
6. Untuk soal Pilihan Ganda Kompleks, beri instruksiKhusus "Pilihlah dua jawaban yang benar!".
7. Sertakan rubrik analitik (Skor 1-4) di 'pedomanPenskoran.rubrikAnalitik'.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              judulAsesmen: { type: Type.STRING },
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
                    pernyataanBenarSalah: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          pernyataan: { type: Type.STRING },
                          jawaban: { type: Type.STRING },
                        },
                        required: ['pernyataan', 'jawaban'],
                      },
                    },
                    pasanganMenjodohkan: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          premis: { type: Type.STRING },
                          respon: { type: Type.STRING },
                        },
                        required: ['premis', 'respon'],
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
                    'stimulus',
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
                        skorPerSoal: { type: Type.INTEGER },
                        skorTotal: { type: Type.INTEGER },
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
                      required: ['nomorSoal', 'bentukSoal', 'aspekPenilaian', 'skorMaksimal', 'kriteriaSkor'],
                    },
                  },
                },
                required: ['bobotPerBentuk', 'rumusNilaiAkhir', 'rubrikAnalitik'],
              },
            },
            required: ['judulAsesmen', 'identitas', 'kisiKisi', 'butirSoal', 'pedomanPenskoran'],
          },
        },
      });

      const rawText = (response.text ?? '').trim();
      if (!rawText) {
        const fallbackPkg = buildCustomFallbackPackage(params);
        res.json({ package: fallbackPkg, source: 'curriculum-engine' });
        return;
      }

      const parsed = JSON.parse(rawText);
      const generatedPackage: AssessmentPackage = {
        id: `ai-${Date.now()}`,
        judulAsesmen: parsed.judulAsesmen,
        createdAt: new Date().toISOString().slice(0, 10),
        parameters: params,
        identitas: {
          ...parsed.identitas,
          jenisAsesmen: params.jenisUjian,
        },
        kisiKisi: parsed.kisiKisi,
        butirSoal: parsed.butirSoal,
        pedomanPenskoran: parsed.pedomanPenskoran,
      };

      const validation = validateAssessmentPackage(generatedPackage);
      if (!validation.isValid) {
        const fallbackPkg = buildCustomFallbackPackage(params);
        res.json({ package: fallbackPkg, source: 'curriculum-engine-validated' });
        return;
      }

      res.json({ package: generatedPackage, source: 'gemini-ai' });
    } catch (error: unknown) {
      console.error('Error generating PAIBP assessment:', error);
      // Graceful fallback to deterministic curriculum builder if API quota or key error occurs
      if (req.body?.parameters) {
        const fallbackPkg = buildCustomFallbackPackage(req.body.parameters);
        res.json({
          package: fallbackPkg,
          source: 'curriculum-engine-fallback',
          warning:
            error instanceof Error
              ? `Menggunakan mesin kurikulum terstruktur (${error.message})`
              : 'Menggunakan mesin kurikulum terstruktur',
        });
        return;
      }
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Gagal menyusun instrumen asesmen PAIBP.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart PAI Assessor server running on http://localhost:${PORT}`);
  });
}

startServer();
