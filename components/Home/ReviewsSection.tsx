"use client";
import React, { useState } from "react";
import { Star, ThumbsUp, X } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface Review {
  initials: string;
  name: string;
  date: string;
  rating: number;
  body: string;
  fullBody: string;
  helpfulCount: number;
  tripDetails?: {
    dateOfExperience: string;
    typeOfTrip: string;
    groupSize: string;
  };
  verifiedPurchase?: boolean;
  response?: {
    responderName: string;
    daysAgo: string;
    responseText: string;
  };
}

interface StarDistribution {
  stars: number;
  count: number;
}

const REVIEW_SUMMARY = {
  averageRating: 4.9,
  totalReviews: 328,
};

const STAR_DISTRIBUTION: StarDistribution[] = [
  { stars: 5, count: 296 },
  { stars: 4, count: 32 },
  { stars: 3, count: 8 },
  { stars: 2, count: 2 },
  { stars: 1, count: 0 },
];

const REVIEWS_DATA: Review[] = [
  {
    initials: "SM",
    name: "Sarah Martinez",
    date: "October 2025",
    rating: 5,
    body: "Absolutely incredible experience! This was my first time diving...",
    fullBody: `Absolutely incredible experience! This was my first time diving and the crew made me feel completely at ease from start to finish. The instructors were patient, knowledgeable, and genuinely passionate about marine life and diving.

The dive sites were breathtaking - we saw sea turtles, colorful coral reefs, and even spotted a few reef sharks in the distance. The equipment was top-notch and well-maintained, which gave me great peace of mind as a beginner.

What really stood out was the personal attention we received. Our guide, Carlos, was incredibly attentive and made sure everyone in our group felt comfortable and safe throughout the entire dive. He pointed out various marine species and took the time to explain interesting facts about the underwater ecosystem.

The boat crew was also fantastic - friendly, professional, and clearly experienced. They handled everything smoothly, from the equipment setup to the post-dive refreshments.

I cannot recommend this dive shop enough for both beginners and experienced divers. The whole team's dedication to safety and creating memorable experiences really shines through. I'm already planning my next trip back!`,
    helpfulCount: 24,
    tripDetails: {
      dateOfExperience: "October 10, 2025",
      typeOfTrip: "Recreational Diving",
      groupSize: "4 people",
    },
    verifiedPurchase: true,
    response: {
      responderName: "Ocean Adventures",
      daysAgo: "2 days ago",
      responseText:
        "Thank you so much for your detailed review, Sarah! We're thrilled you enjoyed the dive and our guides. We sincerely apologize for the delayed start - we had a last-minute equipment check that took longer than expected. We appreciate your understanding and look forward to diving with you again soon!",
    },
  },
  {
    initials: "JT",
    name: "James Thompson",
    date: "September 2025",
    rating: 5,
    body: "Best dive shop in Playa del Carmen. I've dived with many operators...",
    fullBody: `Best dive shop in Playa del Carmen, hands down! I've dived with many operators around the world over the past 15 years, and this team truly stands out for their professionalism and local expertise.

The dive masters are exceptionally skilled and have an impressive knowledge of the local dive sites. They took us to some hidden gems that I hadn't experienced in my previous visits to the area. The visibility was outstanding, and we encountered an incredible variety of marine life including eagle rays, nurse sharks, and countless tropical fish species.

What impressed me most was their commitment to marine conservation. They spent time educating us about the local ecosystem and the importance of responsible diving practices. It's clear they genuinely care about preserving these beautiful underwater environments for future generations.

The equipment was modern and well-maintained - always a crucial factor for safety and comfort. The boat was spacious and comfortable, with plenty of shade and convenient entry/exit points.

The entire crew, from the captain to the dive guides, worked seamlessly together and created a welcoming, fun atmosphere. They were accommodating to divers of all skill levels in our group, ensuring everyone had an amazing experience.

If you're looking for a world-class diving experience in Playa del Carmen, look no further. This is the operator to choose, whether you're a beginner or an experienced diver like myself. Already booked my next trip with them!`,
    helpfulCount: 18,
    tripDetails: {
      dateOfExperience: "September 15, 2025",
      typeOfTrip: "Advanced Diving",
      groupSize: "6 people",
    },
    verifiedPurchase: true,
  },
  {
    initials: "ES",
    name: "Emma Schmidt",
    date: "August 2025",
    rating: 5,
    body: "Professional and fun! Completed my Advanced Open Water certification...",
    fullBody: `Professional and fun! I completed my Advanced Open Water certification with this dive shop and couldn't be happier with the experience. The instructors struck the perfect balance between being thorough with training and making the whole process enjoyable.

The course was well-structured and comprehensive. We covered deep diving, navigation, buoyancy control, and night diving. Each specialty dive was carefully planned, and the instructors took time to ensure I understood all the concepts before progressing. Their teaching style was patient yet encouraging, which really helped build my confidence.

The deep dive to 30 meters was absolutely thrilling! The instructors made sure I was comfortable at every stage, and we practiced all the necessary skills. The night dive was an unforgettable experience - seeing the reef come alive with nocturnal creatures was magical, and our guides expertly navigated us through the dive site.

Beyond the technical training, they also emphasized environmental awareness and marine conservation, which I really appreciated. They taught us about the delicate balance of reef ecosystems and how we can be responsible divers.

The facilities were clean and organized, with excellent equipment available for use. The classroom sessions were informative and interactive, using modern teaching aids and real-world examples.

After getting certified, I went on several fun dives with them, and each one was expertly guided with great attention to detail. The dive sites they chose showcased the best of what the region has to offer.

I highly recommend this dive center for anyone looking to advance their diving education or simply enjoy spectacular diving experiences. The quality of instruction, safety standards, and overall experience exceeded my expectations!`,
    helpfulCount: 15,
    tripDetails: {
      dateOfExperience: "August 20, 2025",
      typeOfTrip: "Certification Course",
      groupSize: "3 people",
    },
    verifiedPurchase: true,
  },
  {
    initials: "MC",
    name: "Michael Chen",
    date: "May 2025",
    rating: 4,
    body: "Great experience, minor timing issues. Overall a wonderful diving experience...",
    fullBody: `Great experience overall, though there were some minor timing issues. The diving itself was absolutely wonderful - crystal clear water, incredible marine life, and expert guides who really knew their stuff.

We were scheduled to depart at 8:00 AM but didn't actually leave until 9:30 AM. While this was a bit frustrating initially, the crew apologized and explained there was a last-minute equipment safety check that took longer than expected. I appreciated their transparency and commitment to safety, even if it meant a delayed start.

Once we got out on the water, everything was fantastic. Our dive guide, Marcus, was knowledgeable and attentive. He made sure everyone in the group felt comfortable and pointed out fascinating marine creatures throughout our dives. We saw sea turtles, colorful reef fish, and even a few barracudas!

The dive sites were pristine, with excellent visibility and diverse marine life. The equipment provided was high-quality and well-maintained. I felt completely safe throughout both dives.

The boat crew was friendly and professional, providing cold drinks and snacks between dives. They clearly have good systems in place for managing groups and ensuring everyone's needs are met.

The only reason I'm giving 4 stars instead of 5 is due to the timing issue on departure. I understand safety comes first, and I respect that, but better communication about potential delays would have been helpful. Despite this, I would definitely dive with them again and would recommend them to others.

Overall, if you can be flexible with timing and prioritize quality diving and safety over strict schedules, you'll have an excellent experience with this operator.`,
    helpfulCount: 20,
    tripDetails: {
      dateOfExperience: "July 15, 2025",
      typeOfTrip: "Scuba Diving",
      groupSize: "5 people",
    },
    verifiedPurchase: true,
    response: {
      responderName: "Ocean Adventures",
      daysAgo: "3 days ago",
      responseText:
        "Thank you so much for your detailed review, Michael! We're thrilled you enjoyed the dive and our guides. We sincerely apologize for the delayed start - we had a last-minute equipment check that took longer than expected. We appreciate your understanding and look forward to diving with you again soon!",
    },
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const StarDisplay: React.FC<{ rating: number; sizeClass?: string }> = ({
  rating,
  sizeClass = "h-5 w-5",
}) => (
  <div className="flex items-center">
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
  </div>
);

const AnimatedStarDistributionRow: React.FC<StarDistribution> = ({
  stars,
  count,
}) => {
  const totalReviews = REVIEW_SUMMARY.totalReviews;
  const percentage = Math.round((count / totalReviews) * 100);
  
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center space-x-2 text-xs md:text-sm"
    >
      <div className="flex items-center w-8 justify-end">
        <span className="font-medium text-gray-700">{stars}</span>
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
      </div>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-yellow-400 h-2 rounded-full"
          initial={{ width: "0%" }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            delay: 0.2,
            duration: 1.0,
            ease: "easeInOut",
          }}
        />
      </div>
      <span className="w-8 text-right text-gray-500">{count}</span>
    </motion.div>
  );
};

const AnimatedReviewCard: React.FC<{
  review: Review;
  onReadMore: () => void;
}> = ({ review, onReadMore }) => (
  <motion.div
    variants={itemVariants}
    className="border border-gray-100 rounded-2xl p-4 sm:p-6 mb-4 shadow-md bg-white transition hover:shadow-lg"
  >
    <div className="flex items-start space-x-3 sm:space-x-4 mb-2 sm:mb-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-lg font-semibold text-white">
        {review.initials}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
          {review.name}
        </h4>
        <div className="flex items-center space-x-1 text-gray-500 text-xs sm:text-sm">
          <StarDisplay
            rating={review.rating}
            sizeClass="h-4 w-4 sm:h-5 sm:w-5"
          />
          <span>• {review.date}</span>
        </div>
      </div>
    </div>
    <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-4">
      {review.body}
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-1 text-gray-500 text-xs cursor-pointer hover:text-blue-500">
        <ThumbsUp className="h-3 w-3" />
        <span>Helpful ({review.helpfulCount})</span>
      </div>
      <button
        onClick={onReadMore}
        className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition cursor-pointer"
      >
        Read More
      </button>
    </div>
  </motion.div>
);

const ReviewPopup: React.FC<{
  review: Review;
  isOpen: boolean;
  onClose: () => void;
}> = ({ review, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10 bg-white rounded-full p-1 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl font-semibold text-white">
              {review.initials}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg">{review.name}</h3>
              <p className="text-gray-500 text-sm">{review.date}</p>
              <div className="mt-2">
                <StarDisplay rating={review.rating} sizeClass="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">
              {review.rating === 5
                ? "Excellent Experience"
                : review.rating === 4
                ? "Great experience, minor timing issues"
                : "Review"}
            </h4>
            <div className="text-gray-700 text-sm leading-relaxed space-y-3">
              {review.fullBody.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {review.tripDetails && (
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h5 className="font-semibold text-gray-800 mb-3 text-sm">
                Trip Details
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date of experience:</span>
                  <span className="text-gray-800 font-medium">
                    {review.tripDetails.dateOfExperience}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type of trip:</span>
                  <span className="text-gray-800 font-medium">
                    {review.tripDetails.typeOfTrip}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group size:</span>
                  <span className="text-gray-800 font-medium">
                    {review.tripDetails.groupSize}
                  </span>
                </div>
              </div>
              {review.verifiedPurchase && (
                <div className="mt-3 flex items-center text-green-600 text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified purchase
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition text-sm">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful ({review.helpfulCount})</span>
            </button>
            <button className="ml-6 text-gray-600 hover:text-blue-600 transition text-sm">
              Share
            </button>
            <button className="ml-6 text-gray-600 hover:text-blue-600 transition text-sm">
              Report
            </button>
          </div>

          {review.response && (
            <div className="mt-6 bg-blue-50 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-gray-800 text-sm">
                      Response from {review.response.responderName}
                    </h5>
                    <span className="text-xs text-gray-500">
                      {review.response.daysAgo}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.response.responseText}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ReviewsSection: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  return (
    <div className="p-4 sm:p-8 bg-blue-50 flex justify-center items-start min-h-screen">
      <motion.div
        className="w-full max-w-6xl rounded-2xl bg-white p-6 sm:p-10 md:p-12 shadow-2xl transition duration-300 hover:shadow-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.header className="mb-4 sm:mb-6" variants={itemVariants}>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Reviews
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            What our divers are saying
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm"
            variants={itemVariants}
          >
            <p className="text-3xl sm:text-5xl font-bold text-gray-800">
              {REVIEW_SUMMARY.averageRating}
            </p>
            <StarDisplay rating={5} sizeClass="h-5 w-5 sm:h-6 sm:w-6" />
            <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
              Based on {REVIEW_SUMMARY.totalReviews} reviews
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center space-y-1 sm:space-y-2 p-2 sm:p-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={containerVariants}
          >
            {STAR_DISTRIBUTION.map((data) => (
              <AnimatedStarDistributionRow key={data.stars} {...data} />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="divide-y divide-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {REVIEWS_DATA.map((review, index) => (
            <AnimatedReviewCard
              key={index}
              review={review}
              onReadMore={() => setSelectedReview(review)}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 text-center"
          variants={itemVariants}
        >
          <motion.button
            className="rounded-full border border-gray-300 bg-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Reviews
          </motion.button>
        </motion.div>
      </motion.div>

      <ReviewPopup
        review={selectedReview!}
        isOpen={selectedReview !== null}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
};

export default ReviewsSection;