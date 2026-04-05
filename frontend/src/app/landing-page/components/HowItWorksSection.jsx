'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, FlaskConical, ShieldCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Search your medicine',
    description:
      'Enter the brand name like "Crocin" or the active ingredient like "Paracetamol". Our database covers 5,000+ medicines across all categories.',
  },
  {
    number: '02',
    icon: FlaskConical,
    title: 'See bioequivalent substitutes',
    description:
      'We match by active salt composition — not brand name. Same salt, same dosage = same therapeutic effect. See all alternatives instantly.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Check doctor-verified safety badges',
    description:
      'Registered doctors review substitute pairs and mark them Verified Safe, Use with Caution, or Not Recommended based on clinical judgement.',
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 max-w-screen-xl mx-auto">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-widest text-primary mb-3"
        >
          Simple process
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight"
        >
          How MedSwap works
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connecting line on desktop */}
        <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary-lighter via-primary/30 to-primary-lighter" />

        {steps?.map((step, i) => (
          <motion.div
            key={`step-${step?.number}`}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.12 }}
            className="relative bg-white rounded-2xl border border-gray-100 shadow-card p-6 text-center hover:shadow-card-hover transition-all duration-200"
          >
            {/* Step number circle */}
            <div className="relative mx-auto w-16 h-16 mb-5">
              <div className="w-16 h-16 rounded-full bg-primary-lighter flex items-center justify-center">
                <step.icon size={24} className="text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">{step?.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{step?.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}