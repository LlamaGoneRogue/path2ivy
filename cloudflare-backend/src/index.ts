import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'

type Env = {
  JWT_SECRET?: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true, ts: Date.now() }))

// Users (mock)
app.get('/api/users/profile', (c) =>
  c.json({
    id: 'demo-user',
    name: 'Demo User',
    email: 'demo@example.com',
    plan: 'premium',
  }),
)

// Colleges (mock)
app.get('/api/colleges', (c) =>
  c.json({
    data: [
      { id: 'ucla', name: 'UCLA', rank: 15 },
      { id: 'berkeley', name: 'UC Berkeley', rank: 9 },
    ],
    total: 2,
  }),
)

// Scholarships (mock)
app.get('/api/scholarships/match', (c) =>
  c.json({
    matches: [
      { id: 's1', name: 'STEM Excellence', amount: 5000, deadline: '2025-11-01' },
    ],
  }),
)

// AI daily roadmap (mock)
app.get('/api/ai/daily-roadmap', (c) =>
  c.json({
    tasks: [
      { id: 't1', title: 'Revise personal statement', due: 'today' },
      { id: 't2', title: 'Shortlist 3 scholarships', due: 'today' },
    ],
  }),
)

// Tracker ICS
app.get('/api/tracker/calendar.ics', (c) => {
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Path2Ivy//EN\nBEGIN:VEVENT\nUID:demo-1\nDTSTAMP:20250101T000000Z\nDTSTART:20250115T000000Z\nDTEND:20250115T010000Z\nSUMMARY:Application Deadline\nEND:VEVENT\nEND:VCALENDAR\n`
  c.header('Content-Type', 'text/calendar; charset=utf-8')
  c.header('Content-Disposition', 'attachment; filename="calendar.ics"')
  return c.body(ics)
})

// SSE events
app.get('/api/events', (c) =>
  streamSSE(c, async (send) => {
    await send('message', JSON.stringify({ type: 'connected' }))
    let counter = 0
    const timer = setInterval(async () => {
      counter += 1
      await send('message', JSON.stringify({ type: 'tick', counter }))
    }, 5000)
    c.req.raw.signal.addEventListener('abort', () => clearInterval(timer))
  }),
)

export default app


