import React from 'react';
import { useCoin } from '../context/Context';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-right: 10px;
`;

const Select = styled.select`
  font-size: 18px;
  padding: 5px;
`;

const Settings = () => {
  const { data, currency, setCurrency, coin, setCoin } = useCoin();

  const currencies = data?.market_data?.current_price;
  const coins = data?.market_data?.current_price;

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const handleCoinChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCoin(event.target.value);
  };

  return (
    <Container>
      <Label htmlFor="coin-select">Select Coin:</Label>
      <Select id="coin-select" value={coin} onChange={handleCoinChange}>
        {coins && Object.keys(coins).map((coinCode) => (
          <option key={coinCode} value={coinCode}>
            {coinCode.toUpperCase()}
          </option>
        ))}
      </Select>
      <Label htmlFor="currency-select">Select Currency:</Label>
      <Select id="currency-select" value={currency} onChange={handleCurrencyChange}>
        {currencies && Object.keys(currencies).map((currencyCode) => (
          <option key={currencyCode} value={currencyCode}>
            {currencyCode.toUpperCase()}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default Settings;