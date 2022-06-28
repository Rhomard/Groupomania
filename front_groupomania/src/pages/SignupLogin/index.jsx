import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState } from 'react'
import { device } from '../../utils/style/responsive'
import { Navigate } from 'react-router-dom'

const PageContainer = styled.div`
  display: flex;
  @media ${device.mobile} {
    min-height: calc(100vh - 60px);
    padding-top: 175px;
    padding-bottom: 50px;
  }
  @media ${device.tablet} {
    min-height: calc(100vh - 60px);
    padding-top: 0px;
    padding-bottom: 0px;
  }
  @media ${device.desktop} {
    min-height: calc(100vh - 60px);
    padding-top: 0px;
    padding-bottom: 0px;
  }
`

const LoginContainer = styled.div`
  height: 450px;
  margin: auto;
  background-color: lightgray;

  @media ${device.mobile} {
    width: 100%;
    border-radius: 20px;
  }
  @media ${device.tablet} {
    width: 60%;
    border-radius: 20px;
  }
  @media ${device.desktop} {
    width: 40%;
    border-radius: 20px;
  }
`

const SignupContainer = styled.div`
  height: 450px;
  margin: auto;
  background-color: lightgray;

  @media ${device.mobile} {
    width: 100%;
    border-radius: 20px;
  }
  @media ${device.tablet} {
    width: 70%;
    border-radius: 20px;
  }
  @media ${device.desktop} {
    width: 40%;
    border-radius: 20px;
  }
`

const NavLinks = styled.div`
  display: flex;
  width: 100%;
  background-color: lightgray;
  border-radius: 20px 20px 0px 0px;
`

const NavLinkActive = styled.nav`
  padding: 25px 15px 15px 15px;
  color: black;
  font-weight: bold;
  text-decoration: none;
  font-size: 15px;
  text-align: center;
  background-color: ${colors.secondary};
  width: 55%;
  &:hover {
    cursor: pointer;
  }
  @media ${device.mobile} {
    border-radius: 20px 20px 0px 0px;
  }
  @media ${device.tablet} {
    border-radius: 20px 20px 0px 0px;
  }
  @media ${device.desktop} {
    border-radius: 20px 20px 0px 0px;
  }
`

const NavLinkInactive = styled.nav`
  padding: 25px 15px 15px 15px;
  color: ${colors.tertiary};
  text-decoration: none;
  font-size: 15px;
  text-align: center;
  background-color: lightgray;
  width: 45%;
  &:hover {
    cursor: pointer;
  }
  @media ${device.mobile} {
    border-radius: 20px 20px 0px 0px;
  }
  @media ${device.tablet} {
    border-radius: 20px 20px 0px 0px;
  }
  @media ${device.desktop} {
    border-radius: 20px 20px 0px 0px;
  }
`

const FormLogin = styled.form`
  padding-top: 15px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${colors.secondary};
  @media ${device.mobile} {
    border-radius: 0px;
  }
  @media ${device.tablet} {
    border-radius: 0px 20px 20px 20px;
  }
  @media ${device.desktop} {
    border-radius: 0px 20px 20px 20px;
  }
`

const FormSignup = styled.form`
  padding-top: 15px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${colors.secondary};
  @media ${device.mobile} {
    border-radius: 0px;
  }
  @media ${device.tablet} {
    border-radius: 20px 0px 20px 20px;
  }
  @media ${device.desktop} {
    border-radius: 20px 0px 20px 20px;
  }
`

const FormLign = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
  font-size: 15px;
  @media ${device.mobile} {
    padding: 25px 25px;
  }
  @media ${device.tablet} {
    padding: 25px 50px;
  }
  @media ${device.desktop} {
    padding: 25px 50px;
  }
`

const InputStyle = styled.input`
  padding-left: 10px;
  font-size: 13px;
  width: 55%;
  height: 30px;
  border: none;
  border-radius: 100px;
  &::placeholder {
    font-size: 13px;
  }
  &:focus {
    outline: 2px solid black;
  }
`

const FormSubmit = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0px;
  &hover {
    cursor: pointer;
  }
`

const LabelForButton = styled.label`
  width: 200px;
  padding: 10px 0px;
  text-align: center;
  font-size: 17px;
  border-radius: 100px;
  border: 2px solid;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 15px 1px ${colors.primary};
  }
`

const HideButton = styled.div`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

function SignupLogin() {
  // ============================ LOGIN ============================

  let login = JSON.parse(localStorage.getItem('login'))

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  const handleChangeLogin = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
  }

  const handleSubmitLogin = (event) => {
    event.preventDefault()
    setLoginInfo({ email: '', password: '' })

    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 404) {
          alert('Utilisateur non trouvé')
        } else alert('Mauvais mot de passe')
      })
      .then(function (value) {
        let login = {
          roleId: value.roleId,
          userId: value.userId,
          token: value.token,
        }
        localStorage.setItem('login', JSON.stringify(login))
        window.location = `./fildactu`
      })
      .catch(function (err) {
        console.log(err)
        window.location = `./`
      })
  }

  // ============================ SIGNUP ============================
  const [signupInfo, setSignupInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChangeSignup = (event) => {
    setSignupInfo({ ...signupInfo, [event.target.name]: event.target.value })
  }

  const handleSubmitSignup = (event) => {
    event.preventDefault()
    setSignupInfo({ firstName: '', lastName: '', email: '', password: '' })

    fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupInfo),
    })
      .then(function (res) {
        if (res.status !== 404) {
          alert(
            'Compte créé avec succès ! Vous pouvez maintenant vous connecter :)'
          )
          setIsOpen(true)
        } else {
          alert(
            'La création de compte à échouée, veuillez réessayer ultérieurement..'
          )
        }
      })

      .catch(function (err) {
        console.log(err)
      })
  }

  const [isAlreadyUser, setIsOpen] = useState(true)

  if (login) {
    return <Navigate to="/fildactu" />
  }

  return isAlreadyUser ? (
    <PageContainer>
      <LoginContainer>
        <NavLinks>
          <NavLinkActive to="/">Connexion</NavLinkActive>
          <NavLinkInactive to="/" onClick={() => setIsOpen(false)}>
            Inscription
          </NavLinkInactive>
        </NavLinks>

        <FormLogin onSubmit={handleSubmitLogin}>
          <FormLign>
            <label for="inputMailLogin">Email : </label>
            <InputStyle
              id="inputMailLogin"
              type="email"
              name="email"
              placeholder="exemple@groupomania.fr"
              value={loginInfo.email}
              onChange={handleChangeLogin}
              required
            />
          </FormLign>
          <FormLign>
            <label for="inputPasswordLogin">Mot de passe : </label>
            <InputStyle
              id="inputPasswordLogin"
              type="password"
              name="password"
              placeholder="motdepasse"
              value={loginInfo.password}
              onChange={handleChangeLogin}
              autoComplete="off"
              required
            />
          </FormLign>
          <FormSubmit>
            <HideButton>
              <button id="login">Me connecter</button>
            </HideButton>
            <LabelForButton for="login">Me connecter</LabelForButton>
          </FormSubmit>
        </FormLogin>
      </LoginContainer>
    </PageContainer>
  ) : (
    <PageContainer>
      <SignupContainer>
        <NavLinks>
          <NavLinkInactive to="/" onClick={() => setIsOpen(true)}>
            Connexion
          </NavLinkInactive>
          <NavLinkActive to="/" onClick={() => setIsOpen(false)}>
            Inscription
          </NavLinkActive>
        </NavLinks>
        <FormSignup onSubmit={handleSubmitSignup}>
          <FormLign>
            <label htmlFor="inputFistnameSignup">Prénom : </label>
            <InputStyle
              id="inputFistnameSignup"
              type="text"
              name="firstName"
              placeholder="Prénom"
              value={signupInfo.firstName}
              onChange={handleChangeSignup}
              required
            />
          </FormLign>
          <FormLign>
            <label htmlFor="inputLastnameSignup">Nom : </label>
            <InputStyle
              id="inputLastnameSignup"
              type="text"
              name="lastName"
              placeholder="Nom"
              value={signupInfo.lastName}
              onChange={handleChangeSignup}
              required
            />
          </FormLign>
          <FormLign>
            <label htmlFor="inputemailSignup">Email : </label>
            <InputStyle
              id="inputemailSignup"
              type="email"
              name="email"
              placeholder="exemple@groupomania.fr"
              value={signupInfo.email}
              onChange={handleChangeSignup}
              required
            />
          </FormLign>
          <FormLign>
            <label htmlFor="inputSignup">Mot de passe : </label>
            <InputStyle
              id="inputSignup"
              type="password"
              name="password"
              placeholder="motdepasse"
              value={signupInfo.password}
              onChange={handleChangeSignup}
              autoComplete="off"
              required
            />
          </FormLign>
          <FormSubmit>
            <HideButton>
              <button id="accountCreation">Créer mon compte</button>
            </HideButton>
            <LabelForButton htmlFor="accountCreation">
              Créer mon compte
            </LabelForButton>
          </FormSubmit>
        </FormSignup>
      </SignupContainer>
    </PageContainer>
  )
}

export default SignupLogin
