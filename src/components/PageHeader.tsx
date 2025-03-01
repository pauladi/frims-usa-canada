
import React from 'react';
import { useDirectory } from '@/context/DirectoryContext';
import CountrySelector from './CountrySelector';

const PageHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full py-4 mb-4 border-b border-border animate-fade-in">
      <h1 className="text-2xl font-semibold text-primary">Legal & Accounting Directory</h1>
      <CountrySelector />
    </div>
  );
};

export default PageHeader;
