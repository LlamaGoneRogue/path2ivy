import express from 'express';

type RoadmapSection = {
  term: string;
  courses: string[];
  testing: string[];
  extracurriculars: string[];
  milestones: string[];
};

type StoredActionPlan = {
  id: string;
  userId?: string;
  title: string;
  college?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  deadline?: string;
  roadmap?: { summary: string; sections: RoadmapSection[] };
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate?: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  progress: number;
  createdAt: string;
  updatedAt: string;
};

// Simple in-memory store for demo mode (resets on server restart)
const actionPlanStore: Map<string, StoredActionPlan> = new Map();
const byUserIndex: Map<string, Set<string>> = new Map();

function addToUserIndex(userId: string | undefined, id: string) {
  if (!userId) return;
  if (!byUserIndex.has(userId)) byUserIndex.set(userId, new Set());
  byUserIndex.get(userId)!.add(id);
}

function removeFromUserIndex(userId: string | undefined, id: string) {
  if (!userId) return;
  const set = byUserIndex.get(userId);
  if (set) {
    set.delete(id);
    if (set.size === 0) byUserIndex.delete(userId);
  }
}

const router = express.Router();

// Get all action plans (optionally filter by userId if provided in query)
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query as { userId?: string };
    let plans: StoredActionPlan[] = [];
    if (userId) {
      const ids = byUserIndex.get(userId);
      plans = ids ? Array.from(ids).map((id) => actionPlanStore.get(id)!).filter(Boolean) : [];
    } else {
      plans = Array.from(actionPlanStore.values());
    }
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching action plans' });
  }
});

// Get specific action plan
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const plan = actionPlanStore.get(id);
    if (!plan) return res.status(404).json({ message: 'Action plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching action plan' });
  }
});

// Create new action plan
router.post('/', async (req, res) => {
  try {
    const { title, college, deadline, roadmap, userId } = req.body as Partial<StoredActionPlan> & { roadmap?: { summary: string; sections: RoadmapSection[] } };

    const id = Date.now().toString();
    const now = new Date().toISOString();
    const newActionPlan: StoredActionPlan = {
      id,
      userId,
      title: title || 'Untitled Plan',
      college,
      status: 'not-started',
      deadline,
      roadmap,
      tasks: [],
      progress: 0,
      createdAt: now,
      updatedAt: now,
    };

    actionPlanStore.set(id, newActionPlan);
    addToUserIndex(userId, id);
    res.status(201).json(newActionPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating action plan' });
  }
});

// Update action plan
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const existing = actionPlanStore.get(id);
    if (!existing) return res.status(404).json({ message: 'Action plan not found' });

    const updates = req.body as Partial<StoredActionPlan>;
    const updated: StoredActionPlan = {
      ...existing,
      ...updates,
      // Avoid overwriting id/user index accidentally
      id: existing.id,
      userId: updates.userId ?? existing.userId,
      updatedAt: new Date().toISOString(),
    };
    actionPlanStore.set(id, updated);
    if (updated.userId !== existing.userId) {
      removeFromUserIndex(existing.userId, id);
      addToUserIndex(updated.userId, id);
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating action plan' });
  }
});

// Delete action plan
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const existing = actionPlanStore.get(id);
    if (!existing) return res.status(404).json({ message: 'Action plan not found' });
    actionPlanStore.delete(id);
    removeFromUserIndex(existing.userId, id);
    res.json({ message: 'Action plan deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting action plan' });
  }
});

export default router;

