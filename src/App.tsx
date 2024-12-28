import { useState } from 'react';
import { BitcoinProvider } from './context/BitcoinContext';
import BitcoinSummary from './components/BitcoinDataFetcher';
import BitcoinChart from './components/BitcoinChart';
import BitcoinInfo from './components/BitcoinInfo';
import BitcoinStatistics from './components/BitcoinStatistics';
import BitcoinAnalysis from './components/BitcoinAnalysis';
import BitcoinSettings from './components/BitcoinSettings';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Circular Std;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  border: 1px solid lightgray;
  border-radius: 0.75rem; 
  background-color: #ffffff; 
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  height: 80vh;
  overflow: hidden;
  overflow-y: scroll;
`;

function App() {
  const [activeComponent, setActiveComponent] = useState('Chart');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Summary':
        return <BitcoinSummary />;
      case 'Chart':
        return <BitcoinChart />;
      case 'Statistics':
        return <BitcoinStatistics />;
      case 'Analysis':
        return <BitcoinAnalysis />;
      case 'Settings':
        return <BitcoinSettings />;
      default:
        return <BitcoinSummary />;
    }
  };

  return (
    <BitcoinProvider>
      <Container>
        <BitcoinInfo {...{setActiveComponent, activeComponent}} />
        {renderComponent()}
      </Container>
    </BitcoinProvider>
  );
}

export default App;
