

const sumCodKey = (key: string) => {
  return Array.from(key).reduce((acc, current) => acc+= current.charCodeAt(0), 0)
}

const shiftDownChar = (char: string, position: number) => {
  const decimalCodeChar = char.charCodeAt(0)
  const substractDecimal = position % 94
  let decimalCodeShifted = decimalCodeChar - substractDecimal
  if(decimalCodeShifted < 32) {
    const diff = 32 - decimalCodeShifted
    decimalCodeShifted = 126 - diff
  }
  return String.fromCodePoint(decimalCodeShifted)
}

const shiftUpChar = (char: string, position: number) => {
  const decimalCodeChar = char.charCodeAt(0)
  const substractDecimal = position % 94
  let decimalCodeShifted = decimalCodeChar + substractDecimal
  if(decimalCodeShifted > 125) {
    const diff = decimalCodeShifted - 126
    decimalCodeShifted = 32 + diff
  }
  return String.fromCodePoint(decimalCodeShifted)
}

const shiftDownChunk = (string: string, position: number) => {
  return Array.from(string).map(char => shiftDownChar(char, position))
}

const shiftUpChunk = (string: string, position: number) => {
  return Array.from(string).map(char => shiftUpChar(char, position))
}

export const decrypt = (props: { key?: string, text?: string }) : string => {
  const { key = process.env.REACT_APP_KEY_DECRYPT || 'none', text = `|s*s'u&{$(` } = props
  const sumKey = sumCodKey(key)
  const decriptedString = shiftDownChunk(text, sumKey).join('')
  return decriptedString
}

export const encrypt = (props: { key?: string, text?: string }) : string => {
  const { key = process.env.REACT_APP_KEY_DECRYPT || 'none', text = `javascript` } = props
  const sumKey = sumCodKey(key)
  const decriptedString = shiftUpChunk(text, sumKey).join('')
  return decriptedString
}