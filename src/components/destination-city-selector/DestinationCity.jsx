import debounce from "../../helper-functions/debounce";
import { useState } from "react";
import { useEffect } from "react";
import LocationStatistics from "../location-stats/LocationStatictics";
import "./DestinationCity.scss";

function DestinationCity({ weatherData, covidStats }) {
  const [active, setActive] = useState(false);
  const [activeCompare, setActiveCompare] = useState(false);
  const [destinationCity, setDestinationCity] = useState();
  const [activeWeatherData, setActiveWeatherData] = useState();
  const [covidData, setCovidData] = useState();
  const debouncedCitySelector = debounce(setDestinationCity, 1000);

  useEffect(() => {
    async function getDestinationData() {
      try {
        const request = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=1766146c39b24c50939112055221301 &q=${destinationCity}&days=10&aqi=yes&alerts=yes`
        );
        const response = await request.json();

        if (response?.location?.name) {
          const covidData = await fetch(
            `https://covid-api.mmediagroup.fr/v1/vaccines?country=${response.location.country}`
          );
          const covidDataResponse = await covidData.json();

          setCovidData(covidDataResponse);
          setActiveWeatherData(response);
          setActive(false);
        } else {
          setActiveWeatherData(response);
        }
      } catch (err) {
        setActiveWeatherData(err);
      }
    }
    if (destinationCity) {
      getDestinationData();
    }
  }, [destinationCity]);

  console.log(covidStats, activeWeatherData);

  return (
    <div className="destination-city">
      <div className={`destination-city__selector ${active ? "active" : ""}`}>
        <div className="destination-city__close-btn-container">
          <button
            className="destination-city__close-btn"
            onClick={() => {
              setActive(false);
            }}
          ></button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="destination-city__searchfield"
          onChange={(event) => {
            debouncedCitySelector(event.target.value);
          }}
        />
        {activeWeatherData?.location?.name && (
          <p className="destination-city__selected-city-name">
            {activeWeatherData.location.name}
          </p>
        )}
        {activeWeatherData?.error?.message && (
          <p className="destination-city__selected-city-name">
            {activeWeatherData.error.message}
          </p>
        )}
      </div>
      {activeCompare && (
        <div className="destination-city__weather-compare-section">
          <div className="destination-city__close-btn-container">
            <button
              className="destination-city__close-btn"
              onClick={() => {
                setActiveCompare(false);
              }}
            ></button>
          </div>
          <div className="destination-city__main-content">
            <div className="destination-city__starting-city">
              <LocationStatistics
                weatherData={weatherData}
                covidStats={covidStats}
              />
            </div>
            <div className="destination-city__destination-city">
              <LocationStatistics
                weatherData={activeWeatherData}
                covidStats={covidData}
              />
            </div>
          </div>
        </div>
      )}
      <p className="destination-city__header">
        Compare current weather with another location
      </p>
      <div className="destination-city__btn-container">
        <button
          className="destination-city__btn"
          onClick={() => {
            setActive(true);
          }}
        >
          Select City
        </button>
        <button
          className="destination-city__btn"
          onClick={() => {
            setActiveCompare(true);
          }}
          disabled={activeWeatherData?.location?.name ? false : true}
        >
          Compare
        </button>
      </div>
    </div>
  );
}

export default DestinationCity;
