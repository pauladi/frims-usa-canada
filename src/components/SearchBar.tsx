
import React, { useEffect, useState } from 'react';
import { useDirectory } from '@/context/DirectoryContext';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const { setSearchTerm } = useDirectory();
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, setSearchTerm]);

  return (
    <div className="relative w-full animate-fade-in">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <input
        type="search"
        className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
        placeholder="Search firms..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
