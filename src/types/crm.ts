export type CustomerSegment = 'VIP' | 'Regular' | 'New' | 'Inactive' | 'OptedOut';
export type CustomerStatus = 'active' | 'blocked' | 'opted_out';

export interface DbCustomer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  gender: string | null;
  tags: string[];
  status: CustomerStatus;
  marketing_consent: boolean;
  consent_date: string | null;
  last_visit: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProfile {
  id: string;
  full_name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  tags?: string[];
  status?: CustomerStatus;
  marketing_consent?: boolean;
  consent_date?: string | null;
  last_visit?: string | null;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  gender?: string | null;
  avatarUrl?: string;
  segment?: CustomerSegment;
  lastVisit?: string;
  totalSpent?: number;
  totalVisits?: number;
  tags: string[];
  status: 'active' | 'inactive' | 'opted_out' | 'blocked';
  marketing_consent?: boolean;
  consent_date?: string | null;
  last_visit?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type CampaignStatus = 'Sent' | 'Scheduled' | 'Draft';

export interface Campaign {
  id: string;
  name: string;
  type: string;
  sentAt: string;
  audience: string;
  totalRecipients: number;
  deliveredCount: number;
  readRatePercent: number;
  repliesCount: number;
  status: CampaignStatus;
}

export interface SalonReply {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  avatar?: string;
  messagePreview: string;
  timestamp: string;
  unread: boolean;
  relatedCampaign?: string;
}

export interface SalonStats {
  totalCustomers: number;
  activeCustomers: number;
  messagesSent: number;
  delivered: number;
  read: number;
  replies: number;
  blockedOptOut: number;
  lastCampaignName: string;
  lastCampaignDeliveryRate: number;
}

export interface CustomerSegmentStat {
  segment: CustomerSegment;
  label: string;
  count: number;
  percentage: number;
  color: string;
  description: string;
}

export interface MessageFunnelStep {
  label: string;
  count: number;
  rate: string;
  percentage: number;
  color: string;
}
