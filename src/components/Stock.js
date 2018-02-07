import React from 'react'
import 'styles/Stock.sass'

const Stock = ({stock, getCard, pushPast, entering, toggleEntering}) => {
  const toField = stock.filter((stock, i) => (i + 1) % 10 === 0).map((stock, j) => {
    const style = {
      left: `${10 + (j * 20)}px`
    }
    return (
      entering ? <button key={j} style={style}></button> :
      <button
        key={j}
        style={style}
        onClick={() => {
          toggleEntering()
          pushPast()
          getCard(1)
          setTimeout(() => {
            toggleEntering()
          }, 1000)
        }}
      >
      </button>
    )}
  )

  return (
    <div className="stock">
      {toField}
    </div>
  )
}

export default Stock
