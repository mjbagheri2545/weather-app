import getSpecificTimezoneTime from "./getSpecificTimezoneTime";

export const actionTypes = {
  IS_FETCHING_DAYS_DATA: "isFetchingDaysData",
  DAYS_DATA_FETCHED: "daysDataFetched",
  CHANGE_FORECAST_DAYS: "changeForecastDays",
  CHANGE_IS_NEW_DAY: "chnageIsNewDay",
  CHANGE_HOUR: "changeHour",
};

export const initialState = {
  daysData: [],
  forecastDays: 4,
  isFetchingDaysData: false,
  isNewDay: true,
  hour: new Date().getHours(),
};

export function daysDataReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.IS_FETCHING_DAYS_DATA:
      return {
        ...state,
        isFetchingDaysData: true,
      };
    case actionTypes.DAYS_DATA_FETCHED:
      const { daysData } = payload;
      return {
        ...state,
        daysData,
        isFetchingDaysData: false,
      };
    case actionTypes.CHANGE_IS_NEW_DAY:
      const { isNewDay } = payload;
      return {
        ...state,
        isNewDay,
      };
    case actionTypes.CHANGE_FORECAST_DAYS:
      const { forecastDays } = payload;
      return {
        ...state,
        forecastDays,
      };
    case actionTypes.CHANGE_HOUR:
      const { hour } = payload;
      return {
        ...state,
        hour,
      };
    default:
      break;
  }
}

export function isFetchingDaysData() {
  return {
    type: actionTypes.IS_FETCHING_DAYS_DATA,
  };
}

export function daysDataFetched(daysData) {
  return {
    type: actionTypes.DAYS_DATA_FETCHED,
    payload: {
      daysData,
    },
  };
}

export function chnageIsNewDay(isNewDay) {
  return {
    type: actionTypes.CHANGE_IS_NEW_DAY,
    payload: {
      isNewDay,
    },
  };
}

export function changeForecastDays(forecastDays) {
  return {
    type: actionTypes.CHANGE_FORECAST_DAYS,
    payload: {
      forecastDays,
    },
  };
}
export function changeHour(hour) {
  return {
    type: actionTypes.CHANGE_HOUR,
    payload: {
      hour,
    },
  };
}
