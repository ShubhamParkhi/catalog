import { useState, useRef, useMemo } from 'react';
import { useCoin } from '../context/Context';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import styled from 'styled-components';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Container = styled.div`
  padding: 2rem 0;
  background-color: white;
`;

const StyledButton = styled.button<{ isSelected?: boolean }>`
  font-family: 'Circular Std', sans-serif;
  font-size: 24px;
  font-weight: 400;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 1rem 2rem;
  color: #6F7177;
  gap: 0.5rem;
  display: inline-flex;
  justify-content: center;
  ${({ isSelected }) =>
        isSelected &&
        `
    color: white;
    background-color: #4B40EE;
    border-radius: 1rem;
  `}
`;

const ButtonGroup = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 0 1rem;
`;

const Chart = () => {
    const { coin, marketChartData, isLoading, error, time, setTime, currency } = useCoin();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            chartRef.current?.requestFullscreen().then(() => {
                setIsFullScreen(true);
            }).catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullScreen(false);
            }).catch(err => {
                console.error(`Error attempting to exit full-screen mode: ${err.message}`);
            });
        }
    };

    const data = useMemo(() => ({
        labels: marketChartData?.prices.map(price =>
            new Date(price[0]).toLocaleDateString()
        ),
        datasets: [
            {
                label: `${coin.charAt(0).toUpperCase() + coin.slice(1)} Price (${currency.toUpperCase()})`,
                data: marketChartData?.prices.map(price => price[1]),
                borderColor: 'rgba(75, 64, 238, 1)',
                tension: 0.5
            }
        ]
    }), [marketChartData, currency]);

    const options = useMemo(() => ({
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: true
                },
                ticks: {
                    display: false,
                    font: {
                        size: 14
                    },
                    stepSize: 2
                }
            },
            y: {
                grid: {
                    display: true
                },
                ticks: {
                    display: false,
                    font: {
                        size: 14
                    }
                }
            }
        }
    }), []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading || !marketChartData) {
        return <div>Loading chart data...</div>;
    }

    return (
        <Container ref={chartRef}>
            <ButtonGroup>
                <div>
                    <StyledButton onClick={toggleFullScreen}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3H21V9" stroke="#6F7177" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 21H3V15" stroke="#6F7177" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 3L14 10" stroke="#6F7177" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 21L10 14" stroke="#6F7177" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                    </StyledButton>
                    <StyledButton>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6F7177" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8V16" stroke="#6F7177" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 12H16" stroke="#6F7177" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Compare
                    </StyledButton>
                </div>
                <div>
                    {[1, 3, 7, 30, 180, 365].map((duration) => (
                        <StyledButton
                            key={duration}
                            isSelected={time === duration}
                            onClick={() => setTime(duration)}
                        >
                            {duration === 1 ? '1d' : duration === 3 ? '3d' : duration === 7 ? '1w' : duration === 30 ? '1m' : duration === 180 ? '6m' : '1y'}
                        </StyledButton>
                    ))}
                </div>
            </ButtonGroup>
            <Line {...{ options, data }} />
        </Container>
    );
};

export default Chart; 