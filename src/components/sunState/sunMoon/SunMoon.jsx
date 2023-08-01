import { useEffect, useRef, useState } from "react";
import { useDaysDataState } from "../../../hooks/useDaysData";
import Clock from "./Clock";
import { useLocationState } from "../../../hooks/useLocation";
import useActiveDayIndex from "../../../hooks/useActiveDayIndex";

function SunMoon({ isNight }) {
  const { daysData, isNewDay, hour } = useDaysDataState();
  const activeDayIndex = useActiveDayIndex();
  const { timezone } = useLocationState();
  const { isDay } = daysData.length > 0 ? daysData[activeDayIndex] : {};
  const [dayHoursPercent, setDayHoursPercent] = useState(16);
  const [nightHoursBeforMidnightPercent, setNightHoursBeforMidnightPercent] =
    useState(8);
  const dayLightRef = useRef();
  const sunMoonRef = useRef();

  useEffect(() => {
    isDay ? setDayHoursPercent(dayHoursPercentCalculator()) : null;
  }, [isNewDay, timezone]);

  useEffect(() => {
    isDay
      ? setNightHoursBeforMidnightPercent(
          nightHoursBeforMidnightPercentCalculator()
        )
      : null;
  }, [dayHoursPercent]);

  useEffect(() => {
    dayLightRef.current.style.setProperty(
      "--day-hours-percent",
      `${dayHoursPercent}%`
    );
  }, [dayHoursPercent]);

  useEffect(() => {
    dayLightRef.current.style.setProperty(
      "--night-hours-before-midnight-percent",
      `${nightHoursBeforMidnightPercent}%`
    );
  }, [nightHoursBeforMidnightPercent]);

  useEffect(() => {
    sunMoonRef.current.style.setProperty(
      "--sun-mon-rotation-deg",
      `${(hour / 24) * 360}deg`
    );
  }, [hour]);

  function dayHoursPercentCalculator() {
    let dayHours = 0;
    isDay.forEach((hour) => (dayHours += hour > 0 ? 1 : 0));
    return (dayHours / 24) * 100;
  }

  function nightHoursBeforMidnightPercentCalculator() {
    let nightHoursBeforMidnight = 0;
    isDay.forEach((hour, index) => {
      nightHoursBeforMidnight += hour === 0 && index > 12 ? 1 : 0;
    });
    return (nightHoursBeforMidnight / 24) * 100;
  }
  return (
    <div className="sun-moon-container">
      <div ref={dayLightRef} className="day-light position-center">
        <div className="bg-transparent"></div>
      </div>
      <div ref={sunMoonRef} className="sun-moon position-center flex-center">
        <div className="img-container flex-center">
          <img
            className={`sun-moon-img transition ${isNight ? "" : "active"}`}
            src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/sun.png`}
            alt=""
          />
          <img
            className={`sun-moon-img transition ${isNight ? "active" : ""}`}
            src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/moon.png`}
            alt=""
          />
        </div>
      </div>
      <Clock />
    </div>
  );
}

export default SunMoon;
