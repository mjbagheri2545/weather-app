const weathercodes = {
  0: "clear sky",
  1: "mainly clear",
  2: "partly cloudy",
  3: "overcast",
  45: "fog",
  48: "depositing rime fog",
  // for drizzle
  51: "light drizzle",
  53: "moderate drizzle",
  55: "heavy drizzle",
  // for freezing drizzle
  56: "light freezing drizzle",
  58: "dense intensity freezing drizzle",
  // for rain
  61: "Slight rain",
  63: "moderate rain",
  65: "heavy intensity rain",
  // for freezing rain
  66: "slight freezing rain",
  67: "heavy intensity freezing rain",
  // for snowfall
  71: "slight snowfall",
  73: "moderate snowfall",
  75: "heavy intensity snowfall",
  77: "snow grains",
  // for rain showers
  80: "slight rain showers",
  81: "moderate rain showers",
  82: "heavy intensity rain showers",
  // for snow showers
  85: "slight snow showers",
  86: "heavy snow showers",
};

function weathercodeToClimate(weathercode) {
  // because thunderstorm is unavailable in a group of countries
  // i set the default value to thunderstorm then if weathercode
  // isn't available , this mean it is thunderstorm
  let convertedCode = "thunderstorm";
  Object.keys(weathercodes).forEach((key) => {
    if (weathercode === parseInt(key)) {
      convertedCode = `${weathercodes[key]}`;
    }
  });
  return convertedCode;
}

export default weathercodeToClimate;
