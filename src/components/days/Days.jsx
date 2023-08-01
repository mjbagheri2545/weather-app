import { useDaysDataState } from "../../hooks/useDaysData";
import ActiveDayCard from "./ActiveDayCard";
import DayCard from "./dayCard";
import useActiveDayIndex from "../../hooks/useActiveDayIndex";
import Skeleton from "react-loading-skeleton";
import { useLocationState } from "../../hooks/useLocation";
import "./style.css";

function Days({ children, dayCardPath }) {
  const { daysData, forecastDays, isFetchingDaysData, hour } =
    useDaysDataState();
  const { isFetchingLocation } = useLocationState();
  const activeDayIndex = useActiveDayIndex();
  
  return (
      <div className="days-card">
        {daysData.length > 0 && !isFetchingDaysData && !isFetchingLocation  ? (
          <>
            <ActiveDayCard
              key={daysData[activeDayIndex].id}
              temperature={daysData[activeDayIndex].temperature[hour]}
              date={daysData[activeDayIndex].date}
              climateCondition={daysData[activeDayIndex].climateCondition[hour]}
            />
            {daysData.map((day, index) => {
              return index !== activeDayIndex && index <= forecastDays ? (
                <DayCard
                  key={day.id}
                  date={day.date}
                  temperature={day.temperature[hour]}
                  icon={day.icon[hour]}
                  weekday={day.weekday}
                  index={index}
                  path={dayCardPath}
                />
              ) : null;
            })}
            {children}
          </>
        ) : (
          <Skeleton
            containerClassName="skeleton-container"
            count={children ? forecastDays + 1 : forecastDays}
          />
        )}
      </div>
  );
}

export default Days;
