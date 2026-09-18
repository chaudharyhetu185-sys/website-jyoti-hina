import React from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES_DATA } from '../data/mockServices';
import { Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { ServicesVectors } from '../components/AmbientVectors';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const gridVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const cardReveal = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const ServicesSection = ({ onNavigate }) => {
  return (
    <section className="h-full w-full px-4 py-5 sm:px-6 sm:py-6 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-slate-50 relative select-none">
      {/* Decorative ambient vectors (unique perspective grid style) */}
      <ServicesVectors />

      {/* Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[340px] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"
        style={{ animation: 'spotlightPulse 14s ease-in-out infinite 1s' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto w-full z-10 flex flex-col gap-5 my-auto"
      >
        {/* Section Header */}
        <div className="text-center space-y-2">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>What We Do</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight"
          >
            Our <span className="text-indigo-600">Services</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto"
          >
            End-to-end digital solutions designed to elevate your brand and grow your business online.
          </motion.p>
        </div>

        {/* Services Grid — staggered grid reveal */}
        <motion.div
          variants={gridVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {SERVICES_DATA.map((srv, idx) => (
            <motion.div key={srv.id} variants={cardReveal}>
              <ServiceCard
                service={srv}
                index={idx}
                onSelectService={() => onNavigate(4)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
