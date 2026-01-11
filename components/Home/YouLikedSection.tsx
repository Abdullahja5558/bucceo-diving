'use client';
import React from 'react';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
// Import motion and Variants from framer-motion
import { motion, Variants } from 'framer-motion';

interface AlternativeBoat {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  imagePath: string;
}

const ALTERNATIVE_BOATS: AlternativeBoat[] = [
  { name: 'Ocean Explorer', location: 'Red Sea, Egypt', rating: 4.8, reviews: 89, price: '$1,950', imagePath: '/swiming1.jpg' },
  { name: 'Deep Blue', location: 'Similan Islands, Thailand', rating: 4.9, reviews: 156, price: '$2,200', imagePath: '/swiming1.jpg' },
  { name: 'Pacific Pearl', location: 'Raja Ampat, Indonesia', rating: 5.0, reviews: 203, price: '$3,800', imagePath: '/swiming1.jpg' },
];

// --- Framer Motion Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Time delay between each card
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// --- Animated Component (BoatCard) ---
const AnimatedBoatCard: React.FC<{ boat: AlternativeBoat }> = ({ boat }) => (
  // Apply the item variant to each card for the slide-up effect
  <motion.div variants={itemVariants} className="flex flex-col rounded-xl bg-white shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
    <div className="relative h-40 sm:h-48 w-full overflow-hidden">
      <Image src={boat.imagePath} alt={`The ${boat.name} liveaboard`} fill style={{ objectFit: 'cover' }} quality={75} />
    </div>
    <div className="p-3 sm:p-4 space-y-2">
      <h4 className="text-base sm:text-lg font-semibold text-gray-800">{boat.name}</h4>
      <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>{boat.location}</span>
      </div>
      <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-700">
        <div className="flex items-center">
          {/* Static Star rendering is fine */}
          {Array(Math.floor(boat.rating)).fill(0).map((_, i) => (
            <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
          ))}
          {boat.rating < 5 && <Star className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />}
        </div>
        <span className="font-semibold">{boat.rating}</span>
        <span className="text-gray-500">({boat.reviews})</span>
      </div>
      <div className="flex items-center justify-between pt-1 sm:pt-2">
        <span className="text-lg sm:text-xl font-bold text-blue-600">{boat.price}</span>
        {/* Button animation for interactivity */}
        <motion.button 
          className="text-xs sm:text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          View Boat
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// --- Main Component ---
const YouLikedSection: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 bg-blue-50 flex justify-center items-start">
      <div className="w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition duration-300 hover:shadow-3xl">
        
        {/* Header - Animate separately */}
        <motion.header 
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">You Might Also Like</h2>
        </motion.header>

        {/* Grid Container - Apply the stagger container variant */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Trigger when 30% of the container is visible
          variants={containerVariants}
        >
          {ALTERNATIVE_BOATS.map((boat, index) => (
            <AnimatedBoatCard key={index} boat={boat} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default YouLikedSection;