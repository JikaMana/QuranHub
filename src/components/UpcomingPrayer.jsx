import React, { useState, useEffect } from "react";

const UpcomingPrayer = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const filteredPrayers = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  const getPrayerTimes = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching prayer times: ", error);
    }
  };

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const times = await getPrayerTimes(latitude, longitude);
      setPrayerTimes(times);
    });
  }, []);

  // Function to get the current time and find the next prayer
  const calculateNextPrayer = () => {
    if (!prayerTimes) return;

    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;
    const prayerTimings = prayerTimes.timings;

    // Find the next prayer by comparing times
    const upcomingPrayer = Object.entries(prayerTimings)
      .filter(([prayer]) => filteredPrayers.includes(prayer))
      .find(([prayer, time]) => time > currentTime);

    if (upcomingPrayer) {
      setNextPrayer(upcomingPrayer[0]);
      const prayerTime = upcomingPrayer[1];
      const [prayerHour, prayerMinute] = prayerTime.split(":");

      const nextPrayerDate = new Date();
      nextPrayerDate.setHours(prayerHour, prayerMinute, 0, 0);

      const timeUntilNextPrayer = nextPrayerDate - now;
      updateCountdown(timeUntilNextPrayer);
    } else {
      setNextPrayer("Fajr");
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(...prayerTimings["Fajr"].split(":"), 0, 0);

      const timeUntilFajr = tomorrow - now;
      updateCountdown(timeUntilFajr);
    }
  };

  const updateCountdown = (milliseconds) => {
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    setTimeLeft(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateNextPrayer();
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <section className="xl:mx-20 mx-10 mb-10">
      {!prayerTimes ? (
        <p className="text-3xl text-lime-950 font-bold">
          Loading prayer times...
        </p>
      ) : (
        <>
          <div className="mt-20">
            <div className="mb-10 sm:mb-20 flex flex-wrap justify-between gap-4">
              <div>
                <div className="py-1 px-3 border-2 border-gray-700 rounded-md w-fit mb-4">
                  <p className="text-md font-medium text-lime-950">Today</p>
                </div>
                <p className="text-xl text-lime-950">
                  Next prayer is <span className="font-bold">{nextPrayer}</span>{" "}
                  in <span className="font-bold">{timeLeft}</span>
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 text-lime-950">
                  {prayerTimes.meta.timezone}
                </h2>
                <ul>
                  <li className="text-md text-lime-950">
                    Islamic Date: {prayerTimes.date.hijri.date}
                  </li>
                  <li className="text-md text-lime-950">
                    Gregorian Date: {prayerTimes.date.gregorian.date}
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="grid justify-between gap-x-4 gap-y-8"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {Object.entries(prayerTimes.timings)
                .filter(([prayer]) => filteredPrayers.includes(prayer))
                .map(([prayer, time]) => (
                  <div
                    key={prayer}
                    className="flex justify-between border-2 p-5 rounded-xl w-full border-lime-950 text-lime-950"
                  >
                    <p className="text-lg font-semibold">{prayer}</p>
                    <h2 className="text-xl font-medium">{time}</h2>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default UpcomingPrayer;
