import Weather from "./components/weather-section/Weather";
import CitySelector from "./components/city-selector/CitySelector";
import Holidays from "./components/holidays/Holidays";
import CovidStatistics from "./components/covid-section/CovidStatistics";
import DestinationCity from "./components/destination-city-selector/DestinationCity";
import { useState, useEffect } from "react";
import getWeather from "./api.service/getWeather";
import getCOVIDStats from "./api.service/getCovidStats";
import getTimeZone from "./api.service/getTimeZone";
import getHolidays from "./api.service/getHolidays";
import getUserLocation from "./api.service/getUserLocation";
import "./App.scss";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState();
  const [covidStats, setCovidStats] = useState();
  const [timezone, setTimezone] = useState();
  const [holidays, setHolidays] = useState();
  const [loading, setLoading] = useState(true);

  function handleCityChage(newCity) {
    if (newCity === "") {
      setCity((prev) => prev);
    } else {
      setCity(newCity);
    }
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (!city) {
        async function getStartingCity() {
          await navigator.geolocation.getCurrentPosition(success, reject);

          async function success(pos) {
            const locationData = await getUserLocation(
              pos.coords.latitude,
              pos.coords.longitude
            );
            setCity(locationData.city);
          }

          function reject() {
            setCity("Sumy");
          }
        }
        getStartingCity();
      }

      if (city) {
        const weatherRequest = await getWeather(city);
        setWeatherData(weatherRequest);
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
        if (!weatherRequest?.error) {
          setLoading(false);
        }
      }
    }
    getData();
  }, [city]);

  return (
    <div className="App">
      <CitySelector handleCityChage={handleCityChage} />
      {weatherData?.error && (
        <div className="error-notification">
          <p>{`${weatherData.error.message}`}</p>
        </div>
      )}
      {!loading ? (
        <>
          <Weather weatherData={weatherData} timezone={timezone} />
          <DestinationCity weatherData={weatherData} covidStats={covidStats} />
          <Holidays holidays={holidays} />
          <CovidStatistics covidStats={covidStats} />
        </>
      ) : (
        <>
          <div className="loading-message">Loading, please wait...</div>
          <ClipLoader color={"#393E46"} size={100} />
        </>
      )}
    </div>
  );
}

export default App;
