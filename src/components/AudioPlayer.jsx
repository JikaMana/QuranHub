import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({
  audioSrc,
  setAudioEnded,
  autoPlay = false,
  isActive,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isActive && autoPlay) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, autoPlay]);

  console.log(audioRef.current);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
      console.log("Audio Is Playing");
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log("Audio Is Paused");
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioEnded();
  };

  return (
    <div className="flex items-center gap-4 my-2">
      <button
        onClick={handlePlayPause}
        className="p-3 bg-[#faebd7] text-lime-800 rounded-full hover:bg-[#faebd7]"
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </button>
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleAudioEnded}
        onCanPlay={() => console.log("Audio loaded and ready to play")}
        onError={(e) => console.error("Audio error", e)}
      />
    </div>
  );
};

export default AudioPlayer;
