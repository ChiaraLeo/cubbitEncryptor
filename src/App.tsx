import React from 'react'
import './App.css'
import AppBar from './components/AppBar'
import Typography from './components/Typography'
import { ConstString } from './language/encryptStrings'
import UploadFile from './pages/UploadFile'
import DownloadFile from 'pages/DownloadFile'
import DowloadDecrypt from 'pages/DownloadAndDecrypt'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Routes } from './routes'
import styled from 'styled-components'

function App () {
  return (
    <Router>
      <div>
        <header>
          <AppBar />
        </header>
        <main className='App-main'>
          <Typography constant={ConstString.TITLE} variant='title' />
          <Switch>
            <Route exact path='/'>
              <Redirect to={Routes.UPLOAD_FILE} />
            </Route>
            <Route exact path={Routes.UPLOAD_FILE}>
              <UploadFile />
            </Route>
            <Route exact path={Routes.DOWNLOAD_FILE}>
              <DownloadFile />
            </Route>
            <Route exact path={Routes.DOWNLOAD_DECRYPT_FILE}>
              <DowloadDecrypt />
            </Route>
          </Switch>
          <PositionatedFooter>
            <Typography constant={ConstString.FOOTER} variant='caption' />
          </PositionatedFooter>
        </main>

      </div>

    </Router>
  )
}

const PositionatedFooter = styled.div`
margin-top: auto;
margin-bottom: 24px;
`

export default App
