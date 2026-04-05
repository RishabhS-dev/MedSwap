'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Pill, IndianRupee, Bookmark, BookmarkCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MedicineCard({ medicine, index = 0, isLoggedIn = false }) {
  const [bookmarked, setBookmarked] = useState(medicine?.bookmarked || false);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!isLoggedIn) {
      toast?.error('Please log in to save medicines');
      return;
    }
    setLoading(true);
    // Backend: POST /api/bookmarks with { medicineId: medicine.id }
    await new Promise(r => setTimeout(r, 400));
    setBookmarked(v => !v);
    toast?.success(bookmarked ? 'Removed from saved' : 'Saved to your medicines');
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
    >
      <div className="bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col h-full group">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-text-primary text-lg leading-tight group-hover:text-primary transition-colors">
              {medicine?.brandName}
            </h3>
            <p className="text-sm text-text-muted mt-0.5">{medicine?.manufacturer}</p>
          </div>
          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
            <div className="flex items-center gap-1 bg-primary-lighter text-primary px-2.5 py-1 rounded-full text-xs font-semibold">
              <IndianRupee size={11} />
              <span>{medicine?.mrp}</span>
            </div>
            {/* Bookmark button */}
            <button
              onClick={handleBookmark}
              disabled={loading}
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                bookmarked
                  ? 'text-primary bg-primary-lighter' :'text-text-muted hover:text-primary hover:bg-primary-lighter'
              }`}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this medicine'}
            >
              {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
          </div>
        </div>

        {/* Salt chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {medicine?.salts?.map(salt => (
            <span
              key={`salt-${medicine?.id}-${salt}`}
              className="px-2.5 py-1 bg-primary-lighter text-primary text-xs font-medium rounded-full"
            >
              {salt}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5">
            <Pill size={13} className="text-text-muted" />
            <span className="text-xs text-text-muted">{medicine?.dosageForm}</span>
          </div>
          <span className="text-gray-200">·</span>
          <span className="text-xs text-text-muted">{medicine?.strength}</span>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            href="/medicine-detail"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
          >
            View substitutes
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}