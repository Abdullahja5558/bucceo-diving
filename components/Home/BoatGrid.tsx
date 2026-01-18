'use client';
import React from 'react';
import { AirVent, Wifi, Sun, Utensils, Camera, Home, Anchor, Music, Bath } from 'lucide-react';

import { motion, Variants } from 'framer-motion';

interface BoatAmenity {
  id: number;
  label: string;
  icon: React.ElementType;
  isAvailable?: boolean;
}

const AMENITIES_GRID_DATA: BoatAmenity[] = [
  { id: 1, label: 'Air Conditioning', icon: AirVent, isAvailable: true },
  { id: 2, label: 'WiFi', icon: Wifi, isAvailable: true },
  { id: 3, label: 'Sun Deck', icon: Sun, isAvailable: true },
  { id: 4, label: 'Bathrooms', icon: Bath, isAvailable: true },
  { id: 5, label: 'Dining Area', icon: Utensils, isAvailable: true },
  { id: 6, label: 'Camera Room', icon: Camera, isAvailable: true },
  { id: 7, label: 'Lounge', icon: Home, isAvailable: true },
  { id: 8, label: 'Dive Deck', icon: Anchor, isAvailable: true },
  { id: 9, label: 'Entertainment', icon: Music, isAvailable: false },
];


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, 
      delayChildren: 0.1, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const AmenityCard: React.FC<{ amenity: BoatAmenity }> = ({ amenity }) => {
  const { label, icon: Icon, isAvailable = true } = amenity;

  
  return (
    <motion.div
      variants={itemVariants}
      className={`flex flex-col items-center justify-center rounded-xl border p-4 shadow-sm transition-shadow duration-200 h-32
        ${isAvailable ? 'border-gray-200 hover:shadow-lg' : 'opacity-50 border-gray-100 cursor-not-allowed'}
      `}
    >
      <div className={`mb-2 rounded-full p-3 ${isAvailable ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'}`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className={`text-sm text-center ${isAvailable ? 'text-gray-700 font-medium' : 'text-gray-400 font-normal'}`}>
        {label}
      </span>
      {!isAvailable && <span className="text-xs text-red-500 mt-1">Not Available</span>}
    </motion.div>
  );
};

const BoatGrid: React.FC = () => {
  return (
    <div className="flex justify-center p-6 sm:p-8 md:p-9 bg-blue-50 min-h-screen">
        <motion.div
        className="w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition duration-300 hover:shadow-3xl"
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: false, amount: 0.2 }} 
        variants={containerVariants}
      >
        
        <motion.header 
            className="mb-8 sm:mb-10 space-y-1 text-center"
            variants={itemVariants} 
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Boat Amenities</h2>
          <p className="text-gray-600">Premium facilities for your comfort</p>
        </motion.header>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {AMENITIES_GRID_DATA.map((amenity) => (
            
            <AmenityCard key={amenity.id} amenity={amenity} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BoatGrid;