import styled from 'styled-components'
import profileDefault from '../../assets/profileDefault.png'
import PropTypes from 'prop-types'

const ProfileContainer = styled.div`
  width: 500px;
  margin: auto;
  padding: 20px 0px;
`

const ProfileUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProfileUserImg = styled.img`
  height: 50px;
`

const ProfileUserName = styled.p``

function ProfileInfo({ firstName, lastName }) {
  return (
    <ProfileContainer>
      <ProfileUser>
        <ProfileUserImg src={profileDefault} />
        <ProfileUserName>
          {firstName} {lastName}
        </ProfileUserName>
      </ProfileUser>
    </ProfileContainer>
  )
}

ProfileInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

ProfileInfo.defaultProps = {
  firstName: 'Prénom',
  lastName: 'Nom',
}

export default ProfileInfo
