export default function setForecastLength(weather, currentDay) {
  const hours = weather.forecast.forecastday[currentDay].hour.filter((hour) => {
    return new Date().getTime() <= new Date(hour.time).getTime();
  });

  if (hours.length < 15) {
    const additionalHours = JSON.parse(JSON.stringify(weather.forecast?.forecastday[
      currentDay + 1
    ].hour.slice(0, 15 - hours.length)));
    additionalHours[0].dayBreakPoint = String(
      new Date(weather.forecast?.forecastday[currentDay + 1].hour[0].time)
    ).slice(0, 3);

    return hours.concat(additionalHours);
  } else {
    return hours;
  }
}
