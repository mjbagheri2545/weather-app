import { useEffect, useState } from "react";
import { useLocationState } from "../../hooks/useLocation";
import { useDaysDataState } from "../../hooks/useDaysData";
import AzanModal from "./azanModal";
import getLocationData from "../../utils/getLocationData";
import getPrayerTimes from "../../utils/getPrayertTimes";
import { toast } from "react-toastify";
import getSpecificTimezoneTime from "../../utils/getSpecificTimezoneTime";

function Azan() {
  const { userLocation, timezone } = useLocationState();
  const { isNewDay } = useDaysDataState();
  const [prayerTimes, setPrayerTimes] = useState({});
  const [userLocationData, setUserLocationData] = useState(null);
  const [isCheckingPrayerTimeAllowed, setIsCheckingPrayerTimeAllowed] =
    useState(checkPreviousTimeFromLocalStorage());
  const [activeAzan, setActiveAzan] = useState("");

  useEffect(() => {
    if (userLocation) {
      getLocationData(userLocation).then((data) => setUserLocationData(data));
    }
  }, [userLocation, getLocationData]);

  useEffect(() => {
    if (userLocationData) {
      getPrayerTimes(userLocationData)
        .then((data) => setPrayerTimes(data))
        .catch(() => toast.error("prayer times informcation isn't avaiable"));
    }
  }, [userLocationData, isNewDay, getPrayerTimes]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isCheckingPrayerTimeAllowed) {
        const prayerTime = checkIsCurrentTimeIsPrayerTime();
        if (prayerTime) {
          setActiveAzan(prayerTime);
          setIsCheckingPrayerTimeAllowed(false);
          localStorage.setItem("previousTime", new Date());
        }
      }
    }, parseInt(import.meta.env.VITE_INTERVAL_MILISECONDS));
    return () => {
      clearInterval(timer);
    };
  }, [prayerTimes, isCheckingPrayerTimeAllowed]);

  useEffect(() => {
    const timer = setInterval(() => {
      const isCheckingAllowed = checkPreviousTimeFromLocalStorage();
      isCheckingAllowed ? setIsCheckingPrayerTimeAllowed(true) : null;
    }, parseInt(import.meta.env.VITE_INTERVAL_MILISECONDS));
    return () => {
      clearInterval(timer);
    };
  }, [checkPreviousTimeFromLocalStorage]);

  function checkIsCurrentTimeIsPrayerTime() {
    const prayerTimesKey = Object.keys(prayerTimes);
    const time = getTime();
    let prayerTime;
    prayerTimesKey.forEach((key) => {
      if (prayerTimes[key] === time && key !== "midnight") prayerTime = key;
    });
    return prayerTime;
  }

  function getTime() {
    const timeZone = timezone
      ? timezone
      : Intl.DateTimeFormat().resolvedOptions().timeZone;
    const time = getSpecificTimezoneTime({
      timezone: timeZone,
      minute: true,
      string: true,
    });
    return time;
  }

  function checkPreviousTimeFromLocalStorage() {
    const previousTime = Date.parse(localStorage.getItem("previousTime"));
    const previousDate = new Date(previousTime);
    if (!previousTime) return true;
    previousDate.setMinutes(previousDate.getMinutes() + 8);
    const currentDate = new Date();
    return previousDate.getTime() <= currentDate.getTime();
  }

  return (
    <>
      {activeAzan && !isCheckingPrayerTimeAllowed ? (
        <AzanModal setActiveAzan={setActiveAzan} activeAzan={activeAzan} />
      ) : null}
    </>
  );
}

export default Azan;
