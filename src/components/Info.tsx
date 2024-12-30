import React from 'react';
import { useBitcoin } from '../context/Context';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-family: Circular Std;
  font-size: 70px;
  font-weight: 400;
`;

const Image = styled.img`
  margin-right: 20px;
  width: 50px;
  height: auto;
  object-fit: contain;
`;

const PriceChange = styled(Title)<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? '#67BF6B' : 'red')};
  font-size: 18px;
  font-weight: 400;
  line-height: 22.77px;
  text-align: left;
`;

const Currency = styled.span`
  font-size: 24px;
  color: #BDBEBF;
  font-weight: 400;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  font-family: 'Circular Std', sans-serif;
  font-size: 24px;
  font-weight: 400;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  color: #6F7177;
  padding: 1rem 2rem;
  ${({ isSelected }) =>
    isSelected &&
    `
    border-bottom: 3px solid #4B40EE;
    color: #1A243A;
  `}
`;

const ButtonGroup = styled.div`
  border-bottom: 2px solid #EFF1F3;
`;

interface BitcoinInfoProps {
  setActiveComponent: (component: string) => void;
  activeComponent: string;
}

const BitcoinInfo: React.FC<BitcoinInfoProps> = ({ setActiveComponent, activeComponent }) => {
  const { data, error, isLoading, currency } = useBitcoin();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { image, market_data } = data;
  const { current_price, price_change_24h, price_change_percentage_24h } = market_data;

  return (
    <>
      <Container>
        <Image src={image.large} alt="Bitcoin" />
        <div>
          <Title>
            {current_price[currency]}
            <Currency>{currency.toUpperCase()}</Currency>
          </Title>
          <PriceChange isPositive={parseFloat(price_change_24h) >= 0}>
            {price_change_24h} ({price_change_percentage_24h}%)
          </PriceChange>
        </div>
      </Container>
      <ButtonGroup>
        {['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'].map((component) => (
          <StyledButton
            key={component}
            isSelected={activeComponent === component}
            onClick={() => setActiveComponent(component)}
          >
            {component}
          </StyledButton>
        ))}
      </ButtonGroup>
    </>
  );
};

export default BitcoinInfo;
