'use client';
import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const included = [
  "All diving (tanks, weights, guides)",
  "Full board (breakfast, lunch, dinner)",
  "Unlimited tea, coffee & water",
  "Nitrox (for certified divers)",
  "Airport transfers (Malé)",
  "WiFi access",
  "All dive equipment cleaning",
  "Daily cabin service",
  "Snacks between dives",
];

const excluded = [
  "Alcoholic beverages",
  "Soft drinks & juices",
  "Equipment rental",
  "Travel insurance",
  "Marine park fees",
  "Crew tips (recommended)",
  "Personal expenses",
  "Specialty diving courses",
  "Solo cabin supplement",
];

const Item = ({ label, included }: { label: string; included: boolean }) => {
  const Icon = included ? Check : X;
  const iconColor = included
    ? "text-green-500 bg-green-100"
    : "text-red-500 bg-red-100";

  return (
    <motion.div
      className="flex items-start space-x-3"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`shrink-0 rounded-full p-0.5 ${iconColor}`}>
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-base text-gray-700">{label}</span>
    </motion.div>
  );
};

export default function InclusionsCard() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  return (
    <div
      ref={ref}
      className="flex justify-center p-4 sm:p-6 md:p-8 bg-blue-50 min-h-screen"
    >
      <motion.div
        className="w-full max-w-6xl rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl bg-gray-50"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <header className="mb-8 text-center text-2xl sm:text-3xl font-bold text-gray-800">
          What's Included & Not Included
        </header>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
          <motion.div
            className="flex-1 rounded-lg bg-white-50 p-6 shadow-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 flex items-center space-x-2 text-xl font-semibold text-green-700">
              <Check className="h-5 w-5" />
              <span>Included</span>
            </h3>
            <div className="space-y-3">
              {included.map((item, i) => (
                <Item key={i} label={item} included={true} />
              ))}
            </div>
          </motion.div>

          {/* Not Included */}
          <motion.div
            className="flex-1 rounded-lg bg-white-50 p-6 shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 flex items-center space-x-2 text-xl font-semibold text-red-700">
              <X className="h-5 w-5" />
              <span>Not Included</span>
            </h3>
            <div className="space-y-3">
              {excluded.map((item, i) => (
                <Item key={i} label={item} included={false} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
