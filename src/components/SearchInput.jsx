import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import React from "react";

const SearchInput = ({ setSubmitInput, setActiveNav, setShowAllSurahs }) => {
  return (
    <div className="input-container relative w-full mx-auto p-2 pl-4 flex items-center rounded-full border-[1px] border-solid border-lime-950">
      <input
        type="search"
        placeholder="What do you want to read?"
        className="flex-1 h-full bg-transparent text-lime-950 font-medium focus:outline-none"
        onChange={(e) => {
          setSubmitInput(e.target.value);
          setActiveNav("surah");
          setShowAllSurahs(true);
        }}
      />
      <div className="rounded-full h-10 w-10 bg-lime-900 grid place-items-center ">
        <MagnifyingGlassIcon className="text-white w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchInput;
