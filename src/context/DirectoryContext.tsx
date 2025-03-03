
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Firm, DirectoryContextType, FirmFormData, ModalType } from '@/types';

// Mock data
const initialFirms: Firm[] = [
  {
    id: uuidv4(),
    name: 'Smith & Associates Legal',
    location: {
      city: 'New York City',
      state: 'New York',
      country: 'USA'
    },
    specialties: ['Corporate Law', 'IT Law'],
    size: '201-500 employees',
    contact: {
      email: 'contact@smithlegal.com',
      phone: '+1 (555) 123-4567',
      website: 'www.smithlegal.com'
    },
    ratings: {
      businessImpact: 85,
      sectorImpact: 70
    }
  },
  {
    id: uuidv4(),
    name: 'Johnson Financial Services',
    location: {
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA'
    },
    specialties: ['Financial Accounting', 'Tax Accounting'],
    size: '51-200 employees',
    contact: {
      email: 'info@johnsonfinancial.com',
      phone: '+1 (555) 987-6543',
      website: 'www.johnsonfinancial.com'
    },
    ratings: {
      businessImpact: 92,
      sectorImpact: 78
    }
  },
  {
    id: uuidv4(),
    name: 'Reynolds & Partners',
    location: {
      city: 'Toronto',
      state: 'Ontario',
      country: 'Canada'
    },
    specialties: ['Business Law', 'Corporate Law'],
    size: '501+ employees',
    contact: {
      email: 'contact@reynoldspartners.ca',
      phone: '+1 (416) 555-7890',
      website: 'www.reynoldspartners.ca'
    },
    ratings: {
      businessImpact: 75,
      sectorImpact: 82
    }
  }
];

const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

export const DirectoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firms, setFirms] = useState<Firm[]>(initialFirms);
  const [filteredFirms, setFilteredFirms] = useState<Firm[]>(initialFirms);
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFiltersState] = useState({
    specialty: null as string | null,
    size: null as string | null,
    state: null as string | null
  });
  const [modalType, setModalType] = useState<ModalType>(null);

  const setFilters = (newFilters: { specialty?: string | null; size?: string | null; state?: string | null }) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFiltersState({
      specialty: null,
      size: null,
      state: null
    });
  };

  const openModal = (type: ModalType, firmId?: string) => {
    setModalType(type);
    
    if (type === 'details' && firmId) {
      const firm = firms.find(f => f.id === firmId);
      if (firm) {
        setSelectedFirm(firm);
      }
    } else {
      setSelectedFirm(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedFirm(null);
  };

  const addFirm = (firmData: FirmFormData) => {
    const newFirm: Firm = {
      id: uuidv4(),
      name: firmData.name,
      location: {
        city: firmData.city,
        state: firmData.state,
        country: firmData.country
      },
      specialties: firmData.specialties,
      size: firmData.size,
      contact: {
        email: firmData.email,
        phone: firmData.phone,
        website: firmData.website
      }
    };

    setFirms(prev => [...prev, newFirm]);
    closeModal();
  };

  useEffect(() => {
    let result = firms;

    // Apply search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(firm => 
        firm.name.toLowerCase().includes(lowercasedTerm) ||
        firm.location.city.toLowerCase().includes(lowercasedTerm) ||
        firm.location.state.toLowerCase().includes(lowercasedTerm) ||
        firm.specialties.some(spec => spec.toLowerCase().includes(lowercasedTerm))
      );
    }

    // Apply specialty filter
    if (filters.specialty) {
      result = result.filter(firm => 
        firm.specialties.includes(filters.specialty!)
      );
    }

    // Apply size filter
    if (filters.size) {
      result = result.filter(firm => firm.size === filters.size);
    }

    // Apply state filter
    if (filters.state) {
      result = result.filter(firm => firm.location.state === filters.state);
    }

    setFilteredFirms(result);
  }, [firms, searchTerm, filters]);

  return (
    <DirectoryContext.Provider
      value={{
        firms,
        filteredFirms,
        selectedFirm,
        searchTerm,
        filters,
        modalType,
        setSearchTerm,
        setFilters,
        clearFilters,
        openModal,
        closeModal,
        addFirm
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
};

export const useDirectory = () => {
  const context = useContext(DirectoryContext);
  if (context === undefined) {
    throw new Error('useDirectory must be used within a DirectoryProvider');
  }
  return context;
};
