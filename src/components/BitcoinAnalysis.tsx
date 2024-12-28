import { useBitcoin } from '../context/BitcoinContext';
import { Container, Paragraph } from './BitcoinDataFetcher';

const BitcoinAnalysis = () => {
  const { bitcoinData, error, isLoading } = useBitcoin();

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  if (isLoading || !bitcoinData) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Paragraph><strong>Market Cap Rank:</strong> {bitcoinData.market_cap_rank}</Paragraph>
      <Paragraph><strong>Hashing Algorithm:</strong> {bitcoinData.hashing_algorithm}</Paragraph>
      <Paragraph><strong>Genesis Date:</strong> {bitcoinData.genesis_date}</Paragraph>
    </Container>
  );
};

export default BitcoinAnalysis;