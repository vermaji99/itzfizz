import React from "react";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  return (
    <>
      <section className="relative h-[300vh]">
        <div className="h-screen">
          <HeroSection />
        </div>
      </section>
      <section className="h-[120vh] bg-neutral-900"></section>
    </>
  );
}
