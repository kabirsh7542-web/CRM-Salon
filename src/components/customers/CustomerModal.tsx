import React, { useState } from 'react';
import { X, User, Phone, Mail, Tag, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import type { DbCustomer, CustomerFormData, CustomerStatus } from '../../types/crm';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CustomerFormData) => Promise<void>;
  initialData?: DbCustomer | null;
  mode: 'add' | 'edit';
}

const CustomerModalDialog: React.FC<CustomerModalProps> = ({
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const [name, setName] = useState(mode === 'edit' && initialData?.name ? initialData.name : '');
  const [phone, setPhone] = useState(mode === 'edit' && initialData?.phone ? initialData.phone : '');
  const [email, setEmail] = useState(mode === 'edit' && initialData?.email ? initialData.email : '');
  const [gender, setGender] = useState(mode === 'edit' && initialData?.gender ? initialData.gender : '');
  const [status, setStatus] = useState<CustomerStatus>(
    mode === 'edit' && initialData?.status ? initialData.status : 'active'
  );
  const [tagsInput, setTagsInput] = useState(
    mode === 'edit' && initialData?.tags ? initialData.tags.join(', ') : ''
  );
  const [marketingConsent, setMarketingConsent] = useState(
    mode === 'edit' && initialData?.marketing_consent ? initialData.marketing_consent : false
  );
  const [consentDate, setConsentDate] = useState(
    mode === 'edit' && initialData?.consent_date
      ? new Date(initialData.consent_date).toISOString().split('T')[0]
      : ''
  );
  const [lastVisit, setLastVisit] = useState(
    mode === 'edit' && initialData?.last_visit ? initialData.last_visit : ''
  );
  const [notes, setNotes] = useState(
    mode === 'edit' && initialData?.notes ? initialData.notes : ''
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMarketingConsentChange = (checked: boolean) => {
    setMarketingConsent(checked);
    if (checked && !consentDate) {
      setConsentDate(new Date().toISOString().split('T')[0]);
    } else if (!checked) {
      setConsentDate('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setError('Client full name is required.');
      return;
    }

    if (!cleanPhone) {
      setError('Client mobile/WhatsApp phone number is required.');
      return;
    }

    // Parse comma-separated tags
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const formData: CustomerFormData = {
      name: cleanName,
      phone: cleanPhone,
      email: email.trim() || undefined,
      gender: gender || undefined,
      status,
      tags,
      marketing_consent: marketingConsent,
      consent_date: marketingConsent && consentDate ? new Date(consentDate).toISOString() : null,
      last_visit: lastVisit || null,
      notes: notes.trim() || undefined,
    };

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while saving client.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-8 z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {mode === 'add' ? 'Add New Salon Client' : 'Edit Client Profile'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {mode === 'add'
                ? 'Register a verified salon client profile with contact and preferences.'
                : 'Update client preferences, consent status, and service notes.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Client Name *"
              placeholder="e.g. Charlotte Dubois"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              leftIcon={<User className="h-4 w-4" />}
            />

            <Input
              label="Phone Number (WhatsApp) *"
              placeholder="e.g. +1 (555) 234-8901"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              leftIcon={<Phone className="h-4 w-4" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. charlotte@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Gender Identity
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 focus:border-salon-400 focus:outline-none focus:ring-2 focus:ring-salon-100"
              >
                <option value="">Select gender (optional)</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Client Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CustomerStatus)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 focus:border-salon-400 focus:outline-none focus:ring-2 focus:ring-salon-100"
              >
                <option value="active">Active Client</option>
                <option value="blocked">Blocked</option>
                <option value="opted_out">Opted Out (Do not message)</option>
              </select>
            </div>

            <Input
              label="Last Visit Date"
              type="date"
              value={lastVisit}
              onChange={(e) => setLastVisit(e.target.value)}
              leftIcon={<Calendar className="h-4 w-4" />}
            />
          </div>

          <div>
            <Input
              label="Service & VIP Tags (comma separated)"
              placeholder="e.g. VIP, Balayage, Keratin, Bridal"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              leftIcon={<Tag className="h-4 w-4" />}
            />
            <p className="text-[11px] text-slate-400 mt-1 pl-1">
              Separate tags with commas. Used for targeted WhatsApp broadcasts.
            </p>
          </div>

          {/* Marketing Consent Section */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => handleMarketingConsentChange(e.target.checked)}
                className="h-4 w-4 mt-0.5 rounded border-slate-300 text-salon-500 focus:ring-salon-400 accent-salon-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-800 block">
                  Client Marketing & WhatsApp Consent
                </span>
                <span className="text-slate-500">
                  Client has granted explicit permission to receive salon announcements and WhatsApp promotions.
                </span>
              </div>
            </label>

            {marketingConsent && (
              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-3">
                <label className="text-xs font-medium text-slate-600">Consent Date:</label>
                <input
                  type="date"
                  value={consentDate}
                  onChange={(e) => setConsentDate(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-salon-400"
                />
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Stylist / Client Notes
            </label>
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Allergies, preferred beverages, color formula notes, personal preferences..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-salon-400 focus:outline-none focus:ring-2 focus:ring-salon-100"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              leftIcon={<CheckCircle2 className="h-4 w-4" />}
            >
              {loading
                ? mode === 'add'
                  ? 'Saving Client...'
                  : 'Updating Client...'
                : mode === 'add'
                ? 'Save Client Profile'
                : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CustomerModal: React.FC<CustomerModalProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <CustomerModalDialog
      {...props}
      key={props.mode === 'edit' ? props.initialData?.id || 'edit' : 'add'}
    />
  );
};
