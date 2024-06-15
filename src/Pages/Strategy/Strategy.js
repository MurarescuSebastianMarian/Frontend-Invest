import './Strategy.css';

const Strategy = () => {
  const instruments = [
    {
      id: 1,
      value: 'instrument 1',
    },
    {
      id: 2,
      value: 'instrument 2',
    },
    {
      id: 3,
      value: 'instrument 3',
    },
    {
      id: 4,
      value: 'instrument 4',
    },
    {
      id: 5,
      value: 'instrument 5',
    },
    {
      id: 6,
      value: 'instrument 6',
    },
  ]

  return (
    <div className="Strategy">
      <div className='Strategy_SideMenu'>
        {
          instruments.map((instrument, index) => {
            return <div key={index} className='Strategy_SideMenu_Instrument'>{instrument.value}</div>;
          })
        }
      </div>
      <div className='Strategy_Content'>
        Content
      </div>
    </div>
  );
}

export default Strategy;
