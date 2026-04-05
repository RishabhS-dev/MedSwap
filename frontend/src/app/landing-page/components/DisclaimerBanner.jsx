'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-6 px-4 sm:px-6 max-w-screen-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl px-6 py-4"
      >
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
            <AlertTriangle size={18} className="text-warning" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-800 mb-1">Medical Disclaimer</h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            Always consult your doctor or pharmacist before switching medicines. MedSwap provides
            information, not medical advice. Substitutes are matched by salt composition and verified
            by doctors, but individual response to medication may vary. Do not self-medicate.
          </p>
        </div>
      </motion.div>
    </section>
  );
}