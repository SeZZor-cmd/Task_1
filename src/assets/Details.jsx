import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const { countryData } = location.state || {};
  const navigate = useNavigate();

  const handleWeatherClick = () => {
    navigate('/weather', { state: { capital: countryData.capital, countryData } });
  };

  if (!countryData) {
    return <div>No country information available.</div>;
  }

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>Capital: {countryData.capital}</p>
      <p>Population: {countryData.population}</p>
      <p>Latitude/Longitude: {countryData.latlng.join(', ')}</p>
      <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} /><br/>
      <button onClick={handleWeatherClick}>Capital Weather</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Details;