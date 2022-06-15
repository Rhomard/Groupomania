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

function Signup() {
  return (
    <div>
      <PageTitle>Ici c'est pour s'inscrire :)</PageTitle>
      <PageForm>
        <PageFormLign>
          <label for="firstName">Entrez votre prénom : </label>
          <input type="text" name="firstName" id="firstName" required />
        </PageFormLign>
        <PageFormLign>
          <label for="lastName">Entrez votre nom : </label>
          <input type="text" name="lastName" id="lastName" required />
        </PageFormLign>
        <PageFormLign>
          <label for="email">Entrez votre email : </label>
          <input type="email" name="email" id="email" required />
        </PageFormLign>
        <PageFormLign>
          <label for="password">Entrez votre mot de passe : </label>
          <input type="text" name="password" id="password" required />
        </PageFormLign>
        <div>
          <input type="submit" value="Créer mon compte" />
        </div>
      </PageForm>
    </div>
  )
}

export default Signup
