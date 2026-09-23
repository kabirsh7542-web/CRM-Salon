import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { Sparkles } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-salon-600 to-rose-400 p-0.5 shadow-lg shadow-salon-500/20 animate-pulse flex items-center justify-center">
            <div className="h-full w-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-salon-400 animate-spin" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-base font-bold tracking-tight">StyleSalon CRM</h2>
            <p className="text-xs text-slate-400 mt-1">Verifying secure session...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
