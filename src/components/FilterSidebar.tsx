
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
    <div className="fixed inset-y-0 right-0 z-50 flex">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="w-80 h-full ml-auto bg-white p-6 flex flex-col relative shadow-lg rounded-l-lg border-l border-gray-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Laravel Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Specialty</label>
            <Select
              value={filters.specialty || ""}
              onValueChange={(value) => setFilters({ specialty: value || null })}
            >
              <SelectTrigger className="w-full rounded-md border-gray-300 bg-white focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50">
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
            <label className="text-sm font-medium text-gray-700">Size</label>
            <Select
              value={filters.size || ""}
              onValueChange={(value) => setFilters({ size: value || null })}
            >
              <SelectTrigger className="w-full rounded-md border-gray-300 bg-white focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50">
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
            <label className="text-sm font-medium text-gray-700">State/Province</label>
            <Select
              value={filters.state || ""}
              onValueChange={(value) => setFilters({ state: value || null })}
            >
              <SelectTrigger className="w-full rounded-md border-gray-300 bg-white focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50">
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
          className="w-full mt-6 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors py-2 focus:ring focus:ring-red-200 focus:ring-opacity-50 focus:border-red-500"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
