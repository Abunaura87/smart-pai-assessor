import { GoogleGenAI, Type } from '@google/genai';
import {
  AssessmentPackage,
  AssessmentParameters,
  BlueprintRow,
  QuestionItem,
} from '../types/assessment';
import { buildCustomFallbackPackage } from '../data/presetPackages';
import { calculateDifficultyAllocation, getFaseProfile } from '../utils/paiRules';

export const SYSTEM_INSTRUCTION = `Anda adalah "Smart PAI Assessor", asisten AI pakar asesmen dan perancangan evaluasi pembelajaran Pendidikan Agama Islam dan Budi Pekerti (PAIBP) untuk seluruh jenjang (SD/MI, SMP/MTs, SMA/SMK/MA).
Anda menguasai secara presisi regulasi Capaian Pembelajaran (CP) PAIBP terbaru (Kepka Nomor 020 Tahun 2026 / Kurikulum Merdeka), kaidah Taksonomi Bloom yang disempurnakan, serta pola penulisan soal standar KKG/MGMP PAI dan Kementerian Agama RI.
Gunakan selalu istilah "Murid" untuk menggantikan kata "Peserta Didik" atau "Siswa" di seluruh bagian dokumen.

LANDASAN MATERI (5 ELEMEN PAI & 5 DIMENSI CINTA CP 020 TAHUN 2026):
1. Al-Qur'an dan Hadis (Cinta Allah, Rasul-Nya, dan Cinta Ilmu)
2. Akidah (Menanamkan pilar keimanan yang mendorong amal saleh)
3. Akhlak (Makarim al-akhlaq, adab terhadap sesama, moderasi/al-samhah, anti-perundungan)
4. Fikih (Ibadah dan muamalah sosial, thaharah, zakat, puasa, halal-haram)
5. Sejarah Peradaban Islam/SPI (Ibrah keteladanan Nabi, Khulafaurrasyidin, dan cinta tanah air)

ATURAN VARIASI STIMULUS & FORMAT SOAL (TANPA AWALAN MONOTON / STRICT ANTI-ROBOTIC):
1. DILARANG KERAS menyalin atau mengulang kalimat pembuka yang sama antar nomor soal (seperti "Saat akhir pekan di lingkungan rumah, ... mengalami peristiwa serupa:").
2. Setiap nomor soal WAJIB memiliki bentuk pembuka yang langsung to-the-point dan bervariasi:
   - Stimulus Ayat / Hadis: Langsung awali dengan "Perhatikan potongan Q.S. ... berikut!" atau "Perhatikan hadis berikut!" disertai TEKS ARAB BERHARAKAT LENGKAP (wajib ada tulisan Arab berharakat lengkap di baris tersendiri, bukan hanya transliterasi Latin).
   - Stimulus Tabel: Langsung awali dengan "Perhatikan tabel berikut!" diikuti baris tabel berformat pipa (| Kolom 1 | Kolom 2 | ... |) minimal 1 baris header dan 3 baris data.
   - Stimulus Pernyataan: Langsung awali dengan "Perhatikan beberapa pernyataan berikut!" diikuti rincian bernomor (1), (2), (3), (4) pada baris terpisah.
   - Stimulus Cerita / Kasus: Langsung masuk ke inti cerita dengan latar dan nama tokoh yang berbeda-beda di setiap nomor (di kelas, masjid, kerja kelompok, pasar, musala, atau media sosial).
3. BEDAKAN SECARA TEGAS ANTARA SOAL ISIAN SINGKAT DAN SOAL URAIAN / ESSAY:
   - Soal Isian Singkat: Kalimat pernyataan yang diakhiri titik-titik (....) untuk jawaban pendek (1–3 kata).
   - Soal Uraian / Essay: WAJIB menggunakan kalimat perintah/tanya terbuka yang menuntut penjelasan, rincian, atau analisis (Contoh: "Jelaskan 3 hikmah...", "Bagaimana sikap yang seharusnya dilakukan...", "Tuliskan arti dari potongan ayat...", "Hitunglah jumlah zakat fitrah yang wajib dikeluarkan..."). DILARANG KERAS membuat soal Uraian berbentuk titik-titik isian singkat!

STANDAR KUALITAS OPSI JAWABAN PILIHAN GANDA:
- Panjang kalimat antar opsi (A, B, C, D / E) harus setara/homogen.
- Pengecoh (distractor) harus masuk akal dan kontekstual.
- Hindari opsi "Semua jawaban benar" atau "Semua jawaban salah".`;

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
              skorMaksimal: { type: Type.NUMBER },
              kriteriaSkor: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skor: { type: Type.NUMBER },
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
      stimulus: sanitizeMuridTerms(item.stimulus || fbItem.stimulus),
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
      kelasSmt: existingRow?.kelasSmt || profile.defaultSemester,
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

  const prompt = `Susunlah Paket Instrumen Asesmen PAIBP Lengkap (Blueprint-First) untuk parameter berikut:
- Fase & Kelas: ${parameters.fase} — ${parameters.kelas} (${parameters.jenjang})
- Karakteristik Bahasa & Psikologi Usia Murid: ${profile.karakteristik}
- Aturan Jumlah Opsi Pilihan Ganda: Wajib ${profile.optionCount} opsi (${profile.optionLabels.join(', ')})
- Elemen PAIBP: ${parameters.elemen.join(', ')}
- Jenis Asesmen: ${parameters.jenisUjian}
- Topik / Materi Spesifik: ${parameters.topikMateri}
- Capaian Pembelajaran / TP: ${parameters.capaianPembelajaranOpsional || 'Sesuaikan dengan CP PAIBP Kepka Nomor 020 Tahun 2026'}
- Fokus Nilai Moderasi Beragama: ${parameters.nilaiModerasiFokus}
- Rincian Bentuk & Jumlah Soal (Total ${totalQuestions} butir):
${activeForms.map((f) => `  * ${f.bentuk}: ${f.jumlah} butir`).join('\n')}
- Alokasi Level Kognitif:
  * L1 (Mudah): ${diffAlloc.countL1} soal
  * L2 (Sedang): ${diffAlloc.countL2} soal
  * L3 (HOTS): ${diffAlloc.countL3} soal
  * Urutan Level per Nomor: ${diffAlloc.sequence.map((lvl, idx) => `No.${idx + 1}=${lvl}`).join(', ')}

INSTRUKSI WAJIB VARIASI STIMULUS & FORMAT SOAL:
1. Setiap nomor soal di butirSoal WAJIB memiliki stimulus yang unik dan langsung to-the-point tanpa awalan berulang:
   - Untuk soal Al-Qur'an dan Hadis: Awali dengan "Perhatikan potongan Q.S. ... berikut!" atau "Perhatikan hadis berikut!" dan WAJIB sertakan TEKS ARAB BERHARAKAT LENGKAP pada baris baru.
   - Minimal 1 soal menggunakan stimulus Tabel pipa ("Perhatikan tabel berikut!\\n| Kode | Konsep/Asmaul Husna | Contoh Perilaku |\\n| 1 | ... | ... |").
   - Minimal 1 soal menggunakan stimulus Pernyataan Berangka ("Perhatikan beberapa pernyataan berikut!\\n(1) ...\\n(2) ...\\n(3) ...\\n(4) ...").
   - Soal lainnya langsung masuk ke cerita/kasus nyata dengan nama tokoh dan latar berbeda-beda.
2. Bedakan secara tegas:
   - Jika bentukSoal = "Isian Singkat": kalimat pertanyaan diakhiri titik-titik "...." untuk jawaban singkat 1–3 kata.
   - Jika bentukSoal = "Uraian": kalimat pertanyaan berupa kalimat perintah/tanya terbuka ("Jelaskan...", "Bagaimana sikap...", "Tuliskan arti...", "Hitunglah..."), JANGAN gunakan titik-titik isian singkat.
3. Gunakan istilah "murid" (bukan "peserta didik" atau "siswa").`;

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
          temperature: 0.45,
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
