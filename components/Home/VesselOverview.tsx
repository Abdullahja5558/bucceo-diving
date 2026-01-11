'use client';
import React from "react";
import Image from "next/image";
// Import motion and Variants from framer-motion
import { motion, Variants } from 'framer-motion';
import { useRouter } from "next/navigation";


const VESSEL_SPECS = [
  { label: "Built", value: "2010" },
  { label: "Refurbished", value: "2022" },
  { label: "Length", value: "30m" },
  { label: "Guests", value: "12" },
  { label: "Crew", value: "8" },
  { label: "Boat Plan", value: "Available" },
];

// --- Framer Motion Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const pillItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 12 }
  },
};

// --- Animated Pill Component ---
const Pill = ({ label, value, isClickable, onClick }: { label: string; value: string; isClickable?: boolean; onClick?: () => void }) => (
  <motion.div 
    variants={pillItemVariants} 
    className={`flex flex-col items-center rounded-lg bg-gray-100 p-3 shadow-inner ${isClickable ? 'cursor-pointer hover:bg-blue-100 hover:shadow-lg transition-all duration-300' : ''}`}
    onClick={onClick}
    whileHover={isClickable ? { scale: 1.05 } : {}}
    whileTap={isClickable ? { scale: 0.95 } : {}}
  >
    <span className={`text-sm font-medium ${isClickable ? 'text-blue-600' : 'text-gray-800'}`}>{value}</span>
    <span className="text-xs text-gray-500">{label}</span>
  </motion.div>
);


export default function VesselOverview() {
  const router = useRouter();

  const handleBoatPlanClick = () => {
    router.push("/boatplan");
  };

  return (
    <div id="vesseloverview" className="flex justify-center p-4 sm:p-6 md:p-8 bg-blue-50 min-h-screen">
      <div className="w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition hover:shadow-3xl">
        
        {/* Header - Simple Fade/Slide Down */}
        <motion.h2 
          className="mb-6 sm:mb-8 md:mb-10 text-2xl sm:text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          Vessel Overview
        </motion.h2>

        {/* Main Grid: Image and Text */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
          
          {/* Image - Fade in */}
          <motion.div 
            className="relative w-full h-72 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/Boat.png"
              alt="The Blue Voyager liveaboard diving vessel"
              fill
              className="object-cover"
              quality={80}
            />
          </motion.div>

          {/* Description Text - Slide in from right and stagger lines */}
          <motion.div 
            className="text-gray-700 space-y-4 leading-relaxed text-base sm:text-lg md:text-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p>
              The Blue Voyager is a state-of-the-art diving vessel that combines
              luxury accommodation with world-class diving facilities. Completely
              refurbished in 2022, she offers the perfect balance of comfort and
              adventure.
            </p>
            <p>
              Our experienced crew of 8 ensures impeccable service, while expert
              dive guides take you to the most spectacular dive sites in the
              Maldives and Indian Ocean.
            </p>
            <p>
              With a maximum of just 12 guests, you'll enjoy an intimate and
              personalized liveaboard experience that larger vessels cannot
              match.
            </p>
          </motion.div>
        </div>

        {/* Spec Pills - Staggered Grid Animation */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          {VESSEL_SPECS.map((spec) => (
            <Pill 
              key={spec.label} 
              {...spec} 
              isClickable={spec.label === "Boat Plan"}
              onClick={spec.label === "Boat Plan" ? handleBoatPlanClick : undefined}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}