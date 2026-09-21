import React, { useEffect, useState } from 'react';
import { FounderCard } from '../components/FounderCard';
import { fetchFounders } from '../services/api';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { FoundersVectors } from '../components/AmbientVectors';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const badgeVariants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export const FoundersSection = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFounders = async () => {
      setLoading(true);
      const res = await fetchFounders();
      setFounders(res.data);
      setLoading(false);
    };
    loadFounders();
  }, []);

  return (
    <section className="h-full w-full px-4 py-3 sm:px-6 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-slate-50 relative select-none">
      {/* Background ambient vectors (unique to founders section) */}
      <FoundersVectors />

      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"
        style={{ animation: 'spotlightPulse 14s ease-in-out infinite' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto w-full z-10 flex flex-col gap-3.5 sm:gap-4.5 my-auto"
      >
        {/* Section Header */}
        <div className="text-center space-y-2">
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Meet the Duo</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight"
          >
            Built by Two.{' '}
            <span className="text-indigo-600">Made to Stand Out.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto"
          >
            Creative designs and modern websites, crafted with purpose.
          </motion.p>
        </div>

        {/* Founders Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto w-full animate-pulse">
            <div className="h-80 rounded-2xl bg-white border border-slate-200" />
            <div className="h-80 rounded-2xl bg-white border border-slate-200" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto w-full items-start"
          >
            {founders.map((founder, idx) => (
              <motion.div
                key={founder._id || founder.id || idx}
                variants={itemVariants}
              >
                <FounderCard
                  founder={founder}
                  index={idx}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
