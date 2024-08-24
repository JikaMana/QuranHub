import React from "react";

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#faebd7]">
      <h1 className="text-6xl font-bold text-lime-900">ERROR 404 {":)"}</h1>
      <p className="text-2xl text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-gray-500 mt-2">
        It seems you've hit a broken link or the page has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-lime-900 text-[#faebd7] rounded-lg shadow-xl hover:bg-[#faebd7] hover:text-lime-950 hover:font-bold transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
