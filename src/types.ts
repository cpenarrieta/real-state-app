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

export interface PropertyLeadData {
  leads: PropertyLead[];
}