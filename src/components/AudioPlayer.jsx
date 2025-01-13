// import { useEffect, useRef, useState } from "react";

// const AudioPlayer = ({
//   audioSrc,
//   setAudioEnded,
//   autoPlay = false,
//   isActive,
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (isActive && autoPlay) {
//       audioRef.current
//         .play()
//         .then(() => {
//           setIsPlaying(true);
//         })
//         .catch((error) => console.error("Audio playback error:", error));
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   }, [isActive, autoPlay]);

//   const handlePlayPause = () => {
//     const audio = audioRef.current;

//     if (audio.played && isPlaying == false) {
//       setIsPlaying(true);
//       audio.pause();
//       setAudioEnded();
//     } else if (audio.paused) {
//       audio.play();
//       setIsPlaying(true);
//       console.log("Audio Is Playing");
//     } else {
//       audio.pause();
//       setIsPlaying(false);
//       console.log("Audio Is Paused");
//     }
//   };

//   const handleAudioEnded = () => {
//     setIsPlaying(false);
//     if (setAudioEnded) setAudioEnded(); // Ensure callback is invoked
//   };

//   return (
//     <div className="flex items-center gap-4 my-2">
//       <button
//         onClick={handlePlayPause}
//         className="p-3 bg-[#faebd7] text-lime-800 rounded-full hover:bg-[#faebd7]"
//       >
//         {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
//       </button>
//       <audio
//         ref={audioRef}
//         src={audioSrc}
//         onEnded={handleAudioEnded}
//         onCanPlay={() => console.log("Audio loaded and ready to play")}
//         onError={(e) => console.error("Audio error:", e)}
//       />
//     </div>
//   );
// };

// export default AudioPlayer;
