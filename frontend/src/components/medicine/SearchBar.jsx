'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar({ initialValue = '', size = 'lg', placeholder }) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      // Backend: GET /api/search?query={query}
      router?.push(`/landing-page?query=${encodeURIComponent(query?.trim())}`);
    }
  };

  const resolvedPlaceholder = placeholder || 'Search by medicine name e.g. Crocin, Paracetamol...';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex items-center ${size === 'lg' ? 'h-16' : 'h-12'}`}>
        <div className="absolute left-4 flex items-center pointer-events-none">
          <Search
            size={size === 'lg' ? 22 : 18}
            className="text-text-muted"
          />
        </div>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e?.target?.value)}
          placeholder={resolvedPlaceholder}
          className={`w-full h-full pl-12 pr-32 bg-white border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-200 text-text-primary placeholder:text-text-muted font-medium ${
            size === 'lg' ? 'rounded-full text-base' : 'rounded-xl text-sm'
          }`}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-24 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} className="text-text-muted" />
          </button>
        )}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className={`absolute right-2 bg-primary hover:bg-primary-light text-white font-semibold transition-all duration-200 shadow-sm ${
            size === 'lg' ? 'h-12 px-6 rounded-full text-sm' : 'h-9 px-4 rounded-lg text-xs'
          }`}
        >
          Search
        </motion.button>
      </div>
    </form>
  );
}