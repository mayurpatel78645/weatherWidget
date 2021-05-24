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
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    this.getForecastData(url);
  }

  static getForecastData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    this.render(data);
  }

  static render = (data) => {
    const forecast = document.querySelector('.forecast');
    forecast.innerHTML = '';
    data.list.forEach(element => {
      const date = new Date(element.dt_txt).toLocaleDateString('default', {weekday: 'long'});
      const time = new Date(element.dt_txt).toLocaleTimeString('default', {hour12:true, hour:'2-digit', minute: '2-digit'});
      if (time !== '03:00 PM') return ;
      forecast.insertAdjacentHTML('beforeend', 
        `
        <div class="day Sunday">
      
          <h3>${date}</h3><br>
          <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" />
          <div class="description">${element.weather[0].description}</div>
          <div class="temp">
            <span class="high">${Math.ceil(element.main.temp_max)}℃</span>/<span class="low">${Math.floor(element.main.temp_min)}℃</span>
          </div>
        </div>
        `);
    })
  }
}

Forecast.getLocation();
