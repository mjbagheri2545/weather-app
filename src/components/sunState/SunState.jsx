import { useEffect, useState } from "react";
import SunMoon from "./sunMoon";
import { useDaysDataState } from "../../hooks/useDaysData";
import useActiveDayIndex from "../../hooks/useActiveDayIndex";
import Skeleton from "react-loading-skeleton";
import { useLocationState } from "../../hooks/useLocation";
import "./style.css";

function SunState() {
  const { daysData, isFetchingDaysData, hour } = useDaysDataState();
  const { isFetchingLocation } = useLocationState();
  const activeDayIndex = useActiveDayIndex();
  const { isDay } = daysData.length > 0 ? daysData[activeDayIndex] : {};
  const [isNight, setIsNight] = useState(false);
  const { sunrise: activeDaySunrise, sunset: activeDaySunset } =
    daysData.length > 0 ? daysData[activeDayIndex] : {};
  const {
    sunrise: dayAfterActiveDaySunrise,
    sunset: dayAfterActiveDaySunset,
    date,
  } = daysData.length > 0 && activeDayIndex < daysData.length - 1
    ? daysData[activeDayIndex + 1]
    : {};

  useEffect(() => {
    isDay ? setIsNight(!isDay[hour]) : null;
  }, [hour, daysData]);

  return (
    <div
      className={`sun-state-card rounded-outer ${isNight ? "night" : "day"}`}
    >
      {daysData.length > 0 && !isFetchingDaysData && !isFetchingLocation ? (
        <>
          <div className="active-day-sun-state">
            <div className="header-img-container justify-center">
              <img
                className={`header-img transition ${isNight ? "" : "active"}`}
                src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/suny.png`}
                alt="sun"
              />
              <img
                className={`header-img transition ${isNight ? "active" : ""}`}
                src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/moon.png`}
                alt="moon"
              />
            </div>
            <SunMoon isNight={isNight} />
            <div className="sunrise-sunset-container">
              <div className="sunrise text-center">
                <span className="title">sunrise</span>
                <span className="time fs-2">{activeDaySunrise}</span>
              </div>
              <div className="sunset text-center">
                <span className="title">sunset</span>
                <span className="time fs-2">{activeDaySunset}</span>
              </div>
            </div>
          </div>
          <div className="day-after-active-day-sun-state rounded-inner">
            {date ? (
              <>
                <div className="sunrise text-center">
                  <span className="title">sunrise</span>
                  <span className="time">{dayAfterActiveDaySunrise}</span>
                </div>
                <div className="date text-center">{date}</div>
                <div className="sunset text-center">
                  <span className="title">sunset</span>
                  <span className="time">{dayAfterActiveDaySunset}</span>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <Skeleton
            containerClassName="skeleton-container"
            className="circular-skeleton"
            count={2}
            circle
          />
          <Skeleton
            containerClassName="skeleton-container"
            className="linear-skeleton"
            count={2}
          />
        </>
      )}
    </div>
  );
}

export default SunState;
