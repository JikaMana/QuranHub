import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ index, audio, ayahNumber }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(index);

  console.log(audio, ayahNumber, index);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = (index) => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handlePlayPause}
        className="p-3 bg-[#faebd7] text-lime-800 rounded-full hover:bg-[#faebd7]"
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </button>
      <audio
        ref={audioRef}
        src={audio.ayahs[playingIndex].audio}
        onEnded={() => handleAudioEnded(index)}
      />
    </div>
  );
};

export default AudioPlayer;
