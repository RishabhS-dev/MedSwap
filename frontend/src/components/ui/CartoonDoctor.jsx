'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expression moods based on mouse proximity/direction
const MOODS = {
  happy: {
    eyes: { left: { cx: 38, cy: 52 }, right: { cx: 62, cy: 52 }, r: 4 },
    pupils: { left: { cx: 39, cy: 53 }, right: { cx: 63, cy: 53 }, r: 2.5 },
    mouth: 'M 34 68 Q 50 80 66 68',
    eyebrows: { left: 'M 30 44 Q 38 40 46 44', right: 'M 54 44 Q 62 40 70 44' },
    blush: true,
    label: '😊 Happy to help!',
  },
  curious: {
    eyes: { left: { cx: 38, cy: 52 }, right: { cx: 62, cy: 52 }, r: 4.5 },
    pupils: { left: { cx: 40, cy: 51 }, right: { cx: 64, cy: 51 }, r: 2.5 },
    mouth: 'M 38 70 Q 50 74 62 70',
    eyebrows: { left: 'M 30 42 Q 38 38 46 42', right: 'M 54 40 Q 62 37 70 43' },
    blush: false,
    label: '🤔 Curious!',
  },
  surprised: {
    eyes: { left: { cx: 38, cy: 52 }, right: { cx: 62, cy: 52 }, r: 5.5 },
    pupils: { left: { cx: 38, cy: 52 }, right: { cx: 62, cy: 52 }, r: 2.5 },
    mouth: 'M 42 68 Q 50 78 58 68',
    eyebrows: { left: 'M 30 40 Q 38 35 46 40', right: 'M 54 40 Q 62 35 70 40' },
    blush: false,
    label: '😮 Oh wow!',
  },
  wink: {
    eyes: { left: { cx: 38, cy: 52 }, right: { cx: 62, cy: 52 }, r: 4 },
    pupils: { left: { cx: 39, cy: 53 }, right: { cx: 63, cy: 53 }, r: 2.5 },
    mouth: 'M 34 68 Q 50 80 66 68',
    eyebrows: { left: 'M 30 44 Q 38 40 46 44', right: 'M 54 44 Q 62 40 70 44' },
    winkLeft: true,
    blush: true,
    label: '😉 Wink!',
  },
  thinking: {
    eyes: { left: { cx: 38, cy: 52 }, right: { cx: 62, cy: 52 }, r: 3.5 },
    pupils: { left: { cx: 36, cy: 50 }, right: { cx: 60, cy: 50 }, r: 2 },
    mouth: 'M 38 70 Q 44 68 62 72',
    eyebrows: { left: 'M 30 44 Q 38 42 46 46', right: 'M 54 42 Q 62 38 70 44' },
    blush: false,
    label: '💭 Thinking...',
  },
};

function getMood(angle, distance) {
  if (distance < 60) return 'surprised';
  if (distance < 120) {
    if (angle > -30 && angle < 30) return 'curious';
    if (angle > 60 && angle < 120) return 'wink';
    return 'thinking';
  }
  return 'happy';
}

export default function CartoonDoctor({ className = '' }) {
  const ref = useRef(null);
  const [mood, setMood] = useState('happy');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref?.current) return;
      const rect = ref?.current?.getBoundingClientRect();
      const centerX = rect?.left + rect?.width / 2;
      const centerY = rect?.top + rect?.height / 2;
      const dx = e?.clientX - centerX;
      const dy = e?.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setMood(getMood(angle, distance));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const m = MOODS?.[mood];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className={`flex flex-col items-center select-none ${className}`}
        >
          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mood}
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mb-2 px-3 py-1.5 bg-white border border-primary/20 rounded-full shadow-sm text-xs font-semibold text-primary whitespace-nowrap"
            >
              {m?.label}
              {/* Bubble tail */}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-2.5 bg-white border-r border-b border-primary/20 rotate-45" />
            </motion.div>
          </AnimatePresence>

          {/* Doctor SVG */}
          <motion.svg
            width="100"
            height="140"
            viewBox="0 0 100 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* White coat body */}
            <rect x="22" y="105" width="56" height="65" rx="12" fill="#f0fafa" stroke="#0d9488" strokeWidth="1.5" />
            {/* Coat lapels */}
            <path d="M 50 108 L 38 120 L 50 130 L 62 120 Z" fill="white" stroke="#0d9488" strokeWidth="1" />
            {/* Stethoscope */}
            <path d="M 35 115 Q 30 130 35 140 Q 40 148 50 148 Q 60 148 65 140 Q 70 130 65 115" stroke="#0d9488" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="150" r="4" fill="#0d9488" />
            {/* Shirt/tie */}
            <rect x="44" y="108" width="12" height="22" rx="3" fill="#ccfbf1" />
            {/* Arms */}
            <rect x="10" y="108" width="14" height="38" rx="7" fill="#f0fafa" stroke="#0d9488" strokeWidth="1.5" />
            <rect x="76" y="108" width="14" height="38" rx="7" fill="#f0fafa" stroke="#0d9488" strokeWidth="1.5" />
            {/* Hands */}
            <ellipse cx="17" cy="150" rx="7" ry="6" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <ellipse cx="83" cy="150" rx="7" ry="6" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            {/* Clipboard in right hand */}
            <rect x="76" y="138" width="16" height="20" rx="2" fill="white" stroke="#0d9488" strokeWidth="1" />
            <line x1="79" y1="143" x2="89" y2="143" stroke="#0d9488" strokeWidth="1" />
            <line x1="79" y1="147" x2="89" y2="147" stroke="#0d9488" strokeWidth="1" />
            <line x1="79" y1="151" x2="85" y2="151" stroke="#0d9488" strokeWidth="1" />
            {/* Neck */}
            <rect x="42" y="95" width="16" height="14" rx="5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            {/* Head */}
            <ellipse cx="50" cy="72" rx="28" ry="30" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            {/* Hair */}
            <path d="M 22 65 Q 24 38 50 36 Q 76 38 78 65 Q 72 48 50 46 Q 28 48 22 65 Z" fill="#1c1917" />
            {/* Doctor cap / hair highlight */}
            <path d="M 30 52 Q 50 44 70 52" stroke="#374151" strokeWidth="1.5" fill="none" />

            {/* Eyebrows */}
            <motion.path
              key={`brow-l-${mood}`}
              d={m?.eyebrows?.left}
              stroke="#1c1917"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={{ d: m?.eyebrows?.left }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              key={`brow-r-${mood}`}
              d={m?.eyebrows?.right}
              stroke="#1c1917"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={{ d: m?.eyebrows?.right }}
              transition={{ duration: 0.3 }}
            />

            {/* Left eye */}
            {m?.winkLeft ? (
              <motion.path
                d="M 33 52 Q 38 48 43 52"
                stroke="#1c1917"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{ opacity: 1 }}
              />
            ) : (
              <>
                <motion.circle
                  cx={m?.eyes?.left?.cx}
                  cy={m?.eyes?.left?.cy}
                  r={m?.eyes?.left?.r}
                  fill="white"
                  stroke="#1c1917"
                  strokeWidth="1.5"
                  animate={{ r: m?.eyes?.left?.r }}
                  transition={{ duration: 0.25 }}
                />
                <motion.circle
                  cx={m?.pupils?.left?.cx}
                  cy={m?.pupils?.left?.cy}
                  r={m?.pupils?.left?.r}
                  fill="#1c1917"
                  animate={{ cx: m?.pupils?.left?.cx, cy: m?.pupils?.left?.cy }}
                  transition={{ duration: 0.25 }}
                />
                <circle cx={m?.pupils?.left?.cx - 0.8} cy={m?.pupils?.left?.cy - 0.8} r={0.8} fill="white" />
              </>
            )}

            {/* Right eye */}
            <motion.circle
              cx={m?.eyes?.right?.cx}
              cy={m?.eyes?.right?.cy}
              r={m?.eyes?.right?.r}
              fill="white"
              stroke="#1c1917"
              strokeWidth="1.5"
              animate={{ r: m?.eyes?.right?.r }}
              transition={{ duration: 0.25 }}
            />
            <motion.circle
              cx={m?.pupils?.right?.cx}
              cy={m?.pupils?.right?.cy}
              r={m?.pupils?.right?.r}
              fill="#1c1917"
              animate={{ cx: m?.pupils?.right?.cx, cy: m?.pupils?.right?.cy }}
              transition={{ duration: 0.25 }}
            />
            <circle cx={m?.pupils?.right?.cx - 0.8} cy={m?.pupils?.right?.cy - 0.8} r={0.8} fill="white" />

            {/* Blush */}
            {m?.blush && (
              <>
                <ellipse cx="32" cy="66" rx="6" ry="3.5" fill="#fca5a5" opacity="0.5" />
                <ellipse cx="68" cy="66" rx="6" ry="3.5" fill="#fca5a5" opacity="0.5" />
              </>
            )}

            {/* Mouth */}
            <motion.path
              key={`mouth-${mood}`}
              d={m?.mouth}
              stroke="#d97706"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={{ d: m?.mouth }}
              transition={{ duration: 0.3 }}
            />

            {/* Nose */}
            <path d="M 47 60 Q 50 65 53 60" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Legs */}
            <rect x="30" y="168" width="14" height="12" rx="5" fill="#0d9488" />
            <rect x="56" y="168" width="14" height="12" rx="5" fill="#0d9488" />
            {/* Shoes */}
            <ellipse cx="37" cy="180" rx="9" ry="5" fill="#1c1917" />
            <ellipse cx="63" cy="180" rx="9" ry="5" fill="#1c1917" />
          </motion.svg>

          {/* Name tag */}
          <div className="mt-1 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-sm">
            Dr. MedBot
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
