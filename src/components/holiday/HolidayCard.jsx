import "./HolidayCard.scss";
import { useState } from "react";

function HolidayCard({ holiday }) {
  const [active, setActive] = useState(false);
  const currentDate = new Date(holiday.date.iso);

  function toggleDescription() {
    setActive(!active);
  }

  return (
    <div className="holiday">
      <button onClick={toggleDescription} className="holiday__name">
        <p>
          {holiday.name.length > 16
            ? holiday.name.slice(0, 16) + "..."
            : holiday.name}{" "}
          ⬇️
        </p>
      </button>
      <div className={`holiday__description ${active ? "active" : ""}`}>
        <p>
          Date:
          {` ${currentDate.toLocaleString("default", {
            month: "long",
          })} ${currentDate.getDate()}`}
        </p>
        <p>{holiday.description}</p>
      </div>
    </div>
  );
}

export default HolidayCard;
