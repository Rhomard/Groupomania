import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'
import admin from '../../assets/admin.png'
import './header.css'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0px;
  max-width: 1440px;
  width: 100%;
  background-color: white;
`

const NavContainer = styled.div`
  height: 60px;
  box-shadow: 0px 8px 50px 2px grey;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 135px;
  font-size: 15px;
  text-decoration: none;
  color: black;
  height: 60px;
  &:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 135px;
    text-decoration: none;
    background-color: #ffd7d7;
    color: ${colors.primary};
    font-weight: bold;
    height: 60px;
    font-size: 15px;
    cursor: pointer;
  }
`

const HomeLogo = styled.img`
  width: 200px;
`

const SuperAdminStyle = styled.h1`
  text-align: center;
  font-size: 15px;
  padding-right: 5px;
`
const SuperAdminLign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 0px 3px 0px;
  box-shadow: 0px 4px 10px -2px grey;
`

const ImgAdmin = styled.img`
  height: 25px;
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
  return (
    <SuperAdminLign>
      <SuperAdminStyle>Connecté(e) en tant que SUPERADMIN </SuperAdminStyle>
      <ImgAdmin src={admin} alt="Crayon noir" />
    </SuperAdminLign>
  )
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
    let home
    if (login && login.roleId === 2) {
      home = (
        <Link to="/fildactu">
          <HomeLogo src={logo} />
        </Link>
      )
      button = <LogoutButton onClick={this.handleLogoutClick} />
      button1 = <ProfileButton onClick={this.handleProfileClick} />
      button2 = <FeedButton onClick={this.handleFeedClick} />
    } else if (login && login.roleId === 1) {
      titleMaster = <SuperAdmin />
      home = (
        <Link to="/fildactu">
          <HomeLogo src={logo} />
        </Link>
      )
      button = <LogoutButton onClick={this.handleLogoutClick} />
      button1 = <ProfileButton onClick={this.handleProfileClick} />
      button2 = <FeedButton onClick={this.handleFeedClick} />
    } else if (!login) {
      home = (
        <Link to="/">
          <HomeLogo src={logo} />
        </Link>
      )
    }

    return (
      <HeaderContainer>
        <NavContainer>
          <NavControlStyle>
            {home}
            {button2}
            {button1}
            {button}
          </NavControlStyle>
        </NavContainer>
        {titleMaster}
      </HeaderContainer>
    )
  }
}

export default HeaderControl
