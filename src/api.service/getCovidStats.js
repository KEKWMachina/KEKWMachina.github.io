export default async function getCOVIDStats(country) {
  try {
    const request = await fetch(
      `https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`
    );
    const response = await request.json();

    return response;
  } catch (err) {
    return err;
  }
}
