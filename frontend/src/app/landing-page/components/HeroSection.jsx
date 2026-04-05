'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Stethoscope, Database, ShieldCheck, Zap } from 'lucide-react';
import { useRef } from 'react';
import SearchBar from '@/components/medicine/SearchBar';
import CartoonDoctor from '@/components/ui/CartoonDoctor';

const trustChips = [
  { icon: Database, label: '5,000+ medicines' },
  { icon: ShieldCheck, label: 'Doctor verified' },
  { icon: Stethoscope, label: 'Free, always' },
];

const floatingPills = [
  { name: 'Paracetamol', color: 'bg-primary-lighter text-primary border-primary/20', delay: 0, x: '-60px', y: '20px' },
  { name: 'Ibuprofen', color: 'bg-accent/10 text-amber-700 border-accent/30', delay: 0.3, x: '40px', y: '-30px' },
  { name: 'Amoxicillin', color: 'bg-primary-lighter text-primary border-primary/20', delay: 0.6, x: '-30px', y: '-50px' },
  { name: 'Metformin', color: 'bg-green-50 text-green-700 border-green-200', delay: 0.9, x: '60px', y: '40px' },
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={sectionRef}
      id="search"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-bg-shift"
        style={{
          background: 'linear-gradient(135deg, #f0fafa 0%, #fafffe 40%, #fef9ec 70%, #f0fafa 100%)',
          backgroundSize: '400% 400%',
        }}
      />
      {/* Parallax blobs */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(11,110,110,0.12) 0%, transparent 65%)',
            filter: 'blur(1px)',
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: blobY2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle at 30% 70%, rgba(240,165,0,0.10) 0%, transparent 65%)',
          }}
        />
      </motion.div>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#0B6E6E 1px, transparent 1px), linear-gradient(90deg, #0B6E6E 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Floating pill badges — decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingPills?.map((pill, i) => (
          <motion.div
            key={`pill-${i}`}
            className={`absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${pill?.color}`}
            style={{
              top: `${25 + i * 14}%`,
              right: i % 2 === 0 ? '6%' : undefined,
              left: i % 2 !== 0 ? '4%' : undefined,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.7, 1, 0.7],
              y: [0, -8, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              opacity: { repeat: Infinity, duration: 3 + i, delay: pill?.delay },
              y: { repeat: Infinity, duration: 4 + i * 0.5, delay: pill?.delay, ease: 'easeInOut' },
              scale: { repeat: Infinity, duration: 3.5 + i, delay: pill?.delay },
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            {pill?.name}
          </motion.div>
        ))}
      </div>
      {/* Main content */}
      <motion.div style={{ y: contentY }} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border border-primary/15"
          style={{ boxShadow: '0 2px 12px rgba(11,110,110,0.12)' }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <Zap size={12} fill="currentColor" />
          </motion.span>
          India&apos;s Medicine Substitute Finder
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight tracking-tight mb-5 text-balance"
        >
          Find a safer, affordable
          <br />
          alternative to your{' '}
          <span
            className="text-primary relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #0B6E6E 0%, #1A8F8F 50%, #0B6E6E 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            medicine
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto"
        >
          Search by brand name or salt composition. Doctor-verified substitutes.{' '}
          <span className="text-primary font-semibold">Free, always.</span>
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(11,110,110,0.12))' }}
        >
          <SearchBar size="lg" />
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="flex items-center justify-center flex-wrap gap-3"
        >
          {trustChips?.map((chip, i) => (
            <motion.div
              key={`trust-${chip?.label}`}
              className="flex items-center gap-1.5"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="flex items-center gap-1.5 text-sm text-text-muted px-3 py-1.5 rounded-full bg-white/70 border border-gray-100"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <chip.icon size={14} className="text-primary" />
                <span className="font-medium">{chip?.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-muted uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-1 h-6 bg-gradient-to-b from-primary/40 to-transparent rounded-full"
          />
        </motion.div>
      </motion.div>
      {/* Cartoon Doctor — fixed to bottom-right corner */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-center">
        <CartoonDoctor />
      </div>
    </section>
  );
}