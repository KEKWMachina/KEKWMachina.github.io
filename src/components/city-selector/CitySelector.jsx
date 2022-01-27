import { majorCities } from "../../api.service/majorCities";
import { v4 as uuidv4 } from "uuid";
import debounce from "../../helper-functions/debounce";
import "./CitySelector.scss";

function CitySelector({ handleCityChage }) {
  const debouncedCityChange = debounce(handleCityChage, 1000);

  return (
    <div className="city-selector">
      <div className="city-selector__searchfield-container">
        <input
          type="text"
          placeholder="Search"
          className="city-selector__searchfield"
          onChange={(event) => {
            debouncedCityChange(event.target.value);
          }}
        />
      </div>
      <div className="city-selector__cities">
        {majorCities.map((city) => {
          return (
            <button
              className="city-selector__major"
              onClick={() => {
                handleCityChage(city.APIname);
              }}
              key={uuidv4()}
            >
              {city.realName}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CitySelector;
