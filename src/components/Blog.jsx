import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/blog.css";
import blogData from "../data/blogData.js";

const Blog = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const blogDetails = isHome ? blogData.slice(0, 4) : blogData;

  return (
    <section
      id="blog"
      className="xl:mx-20 mx-4 lg:mx-10 mb-20"
      data-aos="fade-down"
    >
      <div className="flex flex-col  lg:flex-row justify-between  gap-y-4 gap-x-6 items-center mb-12">
        <h1
          className="font-bold text-6xl text-lime-950 lg:max-w-4xl w-fit text-center lg:text-left"
          style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
        >
          Learn Quran & Basics Knowledge of Islam
        </h1>
        <Link to="/blogs" className="min-w-max">
          {isHome ? (
            <button
              className="bg-yellow-500 px-5 py-3 rounded-full text-lime-950 font-bold font-sans"
              style={{ fontSize: "clamp(14px, 16px)" }}
            >
              Read All Blog
            </button>
          ) : (
            ""
          )}
        </Link>
      </div>
      <div className="grid gap-8 blog-container">
        {blogDetails.map((blogs) => (
          <div
            to="/blog"
            className="rounded-xl border-[1px] border-solid border-lime-950 p-6 flex flex-col lg:flex-row gap-4 lg:items-center md:max-h-fit"
            key={blogs.blogID}
          >
            <div className="md:h-96 overflow-hidden flex justify-center items-center rounded-xl lg:flex-[0.45]">
              <img
                src={blogs.blogImg}
                alt="There was an error loading image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:flex-[0.55]">
              <h2
                className="text-lime-950 text-3xl font-bold"
                style={{ fontSize: "clamp(24px, 30px)" }}
              >
                {blogs.blogTitle}
              </h2>
              <p
                className="text-lime-950 text-base font-medium my-6"
                style={{ fontSize: "clamp(12px, 16px)" }}
              >
                {blogs.detail}
              </p>
              <div>
                <Link
                  to={`/blogs/${blogs.blogID}`}
                  className="text-lime-950 font-bold mt-2"
                >
                  Read Now
                  <span
                    className="text-xl"
                    style={{ fontSize: "clamp(14px, 14px)" }}
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
