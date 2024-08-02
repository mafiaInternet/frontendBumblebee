import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CryptoTracker() {
  const [cryptoPrices, setCryptoPrices] = useState([]);


  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        setCryptoPrices(response.data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    const interval = setInterval(() => {
      fetchCryptoPrices();

    }, 20000); // Fetch prices and exchange rate every 60 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div>
      <h1>Crypto Tracker</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Price (VND)</th>
            <th>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {cryptoPrices.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toFixed(2)}</td>
              <td>{coin.current_price * 25.453} VND</td>
              <td style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoTracker;