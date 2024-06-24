import React, { useEffect, useState } from 'react';
import './Strategy.css';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';

const Strategy = () => {
  const token = localStorage.getItem('accessToken');
  const [dataInstruments, setDataInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [chartData, setChartData] = useState(null); // State pentru datele graficului
  const navigate = useNavigate();
  const [chart, setChart] = useState(null); // State pentru graficul Chart.js

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Token not found in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8081/api/instrument/getInstruments', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.completed) {
          localStorage.setItem('quizCompleted', true);
          navigate('/');
        }

        if (data) {
          setDataInstruments(data);
          // Select the first instrument by default if none is selected
          // if (!selectedInstrument && data.length > 0) {
          //   setSelectedInstrument(data[0]);
          // }
        } else {
          setError('Invalid response format.');
        }
      } catch (error) {
        setError(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate, selectedInstrument]);

  const handleInstrumentOnClick = async (instrument) => {
    setSelectedInstrument(instrument);
    console.log(instrument);

    try {
      const response = await fetch(`http://localhost:8081/api/instrument/getChart?symbol=${instrument.symbol}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const chartData = await response.json();
      console.log('Chart data:', chartData);
      
      setChartData(chartData); // Actualizăm starea cu datele primite pentru grafic
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setError('Failed to fetch chart data');
    }
  };

  useEffect(() => {
    // Dacă avem date pentru grafic, creăm și afișăm graficul folosind Chart.js
    if (chartData) {
      // Distrugem graficul vechi dacă există
      if (chart) {
        chart.destroy();
      }

      const labels = chartData.map(entry => entry.date);
      const data = chartData.map(entry => entry.close);

      const ctx = document.getElementById('myChart').getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels.reverse(), // Inversăm ordinea pentru a afișa cele mai recente date în stânga
          datasets: [{
            label: 'Closing Price',
            data: data.reverse(), // Inversăm ordinea pentru a afișa cele mai recente date în stânga
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      setChart(newChart); // Salvăm instanța noului grafic în stare
    }
  }, [chartData]);
console.log('selectedInstrument111',selectedInstrument);
  return (
    <div className="Strategy">
      <div className='Strategy_SideMenu'>
        {
          dataInstruments.map((instrument, index) => (
            <div 
              key={index} 
              className={`Strategy_SideMenu_Instrument ${selectedInstrument?.id === instrument?.id ? 'active' : ''}`}
              onClick={() => handleInstrumentOnClick(instrument)}
            >
              {instrument.name}
            </div>
          ))
        }
      </div>
      <div className='Strategy_Content'>
        {selectedInstrument ? (
          <div className="Strategy_Content_Description">
            <div>
              {selectedInstrument.description}
            </div>
            <div className="Strategy_Content_Description_Container">
              <div className="Strategy_Content_Description_Container_Item">
                <div className="Strategy_Content_Description_Container_Item_I">Country: </div> 
                <div className="Strategy_Content_Description_Container_Item_R">
                  {selectedInstrument.country}
                </div>
              </div>
              <div className="Strategy_Content_Description_Container_Item">
                <div className="Strategy_Content_Description_Container_Item_I">Price: </div> 
                <div className="Strategy_Content_Description_Container_Item_R">
                  {selectedInstrument.price}
                </div>
              </div>
              <div className="Strategy_Content_Description_Container_Item">
                <div className="Strategy_Content_Description_Container_Item_I">Fifty Two Week High: </div> 
                <div className="Strategy_Content_Description_Container_Item_R">
                  {selectedInstrument.fiftyTwoWeekHigh}
                </div>
              </div>
              
              <div className="Strategy_Content_Description_Container_Item">
                <div className="Strategy_Content_Description_Container_Item_I">Fifty Two Week Low: </div> 
                <div className="Strategy_Content_Description_Container_Item_R">
                  {selectedInstrument.fiftyTwoWeekLow}
                </div>
              </div>
              
              <div className="Strategy_Content_Description_Container_Item">
                <div className="Strategy_Content_Description_Container_Item_I">Two Hundred Ema: </div> 
                <div className="Strategy_Content_Description_Container_Item_R">
                  {selectedInstrument.twoHundredEma}
                </div>
              </div>
              
              <div className="Strategy_Content_Description_Container_Item">
                <div className="Strategy_Content_Description_Container_Item_I">RSI: </div> 
                <div className="Strategy_Content_Description_Container_Item_R">
                  {selectedInstrument.rsi}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="Strategy_Content_Select">Select an instrument to see the description.</div>
        )}

        {/* Renderează elementul canvas pentru grafic */}
        <div style={{ marginTop: '20px' }}>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
