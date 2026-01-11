'use client';
import React from 'react';
import { Shield, Globe, HeartPulse, CreditCard, FileText } from 'lucide-react';
// Import motion and Variants from framer-motion
import { motion, Variants } from 'framer-motion';

// --- Framer Motion Variants ---

// Container for the overall stagger effect
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Time delay between each card
      delayChildren: 0.2, // Delay before the first card starts
    },
  },
};

// Variant for each individual card (item)
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

// --- Cards (Now using motion.div) ---
const SafetyCertificationsCard: React.FC = () => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-blue-50 p-2 text-blue-500">
        <Shield className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">Safety Certifications</h3>
    </div>
    <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
      <li>SOLAS Certified</li>
      <li>Annual Safety Inspections</li>
      <li>Emergency Oxygen & First Aid</li>
      <li>Life Rafts & Safety Equipment</li>
    </ul>
  </motion.div>
);

const CrewLanguagesCard: React.FC = () => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-blue-50 p-2 text-blue-500">
        <Globe className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">Crew & Languages</h3>
    </div>
    <div className="space-y-2 text-sm text-gray-700">
      <p>Professional crew of 8 including captain, engineer, chef, and dive guides.</p>
      <p><span className="font-medium">Languages:</span> English, German, French</p>
    </div>
  </motion.div>
);

const MedicalFacilitiesCard: React.FC = () => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-yellow-50 p-2 text-yellow-500">
        <HeartPulse className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">Medical Facilities</h3>
    </div>
    <p className="text-sm text-gray-700">
      Oxygen on board, first aid kits, emergency evacuation procedures, nearest hospital contact 24/7.
    </p>
  </motion.div>
);

const PaymentMethodsCard: React.FC = () => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-blue-50 p-2 text-blue-500">
        <CreditCard className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">Payment Methods</h3>
    </div>
    <p className="text-sm text-gray-700">
      Visa, Mastercard, Bank Transfer, PayPal. 30% deposit required at booking.
    </p>
  </motion.div>
);

const CancellationPolicyCard: React.FC = () => (
  // This card is outside the main grid but uses the same item variant for continuity
  <motion.div variants={itemVariants} className="rounded-xl bg-amber-50 p-6 shadow-2xl h-full border border-amber-200">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-amber-100 p-2 text-amber-600">
        <FileText className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">Cancellation Policy</h3>
    </div>
    <div className="space-y-1 text-sm text-gray-700">
      <p>Free cancellation up to 60 days before departure.</p>
      <p>50% refund 30-59 days. Non-refundable within 30 days.</p>
      <p><span className="font-medium">Travel insurance highly recommended.</span></p>
    </div>
  </motion.div>
);

// --- Main Component ---
const VesselDetails: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 md:p-12 bg-blue-50 min-h-screen">
      {/* 4. Apply motion to the main wrapper to control the whole section's animation */}
      <motion.div
        className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition duration-300 hover:shadow-3xl"
        initial="hidden"
        whileInView="visible" // Animation triggers when section scrolls into view
        viewport={{ once: false, amount: 0.2 }} // `once: false` ensures re-animation on scroll
        variants={containerVariants}
      >
        {/* Animate the main heading slightly before the cards */}
        <motion.h2 variants={itemVariants} className="mb-8 text-2xl sm:text-3xl font-semibold text-gray-800">
          Vessel Details
        </motion.h2>

        {/* Top Grid - The container variants apply stagger to the immediate children */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SafetyCertificationsCard />
          <CrewLanguagesCard />
          <MedicalFacilitiesCard />
          <PaymentMethodsCard />
        </div>

        {/* Full-width Cancellation Policy */}
        <div className="mt-6">
          <CancellationPolicyCard />
        </div>
      </motion.div>
    </div>
  );
};

export default VesselDetails;