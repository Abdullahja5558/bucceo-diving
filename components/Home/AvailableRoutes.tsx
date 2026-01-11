"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, SlidersHorizontal, ChevronDown, X, MapPin } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface Route {
  id: number;
  date: { day: string; month: string };
  itinerary: { name: string; dives: string; popular?: boolean };
  duration: string;
  price: string;
  spacesAvailable: number;
}

const ROUTES: Route[] = [
  {
    id: 1,
    date: { day: "16", month: "FEB" },
    itinerary: { name: "North Male Atolls Classic", dives: "18-20 Dives", popular: true },
    duration: "7 Days/6 Nights\nFeb 16 - Feb 23",
    price: "€2,199",
    spacesAvailable: 6,
  },
  {
    id: 2,
    date: { day: "23", month: "FEB" },
    itinerary: { name: "South Ari Explorer", dives: "16-18 Dives" },
    duration: "7 Days/6 Nights\nFeb 23 - Mar 2",
    price: "€2,450",
    spacesAvailable: 2,
  },
  {
    id: 3,
    date: { day: "11", month: "MAR" },
    itinerary: { name: "Deep South Adventure", dives: "24-28 Dives" },
    duration: "10 Days/11 Nights\nMar 11 - Mar 21",
    price: "€3,299",
    spacesAvailable: 8,
  },
  {
    id: 4,
    date: { day: "4", month: "MAR" },
    itinerary: { name: "Best of Maldives", dives: "30-35 Dives" },
    duration: "14 Days/15 Nights\nMar 4 - Mar 18",
    price: "€4,599",
    spacesAvailable: 5,
  },
  {
    id: 5,
    date: { day: "28", month: "MAR" },
    itinerary: { name: "North Male Atolls Classic", dives: "18-20 Dives", popular: true },
    duration: "7 Days/6 Nights\nMar 28 - Apr 4",
    price: "€2,199",
    spacesAvailable: 4,
  },
  {
    id: 6,
    date: { day: "15", month: "APR" },
    itinerary: { name: "Central Atolls Circuit", dives: "20-22 Dives" },
    duration: "8 Days/9 Nights\nApr 15 - Apr 23",
    price: "€2,699",
    spacesAvailable: 7,
  },
  {
    id: 7,
    date: { day: "6", month: "MAY" },
    itinerary: { name: "Whale Shark Special", dives: "14-16 Dives" },
    duration: "6 Days/7 Nights\nMay 6 - May 12",
    price: "€1,899",
    spacesAvailable: 1,
  },
];

const filterOptions = [
  { id: 'all', label: 'All Upcoming Dates', subtitle: 'Show all available departures' },
  { id: '30days', label: 'Next 30 Days', subtitle: 'Departures in the next month' },
  { id: '3months', label: 'Next 3 Months', subtitle: 'Departures in the next quarter' },
  { id: '6months', label: 'Next 6 Months', subtitle: 'Departures in the next half year' },
  { id: 'feb2025', label: 'February 2025', subtitle: 'All February departures' },
  { id: 'mar2025', label: 'March 2025', subtitle: 'All March departures' },
  { id: 'apr2025', label: 'April 2025', subtitle: 'All April departures' },
  { id: 'may2025', label: 'May 2025', subtitle: 'All May departures' },
  { id: 'custom', label: 'Custom Date Range', subtitle: 'Select specific dates' },
];

const SelectCabinButton = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold uppercase text-white shadow-md hover:bg-sky-600 transition cursor-pointer"
  >
    Select Cabin
  </button>
);

const AvailabilityText = ({ spaces }: { spaces: number }) => {
  if (spaces === 1) return <p className="text-xs text-red-500">only 1 space left</p>;
  if (spaces <= 3) return <p className="text-xs text-orange-500">only {spaces} spaces left</p>;
  return <p className="text-xs text-gray-500">{spaces} spaces available</p>;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Filter Popup Component
const FilterPopup = ({ isOpen, onClose, selectedFilter, onSelectFilter }: {
  isOpen: boolean;
  onClose: () => void;
  selectedFilter: string;
  onSelectFilter: (id: string) => void;
}) => {
  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    if (id === 'custom') {
      onSelectFilter(id);
    } else {
      onSelectFilter(id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/95 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden border border-white/20"
      >
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5" />
            <h3 className="font-semibold text-base">Filter by Departure Date</h3>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300 transition cursor-pointer">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-70px)]">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left px-5 py-4 border-b border-gray-100 hover:bg-blue-50/80 transition cursor-pointer ${
                selectedFilter === option.id ? 'bg-blue-50/80' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-base">{option.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{option.subtitle}</p>
                </div>
                {selectedFilter === option.id && (
                  <div className="ml-4">
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Premium Custom Date Range Popup
const CustomDatePopup = ({ isOpen, onClose, onApply }: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (startDate: string, endDate: string) => void;
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  const handleApply = () => {
    if (startDate && endDate) {
      onApply(startDate, endDate);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-linear-to-br from-white via-white to-blue-50/30 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.3)] w-full max-w-lg overflow-hidden border border-white/50"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-sky-400/20 to-cyan-400/20 rounded-full blur-3xl z-0" />
        
        <div className="relative z-10">
          {/* Premium Header */}
          <div className="relative bg-linear-to-r from-blue-600 via-blue-500 to-sky-500 text-white p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            
            <div className="relative flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Select Your Journey</h3>
                  <p className="text-blue-100 text-sm font-light">Choose your adventure dates</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Start Date */}
            <div className="group">
              <label className="text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                <div className="h-6 w-6 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">1</div>
                <span>Departure Date</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* End Date */}
            <div className="group">
              <label className=" text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                <div className="h-6 w-6 rounded-lg bg-linear-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white text-xs font-bold">2</div>
                <span>Return Date</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Preview Card */}
            {startDate && endDate && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-linear-to-r from-blue-500 to-sky-500 rounded-2xl p-6 shadow-lg"
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <div className="relative flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-blue-100 uppercase tracking-wide mb-1">Your Selected Range</p>
                    <p className="text-white font-bold text-lg">
                      {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-100">Duration</p>
                    <p className="text-white font-bold text-xl">{Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl font-bold text-gray-700 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!startDate || !endDate}
              className={`flex-1 px-6 py-4 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg ${
                startDate && endDate 
                  ? 'bg-linear-to-r from-blue-600 via-blue-500 to-sky-500 hover:shadow-2xl hover:scale-105 active:scale-95' 
                  : 'bg-gray-300 cursor-not-allowed '
              }`}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AvailableRoutes = () => {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterLabel, setFilterLabel] = useState('All Upcoming Dates');

  const handleNavigation = (route: Route) => {
    // URL params me saari details pass karo
    const params = new URLSearchParams({
      id: route.id.toString(),
      name: route.itinerary.name,
      dives: route.itinerary.dives,
      duration: route.duration.replace('\n', ' '),
      price: route.price,
      spaces: route.spacesAvailable.toString(),
      popular: route.itinerary.popular ? 'true' : 'false'
    });
    router.push(`/itinerary?${params.toString()}`);
  };

  const handleFilterSelect = (id: string) => {
    if (id === 'custom') {
      setIsCustomDateOpen(true);
      setIsFilterOpen(false);
    } else {
      setSelectedFilter(id);
      const option = filterOptions.find(opt => opt.id === id);
      if (option) setFilterLabel(option.label);
    }
  };

  const handleCustomDateApply = (start: string, end: string) => {
    setSelectedFilter('custom');
    const startFormatted = new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endFormatted = new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setFilterLabel(`${startFormatted} - ${endFormatted}`);
  };

  return (
    <motion.div
    id='availableroutes'
      className="flex justify-center p-4 bg-gray-50 min-h-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="w-full max-w-6xl rounded-2xl bg-white p-6 md:p-10 shadow-2xl">
        <motion.header className="mb-6 space-y-1" variants={rowVariants}>
          <h2 className="text-2xl font-bold text-gray-800">Available Routes</h2>
          <p className="text-sm text-gray-500">Explore our expedition itineraries</p>
        </motion.header>

        <motion.div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0" variants={rowVariants}>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Filter by departure date:</span>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>{filterLabel}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <motion.tr className="bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider text-white" variants={rowVariants}>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Itinerary</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3 text-center">Itinerary</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Select</th>
              </motion.tr>
            </thead>

            <motion.tbody className="divide-y divide-gray-100 bg-white">
              {ROUTES.map((route) => (
                <motion.tr key={route.id} className="hover:bg-blue-50 transition" variants={rowVariants}>
                  <td className="px-4 py-4">
                    <div className="h-14 w-12 flex flex-col items-center justify-center rounded-md bg-gray-900 text-white shadow-md">
                      <span className="text-xl font-bold">{route.date.day}</span>
                      <span className="text-xs font-semibold">{route.date.month}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                          {route.itinerary.name}
                        </span>
                        {route.itinerary.popular && (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{route.itinerary.dives}</p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-700 whitespace-pre-line">{route.duration}</td>

                  {/* ITINERARY Column */}
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => handleNavigation(route)}
                      className="px-4 py-2 bg-transparent border-2 border-blue-500 text-blue-600 font-semibold text-xs rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md uppercase cursor-pointer"
                    >
                      Itinerary
                    </button>
                  </td>

                  <td className="px-4 py-4 text-lg font-bold text-gray-900">{route.price}</td>

                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center space-y-1">
                      <SelectCabinButton onClick={() => handleNavigation(route)} />
                      <AvailabilityText spaces={route.spacesAvailable} />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        <motion.div className="mt-6 flex justify-center text-sm text-gray-500" variants={rowVariants}>
          Showing {ROUTES.length} departures
        </motion.div>
      </div>

      <FilterPopup 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedFilter={selectedFilter}
        onSelectFilter={handleFilterSelect}
      />

      <CustomDatePopup
        isOpen={isCustomDateOpen}
        onClose={() => setIsCustomDateOpen(false)}
        onApply={handleCustomDateApply}
      />
    </motion.div>
  );
};

export default AvailableRoutes;