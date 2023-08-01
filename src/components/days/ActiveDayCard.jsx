function ActiveDayCard({ temperature, date, climateCondition }) {
  return (
    <div className="active-day-card">
      <span className="temperature">
        {temperature}
        <sup>0C</sup>
      </span>
      <span className="day text-capitalize">{date}</span>
      <span className="climate-condition fs-2 text-capitalize">
        {climateCondition}
      </span>
    </div>
  );
}

export default ActiveDayCard;
