import "./Weather.scss";
import DayCard from "../day-card/DayCard";
import HourlyWeather from "../hour-section/HourlyWeather";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import formatDate from "../../helper-functions/formatDate";

function Weather({ weatherData, timezone }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  function handleDayChange(index) {
    setActiveDayIndex(index);
  }

  return (
    <div className="weather-main-section">
      <div className="weather-main-section__location-container">
        <span className="weather-main-section__location">
          {`${weatherData.location.name}, ${
            weatherData.location.country
          } ${formatDate(timezone)}`}
        </span>
      </div>
      <div className="weather-main-section__week-forecast">
        {weatherData.forecast.forecastday.map((weather, index) => {
          return (
            <DayCard
              weather={weather}
              dayChangeHandler={handleDayChange}
              index={index}
              activeDayIndex={activeDayIndex}
              key={uuidv4()}
            />
          );
        })}
      </div>
      <HourlyWeather
        weather={weatherData}
        currentDay={activeDayIndex}
        dayChangeHandler={handleDayChange}
      />
      <div className="weather-main-section__update-date">
        <div className="weather-main-section__update-icon"></div>
        {`Last updated: ${weatherData.current.last_updated}`}
      </div>
      <div className="weather-main-section__sunset-sunrise">
        <div className="weather-main-sunset-icon"></div>
        <div className="weather-main-section__sunrise-icon"></div>
        {`Sunrise: ${weatherData.forecast.forecastday[activeDayIndex].astro.sunrise}`}
        <div className="weather-main-section__sunset-icon"></div>
        {`Sunset: ${weatherData.forecast.forecastday[activeDayIndex].astro.sunset}`}
      </div>
    </div>
  );
}

export default Weather;
