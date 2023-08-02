import { useEffect, useReducer } from "react";
import {
  LocationState,
  LocationDispatch,
} from "../../../contexts/LocationContext";
import {
  locationAccessAllowed,
  initialState,
  isFetchingLocation,
  locationReducer,
} from "../../../utils/locationReducer";
import { getUserLocation } from "../../../utils/getUserLocation";
import { useMainState } from "../../../hooks/useMain";

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
  }, [
    defaultLocation,
    isFetchingLocation,
    getUserLocation,
    locationAccessAllowed,
  ]);

  return (
    <LocationState.Provider value={state}>
      <LocationDispatch.Provider value={dispatch}>
        {children}
      </LocationDispatch.Provider>
    </LocationState.Provider>
  );
}

export default LocationProvider;
