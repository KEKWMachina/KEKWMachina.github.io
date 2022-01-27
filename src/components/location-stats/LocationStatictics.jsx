import "./LocationStats.scss";
import { v4 as uuidv4 } from "uuid";
import isToday from "../../helper-functions/isToday";

function LocationStatistics({ weatherData, covidStats }) {
  return (
    <div className="location-stats">
      <p className="location-stats__starting-city city-name">
        {`${weatherData.location.name}, ${weatherData.location.country}`}
      </p>
      {weatherData.forecast.forecastday.map((weather) => {
        return (
          <div className="location-stats__weather-card" key={uuidv4()}>
            <div className="location-stats__weather-card-stats">
              <p className="location-stats__weather-card-data">
                {isToday(weather.date)}
              </p>
              <p className="location-stats__weather-card-data">
                {weather.day.maxtemp_c}°
              </p>
              <p className="location-stats__weather-card-data">
                {weather.day.mintemp_c}°
              </p>
            </div>

            <div className="location-stats__week-forecast-icon-container">
              <div
                className="location-stats__week-forecast-icon"
                style={{
                  backgroundImage: "url(" + weather.day.condition.icon + ")",
                }}
              ></div>
              <p className="location-stats__week-forecast-description">
                {weather.day.condition.text}
              </p>
            </div>
          </div>
        );
      })}
      {
        <>
          <p className="location-stats__covid-stat">
            Total population: {covidStats.All.population}
          </p>
          <p className="location-stats__covid-stat">
            Partially vaccinated: {covidStats.All.people_partially_vaccinated}
          </p>
          <p className="location-stats__covid-stat">
            Vaccinated: {covidStats.All.people_vaccinated}
          </p>
        </>
      }
    </div>
  );
}

export default LocationStatistics;
