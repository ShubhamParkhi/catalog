import { useBitcoin } from '../context/BitcoinContext';
import { Container, Paragraph } from './BitcoinDataFetcher';

const BitcoinStatistics = () => {
  const { bitcoinData, error, isLoading } = useBitcoin();

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  if (isLoading || !bitcoinData) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Paragraph><strong>Current Price:</strong> ${bitcoinData.market_data.current_price.usd}</Paragraph>
      <Paragraph><strong>ATH:</strong> ${bitcoinData.market_data.ath.usd}</Paragraph>
      <Paragraph><strong>Market Cap:</strong> ${bitcoinData.market_data.market_cap.usd}</Paragraph>
      <Paragraph><strong>Circulating Supply:</strong> {bitcoinData.market_data.circulating_supply}</Paragraph>
      <Paragraph><strong>Sentiment Votes Up:</strong> {bitcoinData.sentiment_votes_up_percentage}%</Paragraph>
      <Paragraph><strong>Sentiment Votes Down:</strong> {bitcoinData.sentiment_votes_down_percentage}%</Paragraph>
    </Container>
  );
};

export default BitcoinStatistics;