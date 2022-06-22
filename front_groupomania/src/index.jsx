import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Error from './components/Error'
import SignupLogin from './pages/SignupLogin'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Header from './components/Header'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const GlobalStyle = createGlobalStyle`
    * {
      font-family: Montserra, Helvetica, sans-serif;
    }
    body {
      margin: 0;
    }
`

root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/fildactu" element={<Feed />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
