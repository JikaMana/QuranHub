import React from "react";
import ReadingQuran from "../components/ReadingQuran";
import CrossSection from "../components/CrossSection";
import YourSources from "../components/YourSources";
import Journey from "../components/Journey";
import Reciters from "../components/Reciters";
import Blog from "../components/Blog";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <main id="home" className="my-6">
      <ReadingQuran />
      <CrossSection />
      <YourSources />
      <Journey />
      <Reciters />
      <Blog />
      <Banner />
      <Footer />
    </main>
  );
};

export default Homepage;
