export default async function getHolidays(country) {
  try {
    const request = await fetch(
      `https://calendarific.com/api/v2/holidays?&api_key=a71482e5dcbeec2ad9228cd943afa92a3e007661&country=${country}&year=2022`
    );
    const response = await request.json();

    return response;
  } catch (err) {
    return err;
  }
}
