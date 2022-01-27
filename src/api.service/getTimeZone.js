export default async function getTimeZone(country) {
  try {
    const request = await fetch(
      `https://timezone.abstractapi.com/v1/current_time/?api_key=ffdbd8f900344e2cb8dfca1f71e4a638&location=${country}`
    );
    const response = await request.json();

    return response;
  } catch (err) {
    return err;
  }
}
