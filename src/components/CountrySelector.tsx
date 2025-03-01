
import React from 'react';
import { Button } from '@/components/ui/button';
import { COUNTRIES } from '@/types';
import { useDirectory } from '@/context/DirectoryContext';

const CountrySelector: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = React.useState('USA');
  const { setFilters } = useDirectory();

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    // In a real application, you might want to filter firms by country
    // For now, this is just UI state
    console.log(`Selected country: ${country}`);
  };

  return (
    <div className="flex space-x-2 mt-4 sm:mt-0 animate-fade-in">
      {COUNTRIES.map(country => (
        <Button
          key={country}
          variant={selectedCountry === country ? "default" : "outline"}
          size="sm"
          onClick={() => handleCountryChange(country)}
          className="transition-all duration-300"
        >
          {country}
        </Button>
      ))}
    </div>
  );
};

export default CountrySelector;
