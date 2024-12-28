import React from 'react';
import { useBitcoin } from '../context/BitcoinContext';
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

const PriceChange = styled(Title) <{ isPositive: boolean }>`
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
  cursor: pointer;
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
  const { bitcoinData, error, isLoading } = useBitcoin();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !bitcoinData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Image src={bitcoinData.image.large} alt="Bitcoin" />
        <div>
          <Title>
            {bitcoinData.market_data.current_price.usd}
            <Currency>USD</Currency>
          </Title>
          <PriceChange isPositive={parseFloat(bitcoinData.market_data.price_change_24h) >= 0}>
            {bitcoinData.market_data.price_change_24h} ({bitcoinData.market_data.price_change_percentage_24h}%)
          </PriceChange>
        </div>
      </Container>
      <ButtonGroup>
        <StyledButton isSelected={activeComponent === 'Summary'} onClick={() => setActiveComponent('Summary')}>Summary</StyledButton>
        <StyledButton isSelected={activeComponent === 'Chart'} onClick={() => setActiveComponent('Chart')}>Chart</StyledButton>
        <StyledButton isSelected={activeComponent === 'Statistics'} onClick={() => setActiveComponent('Statistics')}>Statistics</StyledButton>
        <StyledButton isSelected={activeComponent === 'Analysis'} onClick={() => setActiveComponent('Analysis')}>Analysis</StyledButton>
        <StyledButton isSelected={activeComponent === 'Settings'} onClick={() => setActiveComponent('Settings')}>Settings</StyledButton>
      </ButtonGroup>
    </>
  );
};

export default BitcoinInfo;
