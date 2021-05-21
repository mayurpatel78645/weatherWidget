const apiKey = 'f4b85b43229c9533232a8803096419fa';

const getLocation = async() => {
  if('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
      userLocation(position);
    });
  } else {
    console.log('geolocation IS NOT available');
  }
}



const userLocation = async(position) => {
  const latitude = `${position.coords.latitude}`;
  const longitude = `${position.coords.longitude}`;
  console.log(latitude, longitude);
  const weatherData = await getCurrentWeatherData(latitude, longitude);
  console.log(weatherData);
}

getLocation();