
import React, { useState } from 'react';
import { DirectoryProvider, useDirectory } from '@/context/DirectoryContext';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/SearchBar';
import FirmCard from '@/components/FirmCard';
import FilterSidebar from '@/components/FilterSidebar';
import FirmDetails from './FirmDetails';
import AddFirm from './AddFirm';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';

const DirectoryContent: React.FC = () => {
  const { filteredFirms, openModal, modalType } = useDirectory();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader />
      <Navigation />
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 mt-6">
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            onClick={() => setShowFilters(true)}
            variant="outline"
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button 
            onClick={() => openModal('add')}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Firm
          </Button>
        </div>
      </div>
      
      {filteredFirms.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No firms found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFirms.map((firm) => (
            <FirmCard key={firm.id} firm={firm} />
          ))}
        </div>
      )}
      
      <FirmDetails />
      <AddFirm />
      {showFilters && <FilterSidebar onClose={() => setShowFilters(false)} />}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <DirectoryProvider>
      <DirectoryContent />
    </DirectoryProvider>
  );
};

export default Index;
