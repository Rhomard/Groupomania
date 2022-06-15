import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import colors from '../../utils/style/colors'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 550px;
  margin: auto;
  background-color: lightgray;
  border-radius: 20px;
`

const NavLinks = styled.nav`
  width: 550px;
  display: flex;
  justify-content: space-around;
  background-color: lightgray;
  border-radius: 20px 20px 0px;
`

const Form = styled.form`
  font-weight: bold;
  border-radius: 0px 20px 20px 20px;
  padding: 25px;
  width: 500px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  background-color: ${colors.secondary};
`

const FormLign = styled.div`
  padding: 5px;
`

const FormSubmit = styled.button`
  padding-top: 10px;
  border: none;
  background: none;
`

function Login() {
  return (
    <LoginContainer>
      <NavLinks>
        <NavLink
          to="/"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  padding: '25px 15px 15px 15px',
                  color: 'black',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '18px',
                  textAlign: 'center',
                  backgroundColor: `${colors.secondary}`,
                  borderRadius: '20px 20px 0px 0px',
                  width: '55%',
                }
              : {
                  padding: '25px 15px 15px 15px',
                  color: `${colors.tertiary}`,
                  textDecoration: 'none',
                  fontSize: '18px',
                  textAlign: 'center',
                  backgroundColor: 'lightgray',
                  borderRadius: '20px 20px 0px 0px',
                  width: '45%',
                }
          }
        >
          Connexion
        </NavLink>
        <NavLink
          to="/inscription"
          className="nav-link"
          style={({ isActive }) =>
            isActive
              ? {
                  padding: '25px 15px 15px 15px',
                  color: 'black',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '18px',
                  textAlign: 'center',
                  backgroundColor: `${colors.secondary}`,
                  borderRadius: '20px 20px 0px 0px',
                  width: '55%',
                }
              : {
                  padding: '25px 15px 15px 15px',
                  color: `${colors.tertiary}`,
                  textDecoration: 'none',
                  fontSize: '18px',
                  textAlign: 'center',
                  backgroundColor: 'lightgray',
                  borderRadius: '20px 20px 0px 0px',
                  width: '45%',
                  paddingRight: '25px',
                }
          }
        >
          Inscription
        </NavLink>
      </NavLinks>

      <div>
        <Form>
          <FormLign>
            <label for="email">Email : </label>
            <input type="email" name="email" id="email" required />
          </FormLign>
          <FormLign>
            <label for="password">Mot de passe : </label>
            <input type="text" name="password" id="password" required />
          </FormLign>
          <FormSubmit>
            <input type="submit" value="Me Connecter" />
          </FormSubmit>
        </Form>
      </div>
    </LoginContainer>
  )
}

export default Login
