// import React, { useEffect, useRef, useState } from "react";
// import { FaPlay, FaPause } from "react-icons/fa";

// const AudioPlayer = ({ index, audio, ayahNumber, surahLength }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playingIndex, setPlayingIndex] = useState(index);

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   useEffect(() => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//   }, [playingIndex]);

//   const handleAudioEnded = (index) => {
//     setIsPlaying(false);
//     setPlayingIndex(index + 1);
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <button
//         onClick={handlePlayPause}
//         className="p-3 bg-[#faebd7] text-lime-800 rounded-full hover:bg-[#faebd7]"
//       >
//         {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
//       </button>
//       <audio
//         ref={audioRef}
//         src={audio.ayahs[playingIndex].audio}
//         onEnded={() => handleAudioEnded(index)}
//       />
//     </div>
//   );
// };

// export default AudioPlayer;
import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, ayahNumber, onAudioEnd }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Tracks playback state
  const audioRef = useRef(null); // Single audio reference for the current Ayah

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        console.log("Audio Paused");
      } else {
        audioRef.current.play();
        console.log("Audio Playing");
      }
      setIsPlaying(!isPlaying);
    } else {
      console.error("Audio Ref is not defined");
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false); // Reset playback state when audio ends
    console.log("Audio Ended");
    if (onAudioEnd) onAudioEnd(ayahNumber); // Notify parent component
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
        ref={audioRef} // Assign ref for this Ayah's audio
        src={audioSrc}
        onEnded={handleAudioEnded}
        onCanPlay={() => console.log("Audio loaded and ready to play")}
        onError={(e) => console.error("Audio error", e)}
      />
    </div>
  );
};

export default AudioPlayer;
