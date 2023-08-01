const weathercodes = {
  0: "suny",
  1: "cloudy",
  2: "cloudy",
  3: "cloudy",
  45: "suny",
  48: "suny",
  //   for drizzle
  51: "rainy",
  53: "rainy",
  55: "rainy",
  // for freezing drizzle
  56: "rainy",
  58: "rainy",
  // for rain
  61: "rainy",
  63: "rainy",
  65: "rainy",
  // for freezing rain
  66: "rainy",
  67: "rainy",
  // for snowfall
  71: "snowy",
  73: "snowy",
  75: "snowy",
  77: "snowy",
  // for rain showers
  80: "rainy",
  81: "rainy",
  82: "rainy",
  // for snow showers
  85: "snowy",
  86: "snowy",
};

function weathercodeToIcon(weathercode) {
  // because thunderstorm is unavailable in a group of countries
  // i set the default value to thunderstorm then if weathercode
  // isn't available , this mean it is thunderstorm
  let icon = "thunderstorm";
  Object.keys(weathercodes).forEach((key) => {
    if (weathercode === parseInt(key)) {
      icon = `${weathercodes[key]}`;
    }
  });
  return icon;
}

export default weathercodeToIcon;
