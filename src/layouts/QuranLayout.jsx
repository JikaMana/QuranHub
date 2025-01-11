import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const QuranLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="m-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-xl font-semibold gap-2 text-lime-950 hover:text-white  hover:bg-lime-950 px-2 py-1 rounded-md"
        >
          <span className="pb-1">&#8592;</span>
          Back
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default QuranLayout;
