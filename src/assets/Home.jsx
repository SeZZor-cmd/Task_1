import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const Home = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [cachedCountries, setCachedCountries] = useState({});
  const navigate = useNavigate();
  const debounceFetch = useRef(debounce(fetchCountryData, 500)).current;

  useEffect(() => {
    return () => {
      debounceFetch.cancel(); // Cleanup debounce on unmount
    };
  }, [debounceFetch]);

  const handleInputChange = (e) => {
    setCountry(e.target.value);
    setError('');
    debounceFetch(e.target.value);
  };

  async function fetchCountryData(countryName) {
    if (countryName === '') {
      return;
    }
    if (cachedCountries[countryName]) {
      navigate('/country-details', { state: { countryData: cachedCountries[countryName] } });
      return;
    }
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      setCachedCountries((prev) => ({ ...prev, [countryName]: response.data[0] }));
      navigate('/country-details', { state: { countryData: response.data[0] } });
    } catch (err) {
      setError('Country not found');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country === '' || cachedCountries[country]) {
      return;
    }
    fetchCountryData(country);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={country === ''}>
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
