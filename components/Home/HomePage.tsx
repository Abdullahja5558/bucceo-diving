'use client';
import Image from "next/image";
import Header from "@/components/Home/Header";
import Discover from "@/components/Home/Discover";
import ReviewCard from "@/components/Home/ReviewCard";
import LocationSection from "@/components/Home/LocationSection";
import WeatherForecast from "@/components/Home/WeatherForecast";
import ReviewsSection from "@/components/Home/ReviewsSection";
import FAQsSection from "@/components/Home/FAQsSection";
import YouMightAlsoLikeSection from "@/components/Home/YouLikedSection";
import Footer from "@/components/Home/Footer";
import AvailableRoutes from "@/components/Home/AvailableRoutes";
import InclusionsCard from "@/components/Home/InclusionsCard";
import VesselOverview from "@/components/Home/VesselOverview";
import BoatGrid from "@/components/Home/BoatGrid";
import CabinSelection from "@/components/Home/CabinSelection";
import VesselDetails from "@/components/Home/VesselDetails";
import DivingDetails from "@/components/Home/DivingDetails";








export default function Home() {
  return (
    <>
      <Header />
      <Discover />
      <AvailableRoutes />
      <ReviewCard />
      <InclusionsCard/>
      <VesselOverview />
      <CabinSelection />
      <BoatGrid />
      <VesselDetails />
      <DivingDetails />
      <LocationSection />
      <WeatherForecast />
      <ReviewsSection />
      <FAQsSection />
      <YouMightAlsoLikeSection />
      <Footer />
    
    </>
  );
}
