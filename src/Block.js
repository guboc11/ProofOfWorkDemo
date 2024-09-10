export default function Block({block, isCurrentBlock}) {
  return (
    <div>
      {isCurrentBlock 
      ? 
      <div className='min-w-80 border-green-600 border-4 m-2 p-6'>
        <p>prevBlockHash : <span className='text-red-500'>{block.prevBlockHash}</span></p>
        <p>block number : {block.blockNumber}</p>
        {/* <p>transactions : {block.transactions}</p> */}
        <p>transactions :</p>
        {block.transactions.map((tx)=>(<p>{tx}</p>))}
        <p>nonce : <span className='text-green-500'>{block.nonce}</span></p>
        <p>currentBlockHash : <span className='text-green-500'>{block.currentBlockHash}</span></p>
      </div>
      : 
      <div className='min-w-80 border-black border-4 m-2 p-6'>
        <p>prevBlockHash : <span className='text-red-500'>{block.prevBlockHash}</span></p>
        <p>block number : {block.blockNumber}</p>
        {/* <p>transactions : {block.transactions}</p> */}
        <p>transactions :</p>
        {block.transactions.map((tx)=>(<p>{tx}</p>))}
        <p>nonce : {block.nonce}</p>
        <p>blockHash : <span className='text-red-500'>{block.currentBlockHash}</span></p>
      </div>
      }
    </div>
  )
}