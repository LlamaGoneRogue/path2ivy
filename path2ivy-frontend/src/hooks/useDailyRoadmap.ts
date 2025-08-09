'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  category: 'essays' | 'test-prep' | 'applications' | 'financial' | string;
  priority?: 'high' | 'medium' | 'low';
  estimatedTime?: number;
}

export function useDailyRoadmap(params?: { profile?: any; focusAreas?: string[]; date?: string }) {
  const [tasks, setTasks] = useState<RoadmapTask[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.post('/ai/daily-roadmap', params || {});
        if (!cancelled) setTasks(data?.tasks || []);
      } catch (e: any) {
        if (!cancelled) setError(e?.response?.data?.message || 'Failed to load roadmap');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { tasks, loading, error };
}

export default useDailyRoadmap;


