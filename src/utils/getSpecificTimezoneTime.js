function getSpecificTimezoneTime(timeZone) {
  const date = new Date();
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });
  if (parseInt(time.substring(0, 2)) === 24) {
    return `00${time.substring(2)}`;
  }
  return time;
}

export default getSpecificTimezoneTime;
