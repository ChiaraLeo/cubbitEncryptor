import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ConstString } from 'language/encryptStrings'
import { CubbitReduxStore } from '_redux'
import { setLanguage } from '_redux/Modules/Generic/Actions'
import Switch from '../Switch'
import Translator from '../Translator'

const SwitchLanguage = () => {
  const dispatch = useDispatch()
  const language = useSelector((state: CubbitReduxStore) => state.generic.language)

  const setLang = useCallback((isChecked: boolean) => {
    dispatch(setLanguage(isChecked ? 'decrypted' : 'encrypted'))
  }, [dispatch, setLanguage])

  return <Switch
    onChange={setLang}
    checked={language === 'encrypted'}
    label1={Translator({ constant: ConstString.SWITCHLABEL1 })}
    label2={Translator({ constant: ConstString.SWITCHLABEL2 })} />
}

export default SwitchLanguage
