import styled from 'styled-components'
import profileDefault from '../../assets/profileDefault.png'
import PropTypes from 'prop-types'
import { dateFormat } from '../../utils/DateFormat'

const ProfileContainer = styled.div`
  width: 500px;
  margin: auto;
`

const ProfileUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const MemberSince = styled.p`
  margin: 50px 0px;
`

const ProfileUserImg = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`

const ProfileUserName = styled.p`
  font-size: 50px;
`

function ProfileInfo({ firstName, lastName, imageUrlUser, creationTimeUser }) {
  const isProfilePicNull = imageUrlUser === null ? false : true

  return (
    <ProfileContainer>
      <ProfileUser>
        {isProfilePicNull ? (
          <ProfileUserImg src={imageUrlUser} alt="Photo de profil" />
        ) : (
          <ProfileUserImg
            src={profileDefault}
            alt="Photo de profil par défault"
          />
        )}

        <ProfileUserName>
          {firstName} {lastName}
        </ProfileUserName>
        <MemberSince>
          Membre depuis{' '}
          {creationTimeUser &&
            dateFormat(new Date(creationTimeUser), 'MMM dd yyyy')}
        </MemberSince>
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
  imageUrlUser: 'undefined',
}

export default ProfileInfo
