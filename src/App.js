import './App.css';
import { useState, useEffect, useRef } from 'react';
import Hashes from 'jshashes';
import Block from './Block';

function sha1To32BitHex(str) {
  var SHA1 = new Hashes.SHA1
  var hashNumberHexString = SHA1.hex(str);
  console.log("hash number string", hashNumberHexString)
  var hashNumber32bit = Number("0x"+hashNumberHexString) % 0xFFFFFFFF;
  console.log("hash number 32 bit", hashNumber32bit)
  return hashNumber32bit
}

function App() {

  // 현재 블록 넘버
  const [blockNumber, setBlockNumber] = useState(0);
  // 현재 블록에 추가 된 tx 내용들
  const [transactionPool, setTransactionPool] = useState([]);
  // 현재 nonce 값
  const [nonce, setNonce] = useState(0);
  // 현재 tx 내용들
  const [tx, setTx] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  // 지난 block 해시값
  const [prevBlockHash, setPrevBlockHash] = useState("0x0");
  // 현재 block 내용
  const [block, setBlock] = useState({
    prevBlockHash: prevBlockHash,
    blockNumber: blockNumber,
    transactions: [],
    nonce: nonce,
    currentBlockHash: "0x0"
  })

  const [difficultyNumber, setDifficultyNumber] = useState(0x0FFFFFFF);


  // block 내용을 hash값에 넣고 뽑아낸 결과값 모음
  const [blockHashArray, setBlockHashArray] = useState([]);

  // 지금까지 생성된 block 모음
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNonce((prevNonce) => (prevNonce + 1));
      // console.log("nonce : ", nonce)
      // console.log("block 1",block)
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    var block = {
      prevBlockHash: prevBlockHash,
      blockNumber : blockNumber,
      transactions : transactionPool.slice(0,2),
      nonce : nonce,
      currentBlockHash: ""
    }

    var blockString = JSON.stringify(block);
    var hashNumber32bit = sha1To32BitHex(blockString)
    var hashNumber32bitHexString = "0x"+hashNumber32bit.toString(16).padStart(8, '0')

    var blockHashObject = {
      blockHash: hashNumber32bitHexString,
      isBlockAnswer: false,
    }

    block.currentBlockHash = hashNumber32bitHexString;
    setBlock(block);

    // if (hashNumber32bit < 0x0FFFFFFF) {
    if (hashNumber32bit < difficultyNumber) {
      setPrevBlockHash(hashNumber32bitHexString);
      block.transactions.push("from 0x to miner amount : 50BTC")
      setBlocks([...blocks, block])
      setBlockNumber(blockNumber+1);
      setNonce(0);
      setTransactionPool((prevTxs)=>(
        prevTxs.slice(2)
      ))
      blockHashObject.isBlockAnswer = true;
    }

    setBlockHashArray([...blockHashArray, blockHashObject])

  },[nonce])

  useEffect(()=>{
    const txstr = "from " + from + " to " + to + " amount : " + amount + "BTC";
    setTx(txstr);
  },[from, to, amount])


  return (
    <div>
      <div>
        <h1 className='text-2xl'>난이도 선택</h1>
        <select className='ml-4 border-black border-2 p-3' onChange={(e)=>{setDifficultyNumber(parseInt(e.target.value, 16))}}>
          <option value="0x0FFFFFFF">0x0FFFFFFF</option>
          <option value="0x0bFFFFFF">0x0bFFFFFF</option>
          <option value="0x07FFFFFF">0x07FFFFFF</option>
          <option value="0x03FFFFFF">0x03FFFFFF</option>
          <option value="0x00FFFFFF">0x00FFFFFF</option>
        </select>


      </div>
      <div>
        <h1 className='text-2xl'>사용한 hash값 모음</h1>
      </div>
      <div className='h-80 border-black border-2 m-2 overflow-y-scroll'>
        {blockHashArray.map((blockHash, index) => {
          if (blockHash.isBlockAnswer == false) {
            return <div key={index}>{blockHash.blockHash}</div>
          } else {
            return <div className='text-red-500' key={index}>{blockHash.blockHash}</div>
          }
        }
        )}
      </div>
      <div>
        <h1 className='text-2xl'>Transaction Pool</h1>
      </div>
      <div>
        <textarea 
          className='border-2 border-black' 
          placeholder='From' 
          value={from}
          onChange={(e)=>{setFrom(e.target.value)}}>
        </textarea>
        <textarea 
          className='border-2 border-black' 
          placeholder='To' 
          value={to}
          onChange={(e)=>{setTo(e.target.value)}}>
        </textarea>
        <textarea 
          className='border-2 border-black' 
          placeholder='Amount' 
          value={amount}
          onChange={(e)=>{setAmount(e.target.value)}}>
        </textarea>
        <button 
          className='p-2 border-blue-500 border-2 rounded-xl' 
          onClick={()=>{
            setTransactionPool((prevTxs)=>{
              const newTxs = [...prevTxs, tx];
              setTx("");
              setFrom("");
              setTo("");
              setAmount("");
              return newTxs;
            });
            console.log("newTxs",transactionPool)
          }}>트랜잭션 추가하기
        </button>
        <div>
          {transactionPool.map((tx, index)=>{
            return <p>{tx}</p>
          })}
        </div>
      </div>
      <div>
        <h1 className='text-2xl'>생성된 Block 모음</h1>
      </div>
      <div className='border-black border-2 m-2 overflow-x-scroll flex'>
        {blocks.map((block, index) => (
          <Block block={block}></Block>
        ))}
        <Block block={block} isCurrentBlock={true}></Block>
      </div>
  </div>
  );
}

export default App;
