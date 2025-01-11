import React from "react";
import Quran from "../assets/heroQuran2.jpg";
import { Link } from "react-router-dom";

const YourSources = () => {
  return (
    <section
      className="flex flex-col xl:flex-row gap-10 justify-between xl:items-center mb-20 xl:mx-20 mx-10"
      data-aos="fade-up"
    >
      <div className="w-full xl:max-h-[36rem] overflow-hidden flex justify-center items-center rounded-3xl">
        <img
          src={Quran}
          alt="There was an error loading image"
          className="w-full"
        />
      </div>
      <div className="xl:max-w-xl">
        <h2
          className="text-lime-950 text-6xl font-bold"
          style={{ fontSize: "clamp(32px, 5vw,60px)" }}
        >
          Your Source of Divine Guidance and Wisdom
        </h2>
        <p
          className="text-lime-950 font-medium my-6"
          style={{ fontSize: "clamp(14px, 3vw, 20px)" }}
        >
          The Quran is not just a book; it is the ultimate source of guidance
          for millions of people around the world
        </p>
        <p
          className="text-lime-950 font-medium"
          style={{ fontSize: "clamp(14px, 3vw, 20px)" }}
        >
          <span className="font-bold">Revealed over 1,400 years ago,</span> the
          Quran is a timeless and universal scripture that offers profound
          insights into the human condition, ethics, spirituality and the nature
          of the universe. It is the word of{" "}
          <span className="font-bold">Allah,</span> as conveyed to humanity
          through the <span className="font-bold">Prophet Muhammad</span> (peace
          be upon him)
        </p>
        <Link to="/about-quran">
          <button
            className="bg-yellow-500
          px-10
          py-3
          rounded-full
          text-lime-950
          font-bold mt-6"
            style={{ fontSize: "clamp(14px, 16px)" }}
          >
            Learn More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default YourSources;
