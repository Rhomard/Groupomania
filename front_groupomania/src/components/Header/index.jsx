import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import logo from '../../assets/logo.svg'
import './index.css'
import { Link } from 'react-router-dom'

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const HomeLogo = styled.img`
  height: 250px;
`

const SuperAdminStyle = styled.h1`
  text-align: center;
  font-size: 25px;
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
      <NavContainer>
        <NavControlStyle>
          <Link to="/">
            <HomeLogo src={logo} />
          </Link>
          {button2}
          {button1}
          {button}
        </NavControlStyle>
        {titleMaster}
      </NavContainer>
    )
  }
}

export default HeaderControl
