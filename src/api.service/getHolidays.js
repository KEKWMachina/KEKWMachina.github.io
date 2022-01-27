export default async function getHolidays(country) {
  try {
    const request = await fetch(
      `https://calendarific.com/api/v2/holidays?&api_key=3de1e54c0b88d22fe00de0e7c6f3311ac5d9cdde&country=${country}&year=2022`
    );
    const response = await request.json();

    return response;
  } catch (err) {
    return err;
  }
}
