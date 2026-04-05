'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import MedicineCard from '@/components/medicine/MedicineCard';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { SearchX, PlusCircle } from 'lucide-react';

import { motion } from 'framer-motion';

// Mock medicines — Backend: replace with GET /api/search?query=
const MOCK_MEDICINES = [
  {
    id: 'med-001',
    brandName: 'Crocin Advance',
    manufacturer: 'GSK Pharmaceuticals',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 32,
  },
  {
    id: 'med-002',
    brandName: 'Dolo 650',
    manufacturer: 'Micro Labs Ltd',
    salts: ['Paracetamol 650mg'],
    dosageForm: 'Tablet',
    strength: '650mg',
    mrp: 30,
  },
  {
    id: 'med-003',
    brandName: 'Calpol 500',
    manufacturer: 'GSK Consumer Healthcare',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 28,
  },
  {
    id: 'med-004',
    brandName: 'Metacin',
    manufacturer: 'Pfizer Ltd',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 18,
  },
  {
    id: 'med-005',
    brandName: 'Combiflam',
    manufacturer: 'Sanofi India',
    salts: ['Ibuprofen 400mg', 'Paracetamol 325mg'],
    dosageForm: 'Tablet',
    strength: '400mg + 325mg',
    mrp: 45,
  },
  {
    id: 'med-006',
    brandName: 'Brufen 400',
    manufacturer: 'Abbott Healthcare',
    salts: ['Ibuprofen 400mg'],
    dosageForm: 'Tablet',
    strength: '400mg',
    mrp: 38,
  },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    // Backend: GET /api/search?query={query}
    const timer = setTimeout(() => {
      const filtered = MOCK_MEDICINES?.filter(
        m =>
          m?.brandName?.toLowerCase()?.includes(query?.toLowerCase()) ||
          m?.salts?.some(s => s?.toLowerCase()?.includes(query?.toLowerCase()))
      );
      setResults(filtered);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);

  if (!query) return null;

  return (
    <section className="py-12 px-4 sm:px-6 max-w-screen-xl mx-auto">
      <div className="mb-6">
        <p className="text-text-muted text-sm">
          {loading ? (
            'Searching...'
          ) : (
            <>
              <span className="font-semibold text-text-primary tabular-nums">{results?.length}</span>
              {' '}result{results?.length !== 1 ? 's' : ''} found for{' '}
              <span className="text-primary font-semibold">&quot;{query}&quot;</span>
            </>
          )}
        </p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3]?.map(i => (
            <SkeletonCard key={`skel-${i}`} />
          ))}
        </div>
      ) : results?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchX size={28} className="text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No medicines found</h3>
          <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
            We couldn&apos;t find any medicines matching &quot;{query}&quot;. Try a different brand name or salt name.
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary-lighter transition-all duration-200">
            <PlusCircle size={15} />
            Submit this medicine
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results?.map((med, i) => (
            <MedicineCard key={med?.id} medicine={med} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function SearchResultsSection() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}