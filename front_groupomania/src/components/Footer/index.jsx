import React from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const FooterContainer = styled.div``

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NavControlStyle = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 25px;
`

const NavControlStyleFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 25px 0px;
`

const ButtonStyle = styled.button`
  border: none;
  background: none;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    color: ${colors.primary};
  }
`

const ButtonStyleUserLogin = styled.button`
  border: none;
  background: none;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`

const CopyrightStyle = styled.p`
  border: none;
  background: none;
  font-size: 15px;
`

const HomeLogo = styled.img`
  width: 200px;
`

function LogoutButton(props) {
  return <ButtonStyle onClick={props.onClick}>Déconnexion</ButtonStyle>
}

function LegalNotice() {
  return <ButtonStyleUserLogin>Mentions Légales</ButtonStyleUserLogin>
}

function Copyright() {
  return <CopyrightStyle>Copyright © 2022 Groupomania</CopyrightStyle>
}

function UserLogin() {
  let login = JSON.parse(localStorage.getItem('login'))
  const [userData, setUsersData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/users`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((userData) => {
          const user = userData.find((e) => e.id === login.userId)
          if (user) {
            setUsersData(user)
          }
        })
        .catch((error) => console.log(error))
    )
  }, [login.token]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ButtonStyleUserLogin>
      Connecté(e) en tant que {userData.firstName} {userData.lastName}
    </ButtonStyleUserLogin>
  )
}

class FooterControl extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
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

  handleUserLoginClick() {
    window.location = `./profil`
  }

  render() {
    let login = JSON.parse(localStorage.getItem('login'))
    let button
    let userLogin
    let logoFooter
    if (login) {
      logoFooter = (
        <Link to="/">
          <HomeLogo src={logo} />
        </Link>
      )
      userLogin = <UserLogin />
      button = <LogoutButton onClick={this.handleLogoutClick} />
    }

    return (
      <FooterContainer>
        <NavContainer>
          <NavControlStyle>
            <Link to="/profil">{userLogin}</Link>
            {button}
            {logoFooter}
          </NavControlStyle>
          <NavControlStyleFooter>
            <Link to="/mentions-legales">
              <LegalNotice />
            </Link>
            <Copyright />
          </NavControlStyleFooter>
        </NavContainer>
      </FooterContainer>
    )
  }
}

export default FooterControl
