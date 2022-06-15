import styled from 'styled-components'

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`

const PageForm = styled.form`
  font-weight: bold;
  padding-left: 30px;
`

const PageFormLign = styled.div`
  padding: 5px;
`

function Login() {
  return (
    <div>
      <PageTitle>Ici c'est pour se connecter :)</PageTitle>
      <PageForm>
        <PageFormLign>
          <label for="email">Entrez votre email : </label>
          <input type="email" name="email" id="email" required />
        </PageFormLign>
        <PageFormLign>
          <label for="password">Entrez votre mot de passe : </label>
          <input type="text" name="password" id="password" required />
        </PageFormLign>
        <div>
          <input type="submit" value="Me Connecter" />
        </div>
      </PageForm>
    </div>
  )
}

export default Login
