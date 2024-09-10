export default function Block({block, isCurrentBlock}) {
  return (
    <div>
      {isCurrentBlock 
      ? 
      <div className='min-w-80 border-green-600 border-4 m-2 p-6'>
        <div className="border-gray-400 border-2 flex justify-center">
          <p>prevBlockHash : <span className='text-red-500'>{block.prevBlockHash}</span></p>
        </div>
        <p>block number : {block.blockNumber}</p>
        {/* <p>transactions : {block.transactions}</p> */}
        <p>transactions :</p>
        {block.transactions.map((tx)=>(<p>{tx}</p>))}
        <p>nonce : <span className='text-green-500'>{block.nonce}</span></p>
        <div className="border-gray-400 border-2 flex justify-center">
          <p>currentBlockHash : <span className='text-green-500'>{block.currentBlockHash}</span></p>
        </div>
      </div>
      : 
      <div className='min-w-80 border-black border-4 m-2 p-6'>
        <div className="border-gray-400 border-2 flex justify-center">
          <p>prevBlockHash : <span className='text-red-500'>{block.prevBlockHash}</span></p>
        </div>
        <p>block number : {block.blockNumber}</p>
        {/* <p>transactions : {block.transactions}</p> */}
        <p>transactions :</p>
        {block.transactions.map((tx)=>(<p>{tx}</p>))}
        <p>nonce : {block.nonce}</p>
        <div className="border-gray-400 border-2 flex justify-center">
          <p>blockHash : <span className='text-red-500'>{block.currentBlockHash}</span></p>
        </div>
      </div>
      }
    </div>
  )
}