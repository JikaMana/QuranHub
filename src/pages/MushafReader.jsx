import React, { useEffect, useState } from "react";
import quranData from "../data/chapters.js";
import { Link, useParams } from "react-router-dom";

const MushafReader = () => {
  const [surah, setSurah] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { surahNumber } = useParams();

  useEffect(() => {
    if (!surahNumber) {
      // Do not attempt to fetch if no surahNumber is provided
      setSurah(null);
      return;
    }

    const fetchSurah = async () => {
      try {
        const response = await fetch(
          `http://api.alquran.cloud/v1/surah/${surahNumber}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch Surah.`);
        }
        const data = await response.json();
        setSurah(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surah, surahNumber]);
  // if (surahNumber) {
  //   if (loading) {
  //     return <p>Loading...</p>;
  //   }
  // }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(surah);
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
                <h3 className="text-center text-[#faebd7] text-3xl font-medium mt-12 mb-4">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </h3>
                <div>
                  <ul>
                    {surah.ayahs
                      .filter((ayah) => ayah.numberInSurah !== 1)
                      .map((ayah) => (
                        <li
                          key={ayah.number}
                          className="text-right text-[#faebd7] text-2xl leading-10 font-medium mb-4"
                        >
                          <article className="flex justify-between gap-x-8  text-[#faebd7]">
                            <strong>{ayah.numberInSurah - 1}</strong>{" "}
                            {ayah.text}
                          </article>
                          <hr className="mt-4 border-[1.5px] border-white"></hr>
                        </li>
                      ))}
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
    <section className="overflow-y-scroll scrollbar-hide bg-lime-950 ">
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
