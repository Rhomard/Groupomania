import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Error from './components/Error'
import Home from './pages/SignupLogin'
import Feed from './pages/Feed'
import styled from 'styled-components'
import colors from './utils/style/colors'

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

const LogoutControlStyle = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const Buttonstyle = styled.button`
  border: none;
  background: none;
  font-size: 15px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: ${colors.primary};
  }
`

function LogoutButton(props) {
  return <Buttonstyle onClick={props.onClick}>Déconnexion</Buttonstyle>
}

class LogoutControl extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.state = { isLoggedIn: false }
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
    localStorage.clear()
    window.location = `./`
  }

  render() {
    let login = JSON.parse(localStorage.getItem('login'))
    let button
    if (login) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    }

    return (
      <LogoutControlStyle>
        <Header isLoggedIn={login} />
        {button}
      </LogoutControlStyle>
    )
  }
}

root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <LogoutControl isLoggedIn={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accueil" element={<Feed />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
