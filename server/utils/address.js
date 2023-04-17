const { default: axios } = require("axios");

const API_KEY = "AIzaSyDq3qZjeIzmNLUDbJv5yXAEFciHq2PFUaY";

async function convertAdressToCoordinates(address) {
  const respone = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = respone.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new Error({
      message: "Could not find location for the given address",
    });
  }
  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = convertAdressToCoordinates;
