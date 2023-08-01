export const actionsTypes = {
  CHANGE_THEME: "changeTheme",
  CHANGE_IS_PRAYER_TIMES_ALLOWED: "changeIsPrayerTimesAllowed",
  SET_DEFAULT_LOCATION: "changeDefaultLocation",
};

export const initialState = {
  theme: detectTheme(),
  isPrayerTimesAllowed: true,
  defaultLocation: detectDefaultLocation(),
};

export function mainReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionsTypes.CHANGE_THEME:
      const { theme } = payload;
      return {
        ...state,
        theme,
      };
    case actionsTypes.CHANGE_IS_PRAYER_TIMES_ALLOWED:
      return {
        ...state,
        isPrayerTimesAllowed: !state.isPrayerTimesAllowed,
      };
    case actionsTypes.SET_DEFAULT_LOCATION:
      const { defaultLocation } = payload;
      return {
        ...state,
        defaultLocation,
      };
    default:
      throw new Error("an unknown error occurred");
  }
}

export function changeTheme(theme) {
  return {
    type: actionsTypes.CHANGE_THEME,
    payload: {
      theme,
    },
  };
}

export function changeIsPrayerTimesAllowed() {
  return { type: actionsTypes.CHANGE_IS_PRAYER_TIMES_ALLOWED };
}

export function setDefaultLocation(defaultLocation) {
  return {
    type: actionsTypes.SET_DEFAULT_LOCATION,
    payload: {
      defaultLocation,
    },
  };
}

function detectTheme() {
  const defaultTheme = localStorage.getItem("theme");
  if (defaultTheme) {
    return defaultTheme;
  }
  if (window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } else {
    return "light";
  } 
}

function detectDefaultLocation() {
  const defaultLocation = JSON.parse(localStorage.getItem("defaultLocation"));
  return defaultLocation || null;
}