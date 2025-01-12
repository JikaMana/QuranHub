import React from "react";

const AudioListener = () => {
  return (
    <section>
      <div className="mx-10">
        <h2
          className=" text-lime-950 text-5xl font-bold "
          style={{ fontSize: "clamp(24px, 4vw, 50px)" }}
        >
          AUDIO LISTENER | COMING SOON
        </h2>
        <p
          className="text-lime-950 text-2xl font-medium my-6"
          style={{ fontSize: "clamp(12px, 3vw, 24px)" }}
        >
          Come back later
        </p>
      </div>
    </section>
  );
};
export default AudioListener;

// const AudioLoader = async ({ params }) => {
//   const data = AudioDetails[Number(params.AudioID) - 1];
//   return data;
// };
// export { AudioListener as default, AudioLoader };
