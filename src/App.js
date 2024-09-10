import './App.css';
import { useState, useEffect, useRef } from 'react';
import Hashes from 'jshashes';
import Block from './Block';
import Tx from './Tx';

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
    const txstr = "from " + from + " to " + to + " amount : " + amount + "BTC" + " sign : " + from + "'s sign";
    setTx(txstr);
  },[from, to, amount])


  return (
    <div>
      <div className='p-2 mb-4'>
        <h1 className='text-3xl my-auto'>난이도 선택(숫자가 낮을 수록 높은 난이도)</h1>
        <select className='border-black border-2 p-3' onChange={(e)=>{setDifficultyNumber(parseInt(e.target.value, 16))}}>
          <option value="0x0FFFFFFF">0x0FFFFFFF</option>
          <option value="0x0bFFFFFF">0x0bFFFFFF</option>
          <option value="0x07FFFFFF">0x07FFFFFF</option>
          <option value="0x03FFFFFF">0x03FFFFFF</option>
          <option value="0x00FFFFFF">0x00FFFFFF</option>
        </select>
      </div>

      <div className='p-2'>
        <h1 className='text-3xl mb-3'>생성된 Block & Transaction 정보</h1>
        <div className='border-black border-2 flex mb-3'>
          <div className='w-[350px]'>
            <div className='flex justify-center'>
              <h1 className='text-2xl'>현재 블록 (Block Number :{block.blockNumber})</h1>
            </div>
            <div className='p-4 flex justify-center'>
              <Block block={block} isCurrentBlock={true}></Block>
            </div>
          </div>
          <div className='w-[220px] mr-10'>
            <div className='flex justify-center'>
              <h1 className='text-2xl'>사용한 Hash값 모음</h1>
            </div>
            <div className='h-80 border-black border-2 m-2 overflow-y-scroll pl-2'>
              {blockHashArray.map((blockHash, index) => {
                if (blockHash.isBlockAnswer == false) {
                  return <div className='flex justify-center' key={index}>{blockHash.blockHash}</div>
                } else {
                  return <div className='text-red-500 flex justify-center' key={index}>{blockHash.blockHash}</div>
                }
              }
              )}
            </div>
          </div>

          <Tx from={from} to={to} amount={amount} tx={tx} transactionPool={transactionPool}
            setFrom={setFrom} setTo={setTo} setAmount={setAmount} setTx={setTx} setTransactionPool={setTransactionPool}
          />
        </div>
        <h1 className='text-3xl mb-2'>지금까지 만들어진 블록</h1>
        <div className='min-h-48 border-black border-2 overflow-x-scroll flex'>
          {blocks.map((block, index) => (
            <Block block={block}></Block>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
