import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState } from 'react'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 450px;
  margin: auto;
  background-color: lightgray;
  border-radius: 20px;
`

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 450px;
  margin: auto;
  background-color: lightgray;
  border-radius: 20px;
`

const NavLinks = styled.nav`
  width: 450px;
  display: flex;
  justify-content: space-around;
  background-color: lightgray;
  border-radius: 20px 20px 0px;
`

const NavLinkActive = styled.nav`
  padding: 25px 15px 15px 15px;
  color: black;
  font-weight: bold;
  text-decoration: none;
  font-size: 18px;
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
  font-size: 18px;
  text-align: center;
  background-color: lightgray;
  border-radius: 20px 20px 0px 0px;
  width: 45%;
  &:hover {
    cursor: pointer;
  }
`

const FormLogin = styled.form`
  font-weight: bold;
  border-radius: 0px 20px 20px 20px;
  padding: 25px;
  width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${colors.secondary};
`

const FormSignup = styled.form`
  font-weight: bold;
  border-radius: 20px 0px 20px 20px;
  padding: 25px;
  width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${colors.secondary};
`

const FormLign = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 5px;
`

const FormSubmit = styled.div`
  padding-top: 10px;
  &hover {
    cursor: pointer;
  }
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
          'Compte créé avec succès ! Vous pouvez vous connecter désormais :)'
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
        <NavLinkActive to="/" className="nav-link">
          Connexion
        </NavLinkActive>
        <NavLinkInactive
          to="/"
          onClick={() => setIsOpen(false)}
          className="nav-link"
        >
          Inscription
        </NavLinkInactive>
      </NavLinks>

      <FormLogin onSubmit={handleSubmitLogin}>
        <FormLign>
          <label>Email : </label>
          <input
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
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={loginInfo.password}
            onChange={handleChangeLogin}
            autoComplete="off"
            required
          />
        </FormLign>
        <FormSubmit>
          <button>Me connecter</button>
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
          <label>Entrez votre prénom : </label>
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={signupInfo.firstName}
            onChange={handleChangeSignup}
            required
          />
        </FormLign>
        <FormLign>
          <label>Entrez votre nom : </label>
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={signupInfo.lastName}
            onChange={handleChangeSignup}
            required
          />
        </FormLign>
        <FormLign>
          <label>Entrez votre email : </label>
          <input
            type="email"
            name="email"
            placeholder="exemple@groupomania.fr"
            value={signupInfo.email}
            onChange={handleChangeSignup}
            required
          />
        </FormLign>
        <FormLign>
          <label>Entrez votre mot de passe : </label>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={signupInfo.password}
            onChange={handleChangeSignup}
            autoComplete="off"
            required
          />
        </FormLign>
        <FormSubmit>
          <button>Créer mon compte</button>
        </FormSubmit>
      </FormSignup>
    </SignupContainer>
  )
}

export default SignupLogin
