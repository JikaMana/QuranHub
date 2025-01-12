import React, { useEffect, useState } from "react";
import quranData from "../data/chapters.js";
import { Link, useParams } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer.jsx";

const MushafReader = () => {
  const [surah, setSurah] = useState(null);
  const [audio, setAudio] = useState(null);
  const [surahTranslation, setSurahTranslation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { surahNumber } = useParams();

  useEffect(() => {
    if (!surahNumber) {
      // Do not attempt to fetch if no surahNumber is provided
      setSurah(null);
      return;
    }
    const API_URL = `http://api.alquran.cloud/v1/surah/${surahNumber}`;

    const fetchSurahData = async () => {
      try {
        const [surahResponse, translationResponse, audioResponse] =
          await Promise.all([
            fetch(API_URL),
            fetch(`${API_URL}/en.pickthall`),
            fetch(`${API_URL}/ar.alafasy`),
          ]);

        if (!surahResponse.ok || !translationResponse.ok) {
          throw new Error("Failed to fetch Surah or its translation.");
        }

        if (!audioResponse.ok) {
          throw new Error("Failed to fetch Audio from API");
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
  }, [surahNumber]);

  if (error) {
    alert(error);
  }

  function capitalizeFirstWord(str) {
    const words = str.split(" ");

    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

    return words.join(" ");
  }

  return (
    <section className="flex  mx-20">
      <MushafReaderSurahBar />
      <div className="flex-[0.7] bg-lime-950 opacity-85 px-12 pt-4 pb-8 w-full mx-auto overflow-y-scroll scrollbar-hide rounded-2xl h-[80vh]">
        {surahNumber ? (
          <>
            {loading === true ? (
              <p className=" text-[#faebd7] text-xl font-medium mt-4 mb-4">
                Loading...
              </p>
            ) : (
              <>
                <h1 className="text-center text-3xl text-[#faebd7] font-medium">
                  {surah.englishNameTranslation} - ({surah.englishName}){" "}
                  {surah.name}
                </h1>
                <div className="mt-8">
                  <ul>
                    {surah.ayahs.map((ayah, index) => {
                      const translation = surahTranslation.ayahs.find(
                        (tAyah) => tAyah.number === ayah.number
                      ); // Find the corresponding translation
                      return (
                        <li
                          key={ayah.number}
                          className="text-right text-[#faebd7] text-2xl leading-10 font-medium mb-4"
                        >
                          <article className="flex justify-between gap-x-8  text-[#faebd7]">
                            <strong>{ayah.numberInSurah}</strong> {ayah.text}
                          </article>
                          {translation && (
                            <p className="text-left text-gray-300 text-xl ml-16 mt-2">
                              {capitalizeFirstWord(translation.text)}
                            </p>
                          )}
                          <AudioPlayer
                            // ayahAudio={ayah.audio}
                            ayahNumber={ayah.number}
                            index={index}
                            audio={audio}
                          />
                          <hr className="mt-4 border-[1.5px] border-white"></hr>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </>
        ) : (
          <div className=" text-[#faebd7] text-xl font-medium mt-4 mb-4">
            <h2>No Surah has been selected</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default MushafReader;

export function MushafReaderSurahBar() {
  return (
    <section className="overflow-y-scroll scrollbar-hide bg-lime-950 rounded-lg">
      <div
        className="grid gap-3 h-[80vh] opacity-85 -z-10 px-4 py-6 flex-[0.25]"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {quranData.quranBasedOnSurah.map((q) => (
          <Link
            to={`/reader/${q.surah_number}`}
            key={q.surah_number}
            className="flex justify-between items-center p-2 border-[1px] border-solid border-lime-950 rounded-lg bg-[#faebd7]"
            onClick={() => handleSurahClick(q.surah_number)}
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
// .filter((q) => {
//         const searchInput = submitInput.toLowerCase();
//         return (
//           searchInput === "" ||
//           q.surahNameTransliteration?.toLowerCase().includes(searchInput)
//         );
//       })
