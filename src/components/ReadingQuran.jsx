import React from "react";
import heroQuran1 from "../assets/heroQuran1.jpg";
import heroQuran2 from "../assets/heroQuran2.jpg";
import { Link } from "react-router-dom";

const ReadingQuran = () => {
  return (
    <section className="xl:mx-20 mx-10">
      <div>
        <h1
          className=" font-bold leading-tight text-lime-950"
          style={{ fontSize: "clamp(32px, 5vw,72px)" }}
        >
          Make Self-Purification by Reading Quran{" "}
          <i className="fa-solid fa-book-quran"></i>
        </h1>
      </div>
      <div className="flex xl:justify-between gap-6 flex-col xl:flex-row my-6">
        <div className="flex gap-x-2 md:gap-x-4 xl:gap-x-6 max-w-full max-h-[16rem] sm:max-h-[20rem] md:max-h-[24rem] lg:max-h-[30rem]">
          <div className="w-full flex justify-center items-center overflow-hidden rounded-2xl bg-center">
            <img src={heroQuran1} alt="There was an error loading this image" />
          </div>
          <div className="w-full flex justify-center items-center overflow-hidden rounded-2xl bg-center">
            <img src={heroQuran2} alt="There was an error loading this image" />
          </div>
        </div>
        <div className="flex flex-col sm:justify-center sm:min-w-80 sm:max-w-lg gap-x-4">
          <div className="max-w-sm">
            <p
              className="mb-8 text-lime-950 font-medium"
              style={{ fontSize: "clamp(14px, 20px)" }}
            >
              Welcome to our Quran Reading Platform, where you can embark on a
              transformative journey through the sacred text of Islam.
            </p>
            <div className="flex flex-col gap-y-3 mb-6">
              <button className="bg-lime-800 px-4 py-3 rounded-full text-white font-3 font-semibold">
                <Link to="/reader">
                  Start Reading <i className="fa-solid fa-book"></i>
                </Link>
              </button>

              <button className="bg-yellow-500 px-4 py-3 rounded-full text-lime-950 font-3 font-sans">
                <Link to="/audio">
                  Listen Audio <i className="fa-solid fa-microphone"></i>
                </Link>
              </button>
            </div>
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i> (4.9)
            </div>
            <p className="text-3 text-lime-950">100k+ ratings on google</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadingQuran;
