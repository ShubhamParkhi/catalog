import { useBitcoin } from '../context/BitcoinContext';
import { Container, Paragraph } from './BitcoinDataFetcher';

const currencySymbols: Record<string, string> = {
  usd: '$',
  inr: '₹',
  eur: '€',
  aed: 'د.إ',
  ars: 'ARS',
  aud: 'A$',
  bch: 'BCH',
  bdt: '৳',
  bhd: 'BD',
  bmd: '$',
  bnb: 'BNB',
  brl: 'R$',
  btc: '₿',
  cad: 'C$',
  chf: 'CHF',
  clp: 'CLP$',
  cny: '¥',
  czk: 'Kč',
  dkk: 'kr',
  dot: 'DOT',
  eos: 'EOS',
  eth: 'Ξ',
  gbp: '£',
  gel: '₾',
  hkd: 'HK$',
  huf: 'Ft',
  idr: 'Rp',
  ils: '₪',
  jpy: '¥',
  krw: '₩',
  kwd: 'KD',
  lkr: 'Rs',
  ltc: 'Ł',
  mmk: 'K',
  mxn: 'MX$',
  myr: 'RM',
  ngn: '₦',
  nok: 'kr',
  nzd: 'NZ$',
  php: '₱',
  pkr: '₨',
  pln: 'zł',
  rub: '₽',
  sar: '﷼',
  sek: 'kr',
  sgd: 'S$',
  thb: '฿',
  try: '₺',
  twd: 'NT$',
  uah: '₴',
  vef: 'Bs',
  vnd: '₫',
  xag: 'XAG',
  xau: 'XAU',
  xdr: 'XDR',
  xlm: 'XLM',
  xrp: 'XRP',
  yfi: 'YFI',
  zar: 'R',
  bits: 'Bits',
  link: 'LINK',
  sats: 'Sats'
};

const BitcoinStatistics = () => {
  const { bitcoinData, error, isLoading, currency } = useBitcoin();

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  if (isLoading || !bitcoinData) {
    return <Container>Loading...</Container>;
  }

  const symbol = currencySymbols[currency] || '';

  return (
    <Container>
      <Paragraph><strong>Current Price:</strong> {symbol}{bitcoinData.market_data.current_price[currency]}</Paragraph>
      <Paragraph><strong>ATH:</strong> {symbol}{bitcoinData.market_data.ath[currency]}</Paragraph>
      <Paragraph><strong>Market Cap:</strong> {symbol}{bitcoinData.market_data.market_cap[currency]}</Paragraph>
      <Paragraph><strong>Circulating Supply:</strong> {bitcoinData.market_data.circulating_supply}</Paragraph>
      <Paragraph><strong>Sentiment Votes Up:</strong> {bitcoinData.sentiment_votes_up_percentage}%</Paragraph>
      <Paragraph><strong>Sentiment Votes Down:</strong> {bitcoinData.sentiment_votes_down_percentage}%</Paragraph>
    </Container>
  );
};

export default BitcoinStatistics;