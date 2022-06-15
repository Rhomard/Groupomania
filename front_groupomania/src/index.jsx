import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Error from './components/Error'
import Signup from './pages/Signup'
import Login from './pages/Login'

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
        <Route path="/" element={<Login />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
