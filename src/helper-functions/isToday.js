export default function isToday(date) {
  const day = new Date(date);
  const currentDay = new Date();

  if (String(day).slice(0, 16) === String(currentDay).slice(0, 16)) {
    return "Today";
  } else {
    return `${day.toLocaleString('en-us', {weekday:'long'})} ${day.getDate()}`;
  }
}
