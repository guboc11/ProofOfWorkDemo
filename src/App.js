import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Hashes from 'jshashes';

function App() {
  var CRC32 = require("crc-32");

  const [hashNumbers, setHashNumbers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      var SHA1 = new Hashes.SHA1
      setHashNumbers(
        (prevHashNumbers) => {
          var str = "1" + prevHashNumbers.length
          
          var hashNumberHexString = SHA1.hex(str);
          console.log("hash number string", hashNumberHexString)
          var hashNumber32bit = Number("0x"+hashNumberHexString) % 0xFFFFFFFF;
          console.log("hash number 32 bit", hashNumber32bit)
          var hashNumber32bitHexString = "0x" + hashNumber32bit.toString(16).padStart(8, '0')
          console.log("hash number 32 bit hex string", hashNumber32bitHexString)


          return [...prevHashNumbers, hashNumber32bitHexString]
      });
      console.log(" ")
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
    {hashNumbers.map((number, index) => (
      <div key={index}>{number}</div>
    ))}
  </div>
  );
}

export default App;
