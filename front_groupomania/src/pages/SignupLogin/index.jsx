import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState } from 'react'
import { device } from '../../utils/style/responsive'

const PageContainer = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  @media ${device.mobile} {
  }
  @media ${device.tablet} {
  }
  @media ${device.desktop} {
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
  let login = JSON.parse(localStorage.getItem('login'))

  if (login) {
    window.location = `./fildactu`
  } else if (login === undefined) {
    window.location = `./`
  }

  // ============================ LOGIN ============================

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
      // Tell to the API that I will give it json object
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // Send my json object
      body: JSON.stringify(loginInfo),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      // Redirect to the feed
      .then(function (value) {
        window.location = `./fildactu`
        let login = {
          roleId: value.roleId,
          userId: value.userId,
          token: value.token,
        }
        localStorage.setItem('login', JSON.stringify(login))
      })
      // If the API cannot be called
      .catch(function (err) {
        console.log(err)
        alert('Mauvais identifiants')
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
      // Tell to the API that I will give it json object
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // Send my json object
      body: JSON.stringify(signupInfo),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      // Redirect to the feed
      .then(function (value) {
        alert(
          'Compte créé avec succès ! Vous pouvez maintenant vous connecter :)'
        )
        setIsOpen(true)
      })
      // If the API cannot be called
      .catch(function (err) {
        console.log(err)
      })
  }

  const [isAlreadyUser, setIsOpen] = useState(true)

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
            <label>Email : </label>{' '}
            <InputStyle
              type="email"
              name="email"
              placeholder="exemple@groupomania.fr"
              value={loginInfo.email}
              onChange={handleChangeLogin}
              required
            />
          </FormLign>
          <FormLign>
            <label>Mot de passe : </label>
            <InputStyle
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
              <button id="connexion">Me connecter</button>
            </HideButton>
            <LabelForButton htmlFor="connexion">Me connecter</LabelForButton>
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
            <label>Prénom : </label>
            <InputStyle
              type="text"
              name="firstName"
              placeholder="Prénom"
              value={signupInfo.firstName}
              onChange={handleChangeSignup}
              required
            />
          </FormLign>
          <FormLign>
            <label>Nom : </label>
            <InputStyle
              type="text"
              name="lastName"
              placeholder="Nom"
              value={signupInfo.lastName}
              onChange={handleChangeSignup}
              required
            />
          </FormLign>
          <FormLign>
            <label>Email : </label>
            <InputStyle
              type="email"
              name="email"
              placeholder="exemple@groupomania.fr"
              value={signupInfo.email}
              onChange={handleChangeSignup}
              required
            />
          </FormLign>
          <FormLign>
            <label>Mot de passe : </label>
            <InputStyle
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
