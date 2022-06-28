import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './header.css'
import admin from '../../assets/admin.png'
import logout from '../../assets/logout.png'
import { device } from '../../utils/style/responsive'

const SuperAdminLign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 0px 3px 0px;
  box-shadow: 0px 4px 10px -2px grey;
`

const SuperAdminStyle = styled.h1`
  text-align: center;
  font-size: 15px;
  padding-right: 5px;
`

const ImgAdmin = styled.img`
  height: 25px;
`

const HeaderContainer = styled.header`
  position: fixed;
  top: 0px;
  max-width: 1440px;
  width: 100%;
  background-color: white;
`

const NavContainer = styled.div`
  box-shadow: 0px 8px 50px 2px grey;
  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 200px;
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 60px;
  }
  @media ${device.desktop} {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 60px;
  }
`

const HomeLogoLign = styled.div`
  display: flex;
  justify-content: center;
`

const HomeLogo = styled.img`
  width: 200px;
`

const ButtonStyleLogoutHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: none;
  background: none;
  font-size: 15px;
  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
  @media ${device.mobile} {
    width: 100%;
    border-top: 1px solid black;
    height: 60px;
  }
  @media ${device.tablet} {
    width: auto;
    border: none;
    height: 60px;
  }
  @media ${device.desktop} {
    width: auto;
    border: none;
    height: 60px;
  }
`

const LogoutImg = styled.img`
  height: 25px;
  padding-left: 5px;
`

function handleLogoutClick() {
  localStorage.clear()
  window.location = `./`
}

function SuperAdmin() {
  return (
    <SuperAdminLign>
      <SuperAdminStyle>Connecté(e) en tant que SUPERADMIN </SuperAdminStyle>
      <ImgAdmin src={admin} alt="Crayon noir" />
    </SuperAdminLign>
  )
}

function Header() {
  let login = JSON.parse(localStorage.getItem('login'))

  if (login && login.roleId === 2) {
    return (
      <HeaderContainer>
        <NavContainer>
          <HomeLogoLign>
            <Link to="/fildactu">
              <HomeLogo src={logo} alt="Logo Groupomania" />
            </Link>
          </HomeLogoLign>
          <NavLink
            to="/fildactu"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Fil d'actus
          </NavLink>
          <NavLink
            to="/profil"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Mon profil
          </NavLink>
          <ButtonStyleLogoutHeader onClick={handleLogoutClick}>
            Déconnexion <LogoutImg src={logout} alt="Flèche de sortie" />
          </ButtonStyleLogoutHeader>
        </NavContainer>
      </HeaderContainer>
    )
  } else if (login && login.roleId === 1) {
    return (
      <HeaderContainer>
        <NavContainer>
          <HomeLogoLign>
            <Link to="/fildactu">
              <HomeLogo src={logo} alt="Logo Groupomania" />
            </Link>
          </HomeLogoLign>
          <NavLink
            to="/fildactu"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Fil d'actus
          </NavLink>
          <NavLink
            to="/profil"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Mon profil
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            onClick={handleLogoutClick}
          >
            Déconnexion <LogoutImg src={logout} alt="Flèche de sortie" />
          </NavLink>
        </NavContainer>
        <SuperAdmin />
      </HeaderContainer>
    )
  } else {
    return (
      <HeaderContainer>
        <NavContainer>
          <HomeLogoLign>
            <Link to="/">
              <HomeLogo src={logo} alt="Logo Groupomania" />
            </Link>
          </HomeLogoLign>
        </NavContainer>
      </HeaderContainer>
    )
  }
}

export default Header
