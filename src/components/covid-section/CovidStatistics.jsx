import "./CovidStatistics.scss";

function CovidStatistics({ covidStats }) {
  return (
    <div className="covid-statistics">
      <div className="covid-statistics__heading">COVID statistics</div>
      <div className="covid-statistics__main-section">
        <p className="covid-statistics__stat">
          Total Population: {covidStats.All.population}
        </p>
        <p className="covid-statistics__stat">
          Vaccinated: {covidStats.All.people_vaccinated} (
          {Math.ceil(
            covidStats.All.people_vaccinated / (covidStats.All.population / 100)
          )}{" "}
          %)
        </p>
        <p className="covid-statistics__stat">
          Partially Vaccinated: {covidStats.All.people_partially_vaccinated} (
          {Math.ceil(
            covidStats.All.people_partially_vaccinated /
              (covidStats.All.population / 100)
          )}{" "}
          %)
        </p>
      </div>
    </div>
  );
}

export default CovidStatistics;
