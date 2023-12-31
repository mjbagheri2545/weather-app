import useActiveDayIndex from "../../hooks/useActiveDayIndex";
import { useDaysDataState } from "../../hooks/useDaysData";
import { useLayoutEffect, useState } from "react";
import "./style.css";

function DynamicBg() {
  const { daysData, hour } = useDaysDataState();
  const activeDayIndex = useActiveDayIndex();
  const [bg, setBg] = useState(null);

  useLayoutEffect(() => {
    if (daysData.length > 0) {
      const newBg = daysData[activeDayIndex].bg[hour];
      if (newBg === "sunny" && !daysData[activeDayIndex].isDay[hour]) {
        return setBg("night");
      }
      setBg(newBg);
    }
  }, [daysData, hour, activeDayIndex]);

  return (
    <div className="bg-container">
      <img
        className={`bg transition ${bg === "sunny" ? "active" : ""}`}
        src={`${import.meta.env.VITE_APP_PUBLIC_URL}/images/sunny-bg.png`}
        alt="sunny"
      />
      <img
        className={`bg transition ${bg === "night" ? "active" : ""}`}
        src={`${import.meta.env.VITE_APP_PUBLIC_URL}/images/night-bg.png`}
        alt="sunny"
      />
      <img
        className={`bg transition ${bg === "cloudy" ? "active" : ""}`}
        src={`${import.meta.env.VITE_APP_PUBLIC_URL}/images/cloudy-bg.png`}
        alt="cloudy"
      />
      <img
        className={`bg transition ${bg === "rainy" ? "active" : ""}`}
        src={`${import.meta.env.VITE_APP_PUBLIC_URL}/images/rainy-bg.png`}
        alt="rainy"
      />
      <img
        className={`bg transition ${bg === "snowy" ? "active" : ""}`}
        src={`${import.meta.env.VITE_APP_PUBLIC_URL}/images/snowy-bg.png`}
        alt="snowy"
      />
      <img
        className={`bg transition ${bg === "thunderstorm" ? "active" : ""}`}
        src={`${
          import.meta.env.VITE_APP_PUBLIC_URL
        }/images/thunderstorm-bg.png`}
        alt="thunderstorm"
      />
    </div>
  );
}

export default DynamicBg;
