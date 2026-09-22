import React, { useState } from 'react';
import { Card } from '../common/Card';
import { UserPlus, UploadCloud, Send, MessageCircle, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<string | null>(null);

  const actions = [
    {
      id: 'add-customer',
      title: 'Add Customer',
      description: 'Register a client with phone & tags',
      icon: UserPlus,
      color: 'bg-rose-50 text-salon-600 group-hover:bg-salon-500 group-hover:text-white',
      border: 'hover:border-salon-200',
      action: () => setModalType('add-customer'),
    },
    {
      id: 'import-customers',
      title: 'Import Customers',
      description: 'Upload CSV or contacts file',
      icon: UploadCloud,
      color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white',
      border: 'hover:border-sky-200',
      action: () => setModalType('import-customers'),
    },
    {
      id: 'create-campaign',
      title: 'Create Campaign',
      description: 'Broadcast WhatsApp promotional blast',
      icon: Send,
      color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
      border: 'hover:border-emerald-200',
      action: () => navigate('/campaigns'),
    },
    {
      id: 'view-replies',
      title: 'View Replies',
      description: 'Open unified WhatsApp inbox',
      icon: MessageCircle,
      color: 'bg-violet-50 text-violet-600 group-hover:bg-violet-500 group-hover:text-white',
      border: 'hover:border-violet-200',
      action: () => navigate('/inbox'),
    },
  ];

  return (
    <>
      <Card>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Quick Actions</h3>
            <p className="text-xs text-slate-500">Fast workflows for salon front desk and marketing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`group flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-white hover:shadow-soft text-left transition-all duration-200 ${item.border} cursor-pointer`}
              >
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-salon-600 transition-colors block">
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500 leading-snug block">
                    {item.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Quick Action Interactive Modal Placeholder for Phase 1 */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-soft-lg max-w-md w-full p-6 space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-slate-900">
                {modalType === 'add-customer' ? 'Add New Client' : 'Import Customer Contacts'}
              </h4>
              <button
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              {modalType === 'add-customer'
                ? 'Register a new customer profile with WhatsApp phone number, VIP tier, and service preferences.'
                : 'Upload a CSV of phone numbers and client tags. In Phase 2, this syncs directly with Supabase.'}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-salon-600 font-semibold">
                <Check className="h-4 w-4" />
                <span>Phase 1 UI Ready</span>
              </div>
              <p>Form fields and CSV file parsers are pre-architected for Phase 2 Supabase schema connection.</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-salon-500 hover:bg-salon-600 text-white shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
