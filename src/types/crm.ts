export type CustomerSegment = 'VIP' | 'Regular' | 'New' | 'Inactive' | 'OptedOut';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  avatarUrl?: string;
  segment: CustomerSegment;
  lastVisit: string;
  totalSpent: number;
  totalVisits: number;
  tags: string[];
  status: 'active' | 'inactive' | 'opted_out';
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
