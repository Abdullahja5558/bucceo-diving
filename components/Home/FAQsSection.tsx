'use client';
import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
// Import motion and Variants from framer-motion
import { motion, Variants } from 'framer-motion';
import { useRouter } from "next/navigation";


interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  { id: 1, question: 'Do I need to be certified to dive with you?', answer: 'No, not necessarily. We offer beginner experiences like Discover Scuba Diving which do not require prior certification. For certified dives (like reef or wreck dives), you will need a valid PADI or equivalent certification.' },
  { id: 2, question: 'What should I bring for my dive?', answer: 'Please bring your certification card (if applicable), swimwear, a towel, sunscreen (reef-safe recommended), and cash or card for any optional purchases. All diving equipment is available for rent.' },
  { id: 3, question: "What's your cancellation policy?", answer: "Our standard policy offers free cancellation up to 48 hours before the dive. Cancellations within 48 hours may incur a penalty. Please check the specific policy for multi-day courses or liveaboards at the time of booking." },
  { id: 4, question: 'Is diving safe for people with medical conditions?', answer: 'For safety, all divers must complete a medical questionnaire. Certain conditions (e.g., asthma, recent surgery) may require a doctor\'s approval before diving. Please consult us beforehand if you have any concerns.' },
  { id: 5, question: 'How long does a typical dive trip take?', answer: 'A typical two-tank reef dive trip takes about 4-5 hours, including preparation and travel time. Specialty courses or cenote dives may take a full day (6-8 hours).' },
  { id: 6, question: 'What\'s the difference between reef diving and cenote diving?', answer: 'Reef diving is done in the ocean, featuring colorful coral, fish, and marine life. Cenote diving is done in unique, freshwater caverns/caves, offering incredible visibility, stunning light effects, and geological formations.' },
  { id: 7, question: 'Do you provide hotel pickup?', answer: 'Yes, we offer complimentary hotel shuttle service from most hotels in Playa del Carmen. Please arrange pickup times when you book your dive or course.' },
  { id: 8, question: 'Can I dive if I can\'t swim?', answer: 'For safety reasons, basic swimming ability and comfort in the water are required for all certified dives and introductory courses like Discover Scuba Diving.' },
  { id: 9, question: 'What happens if the weather is bad?', answer: 'We prioritize safety. If weather conditions (strong currents, poor visibility) are unsafe, the trip will be rescheduled or a full refund will be provided. Cenote dives are usually unaffected by surface weather.' },
  { id: 10, question: 'Are your instructors certified?', answer: 'Yes, all our instructors are PADI certified and highly experienced professionals who adhere to the strictest safety standards.' },
];

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Subtle stagger for the FAQ list items
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// --- Animated Components ---

interface AccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const FAQAccordionItem: React.FC<AccordionItemProps> = ({ faq, isOpen, onToggle }) => (
  // Apply itemVariants here for the initial staggered fade-in
  <motion.div variants={itemVariants} className="border-b border-gray-100 last:border-b-0">
    <button
      onClick={() => onToggle(faq.id)}
      className="flex w-full items-center justify-between py-3 sm:py-4 text-left text-sm sm:text-base font-medium text-gray-800 transition-colors hover:text-blue-600"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${faq.id}`}
    >
      <span>{faq.question}</span>
      <ChevronDown className={`h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
    </button>
    <div
      id={`faq-answer-${faq.id}`}
      // NOTE: Using Tailwind/CSS for max-height transition is best practice for accordions
      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-3 sm:pb-4' : 'max-h-0 opacity-0'}`}
      style={{ maxHeight: isOpen ? 'fit-content' : '0' }}
    >
      <p className="text-xs sm:text-sm text-gray-600 pr-10 sm:pr-12">{faq.answer}</p>
    </div>
  </motion.div>
);

const FAQsSection: React.FC = () => {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id='faqs' className="p-4 sm:p-8 bg-blue-50 flex justify-center items-start min-h-screen">
      <motion.div
        className="w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition duration-300 hover:shadow-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div className="rounded-xl bg-white p-6 sm:p-8 shadow-2xl" variants={itemVariants}>
          <header className="mb-4 sm:mb-6 flex items-center space-x-2">
            <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-blue-100 text-blue-500">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
              <p className="text-xs sm:text-sm text-gray-500">Everything you need to know before your dive</p>
            </div>
          </header>

          {/* Staggered list of FAQ items */}
          <div className="space-y-0 divide-y divide-gray-100">
            {FAQS_DATA.map((faq) => (
              <FAQAccordionItem key={faq.id} faq={faq} isOpen={openId === faq.id} onToggle={handleToggle} />
            ))}
          </div>
        </motion.div>

        {/* Contact Block - Separate, distinct animation */}
        <motion.div
          className="mt-6 rounded-xl bg-blue-50 p-6 sm:p-8 text-center shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Still have questions?</h3>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
            Our team is here to help you plan the perfect diving experience
          </p>
          <motion.button
            className="mt-3 sm:mt-4 rounded-lg bg-blue-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-colors hover:bg-blue-600 cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/contact")}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQsSection;