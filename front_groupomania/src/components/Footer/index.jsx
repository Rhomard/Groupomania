import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'
import { device } from '../../utils/style/responsive'
import logout from '../../assets/logout.png'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

const NavControlStyle = styled.footer`
  box-shadow: 0px -8px 50px 1px grey;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 150px;
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

const ButtonStyleLogoutFooter = styled.button`
  display: flex;
  align-items: center;
  text-decoration: none;
  border: none;
  background: none;
  font-size: 15px;
  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`

const LogoutImg = styled.img`
  height: 25px;
  padding-left: 5px;
`

const CopyrightStyle = styled.p`
  margin: 0;
  border: none;
  background: none;
`

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
    <Link to="/profil" style={{ textDecoration: 'none', color: 'black' }}>
      Connecté(e) en tant que {userData.firstName} {userData.lastName}
    </Link>
  )
}

function handleLogoutClick() {
  localStorage.clear()
  window.location = `./`
}

function Footer() {
  let login = JSON.parse(localStorage.getItem('login'))

  if (login) {
    return (
      <NavControlStyle>
        <UserLogin />
        <ButtonStyleLogoutFooter onClick={handleLogoutClick}>
          Déconnexion
          <LogoutImg src={logout} alt="Flèche de sortie" />
        </ButtonStyleLogoutFooter>
        <NavLink
          to="/mentions-legales"
          style={({ isActive }) =>
            isActive
              ? { textDecoration: 'none', color: 'black' }
              : { textDecoration: 'none', color: 'black' }
          }
        >
          Mentions Légales
        </NavLink>
        <CopyrightStyle>Copyright © 2022 Groupomania</CopyrightStyle>
      </NavControlStyle>
    )
  } else {
    return (
      <NavControlStyle>
        <NavLink
          to="/mentions-legales"
          style={({ isActive }) =>
            isActive
              ? {
                  textDecoration: 'none',
                  color: 'black',
                  backgroundColor: 'none',
                }
              : { textDecoration: 'none', color: 'black' }
          }
        >
          Mentions Légales
        </NavLink>
        <CopyrightStyle>Copyright © 2022 Groupomania</CopyrightStyle>
      </NavControlStyle>
    )
  }
}

export default Footer
