import { useEffect, useState } from "react";
import {
  useLocationDispatch,
  useLocationState,
} from "../../../hooks/useLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../../components/tootltip";
import PrimaryButton from "../../../components/primaryButton";
import { locationSelected } from "../../../utils/locationReducer";
import { getUserLocation } from "../../../utils/getUserLocation";
import { toast } from "react-toastify";

function UserLocation() {
  const [isUserLocationSelected, setIsUserLocationSelected] = useState(false);
  const { userLocation, selectedLocation, isFetchingLocation } =
    useLocationState();
  const dispatch = useLocationDispatch();

  useEffect(() => {
    userLocation === selectedLocation
      ? setIsUserLocationSelected(true)
      : setIsUserLocationSelected(false);
  }, [userLocation, selectedLocation]);

  function handleOnClick() {
    if (!isUserLocationSelected && userLocation) {
      dispatch(locationSelected(userLocation));
      return;
    } else if (!userLocation) {
      dispatch(isFetchingLocation());
      getUserLocation(dispatch);
      return;
    } 
    toast.info("This location is the user's location");
  }
  return (
    <div className="user-location-container">
      <PrimaryButton
        onClick={handleOnClick}
        className="user-location-button tooltip-container"
        loading={isFetchingLocation}
      >
        <FontAwesomeIcon className="fs-1" icon={faLocationDot} />
        <Tooltip text="replace location to user location" position="bottom" />
        user location
      </PrimaryButton>
    </div>
  );
}

export default UserLocation;
