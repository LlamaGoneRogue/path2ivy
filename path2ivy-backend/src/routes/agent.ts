import express from 'express';

const router = express.Router();

type AgentConfig = {
  enabled: boolean;
  topics: string[]; // e.g., ['scholarships','internships','events']
  frequencyMinutes: number;
};

// In-memory demo stores
const userConfigs = new Map<string, AgentConfig>();
const userDigests = new Map<string, any>();

// SSE clients
type SSEClient = { res: express.Response; userId: string };
const sseClients: SSEClient[] = [];

// Utility to broadcast agent updates
function broadcastAgentUpdate(payload: any) {
  const data = `event: agent-update\n` + `data: ${JSON.stringify(payload)}\n\n`;
  for (const c of sseClients) {
    try { c.res.write(data); } catch {}
  }
}

// Demo scheduler: poll every 15 minutes and update digests
setInterval(async () => {
  try {
    for (const [userId, cfg] of userConfigs.entries()) {
      if (!cfg.enabled) continue;
      const port = process.env.PORT || 3002;
      let scholarships: any[] = [];
      if (cfg.topics.includes('scholarships')) {
        try {
          const resp = await fetch(`http://127.0.0.1:${port}/api/scholarships/match`, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ profile: {}, limit: 5 })
          });
          const json = await resp.json();
          scholarships = json?.recommendations || [];
        } catch {}
      }
      // Stub events/internships
      const events = cfg.topics.includes('events') ? [
        { id: 'ev1', title: 'Virtual College Fair', date: new Date(Date.now() + 7*86400000).toISOString(), link: 'https://example.com/fair' },
      ] : [];
      const internships = cfg.topics.includes('internships') ? [
        { id: 'in1', title: 'High School Research Internship', deadline: new Date(Date.now() + 21*86400000).toISOString(), link: 'https://example.com/intern' },
      ] : [];
      const digest = { generatedAt: new Date().toISOString(), scholarships, events, internships };
      userDigests.set(userId, digest);
      broadcastAgentUpdate({ userId, digest });
    }
  } catch {}
}, 15 * 60 * 1000);

// Enable or update agent config
router.post('/enable', async (req, res) => {
  const userId = (req as any).user?.userId || 'demo-user-id';
  const { topics = ['scholarships','events','internships'], frequencyMinutes = 60 } = req.body || {};
  userConfigs.set(userId, { enabled: true, topics, frequencyMinutes: Math.max(15, Number(frequencyMinutes) || 60) });
  res.json({ message: 'Agent enabled', config: userConfigs.get(userId) });
});

router.post('/disable', async (req, res) => {
  const userId = (req as any).user?.userId || 'demo-user-id';
  const cfg = userConfigs.get(userId) || { enabled: false, topics: [], frequencyMinutes: 60 };
  cfg.enabled = false;
  userConfigs.set(userId, cfg);
  res.json({ message: 'Agent disabled' });
});

router.get('/status', async (req, res) => {
  const userId = (req as any).user?.userId || 'demo-user-id';
  res.json({ userId, config: userConfigs.get(userId) || null });
});

router.get('/digest', async (req, res) => {
  const userId = (req as any).user?.userId || 'demo-user-id';
  res.json(userDigests.get(userId) || { generatedAt: null, scholarships: [], events: [], internships: [] });
});

// SSE stream for agent updates
router.get('/stream', (req, res) => {
  const userId = (req as any).user?.userId || 'demo-user-id';
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.write(`event: ready\n`);
  res.write(`data: ${JSON.stringify({ ok: true, userId })}\n\n`);
  const client: SSEClient = { res, userId };
  sseClients.push(client);
  req.on('close', () => {
    const idx = sseClients.indexOf(client);
    if (idx >= 0) sseClients.splice(idx, 1);
  });
});

export default router;


