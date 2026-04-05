'use client';
import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'verified', label: 'Verified first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'savings', label: 'Most savings' },
];

export default function SubstitutesSortBar({ sortBy, onSort }) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={14} className="text-text-muted flex-shrink-0" />
      <span className="text-xs text-text-muted font-medium">Sort by:</span>
      <select
        value={sortBy}
        onChange={e => onSort(e?.target?.value)}
        className="text-sm font-medium text-text-primary border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer"
      >
        {SORT_OPTIONS?.map(opt => (
          <option key={`sort-${opt?.value}`} value={opt?.value}>
            {opt?.label}
          </option>
        ))}
      </select>
    </div>
  );
}