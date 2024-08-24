import React from "react";

const CrossSection = () => {
  return (
    <section id="about" className="my-10 p-0  font-sans">
      <div className=" flex items-center relative overflow-hidden h-32">
        <div className="absolute flex justify-around items-center w-full h-12 bg-yellow-500  -rotate-3 z-50">
          <li className="font-bold text-lime-950 whitespace-nowrap px-4 list-[square]">
            Divine revelation
          </li>
          <li className="font-bold text-lime-950 whitespace-nowrap px-4 list-[square]">
            Timeless Wisdom
          </li>
          <li className="font-bold text-lime-950 whitespace-nowrap px-4 list-[square]">
            Literacy Excellence
          </li>
          <li className="font-bold text-lime-950 whitespace-nowrap px-4 list-[square]">
            Universality
          </li>
          <li className="font-bold text-lime-950 whitespace-nowrap px-4 list-[square]">
            Comprehensive
          </li>
        </div>
        <div className="absolute flex justify-around items-center w-full h-12 bg-lime-800 rotate-3"></div>
      </div>
    </section>
  );
};

export default CrossSection;
