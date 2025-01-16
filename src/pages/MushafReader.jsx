import React, { useEffect, useState, useRef } from "react";
import quranData from "../data/chapters.js";
import { Link, useParams } from "react-router-dom";
import { FaPlay, FaPause, FaStop, FaRedo } from "react-icons/fa";
import ScrollToTopButton from "../components/ScrollToTopButton";

const MushafReader = () => {
  const [surah, setSurah] = useState(null);
  const [surahTranslation, setSurahTranslation] = useState(null);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [mushafMode, setMushafMode] = useState("both");

  const audioRef = useRef(null);
  const ToTopRef = useRef(null);

  const { surahNumber } = useParams();

  function capitalizeFirstWord(str) {
    const words = str.split(" ");
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ");
  }

  useEffect(() => {
    if (!surahNumber) {
      setSurah(null);
      return;
    }
    const API_URL = `https://api.alquran.cloud/v1/surah/${surahNumber}`;

    const fetchSurahData = async () => {
      try {
        const [surahResponse, translationResponse, audioResponse] =
          await Promise.all([
            fetch(API_URL),
            fetch(`${API_URL}/en.pickthall`),
            fetch(`${API_URL}/ar.alafasy`),
          ]);

        if (!surahResponse.ok || !translationResponse.ok || !audioResponse.ok) {
          throw new Error("Failed to fetch data from the API.");
        }

        const surahData = await surahResponse.json();
        const translationData = await translationResponse.json();
        const audioData = await audioResponse.json();

        setSurah(surahData.data);
        setSurahTranslation(translationData.data);
        setAudio(audioData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahData();
    setIsDisabled(false);
  }, [surahNumber]);

  const playAudio = () => {
    if (!audio || !audio.ayahs || audio.ayahs.length === 0) return;

    let currentIndex = 0;
    const playNext = () => {
      if (currentIndex < audio.ayahs.length) {
        audioRef.current.src = audio.ayahs[currentIndex].audio;
        audioRef.current.play();
        currentIndex++;
      }
    };

    audioRef.current.onended = playNext;
    playNext();
    setIsPaused(false);
    setIsDisabled(true);

    if (isDisabled == true) {
    } else {
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio timer to 0
    }
    setIsDisabled(false);
  };

  const handleModeChange = (mode) => {
    setMushafMode(mode);
  };

  return (
    <section className="flex flex-col lg:flex-row gap-y-4 xl:mx-20 mx-4 lg:mx-10 h-screen lg:h-[80vh] overflow-hidden">
      <MushafReaderSurahBar />
      <main className="lg:flex-[0.8] mx-auto">
        <div className="flex gap-x-2 ml-0 sm:ml-4 mb-2 ">
          <button
            onClick={() => handleModeChange("arabic")}
            className={`bg-lime-950 opacity-85 px-2 sm:px-4 py-1 text-[#faebd7] font-medium text-base md:text-lg hover:scale-105 ${
              mushafMode === "arabic" ? "bg-lime-700" : ""
            }`}
          >
            Arabic
          </button>
          <button
            onClick={() => handleModeChange("translation")}
            className={`bg-lime-950 opacity-85 px-4 py-1 text-[#faebd7] font-medium text-base md:text-lg hover:scale-105 ${
              mushafMode === "translation" ? "bg-lime-700" : ""
            }`}
          >
            Translation
          </button>
          <button
            onClick={() => handleModeChange("both")}
            className={`bg-lime-950 opacity-85 px-4 py-1 text-[#faebd7] font-medium text-base md:text-lg hover:scale-105 ${
              mushafMode === "both" ? "bg-lime-700" : ""
            }`}
          >
            Both
          </button>
        </div>
        <div
          ref={ToTopRef}
          className=" bg-lime-950 opacity-85 xl:px-12 px-4 sm:px-8 pt-4 pb-8 w-full  h-[80vh] overflow-y-scroll scrollbar-hide rounded-2xl"
        >
          {surahNumber ? (
            <>
              {loading ? (
                <p className="text-[#faebd7] text-xl font-medium mt-4 mb-4">
                  Loading Verses...
                </p>
              ) : (
                <>
                  <div>
                    {surah ? (
                      <h1 className="text-center text-2xl sm:text-3xl text-[#faebd7] font-medium">
                        {surah?.englishNameTranslation} - ({surah?.englishName}){" "}
                        {surah?.name}
                      </h1>
                    ) : (
                      <h1 className="text-center text-2xl sm:text-3xl text-[#faebd7] font-medium">
                        Check your Internet connection
                      </h1>
                    )}
                    {surah && surahTranslation && (
                      <div className="flex gap-x-4 justify-center">
                        <button
                          onClick={pauseAudio}
                          className="bg-[#faebd7] text-lime-800 rounded-lg px-4 py-2 mt-6 hover:bg-[#e9dbcb] flex items-center gap-x-2"
                        >
                          {isPaused === false ? (
                            <FaPause size={16} />
                          ) : (
                            <FaPlay size={16} />
                          )}
                        </button>
                        {isDisabled ? (
                          <button
                            onClick={playAudio}
                            className="bg-[#faebd7] text-lime-800 rounded-lg px-4 py-2 mt-6 hover:bg-[#e9dbcb] flex items-center gap-x-2"
                          >
                            Restart
                            <FaRedo size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={playAudio}
                            className="bg-[#faebd7] text-lime-800 rounded-lg px-4 py-2 mt-6 hover:bg-[#e9dbcb] flex items-center gap-x-2"
                          >
                            Start
                            <FaPlay size={16} />
                          </button>
                        )}
                        <button
                          onClick={stopAudio}
                          className="bg-[#faebd7] text-lime-800 rounded-lg px-4 py-2 mt-6 hover:bg-[#e9dbcb] flex items-center gap-x-2"
                        >
                          <FaStop size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <audio ref={audioRef} />

                  {mushafMode === "both" && (
                    <div className="mt-4 sm:mt-8 relative">
                      <ul>
                        {surah?.ayahs.map((ayah) => {
                          const translation = surahTranslation.ayahs.find(
                            (tAyah) => tAyah.number === ayah.number
                          );
                          return (
                            <li
                              key={ayah.number}
                              className="text-right text-[#faebd7] text-2xl leading-10 font-medium mb-4"
                            >
                              <article className="flex justify-between gap-x-8 text-[#faebd7]">
                                <strong>{ayah.numberInSurah}</strong>{" "}
                                {ayah.text}
                              </article>
                              {translation && (
                                <p className="text-left text-gray-300 text-xl ml-16 mt-2">
                                  {capitalizeFirstWord(translation.text)}
                                </p>
                              )}
                              <hr className="mt-4 border-[1.5px] border-white" />
                            </li>
                          );
                        })}
                      </ul>
                      {surah && surahTranslation && (
                        <ScrollToTopButton ToTopRef={ToTopRef.current} />
                      )}
                    </div>
                  )}
                  {mushafMode === "arabic" && (
                    <div className="mt-4 sm:mt-8 relative">
                      <ul>
                        {surah?.ayahs.map((ayah) => {
                          const translation = surahTranslation.ayahs.find(
                            (tAyah) => tAyah.number === ayah.number
                          );
                          return (
                            <li
                              key={ayah.number}
                              className="text-right text-[#faebd7] text-2xl leading-10 font-medium mb-4"
                            >
                              <article className="flex justify-between gap-x-8 text-[#faebd7]">
                                <strong>{ayah.numberInSurah}</strong>{" "}
                                {ayah.text}
                              </article>

                              <hr className="mt-4 border-[1.5px] border-white" />
                            </li>
                          );
                        })}
                      </ul>
                      {surah && surahTranslation && (
                        <ScrollToTopButton ToTopRef={ToTopRef.current} />
                      )}
                    </div>
                  )}
                  {mushafMode === "translation" && (
                    <div className="mt-4 sm:mt-8 relative">
                      <ul>
                        {surah?.ayahs.map((ayah) => {
                          const translation = surahTranslation.ayahs.find(
                            (tAyah) => tAyah.number === ayah.number
                          );
                          return (
                            <li
                              key={ayah.number}
                              className="text-right text-[#faebd7] text-2xl leading-10 font-medium mb-4"
                            >
                              <article className="flex justify-between gap-x-8 text-[#faebd7]">
                                <strong>{ayah.numberInSurah}</strong>{" "}
                                {translation && (
                                  <p className="text-left text-gray-300 text-xl ml-16 mt-2">
                                    {capitalizeFirstWord(translation.text)}
                                  </p>
                                )}
                              </article>

                              <hr className="mt-4 border-[1.5px] border-white" />
                            </li>
                          );
                        })}
                      </ul>
                      {surah && surahTranslation && (
                        <ScrollToTopButton ToTopRef={ToTopRef.current} />
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="text-[#faebd7] text-xl font-medium mt-4 mb-4">
              <h2>No Surah has been selected</h2>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default MushafReader;

export function MushafReaderSurahBar() {
  return (
    <section className="overflow-y-scroll scrollbar-hide bg-lime-950 opacity-85 rounded-lg  h-40 lg:h-[80vh]">
      <h3 className="text-[#faebd7] text-xl font-medium  mt-2 sm:mt-4 ml-4">
        Select Surah
      </h3>

      <div
        className="grid gap-3 opacity-85 -z-10 px-4 py-6 flex-[0.25]"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {quranData.quranBasedOnSurah.map((q) => (
          <Link
            to={`/reader/${q.surah_number}`}
            key={q.surah_number}
            className="flex justify-between items-center p-1 sm:p-2 border-[1px] border-solid border-lime-950 rounded-lg bg-[#faebd7]"
          >
            <div className="flex items-center gap-x-2">
              <div className="bg-[#317869] w-7 h-7 rounded-sm">
                <p className="text-md text-center">{q.surah_number}</p>
              </div>
              <div>
                <h2 className="font-bold text-lime-900 text-base">
                  {q.surahNameTransliteration}
                </h2>
                <p className="text-lime-900 text-xs font-medium">
                  {q.chapterNameInEnglish}
                </p>
              </div>
            </div>

            <div className="grid">
              <h3 className="font-bold text-lime-900 text-base justify-self-end">
                {q.chapterNameInArabic}
              </h3>
              <p className="text-lime-900 text-xs font-medium justify-self-end">
                {q.numberOfVerses} Verses
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
