import { useEffect, useState } from 'react';
import './Strategy.css';
import { useNavigate } from 'react-router-dom';

const Strategy = () => {
  const token = localStorage.getItem('accessToken');
  const [dataInstruments, setDataInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const navigate = useNavigate();

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
  }, []);

  return (
    <div className="Strategy">
      <div className='Strategy_SideMenu'>
        {
          dataInstruments.map((instrument, index) => {
            return (
              <div 
                key={index} 
                className='Strategy_SideMenu_Instrument'
                onClick={() => setSelectedInstrument(instrument)}
              >
                {instrument.name}
              </div>
            );
          })
        }
      </div>
      <div className='Strategy_Content'>
        {selectedInstrument ? (
          <div>{selectedInstrument.description}</div>
        ) : (
          <div>Select an instrument to see the description.</div>
        )}
      </div>
    </div>
  );
}

export default Strategy;
