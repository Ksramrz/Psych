import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { exportUserData } from '../services/storage/dataManager.js';

const router = Router();

// Export user data as PDF (placeholder - implement PDF generation)
router.get('/pdf', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await exportUserData(user.id);
    
    // In production, use a PDF library like pdfkit or puppeteer
    // For now, return JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=clinicsense-export-${Date.now()}.json`);
    res.json(data);
  } catch (error: any) {
    console.error('Export PDF error:', error);
    res.status(500).json({ error: 'Failed to export PDF' });
  }
});

// Export user data as text
router.get('/text', requireAuth, async (req: AuthenticatedRequest, res): Promise<void> => {
  try {
    const { userId, user } = req;
    if (!userId || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await exportUserData(user.id);
    
    // Format as readable text
    let text = 'ClinicSense Data Export\n';
    text += `Exported: ${data.exportedAt}\n\n`;
    
    text += `=== Cases (${data.cases.length}) ===\n`;
    data.cases.forEach((c: any, i: number) => {
      text += `${i + 1}. ${c.title}\n`;
      text += `   Created: ${c.created_at}\n\n`;
    });
    
    text += `=== Session Notes (${data.notes.length}) ===\n`;
    data.notes.forEach((n: any, i: number) => {
      text += `${i + 1}. Note from ${n.created_at}\n\n`;
    });
    
    text += `=== Ethics Checks (${data.ethicsChecks.length}) ===\n`;
    data.ethicsChecks.forEach((e: any, i: number) => {
      text += `${i + 1}. ${e.question.substring(0, 50)}...\n`;
      text += `   Risk: ${e.risk_level}\n\n`;
    });
    
    text += `=== Reflections (${data.reflections.length}) ===\n`;
    data.reflections.forEach((r: any, i: number) => {
      text += `${i + 1}. Reflection from ${r.created_at}\n\n`;
    });

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=clinicsense-export-${Date.now()}.txt`);
    res.send(text);
  } catch (error: any) {
    console.error('Export text error:', error);
    res.status(500).json({ error: 'Failed to export text' });
  }
});

export default router;

