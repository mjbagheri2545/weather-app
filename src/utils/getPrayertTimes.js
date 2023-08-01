import { get } from "../services/http";
const apiEndPoint = import.meta.env.VITE_PRAYER_TIMES_END_POINT;

function getPrayerTimes({ city, country }) {
  return get(
    `${apiEndPoint}/timingsByCity?city=${city}&country=${country}&method=8`
  ).then((data) => {
    const {
      Fajr: fajr,
      Dhuhr: dhuhr,
      Asr: asr,
      Maghrib: maghrib,
      Isha: isha,
      Midnight: midnight,
    } = data.data.timings;
    return { fajr, dhuhr, asr, maghrib, isha, midnight };
  });
}

export default getPrayerTimes;
