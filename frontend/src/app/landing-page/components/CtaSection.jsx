'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Stethoscope } from 'lucide-react';

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-card p-10 sm:p-14"
        >
          <div className="w-14 h-14 bg-primary-lighter rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search size={24} className="text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-4 text-balance">
            Ready to find your substitute?
          </h2>
          <p className="text-text-secondary text-base leading-relaxed mb-8">
            Join thousands of patients who have already switched to safer, more affordable alternatives.
            It takes less than 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/landing-page#search"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all duration-200 shadow-sm text-sm"
            >
              <Search size={16} />
              Search now
            </Link>
            <Link
              href="/sign-up-login-screen"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary-lighter transition-all duration-200 text-sm"
            >
              <Stethoscope size={16} />
              Register as a doctor
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}