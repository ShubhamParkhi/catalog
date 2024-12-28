import { useBitcoin } from '../context/BitcoinContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1em;
  margin: 10px 0;
`;

const Link = styled.a`
  display: block;
  margin: 10px 0;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BitcoinSettings = () => {
  const { bitcoinData, error, isLoading } = useBitcoin();

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  if (isLoading || !bitcoinData) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
    </>
  );
};

export default BitcoinSettings;