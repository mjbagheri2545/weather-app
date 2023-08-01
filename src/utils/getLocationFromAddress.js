import { get } from "../services/http";

const apiKey = import.meta.env.VITE_OPEN_CAGE_DATA_API_KEY;
const apiEndPoint = import.meta.env.VITE_OPEN_CAGE_DATA_END_POINT;

function getLocationFromAddress(address) {
  return get(`${apiEndPoint}?q=${address}&key=${apiKey}`);
}

export default getLocationFromAddress;
