import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../../components/common/Card';
import {
  Users,
  UserPlus,
  Search,
  Upload,
  RefreshCw,
  Edit2,
  Trash2,
  ShieldBan,
  CheckCircle,
  AlertCircle,
  XCircle,
  Mail,
  Phone,
  Tag,
  Check,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { customerService } from '../../services/customerService';
import { CustomerModal } from '../../components/customers/CustomerModal';
import { DeleteCustomerDialog } from '../../components/customers/DeleteCustomerDialog';
import { CsvImportModal } from '../../components/customers/CsvImportModal';
import type { DbCustomer, CustomerFormData, CustomerStatus } from '../../types/crm';

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<DbCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals & Dialogs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedCustomer, setSelectedCustomer] = useState<DbCustomer | null>(null);

  const [customerToDelete, setCustomerToDelete] = useState<DbCustomer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [statusActionId, setStatusActionId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadCustomers = useCallback(() => {
    setLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    customerService
      .fetchCustomers({
        search: searchTerm,
        status: statusFilter,
      })
      .then((data) => {
        if (isMounted) {
          setCustomers(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Failed to load client database.';
          setError(msg);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [searchTerm, statusFilter, refreshTrigger]);

  const handleOpenAdd = () => {
    setSelectedCustomer(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer: DbCustomer) => {
    setSelectedCustomer(customer);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData: CustomerFormData) => {
    if (modalMode === 'add') {
      await customerService.createCustomer(formData);
      showToast('Client added successfully.');
    } else if (selectedCustomer) {
      await customerService.updateCustomer(selectedCustomer.id, formData);
      showToast('Client profile updated.');
    }
    await loadCustomers();
  };

  const handleConfirmDelete = async () => {
    if (!customerToDelete) return;
    setIsDeleting(true);
    try {
      await customerService.deleteCustomer(customerToDelete.id);
      setCustomerToDelete(null);
      showToast('Client profile removed.');
      await loadCustomers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete client.';
      setError(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusToggle = async (customer: DbCustomer, newStatus: CustomerStatus) => {
    setStatusActionId(customer.id);
    try {
      await customerService.setCustomerStatus(customer.id, newStatus);
      showToast(`Status updated to "${newStatus.replace('_', ' ')}".`);
      await loadCustomers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update status.';
      setError(msg);
    } finally {
      setStatusActionId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 text-white px-4 py-3 shadow-xl border border-slate-700 text-xs font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Client Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time Supabase customer profiles, WhatsApp consent, and client management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsCsvModalOpen(true)}
            leftIcon={<Upload className="h-4 w-4" />}
          >
            Import CSV
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleOpenAdd}
            leftIcon={<UserPlus className="h-4 w-4" />}
          >
            Add Client
          </Button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Database Query Error</p>
              <p className="mt-0.5">{error}</p>
              <p className="mt-1 text-[11px] text-rose-600">
                Ensure your Supabase migration (<code>001_initial_schema.sql</code>) has been executed in Supabase SQL Editor.
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={loadCustomers} leftIcon={<RefreshCw className="h-3 w-3" />}>
            Retry
          </Button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <Card padding="sm" className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients by name, phone (+1...), or email..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-salon-100 focus:bg-white transition-all"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Status:</span>
          {(['all', 'active', 'blocked', 'opted_out'] as const).map((status) => {
            const isActive = statusFilter === status;
            const labelMap: Record<string, string> = {
              all: 'All Clients',
              active: 'Active',
              blocked: 'Blocked',
              opted_out: 'Opted Out',
            };

            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-salon-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {labelMap[status]}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Customer Directory Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Client Profile</th>
                <th className="py-3.5 px-4">Phone / WhatsApp</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Consent</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4">Tags</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                // Skeletons
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-200" />
                        <div className="space-y-1.5">
                          <div className="h-4 w-32 bg-slate-200 rounded" />
                          <div className="h-3 w-20 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4"><div className="h-4 w-28 bg-slate-100 rounded" /></td>
                    <td className="py-4 px-4"><div className="h-5 w-16 bg-slate-100 rounded-full" /></td>
                    <td className="py-4 px-4"><div className="h-4 w-12 bg-slate-100 rounded" /></td>
                    <td className="py-4 px-4"><div className="h-4 w-20 bg-slate-100 rounded" /></td>
                    <td className="py-4 px-4"><div className="h-5 w-24 bg-slate-100 rounded" /></td>
                    <td className="py-4 px-6 text-right"><div className="h-8 w-16 bg-slate-100 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="max-w-xs mx-auto space-y-3">
                      <div className="h-12 w-12 rounded-2xl bg-salon-50 text-salon-500 mx-auto flex items-center justify-center">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">
                        {searchTerm || statusFilter !== 'all'
                          ? 'No matching clients found'
                          : 'Client Directory is Empty'}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {searchTerm || statusFilter !== 'all'
                          ? 'Try adjusting your search terms or filter selections.'
                          : 'Get started by creating your first verified salon client or importing via CSV.'}
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => setIsCsvModalOpen(true)}>
                          Import CSV
                        </Button>
                        <Button variant="primary" size="sm" onClick={handleOpenAdd}>
                          Add Client
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                customers.map((cust) => {
                  const isProcessing = statusActionId === cust.id;

                  return (
                    <tr key={cust.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-salon-100 to-rose-50 text-salon-700 ring-2 ring-salon-200/50 flex items-center justify-center font-serif font-bold text-sm">
                            {cust.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block">{cust.name}</span>
                            {cust.email ? (
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {cust.email}
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-300">No email registered</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-700">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-emerald-600" />
                          {cust.phone}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {cust.status === 'active' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        )}
                        {cust.status === 'blocked' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                            Blocked
                          </span>
                        )}
                        {cust.status === 'opted_out' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            Opted Out
                          </span>
                        )}
                      </td>

                      {/* Marketing Consent */}
                      <td className="py-3.5 px-4">
                        {cust.marketing_consent ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <Check className="h-3.5 w-3.5" />
                            Yes
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-normal">No</span>
                        )}
                      </td>

                      {/* Last Visit */}
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {cust.last_visit ? cust.last_visit : <span className="text-slate-300">—</span>}
                      </td>

                      {/* Tags */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {cust.tags && cust.tags.length > 0 ? (
                            cust.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                              >
                                <Tag className="h-2.5 w-2.5 text-slate-400" />
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-[11px] text-slate-300">None</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-6 text-right">
                        <div className="inline-flex items-center justify-end gap-1">
                          {/* Quick status toggle actions */}
                          {cust.status === 'active' ? (
                            <>
                              <button
                                type="button"
                                title="Block client"
                                disabled={isProcessing}
                                onClick={() => handleStatusToggle(cust, 'blocked')}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <ShieldBan className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                title="Mark opted out"
                                disabled={isProcessing}
                                onClick={() => handleStatusToggle(cust, 'opted_out')}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              title="Set active"
                              disabled={isProcessing}
                              onClick={() => handleStatusToggle(cust, 'active')}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}

                          {/* Edit Profile */}
                          <button
                            type="button"
                            title="Edit client profile"
                            onClick={() => handleOpenEdit(cust)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-salon-600 hover:bg-salon-50 transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Delete client"
                            onClick={() => setCustomerToDelete(cust)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-salon-500" />
            <span>
              Total in view: <strong className="text-slate-800">{customers.length}</strong> clients
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Powered by Supabase PostgreSQL • Real-time Single-Salon DB
          </span>
        </div>
      </Card>

      {/* Customer Add/Edit Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedCustomer}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteCustomerDialog
        isOpen={Boolean(customerToDelete)}
        customer={customerToDelete}
        onClose={() => setCustomerToDelete(null)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />

      {/* CSV Import Modal */}
      <CsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImportSuccess={loadCustomers}
      />
    </div>
  );
};
