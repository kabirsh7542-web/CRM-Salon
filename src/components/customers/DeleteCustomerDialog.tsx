import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '../common/Button';
import type { DbCustomer } from '../../types/crm';

interface DeleteCustomerDialogProps {
  isOpen: boolean;
  customer: DbCustomer | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

export const DeleteCustomerDialog: React.FC<DeleteCustomerDialogProps> = ({
  isOpen,
  customer,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-100 p-6 z-10 overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-2 text-left">
          <h3 className="text-lg font-bold text-slate-900">
            Delete Client Profile?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to permanently delete the profile for{' '}
            <strong className="text-slate-900">{customer.name}</strong> ({customer.phone})?
            This will remove all associated notes, tags, and consent history. This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
