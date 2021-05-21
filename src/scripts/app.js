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

const getCurrentWeatherData = async(latitude, longitude) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const userLocation = async(position) => {
  const latitude = `${position.coords.latitude}`;
  const longitude = `${position.coords.longitude}`;
  console.log(latitude, longitude);
  const weatherData = await getCurrentWeatherData(latitude, longitude);
  console.log(weatherData);
}

getLocation();