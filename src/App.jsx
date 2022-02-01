import Weather from "./components/weather-section/Weather";
import CitySelector from "./components/city-selector/CitySelector";
import Holidays from "./components/holidays/Holidays";
import CovidStatistics from "./components/covid-section/CovidStatistics";
import DestinationCity from "./components/destination-city-selector/DestinationCity";
import { useState, useEffect } from "react";
import cityGetter from "./helper-functions/cityGetter";
import getData from "./api.service/getData";
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
    setCity(newCity);
  }

  useEffect(() => {
    setLoading(true);
    if (!city) {
      cityGetter(setCity);
    } else {
      getData(
        setWeatherData,
        setCovidStats,
        setTimezone,
        setHolidays,
        setLoading,
        city
      );
    }
  }, [city]);

  return (
    <div className="App">
      <CitySelector handleCityChage={handleCityChage} />
      {weatherData?.error && (
        <div className="error-notification">
          <p>{`${weatherData.error.message}`}</p>
        </div>
      )}
      {!loading && (
        <>
          {!weatherData?.error && (
            <>
              <Weather weatherData={weatherData} timezone={timezone} />
              <DestinationCity
                weatherData={weatherData}
                covidStats={covidStats}
              />
            </>
          )}
          {holidays.meta.code === 200 ? (
            <Holidays holidays={holidays} />
          ) : (
            <div className="onload-error">
              Holidays data is not available
            </div>
          )}
          {Object.entries(covidStats)[0][0] === "All" ? (
            <CovidStatistics covidStats={covidStats} />
          ) : (
            <div className="onload-error">
              Covid data is not available
            </div>
          )}
        </>
      )}
      {loading && !weatherData?.error && (
        <>
          <div className="loading-message">Loading, please wait...</div>
          <ClipLoader color={"#393E46"} size={100} />
        </>
      )}
    </div>
  );
}

export default App;
