import { supabase } from '../lib/supabase';
import type { DbCustomer, CustomerFormData, CustomerStatus } from '../types/crm';

export interface CustomerFilterOptions {
  search?: string;
  status?: string;
}

export interface CustomerMetrics {
  totalCustomers: number;
  activeCustomers: number;
  blockedOptOut: number;
}

export const customerService = {
  async fetchCustomers(options: CustomerFilterOptions = {}): Promise<DbCustomer[]> {
    let query = supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (options.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    if (options.search && options.search.trim()) {
      const term = `%${options.search.trim()}%`;
      query = query.or(`name.ilike.${term},phone.ilike.${term},email.ilike.${term}`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('[CustomerService] fetchCustomers error:', error.message);
      throw error;
    }

    return (data as DbCustomer[]) || [];
  },

  async fetchRecentCustomers(limit = 5): Promise<DbCustomer[]> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[CustomerService] fetchRecentCustomers error:', error.message);
      throw error;
    }

    return (data as DbCustomer[]) || [];
  },

  async fetchCustomerById(id: string): Promise<DbCustomer> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as DbCustomer;
  },

  async createCustomer(formData: CustomerFormData): Promise<DbCustomer> {
    const cleanPhone = formData.phone.trim();
    const cleanName = formData.name.trim();

    if (!cleanName) throw new Error('Customer name is required.');
    if (!cleanPhone) throw new Error('Phone number is required.');

    const payload = {
      name: cleanName,
      phone: cleanPhone,
      email: formData.email?.trim() || null,
      gender: formData.gender?.trim() || null,
      tags: formData.tags || [],
      status: formData.status || 'active',
      marketing_consent: formData.marketing_consent ?? false,
      consent_date: formData.marketing_consent
        ? formData.consent_date || new Date().toISOString()
        : null,
      last_visit: formData.last_visit || null,
      notes: formData.notes?.trim() || null,
    };

    const { data, error } = await supabase
      .from('customers')
      .insert(payload)
      .select()
      .single();

    if (error) {
      if (error.code === '23505' || error.message.includes('unique')) {
        throw new Error(`A customer with phone number "${cleanPhone}" already exists.`);
      }
      throw error;
    }

    return data as DbCustomer;
  },

  async updateCustomer(id: string, formData: Partial<CustomerFormData>): Promise<DbCustomer> {
    const payload: Record<string, unknown> = {};

    if (formData.name !== undefined) {
      const cleanName = formData.name.trim();
      if (!cleanName) throw new Error('Customer name cannot be empty.');
      payload.name = cleanName;
    }

    if (formData.phone !== undefined) {
      const cleanPhone = formData.phone.trim();
      if (!cleanPhone) throw new Error('Phone number cannot be empty.');
      payload.phone = cleanPhone;
    }

    if (formData.email !== undefined) {
      payload.email = formData.email?.trim() || null;
    }

    if (formData.gender !== undefined) {
      payload.gender = formData.gender?.trim() || null;
    }

    if (formData.tags !== undefined) {
      payload.tags = formData.tags;
    }

    if (formData.status !== undefined) {
      payload.status = formData.status;
    }

    if (formData.marketing_consent !== undefined) {
      payload.marketing_consent = formData.marketing_consent;
      if (formData.marketing_consent && !formData.consent_date) {
        payload.consent_date = new Date().toISOString();
      } else if (!formData.marketing_consent) {
        payload.consent_date = null;
      }
    }

    if (formData.consent_date !== undefined && formData.marketing_consent) {
      payload.consent_date = formData.consent_date;
    }

    if (formData.last_visit !== undefined) {
      payload.last_visit = formData.last_visit || null;
    }

    if (formData.notes !== undefined) {
      payload.notes = formData.notes?.trim() || null;
    }

    const { data, error } = await supabase
      .from('customers')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505' || error.message.includes('unique')) {
        throw new Error('A customer with this phone number already exists.');
      }
      throw error;
    }

    return data as DbCustomer;
  },

  async setCustomerStatus(id: string, status: CustomerStatus): Promise<DbCustomer> {
    const { data, error } = await supabase
      .from('customers')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as DbCustomer;
  },

  async deleteCustomer(id: string): Promise<void> {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) {
      throw error;
    }
  },

  async fetchExistingPhones(phones: string[]): Promise<Set<string>> {
    if (phones.length === 0) return new Set();

    // Query in batches if large, or single in-query
    const { data, error } = await supabase
      .from('customers')
      .select('phone')
      .in('phone', phones);

    if (error) {
      console.error('[CustomerService] fetchExistingPhones error:', error.message);
      return new Set();
    }

    return new Set(data.map((row: { phone: string }) => row.phone));
  },

  async batchInsertCustomers(customers: CustomerFormData[]): Promise<number> {
    if (customers.length === 0) return 0;

    const records = customers.map((c) => ({
      name: c.name.trim(),
      phone: c.phone.trim(),
      email: c.email?.trim() || null,
      gender: c.gender?.trim() || null,
      tags: c.tags || [],
      status: c.status || 'active',
      marketing_consent: c.marketing_consent ?? false,
      consent_date: c.marketing_consent
        ? c.consent_date || new Date().toISOString()
        : null,
      last_visit: c.last_visit || null,
      notes: c.notes?.trim() || null,
    }));

    const { error, count } = await supabase
      .from('customers')
      .insert(records, { count: 'exact' });

    if (error) {
      throw error;
    }

    return count ?? records.length;
  },

  async fetchCustomerMetrics(): Promise<CustomerMetrics> {
    const { data, error } = await supabase
      .from('customers')
      .select('status');

    if (error) {
      console.error('[CustomerService] fetchCustomerMetrics error:', error.message);
      throw error;
    }

    const rows = (data as { status: CustomerStatus }[]) || [];
    const totalCustomers = rows.length;
    const activeCustomers = rows.filter((r) => r.status === 'active').length;
    const blockedOptOut = rows.filter(
      (r) => r.status === 'blocked' || r.status === 'opted_out'
    ).length;

    return {
      totalCustomers,
      activeCustomers,
      blockedOptOut,
    };
  },

  async fetchCustomerSegmentStats(): Promise<{
    segments: import('../types/crm').CustomerSegmentStat[];
    total: number;
    activeCount: number;
    activePercentage: number;
  }> {
    const customers = await this.fetchCustomers();
    const total = customers.length;

    if (total === 0) {
      return {
        segments: [
          { segment: 'VIP', label: 'VIP Clients', count: 0, percentage: 0, color: '#E11D48', description: 'Clients tagged as VIP members' },
          { segment: 'Regular', label: 'Regular Clients', count: 0, percentage: 0, color: '#6366F1', description: 'Active returning salon clients' },
          { segment: 'New', label: 'New Clients', count: 0, percentage: 0, color: '#0EA5E9', description: 'Registered within the last 30 days' },
          { segment: 'OptedOut', label: 'Restricted / Opted Out', count: 0, percentage: 0, color: '#94A3B8', description: 'Opted out from WhatsApp or blocked' },
        ],
        total: 0,
        activeCount: 0,
        activePercentage: 0,
      };
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let vipCount = 0;
    let newCount = 0;
    let regularCount = 0;
    let restrictedCount = 0;

    for (const c of customers) {
      if (c.status === 'blocked' || c.status === 'opted_out') {
        restrictedCount++;
      } else if (c.tags?.some((t) => t.toLowerCase().includes('vip'))) {
        vipCount++;
      } else if (new Date(c.created_at) >= thirtyDaysAgo) {
        newCount++;
      } else {
        regularCount++;
      }
    }

    const activeCount = total - restrictedCount;
    const activePercentage = total > 0 ? Number(((activeCount / total) * 100).toFixed(1)) : 0;

    return {
      segments: [
        {
          segment: 'VIP',
          label: 'VIP Clients',
          count: vipCount,
          percentage: total > 0 ? Number(((vipCount / total) * 100).toFixed(1)) : 0,
          color: '#E11D48',
          description: 'Clients tagged as VIP members',
        },
        {
          segment: 'Regular',
          label: 'Regular Clients',
          count: regularCount,
          percentage: total > 0 ? Number(((regularCount / total) * 100).toFixed(1)) : 0,
          color: '#6366F1',
          description: 'Active returning salon clients',
        },
        {
          segment: 'New',
          label: 'New Clients',
          count: newCount,
          percentage: total > 0 ? Number(((newCount / total) * 100).toFixed(1)) : 0,
          color: '#0EA5E9',
          description: 'Registered within the last 30 days',
        },
        {
          segment: 'OptedOut',
          label: 'Restricted / Opted Out',
          count: restrictedCount,
          percentage: total > 0 ? Number(((restrictedCount / total) * 100).toFixed(1)) : 0,
          color: '#94A3B8',
          description: 'Opted out from WhatsApp or blocked',
        },
      ],
      total,
      activeCount,
      activePercentage,
    };
  },
};
