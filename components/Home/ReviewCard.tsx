'use client';
import React from "react";
import { Quote, Check, Star } from "lucide-react";
// Import motion and Variants from framer-motion
import { motion, Variants } from 'framer-motion';

// --- Framer Motion Variants ---

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const quoteVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.1 },
  },
};

const ratingVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.3 },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// --- Star Rating (No motion wrapper needed here, just the parent) ---
const StarRating = () => (
  <div className="flex items-center space-x-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

// --- Feature Point (Wrapped in motion.div) ---
const FeaturePoint = ({ text }: { text: string }) => (
  <motion.div variants={featureVariants} className="flex items-center space-x-2">
    <div className="rounded-full bg-green-100 p-1">
      <Check className="h-4 w-4 text-green-500" />
    </div>
    <span className="text-sm font-medium text-gray-700">{text}</span>
  </motion.div>
);

// --- Main Component ---
const ReviewCard = () => {
  return (
    <div
      className="p-4 sm:p-6 md:p-8 flex justify-center items-center bg-blue-50"
      style={{ minHeight: "300px" }}
    >
      <motion.div
        className="
           shrink-0 
          bg-linear-to-b from-blue-100 to-white 
          sm:p-6  w-full max-w-6xl rounded-2xl bg-white p-10 md:p-12 shadow-2xl hover:shadow-3xl
          
        "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Re-animates on scroll
        variants={cardVariants}
      >
        {/* Top Review Section */}
        <div className="flex space-x-3 sm:space-x-4">
          {/* Quote Icon - Part of the quote animation */}
          <motion.div 
            className="rounded-full bg-sky-500 p-2 text-white self-start"
            variants={quoteVariants}
          >
            <Quote className="h-6 w-6" />
          </motion.div>

          {/* Blockquote Text - Part of the quote animation */}
          <motion.blockquote 
            className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed"
            variants={quoteVariants}
          >
            "The Blue Voyager exceeded all expectations. The crew was fantastic,
            and we saw mantas every single day!"
          </motion.blockquote>
        </div>

        {/* Rating Section - Apply separate animation */}
        <motion.div 
          className="mt-4 flex items-center space-x-3 sm:space-x-4 pl-10 sm:pl-14"
          variants={ratingVariants}
        >
          <StarRating />
          <span className="text-sm font-medium text-gray-600">
            David M. • October 2025
          </span>
        </motion.div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* Features - Apply Staggered Feature Animation */}
        <motion.div 
          className="flex flex-col space-y-4 md:flex-row md:justify-around md:space-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={cardVariants} // Reusing cardVariants for feature stagger
        >
          <FeaturePoint text="Luxury all-inclusive experience" />
          <FeaturePoint text="World-class dive sites & marine life" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReviewCard;