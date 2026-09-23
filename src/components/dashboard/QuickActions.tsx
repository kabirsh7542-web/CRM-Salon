import React from 'react';
import { Card } from '../common/Card';
import { UserPlus, UploadCloud, Send, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'add-customer',
      title: 'Add Customer',
      description: 'Register a client with phone & tags',
      icon: UserPlus,
      color: 'bg-rose-50 text-salon-600 group-hover:bg-salon-500 group-hover:text-white',
      border: 'hover:border-salon-200',
      action: () => navigate('/customers'),
    },
    {
      id: 'import-customers',
      title: 'Import Customers',
      description: 'Upload CSV contacts list',
      icon: UploadCloud,
      color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white',
      border: 'hover:border-sky-200',
      action: () => navigate('/customers'),
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
  );
};
