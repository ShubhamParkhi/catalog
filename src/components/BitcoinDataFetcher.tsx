import { useBitcoin } from '../context/BitcoinContext';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
`;

export const Paragraph = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin: 10px 0;
`;

export const StyledDescription = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin: 10px 0;

  a {
    font-size: 24px;
    font-weight: 400;
  }
`;

const Link = styled.a`
  display: block;
  margin: 10px 0;
  font-size: 24px;
  font-weight: 400;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BitcoinSummary = () => {
  const { bitcoinData, error, isLoading } = useBitcoin();

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  if (isLoading || !bitcoinData) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Paragraph><strong>Name:</strong> {bitcoinData.name}</Paragraph>
      <Paragraph><strong>Symbol:</strong> {bitcoinData.symbol}</Paragraph>
      <StyledDescription dangerouslySetInnerHTML={{ __html: bitcoinData.description.en }} />
      <Link href={bitcoinData.links.homepage[0]} target="_blank" rel="noopener noreferrer">Homepage</Link>
      <Link href={bitcoinData.links.whitepaper} target="_blank" rel="noopener noreferrer">Whitepaper</Link>
    </Container>
  );
};

export default BitcoinSummary;