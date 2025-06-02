
import React, { ReactNode } from 'react';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useAutoLoad } from '@/hooks/useAutoLoad';

interface AutoSaveLoadWrapperProps {
  children: ReactNode;
}

export const AutoSaveLoadWrapper: React.FC<AutoSaveLoadWrapperProps> = ({ children }) => {
  useAutoSave();
  const { hasLoaded } = useAutoLoad();

  if (!hasLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600">Memuat data aplikasi...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
