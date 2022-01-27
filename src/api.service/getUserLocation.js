export default async function getUserLocation(latitude, longitude) {
  try {
    const request = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-with-timezone?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=9f529065c64a42f5af877fad8cefb502`
    );
    const response = await request.json();

    return response;
  } catch (err) {
    return err;
  }
}
