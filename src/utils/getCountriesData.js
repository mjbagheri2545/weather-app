import { get } from "../services/http";
const apiEndPoint = import.meta.env.VITE_COUNTRIES_DATA_END_POINT;

function getCountriesData() {
  return get(apiEndPoint).then((data) => {
    const resultData = data.data;
    let citiesData = [];
    resultData.forEach((item) => {
      const { country, cities } = item;
      citiesData.push({ country, cities });
    });
    return citiesData;
  });
}

export default getCountriesData;
