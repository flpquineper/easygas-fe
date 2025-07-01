'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login/user?redirectTo=/checkout');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}