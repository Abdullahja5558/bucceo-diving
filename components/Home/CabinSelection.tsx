'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Check, X, Calendar, User, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CabinFeature { label: string; }
interface Cabin { 
  id: number; 
  name: string; 
  features: CabinFeature[];
  price: string;
  size: string;
  capacity: string;
  bedType: string;
  bathroom: string;
}

const CABIN_DATA: Cabin[] = [
  {
    id: 1,
    name: 'Standard Cabin',
    price: '$199 per night',
    size: '120 sq ft',
    capacity: '2 guests',
    bedType: 'Twin or Double',
    bathroom: 'Private',
    features: [
      { label: 'Twin beds or double bed configuration' },
      { label: 'Individual climate control air conditioning' },
      { label: 'Adjustable reading lights' },
      { label: 'Daily housekeeping service' },
      { label: 'Emergency communication system' },
      { label: 'Private bathroom with shower' },
      { label: 'Secure storage lockers for valuables' },
      { label: 'Complimentary toiletries' },
      { label: 'Power outlets and USB charging ports' },
      { label: 'Safe and secure environment' },
    ],
  },
  {
    id: 2,
    name: 'Deluxe Cabin',
    price: '$299 per night',
    size: '180 sq ft',
    capacity: '2 guests',
    bedType: 'Queen',
    bathroom: 'Premium',
    features: [
      { label: 'Queen bed' },
      { label: 'Premium bathroom' },
      { label: 'Ocean view porthole' },
      { label: 'Mini fridge' },
      { label: 'Premium linens' },
      { label: 'Bathrobes' },
    ],
  },
  {
    id: 3,
    name: 'Master Suite',
    price: '$499 per night',
    size: '250 sq ft',
    capacity: '2-3 guests',
    bedType: 'King',
    bathroom: 'Ensuite',
    features: [
      { label: 'King bed' },
      { label: 'Ensuite bathroom' },
      { label: 'Private deck access' },
      { label: 'Premium amenities' },
      { label: 'Extra space' },
      { label: 'Complimentary drinks' },
    ],
  },
];

// Toast Notification Component
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-100 bg-red-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center space-x-2"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span className="font-semibold">{message}</span>
    </motion.div>
  );
};

// Popup 1: Cabin Details
const CabinDetailsPopup = ({ 
  cabin, 
  onClose, 
  onBookNow 
}: { 
  cabin: Cabin; 
  onClose: () => void;
  onBookNow: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 hover:bg-white transition-colors shadow-lg"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Image */}
        <div className="relative h-48 w-full">
          <Image src="/Cabin.jpg" alt={cabin.name} fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
            <h3 className="text-2xl font-bold text-white">{cabin.name}</h3>
            <p className="text-white/90 text-sm">From {cabin.price}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* About This Cabin */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">About This Cabin</h4>
            <p className="text-sm text-gray-600">
              Our {cabin.name} offers comfortable and functional accommodations perfect for budget-conscious travelers. 
              Each cabin is designed with your comfort in mind, featuring all essential amenities and thoughtful touches.
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-1">Size</p>
              <p className="text-sm font-semibold text-gray-800">{cabin.size}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Capacity</p>
              <p className="text-sm font-semibold text-gray-800">{cabin.capacity}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Bed Type</p>
              <p className="text-sm font-semibold text-gray-800">{cabin.bedType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Bathroom</p>
              <p className="text-sm font-semibold text-gray-800">{cabin.bathroom}</p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Amenities & Features</h4>
            <div className="grid grid-cols-1 gap-2">
              {cabin.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onBookNow}
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Book Now
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Check Availability
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Popup 2: Booking Form
const BookingFormPopup = ({ 
  cabin, 
  onClose, 
  onOpenCalendar,
  checkInDate,
  checkOutDate,
  onConfirm,
  onValidationError,
  formData,
  setFormData
}: { 
  cabin: Cabin; 
  onClose: () => void;
  onOpenCalendar: (type: 'checkin' | 'checkout') => void;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onConfirm: () => void;
  onValidationError: () => void;
  formData: { guests: string; fullName: string; email: string; phone: string };
  setFormData: (data: any) => void;
}) => {
  const handleConfirm = () => {
    if (!checkInDate || !checkOutDate || !formData.fullName || !formData.email || !formData.phone) {
      onValidationError();
      return;
    }
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-cyan-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <h3 className="text-2xl font-bold text-white">Book Your Stay</h3>
          <p className="text-white/90 text-sm mt-1">{cabin.name} · {cabin.price}</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Check-in Date
              </label>
              <button
                onClick={() => onOpenCalendar('checkin')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left text-sm hover:border-blue-500 transition-colors cursor-pointer"
              >
                {checkInDate ? checkInDate.toLocaleDateString() : 'Select date'}
              </button>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Check-out Date
              </label>
              <button
                onClick={() => onOpenCalendar('checkout')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left text-sm hover:border-blue-500 transition-colors cursor-pointer"
              >
                {checkOutDate ? checkOutDate.toLocaleDateString() : 'Select date'}
              </button>
            </div>
          </div>

          {/* Number of Guests */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User className="h-4 w-4 mr-1" />
              Number of Guests
            </label>
            <input
              type="number"
              min="1"
              max="3"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter number of guests"
            />
          </div>

          {/* Your Information */}
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Your Information</h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Popup 3: Calendar
const CalendarPopup = ({ 
  onClose, 
  onSelectDate,
  dateType
}: { 
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  dateType: 'checkin' | 'checkout';
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { 
      daysInMonth: lastDay.getDate(), 
      startingDayOfWeek: firstDay.getDay() 
    };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookedDates = [5, 6, 12, 13, 20, 27];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    if (clickedDate < today || bookedDates.includes(day)) return;
    setSelectedDate(clickedDate);
  };

  const handleProceed = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
      onClose();
    }
  };

  const getDateStatus = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    if (date < today) return 'past';
    if (bookedDates.includes(day)) return 'booked';
    return 'available';
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-cyan-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <h3 className="text-2xl font-bold text-white">Check Availability</h3>
          <p className="text-white/90 text-sm mt-1">Deluxe Cabin</p>
        </div>

        {/* Calendar */}
        <div className="p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-800">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const status = getDateStatus(day);
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isSelected = selectedDate?.getTime() === date.getTime();

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  disabled={status === 'past' || status === 'booked'}
                  className={`
                    relative h-12 rounded-lg text-sm font-medium transition-all
                    ${status === 'available' && !isSelected ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                    ${status === 'booked' ? 'bg-red-100 text-red-400 cursor-not-allowed' : ''}
                    ${status === 'past' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2' : ''}
                  `}
                >
                  {day}
                  {status === 'available' && !isSelected && (
                    <Check className="absolute top-1 right-1 h-3 w-3 text-green-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded bg-green-100" />
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded bg-red-100" />
              <span className="text-gray-600">Booked</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded bg-gray-100" />
              <span className="text-gray-600">Past Date</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleProceed}
              disabled={!selectedDate}
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Proceed to Book
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Popup 4: Success Message
const SuccessPopup = ({ cabin }: { cabin: Cabin }) => {
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
        <p className="text-gray-600 mb-6">
          Your <span className="font-semibold">{cabin.name}</span> has been successfully booked. 
          We've sent a confirmation email with all the details.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            ✓ Reservation confirmed<br />
            ✓ Payment processed<br />
            ✓ Confirmation email sent
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Main Component
const CabinCard: React.FC<{ cabin: Cabin }> = ({ cabin }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [calendarType, setCalendarType] = useState<'checkin' | 'checkout'>('checkin');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({ guests: '', fullName: '', email: '', phone: '' });

  const handleConfirmBooking = () => {
    setShowBooking(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCheckInDate(null);
      setCheckOutDate(null);
      setFormData({ guests: '', fullName: '', email: '', phone: '' });
    }, 3000);
  };

  const handleValidationError = () => {
    setShowToast(true);
  };

  const handleViewDetails = () => {
    setShowDetails(true);
  }

  return (
    <>
      <motion.div
        className="flex flex-col rounded-xl bg-white overflow-hidden shadow-2xl transition duration-300 hover:shadow-3xl"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden"
          initial={{ opacity: 0, scale: 1.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Image
            src="/Cabin.jpg"
            alt={`${cabin.name} interior`}
            fill
            className="object-cover"
            quality={80}
          />
        </motion.div>

        <motion.div 
          className="p-4 flex flex-col grow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-4 text-xl font-bold text-gray-800">{cabin.name}</h3>

          <ul className="space-y-3 grow">
            {cabin.features.slice(0, 6).map((feature, idx) => (
              <motion.li 
                key={idx} 
                className="flex items-start space-x-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
              >
                <Check className="h-4 w-4 shrink-0 text-green-500 mt-1" />
                <span className="text-sm text-gray-700">{feature.label}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button 
              onClick={handleViewDetails}
              className="w-full rounded-md bg-blue-600 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-700 cursor-pointer"
            >
              View Details
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Popups */}
      {showToast && <Toast message="Please fill all required fields!" onClose={() => setShowToast(false)} />}
      
      {showDetails && (
        <CabinDetailsPopup
          cabin={cabin}
          onClose={() => setShowDetails(false)}
          onBookNow={() => { setShowDetails(false); setShowBooking(true); }}
        />
      )}

      {showBooking && (
        <BookingFormPopup
          cabin={cabin}
          onClose={() => setShowBooking(false)}
          onOpenCalendar={(type) => { setCalendarType(type); setShowCalendar(true); }}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onConfirm={handleConfirmBooking}
          onValidationError={handleValidationError}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {showCalendar && (
        <CalendarPopup
          onClose={() => setShowCalendar(false)}
          onSelectDate={(date) => {
            if (calendarType === 'checkin') setCheckInDate(date);
            else setCheckOutDate(date);
          }}
          dateType={calendarType}
        />
      )}

      {showSuccess && <SuccessPopup cabin={cabin} />}
    </>
  );
};

const CabinSelection: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-blue-50 min-h-screen">
      <div ref={ref} className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition duration-300 hover:shadow-3xl">
        <header className="mb-6 sm:mb-8 md:mb-10 space-y-1 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Cabin</h2>
          <p className="text-gray-600">Choose your perfect accommodation</p>
        </header>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {CABIN_DATA.map((cabin) => (
            <CabinCard key={cabin.id} cabin={cabin} />
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CabinSelection;