"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export interface ApiTask {
  id: string;
  title: string;
  description: string;
  status?: 'completed' | 'in-progress' | 'pending';
  dueDate?: string;
  priority?: 'high' | 'medium' | 'low';
  estimatedTime?: number;
  category?: string;
}

export interface ApiActionPlan {
  id: string;
  title: string;
  college: string;
  status: string;
  deadline?: string;
  tasks: ApiTask[];
  progress?: number;
}

export function useActionPlans() {
  const [actionPlans, setActionPlans] = useState<ApiActionPlan[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchPlans() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get<ApiActionPlan[]>('/action-plans');
        if (!cancelled) setActionPlans(data);
      } catch (err: any) {
        if (!cancelled) setError(err?.response?.data?.message || 'Failed to fetch action plans');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPlans();
    return () => { cancelled = true; };
  }, []);

  return { actionPlans, loading, error };
}

export default useActionPlans;

