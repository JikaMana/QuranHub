import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sudaisImg from "../assets/reciters/sudais.jpg";
import alafasyImg from "../assets/reciters/alafasy.jpg";
import menkImg from "../assets/reciters/menk.jpg";
import shuraimImg from "../assets/reciters/shuraim.jpg";
import mahirImg from "../assets/reciters/mahir.jpg";
import husssaryImg from "../assets/reciters/hussary.jpg";
import abbaImg from "../assets/reciters/abba.jpg";
import minshawiImg from "../assets/reciters/minshawi.jpg";
import shatriImg from "../assets/reciters/shatri.jpg";
import "../styles/reciters.css";

const Reciters = () => {
  const allQari = [
    {
      name: "Abdulrahman Al-Sudais",
      position: "Imam of Masjid al-Haram",
      photo: sudaisImg,
    },
    {
      name: "Mishary Rashid Alafasy",
      position: "Kuwaiti Qari & Imam",
      photo: alafasyImg,
    },
    {
      name: "Saud Al-Shuraim",
      position: "Saudi Arabian qari",
      photo: shuraimImg,
    },
    {
      name: "Mahmoud Khalil Al-Hussary",
      position: "Egyptian qari",
      photo: husssaryImg,
    },

    {
      name: "Mohammed Siddiq Minshawi",
      position: "Egyptian qari",
      photo: minshawiImg,
    },
    {
      name: "Ismail ibn Musa Menk",
      position: "Zimbabwean Islamic scholar",
      photo: menkImg,
    },
    {
      name: "Abu Bakr Al Shatri",
      position: "Saudi Arabian qari",
      photo: shatriImg,
    },
    {
      name: "Mahir Al Muaiqly",
      position: "Imam of Masjid al-Haram",
      photo: mahirImg,
    },
    {
      name: "Abdullahi Abba Zaria",
      position: "Nigerian qari",
      photo: abbaImg,
    },
  ];
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          background: "green",
          padding: "1rem 0.9rem 0.8rem",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          background: "green",
          padding: "1rem 0.9rem 0.8rem",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <section id="reciters" className="xl:mx-20 mx-10 mb-28" data-aos="fade-up">
      <img src="../assets/reciters/sudais" alt="" />
      <div className="mx-auto flex flex-col items-center mb-12 px-8 gap-4">
        <h1
          className="max-w-2xl text-lime-950 text-6xl font-bold text-center"
          style={{ fontSize: "clamp(32px, 5vw,60px)" }}
        >
          Listen Qu'ran by your favourite Reciters
        </h1>
        <p
          className="text-lime-950 text-xl font-medium text-center"
          style={{ fontSize: "clamp(14px, 3vw, 20px)" }}
        >
          Listen to the holy quran by your favorite reciters and feel the best
          of the quran
        </p>
      </div>
      <div>
        <Slider {...settings}>
          {allQari.map((qari) => (
            <div className=" flex-col items-center mb-8" key={qari.name}>
              <div className="w-full aspect-w-1 aspect-h-1 flex justify-center items-center overflow-hidden rounded-lg">
                <img
                  src={qari.photo}
                  alt={qari.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center">
                <h3
                  className="font-semibold text-lime-950 text-lg text-center"
                  style={{ fontSize: "clamp(12px, 18px)" }}
                >
                  {qari.name}
                </h3>
                <p className="text-lime-950 text-sm text-center">
                  {qari.position}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reciters;
