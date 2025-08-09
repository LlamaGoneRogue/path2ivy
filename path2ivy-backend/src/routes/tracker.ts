import express from 'express';
import ics from 'ics';

const router = express.Router();

// Application tracker endpoints (demo in-memory)
router.get('/tasks', async (_req, res) => {
  const tasks = [
    { id: 'a1', title: 'Common App personal statement', dueDate: '2025-10-01', category: 'essays', status: 'in-progress' },
    { id: 'a2', title: 'UC Application', dueDate: '2025-11-30', category: 'applications', status: 'pending' },
    { id: 'a3', title: 'FAFSA submission', dueDate: '2025-12-01', category: 'financial', status: 'pending' },
  ];
  res.json({ tasks });
});

// Export ICS calendar of deadlines
router.get('/calendar.ics', async (_req, res) => {
  const events: ics.EventAttributes[] = [
    { title: 'UC Application Deadline', description: 'Submit by 11:59pm PT', start: [2025, 11, 30, 17, 0], duration: { hours: 1 } },
    { title: 'FAFSA Opens', description: 'Prepare financial docs', start: [2025, 10, 1, 9, 0], duration: { hours: 1 } },
  ];
  ics.createEvents(events, (error, value) => {
    if (error) return res.status(500).send('Error generating calendar');
    res.setHeader('Content-Type', 'text/calendar');
    res.send(value);
  });
});

export default router;


