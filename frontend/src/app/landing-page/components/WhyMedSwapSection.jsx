'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Atom, UserCheck, BadgeIndianRupee } from 'lucide-react';

const features = [
  {
    icon: Atom,
    title: 'Salt-based matching',
    description:
      'We match by active ingredient, not brand. Same salt = same effect. Our algorithm checks dosage form and strength to ensure true bioequivalence.',
    accent: 'border-l-4 border-l-primary',
  },
  {
    icon: UserCheck,
    title: 'Doctor annotations',
    description:
      'Verified doctors review substitute pairs and mark them safe or flag concerns. Every annotation includes a clinical reason so you understand the recommendation.',
    accent: 'border-l-4 border-l-accent',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Price comparison',
    description:
      'See MRP side by side. Know exactly how much you save per strip. Generic alternatives often cost 60–80% less than branded equivalents.',
    accent: 'border-l-4 border-l-success',
  },
];

export default function WhyMedSwapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-3"
          >
            Why choose us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight"
          >
            Everything you need to switch safely
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features?.map((feat, i) => (
            <motion.div
              key={`feat-${feat?.title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className={`bg-background rounded-xl p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 ${feat?.accent}`}
            >
              <div className="w-10 h-10 bg-primary-lighter rounded-lg flex items-center justify-center mb-4">
                <feat.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{feat?.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feat?.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}