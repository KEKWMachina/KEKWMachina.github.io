import getUserLocation from "../api.service/getUserLocation";

function cityGetter(citySetter) {
  navigator.geolocation.getCurrentPosition(success, reject);

  async function success(pos) {
    const locationData = await getUserLocation(
      pos.coords.latitude,
      pos.coords.longitude
    );
    citySetter(locationData.city);
  }

  function reject() {
    citySetter("Sumy");
  }
}

export default cityGetter;
