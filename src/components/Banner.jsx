import React from "react";

const Banner = () => {
  return (
    <section
      className="flex flex-col items-center py-12 xl:px-20 px-10 gap-6 "
      style={{ backgroundColor: "rgb(49 120 105)" }}
    >
      <h1
        className="font-bold text-6xl text-white  w-fit text-center lg:max-w-2xl"
        style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
      >
        Begin Your Journey with the Quran
      </h1>
      <p
        className="text-gray-300 text-lg font-medium text-center lg:max-w-2xl"
        style={{ fontSize: "clamp(14px, 3vw, 20px)" }}
      >
        Embrace the transformative power of the Quran today. Whether you are new
        to the Quran or a seasoned reader, our platform offers an enriching and
        accesible experience for all.
      </p>
      <div className="flex flex-col sm:flex-row  gap-y-3 mb-6 lg:max-w-2xl gap-x-4">
        <button
          className="bg-white px-10
          py-3 rounded-full text-lime-950 font-3 font-semibold"
        >
          Start Reading <i className="fa-solid fa-book"></i>
        </button>
        <button
          className="bg-yellow-500 px-10
          py-3 rounded-full text-lime-950 font-3 font-sans font-bold"
        >
          Listen Audio <i className="fa-solid fa-microphone"></i>
        </button>
      </div>
    </section>
  );
};

export default Banner;
