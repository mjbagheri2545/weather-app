import { toast } from "react-toastify";
import {
  locationAccessAllowed,
  isPermissionDenied,
  isFetchingLocation,
} from "./locationReducer";

export function getUserLocation(dispatch) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => successCallback(coords, dispatch),
    (error) => {
      errorCallback(error, dispatch);
      dispatch(isFetchingLocation(false));
    }
  );
}

function errorCallback(error, dispatch) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast.error("user denied the request for Geolocation.");
      dispatch(isPermissionDenied(true));
      break;
    case error.POSITION_UNAVAILABLE:
      toast.error("location information is unavailable.");
      break;
    case error.TIMEOUT:
      toast.error("the request to get user location timed out.");
      break;
    default:
      toast.error("an unknown error occurred.");
      break;
  }
}

function successCallback(coords, dispatch) {
  const { latitude, longitude } = coords;
  dispatch(locationAccessAllowed({ lat: latitude, long: longitude }));
}
