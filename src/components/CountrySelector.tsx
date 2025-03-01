
import React from 'react';
import { Button } from '@/components/ui/button';
import { COUNTRIES } from '@/types';

const CountrySelector: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = React.useState('USA');

  return (
    <div className="flex space-x-2 mt-4 sm:mt-0 animate-fade-in">
      {COUNTRIES.map(country => (
        <Button
          key={country}
          variant={selectedCountry === country ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCountry(country)}
          className="transition-all duration-300"
        >
          {country}
        </Button>
      ))}
    </div>
  );
};

export default CountrySelector;
