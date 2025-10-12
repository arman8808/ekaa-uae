import React from "react";
import HeroSection from "../components/home/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DecodeComponent from "../components/home/DecodeComponent";
import Testimonials from "../components/home/Testimonials";

function HomePage() {
  return (
    <>
      <div
        className="relative w-full min-h-[800px] h-[800px] flex flex-col "
        style={{
          backgroundImage: "url('/Hero Image.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <HeroSection />
      </div>
      <div className="relative">
        <img
          src="/hhme/WhatsApp Image 2025-10-07 at 22.33.47.jpeg"
          alt="hhme"
          className="object-contain m-4"
        />

        <div className="relative">
          <div className="hidden lg:flex relative z-10 mt-[-60px] mb-[-30px] justify-center pointer-events-none">
            <img src="/2.2.svg" alt="Leaf" />
          </div>
        </div>
      </div>

      <div className="relative">
        <DecodeComponent />
      </div>

      {/* <TrainingPrograms/> */}

      <Testimonials />

      <Footer />
    </>
  );
}

export default HomePage;

//

// hero section
// video
// personal guidencce
// decode section
// who can benifit
// TrainingPrograms
// test
// fott
