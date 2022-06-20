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
import Profile from './pages/Profile'
import { NavLink } from 'react-router-dom'
import '../src/index.css'

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

const NavControlStyle = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const Buttonstyle = styled.button`
  border: none;
  background: none;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    color: ${colors.primary};
  }
`

function ProfileButton(props) {
  return (
    <NavLink
      to="/profil"
      className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      onClick={props.onClick}
    >
      Profil
    </NavLink>
  )
}

function FeedButton(props) {
  return (
    <NavLink
      to="/accueil"
      className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      onClick={props.onClick}
    >
      Fil d'actus
    </NavLink>
  )
}

function LogoutButton(props) {
  return <Buttonstyle onClick={props.onClick}>Déconnexion</Buttonstyle>
}

class LogoutControl extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleProfileClick = this.handleProfileClick.bind(this)
    this.handleFeedClick = this.handleFeedClick.bind(this)
    this.state = { isLoggedIn: false }
  }

  handleProfileClick() {
    this.setState({ isLoggedIn: false })
    window.location = `./profil`
  }

  handleFeedClick() {
    this.setState({ isLoggedIn: false })
    window.location = `./accueil`
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
    localStorage.clear()
    window.location = `./`
  }

  render() {
    let login = JSON.parse(localStorage.getItem('login'))
    let button
    let button1
    let button2
    if (login) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
      button1 = <ProfileButton onClick={this.handleProfileClick} />
      button2 = <FeedButton onClick={this.handleFeedClick} />
    }

    return (
      <NavControlStyle>
        <Header isLoggedIn={login} />
        {button2}
        {button1}
        {button}
      </NavControlStyle>
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
        <Route path="/profil" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
