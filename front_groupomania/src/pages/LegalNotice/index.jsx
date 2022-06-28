import styled from 'styled-components'

const LegalNoticeContainer = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
`

function LegalNotice() {
  return (
    <LegalNoticeContainer>
      <h1>Mentions Légales à venir...</h1>
    </LegalNoticeContainer>
  )
}

export default LegalNotice
