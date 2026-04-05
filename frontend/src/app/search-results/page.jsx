'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  SearchX,
  PlusCircle,
  Filter,
  ChevronUp,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MedicineCard from '@/components/medicine/MedicineCard';
import { SkeletonCard } from '@/components/ui/Skeleton';

// ─── Mock data ────────────────────────────────────────────────────────────────
const ALL_MEDICINES = [
  { id: 'med-001', brandName: 'Crocin Advance', manufacturer: 'GSK Pharmaceuticals', salts: ['Paracetamol'], dosageForm: 'Tablet', strength: '500mg', mrp: 32 },
  { id: 'med-002', brandName: 'Dolo 650', manufacturer: 'Micro Labs Ltd', salts: ['Paracetamol'], dosageForm: 'Tablet', strength: '650mg', mrp: 30 },
  { id: 'med-003', brandName: 'Calpol 500', manufacturer: 'GSK Consumer Healthcare', salts: ['Paracetamol'], dosageForm: 'Tablet', strength: '500mg', mrp: 28 },
  { id: 'med-004', brandName: 'Metacin', manufacturer: 'Pfizer Ltd', salts: ['Paracetamol'], dosageForm: 'Tablet', strength: '500mg', mrp: 18 },
  { id: 'med-005', brandName: 'Combiflam', manufacturer: 'Sanofi India', salts: ['Ibuprofen', 'Paracetamol'], dosageForm: 'Tablet', strength: '400mg + 325mg', mrp: 45 },
  { id: 'med-006', brandName: 'Brufen 400', manufacturer: 'Abbott Healthcare', salts: ['Ibuprofen'], dosageForm: 'Tablet', strength: '400mg', mrp: 38 },
  { id: 'med-007', brandName: 'Ibugesic Plus', manufacturer: 'Cipla Ltd', salts: ['Ibuprofen', 'Paracetamol'], dosageForm: 'Tablet', strength: '400mg + 325mg', mrp: 42 },
  { id: 'med-008', brandName: 'Nurofen 200', manufacturer: 'Reckitt Benckiser', salts: ['Ibuprofen'], dosageForm: 'Tablet', strength: '200mg', mrp: 55 },
  { id: 'med-009', brandName: 'Azithral 500', manufacturer: 'Alembic Pharma', salts: ['Azithromycin'], dosageForm: 'Tablet', strength: '500mg', mrp: 120 },
  { id: 'med-010', brandName: 'Zithromax', manufacturer: 'Pfizer Ltd', salts: ['Azithromycin'], dosageForm: 'Tablet', strength: '500mg', mrp: 145 },
  { id: 'med-011', brandName: 'Azee 500', manufacturer: 'Cipla Ltd', salts: ['Azithromycin'], dosageForm: 'Tablet', strength: '500mg', mrp: 98 },
  { id: 'med-012', brandName: 'Pantocid 40', manufacturer: 'Sun Pharma', salts: ['Pantoprazole'], dosageForm: 'Tablet', strength: '40mg', mrp: 62 },
  { id: 'med-013', brandName: 'Pan 40', manufacturer: 'Alkem Labs', salts: ['Pantoprazole'], dosageForm: 'Tablet', strength: '40mg', mrp: 48 },
  { id: 'med-014', brandName: 'Pantop 40', manufacturer: 'Aristo Pharma', salts: ['Pantoprazole'], dosageForm: 'Tablet', strength: '40mg', mrp: 44 },
  { id: 'med-015', brandName: 'Cefixime 200', manufacturer: 'Lupin Ltd', salts: ['Cefixime'], dosageForm: 'Capsule', strength: '200mg', mrp: 88 },
  { id: 'med-016', brandName: 'Taxim-O 200', manufacturer: 'Alkem Labs', salts: ['Cefixime'], dosageForm: 'Tablet', strength: '200mg', mrp: 95 },
  { id: 'med-017', brandName: 'Cefix 200', manufacturer: 'Cipla Ltd', salts: ['Cefixime'], dosageForm: 'Capsule', strength: '200mg', mrp: 82 },
  { id: 'med-018', brandName: 'Montek LC', manufacturer: 'Sun Pharma', salts: ['Montelukast', 'Levocetirizine'], dosageForm: 'Tablet', strength: '10mg + 5mg', mrp: 110 },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
];

const ALL_SALTS = [...new Set(ALL_MEDICINES.flatMap(m => m.salts))]?.sort();
const ALL_DOSAGE_FORMS = [...new Set(ALL_MEDICINES.map(m => m.dosageForm))]?.sort();
const ALL_STRENGTHS = [...new Set(ALL_MEDICINES.map(m => m.strength))]?.sort();

// ─── Skeleton grid ─────────────────────────────────────────────────────────
function SkeletonGrid({ count = 9 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count })?.map((_, i) => (
        <SkeletonCard key={`skel-${i}`} />
      ))}
    </div>
  );
}

// ─── Filter sidebar / panel ────────────────────────────────────────────────
function FilterPanel({ filters, onChange, onClear, resultCount }) {
  const [saltOpen, setSaltOpen] = useState(true);
  const [dosageOpen, setDosageOpen] = useState(true);
  const [strengthOpen, setStrengthOpen] = useState(false);

  const toggle = (key, value) => {
    const current = filters?.[key] || [];
    const next = current?.includes(value)
      ? current?.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const activeCount =
    (filters?.salts?.length || 0) +
    (filters?.dosageForms?.length || 0) +
    (filters?.strengths?.length || 0);

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-primary" />
            <span className="font-semibold text-text-primary text-sm">Filters</span>
            {activeCount > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-danger font-medium hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="px-5 py-3 bg-primary-lighter/40 border-b border-gray-100">
          <p className="text-xs text-text-muted">
            <span className="font-bold text-primary text-sm">{resultCount}</span> result{resultCount !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Salt filter */}
        <FilterSection
          title="Salt / Composition"
          open={saltOpen}
          onToggle={() => setSaltOpen(v => !v)}
        >
          {ALL_SALTS?.map(salt => (
            <FilterCheckbox
              key={salt}
              label={salt}
              checked={filters?.salts?.includes(salt) || false}
              onChange={() => toggle('salts', salt)}
            />
          ))}
        </FilterSection>

        {/* Dosage form filter */}
        <FilterSection
          title="Dosage Form"
          open={dosageOpen}
          onToggle={() => setDosageOpen(v => !v)}
        >
          {ALL_DOSAGE_FORMS?.map(form => (
            <FilterCheckbox
              key={form}
              label={form}
              checked={filters?.dosageForms?.includes(form) || false}
              onChange={() => toggle('dosageForms', form)}
            />
          ))}
        </FilterSection>

        {/* Strength filter */}
        <FilterSection
          title="Strength"
          open={strengthOpen}
          onToggle={() => setStrengthOpen(v => !v)}
        >
          {ALL_STRENGTHS?.map(str => (
            <FilterCheckbox
              key={str}
              label={str}
              checked={filters?.strengths?.includes(str) || false}
              onChange={() => toggle('strengths', str)}
            />
          ))}
        </FilterSection>
      </div>
    </aside>
  );
}

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-text-primary">{title}</span>
        {open ? (
          <ChevronUp size={15} className="text-text-muted" />
        ) : (
          <ChevronDown size={15} className="text-text-muted" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 space-y-2.5 max-h-48 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
          checked
            ? 'bg-primary border-primary' :'border-gray-300 group-hover:border-primary'
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors select-none">
        {label}
      </span>
    </label>
  );
}

// ─── Sort bar ──────────────────────────────────────────────────────────────
function SortBar({ sort, onSort, onToggleMobileFilters, activeFilterCount }) {
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS?.find(o => o?.value === sort) || SORT_OPTIONS?.[0];

  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      {/* Mobile filter toggle */}
      <button
        onClick={onToggleMobileFilters}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-all shadow-card"
      >
        <SlidersHorizontal size={15} />
        Filters
        {activeFilterCount > 0 && (
          <span className="bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-text-muted hidden sm:block">Sort by:</span>
        <div className="relative">
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-text-primary hover:border-primary transition-all shadow-card"
          >
            <ArrowUpDown size={14} className="text-primary" />
            {current?.label}
            <ChevronDown size={14} className={`text-text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-card-hover border border-gray-100 overflow-hidden z-20"
                >
                  {SORT_OPTIONS?.map(opt => (
                    <button
                      key={opt?.value}
                      onClick={() => { onSort(opt?.value); setOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        sort === opt?.value
                          ? 'bg-primary-lighter text-primary font-semibold' :'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                      }`}
                    >
                      {opt?.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Active filter chips ───────────────────────────────────────────────────
function ActiveFilterChips({ filters, onChange }) {
  const chips = [
    ...(filters?.salts || [])?.map(v => ({ key: 'salts', value: v, label: v })),
    ...(filters?.dosageForms || [])?.map(v => ({ key: 'dosageForms', value: v, label: v })),
    ...(filters?.strengths || [])?.map(v => ({ key: 'strengths', value: v, label: v })),
  ];

  if (chips?.length === 0) return null;

  const remove = (key, value) => {
    const next = { ...filters, [key]: (filters?.[key] || [])?.filter(v => v !== value) };
    onChange(next);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {chips?.map(chip => (
        <motion.span
          key={`${chip?.key}-${chip?.value}`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-lighter text-primary text-xs font-semibold rounded-full"
        >
          {chip?.label}
          <button
            onClick={() => remove(chip?.key, chip?.value)}
            className="hover:bg-primary/10 rounded-full p-0.5 transition-colors"
          >
            <X size={11} />
          </button>
        </motion.span>
      ))}
    </div>
  );
}

// ─── Main search content ───────────────────────────────────────────────────
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams?.get('q') || searchParams?.get('query') || '';

  const [searchInput, setSearchInput] = useState(query);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [sort, setSort] = useState('relevance');
  const [filters, setFilters] = useState({ salts: [], dosageForms: [], strengths: [] });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Simulate API fetch
  useEffect(() => {
    if (!query) {
      setResults(ALL_MEDICINES);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = ALL_MEDICINES?.filter(
        m =>
          m?.brandName?.toLowerCase()?.includes(query?.toLowerCase()) ||
          m?.salts?.some(s => s?.toLowerCase()?.includes(query?.toLowerCase())) ||
          m?.manufacturer?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [query]);

  // Apply client-side filters + sort
  const displayed = useMemo(() => {
    let list = [...results];

    if (filters?.salts?.length > 0) {
      list = list?.filter(m => m?.salts?.some(s => filters?.salts?.includes(s)));
    }
    if (filters?.dosageForms?.length > 0) {
      list = list?.filter(m => filters?.dosageForms?.includes(m?.dosageForm));
    }
    if (filters?.strengths?.length > 0) {
      list = list?.filter(m => filters?.strengths?.includes(m?.strength));
    }

    switch (sort) {
      case 'price-asc': list?.sort((a, b) => a?.mrp - b?.mrp); break;
      case 'price-desc': list?.sort((a, b) => b?.mrp - a?.mrp); break;
      case 'name-asc': list?.sort((a, b) => a?.brandName?.localeCompare(b?.brandName)); break;
      case 'name-desc': list?.sort((a, b) => b?.brandName?.localeCompare(a?.brandName)); break;
      default: break;
    }
    return list;
  }, [results, filters, sort]);

  const activeFilterCount =
    (filters?.salts?.length || 0) +
    (filters?.dosageForms?.length || 0) +
    (filters?.strengths?.length || 0);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchInput?.trim()) {
      router?.push(`/search-results?q=${encodeURIComponent(searchInput?.trim())}`);
    }
  };

  const clearFilters = () => setFilters({ salts: [], dosageForms: [], strengths: [] });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Search header bar */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e?.target?.value)}
                  placeholder="Search by brand name, salt, or manufacturer…"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-gray-200 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-all shadow-sm"
              >
                Search
              </button>
            </form>
            {query && !loading && (
              <p className="mt-2.5 text-sm text-text-muted">
                Showing results for{' '}
                <span className="font-semibold text-text-primary">&quot;{query}&quot;</span>
                {' '}— {displayed?.length} medicine{displayed?.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-7">
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onClear={clearFilters}
                resultCount={displayed?.length}
              />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <SortBar
                sort={sort}
                onSort={setSort}
                onToggleMobileFilters={() => setMobileFiltersOpen(true)}
                activeFilterCount={activeFilterCount}
              />

              <AnimatePresence mode="wait">
                <ActiveFilterChips filters={filters} onChange={setFilters} />
              </AnimatePresence>

              {loading ? (
                <SkeletonGrid count={9} />
              ) : displayed?.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SearchX size={28} className="text-text-muted" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No medicines found</h3>
                  <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
                    {activeFilterCount > 0
                      ? 'No results match your current filters. Try clearing some filters.' : `We couldn't find any medicines matching "${query}". Try a different name or salt.`}
                  </p>
                  {activeFilterCount > 0 ? (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-all"
                    >
                      <X size={15} />
                      Clear filters
                    </button>
                  ) : (
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-sm font-semibold rounded-xl hover:bg-primary-lighter transition-all">
                      <PlusCircle size={15} />
                      Submit this medicine
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={`grid-${sort}-${JSON.stringify(filters)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {displayed?.map((med, i) => (
                    <MedicineCard key={med?.id} medicine={med} index={i} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <span className="font-bold text-text-primary">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1">
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  onClear={clearFilters}
                  resultCount={displayed?.length}
                />
              </div>
              <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-all"
                >
                  Show {displayed?.length} result{displayed?.length !== 1 ? 's' : ''}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <div className="bg-white border-b border-gray-100 h-20 animate-pulse" />
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SkeletonGrid count={9} />
          </div>
        </main>
        <Footer />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
