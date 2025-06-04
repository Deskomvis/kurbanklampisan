
import React, { ReactNode } from 'react';
import { useCollaborativeData } from '@/hooks/useCollaborativeData';
import { Loader2 } from 'lucide-react';

interface CollaborativeWrapperProps {
  children: ReactNode;
}

export const CollaborativeWrapper: React.FC<CollaborativeWrapperProps> = ({ children }) => {
  const { isInitialized } = useCollaborativeData();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">Memuat Data Kolaboratif</h2>
            <p className="text-sm text-gray-600">Sinkronisasi dengan data terbaru dari server...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
