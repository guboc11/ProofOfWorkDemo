export default function Block({block, isCurrentBlock}) {
  return (
    <div>
      {isCurrentBlock 
      ? 
      <div>
        <div className='min-w-80 border-green-600 border-4 m-2 p-6'>
          <div className="border-gray-400 border-2 flex justify-center">
            <p>prevBlockHash : <span className='text-red-500'>{block.prevBlockHash}</span></p>
          </div>
          <p>block number : {block.blockNumber}</p>
          {/* <p>transactions : {block.transactions}</p> */}
          <div className="border-gray-400 border-2">
            <p>transactions :</p>
            {block.transactions.map((tx)=>(<p className="text-red-500">{tx}</p>))}
          </div>
          <p>nonce : <span className='text-green-500'>{block.nonce}</span></p>
        </div>
        <div className="flex justify-center">
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAACpqamGhobQ0NDOzs7S0tLLy8vV1dXa2tr09PTp6ekmJibw8PDe3t4jIyNGRka1tbWdnZ2Ojo53d3d9fX1lZWXDw8MwMDAJCQkSEhIYGBg+Pj7j4+NOTk6ZmZlYWFhxcXGxsbEvLy+iDymNAAAFBUlEQVR4nO2d63LiMAxGCdALoS13eqNbaN//HReXzVIgcSRZsf0xOn874+j0k+LAMHGvF49ytpw+FJPpbvYY8arxGK2LI9vb1OWoUy6LU3Zl6pJ0Gb8U50yeUhelydOFn2OYuiw9ykmtYTFOXZgaf+oFi03qwrSYNQgWxTx1aUo8NBoW17ExNkd4LSGuPYYvqYtTwSN4HW166zV8Tl2eAs9ew1nq8hTw3WiK4jN1eQr0vYaD1OUpYIb4mCE+ZoiPGeJjhviYIT5miI8Z4mOG+JghPmaIjxniY4b4mCE+ZoiPGeJjhviYIT5miI8Z4mOG+JghPmaIjxniY4b4mCE+ZoiPGeJjhviYIT5miI8Z4mOG+JghPmaIjxniY4b4mCE+ZoiPGeJjhviYIT5miI8Z4mOG+JghPmaIjxniY4b4mCE+mRuWw/lgtVr0A84T6czwqb9YrQbzYchxLqP1/6M3NgPp++G7MXwcbKolJuuRcJHx2Sv/F7JlOjFcnK6yFp12cvm2+BfROh0Y1pzLI3g//7ymnFfJ2Tf6hsPXmoXYJ2V81Rd0w69H3fCmfqUv3iqNRzbwU9Q2bCyNdwzYW2NJd9yKlA0bEtzzplUVV1HX8M6zVp+xzruvKGajqhp6Dzx5p6/j+0exFTUN/Se6MNpr5V+I16iKhs0zeGBFXmnTshJLUc9w2FYW+ZSzR+8Y/sBoVDXDlhbd8059dh63LsXZ+rUMWxMs6IfxfRDWojeqkmHbDP7wQVyMkiE9RR3D9hZ1UDMsPYfd/YI4iyqG96SKHsgfhptOZDyD1qgahpQZ3POHKtj7pC1IU1QwJAoyDgCj9URBa9RwQ3I592TD3pS6JuF2E2xIu8nsmdIF6YsSGjXUkNqizA+IW/KyrSkGGtL/2VuOIHXDcLTNYpgheQYZW8WB+lOYa2lp1CBDeoIF+0tr0lMSRTHEkCEo+BqQPuH+1QMM6S0qO+NbSVFu2LWgVqOKDRktKvgal32NZkWpIePivG9KT2Ck2NgnQsMR/dLiBB2MWWy6jsyw+xmsCJ9FkWGMGawITlFiGC9BpmLt1QSGjBlUEAxuVL4hI8HgFj3ASLFGkW0Yt0XZipfX5BrGbtEDIU/ATEOGYMBGf0nALPIM489ghfwBjmXIEFRN0CGeRY5hmhkUKJ70D8MwraB4FumG6WawQpYi2TB1gkzFYw1UQ8Z3X50JyhqVaJi+RQ8IHuBohike1YIVhwzDPFr0APuzKcUw1aNaPdxZJBjmMoMVzBTbDfNK0MGbxVbDnGZQoHjXapjDRh+keNvwa+N/LHJMkKm48/512/4LsySCrNuNEpFuMkcYm4YKUbaJU+KmGD1BB2MWg4k8g/EVEwnGm8UEM1gRJ8VkCcZSTCoYQzGxYPeKyQW7VsxAsNutP8lGf0l3m0bCbeKUrlLMJEFHN7OYxQxWdKGYlWAXipkJ6itmJ6h9u8noJnNEM8UME3ToKWYqqKeYraDWLGY5gxUaD3DZPKrVE55i1gk6Qmcx4xmsCFMEEAxThBAMUQQRlN9usr/JHJGlCJOgQ5IiUIIOfopQCTq4KYIl6OClCJegg5MiYIIOuiKoIL1RIVv0AE0RWJCmCC1ImUXYGaxoSxE8QYc/RfgEHb4UryBBR3OKV5GgoynFK0nQUZ/i1STo+Pi+8PsWvXc5X8rdmeAy5EXjeXL/+81M4peM5005W04nxWS6nMXM7y8QZUPMUh1JUwAAAABJRU5ErkJggg=="
            width={30}
          />
          <p>Block 내용을 Hash값에 넣은 결과</p>
        </div>
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
        <div className="border-gray-400 border-2">
          <p>transactions :</p>
          {block.transactions.map((tx)=>(<p>{tx}</p>))}
        </div>
        <p>nonce : {block.nonce}</p>
        <div className="border-gray-400 border-2 flex justify-center">
          <p>blockHash : <span className='text-red-500'>{block.currentBlockHash}</span></p>
        </div>
      </div>
      }
    </div>
  )
}