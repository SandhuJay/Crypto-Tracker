// src/pages/Homepage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 200,
            page: 1,
          },
        });
        setCryptoData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching cryptocurrency data');
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = cryptoData.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(cryptoData);
    }
  }, [searchTerm, cryptoData]);

  const handleSelect = (crypto) => {
    navigate('/converter', { state: { fromCurrency: crypto.id } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Cryptocurrency Prices</h1>
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a coin..."
            className="w-full p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2.5 left-3 h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 11.293a8 8 0 111.414 1.414l4.293 4.293a1 1 0 01-1.414 1.414l-4.293-4.293a8 8 0 01-1.414-1.414zm-1.414 1.414a6 6 0 100-8.485 6 6 0 000 8.485z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((crypto) => (
          <div
            key={crypto.id}
            className="bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
            onClick={() => handleSelect(crypto)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-8 h-8"
              />
            </div>
            <p>Price: ${crypto.current_price?.toFixed(2) || 'N/A'}</p>
            <p className={`${crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
              24h Change: {crypto.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
            </p>
            <p className={`${crypto.price_change_percentage_7d_in_currency > 0 ? 'text-green-500' : 'text-red-500'}`}>
              7d Change: {crypto.price_change_percentage_7d_in_currency?.toFixed(2) || 'N/A'}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
