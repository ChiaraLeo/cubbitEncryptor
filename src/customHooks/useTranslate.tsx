import { ConstString } from 'language/encryptStrings'
import { translate } from 'language/languages'
import { useSelector } from 'react-redux'
import { CubbitReduxStore } from '_redux'

const selectState = (state: CubbitReduxStore) => ({
  language: state.generic.language
})

export default function useTranslate (costants: Array<ConstString>) {
  const { language } = useSelector(selectState)
  return costants.map(constant => translate(constant, language))
}
