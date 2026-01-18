"use client";
import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Clock, Waves, Calendar, MapPin, X, CheckCircle, Anchor, Coffee } from 'lucide-react';


type Route = {
  id: number;
  name: string;
  isPopular: boolean;
  duration: string;
  dives: string;
  dates: string;
  description: string;
  startingPrice: string;
  spacesAvailable: string;
};

type DaySchedule = {
  day: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

type DiveSite = {
  name: string;
  difficulty: string;
  depth: string;
  type: string;
  highlights: string[];
};

// --- Static Data ---
const ALL_ROUTES_DATA: Route[] = [
  {
    id: 1,
    name: 'North Male Atolls Classic',
    isPopular: true,
    duration: '7 Days / 6 Nights',
    dives: '18-20 Dives',
    dates: 'Feb 16 - Feb 23',
    description: "Explore the stunning dive sites of North Male Atoll, featuring pristine coral reefs, vibrant marine life, and unforgettable underwater experiences. This classic route has been carefully designed to showcase the best of the Maldives diving.",
    startingPrice: '€2,199',
    spacesAvailable: '6 spaces available',
  },
  {
    id: 2,
    name: 'South Ari Explorer',
    isPopular: false,
    duration: '7 Days / 6 Nights',
    dives: '16-18 Dives',
    dates: 'Feb 23 - Mar 2',
    description: "Discover the wonders of South Ari Atoll, home to whale sharks, manta rays, and pristine coral gardens.",
    startingPrice: '€2,450',
    spacesAvailable: '2 spaces available',
  },
  {
    id: 3,
    name: 'Deep South Adventure',
    isPopular: false,
    duration: '10 Days / 11 Nights',
    dives: '24-28 Dives',
    dates: 'Mar 11 - Mar 21',
    description: "Embark on an extended adventure to the pristine deep south atolls.",
    startingPrice: '€3,299',
    spacesAvailable: '8 spaces available',
  },
];

const HIGHLIGHTS = [
  'Manta Point - encounter majestic manta rays',
  'Banana Reef - the Maldives first designated dive site',
  'HP Reef - spectacular coral formations and overhangs',
  'Fish Head - schooling fish and reef sharks',
  'Victory Wreck - historic wreck dive with abundant marine life',
  'Night dives with bioluminescent plankton'
];

const EXPERIENCE_PREVIEW = [
  { name: 'Manta Rays', imagePath: '/itinerary2.png' },
  { name: 'Coral Gardens', imagePath: '/itinerary3.png' },
  { name: 'Marine Life', imagePath: '/itinerary4.png' },
];

const DAILY_SCHEDULE: DaySchedule[] = [
  {
    day: 'Day 1',
    title: 'Arrival & Embarkation Day',
    subtitle: '📍 Hulhule',
    description: 'Transfer from Male International Airport to the dive vessel. Complete check-in formalities, meet your dive guides and fellow divers. Safety briefing and boat orientation.',
    image: '/itinerary2.png',
  },
  {
    day: 'Day 2',
    title: 'North Male Exploration',
    subtitle: '📍 Banana Reef & HP Reef',
    description: 'Morning dive at Banana Reef - the Maldives\' most famous dive site featuring stunning coral formations. After surface interval, second dive at HP Reef with its dramatic overhangs.',
    image: '/itinerary3.png',
  },
  {
    day: 'Day 3',
    title: 'Manta Point Advanture',
    subtitle: '📍 Manta Point & Lankan',
    description: 'Early morning dive at Victory Wreck - a 140ft long cargo ship covered in soft corals. Channel dive through Vaadhoo Caves with its stunning swim-throughs.',
    image: '/itinerary4.png',
  },
  {
    day: 'Day 4',
    title: 'Fish Head & Nassimo',
    subtitle: '📍 Fish Head',
    description: 'Encounter schooling fish, grey reef sharks, and colorful soft corals at the world-famous Fish Head. Evening dive at nearby Nassimo Thila.',
    image: '/itinerary4.png',
  },
  {
    day: 'Day 5',
    title: 'Wreck Dive Special',
    subtitle: '📍 Girifushi Thila & Kuda Giri',
    description: 'Explore the fascinating Victory wreck covered in marine growth and teeming with fish life. Afternoon dive at Girifushi Thila followed by a night dive.',
    image: '/itinerary4.png',
  },
  {
    day: 'Day 6',
    title: 'Coral Gardens & Channel',
    subtitle: '📍 Rainbow Reef',
    description: 'Drift diving through vibrant coral gardens and channels. Experience strong currents and abundant marine life in pristine conditions.',
    image: '/itinerary4.png',
  },
  {
    day: 'Day 7',
    title: 'Final Dives and celebration',
    subtitle: '📍 Make',
    description: 'Relaxing morning dives at Rainbow Reef followed by leisure time. Farewell dinner with crew and fellow divers sharing adventure stories.',
    image: '/itinerary4.png',
  },
];

const DIVE_SITES: DiveSite[] = [
  {
    name: 'Banana Reef',
    difficulty: 'All levels',
    depth: '5-30m',
    type: 'Reef',
    highlights: ['Reef'],
  },
  {
    name: 'Manta Point',
    difficulty: 'Intermediate',
    depth: '6-25m',
    type: 'Cleaning Station',
    highlights: ['Cleaning Station'],
  },
  {
    name: 'HP Reef',
    difficulty: 'Advanced',
    depth: '8-30m',
    type: 'Reef & Caves',
    highlights: ['Reef & Caves'],
  },
  {
    name: 'Fish Head',
    difficulty: 'Advanced',
    depth: '15-40m',
    type: 'Thila',
    highlights: ['Thila'],
  },
  {
    name: 'Victory Wreck',
    difficulty: 'Intermediate',
    depth: '12-35m',
    type: 'Wreck',
    highlights: ['Wreck'],
  },
  {
    name: 'Rainbow Reef',
    difficulty: 'All Level',
    depth: '5-30m',
    type: 'Reef',
    highlights: ['Reef'],
  },
];

const WHATS_INCLUDED = {
  included: [
    'All diving as per itinerary (18-20 dives)',
    'Full board accommodation in selected cabin',
    'Diving equipment - tanks & weights',
    'Experienced PADI/SSI dive guides',
    'Nitrox for certified divers (unlimited)',
    'All meals - breakfast, lunch, dinner & snacks',
    'Airport transfers Male-boat-Male',
    'Marine park fees & local taxes',
  ],
  notIncluded: [
    'International flights to/from Maldives',
    'Dive equipment rental (BCD, regulator, wetsuit)',
    'Comprehensive dive insurance (mandatory)',
    'Alcoholic beverages & soft drinks',
    'Tips for crew (suggested $100-150 per person)',
    'Personal expenses & souvenirs',
  ],
};


const StatusHeader: React.FC<{ duration: string; dives: string; dates: string }> = ({ duration, dives, dates }) => (
  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-white">
    <div className="flex items-center gap-1.5">
      <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
      <span>{duration}</span>
    </div>
    <div className="flex items-center gap-1.5">
      <Waves className="h-3.5 w-3.5 md:h-4 md:w-4" />
      <span>{dives}</span>
    </div>
    <div className="flex items-center gap-1.5">
      <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
      <span>{dates}</span>
    </div>
  </div>
);

const PreviewImageCard: React.FC<{ name: string; imagePath: string }> = ({ name, imagePath }) => (
  <div className="relative h-40 md:h-48 w-full overflow-hidden rounded-lg shadow-md">
    <Image
      src={imagePath}
      alt={name}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 33vw, 300px"
    />
    <div className="absolute inset-0 bg-black/30 flex items-end p-2 md:p-3">
      <span className="text-xs md:text-sm font-semibold text-white">{name}</span>
    </div>
  </div>
);


const OverviewTab: React.FC<{ description: string }> = ({ description }) => (
  <div className="space-y-6">
    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{description}</p>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-5 shadow-sm min-h-[250px] md:h-72 flex flex-col justify-between">
        <h3 className="text-base md:text-lg font-semibold text-gray-800">Route Map</h3>
        <div className="flex justify-center items-center flex-1">
          <div className="text-center">
            <MapPin className="h-10 w-10 md:h-12 md:w-12 text-blue-400 animate-pulse mx-auto" />
            <p className="mt-2 text-xs md:text-sm text-gray-500">Interactive dive site map</p>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg p-4 md:p-5 min-h-[250px] md:h-72">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">Trip Highlights</h3>
        <ul className="space-y-2.5 md:space-y-3">
          {HIGHLIGHTS.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    <div>
      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">Experience Preview</h3>
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {EXPERIENCE_PREVIEW.map((item, index) => (
          <PreviewImageCard key={index} {...item} />
        ))}
      </div>
    </div>
  </div>
);

const DailyItineraryTab: React.FC = () => (
  <div className="space-y-3 md:space-y-4">
    {DAILY_SCHEDULE.map((day, index) => (
      <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-3 md:p-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {day.day}
              </span>
              <h3 className="text-sm md:text-base font-bold text-gray-900">{day.title}</h3>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-2">{day.subtitle}</p>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{day.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const DiveSitesTab: React.FC = () => (
  <div>
    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Featured Dive Sites</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {DIVE_SITES.map((site, index) => (
        <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 p-4 md:p-5">
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-blue-500 shrink-0 mt-0.5" />
            <h4 className="text-sm md:text-base font-bold text-gray-900">{site.name}</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-gray-600">Depth:</span>
              <span className="font-semibold text-gray-900">{site.depth}</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-gray-600">Difficulty:</span>
              <span className={`font-semibold ${
                site.difficulty === 'Advanced' ? 'text-orange-600' : 
                site.difficulty === 'Intermediate' ? 'text-orange-500' : 
                'text-green-600'
              }`}>{site.difficulty}</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-gray-600">Type:</span>
              <span className="font-semibold text-blue-600">{site.highlights[0]}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WhatsIncludedTab: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="bg-green-50 rounded-lg border border-green-200 p-4 md:p-5">
        <h3 className="text-sm md:text-base font-bold text-green-900 mb-3 md:mb-4 flex items-center">
          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
          Included in Package
        </h3>
        <ul className="space-y-2 md:space-y-2.5">
          {WHATS_INCLUDED.included.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
              <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-red-50 rounded-lg border border-red-200 p-4 md:p-5">
        <h3 className="text-sm md:text-base font-bold text-red-900 mb-3 md:mb-4 flex items-center">
          <X className="h-4 w-4 md:h-5 md:w-5 mr-2" />
          Not Included
        </h3>
        <ul className="space-y-2 md:space-y-2.5">
          {WHATS_INCLUDED.notIncluded.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
              <X className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 md:p-5">
      <h3 className="text-sm md:text-base font-bold text-blue-900 mb-3 flex items-center">
        <svg className="h-4 w-4 md:h-5 md:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Important Information
      </h3>
      <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-700">
        <li>• Valid diving certification required (minimum Open Water Diver)</li>
        <li>• Minimum 20 logged dives recommended</li>
        <li>• Dive insurance is mandatory</li>
        <li>• All prices are per person based on double occupancy</li>
      </ul>
    </div>
  </div>
);

const VesselInfoTab: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
    <div className="space-y-6">
      <div>
        <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-3">Vessel Specifications</h3>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {[
            { label: 'Vessel Name', value: 'MV Ocean Explorer' },
            { label: 'Length', value: '35m' },
            { label: 'Cabins', value: '10 cabins' },
            { label: 'Max Guests', value: '20 divers' },
            { label: 'Crew', value: '12 professionals' },
          ].map((spec, idx) => (
            <div key={idx} className="flex justify-between items-center px-3 md:px-4 py-2.5 md:py-3">
              <span className="text-xs md:text-sm text-gray-600">{spec.label}</span>
              <span className="text-xs md:text-sm font-medium text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-3">Facilities & Features</h3>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {[
            { icon: Anchor, label: 'Dive dhoni' },
            { icon: Coffee, label: 'Sun deck' },
            { icon: Coffee, label: 'Entertainment' },
            { icon: Coffee, label: 'Air conditioning' },
          ].map((facility, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-blue-50 rounded-lg px-2 md:px-3 py-2 md:py-2.5 border border-blue-100">
              <facility.icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-600" />
              <span className="text-xs md:text-sm text-gray-700">{facility.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-3">Vessel Images</h3>
      <div className="space-y-3">
        {[
          { src: '/interior.png', alt: 'Deluxe Cabin Interior' },
          { src: '/interior2.png', alt: 'Master Suite' },
        ].map((img, idx) => (
          <div key={idx} className="relative h-36 md:h-44 rounded-lg overflow-hidden shadow-md">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-3 md:px-4 py-2 md:py-3">
              <span className="text-xs md:text-sm font-semibold text-white">{img.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ItineraryPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentRoute, setCurrentRoute] = useState(ALL_ROUTES_DATA[0]);

  useEffect(() => {
    const routeName = searchParams.get('name');
    const dives = searchParams.get('dives');
    const duration = searchParams.get('duration');
    const price = searchParams.get('price');
    const spaces = searchParams.get('spaces');
    const popular = searchParams.get('popular');
    const routeId = searchParams.get('id');

    if (routeName && dives && duration && price) {
      setCurrentRoute({
        id: routeId ? parseInt(routeId) : 1,
        name: routeName,
        isPopular: popular === 'true',
        duration: duration,
        dives: dives,
        dates: duration,
        description: `Explore the stunning dive sites of ${routeName}, featuring pristine coral reefs, vibrant marine life, and unforgettable underwater experiences.`,
        startingPrice: price,
        spacesAvailable: spaces ? `${spaces} spaces available` : '6 spaces available',
      });
    } else if (routeId) {
      const route = ALL_ROUTES_DATA.find(r => r.id === parseInt(routeId));
      if (route) setCurrentRoute(route);
    }
  }, [searchParams]);

  const tabs = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'daily', label: 'Daily Itinerary' },
    { id: 'sites', label: 'Dive Sites' },
    { id: 'included', label: "What's Included" },
    { id: 'vessel', label: 'Vessel Info' },
  ], []);

  const handleClose = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleBookCabin = useCallback(() => {
    const params = new URLSearchParams({
      id: currentRoute.id.toString(),
      name: currentRoute.name,
      dives: currentRoute.dives,
      duration: currentRoute.duration,
      price: currentRoute.startingPrice,
      spaces: currentRoute.spacesAvailable,
      popular: currentRoute.isPopular ? 'true' : 'false'
    });
    router.push(`/cabinselection?${params.toString()}`);
  }, [router, currentRoute]);

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 'overview': return <OverviewTab description={currentRoute.description} />;
      case 'daily': return <DailyItineraryTab />;
      case 'sites': return <DiveSitesTab />;
      case 'included': return <WhatsIncludedTab />;
      case 'vessel': return <VesselInfoTab />;
      default: return <OverviewTab description={currentRoute.description} />;
    }
  }, [activeTab, currentRoute.description]);

  return (
    <div className="bg-blue-50/50 min-h-screen">
      <div className="mx-auto max-w-full w-full rounded-none md:rounded-xl bg-white md:shadow-2xl overflow-hidden">
        <div 
          className="relative bg-cover bg-center pt-20 md:pt-24 pb-4 md:pb-6 px-4 md:px-6" 
          style={{ backgroundImage: 'url(/itinerary.png)' }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white flex-1">
                {currentRoute.name}
              </h1>
              <button 
                onClick={handleClose}
                className="text-white hover:text-gray-300 transition-colors p-1 cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            <div className="mt-2 md:mt-3 flex flex-wrap items-center gap-2">
              <StatusHeader 
                duration={currentRoute.duration} 
                dives={currentRoute.dives} 
                dates={currentRoute.dates} 
              />
              {currentRoute.isPopular && (
                <span className="rounded-full bg-yellow-400 px-2 md:px-3 py-1 text-[10px] md:text-xs font-semibold text-gray-900">
                  Popular
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6 border-b border-gray-100 px-4 md:px-6 pt-3 md:pt-4 max-w-6xl mx-auto overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-xs md:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-4 md:p-6 max-w-6xl mx-auto min-h-[400px]">
          {renderTabContent()}
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 md:p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 max-w-6xl mx-auto">
            <div>
              <span className="text-xs md:text-sm text-gray-500 block">Starting from</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800">{currentRoute.startingPrice}</span>
              <span className="text-[10px] md:text-xs text-green-600 block">{currentRoute.spacesAvailable}</span>
            </div>
            <div className="flex gap-2 md:gap-3">
              <button 
                onClick={handleClose}
                className="flex-1 sm:flex-none rounded-lg bg-gray-200 px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={handleBookCabin}
                className="flex-1 sm:flex-none rounded-lg bg-blue-600 px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap"
              >
                <Waves className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="hidden sm:inline ml-2">Select Cabin & Book</span>
                <span className="sm:hidden ml-2">Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ItinerarySection: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ItineraryPageContent />
    </Suspense>
  );
};

export default ItinerarySection;