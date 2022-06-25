import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Error from './components/Error'
import SignupLogin from './pages/SignupLogin'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import LegalNotice from './pages/LegalNotice'
import Header from './components/Header'
import Footer from './components/Footer'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const GlobalStyle = createGlobalStyle`
    * {
      font-family: 'Montserrat', sans-serif;
    }

    body {
      max-width: 1440px;
      margin: auto;
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
        <Route path="/mentions-legales" element={<LegalNotice />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
)
