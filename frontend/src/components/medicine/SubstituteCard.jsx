'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, IndianRupee, Pill, TrendingDown, TrendingUp } from 'lucide-react';
import AnnotationBadge from './AnnotationBadge';
import toast from 'react-hot-toast';

export default function SubstituteCard({ substitute, index = 0, isLoggedIn = false }) {
  const [bookmarked, setBookmarked] = useState(substitute?.bookmarked || false);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      toast?.error('Please log in to save medicines');
      return;
    }
    setLoading(true);
    // Backend: POST /api/bookmarks with { medicineId: substitute.id }
    await new Promise(r => setTimeout(r, 400));
    setBookmarked(v => !v);
    toast?.success(bookmarked ? 'Removed from saved' : 'Saved to your medicines');
    setLoading(false);
  };

  const priceDiff = substitute?.priceDiff; // positive = cheaper, negative = more expensive
  const hasSaving = priceDiff > 0;
  const hasExtra = priceDiff < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
    >
      <div className="bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-text-primary text-base leading-tight truncate">
              {substitute?.brandName}
            </h3>
            <p className="text-xs text-text-muted mt-0.5 truncate">{substitute?.manufacturer}</p>
          </div>
          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
            {/* Price */}
            <div className="flex items-center gap-0.5 bg-gray-50 px-2.5 py-1 rounded-full text-sm font-semibold text-text-primary">
              <IndianRupee size={12} />
              {substitute?.mrp}
            </div>
            {/* Bookmark */}
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
          {substitute?.salts?.map(salt => (
            <span
              key={`sub-salt-${substitute?.id}-${salt}`}
              className="px-2 py-0.5 bg-primary-lighter text-primary text-xs font-medium rounded-full"
            >
              {salt}
            </span>
          ))}
        </div>

        {/* Dosage row */}
        <div className="flex items-center gap-2 mb-3">
          <Pill size={12} className="text-text-muted" />
          <span className="text-xs text-text-muted">{substitute?.dosageForm} · {substitute?.strength}</span>
        </div>

        {/* Price diff badge */}
        {priceDiff !== 0 && (
          <div className="mb-3">
            {hasSaving ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
                <TrendingDown size={12} />
                Save ₹{Math.abs(priceDiff)}
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
                <TrendingUp size={12} />
                ₹{Math.abs(priceDiff)} more
              </div>
            )}
          </div>
        )}

        {/* Annotation */}
        {substitute?.annotation && (
          <div className="mt-auto pt-3 border-t border-gray-50">
            <AnnotationBadge
              status={substitute?.annotation?.status}
              reason={substitute?.annotation?.reason}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}