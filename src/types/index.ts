export interface Firm {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  specialties: string[];
  size: string;
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  ratings?: {
    businessImpact?: number;
    sectorImpact?: number;
  };
}

export interface FirmFormData {
  name: string;
  city: string;
  state: string;
  country: string;
  specialties: string[];
  size: string;
  email?: string;
  phone?: string;
  website?: string;
}

export type ModalType = 'details' | 'add' | 'filter' | null;

export interface DirectoryContextType {
  firms: Firm[];
  filteredFirms: Firm[];
  selectedFirm: Firm | null;
  searchTerm: string;
  filters: {
    specialty: string | null;
    size: string | null;
    state: string | null;
  };
  modalType: ModalType;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: { specialty?: string | null; size?: string | null; state?: string | null }) => void;
  clearFilters: () => void;
  openModal: (type: ModalType, firmId?: string) => void;
  closeModal: () => void;
  addFirm: (firmData: FirmFormData) => void;
}

export const SPECIALTIES = [
  'Corporate Law',
  'IT Law',
  'Financial Accounting',
  'Tax Accounting',
  'Business Law',
  'Regulatory Compliance'
];

export const SIZES = [
  'Small', 
  'Medium', 
  'Large'
];

export const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export const COUNTRIES = ['USA', 'Canada'];
