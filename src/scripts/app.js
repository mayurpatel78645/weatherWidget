const apiKey = 'f4b85b43229c9533232a8803096419fa';

class Forecast {
  static getLocation() {
    if('geolocation' in navigator) {
      navigator.geolocation.watchPosition(this.success, this.error);
    } else {
      console.log('geolocation IS NOT available');
    }
  }

  static error = () => {
    console.error(`Unable to retrieve location`);
  }

  static success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    this.getForecastData(url);
  }

  static getForecastData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }
}

class CurrentWeather {
  static getLocation() {
    if('geolocation' in navigator) {
      navigator.geolocation.watchPosition(this.success, this.error);
    } else {
      console.log('geolocation IS NOT available');
    }
  }

  static error = () => {
    console.error(`Unable to retrieve location`);
  }

  static success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    this.currentWeatherData(url);
  }

  static currentWeatherData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    this.render(data);
  }

  static render = (data) => {
    const currentConditions = document.querySelector('.current-conditions');
    const temp = data.main.temp;
    const condition = data.weather[0].description;
    const icon = data.weather[0].icon;
    console.log(data);
    currentConditions.innerHTML = '';
    currentConditions.insertAdjacentHTML('beforeend',
    `
    <h2>Current Conditions</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
        <div class="current">
          <div class="temp">${temp}℃</div>
          <div class="condition">${condition}</div>
        </div>
    `);
  }
}

Forecast.getLocation();
CurrentWeather.getLocation();



























/*const getLocation = async() => {
  if('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
      userLocation(position);
    });
  } else {
    console.log('geolocation IS NOT available');
  }
}

const getCurrentWeatherData = async(latitude, longitude) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
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
}*/
