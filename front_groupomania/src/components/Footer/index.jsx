import React from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { device } from '../../utils/style/responsive'

const NavControlStyle = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0px -8px 50px 1px grey;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 130px;
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    height: 60px;
  }
  @media ${device.desktop} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    height: 60px;
  }
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
  @media ${device.mobile} {
    font-size: 12.5px;
  }
  @media ${device.tablet} {
    font-size: 12.5px;
  }
  @media ${device.desktop} {
    font-size: 15px;
  }
`

const ButtonStyleUserLogin = styled.button`
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
  @media ${device.mobile} {
    font-size: 12.5px;
  }
  @media ${device.tablet} {
    font-size: 12.5px;
  }
  @media ${device.desktop} {
    font-size: 15px;
  }
`

const CopyrightStyle = styled.p`
  margin: 0;
  border: none;
  background: none;

  @media ${device.mobile} {
    font-size: 12.5px;
  }
  @media ${device.tablet} {
    font-size: 12.5px;
  }
  @media ${device.desktop} {
    font-size: 15px;
  }
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
    if (login) {
      userLogin = (
        <Link to="/profil">
          <UserLogin />
        </Link>
      )
      button = <LogoutButton onClick={this.handleLogoutClick} />
    }

    return (
      <NavControlStyle>
        {userLogin}
        {button}
        <Link to="/mentions-legales">
          <LegalNotice />
        </Link>
        <Copyright />
      </NavControlStyle>
    )
  }
}

export default FooterControl
