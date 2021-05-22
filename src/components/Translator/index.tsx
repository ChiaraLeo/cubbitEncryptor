import React from 'react'
import { useSelector } from 'react-redux'
import { ConstString } from 'language/encryptStrings'
import { translate } from 'language/languages'
import { CubbitReduxStore } from '_redux'

const selectState = (state: CubbitReduxStore) => ({
  language: state.generic.language
})

const Translator = (props: { constant: ConstString }) => {
  const { constant } = props
  const { language } = useSelector(selectState)
  return translate(constant, language)
}

export default Translator
