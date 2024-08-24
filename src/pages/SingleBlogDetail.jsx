import React from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import blogDetails from "../data/blogData.js";

const SingleBlogDetail = () => {
  const blog = useLoaderData();
  const { blogID } = useParams();

  // Using Fisher-Yates Shuffle Algorithm to shuffle arrays
  function shuffleArray(array) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const blogData = shuffleArray(
    blogDetails.filter((blog) => blog.blogID !== Number(blogID))
  );

  return (
    <section className="xl:mx-20 mx-4 lg:mx-10 mb-20" data-aos="zoom-out">
      <div className="my-8 ">
        <Link
          to="/blogs"
          className="bg-yellow-500 px-6 py-3 rounded-full text-lime-950 font-bold"
          style={{ fontSize: "clamp(14px, 16px)" }}
        >
          Back to Blogs
        </Link>
      </div>
      <div className="mb-12">
        <h1
          className="font-bold text-4xl text-lime-950 text-center lg:text-left mb-4"
          style={{ fontSize: "clamp(32px, 5vw, 36px)" }}
        >
          {blog.blogTitle}
        </h1>
        <p className="text-gray-600 text-center lg:text-left italic">
          Published on: {blog.datePublished}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="md:h-96 overflow-hidden rounded-xl lg:w-1/2 shadow-lg">
          <img
            src={blog.blogImg}
            alt="Blog Image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-1/2">
          <p
            className="text-lime-950 text-2xl font-medium mb-6 leading-snug"
            style={{ fontSize: "clamp(18px, 4vw, 24px)" }}
          >
            {blog.detail}
          </p>
          <p
            className="text-lime-950 mb-4"
            style={{ fontSize: "clamp(14px, 3vw, 20px)" }}
          >
            {blog.detail}
          </p>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-lime-950 mb-6">Related Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {blogData.slice(0, 3).map((relatedBlog) => (
            <Link
              to={`/blogs/${relatedBlog.blogID}`}
              key={relatedBlog.blogID}
              className="block p-4 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-52 mb-4 overflow-hidden rounded-lg">
                <img
                  src={relatedBlog.blogImg}
                  alt={relatedBlog.blogTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-2xl">&rarr;</p>
                <h3 className="text-xl font-semibold text-lime-950">
                  {relatedBlog.blogTitle}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const blogLoader = async ({ params }) => {
  const data = blogDetails[Number(params.blogID) - 1];
  return data;
};

export { SingleBlogDetail as default, blogLoader };
