export default function Tx({from, to, amount, tx, transactionPool, setFrom, setTo, setAmount, setTx, setTransactionPool,}) {
  return(
    <div>
      <div className='p-2 mb-4'>
        <div>
          <h1 className='text-2xl'>Transaction Pool</h1>
        </div>
        <div className='items-center flex gap-2'>
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
            className='p-2 border-blue-500 border-2 rounded-xl my-auto' 
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
        </div>
      </div>
      <div className='border-gray-300 border-2 p-4'>
        {transactionPool.map((tx, index)=>{
          if (index == 0 || index == 1) {
            return <p className='text-red-500'>{tx}</p>
          } else {
            return <p>{tx}</p>
          }
        })}
      </div>
    </div>
  )

}