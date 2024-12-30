import { useBitcoin } from '../context/Context';
import { Container, Paragraph } from './DataFetcher';

const BitcoinAnalysis = () => {
  const { data, error, isLoading } = useBitcoin();

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  if (isLoading || !data) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Paragraph><strong>Market Cap Rank:</strong> {data.market_cap_rank}</Paragraph>
      <Paragraph><strong>Hashing Algorithm:</strong> {data.hashing_algorithm}</Paragraph>
      <Paragraph><strong>Genesis Date:</strong> {data.genesis_date}</Paragraph>
    </Container>
  );
};

export default BitcoinAnalysis;