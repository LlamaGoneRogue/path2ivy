"use client";

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';

export interface Mentor {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  title: string;
  institution: string;
  expertise: string[];
  biography: string;
  experience: number;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  specializations: string[];
  responseTime: string;
  totalSessions: number;
  successStories: number;
  isVerified: boolean;
}

export interface UseMentorsParams {
  search?: string;
  specialization?: string;
  maxRate?: string;
  minRating?: string;
  sortBy?: 'rating' | 'price' | 'experience';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export function useMentors(params: UseMentorsParams) {
  const [mentors, setMentors] = useState<Mentor[] | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => ({ ...params }), [params]);

  useEffect(() => {
    let cancelled = false;
    async function fetchMentors() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/mentors', { params: query });
        if (cancelled) return;
        setMentors(data.mentors ?? data);
        setTotalCount(data.totalCount ?? (data.mentors?.length ?? 0));
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.response?.data?.message || 'Failed to fetch mentors');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchMentors();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { mentors, totalCount, loading, error };
}

export default useMentors;
