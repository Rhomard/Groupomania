import styled from 'styled-components'
import colors from '../../utils/style/colors'

const FormWrap = styled.div`
  margin: 30px;
  background-color: ${colors.background};
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`

const FormContainer = styled.div`
  margin: 30px;
  background-color: ${colors.background};
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`

function Forms({ label, title, picture }) {
  return <FormWrap>Coucou</FormWrap>
}

export default Forms
