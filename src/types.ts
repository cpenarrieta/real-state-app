export interface PropertyLead {
  id: string;
  name?: string;
  phone?: string;
  leadStatus?: string;
  email?: string;
  visitorId: string;
  createdAt: string;
  order?: number;
  notes?: string;
  uuid?: string;
  title?: string;
  image?: string;
}

export interface PropertyDashboard {
  id: string;
  name?: string;
  phone?: string;
  leadStatus?: string;
  email?: string;
  visitorId: string;
  createdAt: string;
  order?: number;
  notes?: string;
  uuid?: string;
  title?: string;
  image?: string;
}

export interface PropertyLeadData {
  leads: PropertyLead[];
}

export type AnalyticRaw = {
  day: string;
  count: number;
};

export type AnalyticRawDate = {
  day: Date;
  count: number;
};

export type AnalyticTabsProps = {
  visitsRaw: AnalyticRaw[];
  leadsRaw: AnalyticRaw[];
  usersRaw: AnalyticRaw[];
};
