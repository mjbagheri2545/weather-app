import { get } from "../services/http";

const apiEndPoint = import.meta.env.VITE_OPEN_METEO_END_POINT;

function getUserTimezone(userLocation) {
  const { lat, long } = userLocation;
  return get(
    `${apiEndPoint}/forecast?latitude=${lat}&longitude=${long}&forecast_days=1&timezone=auto`
  ).then((data) => {
    const { timezone } = data;
    return timezone;
  });
}

export default getUserTimezone;
