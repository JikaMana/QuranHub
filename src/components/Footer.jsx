import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="mt-20 xl:mx-20 mx-10">
      <div className="flex flex-col md:flex-row gap-8 justify-between mb-10">
        <div>
          <Link to="/" className="my-3">
            <div className="main-logo flex items-center gap-x-1 ">
              <i className="fa-solid fa-book-open text-lime-950"></i>
              <h1 className="text-lime-950 text-xl font-bold">QuranHub</h1>
            </div>
          </Link>
          <p className=" text-lime-950 text-md font-medium max-w-xs my-4">
            Where you can embark on a transformative journey the sacred text of
            Islam
          </p>
          <div className="flex gap-2 my-8">
            <div className="border-solid border-2 border-lime-950 w-fit p-1 rounded-md flex gap-2 items-center">
              <i className="fa-brands fa-google-play text-2xl"></i>
              <div>
                <p className="text-[10px] font-medium">GET IT ON</p>
                <h3 className="text-md leading-3 font-semibold">Google Play</h3>
              </div>
            </div>
            <div className="border-solid border-2 border-lime-950 w-fit p-1 rounded-md flex gap-2 items-center">
              <i className="fa-brands fa-app-store text-2xl"></i>
              <div>
                <p className="text-[10px] font-medium">Download it on</p>
                <h3 className="text-md leading-3 font-semibold">App Store</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 sm:justify-between flex-[0.8]">
          <div className="flex flex-col gap-y-4 ">
            <h3 className="font-semibold text-lg">Navigate</h3>
            <div className="flex flex-col gap-y-4 font-medium text-sm">
              <Link to="/">
                <p>Home</p>
              </Link>
              <Link to="/about">
                <p>About Us</p>
              </Link>
              <Link to="/reciters">
                <p>Reciters</p>
              </Link>
              <Link to="/blog">
                <p>Blog</p>
              </Link>
              <Link to="/contact">
                <p>Contact</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h3 className="font-semibold text-lg">Popular Link</h3>
            <div className="flex flex-col gap-y-4 font-medium text-sm">
              <Link to="#">
                <p>Ayatul-Kursi</p>
              </Link>
              <Link to="#">
                <p>Yaseen</p>
              </Link>
              <Link to="#">
                <p>Al-Rahman</p>
              </Link>
              <Link to="#">
                <p>Al-Mulk</p>
              </Link>
              <Link to="#">
                <p>Al-Alaq</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <div className="flex flex-col gap-y-4 font-medium text-sm">
              <Link to="#">
                <p>FAQ</p>
              </Link>
              <Link to="#">
                <p>Press</p>
              </Link>
              <Link to="#">
                <p>Cookie Preferences</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-[1px] border-lime-950 my-2" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 font-medium text-sm">
        <p>
          Copyright &copy; 2024{" "}
          <span>
            <Link to="https://github.com/jika026">Yahaya Abdullahi Mana</Link>{" "}
          </span>
        </p>
        <div className="flex justify-between gap-2 ">
          <Link to="#">
            <p>Terms</p>
          </Link>
          <Link to="#">
            <p>Legal</p>
          </Link>
          <Link to="#">
            <p>Privacy</p>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="text-lime-950 text-xl font-bold">Contact Us &rarr;</h2>
          <div id="contactUs" className="flex gap-2 text-sm">
            <i
              className="fa-brands fa-facebook-f rounded-full border-2 border-lime-950 bg-transparent w-8 h-8 flex justify-center items-center text-lime-950"
              onClick={() => window.open("https://www.facebook.com/", "_blank")}
            ></i>

            <i
              className="fa-brands fa-linkedin-in rounded-full border-2 border-lime-950 w-8 h-8 flex justify-center items-center text-lime-950"
              onClick={() => window.open("https://www.linkedin.com/", "_blank")}
            ></i>
            <i
              className="fa-brands fa-whatsapp rounded-full border-2 border-lime-950 w-8 h-8 flex justify-center items-center text-lime-950"
              onClick={() =>
                window.open(
                  "https://wa.me/+2349019967427?text=Hello+my+name+is+%2C%2C+I%27m+I+have+some+feedback+about+Qura%2an+Hub",
                  "_blank"
                )
              }
            ></i>
            <i
              className="fa-brands fa-instagram rounded-full border-2 border-lime-950 w-8 h-8 flex justify-center items-center text-lime-950"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/mana_abdullahi",
                  "_blank"
                )
              }
            ></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
