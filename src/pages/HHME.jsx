import React from "react";
import Header from "../components/Header";
import HeroSectionHHME from "../components/home/HeroSectionHHME";
import AboutSectionHHME from "../components/home/AboutSectionHHME";
import VisionMissionSection from "../components/home/VisionMissionSection";
import MeetUsSectionHHME from "../components/home/MeetUsSectionHHME";
import VisionariesSectionHHME from "../components/home/VisionariesSectionHHME";
import ProgramsSectionHHME from "../components/home/ProgramsSectionHHME";
import PartnersSectionHHME from "../components/home/PartnersSectionHHME";
import Footer from "../components/Footer";

function HHME() {
  return (
    <div
      className="relative w-full min-h-[800px]  flex flex-col gap-2"
      style={{
        // backgroundImage: "url('/Hero Image.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <HeroSectionHHME />
      <AboutSectionHHME />
      <VisionMissionSection />
      <VisionariesSectionHHME />
      <ProgramsSectionHHME />
      <PartnersSectionHHME />
      <MeetUsSectionHHME />
      <Footer/>
    </div>
  );
}

export default HHME;
