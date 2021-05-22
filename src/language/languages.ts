import { Language } from '_redux/Modules/Generic/types'
import { encrypt } from 'utils'
import { ConstString, encryptStrings } from './encryptStrings'

export const translate = (constant: ConstString, language: Language) => {
  if (language === 'decrypted') {
    return encryptStrings[constant]
  } else {
    return encrypt({ text: encryptStrings[constant] })
  }
}
