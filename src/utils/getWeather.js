import { get } from "../services/http";
import weathercodeToClimate from "./weathercodeToClimate";
import weathercodeToIcon from "./weathercodeToIcon";
import { nanoid } from "nanoid";
import weekdays from "../data/weekdays";
import hourlyKeysSpecificName from "../data/daysDataKeyName";
import weatherCodeToBg from "./weatherCodeToBg";

const apiEndPoint = import.meta.env.VITE_OPEN_METEO_END_POINT;

function getWeather(location, forecastDays = 16) {
  const { lat, long } = location;
  return get(
    `${apiEndPoint}/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,is_day,apparent_temperature,windspeed_10m,precipitation,relativehumidity_2m,uv_index,cloudcover,weathercode&daily=sunrise,sunset&forecast_days=${forecastDays}&timezone=auto`
  ).then((data) => {
    const { restData, timezone } = convertData(data, forecastDays);
    const days = divideDataIntoDays(restData, forecastDays);
    return { days, timezone };
  });
}
export default getWeather;

function divideDataIntoDays(data, forecastDays) {
  const dataKeys = Object.keys(data);
  const days = [];
  for (let i = 0; i < forecastDays; i++) {
    let day = {};
    dataKeys.forEach((key) => {
      day[key] = data[key][i];
    });
    day.id = nanoid(10);
    days.push(day);
  }
  return days;
}

function convertData(data, forecastDays) {
  const { daily, hourly, timezone } = data;

  const { ...dailyDataFromHourly } = convertHourlyData(hourly, forecastDays);
  const dailyDataFromDaily = convertDailyData(daily);
  const restData = { ...dailyDataFromDaily, ...dailyDataFromHourly };
  return { restData, timezone };
}

function convertHourlyData(data, forecastDays) {
  const { dailyData } = hourlyToDailyData(data, forecastDays);
  const { weathercode, ...restData } = dailyData;
  const { climateCondition, icon, bg } = convertWeatherCode(weathercode);
  return {
    ...restData,
    climateCondition,
    icon,
    bg,
  };
}

function hourlyToDailyData(hourly, forecastDays) {
  const hourlyKeys = Object.keys(hourly);
  const dailyData = {};
  hourlyKeys.forEach((key) => {
    const arr = hourly[key];
    if (key !== "time") {
      const daily = [];
      for (let i = 0; i < forecastDays; i++) {
        const dayArr = arr.slice(24 * i, 24 * (i + 1));
        daily.push(dayArr);
      }
      dailyData[
        key === hourlyKeysSpecificName[key] ? key : hourlyKeysSpecificName[key]
      ] = daily;
    }
  });
  return { dailyData };
}

function convertWeatherCode(weathercode) {
  const climateCondition = weathercode.map((day) => {
    return day.map((item) => {
      return weathercodeToClimate(item);
    });
  });
  const icon = weathercode.map((day) => {
    return day.map((item) => {
      return weathercodeToIcon(item);
    });
  });
  const bg = weathercode.map((day) => {
    return day.map((item) => {
      return weatherCodeToBg(item);
    });
  });
  return { climateCondition, icon, bg };
}

function convertDailyData(data) {
  const { sunrise, sunset, time } = data;
  const dailySunrise = convertSunriseSunset(sunrise, "AM");
  const dailySunset = convertSunriseSunset(sunset, "PM");
  const { convertedDate: date, convertedDateForWeekend: dateForWeekend } =
    convertDate(time);
  const weekday = getWeekday(dateForWeekend);
  return { sunrise: dailySunrise, sunset: dailySunset, date, weekday };
}

function convertSunriseSunset(data, AMPM) {
  return data.map((item) => `${item.substring(11)} ${AMPM}`);
}

function getWeekday(dateArr) {
  const weekdaysArr = dateArr.map((date) => {
    const d = new Date(date);
    return weekdays[d.getDay()];
  });
  return weekdaysArr;
}

function convertDate(time) {
  const convertedDate = time.map((day, index) => {
    const date = new Date();
    const month = parseInt(day.substring(5, 7));
    const monthDay = parseInt(day.substring(8, 10));
    date.setMonth(month - 1, monthDay);
    return index === 0
      ? "today"
      : date.toLocaleString("en-US", { dateStyle: "long" });
  });
  const convertedDateForWeekend = time.map((day) => {
    const date = new Date();
    const month = parseInt(day.substring(5, 7));
    const monthDay = parseInt(day.substring(8, 10));
    date.setMonth(month - 1, monthDay);
    return date.toLocaleString("en-US", { dateStyle: "long" });
  });
  return { convertedDate, convertedDateForWeekend };
}
