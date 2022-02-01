import getWeather from "./getWeather";
import getCOVIDStats from "./getCovidStats";
import getTimeZone from "./getTimeZone";
import getHolidays from "./getHolidays";

export default async function getData(
  setWeatherData,
  setCovidStats,
  setTimezone,
  setHolidays,
  setLoading,
  city
) {
  const weatherRequest = await getWeather(city);
  setWeatherData(weatherRequest);
  if (!weatherRequest.error) {
    const name =
      weatherRequest.location.country === "United States of America"
        ? "US"
        : weatherRequest.location.country;
    const covidData = await getCOVIDStats(name);
    setCovidStats(covidData);
    const time = await getTimeZone(weatherRequest.location.country);
    setTimezone(time);
    const holidays = await getHolidays(covidData.All.abbreviation);
    setHolidays(holidays);
    setLoading(false);
  }
}
