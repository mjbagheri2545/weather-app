import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../../../components/tootltip";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { useLocationState } from "../../../hooks/useLocation";
import getLocationData from "../../../utils/getLocationData";

function Location() {
  const { selectedLocation } = useLocationState();
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { country, city } = selectedLocationData || {};
  useEffect(() => {
    if (selectedLocation) {
      setIsFetching(true);
      getLocationData(selectedLocation).then((data) => {
        setSelectedLocationData(data);
        setIsFetching(false);
      });
    }
  }, [selectedLocation]);

  return (
    <div className="location-container">
      {selectedLocationData && !isFetching ? (
        <span className="location text-color-primary align-center transition tooltip-container">
          <FontAwesomeIcon className="fs-2" icon={faLocationDot} />
          <Tooltip text="current location" position="bottom" />
          <span className="text-capitalize transition">
            {`${city}, ${country}`}
          </span>
        </span>
      ) : (
        <Skeleton
          containerClassName="skeleton-container"
          baseColor="var(--gray-1)"
          highlightColor="var(--gray-2)"
        />
      )}
    </div>
  );
}

export default Location;
