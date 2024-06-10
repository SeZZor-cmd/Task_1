import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (country === '') {
      return;
    }
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
      navigate('/country-details', { state: { countryData: response.data[0] } });
      setError('');
    } catch (err) {
      setError('Country not found');
    }
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