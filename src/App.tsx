import { useState } from 'react';
import { Provider } from './context/Context';
import Summary from './components/Summary';
import Chart from './components/Chart';
import Info from './components/Info';
import Statistics from './components/Statistics';
import Analysis from './components/Analysis';
import Settings from './components/Settings';
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
        return <Summary />;
      case 'Chart':
        return <Chart />;
      case 'Statistics':
        return <Statistics />;
      case 'Analysis':
        return <Analysis />;
      case 'Settings':
        return <Settings />;
      default:
        return <Summary />;
    }
  };

  return (
    <Provider>
      <Container>
        <Info {...{setActiveComponent, activeComponent}} />
        {renderComponent()}
      </Container>
    </Provider>
  );
}

export default App;
