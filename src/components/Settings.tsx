import React from 'react';
import { useCoin } from '../context/Context';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: flex;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 18px;
  margin-right: 10px;
`;

const Select = styled.select`
  font-size: 18px;
  padding: 5px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Settings = () => {
  const { data, currency, setCurrency, coin, setCoin } = useCoin();

  const currencies = data?.market_data?.current_price;
  const coins = [
    'bitcoin', 
    'ethereum', 
    'ripple', 
    'binancecoin', 
    'solana', 
    'dogecoin', 
    'cardano', 
    'tron', 
    'avalanche-2', 
    'the-open-network', 
    'chainlink'
  ];

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const handleCoinChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCoin(event.target.value);
  };

  return (
    <Container>
      <div>
      <Label htmlFor="coin-select">Select Coin:</Label>
      <Select id="coin-select" value={coin} onChange={handleCoinChange}>
        {coins.map((coinName) => (
          <option key={coinName} value={coinName}>
            {coinName.charAt(0).toUpperCase() + coinName.slice(1)}
          </option>
        ))}
      </Select>
      </div>
      <div>
      <Label htmlFor="currency-select">Select Currency:</Label>
      <Select id="currency-select" value={currency} onChange={handleCurrencyChange}>
        {currencies && Object.keys(currencies).map((currencyCode) => (
          <option key={currencyCode} value={currencyCode}>
            {currencyCode.charAt(0).toUpperCase() + currencyCode.slice(1)}
          </option>
        ))}
      </Select>
      </div>
    </Container>
  );
};

export default Settings;