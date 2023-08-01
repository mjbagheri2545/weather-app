import StateCard from "./stateCard/StateCard";
import detectMode from "../../utils/detectMode";
import { useDaysDataState } from "../../hooks/useDaysData";
import stateCards from "../../data/stateCards.js";
import useActiveDayIndex from "../../hooks/useActiveDayIndex";
import Skeleton from "react-loading-skeleton";
import { useLocationState } from "../../hooks/useLocation";
import "./style.css";

function States() {
  const { daysData, isFetchingDaysData, hour } = useDaysDataState();
  const { isFetchingLocation } = useLocationState();
  const activeDayIndex = useActiveDayIndex();

  return (
    <div className="states-card">
      {daysData.length > 0 && !isFetchingDaysData && !isFetchingLocation ? (
        stateCards.map((state) => {
          const { title, icon, unit, unitClassNames, name, id } = state;
          const stateValue = daysData[activeDayIndex][name][hour];
          return (
            <StateCard
              key={id}
              title={title}
              icon={icon}
              mode={detectMode(name, stateValue)}
            >
              {stateValue}
              <span className={`state-value-unit ${unitClassNames}`}>
                {unit}
              </span>
            </StateCard>
          );
        })
      ) : (
        <Skeleton containerClassName="skeleton-container" count={6} />
      )}
    </div>
  );
}

export default States;
