"use client";

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';

export interface UiCollege {
  id: string;
  name: string;
  location: string;
  type: 'public' | 'private' | 'community' | string;
  size: 'small' | 'medium' | 'large' | string;
  acceptanceRate?: number;
  averageGPA?: number;
  averageSAT?: number;
  averageACT?: number;
  majors?: string[];
  tuition?: number;
  region?: string;
}

export interface UseCollegesParams {
  page?: number;
  limit?: number;
  type?: string;
  state?: string;
  region?: string;
  size?: string;
  maxTuition?: number;
  majors?: string[];
  search?: string;
}

export function useColleges(params: UseCollegesParams) {
  const [colleges, setColleges] = useState<UiCollege[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => ({ ...params, majors: params.majors?.join(',') }), [params]);

  useEffect(() => {
    let cancelled = false;
    async function fetchColleges() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/colleges', { params: query });
        const list = (data.colleges ?? data) as any[];
        const mapped: UiCollege[] = list.map((c) => ({
          id: String(c._id || c.id),
          name: c.name,
          location: [c?.location?.city, c?.location?.state].filter(Boolean).join(', '),
          type: c.type,
          size: c.size,
          acceptanceRate: c?.admissionData?.acceptanceRate,
          averageGPA: c?.admissionData?.averageGPA,
          averageSAT: c?.admissionData?.averageSAT,
          averageACT: c?.admissionData?.averageACT,
          majors: c?.academics?.majors,
          tuition: c?.financials?.tuition,
          region: c?.location?.region,
        }));
        if (!cancelled) setColleges(mapped);
      } catch (err: any) {
        if (!cancelled) setError(err?.response?.data?.message || 'Failed to fetch colleges');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchColleges();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { colleges, loading, error };
}

export default useColleges;
