import { useState } from "react";
import LocationStatistics from "../location-stats/LocationStatictics";
import getDestinationData from "../../api.service/getDestinationData";
import "./DestinationCity.scss";

function DestinationCity({ weatherData, covidStats }) {
  const [active, setActive] = useState(false);
  const [activeCompare, setActiveCompare] = useState(false);
  const [destinationCity, setDestinationCity] = useState();
  const [activeWeatherData, setActiveWeatherData] = useState();
  const [covidData, setCovidData] = useState();

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
        <form
          className="destination-city__searchfield-container"
          onSubmit={(event) => {
            event.preventDefault();
            getDestinationData(
              destinationCity,
              setCovidData,
              setActiveWeatherData,
              setActive
            );
          }}
        >
          <input
            type="text"
            placeholder="Search"
            className="destination-city__searchfield"
            onChange={(event) => {
              setDestinationCity(event.target.value);
            }}
          />
          <button
            type="submit"
            className="destination-city__submit-btn"
            disabled={!destinationCity}
          >
            Find
          </button>
        </form>
        {activeWeatherData?.location?.name && (
          <>
            <p className="destination-city__selected-city-name">
              {`${activeWeatherData.location.name}, ${activeWeatherData.location.country}`}
            </p>
            <button
              className="destination-city__modal-close-btn"
              onClick={() => {
                setActive(false);
              }}
            >
              Close
            </button>
          </>
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
            <div className="destination-city__destination-city">
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
        {`Compare current weather in ${weatherData.location.name}, ${
          weatherData.location.country
        } with ${
          activeWeatherData?.location?.name
            ? `${activeWeatherData.location.name}, ${activeWeatherData.location.country}`
            : "another location"
        }`}
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
