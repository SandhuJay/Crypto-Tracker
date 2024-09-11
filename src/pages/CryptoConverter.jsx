// src/pages/CryptoConverter.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoConverter = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('ethereum');
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        setCryptoList(response.data);
      } catch (error) {
        console.error('Error fetching crypto list:', error);
      }
    };

    fetchCryptoList();
  }, []);

  const handleConversion = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: `${fromCurrency},${toCurrency}`,
          vs_currencies: 'usd'
        }
      });
      const fromPrice = response.data[fromCurrency]?.usd || 0;
      const toPrice = response.data[toCurrency]?.usd || 0;
      const result = (amount * fromPrice) / toPrice;
      setConversionResult(result);
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
      setConversionResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Crypto Converter</h1>
      <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-semibold mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fromCurrency" className="block text-lg font-semibold mb-2">From Currency</label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-gray-700"
          >
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="toCurrency" className="block text-lg font-semibold mb-2">To Currency</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 bg-gray-700"
          >
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button
            onClick={handleConversion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Convert
          </button>
          <p className="text-xl font-semibold mt-4">Conversion Result</p>
          <p className="text-2xl">
            {loading ? 'Calculating...' : conversionResult !== null ? `$${conversionResult.toFixed(2)}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoConverter;
