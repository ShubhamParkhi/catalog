import React from 'react';
import { useBitcoin } from '../context/BitcoinContext';
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

const BitcoinSettings = () => {
  const { currency, setCurrency } = useBitcoin();

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  return (
    <Container>
      <Label htmlFor="currency-select">Select Currency:</Label>
      <Select id="currency-select" value={currency} onChange={handleCurrencyChange}>
        <option value="usd">USD</option>
        <option value="inr">INR</option>
        <option value="eur">EUR</option>
        <option value="aed">AED</option>
      </Select>
    </Container>
  );
};

export default BitcoinSettings;