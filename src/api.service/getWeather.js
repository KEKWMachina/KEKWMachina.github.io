export default async function getWeather(city) {
  try {
    const request = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=1766146c39b24c50939112055221301 &q=${city}&days=10&`
    );
    const response = await request.json();

    return response;
  } catch (err) {
    return err;
  }
}
