import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-xl leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-colors sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
