import React, { useEffect, useRef, useState } from "react";
import quranData from "../data/chapters.js";
import { Link } from "react-router-dom";

const Chapters = ({
  sortType,
  activeNav,
  submitInput,
  showAllSurahs,
  setShowAllSurahs,
}) => {
  const [quran, setQuran] = useState();
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSurahPage, setSelectedSurahPage] = useState(1);
  const NOT_ALL_SURAHS = 12;
  const ref = useRef(null);

  const showAllSurahsButton = () => {
    setShowAllSurahs((prevValue) => !prevValue);
    ref.current?.scrollIntoView();
  };

  useEffect(() => {
    let data;
    switch (activeNav) {
      case "surah":
        data = quranData.quranBasedOnSurah;
        break;
      case "juz":
        data = quranData.quranBasedOnJuz;
        break;
      case "order":
        data = quranData.quranBasedOnOrder;
        break;
      default:
        data = [];
    }

    if (isReversed) {
      data = [...data].reverse();
    }

    sortType === "descending" ? setIsReversed(true) : setIsReversed(false);

    setQuran(showAllSurahs ? data : data.slice(0, NOT_ALL_SURAHS));

    setLoading(false);
  }, [
    activeNav,
    sortType,
    showAllSurahs,
    submitInput,
    isReversed,
    selectedSurahPage,
  ]);

  return (
    <section className="my-4 px-8" ref={ref} quran={quran}>
      {loading ? (
        ""
      ) : activeNav === "surah" ? (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {quran
            .filter((q) => {
              return (
                submitInput.toLowerCase() === "" ||
                q.surahNameTransliteration
                  ?.toLowerCase()
                  .includes(submitInput.toLowerCase())
              );
            })
            .map((q) => (
              <Link
                to={`/reader/${q.surah_number}`}
                key={q.surah_number}
                className="flex justify-between items-center p-2 border-[1px] border-solid border-lime-950 rounded-lg"
              >
                <div className="flex items-center gap-x-2">
                  <div className="bg-[#317869] w-7 h-7 rounded-sm ">
                    <p className="text-md  text-center">{q.surah_number}</p>
                  </div>
                  <div>
                    <h2 className="font-bold text-lime-900 text-base">
                      {q.surahNameTransliteration}
                    </h2>
                    <p className=" text-lime-900 text-xs font-medium">
                      {q.chapterNameInEnglish}
                    </p>
                  </div>
                </div>
                <div className="grid">
                  <h3 className="font-bold text-lime-900 text-base justify-self-end">
                    {q.chapterNameInArabic}
                  </h3>
                  <p className=" text-lime-900 text-xs font-medium justify-self-end">
                    {q.numberOfVerses} Verses
                  </p>
                </div>
              </Link>
            ))}
        </div>
      ) : activeNav === "juz" ? (
        <div className="columns-1 sm:columns-2 lg:columns-3">
          {quran.map((juz) => (
            <div
              key={juz.number}
              className="p-4 bg-[#317869] rounded-lg h-fit"
              style={{ marginBottom: "16px", breakInside: "avoid" }}
            >
              <div className="flex justify-between items-center">
                <p className="pb-2 text-lg font-semibold text-white">
                  Juz {juz.number}
                </p>
                <Link
                  to="/juz"
                  className="pb-2 text-sm font-semibold text-white"
                >
                  Read Juz &rarr;
                </Link>
              </div>

              <div className="inline-block w-full p-2 border-[1px] border-solid  bg-[#faebd7]">
                {juz.surahs?.map((surah, index) => (
                  <Link to={`/reader/${surah.number}`}>
                    <div key={index} className="flex justify-between py-2">
                      <div className="flex items-center gap-x-2">
                        <div className="bg-[#317869] w-7 h-7 rounded-sm ">
                          <p className="text-md text-lime-950 text-center">
                            {surah.number}
                          </p>
                        </div>
                        <div>
                          <h2 className="font-bold text-lime-900 text-base">
                            {surah.surahNameTransliteration}
                          </h2>
                          <p className=" text-lime-900 text-xs font-medium">
                            {surah.surahNameTransliteration}
                          </p>
                        </div>
                      </div>
                      <div className="grid">
                        <h3 className="font-bold text-lime-900 text-base justify-self-end">
                          {surah.surahNameTransliteration}
                        </h3>
                        <p className=" text-lime-900 text-xs font-medium justify-self-end">
                          {surah.ayat} {surah.endAyat} Verses
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : activeNav === "order" ? (
        <>
          <div className="p-4 bg-[#efd6b3] text-lg mt-5 mb-10 text-lime-950">
            This view shows the chronological order of Surahs in the Quran based
            on when they were revealed to the Prophet Muhammad (SAW), The
            chronolgy is a subject of scholarly opinion and some Surahs were
            revealed in parts at different times. The ordering is based on the
            works of <strong>"Tanzil.net" </strong> and
            <strong> "quran.com"</strong>. [Note: the compiled Mushaf order from
            al-Fatiha to al-Nas is a matter of consensus.]
          </div>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {quran
              .filter((q) => {
                return (
                  submitInput.toLowerCase() === "" ||
                  q.surahNameTransliteration
                    ?.toLowerCase()
                    .includes(submitInput.toLowerCase())
                );
              })
              .map((q) => (
                <Link
                  to="/reader"
                  key={q.surah_number}
                  className="flex justify-between items-center p-2 border-[1px] border-solid border-lime-950 rounded-lg"
                  onClick={() => handleSurahClick(q.surah_number)}
                >
                  <div className="flex items-center gap-x-2">
                    <div className="bg-[#317869] w-7 h-7 rounded-sm ">
                      <p className="text-md  text-center">{q.surah_number}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lime-900 text-base">
                        {q.surahNameTransliteration}
                      </h2>
                      <p className=" text-lime-900 text-xs font-medium">
                        {q.chapterNameInEnglish}
                      </p>
                    </div>
                  </div>
                  <div className="grid">
                    <h3 className="font-bold text-lime-900 text-base justify-self-end">
                      {q.chapterNameInArabic}
                    </h3>
                    <p className=" text-lime-900 text-xs font-medium justify-self-end">
                      {q.numberOfVerses} Verses
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      ) : (
        <p>Something went wrong</p>
      )}

      <div className="flex justify-center">
        {!showAllSurahs && (
          <button
            className="bg-yellow-500
          px-10
          py-3
          rounded-full
          text-lime-950
          font-sem font-bold mt-6 "
            style={{ fontSize: "clamp(14px, 16px)" }}
            onClick={showAllSurahsButton}
          >
            Show All Surah
          </button>
        )}
        {showAllSurahs && (
          <button
            className="bg-yellow-500
          px-10
          py-3
          rounded-full
          text-lime-950
          font-sem font-bold mt-6 "
            style={{ fontSize: "clamp(14px, 16px)" }}
            onClick={showAllSurahsButton}
          >
            Show Few Surah
          </button>
        )}
      </div>
    </section>
  );
};

export default Chapters;
