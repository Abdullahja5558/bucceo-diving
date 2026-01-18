
'use client';
import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Minus, Plus, X, Maximize2, Bed, AirVent, Check, Trash2 } from 'lucide-react';

type CabinFeature = {
    icon: any;
    label: string;
};

type Cabin = {
    id: string;
    name: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    cabinsLeft: number;
    size: string;
    basePrice: number;
    features: CabinFeature[];
    amenities: string[];
};


const cabinData: Cabin[] = [
    {
        id: 'standard',
        name: 'Ocean View Cabin',
        description: 'Comfortable and well-appointed cabins perfect for divers who want quality accommodation at great value.',
        imageSrc: '/cabin1.png',
        imageAlt: 'Standard Cabin',
        cabinsLeft: 4,
        size: '12 - 14 m²',
        basePrice: 2199,
        features: [
            { icon: Bed, label: 'Twin or Double' },
            { icon: AirVent, label: 'AC & En-suite' },
        ],
        amenities: [
            'Air conditioning', 'Private bathroom', 'Storage space', 'Porthole window', 'Daily housekeeping'
        ]
    },
    {
        id: 'deluxe',
        name: 'Deluxe Stateroom',
        description: 'Spacious cabins with premium amenities and larger windows for natural light and stunning ocean views.',
        imageSrc: '/cabin2.png',
        imageAlt: 'Deluxe Cabin',
        cabinsLeft: 2,
        size: '15 - 20 m²',
        basePrice: 2549,
        features: [
            { icon: Bed, label: 'Queen Bed' },
            { icon: AirVent, label: 'AC & En-suite' },
        ],
        amenities: [
            'Air conditioning', 'Premium bathroom', 'Large panoramic windows', 'Desk & seating area', 'Mini fridge', 'Bathrobe & slippers', 'Complimentary water'
        ]
    },
    {
        id: 'master',
        name: 'Master Ocean Suite',
        description: 'Our most luxurious accommodation with separate living space, premium amenities, and exclusive perks.',
        imageSrc: '/cabin3.png',
        imageAlt: 'Master Suite',
        cabinsLeft: 3,
        size: '22 - 25 m²',
        basePrice: 2949,
        features: [
            { icon: Bed, label: 'King Bed' },
            { icon: AirVent, label: 'AC & En-suite' },
        ],
        amenities: [
            'Air conditioning', 'Luxury bathroom with bathtub', 'Panoramic windows', 'Separate living area', 'Mini bar (stocked)', 'Premium toiletries', 'Daily turndown service', 'Priority dive short boarding'
        ]
    },
];

const handleStripeCheckout = async (selectedCabin: Cabin | null, numGuests: number) => {
  if (!selectedCabin) return;

  const totalPrice = selectedCabin.basePrice * numGuests;

  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: selectedCabin.id,
      name: selectedCabin.name,
      image: selectedCabin.imageSrc,
      guests: numGuests,
      total: totalPrice,
    }),
  });

  const data = await res.json();
  window.location.href = data.url;
};



const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const FeatureItem: React.FC<{ icon: any; label: string }> = React.memo(({ icon: Icon, label }) => (
    <div className="flex items-center space-x-1.5">
        <Icon className="h-4 w-4 text-blue-600 shrink-0" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
));

FeatureItem.displayName = 'FeatureItem';

// --- Cabin Card Component ---
interface CabinCardProps {
    cabin: Cabin;
    isSelected: boolean;
    onSelect: (id: string) => void;
    numGuests: number;
}

const CabinCard: React.FC<CabinCardProps> = React.memo(({ cabin, isSelected, onSelect, numGuests }) => {
    const priceData = useMemo(() => {
        const pricePerGuest = cabin.basePrice;
        const totalForGuests = pricePerGuest * numGuests;
        
        return {
            basePriceFormatted: formatPrice(pricePerGuest),
            totalFormatted: formatPrice(totalForGuests),
            totalFor2GuestsFormatted: formatPrice(pricePerGuest * 2),
        };
    }, [cabin.basePrice, numGuests]);

    const handleToggle = useCallback(() => onSelect(cabin.id), [onSelect, cabin.id]);

    return (
        <div 
            className={`flex flex-col py-4 px-4 transition-all duration-300 border-b last:border-b-0 md:flex-row md:py-6 md:px-5 lg:py-6 lg:px-6 ${
                isSelected 
                    ? 'bg-blue-50 border-2 border-blue-500 rounded-xl shadow-lg' 
                    : 'hover:bg-gray-50/70'
            }`}
        >
            {/* Image Section */}
            <div className="relative w-full h-48 shrink-0 rounded-lg overflow-hidden mb-4 shadow-md md:w-52 md:h-56 md:mb-0 lg:w-60 lg:h-64">
                <Image
                    src={cabin.imageSrc}
                    alt={cabin.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 300px"
                />
                {cabin.cabinsLeft > 0 && (
                    <span className="absolute top-2 left-2 bg-yellow-600 text-white text-xs font-bold tracking-wider px-3 py-1 rounded-full shadow-md">
                        Only {cabin.cabinsLeft} left!
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className="grow flex flex-col justify-between md:ml-6 lg:ml-8">
                <div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2 md:text-2xl">{cabin.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 md:text-base md:mb-4">{cabin.description}</p>
                    
                    {/* Features Row */}
                    <div className="flex flex-wrap gap-3 mb-3 md:gap-4 md:mb-4">
                        <FeatureItem icon={Maximize2} label={cabin.size} />
                        {cabin.features.map((feature, idx) => (
                            <FeatureItem key={idx} icon={feature.icon} label={feature.label} />
                        ))}
                    </div>

                    {/* Amenities Grid */}
                    <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6">
                        {cabin.amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                                <Check className="h-4 w-4 text-green-500 shrink-0" />
                                <span className="leading-tight">{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price and Select Button */}
                <div className="flex flex-col justify-between items-start gap-3 mt-4 pt-4 border-t border-gray-100 md:flex-row md:items-center md:gap-4 md:mt-5 md:pt-4">
                    <div>
                        <span className="text-2xl font-extrabold text-blue-800 md:text-3xl">{priceData.basePriceFormatted}</span>
                        <span className="text-xs text-gray-600 block mt-1 md:text-sm">per person for the whole trip</span>
                        
                        {/* Total Price Display */}
                        <div className="mt-1">
                            <span className="text-sm text-blue-600 font-bold md:text-base">
                                Total {priceData.totalFormatted} for {numGuests} guest{numGuests !== 1 ? 's' : ''}
                            </span>
                            {numGuests !== 2 && (
                                <span className="ml-2 text-xs text-gray-400 line-through italic">
                                    (Avg {priceData.totalFor2GuestsFormatted} for 2)
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Select/Remove Button */}
                    <button
                        onClick={handleToggle}
                        className={`w-full cursor-pointer px-6 py-3 text-base font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 md:w-auto md:px-8 ${
                            isSelected 
                                ? 'bg-red-600 text-white hover:bg-red-700 ring-4 ring-red-300' 
                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                        }`}
                    >
                        {isSelected ? (
                            <>
                                <Trash2 className="h-5 w-5" />
                                <span>Remove Cabin</span>
                            </>
                        ) : (
                            <span>Select Cabin</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
});

CabinCard.displayName = 'CabinCard';

// --- Main Dialog Component ---
interface CabinSelectionDialogProps {
    defaultOpen?: boolean;
}

const CabinSelectionDialog: React.FC<CabinSelectionDialogProps> = ({ defaultOpen = true }) => {
    const router = useRouter();
    const [selectedCabinId, setSelectedCabinId] = useState<string | null>(null);
    const [numGuests, setNumGuests] = useState(2);
    
    // URL params se route info get karo
    const [routeInfo, setRouteInfo] = useState({
        name: 'North Male Atolls Classic',
        dates: 'Feb 16 - Feb 22'
    });

    // URL params ko read karo
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const duration = params.get('duration');
        
        if (name) {
            setRouteInfo({
                name: name,
                dates: duration || 'Feb 16 - Feb 22'
            });
        }
    }, []);

    const handleGoHome = useCallback(() => router.push('/'), [router]);
    const handleSelectCabin = useCallback((id: string) => {
        setSelectedCabinId(prev => prev === id ? null : id);
    }, []);
    const handleGuestChange = useCallback((delta: number) => {
        setNumGuests(prev => Math.max(1, prev + delta));
    }, []);

    const isProceedEnabled = selectedCabinId !== null;
    const selectedCabin = useMemo(() => cabinData.find(c => c.id === selectedCabinId), [selectedCabinId]);

    const footerText = useMemo(() => {
        if (!selectedCabin) return 'Please select a cabin to continue';
        const total = selectedCabin.basePrice * numGuests;
        return `Selected: ${selectedCabin.name} (Total ${formatPrice(total)} for ${numGuests} guest${numGuests > 1 ? 's' : ''})`;
    }, [selectedCabin, numGuests]);

    return (
        <Dialog.Root open={defaultOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 transition-opacity duration-300" />

                <Dialog.Content className="fixed inset-0 w-screen h-screen flex flex-col z-50 overflow-hidden bg-white shadow-2xl">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm shrink-0 md:p-5 lg:p-6">
                        <div className="flex-1 min-w-0 pr-3">
                            <Dialog.Title className="text-lg font-extrabold text-blue-900 truncate md:text-xl lg:text-2xl">
                                Choose Your Sanctuary
                            </Dialog.Title>
                            <span className="text-xs font-medium text-gray-500 block mt-1 md:text-sm">
                                {routeInfo.name} · <span className="font-semibold text-blue-600">{routeInfo.dates}</span>
                            </span>
                        </div>
                        
                        {/* Guest Counter and Close */}
                        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
                            <div className="flex items-center space-x-2 text-base font-semibold border-2 border-blue-500 rounded-full p-1.5 shadow-inner md:space-x-3 md:text-lg">
                                <span className="text-sm text-gray-700 hidden md:block ml-2">Guests</span>
                                <button 
                                    onClick={() => handleGuestChange(-1)} 
                                    disabled={numGuests <= 1}
                                    className="cursor-pointer p-1 rounded-full text-blue-700 hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Decrease guests"
                                >
                                    <Minus className="h-5 w-5" />
                                </button>
                                <span className="min-w-6 text-center text-blue-800">{numGuests}</span>
                                <button 
                                    onClick={() => handleGuestChange(1)} 
                                    className="cursor-pointer p-1 rounded-full text-blue-700 hover:bg-blue-100 transition-colors"
                                    aria-label="Increase guests"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <Dialog.Close asChild>
                                <button 
                                    onClick={handleGoHome}
                                    className="cursor-pointer rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>

                    {/* Cabin List */}
                    <div className="grow overflow-y-auto p-4 space-y-4 md:p-5 lg:p-6">
                        {cabinData.map((cabin) => (
                            <CabinCard
                                key={cabin.id}
                                cabin={cabin}
                                isSelected={selectedCabinId === cabin.id}
                                onSelect={handleSelectCabin}
                                numGuests={numGuests}
                            />
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col items-stretch justify-between gap-3 p-4 border-t border-gray-200 bg-white shadow-top shrink-0 md:flex-row md:items-center md:gap-4 md:p-5">
                        <p className={`text-sm font-bold truncate md:text-base lg:text-lg ${selectedCabin ? 'text-blue-800' : 'text-gray-600'}`}>
                            {footerText}
                        </p>
                        
                        <div className="flex space-x-3">
                            <Dialog.Close asChild>
                                <button
                                    onClick={handleGoHome}
                                    className="cursor-pointer flex-1 px-6 py-3 text-base font-semibold rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors md:flex-none md:px-8"
                                >
                                    Cancel
                                </button>
                            </Dialog.Close>
                            
                            <button
                                disabled={!isProceedEnabled}
                                className={`flex-1 px-6 py-3 text-base font-bold rounded-xl transition-all duration-300 shadow-md md:flex-none md:px-8 ${
                                    isProceedEnabled 
                                        ? 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
                                        : 'cursor-not-allowed bg-gray-300 text-gray-600 opacity-70'
                                }`}
                            >
                                Proceed to Booking
                            </button>
                        </div>
                    </div>
                    
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CabinSelectionDialog;