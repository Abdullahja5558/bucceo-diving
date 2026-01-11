'use client';
import React from 'react';
import { MapPin, Send } from 'lucide-react';
// Import motion and Variants from framer-motion
import { motion, Variants } from 'framer-motion';

// --- Data Structure ---
const LOCATION_DETAILS = {
  name: 'Paradise Diving Mexico',
  addressLine1: 'Calle 14 Norte, Playa del Carmen',
  addressLine2: 'Riviera Maya, Quintana Roo, Mexico',
};

const GETTING_HERE_INFO = '5-minute walk from 5th Avenue, 45 minutes from Cancún Airport. Free shuttle service available from most hotels in Playa del Carmen.';

// --- Framer Motion Variants ---

// Variants for the overall card container
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: 'beforeChildren', // Animate container before children
      staggerChildren: 0.1,
    },
  },
};

// Variants for individual text lines/elements
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Variant specifically for the icon/title for a stronger initial entrance
const iconTitleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { 
            type: 'spring', 
            stiffness: 100, 
            damping: 15 
        } 
    },
};


// --- Main Component ---

const LocationSection: React.FC = () => {
  return (
    // Outer Container
    <div className="p-8 bg-blue-50 flex justify-center items-start">
      
      {/* Location Card Wrapper - Apply card animation */}
      <motion.div
        className="w-full max-w-6xl rounded-2xl bg-white p-10 md:p-12 shadow-2xl transition duration-300 hover:shadow-3xl"
        initial="hidden"
        whileInView="visible" // Triggers animation on scroll
        viewport={{ once: false, amount: 0.2 }} // Re-animates when user scrolls back
        variants={cardVariants}
      >
        
        {/* Top Section: Icon and Address */}
        <div className="p-8 text-center">
          
          {/* Map Pin Icon - Strong entrance animation */}
          <motion.div 
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg"
            variants={iconTitleVariants}
          >
            <MapPin className="h-8 w-8" />
          </motion.div>
          
          {/* Address Details - Staggered text */}
          <div className="space-y-1 text-gray-700">
            <motion.h3 className="text-xl font-semibold text-gray-800" variants={itemVariants}>{LOCATION_DETAILS.name}</motion.h3>
            <motion.p className="text-sm" variants={itemVariants}>{LOCATION_DETAILS.addressLine1}</motion.p>
            <motion.p className="text-sm" variants={itemVariants}>{LOCATION_DETAILS.addressLine2}</motion.p>
          </div>
          
          {/* Get Directions Button - Final element to animate */}
          <motion.button 
            className="mt-6 inline-flex items-center space-x-2 rounded-full border border-blue-500 bg-white px-5 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-50"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="h-4 w-4" />
            <span>Get Directions</span>
          </motion.button>
        </div>

        {/* Bottom Section: Getting Here Info */}
        <div className="border-t border-gray-100 p-6 pt-4">
          <motion.p className="text-sm font-semibold text-gray-800 mb-1" variants={itemVariants}>Getting Here:</motion.p>
          <motion.p className="text-sm text-gray-600" variants={itemVariants}>{GETTING_HERE_INFO}</motion.p>
        </div>
        
      </motion.div>
    </div>
  );
};

export default LocationSection;