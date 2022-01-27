import "./DayCard.scss";
import isToday from "../../helper-functions/isToday";
import ReactTooltip from "react-tooltip";

function DayCard({ weather, dayChangeHandler, index, activeDayIndex }) {
  return (
    <div
      className="weather-main-section__week-current"
      onClick={() => {
        dayChangeHandler(index);
      }}
    >
      <p
        className={
          index === activeDayIndex
            ? "weather-main-section__week-current-heading-active"
            : "weather-main-section__week-current-heading"
        }
      >
        {isToday(weather.date)}
      </p>
      <div className="weather-main-section__week-forecast-container">
        <ul className="weather-main-section__week-forecast-stats">
          <li>{weather.day.maxtemp_c}°</li>
          <li>{weather.day.mintemp_c}°</li>
          <li
            className="weather-main-section__week-forecast-desc"
            data-tip
            data-for={String(weather.day.condition.code)}
          >
            {weather.day.condition.text}
          </li>
          <ReactTooltip id={String(weather.day.condition.code)} place="bottom">
            {weather.day.condition.text}
          </ReactTooltip>
        </ul>
        <div className="weather-main-section__week-forecast-visual">
          <div
            className="weather-main-section__week-forecast-icon"
            style={{
              backgroundImage: "url(" + weather.day.condition.icon + ")",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DayCard;
