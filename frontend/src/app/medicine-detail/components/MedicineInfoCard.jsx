'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Building2, IndianRupee, Tag, Package, FileText, Bookmark, BookmarkCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MedicineInfoCard({ medicine, isLoggedIn = false }) {
  const [bookmarked, setBookmarked] = useState(medicine?.bookmarked || false);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary-light to-primary-lighter" />
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                {medicine?.brandName}
              </h1>
              {!medicine?.prescription && (
                <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold flex-shrink-0">
                  OTC
                </span>
              )}
            </div>
            <p className="text-text-muted text-sm flex items-center gap-1.5">
              <Building2 size={13} />
              {medicine?.manufacturer}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <div className="flex items-center gap-1 text-3xl font-extrabold text-text-primary tabular-nums">
                <IndianRupee size={22} className="text-text-secondary" />
                {medicine?.mrp}
              </div>
              <p className="text-xs text-text-muted mt-0.5">MRP per strip</p>
            </div>
            {/* Bookmark button */}
            <button
              onClick={handleBookmark}
              disabled={loading}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                bookmarked
                  ? 'bg-primary-lighter border-primary/30 text-primary' :'bg-gray-50 border-gray-200 text-text-muted hover:border-primary/30 hover:text-primary hover:bg-primary-lighter'
              }`}
              aria-label={bookmarked ? 'Remove from saved' : 'Save this medicine'}
            >
              {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
          </div>
        </div>

        {/* Salt chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {medicine?.salts?.map(salt => (
            <span
              key={`info-salt-${salt}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-lighter text-primary text-sm font-semibold rounded-full"
            >
              <Pill size={13} />
              {salt}
            </span>
          ))}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Pill, label: 'Dosage Form', value: medicine?.dosageForm },
            { icon: Tag, label: 'Strength', value: medicine?.strength },
            { icon: Package, label: 'Pack Size', value: medicine?.packSize },
            { icon: FileText, label: 'Category', value: medicine?.category },
          ]?.map(item => (
            <div
              key={`meta-${item?.label}`}
              className="bg-background rounded-xl p-3.5"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <item.icon size={13} className="text-text-muted" />
                <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {item?.label}
                </span>
              </div>
              <p className="text-sm font-semibold text-text-primary">{item?.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        {medicine?.description && (
          <div className="bg-background rounded-xl p-4">
            <p className="text-sm text-text-secondary leading-relaxed">{medicine?.description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}