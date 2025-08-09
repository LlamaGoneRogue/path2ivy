import express from 'express';

const router = express.Router();

// Scholarship auto-matching (demo with weekly digest payload)
router.post('/match', async (req, res) => {
  try {
    const { profile = {}, limit = 10 } = req.body || {};
    const recs = [
      { id: 's1', name: 'Hispanic Scholarship Fund', amount: 5000, deadline: '2025-11-15', match: 0.92 },
      { id: 's2', name: 'Coca-Cola Scholars Program', amount: 20000, deadline: '2025-10-31', match: 0.78 },
      { id: 's3', name: 'Dell Scholars Program', amount: 20000, deadline: '2025-12-01', match: 0.88 },
    ].slice(0, Number(limit));
    const digest = {
      weekOf: new Date().toISOString().slice(0, 10),
      upcomingDeadlines: recs
        .filter((r) => true)
        .map((r) => ({ id: r.id, name: r.name, deadline: r.deadline })),
    };
    res.json({ recommendations: recs, digest });
  } catch (e) {
    res.status(500).json({ message: 'Error matching scholarships' });
  }
});

export default router;


