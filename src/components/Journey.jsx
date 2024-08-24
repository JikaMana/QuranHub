import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import Chapters from "./Chapters";
import Banner from "../assets/banner.jpg";
import "../styles/Journey.css";

const Journey = () => {
  const [sortType, setSortType] = useState("ascending");
  const [activeNav, setActiveNav] = useState("surah");
  const [submitInput, setSubmitInput] = useState("");
  const [showAllSurahs, setShowAllSurahs] = useState(false);

  const handleDivClick = (value) => {
    setActiveNav(value);
  };

  return (
    <section data-aos="fade-up">
      <div className="mx-auto flex justify-center mb-12 ">
        <h1
          className="max-w-xl text-lime-950 text-6xl font-bold text-center "
          style={{ fontSize: "clamp(32px, 5vw,60px)" }}
        >
          Start the Journey of Enlightment
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-y-2 h-max xl:mx-20 mx-10 items-center">
        <nav className="rounded-full border-[1px] border-solid border-lime-950 flex gap-x-1 p-2 max-w-fit">
          <Link
            to="/"
            className={`text-lime-900 font-bold px-4 py-2 rounded-full ${activeNav === "surah" ? "active" : ""}`}
            onClick={() => handleDivClick("surah")}
          >
            Surah
          </Link>
          <Link
            to="/"
            className={`text-lime-900 font-bold px-4 py-2 rounded-full ${activeNav === "juz" ? "active" : ""}`}
            onClick={() => handleDivClick("juz")}
          >
            Juz
          </Link>
          <Link
            to="/"
            className={`text-lime-900 font-bold px-4 py-2 rounded-full ${activeNav === "order" ? "active" : ""}`}
            onClick={() => handleDivClick("order")}
          >
            Revelation Order
          </Link>
        </nav>
        <span className="flex-1" />
        <div className="flex-1 w-full">
          <SearchInput
            {...{
              submitInput,
              setSubmitInput,
              setActiveNav,
              setShowAllSurahs,
            }}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 xl:mx-20 mx-10">
        <label htmlFor="sorting" className="text-md">
          Sort by:
        </label>
        <select
          id="sorting"
          name="sorting"
          className="bg-transparent font-bold text-lime-950 border-0 outline-0 pl-1 ml-1"
          value={sortType}
          onChange={(e) => {
            setSortType(e.target.value);
          }}
        >
          <option
            value="ascending"
            className="sorting-options font-bold text-md"
          >
            Ascending
          </option>
          <option
            value="descending"
            className="sorting-options font-bold text-md"
          >
            Descending
          </option>
        </select>
      </div>
      <Chapters
        className=" xl:mx-20 mx-10"
        {...{
          activeNav,
          sortType,
          submitInput,
          showAllSurahs,
          setShowAllSurahs,
          setSubmitInput,
        }}
      />
      <div className="my-32">
        <img src={Banner} className="w-full" />
      </div>
    </section>
  );
};

export default Journey;
