import { Link } from "react-router-dom";
import "./style.css";
function DayCard({ icon, temperature, weekday, date, index, path }) {
  return (
    <>
      <Link
        className={`day-card text-color-secondary transition rounded-inner align-center cursor-pointer`}
        to={`${path}${index}`}
      >
        <div className="icon-container">
          <img
            src={`${import.meta.env.VITE_APP_PUBLIC_URL}icons/${icon}.png`}
          />
        </div>
        <span className="temperature fs-6">
          {temperature}
          <sup>0C</sup>
        </span>
        <span className="weekday">{weekday}</span>
        <span className="date">{date}</span>
      </Link>
    </>
  );
}

export default DayCard;
