import "./Holidays.scss";
import filterHolidays from "../../helper-functions/filterHolidays";
import HolidayCard from "../holiday/HolidayCard";
import { v4 as uuidv4 } from "uuid";

function Holidays({ holidays }) {
  return (
    <div className="holidays-section">
      <div className="holidays-section__heading-container">
        <p className="holidays-section__heading">
          Incoming Holidays in {filterHolidays(holidays)[0].country.name}
        </p>
      </div>
      <div className="holidays-section__main-content">
        {filterHolidays(holidays)
          .slice(0, 4)
          .map((holiday) => {
            return <HolidayCard holiday={holiday} key={uuidv4()} />;
          })}
      </div>
    </div>
  );
}

export default Holidays;
