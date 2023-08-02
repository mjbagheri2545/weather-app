import { useEffect, useReducer } from "react";
import {
  DaysDataDispatch,
  DaysDataState,
} from "../../../contexts/DaysDataContext";
import {
  daysDataReducer,
  initialState,
  chnageIsNewDay,
  daysDataFetched,
  isFetchingDaysData,
  changeForecastDays,
  changeHour,
} from "../../../utils/daysDataReducer";
import {
  useLocationDispatch,
  useLocationState,
} from "../../../hooks/useLocation";
import getWeather from "../../../utils/getWeather";
import { toast } from "react-toastify";
import { changeTimezone } from "../../../utils/locationReducer";
import { useLocation } from "react-router-dom";
import getSpecificTimezoneTime from "../../../utils/getSpecificTimezoneTime";

function DaysDataProvider({ children }) {
  const [state, dispatch] = useReducer(daysDataReducer, initialState);
  const { forecastDays, isNewDay, hour } = state;
  const { selectedLocation, timezone } = useLocationState();
  const locationDispatch = useLocationDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    pathname.includes("home")
      ? dispatch(changeForecastDays(4))
      : pathname.includes("calendar")
      ? dispatch(changeForecastDays(16))
      : null;
  }, [pathname, changeForecastDays]);

  useEffect(() => {
    if (selectedLocation && isNewDay) {
      dispatch(isFetchingDaysData());
      getWeather(selectedLocation, forecastDays)
        .then((data) => {
          const { days, timezone } = data;
          dispatch(daysDataFetched(days));
          locationDispatch(changeTimezone(timezone));
          dispatch(chnageIsNewDay(false));
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }, [
    selectedLocation,
    isNewDay,
    isFetchingDaysData,
    getWeather,
    daysDataFetched,
    chnageIsNewDay,
  ]);

  useEffect(() => {
    if (timezone) {
      const timer = setInterval(() => {
        const time = getSpecificTimezoneTime({
          timezone,
        });
        const newHour = time === 24 ? 0 : time;
        if (newHour === 0 && hour !== 0) {
          dispatch(changeHour(0));
          dispatch(chnageIsNewDay(true));
        } else if (newHour !== hour) {
          dispatch(changeHour(newHour));
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [timezone, hour, getSpecificTimezoneTime, changeHour, chnageIsNewDay]);

  useEffect(() => {
    if (timezone) {
      const time = getSpecificTimezoneTime({
        timezone,
      });
      const newHour = time === 24 ? 0 : time;
      dispatch(changeHour(newHour));
    }
  }, [timezone, getSpecificTimezoneTime]);

  useEffect(() => {
    dispatch(chnageIsNewDay(true));
  }, [selectedLocation, forecastDays, chnageIsNewDay]);

  return (
    <DaysDataState.Provider value={state}>
      <DaysDataDispatch.Provider value={dispatch}>
        {children}
      </DaysDataDispatch.Provider>
    </DaysDataState.Provider>
  );
}

export default DaysDataProvider;
