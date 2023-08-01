import { get } from "../services/http";
const apiKey = import.meta.env.VITE_OPEN_CAGE_DATA_API_KEY;
const apiEndPoint = import.meta.env.VITE_OPEN_CAGE_DATA_END_POINT;

function getLocationData({ lat, long }) {
  return get(`${apiEndPoint}?q=${lat}+${long}&key=${apiKey}`).then((data) => {
    const locationData = data.results[0].components;
    const city =
      locationData.city !== undefined
        ? locationData.city
        : locationData.town !== undefined
        ? locationData.town
        : locationData.state;
    const country = locationData.country;
    return { city, country };
  });
}

export default getLocationData;
