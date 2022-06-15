import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const HomeLogo = styled.img`
  height: 100px;
`

function Header() {
  return (
    <HeaderStyle>
      <Link to="/">
        <HomeLogo src={logo} />
      </Link>
    </HeaderStyle>
  )
}

export default Header
