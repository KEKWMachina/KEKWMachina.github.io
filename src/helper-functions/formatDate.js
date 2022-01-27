export default function formatDate(date) {
  const currentDate = new Date(date.datetime);
  const minutes = currentDate.getMinutes();

  return `${currentDate.getHours()}:${
    minutes >= 10 ? minutes : "0" + minutes
  } ${currentDate.toLocaleString("en-us", {
    weekday: "long",
  })} ${currentDate.getDate()} ${date.timezone_abbreviation}`;
}
