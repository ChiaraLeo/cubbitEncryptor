import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ConstString } from 'language/encryptStrings'
import { CubbitReduxStore } from '_redux'
import { setLanguage } from '_redux/Modules/Generic/Actions'
import Switch from '../Switch'
import useTranslate from 'customHooks/useTranslate'

const SwitchLanguage = () => {
  const dispatch = useDispatch()
  const language = useSelector((state: CubbitReduxStore) => state.generic.language)
  const [label1, label2] = useTranslate([ConstString.SWITCHLABEL1, ConstString.SWITCHLABEL2])
  const setLang = useCallback((isChecked: boolean) => {
    dispatch(setLanguage(isChecked ? 'decrypted' : 'encrypted'))
  }, [dispatch])

  return <Switch
    onChange={setLang}
    checked={language === 'encrypted'}
    label1={label1}
    label2={label2} />
}

export default SwitchLanguage
