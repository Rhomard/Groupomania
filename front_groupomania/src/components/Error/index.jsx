import styled from 'styled-components'
import { device } from '../../utils/style/responsive'

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.mobile} {
    min-height: calc(100vh - 60px);
    padding-bottom: 50px;
  }
  @media ${device.tablet} {
    min-height: calc(100vh - 60px);
    padding-bottom: 0px;
  }
  @media ${device.desktop} {
    min-height: calc(100vh - 60px);
    padding-bottom: 0px;
  }
`

function Error() {
  return (
    <ErrorContainer>
      <h1>Oups 🙈 Cette page n'existe pas</h1>
    </ErrorContainer>
  )
}

export default Error
