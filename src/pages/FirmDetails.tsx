
import React from 'react';
import { useDirectory } from '@/context/DirectoryContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { MapPin, Mail, Phone, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FirmDetails: React.FC = () => {
  const { selectedFirm, modalType, closeModal } = useDirectory();

  if (!selectedFirm || modalType !== 'details') return null;

  return (
    <Dialog open={modalType === 'details'} onOpenChange={() => closeModal()}>
      <DialogContent className="modal-content sm:max-w-md">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex justify-between items-center w-full">
            <DialogTitle className="text-xl font-semibold">{selectedFirm.name}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <p>
                {selectedFirm.location.city}, {selectedFirm.location.state}
                <br />
                {selectedFirm.location.country}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Size</h3>
              <span className="chip">{selectedFirm.size}</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-1">
                {selectedFirm.specialties.map(specialty => (
                  <span key={specialty} className="specialty-chip">{specialty}</span>
                ))}
              </div>
            </div>
          </div>

          {selectedFirm.contact && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
              <div className="space-y-2">
                {selectedFirm.contact.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    <a href={`mailto:${selectedFirm.contact.email}`} className="text-primary hover:underline transition-all">
                      {selectedFirm.contact.email}
                    </a>
                  </div>
                )}
                
                {selectedFirm.contact.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    <a href={`tel:${selectedFirm.contact.phone}`} className="text-primary hover:underline transition-all">
                      {selectedFirm.contact.phone}
                    </a>
                  </div>
                )}
                
                {selectedFirm.contact.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-primary" />
                    <a href={`https://${selectedFirm.contact.website}`} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-primary hover:underline transition-all">
                      {selectedFirm.contact.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedFirm.ratings && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Significance Ratings</h3>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Business Impact</span>
                  <span className="text-xs font-medium">{selectedFirm.ratings.businessImpact}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${selectedFirm.ratings.businessImpact}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">IT Sector Impact</span>
                  <span className="text-xs font-medium">{selectedFirm.ratings.sectorImpact}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${selectedFirm.ratings.sectorImpact}%` }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FirmDetails;
