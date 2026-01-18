"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Briefcase,
  Users,
  Clock3,
  Star,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle, 
  X,
} from "lucide-react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";


const CountUp = ({ end, duration }: { end: number; duration: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = time - startTime;
      const percent = Math.min(progress / (duration * 1000), 1);

      setCount(Math.floor(percent * end));

      if (percent < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, duration, end]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};


const STATS = [
  { icon: Briefcase, value: 15, unit: "+ Years", label: "Experience" },
  { icon: Users, value: 100000, unit: "+", label: "Happy Divers" },
  {
    icon: Clock3,
    value: 2,
    unit: "2 Hours",
    label: "Response Time",
    custom: true,
  },
];

const CONTACT = {
  phone: "+1 (555) 123-4567",
  email: "info@divicomm.com",
  location: "123 Ocean Drive, Miami Beach, FL 33139",
  hours: [
    { day: "Monday - Friday", time: "7:00 AM - 6:00 PM" },
    { day: "Saturday - Sunday", time: "8:00 AM - 3:00 PM" },
  ],
  emergency: "+1 (555) 909-8899",
};

const TESTIMONIAL = {
  rating: 5.0,
  text: "Great diving experience, very friendly and professional. I was a beginner and felt safe and cared for. Highly recommended!",
  author: "Sarah M., Advanced Diver",
};


const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};
const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};


const StatCard = ({ icon: Icon, value, unit, label, custom }: any) => (
  <motion.div
    variants={fadeUp}
    className="relative overflow-hidden flex flex-col items-center p-6 bg-linear-to-br from-white to-blue-50 shadow-xl rounded-2xl h-32 border border-blue-100 group hover:shadow-2xl hover:scale-105 transition-all duration-300"
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
    <Icon className="h-7 w-7 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
    <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
      {custom ? (
        unit
      ) : (
        <>
          <CountUp end={value} duration={2} />
          {unit}
        </>
      )}
    </span>
    <span className="text-sm text-gray-600 font-medium">{label}</span>
  </motion.div>
);


const ValidationErrorPopup = ({ message, onClose }: { message: string, onClose: () => void }) => {
  
  useEffect(() => {
    
    const timer = setTimeout(() => {
      onClose(); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-100 max-w-lg w-full p-4 bg-red-500 text-white rounded-xl shadow-2xl border border-red-400 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-red-100" />
        <span className="font-semibold text-sm">
          {message}
        </span>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};



export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    divers: "",
    date: "",
    level: "Beginner",
    message: "",
  });

  
  const REQUIRED_FIELDS = [
    { key: "name", label: "Full Name" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Phone Number" },
    { key: "divers", label: "Number of Divers" },
    { key: "date", label: "Preferred Date" },
    { key: "message", label: "Message" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    
    const emptyField = REQUIRED_FIELDS.find(field => !formData[field.key as keyof typeof formData]);

    if (emptyField) {
      
      setValidationError(`Your ${emptyField.label}is required to proceed.  `);
      return; 
    }

    
    setSubmitted(true);
    
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      divers: "",
      date: "",
      level: "Beginner",
      message: "",
    });
    
    
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-blue-50/30 min-h-screen">
      
     
      <AnimatePresence>
        {validationError && (
          <ValidationErrorPopup 
            message={validationError} 
            onClose={() => setValidationError(null)} 
          />
        )}
      </AnimatePresence>

      
      <div
        className="relative py-24 px-8 bg-cover bg-center"
        style={{ backgroundImage: "url(/dive.png)" }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70"></div>

        <a
          href="/#faqs"
          className="absolute top-6 left-6 z-20 flex items-center gap-2
            px-5 py-2.5 rounded-xl
            text-white font-semibold text-sm
            bg-white/10 backdrop-blur-md
            border border-white/20
            shadow-lg shadow-black/20
            hover:bg-white/20 hover:shadow-xl hover:-translate-y-0.5
            transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </a>

        <motion.div
          className="relative text-center max-w-2xl mx-auto text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-sm font-bold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-4 py-1.5 rounded-full border border-blue-400/30"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Let's Connect
          </motion.span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Get in Touch With Us
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Ready to dive into an unforgettable adventure? Our team is here to
            help you make it happen.
          </p>
        </motion.div>
      </div>

      {/* Moves content upward */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10 pb-16">
        {/* -------------------- STATS (unchanged) -------------------- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {STATS.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </motion.div>

        {/* -------------------- MAIN TWO COLUMNS -------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* -------------------- FORM -------------------- */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative">
              <h2 className="text-2xl font-bold mb-2 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Send us a Message
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                We will get back to you within 2 hours during business hours.
              </p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Message sent successfully! We'll contact you soon.
                  </span>
                </motion.div>
              )}

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Full Name *"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Phone Number *"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-9090"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    label="Number of Divers *"
                    name="divers"
                    type="number"
                    placeholder="1"
                    value={formData.divers}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Preferred Date *"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  <Select
                    label="Experience Level"
                    name="level"
                    options={["Beginner", "Certified Diver", "Professional"]}
                    value={formData.level}
                    onChange={handleChange}
                  />
                </div>

                <Textarea
                  label="Your Message *"
                  name="message"
                  placeholder="Tell us about your diving goals and any special requirements..."
                  value={formData.message}
                  onChange={handleChange}
                />

                <motion.button
                  onClick={handleSubmit}
                  className="w-full py-3.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* -------------------- RIGHT SIDEBAR (unchanged) -------------------- */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card title="Contact Information">
              <InfoItem icon={Phone} label="Phone" value={CONTACT.phone} link />
              <InfoItem icon={Mail} label="Email" value={CONTACT.email} link />
              <InfoItem
                icon={MapPin}
                label="Location"
                value={CONTACT.location}
              />

              <div className="flex items-start space-x-3 pt-2">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Business Hours</p>
                  {CONTACT.hours.map((h) => (
                    <p key={h.day} className="text-xs text-gray-600 mt-1">
                      {h.day}: <span className="font-semibold text-gray-800">{h.time}</span>
                    </p>
                  ))}
                </div>
              </div>
            </Card>

            <motion.div
              className="relative overflow-hidden bg-linear-to-br from-red-600 to-red-700 p-6 rounded-2xl text-white shadow-2xl shadow-red-500/30 border border-red-500/20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-bold relative">24/7 Emergency Line</h3>
              <p className="text-xs mb-3 text-red-100 relative">For active dive trips only</p>
              <a
                href={`tel:${CONTACT.emergency}`}
                className="relative flex items-center justify-center py-3 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" /> {CONTACT.emergency}
              </a>
            </motion.div>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              className="bg-linear-to-br from-white to-yellow-50 p-6 rounded-2xl shadow-2xl border border-yellow-100"
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl font-bold text-gray-900">{TESTIMONIAL.rating}</span>
                <div className="flex ml-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                </div>
              </div>

              <p className="text-sm italic text-gray-700 mb-3 leading-relaxed">
                "{TESTIMONIAL.text}"
              </p>
              <p className="text-xs text-gray-600 font-semibold">
                — {TESTIMONIAL.author}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
                        SMALL REUSABLE COMPONENTS (unchanged)
============================================================ */
const Input = ({ label, ...props }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
    />
  </div>
);

const Select = ({ label, options, ...props }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <select
      {...props}
      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
    >
      {options.map((o: string) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      {...props}
      rows={4}
      className="w-full px-4 py-2.5 text-sm border border-gray-200 resize-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
    />
  </div>
);

const Card = ({ title, children }: any) => (
  <div className="bg-linear-to-br from-white to-blue-50 p-6 rounded-2xl shadow-2xl border border-blue-100 space-y-4">
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    {children}
  </div>
);

const InfoItem = ({ icon: Icon, label, value, link = false }: any) => (
  <div className="flex items-start space-x-3 group">
    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
      <Icon className="h-4 w-4 text-blue-600" />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      {link ? (
        <a
          href={`${label === "Phone" ? "tel:" : "mailto:"}${value}`}
          className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-gray-600">{value}</p>
      )}
    </div>
  </div>
);