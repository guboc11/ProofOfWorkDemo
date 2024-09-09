import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // const [block, setBlock] = useState({height:1})
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumbers(prevNumbers => [...prevNumbers, prevNumbers.length + 1]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
    {numbers.map((number, index) => (
      <div key={index}>{number}</div>
    ))}
  </div>
  );
}

export default App;
