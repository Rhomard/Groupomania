import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState } from 'react'

const LoginContainer = styled.div`
  width: 30%;
  margin: auto;
  background-color: lightgray;
  border-radius: 20px;
  @media (max-width: 768px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1440px) {
  }
`

const SignupContainer = styled.div`
  width: 30%;
  margin: auto;
  background-color: lightgray;
  border-radius: 20px;
`

const NavLinks = styled.div`
  display: flex;
  width: 100%;
  background-color: lightgray;
  border-radius: 20px 20px 0px;
`

const NavLinkActive = styled.nav`
  padding: 25px 15px 15px 15px;
  color: black;
  font-weight: bold;
  text-decoration: none;
  font-size: 1vw;
  text-align: center;
  background-color: ${colors.secondary};
  border-radius: 20px 20px 0px 0px;
  width: 55%;
  &:hover {
    cursor: pointer;
  }
`

const NavLinkInactive = styled.nav`
  padding: 25px 15px 15px 15px;
  color: ${colors.tertiary};
  text-decoration: none;
  font-size: 1vw;
  text-align: center;
  background-color: lightgray;
  border-radius: 20px 20px 0px 0px;
  width: 45%;
  &:hover {
    cursor: pointer;
  }
`

const FormLogin = styled.form`
  padding-top: 15px;
  font-weight: bold;
  border-radius: 0px 20px 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${colors.secondary};
`

const FormSignup = styled.form`
  padding-top: 15px;
  font-weight: bold;
  border-radius: 20px 0px 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${colors.secondary};
`

const FormLign = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
  padding: 25px 50px;
  font-size: 1vw;
`

const InputStyle = styled.input`
  padding-left: 3%;
  font-size: 0.9vw;
  width: 55%;
  height: 30px;
  border: none;
  border-radius: 100px;
  &::placeholder {
    font-size: 0.9vw;
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
  width: 45%;
  padding: 10px 0px;
  text-align: center;
  font-size: 1.3vw;
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
  ) : (
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
  )
}

export default SignupLogin
