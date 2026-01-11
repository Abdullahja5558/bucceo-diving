'use client';
import { X, Anchor, Layers, Martini, Flame, Sun, Bed, Sofa, UtensilsCrossed, DoorOpen, Ship, Box, Warehouse, Wrench, Waves, ChevronDown } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';

const DECK_DATA = {
  3: {
    name: "Sun Deck",
    subtitle: "Open Air Relaxation Deck",
    containerHeight: "h-[500px] sm:h-[700px] md:h-[900px] lg:h-[1200px]",
    specs: [
      { label: "Long", value: "30 meters" },
      { label: "Beam", value: "7.2 meters" },
      { label: "Draft", value: "2.2 meters" },
      { label: "Day", value: "12 Guests" },
      { label: "Sleep", value: "8 Guests" },
      { label: "Crew", value: "6 Members" },
      { label: "Min speed", value: "12 knots" },
    ],
    legend: [
      { color: "bg-blue-600", label: "Guest Areas" },
      { color: "bg-orange-600", label: "Wet Bar Facilities" },
      { color: "bg-red-600", label: "Crew Areas" },
      { color: "bg-teal-600", label: "Dining & Lounge" },
    ],
    amenities: [
      { bg: "bg-orange-50", border: "border-orange-200", title: "Wet Bar", desc: "Full Beverage Service", icon: Martini, iconColor: "text-orange-600" },
      { bg: "bg-red-50", border: "border-red-200", title: "BBQ Grill", desc: "Special occasions", icon: Flame, iconColor: "text-red-600" },
      { bg: "bg-blue-50", border: "border-blue-200", title: "30 Sunbeds", desc: "Premium quality", icon: Sun, iconColor: "text-blue-600" },
      { bg: "bg-teal-50", border: "border-teal-200", title: "Shade Cover", desc: "80% Coverage", icon: Waves, iconColor: "text-teal-600" },
    ],
    image: "Boatplan.png"
  },
  2: {
    name: "Main Deck",
    subtitle: "Primary Guest Entertainment Area",
    containerHeight: "h-[600px] sm:h-[800px] md:h-[1200px] lg:h-[1750px]",
    specs: [
      { label: "Length", value: "28 meters" },
      { label: "Width", value: "7.2 meters" },
      { label: "Height", value: "2.8 meters" },
      { label: "Capacity", value: "12 Guests" },
      { label: "Cabins", value: "4 Suites" },
      { label: "Staff", value: "4 Members" },
      { label: "Access", value: "Direct" },
    ],
    legend: [
      { color: "bg-purple-600", label: "Master Suite" },
      { color: "bg-blue-600", label: "Guest Cabins" },
      { color: "bg-green-600", label: "Lounge Areas" },
      { color: "bg-amber-600", label: "Galley & Kitchen" },
    ],
    amenities: [
      { bg: "bg-purple-50", border: "border-purple-200", title: "Master Suite", desc: "King bed, ensuite", icon: Bed, iconColor: "text-purple-600" },
      { bg: "bg-green-50", border: "border-green-200", title: "Main Salon", desc: "Entertainment center", icon: Sofa, iconColor: "text-green-600" },
      { bg: "bg-amber-50", border: "border-amber-200", title: "Dining Room", desc: "Seats 12 guests", icon: UtensilsCrossed, iconColor: "text-amber-600" },
      { bg: "bg-blue-50", border: "border-blue-200", title: "Aft Deck", desc: "Outdoor seating", icon: DoorOpen, iconColor: "text-blue-600" },
    ],
    image: "Boatplan2.png"
  },
  1: {
    name: "Lower Deck",
    subtitle: "Guest Accommodation Level",
    containerHeight: "h-[500px] sm:h-[700px] md:h-[900px] lg:h-[1200px]",
    specs: [
      { label: "Length", value: "26 meters" },
      { label: "Width", value: "6.8 meters" },
      { label: "Height", value: "2.5 meters" },
      { label: "Cabins", value: "4 Rooms" },
      { label: "Guests", value: "8 People" },
      { label: "Bathrooms", value: "4 Ensuite" },
      { label: "Storage", value: "Large" },
    ],
    legend: [
      { color: "bg-indigo-600", label: "VIP Cabins" },
      { color: "bg-cyan-600", label: "Guest Cabins" },
      { color: "bg-pink-600", label: "Storage Areas" },
      { color: "bg-gray-600", label: "Corridors" },
    ],
    amenities: [
      { bg: "bg-indigo-50", border: "border-indigo-200", title: "VIP Cabin", desc: "Queen bed, bathroom", icon: Bed, iconColor: "text-indigo-600" },
      { bg: "bg-cyan-50", border: "border-cyan-200", title: "Guest Cabins", desc: "3x Twin beds", icon: DoorOpen, iconColor: "text-cyan-600" },
      { bg: "bg-pink-50", border: "border-pink-200", title: "Laundry", desc: "Full service", icon: Box, iconColor: "text-pink-600" },
      { bg: "bg-gray-50", border: "border-gray-200", title: "Storage", desc: "Guest luggage", icon: Warehouse, iconColor: "text-gray-600" },
    ],
    image: "Boatplan3.png"
  },
  0: {
    name: "Drive Deck",
    subtitle: "Engine & Technical Operations",
    containerHeight: "h-[500px] sm:h-[700px] md:h-[900px] lg:h-[1200px]",
    specs: [
      { label: "Length", value: "24 meters" },
      { label: "Width", value: "6.5 meters" },
      { label: "Engines", value: "Twin MTU" },
      { label: "Power", value: "2400 HP" },
      { label: "Fuel", value: "8000 L" },
      { label: "Water", value: "2000 L" },
      { label: "Generator", value: "50 KW" },
    ],
    legend: [
      { color: "bg-red-600", label: "Engine Room" },
      { color: "bg-yellow-600", label: "Crew Quarters" },
      { color: "bg-slate-600", label: "Technical Areas" },
      { color: "bg-emerald-600", label: "Storage" },
    ],
    amenities: [
      { bg: "bg-red-50", border: "border-red-200", title: "Engine Room", desc: "Twin MTU engines", icon: Ship, iconColor: "text-red-600" },
      { bg: "bg-yellow-50", border: "border-yellow-200", title: "Crew Cabin", desc: "6 berths", icon: Bed, iconColor: "text-yellow-600" },
      { bg: "bg-slate-50", border: "border-slate-200", title: "Workshop", desc: "Maintenance area", icon: Wrench, iconColor: "text-slate-600" },
      { bg: "bg-emerald-50", border: "border-emerald-200", title: "Tender Bay", desc: "Water toys storage", icon: Waves, iconColor: "text-emerald-600" },
    ],
    image: "Boatplan4.png"
  }
};

const DECK_AREAS = [
  { name: "Sun Deck", level: 3 },
  { name: "Main Deck", level: 2 },
  { name: "Lower Deck", level: 1 },
  { name: "Drive Deck", level: 0 },
];

const BoatPlan = () => {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  
  const currentDeck = useMemo(() => DECK_DATA[selectedLevel as keyof typeof DECK_DATA], [selectedLevel]);

  const handleClose = () => {
    router.push('/#vesseloverview');
  };

  return (
    <div className="bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 w-full min-h-screen">
      {/* Header */}
      <header className="bg-linear-to-r from-gray-900 via-slate-800 to-gray-900 text-white p-3 sm:p-4 md:p-5 lg:p-7 flex justify-between items-center shadow-2xl border-b border-blue-500/20">
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
          <div className="bg-linear-to-br from-blue-500/30 to-blue-600/30 p-1.5 sm:p-2 rounded-xl backdrop-blur-sm ring-1 ring-blue-400/30 shadow-lg shadow-blue-500/20">
            <Anchor className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight">
              <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Blue Voyager</span>
              <span className="hidden sm:inline text-gray-300 font-medium"> - Vessel Deck Plan</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-blue-200/70 hidden sm:block">30m Luxury Diving Liveaboard</p>
          </div>
        </div>
        <button 
          onClick={handleClose}
          className="hover:bg-white/10 p-1.5 sm:p-2 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
        </button>
      </header>

      <div className="flex flex-col lg:flex-row p-3 sm:p-4 md:p-5 lg:p-6 gap-3 sm:gap-4 lg:gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 space-y-3 sm:space-y-4">
          {/* Deck Selection */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="bg-linear-to-br from-blue-100 to-blue-50 p-2 rounded-xl shadow-sm">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <h2 className="text-gray-800 font-bold text-base sm:text-lg">Deck Levels</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5">
              {DECK_AREAS.map(deck => (
                <button
                  key={deck.level}
                  onClick={() => setSelectedLevel(deck.level)}
                  className={`relative overflow-hidden w-full py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-left transition-all duration-500 transform group cursor-pointer
                    ${selectedLevel === deck.level
                      ? "bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/40 scale-105 ring-2 ring-blue-400/50"
                      : "bg-linear-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 hover:shadow-lg hover:scale-102 active:scale-95"
                    }`}
                >
                  <div className={`absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 ${selectedLevel === deck.level ? 'translate-x-full' : '-translate-x-full'} transition-transform duration-1000 group-hover:translate-x-full`} />
                  <div className="relative">
                    <div className="font-bold text-sm sm:text-base mb-0.5">Level {deck.level}</div>
                    <div className="text-xs sm:text-sm opacity-90 font-medium">{deck.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Specs - Collapsible on Mobile */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setShowSpecs(!showSpecs)}
              className="lg:cursor-default w-full p-4 sm:p-5 flex items-center justify-between cursor-pointer lg:pointer-events-none"
            >
              <h2 className="text-gray-800 font-bold text-base sm:text-lg">Specifications</h2>
              <ChevronDown className={`w-4 h-4 lg:hidden transition-transform duration-300 ${showSpecs ? 'rotate-180' : ''}`} />
            </button>
            <div className={`px-4 sm:px-5 pb-4 sm:pb-5 space-y-1.5 sm:space-y-2 transition-all duration-300 ${showSpecs ? 'block' : 'hidden'} lg:block`}>
              {currentDeck.specs.map((spec, idx) => (
                <div key={spec.label} 
                  className="flex justify-between text-xs sm:text-sm py-2 px-3 hover:bg-linear-to-r hover:from-blue-50 hover:to-transparent rounded-xl transition-all duration-300 group"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="text-gray-600 font-semibold group-hover:text-blue-600 transition-colors">{spec.label}</span>
                  <span className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend - Collapsible on Mobile */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setShowLegend(!showLegend)}
              className="lg:cursor-default w-full p-4 sm:p-5 flex items-center justify-between cursor-pointer lg:pointer-events-none"
            >
              <h2 className="text-gray-800 font-bold text-base sm:text-lg">Color Legend</h2>
              <ChevronDown className={`w-4 h-4 lg:hidden transition-transform duration-300 ${showLegend ? 'rotate-180' : ''}`} />
            </button>
            <div className={`px-4 sm:px-5 pb-4 sm:pb-5 space-y-1.5 sm:space-y-2 transition-all duration-300 ${showLegend ? 'block' : 'hidden'} lg:block`}>
              {currentDeck.legend.map((item, idx) => (
                <div key={item.label} 
                  className="flex items-center text-xs sm:text-sm py-2 px-3 hover:bg-linear-to-r hover:from-gray-50 hover:to-transparent rounded-xl transition-all duration-300 group"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2.5 sm:mr-3 shadow-md ring-2 ring-white ${item.color} group-hover:scale-125 transition-transform duration-300`} />
                  <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Title Card */}
          <div className="bg-linear-to-r from-white via-blue-50/30 to-white backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 border border-blue-100/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {currentDeck.name} 
                <span className="block sm:inline sm:ml-2 text-base sm:text-xl lg:text-2xl bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Level {selectedLevel}
                </span>
              </h3>
              <span className="text-xs sm:text-sm text-gray-600 bg-linear-to-r from-gray-100 to-blue-50 px-4 sm:px-5 py-2 rounded-full shadow-sm border border-gray-200 font-medium self-start sm:self-auto">
                {currentDeck.subtitle}
              </span>
            </div>
          </div>

          {/* Image Container */}
          <div className={`relative bg-linear-to-br from-white via-gray-50 to-blue-50/30 p-4 sm:p-6 md:p-7 lg:p-8 border-2 border-blue-100 rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden ${currentDeck.containerHeight}`}>
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl" />
            
            <div className="relative flex flex-col h-full">
              <div className="flex justify-end mb-2 sm:mb-3">
                <div className="text-[10px] sm:text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-gray-200 font-semibold">
                  Scale: 30m × 7.2m
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={currentDeck.image} 
                    alt={currentDeck.name} 
                    className="max-w-full max-h-full object-contain drop-shadow-2xl transform transition-transform duration-500 hover:scale-105" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
            {currentDeck.amenities.map((a, i) => {
              const IconComponent = a.icon;
              return (
                <div 
                  key={i} 
                  className={`relative group ${a.bg} ${a.border} border-2 p-3 sm:p-4 lg:p-5 rounded-2xl text-center shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="flex justify-center mb-2 sm:mb-3">
                      <div className="bg-white p-2 sm:p-2.5 lg:p-3 rounded-xl lg:rounded-2xl shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 ring-2 ring-white">
                        <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${a.iconColor} group-hover:scale-110 transition-transform duration-500`} />
                      </div>
                    </div>
                    <p className="font-bold text-gray-800 mb-1 text-xs sm:text-sm lg:text-base group-hover:text-gray-900 transition-colors">{a.title}</p>
                    <p className="text-[10px] sm:text-xs text-gray-600 group-hover:text-gray-700 transition-colors">{a.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatPlan;