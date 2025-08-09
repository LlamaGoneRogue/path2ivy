'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export function useTracker() {
  const [tasks, setTasks] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/tracker/tasks');
        if (!cancelled) setTasks(data?.tasks || []);
      } catch (e: any) {
        if (!cancelled) setError(e?.response?.data?.message || 'Failed to load tracker');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  const calendarIcsUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api').replace(/\/$/, '').replace(/\/api$/, '') + '/api/tracker/calendar.ics';

  return { tasks, loading, error, calendarIcsUrl };
}

export default useTracker;


