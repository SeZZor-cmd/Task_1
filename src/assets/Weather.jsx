import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Weather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { capital, countryData } = location.state || {};

  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    if (capital) {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=ff7d8d40ce4049b08e2154402240706&q=${capital}`
        );
        setWeatherData(response.data.current);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [capital]);

  if (!capital) {
    return <div>No capital city information available.</div>;
  }

  return (
    <div>
      <h1>Weather in {capital}</h1>
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.temp_c} °C</p>
          <img src={weatherData.condition.icon} alt="weather icon" />
          <p>Wind Speed: {weatherData.wind_kph} kph</p>
          <p>Precipitation: {weatherData.precip_mm} mm</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
      <button onClick={() => navigate('/country-details', { state: { countryData } })}>
        Back
      </button>
    </div>
  );
};

export default Weather;