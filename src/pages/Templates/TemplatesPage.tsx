import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Plus, CheckCircle, ShieldCheck } from 'lucide-react';

export const TemplatesPage: React.FC = () => {
  const templates = [
    {
      id: 'tpl-1',
      name: 'Weekend Glow Promo',
      category: 'MARKETING',
      language: 'en_US',
      status: 'APPROVED',
      body: 'Hi {{1}}, refresh your look this weekend at LUMIÈRE Studio! Enjoy a complimentary deep conditioning treatment with any hair color service. Reply YES to reserve your spot.',
    },
    {
      id: 'tpl-2',
      name: 'Keratin Care Reminder',
      category: 'UTILITY',
      language: 'en_US',
      status: 'APPROVED',
      body: 'Hello {{1}}, it has been 6 weeks since your keratin treatment. Here is your quick home care guide to keep your shine lasting. Reply HELP for stylist advice.',
    },
    {
      id: 'tpl-3',
      name: 'VIP Birthday Celebration',
      category: 'MARKETING',
      language: 'en_US',
      status: 'APPROVED',
      body: 'Happy Birthday {{1}}! 🎂 Celebrate with a complimentary luxury blowdry on us this week. We cannot wait to see you at LUMIÈRE Studio.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            WhatsApp Message Templates
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pre-approved Meta templates for customer broadcasts and automated reminders.
          </p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>
          Submit New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((tpl) => (
          <Card key={tpl.id} className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {tpl.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="h-3 w-3" />
                  {tpl.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{tpl.name}</h3>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mt-3 text-xs text-slate-700 font-mono leading-relaxed">
                "{tpl.body}"
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Language: {tpl.language}</span>
              <button className="text-salon-600 font-semibold hover:text-salon-700">
                Use in Campaign
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-50 border-slate-200/80">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <p className="text-xs text-slate-600">
            <strong>WhatsApp Business API Compliant:</strong> High quality rating maintained with zero spam flags.
          </p>
        </div>
      </Card>
    </div>
  );
};
