import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'

const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={logo} />
      </Link>
      <div>
        <NavLink
          to="/inscription"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  padding: '10px 15px',
                  color: '#FD2D01',
                  textDecoration: 'none',
                  fontSize: '18px',
                  textAlign: 'center',
                }
              : {
                  padding: '10px 15px',
                  color: '#8186a0',
                  textDecoration: 'none',
                  fontSize: '18px',
                  textAlign: 'center',
                }
          }
        >
          Inscription
        </NavLink>
        <NavLink
          to="/connexion"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  padding: '10px 15px',
                  color: '#FD2D01',
                  textDecoration: 'none',
                  fontSize: '18px',
                  textAlign: 'center',
                }
              : {
                  padding: '10px 15px',
                  color: '#8186a0',
                  textDecoration: 'none',
                  fontSize: '18px',
                  textAlign: 'center',
                }
          }
        >
          Connexion
        </NavLink>
      </div>
    </NavContainer>
  )
}

export default Header
