import "./HourlyWeather.scss";
import { v4 as uuidv4 } from "uuid";
import setForecastLength from "../../helper-functions/setForecastLength";

function HourlyWeather({ weather, currentDay, dayChangeHandler }) {
  const date = new Date(weather.forecast.forecastday[currentDay].date);

  return (
    <div className="hourly-weather">
      {currentDay !== 0 && (
        <button
          onClick={() => {
            dayChangeHandler(currentDay - 1);
          }}
          className="hourly-weather__change-page-btn"
        >
          {`See more weather for ${date.toLocaleString("en-us", {
            weekday: "short",
          })} ${date.getDate()}`}
        </button>
      )}
      {setForecastLength(weather, currentDay).map((hour) => {
        return (
          new Date().getTime() <= new Date(hour.time).getTime() && (
            <div className="hourly-weather__hour" key={uuidv4()}>
              <p className="hourly-weather__time">{hour.time.slice(11)}</p>
              <p className="hourly-weather__day-indicator">
                {hour?.dayBreakPoint}
              </p>
              <div
                className="hourly-weather__weather-icon"
                style={{ backgroundImage: "url(" + hour.condition.icon + ")" }}
              ></div>
              <p className="hourly-weather__temperature">{hour.temp_c}°</p>
              <div className="hourly-weather__humidity-icon"></div>
              <div className="hourly-weather__humidity-stats">
                {hour.humidity}%
              </div>
            </div>
          )
        );
      })}
      {currentDay !== weather.forecast.forecastday.length - 1 && (
        <button
          onClick={() => {
            dayChangeHandler(currentDay + 1);
          }}
          className="hourly-weather__change-page-btn"
        >
          {`See more weather for ${new Date(
            weather.forecast?.forecastday[currentDay + 1].date
          ).toLocaleString("en-us", {
            weekday: "short",
          })} ${new Date(
            weather.forecast?.forecastday[currentDay + 1].date
          ).getDate()}`}
        </button>
      )}
    </div>
  );
}

export default HourlyWeather;
