import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTopButton = ({ ToTopRef }) => {
  const scrollToTop = () => {
    ToTopRef.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="z-10 absolute  right-0 rounded-full shadow-lg  transition duration-300"
      aria-label="Scroll to top"
    >
      <FaArrowCircleUp size={30} className=" text-[#faebd7] " />
    </button>
  );
};

export default ScrollToTopButton;
