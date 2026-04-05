'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  ClipboardList,
  CheckCircle2,
  Clock,
  ArrowRight,
  Pill,
  FlaskConical,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const INITIAL_QUEUE = [
  {
    id: 1,
    original: { name: 'Paracetamol 500mg', salt: 'Paracetamol', brand: 'Crocin', form: 'Tablet' },
    substitute: { name: 'Dolo 650', salt: 'Paracetamol', brand: 'Micro Labs', form: 'Tablet', strength: '650mg' },
    submittedBy: 'Priya Sharma',
    submittedAt: '2 hours ago',
    category: 'Analgesic / Antipyretic',
    status: null,
    reason: '',
  },
  {
    id: 2,
    original: { name: 'Amoxicillin 250mg', salt: 'Amoxicillin', brand: 'Mox', form: 'Capsule' },
    substitute: { name: 'Novamox 250', salt: 'Amoxicillin', brand: 'Cipla', form: 'Capsule', strength: '250mg' },
    submittedBy: 'Rahul Mehta',
    submittedAt: '4 hours ago',
    category: 'Antibiotic',
    status: null,
    reason: '',
  },
  {
    id: 3,
    original: { name: 'Metformin 500mg', salt: 'Metformin HCl', brand: 'Glycomet', form: 'Tablet' },
    substitute: { name: 'Glucophage 500', salt: 'Metformin HCl', brand: 'Merck', form: 'Tablet', strength: '500mg' },
    submittedBy: 'Anita Desai',
    submittedAt: '6 hours ago',
    category: 'Antidiabetic',
    status: null,
    reason: '',
  },
  {
    id: 4,
    original: { name: 'Atorvastatin 10mg', salt: 'Atorvastatin', brand: 'Lipitor', form: 'Tablet' },
    substitute: { name: 'Storvas 10', salt: 'Atorvastatin', brand: 'Sun Pharma', form: 'Tablet', strength: '10mg' },
    submittedBy: 'Vikram Nair',
    submittedAt: '8 hours ago',
    category: 'Statin / Lipid-lowering',
    status: null,
    reason: '',
  },
  {
    id: 5,
    original: { name: 'Omeprazole 20mg', salt: 'Omeprazole', brand: 'Prilosec', form: 'Capsule' },
    substitute: { name: 'Omez 20', salt: 'Omeprazole', brand: 'Dr. Reddy\'s', form: 'Capsule', strength: '20mg' },
    submittedBy: 'Sunita Rao',
    submittedAt: '1 day ago',
    category: 'Proton Pump Inhibitor',
    status: null,
    reason: '',
  },
  {
    id: 6,
    original: { name: 'Amlodipine 5mg', salt: 'Amlodipine Besylate', brand: 'Norvasc', form: 'Tablet' },
    substitute: { name: 'Amlong 5', salt: 'Amlodipine Besylate', brand: 'Micro Labs', form: 'Tablet', strength: '5mg' },
    submittedBy: 'Deepak Kumar',
    submittedAt: '1 day ago',
    category: 'Calcium Channel Blocker',
    status: null,
    reason: '',
  },
];

const ACTION_CONFIG = {
  VERIFIED_SAFE: {
    label: 'Verified Safe',
    icon: ShieldCheck,
    btnClass: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
    badgeClass: 'bg-green-50 text-green-700 border border-green-200',
    iconColor: 'text-green-600',
    needsReason: false,
  },
  USE_WITH_CAUTION: {
    label: 'Use with Caution',
    icon: AlertTriangle,
    btnClass: 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    iconColor: 'text-amber-500',
    needsReason: true,
  },
  NOT_RECOMMENDED: {
    label: 'Not Recommended',
    icon: XCircle,
    btnClass: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
    badgeClass: 'bg-red-50 text-red-700 border border-red-200',
    iconColor: 'text-red-500',
    needsReason: true,
  },
};

function QueueItem({ item, onAnnotate }) {
  const [pendingAction, setPendingAction] = useState(null);
  const [reason, setReason] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleActionClick = (actionKey) => {
    const config = ACTION_CONFIG?.[actionKey];
    if (config?.needsReason) {
      setPendingAction(actionKey);
      setReason('');
    } else {
      onAnnotate(item?.id, actionKey, '');
    }
  };

  const handleSubmit = () => {
    if (!reason?.trim()) return;
    onAnnotate(item?.id, pendingAction, reason?.trim());
    setPendingAction(null);
    setReason('');
  };

  const handleCancel = () => {
    setPendingAction(null);
    setReason('');
  };

  const isAnnotated = item?.status !== null;
  const annotationConfig = isAnnotated ? ACTION_CONFIG?.[item?.status] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`bg-white rounded-2xl border shadow-card transition-all duration-200 overflow-hidden ${
        isAnnotated ? 'border-gray-100 opacity-75' : 'border-border hover:shadow-card-hover'
      }`}
    >
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {item?.category}
            </span>
            {isAnnotated && annotationConfig && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${annotationConfig?.badgeClass}`}
              >
                <annotationConfig.icon size={11} />
                {annotationConfig?.label}
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted shrink-0">
            <Clock size={12} />
            {item?.submittedAt}
          </div>
        </div>

        {/* Medicine Pair */}
        <div className="flex items-center gap-3 mb-4">
          {/* Original */}
          <div className="flex-1 bg-gray-50 rounded-xl p-3.5 border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                <Pill size={13} className="text-primary" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Original</span>
            </div>
            <p className="text-sm font-bold text-text-primary leading-tight">{item?.original?.name}</p>
            <p className="text-xs text-text-muted mt-0.5">{item?.original?.brand} · {item?.original?.form}</p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary-lighter flex items-center justify-center">
              <ArrowRight size={15} className="text-primary" />
            </div>
          </div>

          {/* Substitute */}
          <div className="flex-1 bg-primary-lighter/40 rounded-xl p-3.5 border border-primary/10">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center">
                <FlaskConical size={13} className="text-primary" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">Substitute</span>
            </div>
            <p className="text-sm font-bold text-text-primary leading-tight">{item?.substitute?.name}</p>
            <p className="text-xs text-text-muted mt-0.5">{item?.substitute?.brand} · {item?.substitute?.strength}</p>
          </div>
        </div>

        {/* Salt match info */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors mb-1"
        >
          <Zap size={11} />
          <span>Same active salt: <strong className="text-text-secondary">{item?.original?.salt}</strong></span>
          {expanded ? <ChevronUp size={12} className="ml-auto" /> : <ChevronDown size={12} className="ml-auto" />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-700">
                <p className="font-medium mb-1">Bioequivalence note</p>
                <p className="text-blue-600 leading-relaxed">
                  Both medicines contain <strong>{item?.original?.salt}</strong> as the active ingredient. 
                  Substitution is generally considered safe when the dosage form and strength match. 
                  Please verify patient-specific factors before approving.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submitted by */}
        <p className="text-xs text-text-muted mt-3">
          Submitted by <span className="font-medium text-text-secondary">{item?.submittedBy}</span>
        </p>
      </div>
      {/* Reason input (for caution / not recommended) */}
      <AnimatePresence>
        {pendingAction && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-4 pt-1 border-t ${
              pendingAction === 'USE_WITH_CAUTION' ? 'border-amber-100 bg-amber-50/40' : 'border-red-100 bg-red-50/40'
            }`}>
              <label className={`block text-xs font-semibold mb-2 ${
                pendingAction === 'USE_WITH_CAUTION' ? 'text-amber-700' : 'text-red-700'
              }`}>
                {pendingAction === 'USE_WITH_CAUTION' ?'⚠️ Specify caution reason (required)' :'❌ Specify reason for not recommending (required)'}
              </label>
              <textarea
                value={reason}
                onChange={e => setReason(e?.target?.value)}
                placeholder={
                  pendingAction === 'USE_WITH_CAUTION' ?'e.g. Monitor renal function; dose adjustment may be needed for elderly patients...' :'e.g. Different bioavailability profile; not suitable for patients with hepatic impairment...'
                }
                rows={3}
                className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none placeholder:text-text-muted/60 text-text-primary"
              />
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleSubmit}
                  disabled={!reason?.trim()}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                    pendingAction === 'USE_WITH_CAUTION' ?'bg-amber-500 hover:bg-amber-600 text-white' :'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  Confirm &amp; Submit
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Action buttons */}
      {!isAnnotated && !pendingAction && (
        <div className="px-5 pb-5 flex flex-wrap gap-2">
          {Object.entries(ACTION_CONFIG)?.map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleActionClick(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${config?.btnClass}`}
            >
              <config.icon size={13} />
              {config?.label}
            </button>
          ))}
        </div>
      )}
      {/* Annotated reason display */}
      {isAnnotated && item?.reason && (
        <div className="px-5 pb-4">
          <p className="text-xs text-text-muted leading-relaxed">
            <span className="font-medium text-text-secondary">Doctor's note:</span> {item?.reason}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function DoctorDashboard() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [filter, setFilter] = useState('pending'); // 'pending' | 'reviewed'

  const handleAnnotate = (id, status, reason) => {
    setQueue(prev =>
      prev?.map(item => item?.id === id ? { ...item, status, reason } : item)
    );
  };

  const pending = queue?.filter(i => i?.status === null);
  const reviewed = queue?.filter(i => i?.status !== null);
  const displayed = filter === 'pending' ? pending : reviewed;

  const stats = {
    total: queue?.length,
    pending: pending?.length,
    verified: queue?.filter(i => i?.status === 'VERIFIED_SAFE')?.length,
    caution: queue?.filter(i => i?.status === 'USE_WITH_CAUTION')?.length,
    notRecommended: queue?.filter(i => i?.status === 'NOT_RECOMMENDED')?.length,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="py-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
                <Stethoscope size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Doctor Dashboard</h1>
                <p className="text-sm text-text-muted">Review and annotate medicine substitute pairs</p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Pending Review', value: stats?.pending, icon: ClipboardList, color: 'text-primary', bg: 'bg-primary-lighter' },
              { label: 'Verified Safe', value: stats?.verified, icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Use with Caution', value: stats?.caution, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'Not Recommended', value: stats?.notRecommended, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
            ]?.map((stat) => (
              <motion.div
                key={stat?.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border border-border p-4 shadow-card"
              >
                <div className={`w-9 h-9 rounded-xl ${stat?.bg} flex items-center justify-center mb-3`}>
                  <stat.icon size={17} className={stat?.color} />
                </div>
                <p className="text-2xl font-bold text-text-primary">{stat?.value}</p>
                <p className="text-xs text-text-muted mt-0.5 leading-tight">{stat?.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-white border border-border rounded-xl p-1 w-fit mb-6 shadow-card">
            {[
              { key: 'pending', label: 'Pending', count: stats?.pending },
              { key: 'reviewed', label: 'Reviewed', count: reviewed?.length },
            ]?.map(tab => (
              <button
                key={tab?.key}
                onClick={() => setFilter(tab?.key)}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === tab?.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-primary hover:bg-primary-lighter'
                }`}
              >
                {tab?.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  filter === tab?.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-text-muted'
                }`}>
                  {tab?.count}
                </span>
              </button>
            ))}
          </div>

          {/* Queue */}
          <AnimatePresence mode="popLayout">
            {displayed?.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-lighter flex items-center justify-center mb-4">
                  <CheckCircle2 size={28} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {filter === 'pending' ? 'All caught up!' : 'No reviewed items yet'}
                </h3>
                <p className="text-sm text-text-muted max-w-xs">
                  {filter === 'pending' ?'All pending medicine-substitute pairs have been reviewed.' :'Annotated pairs will appear here once you review them.'}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {displayed?.map(item => (
                  <QueueItem key={item?.id} item={item} onAnnotate={handleAnnotate} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
