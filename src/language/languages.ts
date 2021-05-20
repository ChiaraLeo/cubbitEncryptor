import { Language } from '../redux/Modules/Generic/types'
import { decrypt } from '../utils'
import { ConstString, encryptStrings } from './encryptStrings'

export const translate = (constant: ConstString, language: Language) => {
  if (language === 'encrypted') {
    return encryptStrings[constant]
  } else {
    return decrypt({ text: encryptStrings[constant] })
  }
}
