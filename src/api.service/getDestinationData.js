import getWeather from "./getWeather";
import getCOVIDStats from "./getCovidStats";

export default async function getDestinationData(city, setCovidData, setActiveWeatherData, setActive) {
    const weather = await getWeather(city);

    setActiveWeatherData(weather);
    if (!weather.error) {
        const covidStats = await getCOVIDStats(weather.location.country);

        setCovidData(covidStats);
    }

}