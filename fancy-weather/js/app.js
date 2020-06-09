getLocation();
changeBackground();
setInterval(getDate, 1000);
initMap();

//DEFINE LOCATION & WEATHER
function getLocation() {
  window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const key = '442c430078c04960b68170043203005';
        let location;
        let temp;

        const temperature = document.querySelector('.temperature');
        const api_weather_current = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}`;
        const api_weather_forecast = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${long}&days=5`;
        const api_location = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyA65pqh1Xz6qrNwwiS-UXl38YDUBB2hbAs`;

        document.querySelector('.latitude').innerHTML = `Latitude: ${Math.round(
          lat
        )}&deg`;
        document.querySelector(
          '.longitude'
        ).innerHTML = `Longitude: ${Math.round(long)}&deg`;

        //FETCHING LOCATION
        fetch(api_location)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            location = data.results[8].formatted_address;
            document.querySelector('h1').innerHTML = location;
          });

        //FETCHING CURRENT WEATHER
        fetch(api_weather_current)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
           
            let description = document.querySelector('.description');
            let feelsLike = document.querySelector('.feels-like');
            let wind = document.querySelector('.wind');
            let humidity = document.querySelector('.humidity');
            let icon = data.current.condition.icon;
            temp = Math.round(data.current.temp_c);
            temperature.innerHTML = `${temp}&deg`;
            description.innerHTML = data.current.condition.text;
            feelsLike.innerHTML = `Feels like: ${data.current.feelslike_c}&deg`;
            wind.innerHTML = `Wind: ${data.current.wind_kph}km/h`;
            humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
            document.querySelector('.icon').innerHTML = `<img src="${icon}">`;

            //CONVERTING TEMPERATURE

            const celsius = document.querySelector('#celsius');
            const farenheit = document.querySelector('#farenheit');
            let count = 0;

            farenheit.addEventListener('click', () => {
              temp = Math.round(data.current.temp_f);
              temperature.innerHTML = `${temp}&deg`;
              feelsLike.innerHTML = `Feels like: ${data.current.feelslike_f}&degF`;
            });

            celsius.addEventListener('click', () => {
              temp = Math.round(data.current.temp_c);
              document.querySelector('.temperature').innerHTML = `${temp}&deg`;
              feelsLike.innerHTML = `Feels like: ${data.current.feelslike_c}&degC`;
            });
          });

        //FETCHING WEATHER FORECAST

        fetch(api_weather_forecast)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            //SHOW FORECAST DAY
            const week = [
              'SUNDAY',
              'MONDAY',
              'TUESDAY',
              'WEDNESDAY',
              'THURSDAY',
              'FRIDAY',
              'SATURDAY',
            ];
            let today = new Date();
            let day = today.getDay();

            day++;
            if (day > week.length - 1) day = 0;

            document.querySelector('.day1').innerHTML = week[day];
            day++;
            if (day > week.length - 1) day = 0;
            document.querySelector('.day2').innerHTML = week[day];
            day++;
            if (day > week.length - 1) day = 0;
            document.querySelector('.day3').innerHTML = week[day];

            //SHOW FORECAST TEMPERATURE && CONVERTING
            document.querySelector(
              '.temp1'
            ).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c}&degC`;
            document.querySelector(
              '.temp2'
            ).innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c}&degC`;
            document.querySelector(
              '.temp3'
            ).innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c}&degC`;
            document
              .querySelector('#farenheit')
              .addEventListener('click', () => {
                document.querySelector(
                  '.temp1'
                ).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_f}&degF`;
                document.querySelector(
                  '.temp2'
                ).innerHTML = `${data.forecast.forecastday[1].day.avgtemp_f}&degF`;
                document.querySelector(
                  '.temp3'
                ).innerHTML = `${data.forecast.forecastday[2].day.avgtemp_f}&degF`;
              });

            document.querySelector('#celsius').addEventListener('click', () => {
              document.querySelector(
                '.temp1'
              ).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c}&degC`;
              document.querySelector(
                '.temp2'
              ).innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c}&degC`;
              document.querySelector(
                '.temp3'
              ).innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c}&degC`;
            });

            //ADD WEATHER ICON

            document.querySelector(
              '.icon1'
            ).innerHTML = `<img src="${data.forecast.forecastday[0].day.condition.icon}">`;
            document.querySelector(
              '.icon2'
            ).innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}">`;
            document.querySelector(
              '.icon3'
            ).innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}">`;
          });
      });
    }
  });
}

//CHANGE BACKGROUND IMAGE ON CLICK;
function changeBackground() {
  let background = document.body.style.backgroundImage;
  let backgroundCount = 0;
  let newBackground;
  const images = [
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80',
    'https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
    'https://images.unsplash.com/38/L2NfDz5SOm7Gbf755qpw_DSCF0490.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  ];

  const refreshButton = document.querySelector('.refresh');
  refreshButton.addEventListener('click', () => {
    backgroundCount++;
    if (backgroundCount > images.length - 1) backgroundCount = 0;
    newBackground = images[backgroundCount];

    document.body.style.background = `url(${newBackground})`;
    document.body.style.backgroundSize = 'cover';
    localStorage.setItem('back', newBackground);
    window.addEventListener('load', () => {
      let index = localStorage.getItem('back');
      backgroundCount = index;

      backgroundCount++;
      if (backgroundCount > images.length - 1) backgroundCount = 0;
      let newBackground = images[backgroundCount];

      document.body.style.background = `url(${newBackground})`;
      document.body.style.backgroundSize = 'cover';
    });
  });
}

//GETTING THE DATE AND TIME
function getDate() {
  const dateContainer = document.querySelector('.date');
  let today = new Date();

  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = `${week[today.getDay()]} ${today.getDate()} ${
    months[today.getMonth()]
  }`;

  dateContainer.innerHTML = date;
  document.querySelector(
    '.time'
  ).innerHTML = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
}

//LOADING A MAP AND SEARCH AUTOCOMPLETE

function initMap() {
  let map;
  let latt;
  let long;
  let marker;
  navigator.geolocation.getCurrentPosition((positions) => {
    long = positions.coords.longitude;
    latt = positions.coords.latitude;
    let location = { lat: latt, lng: long };

    map = new google.maps.Map(document.querySelector('.map'), {
      center: { lat: latt, lng: long },
      zoom: 8,
    });
    marker = new google.maps.Marker({ position: location, map: map });
  });
  let input = document.getElementById('search');
  new google.maps.places.Autocomplete(input);

  //CHANGE COORDINATES ON CLICK
  document.querySelector('.button-search').addEventListener('click', () => {
    let geocoder;
    let address = input.value;
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  });
}
