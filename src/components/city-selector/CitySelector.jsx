import { majorCities } from "../../api.service/majorCities";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./CitySelector.scss";

function CitySelector({ handleCityChage }) {
  const [city, setCity] = useState();

  return (
    <div className="city-selector">
      <div className="city-selector__searchfield-container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleCityChage(city);
          }}
        >
          <input
            type="text"
            placeholder="Search"
            className="city-selector__searchfield"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <button
            type="submit"
            className="city-selector__submit-btn"
            disabled={!city}
          >
            Find
          </button>
        </form>
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
