import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cachedCountries, setCachedCountries] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCountry(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (country === '') {
      return;
    }
    if (cachedCountries[country]) {
      navigate('/country-details', { state: { countryData: cachedCountries[country] } });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
      setCachedCountries((prev) => ({ ...prev, [country]: response.data[0] }));
      navigate('/country-details', { state: { countryData: response.data[0] } });
    } catch (err) {
      setError('Country not found');
    } finally {
      setLoading(false);
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
        <button type="submit" disabled={country === '' || loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
