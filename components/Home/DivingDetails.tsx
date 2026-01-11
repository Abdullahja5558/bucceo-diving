'use client';
import React, { useState } from 'react';
import { Waves, Thermometer, Calendar, Shirt, Anchor, X } from 'lucide-react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const DIVING_CONDITIONS = {
  visibility: '80-100 feet (24-30 meters) year-round',
  currents: 'Mild to moderate drift diving conditions',
  depthRange: '30-100 feet (9-30 meters)',
};

const WATER_TEMPERATURES = [
  { range: 'Dec - Feb', tempF: '75-78°F', tempC: '(24-26°C)', width: '70%', color: 'bg-blue-500' },
  { range: 'Mar - May', tempF: '78-82°F', tempC: '(26-28°C)', width: '80%', color: 'bg-cyan-500' },
  { range: 'Jun - Nov', tempF: '82-86°F', tempC: '(28-30°C)', width: '90%', color: 'bg-orange-500' },
];

const MARINE_LIFE = {
  seaTurtles: 'Green and Loggerhead turtles year-round',
  reefFish: 'Angelfish, parrotfish, butterflyfish, and barracuda',
  rays: 'Eagle rays and southern stingrays',
  sharks: 'Nurse sharks and occasional bull sharks',
  macroLife: 'Seahorses, octopus, moray eels, and colorful nudibranchs',
};

// Equipment Rental Data
const EQUIPMENT_RENTAL = {
  wetsuits: [
    { name: '3mm Full Wetsuit', price: '$25 / day' },
    { name: '5mm Full Wetsuit', price: '$30 / day' },
    { name: 'Shorty Wetsuit', price: '$15 / day' },
    { name: 'Rash Guard', price: '$10 / day' },
  ],
  divingEquipment: [
    { name: 'BCD (Buoyancy Control Device)', price: '$20 / day' },
    { name: 'Regulator Set', price: '$30 / day' },
    { name: 'Dive Computer', price: '$20 / day' },
    { name: 'Fins, Mask & Snorkel Set', price: '$15 / day' },
    { name: 'Dive Boots', price: '$8 / day' },
  ],
  additionalGear: [
    { name: 'Underwater Camera', price: '$40 / day' },
    { name: 'Dive Light', price: '$12 / day' },
    { name: 'Surface Marker Buoy (SMB)', price: '$10 / day' },
  ],
  packageDeals: [
    { name: 'Complete Dive Kit (BCD, Regulator, Computer, Fins/Mask)', price: '$80 / day' },
    { name: 'Weekly Rental (7 days) - Complete Kit', price: '$450' },
  ],
};


const EquipmentRentalPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
      
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-6">
          <h3 className="text-2xl font-bold text-gray-900">Equipment Rental Pricelist</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

       
        <div className="p-6 space-y-6">
         
          <div>
            <h4 className="text-lg font-semibold text-purple-600 mb-3">Wetsuits</h4>
            <div className="space-y-2">
              {EQUIPMENT_RENTAL.wetsuits.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-900 font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold text-blue-600 mb-3">Diving Equipment</h4>
            <div className="space-y-2">
              {EQUIPMENT_RENTAL.divingEquipment.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-900 font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold text-green-600 mb-3">Additional Gear</h4>
            <div className="space-y-2">
              {EQUIPMENT_RENTAL.additionalGear.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-900 font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold text-pink-600 mb-3">Package Deals</h4>
            <div className="space-y-2">
              {EQUIPMENT_RENTAL.packageDeals.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 px-4 rounded-lg bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200">
                  <span className="text-gray-800 font-medium">{item.name}</span>
                  <span className="text-pink-600 font-bold text-lg">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Notes */}
          <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4 space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">✓</span>
              <p className="text-gray-700 text-sm">All prices in USD. Multi-day discounts available</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">✓</span>
              <p className="text-gray-700 text-sm">Deposit required for rental; refundable upon return</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">✓</span>
              <p className="text-gray-700 text-sm">Reserve equipment in advance during peak season</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// --- Cards ---
const MotionDivingConditionsCard: React.FC = () => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-blue-50 p-2 text-blue-500"><Waves className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold">Diving Conditions</h3>
    </div>
    <div className="space-y-2 text-sm text-gray-700">
      <p><span className="font-semibold">Visibility:</span> {DIVING_CONDITIONS.visibility}</p>
      <p><span className="font-semibold">Currents:</span> {DIVING_CONDITIONS.currents}</p>
      <p><span className="font-semibold">Depth Range:</span> {DIVING_CONDITIONS.depthRange}</p>
    </div>
  </motion.div>
);

const MotionWaterTemperatureCard: React.FC = () => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-yellow-50 p-2 text-yellow-600"><Thermometer className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold">Water Temperature</h3>
    </div>
    <div className="space-y-4">
      {WATER_TEMPERATURES.map((temp, idx) => (
        <div key={idx}>
          <div className="flex justify-between text-sm text-gray-700 mb-1">
            <span className="font-medium">{temp.range}</span>
            <span className="font-semibold">{temp.tempF} {temp.tempC}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200">
            <div className={`h-2 rounded-full ${temp.color}`} style={{ width: temp.width }} />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const MotionBestSeasonCard: React.FC = () => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-green-50 p-2 text-green-600"><Calendar className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold">Best Season</h3>
    </div>
    <div className="space-y-3 text-sm text-gray-700">
      <p><span className="font-medium">Year-Round Diving:</span> Excellent conditions year-round.</p>
      <motion.div 
        className="rounded-lg bg-blue-50 p-3 border border-blue-200"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <p><span className="font-semibold">Peak Season (Dec-Apr):</span> Best visibility, calm seas, ideal weather.</p>
      </motion.div>
      <motion.div 
        className="rounded-lg bg-yellow-50 p-3 border border-yellow-200"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
      >
        <p><span className="font-semibold">Whale Shark Season (Jun-Sep):</span> Swim with gentle giants.</p>
      </motion.div>
    </div>
  </motion.div>
);

const MotionRecommendedEquipmentCard: React.FC<{ onRentalClick: () => void }> = ({ onRentalClick }) => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-purple-50 p-2 text-purple-600"><Shirt className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold">Recommended Equipment</h3>
    </div>
    <ul className="space-y-2 text-sm text-gray-700">
      <li><span className="font-semibold">Dec-Feb:</span> 3mm wetsuit or full 5mm</li>
      <li><span className="font-semibold">Mar-May:</span> 3mm wetsuit or shorty</li>
      <li><span className="font-semibold">Jun-Nov:</span> Shorty wetsuit or rash guard</li>
    </ul>
    <motion.button 
      onClick={onRentalClick}
      className="mt-4 w-full rounded-md bg-blue-50 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      All equipment available for rent
    </motion.button>
  </motion.div>
);

const MotionMarineLifeCard: React.FC = () => (
  <motion.div variants={itemVariants} className="rounded-xl bg-white p-6 shadow-2xl h-full">
    <div className="mb-4 flex items-center space-x-3 text-gray-800">
      <div className="rounded-full bg-green-50 p-2 text-green-600"><Anchor className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold">Marine Life to Expect</h3>
    </div>
    <div className="space-y-2 text-sm text-gray-700">
      <p><span className="font-semibold text-green-700">Sea Turtles:</span> {MARINE_LIFE.seaTurtles}</p>
      <p><span className="font-semibold text-green-700">Reef Fish:</span> {MARINE_LIFE.reefFish}</p>
      <p><span className="font-semibold text-green-700">Rays:</span> {MARINE_LIFE.rays}</p>
      <p><span className="font-semibold text-green-700">Sharks:</span> {MARINE_LIFE.sharks}</p>
      <p><span className="font-semibold text-green-700">Macro Life:</span> {MARINE_LIFE.macroLife}</p>
    </div>
  </motion.div>
);

// --- Main Component ---
const DivingDetails: React.FC = () => {
  const [showRentalPopup, setShowRentalPopup] = useState(false);

  return (
    <div className="p-6 sm:p-8 md:p-12 bg-blue-50 min-h-screen">
      <div className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition duration-300 hover:shadow-3xl">
        <motion.header
          className="mb-8 space-y-1 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-black">Diving in Playa del Carmen</h2>
          <p className="text-gray-600">Experience world-class diving in the heart of the Riviera Maya</p>
        </motion.header>

        {/* Grid 1: Diving Conditions */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <MotionDivingConditionsCard />
          <MotionWaterTemperatureCard />
          <MotionBestSeasonCard />
          <MotionRecommendedEquipmentCard onRentalClick={() => setShowRentalPopup(true)} />
        </motion.div>

        {/* Grid 2: Marine Life and Image */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            className="relative h-72 w-full overflow-hidden rounded-xl shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/Turtle.png"
              alt="Green sea turtle swimming"
              layout="fill"
              objectFit="cover"
              quality={80}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <MotionMarineLifeCard />
          </motion.div>
        </div>
      </div>

      {/* Equipment Rental Popup */}
      {showRentalPopup && (
        <EquipmentRentalPopup onClose={() => setShowRentalPopup(false)} />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DivingDetails;