"use client";

import { useEffect, useRef, useState } from 'react';

export function useEvents() {
  const [connected, setConnected] = useState<boolean>(false);
  const [lastEvent, setLastEvent] = useState<any>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';
    const url = base.replace(/\/$/, '').replace(/\/api$/, '') + '/api/events';

    const es = new EventSource(url, { withCredentials: false });
    eventSourceRef.current = es;

    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (evt) => {
      try {
        setLastEvent(JSON.parse(evt.data));
      } catch {
        setLastEvent(evt.data);
      }
    };

    return () => {
      es.close();
      setConnected(false);
    };
  }, []);

  return { connected, lastEvent };
}

export default useEvents;
