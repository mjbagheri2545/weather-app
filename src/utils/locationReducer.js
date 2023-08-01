export const actionTypes = {
  LOCATION_SEARCHED: "locationSearched",
  LOCATION_ACCESS_ALLOWED: "locationAccessAllowed",
  LOCATION_SELECTED: "locationSelected",
  COUNTRIES: "countries",
  CHANGE_TIMEZONE: "changeTimezone",
  IS_FETCHING_LOCATION: "isFetchingLocation",
  IS_PERMISSION_DENIED: "isPermissionDenied",
};

export const initialState = {
  selectedLocation: null,
  userLocation: null,
  isPermissionDenied: false,
  isFetchingLocation: false,
  countriesData: [],
  timezone: "",
};

export function locationReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.LOCATION_ACCESS_ALLOWED:
      const { userLocation } = payload;
      return {
        ...state,
        isPermissionDenied: false,
        userLocation,
        selectedLocation: userLocation,
        isFetchingLocation: false,
      };
    case actionTypes.IS_PERMISSION_DENIED:
      const { isPermissionDenied } = payload;
      return {
        ...state,
        isPermissionDenied,
      };
    case actionTypes.LOCATION_SEARCHED:
      const { searchedLocation } = payload;
      return {
        ...state,
        selectedLocation: searchedLocation,
        isFetchingLocation: false,
      };
    case actionTypes.LOCATION_SELECTED:
      const { selectedLocation } = payload;
      return {
        ...state,
        selectedLocation,
        isFetchingLocation: false,
      };
    case actionTypes.COUNTRIES:
      const { countriesData } = payload;
      return {
        ...state,
        countriesData,
      };
    case actionTypes.CHANGE_TIMEZONE:
      const { timezone } = payload;
      return {
        ...state,
        timezone,
      };
    case actionTypes.IS_FETCHING_LOCATION:
      return {
        ...state,
        isFetchingLocation: true,
      };
    default:
      throw new Error("an unknown error occurred");
  }
}

export function locationSearched(searchedLocation) {
  return {
    type: actionTypes.LOCATION_SEARCHED,
    payload: {
      searchedLocation,
    },
  };
}
export function locationAccessAllowed(userLocation) {
  return {
    type: actionTypes.LOCATION_ACCESS_ALLOWED,
    payload: {
      userLocation,
    },
  };
}

export function countries(countriesData) {
  return {
    type: actionTypes.COUNTRIES,
    payload: {
      countriesData,
    },
  };
}

export function locationSelected(selectedLocation) {
  return {
    type: actionTypes.LOCATION_SELECTED,
    payload: {
      selectedLocation,
    },
  };
}

export function changeTimezone(timezone) {
  return {
    type: actionTypes.CHANGE_TIMEZONE,
    payload: {
      timezone,
    },
  };
}

export function isPermissionDenied(isPermissionDenied) {
  return {
    type: actionTypes.IS_PERMISSION_DENIED,
    payload: {
      isPermissionDenied,
    },
  };
}

export function isFetchingLocation() {
  return {
    type: actionTypes.IS_FETCHING_LOCATION,
  };
}
