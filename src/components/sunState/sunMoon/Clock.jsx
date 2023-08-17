import { useEffect, useState } from "react";
import { useLocationState } from "../../../hooks/useLocation";

function Clock() {
  const { timezone } = useLocationState();
  const [time, setTime] = useState(changeTime());
  function changeTime() {
    return new Date().toLocaleTimeString("en-US", { timeZone: timezone });
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(changeTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timezone, changeTime]);

  return <span className="clock position-center text-center">{time}</span>;
}

export default Clock;
