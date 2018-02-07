export const constant = ({
  spider: 'spider'
})

export const shuffleStock = (stock, stockLength) => {
  const array = []

  for(let i=0;i<=stockLength;i++){
    array.push(stock.get(i))
  }

  for(let j=0;j<array.length;j++) {
    const random = Math.floor(Math.random() * stockLength)
    const temp = array[j]
    array[j] = array[random]
    array[random] = temp
  }
  return array
}

export const division = (arr, n) => {
  const length = arr.length
  const count = Math.floor(length / n)
  const temp = []

  for (let i=0;i<=count;i++) {
    if (n === 6 && i>3) {
      temp.push(arr.splice(0, n - 1))
    }
    else {
      temp.push(arr.splice(0, n))
    }
  }
  return temp
}

export const status = card => ({
  suit: card.substr(0, 1),
  value: Number(card.substr(1, card.length - 1)) % 13
})

export const getCardSuit = suit => {
  return suit === 'c' ? 'clubs' : suit === 'd' ? 'diamonds' : suit === 'h' ? 'hearts' : 'spades'
}

export const getCardValue = value => {
  return value === 12 ? 'king' : value === 11 ? 'queen' : value === 10 ? 'jack' :value === 0 ? 'ace' : value + 1
}
