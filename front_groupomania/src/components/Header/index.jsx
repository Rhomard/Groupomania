import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'
import './index.css'
import { Link } from 'react-router-dom'

const Header = styled.header``

const NavContainer = styled.div`
  height: 75px;
  box-shadow: 0px 0px 10px 1px grey;
  @media (max-width: 768px) {
  }

  @media (max-width: 992px) {
  }
  @media (max-width: 1440px) {
  }
`

const NavControlStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`

const Buttonstyle = styled.button`
  border: none;
  background: none;
  text-decoration: none;
  color: black;
  font-size: 15px;
  &:hover {
    display: flex;
    align-items: center;
    text-decoration: none;
    background-color: #ffd7d7;
    color: black;
    font-weight: bold;
    height: 75px;
    padding: 0px 15px;
    font-size: 15px;
    cursor: pointer;
  }
`

const HomeLogo = styled.img`
  width: 300px;
`

const SuperAdminStyle = styled.h1`
  text-align: center;
  font-size: 1.5vw;
  @media (max-width: 1440px) {
  }
`

function ProfileButton(props) {
  return (
    <NavLink
      to="/profil"
      className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      onClick={props.onClick}
    >
      Mon profil
    </NavLink>
  )
}

function FeedButton(props) {
  return (
    <NavLink
      to="/fildactu"
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

function SuperAdmin() {
  return <SuperAdminStyle>Connecté(e) en tant que SUPERADMIN</SuperAdminStyle>
}

class HeaderControl extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleProfileClick = this.handleProfileClick.bind(this)
    this.handleFeedClick = this.handleFeedClick.bind(this)
  }

  handleProfileClick() {
    window.location = `./profil`
  }

  handleFeedClick() {
    window.location = `./fildactu`
  }

  handleLogoutClick() {
    localStorage.clear()
    window.location = `./`
  }

  render() {
    let login = JSON.parse(localStorage.getItem('login'))
    let button
    let button1
    let button2
    let titleMaster
    if (login && login.roleId === 2) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
      button1 = <ProfileButton onClick={this.handleProfileClick} />
      button2 = <FeedButton onClick={this.handleFeedClick} />
    } else if (login && login.roleId === 1) {
      titleMaster = <SuperAdmin />
      button = <LogoutButton onClick={this.handleLogoutClick} />
      button1 = <ProfileButton onClick={this.handleProfileClick} />
      button2 = <FeedButton onClick={this.handleFeedClick} />
    }

    return (
      <Header>
        <NavContainer>
          <NavControlStyle>
            <Link to="/">
              <HomeLogo src={logo} />
            </Link>
            {button2}
            {button1}
            {button}
          </NavControlStyle>
        </NavContainer>
        {titleMaster}
      </Header>
    )
  }
}

export default HeaderControl
