import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  const handlePlay = () => {
    alert("Play button clicked");
    // Add your play functionality here
  };

  return (
    <button
      onClick={handlePlay}
      className="p-4 bg-[#faebd7] text-lime-800 rounded-full hover:bg-[#faebd7] mt-2"
    >
      <FaPlay size={24} />
    </button>
  );
};

export default PlayButton;
