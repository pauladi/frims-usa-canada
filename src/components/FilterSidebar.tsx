
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
      <div className="sidebar-content p-6 flex flex-col h-full ml-auto bg-white">
        <div className="flex justify-between items-center mb-8">
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
              onValueChange={(value) => setFilters({ specialty: value || null })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
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
              onValueChange={(value) => setFilters({ size: value || null })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
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
              onValueChange={(value) => setFilters({ state: value || null })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select state/province" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={clearFilters}
          variant="outline"
          className="w-full mt-8 border-gray-300"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
