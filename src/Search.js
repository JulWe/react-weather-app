import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(false);
  const [weather, setWeather] = useState(null);
  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a City" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  function showWeather(response) {
    setResult(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3c949ba49d38be2487ee278e0d2d4059&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (result) {
    return (
      <div>
        {form}
        <br />
        <ul>
          <li>Temperature: {Math.round(weather.temperature)} °C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity} %</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
