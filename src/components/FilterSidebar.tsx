
import React from 'react';
import { useDirectory } from '@/context/DirectoryContext';
import { SPECIALTIES, SIZES, STATES } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onClose }) => {
  const { filters, setFilters, clearFilters } = useDirectory();

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex animate-slide-in">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="sidebar-content p-6 flex flex-col h-full ml-auto bg-white w-80 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-sm font-medium">Specialty</label>
            <Select
              value={filters.specialty || ""}
              onValueChange={(value) => setFilters({ specialty: value === "" ? null : value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All specialties</SelectItem>
                {SPECIALTIES.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Size</label>
            <Select
              value={filters.size || ""}
              onValueChange={(value) => setFilters({ size: value === "" ? null : value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All sizes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All sizes</SelectItem>
                {SIZES.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">State/Province</label>
            <Select
              value={filters.state || ""}
              onValueChange={(value) => setFilters({ state: value === "" ? null : value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All states" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All states</SelectItem>
                {STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <Button 
            onClick={clearFilters}
            variant="outline"
            className="w-full"
          >
            Clear Filters
          </Button>
          <Button 
            onClick={onClose}
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
