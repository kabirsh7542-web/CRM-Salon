import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF8F7] text-center">
      <div className="max-w-md space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-salon-50 text-salon-500 shadow-soft">
          <Sparkles className="h-7 w-7" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-slate-900">404</h1>
        <h2 className="text-lg font-bold text-slate-800">Page Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          The requested salon route does not exist in this single-client CRM.
        </p>
        <div>
          <Link to="/dashboard">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Salon Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
