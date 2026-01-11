'use client';
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Optimized Framer Motion Variants ---
const mainContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const imageItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const smallImageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.15 + i * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// --- Optimized Image Lightbox Component ---
const ImageLightbox = React.memo(({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}: { 
  images: string[], 
  currentIndex: number, 
  onClose: () => void,
  onNext: () => void,
  onPrev: () => void
}) => {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  const handleThumbnailClick = useCallback((idx: number) => {
    const diff = idx - currentIndex;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) onNext();
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) onPrev();
    }
  }, [currentIndex, onNext, onPrev]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-3 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 z-50 rounded-full bg-white/10 p-3 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8 text-white" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 z-50 rounded-full bg-white/10 p-3 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8 text-white" />
      </button>

      {/* Main Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-[90vw] h-[80vh] max-w-6xl"
      >
        <Image
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          className="object-contain"
          priority
          quality={90}
        />
      </motion.div>

      {/* Image Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
        <span className="text-lg font-semibold text-white">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-[90vw] pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              idx === currentIndex ? 'border-white scale-110' : 'border-white/30 opacity-60 hover:opacity-100'
            }`}
            aria-label={`View image ${idx + 1}`}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
});

ImageLightbox.displayName = 'ImageLightbox';

const Discover: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = ["/Discover.jpg", "/Discover2.jpg", "/Discover3.jpg", "/Discover4.jpg"];
  const smallImages = ["/Discover2.jpg", "/Discover3.jpg", "/Discover4.jpg"];

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  return (
    <div className="flex justify-center p-6 sm:p-8 md:p-16 min-h-screen bg-gray-50 scroll-smooth">
      <motion.div
        className="w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition-shadow duration-300 hover:shadow-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={mainContainerVariants}
      >
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">

          {/* Left Column: Text Content */}
          <div className="flex flex-col space-y-6">
            <motion.h2 
              variants={textItemVariants} 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight"
            >
              Discover the Riviera Maya
            </motion.h2>

            <motion.p 
              variants={textItemVariants} 
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed"
            >
              From vibrant coral reefs teeming with tropical fish to the ethereal beauty of underground cenotes, the Riviera Maya offers some of the world's most diverse and spectacular diving. Join us and discover why divers from around the globe choose Paradise Diving Mexico for their underwater adventures.
            </motion.p>
          </div>

          {/* Right Column: Images */}
          <div className="flex flex-col space-y-4">

            {/* Main Image - Clickable */}
            <motion.div 
              variants={imageItemVariants} 
              className="relative w-full h-52 sm:h-60 md:h-64 lg:h-72 overflow-hidden rounded-xl shadow-xl cursor-pointer group"
              onClick={() => openLightbox(0)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/Discover.jpg"
                alt="Boat steering wheel at sunset"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                quality={85}
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Click to view
                </span>
              </div>
            </motion.div>

            {/* Small Images Grid - Clickable */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {smallImages.map((src, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={smallImageVariants}
                  className="relative h-28 sm:h-32 md:h-36 overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                  onClick={() => openLightbox(i + 1)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src={src} 
                    alt={`Gallery thumbnail ${i + 1}`}
                    fill 
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </motion.div>

      {/* Lightbox Popup */}
      {lightboxOpen && (
        <ImageLightbox
          images={allImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};

export default Discover;