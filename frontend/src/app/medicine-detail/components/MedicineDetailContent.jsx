'use client';
import { useState } from 'react';
import Link from 'next/link';

import { ChevronRight, Home, Search, ShieldCheck, Info,  } from 'lucide-react';
import SubstituteCard from '@/components/medicine/SubstituteCard';
import MedicineInfoCard from './MedicineInfoCard';
import SubstitutesSortBar from './SubstitutesSortBar';
import SubstitutesEmptyState from './SubstitutesEmptyState';

// Mock medicine data — Backend: replace with GET /api/medicines/{id}
const MOCK_MEDICINE = {
  id: 'med-001',
  brandName: 'Crocin Advance',
  manufacturer: 'GSK Pharmaceuticals Ltd',
  dosageForm: 'Film-coated Tablet',
  strength: '500mg',
  mrp: 32,
  packSize: '15 tablets/strip',
  category: 'Analgesic / Antipyretic',
  prescription: false,
  salts: ['Paracetamol 500mg'],
  description:
    'Crocin Advance is used for the relief of mild to moderate pain including headache, migraine, toothache, backache, period pain, and for reducing fever. Contains Paracetamol as the active ingredient.',
};

// Mock substitutes — Backend: replace with GET /api/search/{id}/substitutes
const MOCK_SUBSTITUTES = [
  {
    id: 'sub-001',
    brandName: 'Dolo 500',
    manufacturer: 'Micro Labs Ltd',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 20,
    priceDiff: 12,
    bookmarked: false,
    annotation: {
      status: 'VERIFIED_SAFE',
      reason: 'Bioequivalent salt and dosage. Suitable direct substitute for Crocin Advance 500mg.',
      doctorName: 'Dr. Priya Sharma, MBBS MD',
    },
  },
  {
    id: 'sub-002',
    brandName: 'Metacin 500',
    manufacturer: 'Pfizer Ltd',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 18,
    priceDiff: 14,
    bookmarked: false,
    annotation: {
      status: 'VERIFIED_SAFE',
      reason: 'Same active ingredient and dosage. Widely used generic equivalent.',
      doctorName: 'Dr. Anand Krishnan, MBBS',
    },
  },
  {
    id: 'sub-003',
    brandName: 'Calpol 500',
    manufacturer: 'GSK Consumer Healthcare',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 28,
    priceDiff: 4,
    bookmarked: true,
    annotation: {
      status: 'VERIFIED_SAFE',
      reason: 'Same manufacturer group. Identical formulation, slightly different excipients.',
      doctorName: 'Dr. Meera Iyer, MBBS MD',
    },
  },
  {
    id: 'sub-004',
    brandName: 'P-500',
    manufacturer: 'Sun Pharmaceutical Industries',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 14,
    priceDiff: 18,
    bookmarked: false,
    annotation: null,
  },
  {
    id: 'sub-005',
    brandName: 'Paracip 500',
    manufacturer: 'Cipla Ltd',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 16,
    priceDiff: 16,
    bookmarked: false,
    annotation: {
      status: 'USE_WITH_CAUTION',
      reason:
        'Different binder composition may affect dissolution rate in patients with GI sensitivity. Consult your pharmacist.',
      doctorName: 'Dr. Suresh Nair, MBBS',
    },
  },
  {
    id: 'sub-006',
    brandName: 'Pyrigesic 500',
    manufacturer: 'East India Pharmaceutical',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 38,
    priceDiff: -6,
    bookmarked: false,
    annotation: null,
  },
  {
    id: 'sub-007',
    brandName: 'Febrex',
    manufacturer: 'Indoco Remedies Ltd',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 22,
    priceDiff: 10,
    bookmarked: false,
    annotation: {
      status: 'NOT_RECOMMENDED',
      reason:
        'Reported quality control issues in recent batch testing. Pending re-evaluation by central drug authority.',
      doctorName: 'Dr. Kavitha Reddy, MBBS MD Pharmacology',
    },
  },
  {
    id: 'sub-008',
    brandName: 'Tempra 500',
    manufacturer: 'Mead Johnson India',
    salts: ['Paracetamol 500mg'],
    dosageForm: 'Tablet',
    strength: '500mg',
    mrp: 24,
    priceDiff: 8,
    bookmarked: false,
    annotation: null,
  },
];

export default function MedicineDetailContent() {
  const [sortBy, setSortBy] = useState('verified');
  const isLoggedIn = false; // Backend: replace with AuthContext

  const sortedSubstitutes = [...MOCK_SUBSTITUTES]?.sort((a, b) => {
    if (sortBy === 'price-asc') return a?.mrp - b?.mrp;
    if (sortBy === 'price-desc') return b?.mrp - a?.mrp;
    if (sortBy === 'savings') return b?.priceDiff - a?.priceDiff;
    if (sortBy === 'verified') {
      const order = { VERIFIED_SAFE: 0, USE_WITH_CAUTION: 1, NOT_RECOMMENDED: 2, null: 3 };
      const aOrder = a?.annotation ? order?.[a?.annotation?.status] : 3;
      const bOrder = b?.annotation ? order?.[b?.annotation?.status] : 3;
      return aOrder - bOrder;
    }
    return 0;
  });

  const verifiedCount = MOCK_SUBSTITUTES?.filter(
    s => s?.annotation?.status === 'VERIFIED_SAFE'
  )?.length;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
        <Link href="/landing-page" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home size={12} />
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/landing-page" className="hover:text-primary transition-colors">
          Search
        </Link>
        <ChevronRight size={12} />
        <span className="text-text-secondary font-medium">{MOCK_MEDICINE?.brandName}</span>
      </nav>
      {/* Medicine info card */}
      <MedicineInfoCard medicine={MOCK_MEDICINE} />
      {/* Substitutes header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">
            Substitutes
          </h2>
          <span className="px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-full tabular-nums">
            {MOCK_SUBSTITUTES?.length}
          </span>
          {verifiedCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
              <ShieldCheck size={12} />
              {verifiedCount} verified safe
            </div>
          )}
        </div>
        <SubstitutesSortBar sortBy={sortBy} onSort={setSortBy} />
      </div>
      {/* Info note */}
      <div className="flex items-start gap-2.5 bg-primary-lighter/50 border border-primary/20 rounded-lg px-4 py-3 mb-6">
        <Info size={15} className="text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-primary leading-relaxed">
          All substitutes contain{' '}
          <span className="font-semibold">Paracetamol 500mg</span> as the active ingredient.
          Prices shown are maximum retail price (MRP) per strip. Doctor annotations are based on
          clinical review of bioequivalence data.
        </p>
      </div>
      {/* Substitutes grid */}
      {sortedSubstitutes?.length === 0 ? (
        <SubstitutesEmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedSubstitutes?.map((sub, i) => (
            <SubstituteCard
              key={sub?.id}
              substitute={sub}
              index={i}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </div>
  );
}