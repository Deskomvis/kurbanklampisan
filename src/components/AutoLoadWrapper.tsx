
import React, { useEffect, ReactNode } from 'react';
import { useAutoLoadBackup } from '@/hooks/useAutoLoadBackup';
import { Loader2 } from 'lucide-react';

interface AutoLoadWrapperProps {
  children: ReactNode;
}

export const AutoLoadWrapper: React.FC<AutoLoadWrapperProps> = ({ children }) => {
  const { isAutoLoading, hasAutoLoaded } = useAutoLoadBackup();

  useEffect(() => {
    if (hasAutoLoaded) {
      console.log('Auto-load completed, data should now be available in the app');
    }
  }, [hasAutoLoaded]);

  if (isAutoLoading && !hasAutoLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-green-600" />
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Memuat Data Terbaru
          </h2>
          <p className="text-green-600">
            Sedang memuat backup terbaru dari server...
          </p>
          <p className="text-sm text-green-500 mt-2">
            Data akan tersinkronisasi dari Supabase
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
