'use client';
import React, { useState, useCallback, useEffect, memo } from 'react';
import Image from 'next/image';
import { Share2, Heart, Star, X, Facebook, Twitter, Mail } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as Dialog from '@radix-ui/react-dialog';

// --- Constants ---
const SOCIAL_BUTTONS = [
  { name: 'Facebook', icon: Facebook, color: 'bg-blue-600 hover:bg-blue-700', urlTemplate: (url: string) => `https://facebook.com/sharer/sharer.php?u=${url}` },
  { name: 'Twitter', icon: Twitter, color: 'bg-sky-500 hover:bg-sky-600', urlTemplate: (url: string) => `https://twitter.com/intent/tweet?url=${url}` },
  { name: 'WhatsApp', icon: Mail, color: 'bg-green-500 hover:bg-green-600', urlTemplate: (url: string) => `https://wa.me/?text=${url}` },
  { name: 'Email', icon: Mail, color: 'bg-gray-700 hover:bg-gray-800', urlTemplate: (url: string) => `mailto:?body=${url}` },
];

const BADGES = [
  { text: 'Professional Dive Center', className: 'bg-sky-500 text-white' },
  { text: 'PADI 5 Star', className: 'bg-white text-gray-800' },
  { text: 'Certified Partner', className: 'bg-white text-gray-800' },
];

// --- Share Dialog Component ---
const ShareDialog = memo(({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl md:rounded-2xl bg-white shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-5 md:p-6">
          <Dialog.Title className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
            Share this cruise
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="rounded-full p-1.5 hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Close">
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            </button>
          </Dialog.Close>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
          {/* Social Buttons Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
            {SOCIAL_BUTTONS.map((social) => (
              <a
                key={social.name}
                href={social.urlTemplate(url)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer touch-manipulation`}
              >
                <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{social.name}</span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-xs text-gray-500 font-medium">Or copy link</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Copy Link Section */}
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2 sm:p-2.5">
            <input
              readOnly
              value={url}
              className="flex-1 bg-transparent text-xs sm:text-sm text-gray-700 outline-none"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 sm:gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-200 cursor-pointer touch-manipulation ${
                copied ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-900 active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
});

ShareDialog.displayName = 'ShareDialog';

// --- Action Button Component ---
const ActionButton = memo(({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-1.5 rounded-full border border-white bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm cursor-pointer touch-manipulation"
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span>{label}</span>
  </motion.button>
));

ActionButton.displayName = 'ActionButton';

// --- Ultra Premium Save Button Component ---
const PremiumSaveButton = memo(({ isSaved, onClick }: { isSaved: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className={`relative flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm font-semibold backdrop-blur-sm transition-all duration-300 overflow-hidden cursor-pointer touch-manipulation ${
      isSaved 
        ? 'border-red-500 bg-linear-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/50' 
        : 'border-white bg-white/10 text-white hover:bg-white/20'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Ripple Effect Background */}
    {isSaved && (
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    )}
    
    {/* Animated Heart Icon */}
    <motion.div
      animate={isSaved ? {
        scale: [1, 1.4, 1],
        rotate: [0, -15, 15, -10, 10, 0],
      } : {}}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Heart 
        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300 ${
          isSaved ? 'fill-white stroke-white' : 'stroke-white'
        }`}
      />
    </motion.div>
    
    <span className="relative z-10">{isSaved ? 'Saved' : 'Save'}</span>
    
    {/* Particle Burst Effect */}
    {isSaved && (
      <>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-linear-to-r from-red-300 to-pink-300 rounded-full"
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((i * Math.PI) / 4) * 30,
              y: Math.sin((i * Math.PI) / 4) * 30,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
        
        {/* Sparkle Effects */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.1,
              ease: "easeOut" 
            }}
          />
        ))}
      </>
    )}
    
    {/* Glow Effect */}
    {isSaved && (
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-red-400/30 to-pink-400/30 rounded-full blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: 2 }}
      />
    )}
  </motion.button>
));

PremiumSaveButton.displayName = 'PremiumSaveButton';

// --- Main Header Component ---
const Header = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const listingUrl = 'https://ra2-8cdd3-f4d5-4b2e-81c2-6e8bf';

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  const handleSave = useCallback(() => {
    setIsSaved(prev => !prev);
  }, []);

  const handleShare = useCallback(() => {
    setIsShareOpen(true);
  }, []);

  return (
    <header className="relative h-screen w-full overflow-hidden" ref={ref}>
      <Dialog.Root open={isShareOpen} onOpenChange={setIsShareOpen}>
        {/* Background with slow zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse' }}
        >
          <Image
            src="/App2.jpg"
            alt="Blue Voyager Cruise"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/70" />

        {/* Foreground content */}
        <div className="relative z-10 flex h-full flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
          {/* Top Section - Logo */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            {/* Logo Image */}
            <div className="relative w-20 h-12 sm:w-24 sm:h-14 md:w-32 md:h-18">
              <Image
                src="/logo.png"
                alt="BUCCEO Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
              />
            </div>

            {/* Badges */}
            <div className="mt-3 sm:mt-4 md:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] md:text-xs">
              {BADGES.map((badge, idx) => (
                <span key={idx} className={`rounded-full px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 font-medium shadow-lg ${badge.className}`}>
                  {badge.text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            className="mt-auto pb-25 sm:pb-16 md:pb-10 space-y-3 sm:space-y-4 md:space-y-5"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            {/* Main Title */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              Blue Voyager
            </motion.h2>

            {/* Location & Rating */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3 md:gap-4"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8 } },
              }}
            >
              <div className="flex items-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white opacity-80"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.05 4.05a7 7 0 019.9 9.9L10 19.9l-4.95-4.95a7 7 0 010-9.9zM10 13a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base text-white/90 drop-shadow">
                  Playa del Carmen, Riviera Maya
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400 drop-shadow"
                  />
                ))}
                <span className="text-xs sm:text-sm md:text-base text-white/90 drop-shadow">
                  4.9 (328 reviews)
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <ActionButton
                label="Share"
                icon={<Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                onClick={handleShare}
              />
              
              <PremiumSaveButton isSaved={isSaved} onClick={handleSave} />
            </motion.div>
          </motion.div>
        </div>

        {/* Share Modal */}
        <ShareDialog url={listingUrl} />
      </Dialog.Root>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;