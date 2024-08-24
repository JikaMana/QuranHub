import React, { useEffect, useRef, useState } from "react";
import quranData from "../data/chapters.js";
import { Link } from "react-router-dom";
import MushafReader from "../pages/MushafReader.jsx";

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

  // const surahPages = {
  //   1: 1, // Al-Fatihah
  //   2: 2, // Al-Baqarah
  //   3: 50, // Al-Imran
  //   4: 77, // An-Nisa'
  //   5: 106, // Al-Ma'idah
  //   6: 128, // Al-An'am
  //   7: 151, // Al-A'raf
  //   8: 177, // Al-Anfal
  //   9: 187, // At-Tawbah
  //   10: 208, // Yunus
  //   11: 221, // Hud
  //   12: 235, // Yusuf
  //   13: 249, // Ar-Ra'd
  //   14: 255, // Ibrahim
  //   15: 262, // Al-Hijr
  //   16: 267, // An-Nahl
  //   17: 282, // Al-Isra
  //   18: 293, // Al-Kahf
  //   19: 305, // Maryam
  //   20: 312, // Ta-Ha
  //   21: 322, // Al-Anbiya
  //   22: 332, // Al-Hajj
  //   23: 342, // Al-Mu'minun
  //   24: 350, // An-Nur
  //   25: 359, // Al-Furqan
  //   26: 367, // Ash-Shu'ara
  //   27: 377, // An-Naml
  //   28: 385, // Al-Qasas
  //   29: 396, // Al-Ankabut
  //   30: 404, // Ar-Rum
  //   31: 411, // Luqman
  //   32: 415, // As-Sajda
  //   33: 418, // Al-Ahzab
  //   34: 428, // Saba'
  //   35: 434, // Fatir
  //   36: 440, // Ya-Sin
  //   37: 446, // As-Saffat
  //   38: 453, // Sad
  //   39: 458, // Az-Zumar
  //   40: 467, // Ghafir
  //   41: 477, // Fussilat
  //   42: 483, // Ash-Shura
  //   43: 489, // Az-Zukhruf
  //   44: 496, // Ad-Dukhan
  //   45: 499, // Al-Jathiya
  //   46: 502, // Al-Ahqaf
  //   47: 507, // Muhammad
  //   48: 511, // Al-Fath
  //   49: 515, // Al-Hujurat
  //   50: 518, // Qaf
  //   51: 520, // Adh-Dhariyat
  //   52: 523, // At-Tur
  //   53: 526, // An-Najm
  //   54: 528, // Al-Qamar
  //   55: 531, // Ar-Rahman
  //   56: 534, // Al-Waqi'a
  //   57: 537, // Al-Hadid
  //   58: 541, // Al-Mujadila
  //   59: 544, // Al-Hashr
  //   60: 547, // Al-Mumtahina
  //   61: 550, // As-Saff
  //   62: 552, // Al-Jumua
  //   63: 553, // Al-Munafiqun
  //   64: 555, // At-Taghabun
  //   65: 558, // At-Talaq
  //   66: 560, // At-Tahrim
  //   67: 562, // Al-Mulk
  //   68: 564, // Al-Qalam
  //   69: 566, // Al-Haqqah
  //   70: 568, // Al-Ma'arij
  //   71: 570, // Nuh
  //   72: 572, // Al-Jinn
  //   73: 574, // Al-Muzzammil
  //   74: 575, // Al-Muddathir
  //   75: 577, // Al-Qiyama
  //   76: 578, // Al-Insan
  //   77: 580, // Al-Mursalat
  //   78: 582, // An-Naba
  //   79: 583, // An-Nazi'at
  //   80: 584, // Abasa
  //   81: 585, // At-Takwir
  //   82: 586, // Al-Infitar
  //   83: 587, // Al-Mutaffifin
  //   84: 589, // Al-Inshiqaq
  //   85: 590, // Al-Buruj
  //   86: 591, // At-Tariq
  //   87: 592, // Al-A'la
  //   88: 593, // Al-Ghashiya
  //   89: 594, // Al-Fajr
  //   90: 595, // Al-Balad
  //   91: 596, // Ash-Shams
  //   92: 597, // Al-Lail
  //   93: 598, // Ad-Duha
  //   94: 599, // Ash-Sharh
  //   95: 600, // At-Tin
  //   96: 600, // Al-Alaq
  //   97: 601, // Al-Qadr
  //   98: 601, // Al-Bayyina
  //   99: 602, // Az-Zalzalah
  //   100: 602, // Al-Adiyat
  //   101: 603, // Al-Qari'a
  //   102: 603, // At-Takathur
  //   103: 604, // Al-Asr
  //   104: 604, // Al-Humaza
  //   105: 605, // Al-Fil
  //   106: 605, // Quraysh
  //   107: 606, // Al-Ma'un
  //   108: 606, // Al-Kawthar
  //   109: 607, // Al-Kafirun
  //   110: 607, // An-Nasr
  //   111: 608, // Al-Masad
  //   112: 608, // Al-Ikhlas
  //   113: 609, // Al-Falaq
  //   114: 609, // An-Nas
  // };

  const handleSurahClick = (surahNumber) => {
    setSelectedSurahPage(surahPages[surahNumber]);
  };

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
                {juz.surahs?.map((surah, sIndex) => (
                  <div key={sIndex} className="flex justify-between py-2">
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
