function getSpecificTimezoneHour(timeZone) {
  const date = new Date();
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    hour12: false,
    timeZone,
  });
  const hour = parseInt(time) === 24 ? 0 : parseInt(time);
  return hour;
}

export default getSpecificTimezoneHour;