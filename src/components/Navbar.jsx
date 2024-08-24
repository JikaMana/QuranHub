import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [showNavOptions, setShowNavOptions] = useState(false);

  const toggleHamburger = () => {
    setShowNavOptions(!showNavOptions);
  };

  let menuRef = useRef();
  let iconRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (
        !menuRef.current.contains(e.target) &&
        !iconRef.current.contains(e.target)
      ) {
        setShowNavOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <header className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 py-2 ">
      <div className="flex gap-4 items-center xl:px-20 lg:px-10 px-4">
        <div className="lg:hidden w-[24px] " onClick={toggleHamburger}>
          <i
            className={`fa-solid fa-bars hamburger text-2xl  ${showNavOptions ? "active" : ""}`}
          ></i>

          <i
            className={`fa-solid fa-xmark cross text-2xl  ${showNavOptions ? "active" : ""}`}
            ref={iconRef}
          ></i>
        </div>
        <Link to="/">
          <div className="main-logo flex items-center gap-x-1 ">
            <i className="fa-solid fa-book-open text-lime-950"></i>
            <h1 className="text-lime-950 text-2xl font-bold">QuranHub</h1>
          </div>
        </Link>
      </div>
      <div
        className={` navbarSlider flex flex-col lg:flex-row gap-x-2 bg-lime-800 lg:bg-transparent lg:items-center w-[250px] lg:w-fit h-screen lg:h-fit absolute lg:relative top-12 lg:top-0  
       ${showNavOptions ? "active" : ""}`}
        ref={menuRef}
      >
        <nav className="navbarOptions p-6 lg:py-2 flex  flex-col lg:flex-row lg:left-0  gap-x-6 gap-y-4 lg:items-center">
          <a
            href="#home"
            className="text-gray-400 lg:text-lime-950 text-lg rounded-full active:font-bold"
          >
            <li>Home</li>
          </a>
          <Link
            to="/salat"
            className="text-gray-400 lg:text-white text-lg lg:bg-lime-950  rounded-full lg:rounded-[4px]   lg:p-2  active:font-bold"
          >
            <li>Time | Date</li>
          </Link>
          <a
            href="#about"
            className="text-gray-400 lg:text-lime-950 text-lg rounded-full active:font-bold"
          >
            <li>About</li>
          </a>
          <a
            href="#reciters"
            className="text-gray-400 lg:text-lime-950 text-lg rounded-full active:font-bold"
          >
            <li>Reciters</li>
          </a>
          <a
            href="#blog"
            className="text-gray-400 lg:text-lime-950 text-lg rounded-full active:font-bold"
          >
            <li>Blog</li>
          </a>
          <a
            href="#contactUs"
            className="text-gray-400 lg:text-lime-950 text-lg rounded-full active:font-bold"
          >
            <li>Contact</li>
          </a>
        </nav>
        <div className="flex flex-col lg:flex-row gap-x-2 lg:items-center px-4 xl:px-20 lg:px-10  gap-y-2">
          <Link
            to="/signin"
            className="text-gray-400 lg:text-white bg-lime-950 lg:active:bg-lime-950 lg:rounded-full px-4 py-2 font-medium text-lg text-center rounded-t-lg"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-gray-400 lg:text-white bg-lime-950 px-4 py-2 lg:rounded-full font-medium text-lg text-center rounded-b-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
