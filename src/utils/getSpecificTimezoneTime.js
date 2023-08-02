function getSpecificTimezoneTime({
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  minute = false,
  second = false,
  hour = true,
  string = false,
}) {
  const date = new Date();
  const time = date.toLocaleString("en-US", {
    [hour ? "hour" : ""]: "2-digit",
    [minute ? "minute" : ""]: "2-digit",
    [second ? "second" : ""]: "2-digit",
    hour12: false,
    timeZone: timezone,
  });
  return string ? time : parseInt(time);
}

export default getSpecificTimezoneTime;
