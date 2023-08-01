import { useEffect, useState } from "react"
import { useLocationState } from "../../../hooks/useLocation";

function Clock() {
    const { timezone } = useLocationState();
    const [time, setTime] = useState(changeTime())
    function changeTime() {
        const timeZone = timezone
          ? timezone
          : Intl.DateTimeFormat().resolvedOptions().timeZone;
        return new Date().toLocaleTimeString("en-US", { timeZone });
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(changeTime());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [timezone]);

  return (
    <span className="clock position-center text-center">{time}</span>
  )
}

export default Clock