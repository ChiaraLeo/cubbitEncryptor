import React from 'react'
import './App.css'
import AppBar from './components/AppBar'
import Typography from './components/Typography'
import { ConstString } from './language/encryptStrings'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <AppBar />
        <Typography constant={ConstString.TITLE} variant='title' />
        <Typography constant={ConstString.SUBTITLE} variant='subtitle' />
        <Typography constant={ConstString.FOOTER} variant='caption' />
      </header>

    </div>
  )
}

export default App
