import styled from 'styled-components'

const LegalNoticeContainer = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
`
const LegalNoticeTitle = styled.h1``

function LegalNotice() {
  return (
    <LegalNoticeContainer>
      <LegalNoticeTitle>Mentions Légales à venir...</LegalNoticeTitle>
    </LegalNoticeContainer>
  )
}

export default LegalNotice
