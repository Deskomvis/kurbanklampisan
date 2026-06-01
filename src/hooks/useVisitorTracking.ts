import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const VISITOR_KEY = 'klampisan_visitor_id';

const getOrCreateVisitorId = (): string => {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
};

export const useVisitorTracking = () => {
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);

  useEffect(() => {
    const track = async () => {
      const visitorId = getOrCreateVisitorId();

      await supabase.from('visitors').upsert(
        { visitor_id: visitorId, last_seen: new Date().toISOString() },
        { onConflict: 'visitor_id' }
      );

      const { count } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true });

      setTotalVisitors(count ?? 0);
    };

    track();
  }, []);

  return { totalVisitors };
};
