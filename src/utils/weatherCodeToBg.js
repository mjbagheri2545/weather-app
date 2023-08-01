const weatherCodes = {
  0: "sunny",
  1: "sunny",

  2: "cloudy",
  3: "cloudy",
  45: "cloudy",
  48: "cloudy",

  51: "rainy",
  53: "rainy",
  55: "rainy",
  56: "rainy",
  58: "rainy",
  61: "rainy",
  63: "rainy",
  65: "rainy",
  66: "rainy",
  67: "rainy",

  71: "snowy",
  73: "snowy",
  75: "snowy",
  77: "snowy",

  80: "rainy",
  81: "rainy",
  82: "rainy",

  85: "snowy",
  86: "snowy",
};

function weatherCodeToBg(weatherCode) {
  // because thunderstorm is unavailable in a group of countries
  // i set the default value to thunderstorm then if weatherCode
  // isn't available , this mean it is thunderstorm
  let bg = "thunderstorm";
  Object.keys(weatherCodes).forEach((key) => {
    if (weatherCode === parseInt(key)) {
      bg = `${weatherCodes[key]}`;
    }
  });
  return bg;
}

export default weatherCodeToBg;
