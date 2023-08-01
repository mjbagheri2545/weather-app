import { useEffect, useReducer } from "react";
import {
  LocationState,
  LocationDispatch,
} from "../../../contexts/LocationContext";
import {
  locationAccessAllowed,
  countries,
  initialState,
  isFetchingLocation,
  locationReducer,
} from "../../../utils/locationReducer";
import { getUserLocation } from "../../../utils/getUserLocation";
import { useMainState } from "../../../hooks/useMain";
import getCountriesData from "../../../utils/getCountriesData";

function LocationProvider({ children }) {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  const { defaultLocation } = useMainState();

  useEffect(() => {
    if (!defaultLocation) {
      dispatch(isFetchingLocation());
      getUserLocation(dispatch);
    } else {
      dispatch(locationAccessAllowed(defaultLocation));
    }
  }, [defaultLocation]);

  useEffect(() => {
    getCountriesData().then((citiesData) => {
      dispatch(countries(citiesData));
    });
  }, []);

  return (
    <LocationState.Provider value={state}>
      <LocationDispatch.Provider value={dispatch}>
        {children}
      </LocationDispatch.Provider>
    </LocationState.Provider>
  );
}

export default LocationProvider;
