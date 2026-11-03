import type { AssessmentParameters } from '../../src/types/assessment';
import { generateAssessmentWithGemini } from '../../src/server/geminiAssessor';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const parameters = body?.parameters as AssessmentParameters | undefined;
    if (!parameters || !parameters.fase || !parameters.topikMateri) {
      res.status(400).json({ error: 'Parameter asesmen PAIBP tidak lengkap.' });
      return;
    }

    const result = await generateAssessmentWithGemini(parameters);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in /api/assess/generate:', error);
    res.status(500).json({ error: 'Gagal menyusun instrumen asesmen.' });
  }
}
