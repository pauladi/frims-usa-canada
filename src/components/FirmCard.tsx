
import React from 'react';
import { Firm } from '@/types';
import { MapPin, Building } from 'lucide-react';
import { useDirectory } from '@/context/DirectoryContext';

interface FirmCardProps {
  firm: Firm;
}

const FirmCard: React.FC<FirmCardProps> = ({ firm }) => {
  const { openModal } = useDirectory();

  return (
    <div 
      className="directory-card cursor-pointer"
      onClick={() => openModal('details', firm.id)}
    >
      <h3 className="text-xl font-semibold mb-2">{firm.name}</h3>
      <div className="flex items-center text-muted-foreground mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="text-sm">{firm.location.city}, {firm.location.state}</span>
      </div>
      <div className="mb-3">
        <p className="text-sm font-medium text-muted-foreground mb-1">Specialties:</p>
        <div className="flex flex-wrap gap-1">
          {firm.specialties.map(specialty => (
            <span key={specialty} className="specialty-chip">{specialty}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <Building className="w-4 h-4 mr-1" />
        <span className="text-sm text-muted-foreground">{firm.size}</span>
      </div>
    </div>
  );
};

export default FirmCard;
