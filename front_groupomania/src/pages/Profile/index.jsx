import styled from 'styled-components'
import ProfileInfo from '../../components/ProfileInfo'
import { useState } from 'react'
import { useEffect } from 'react'

const ProfileContainer = styled.div`
  width: 500px;
`

function Profile() {
  let login = JSON.parse(localStorage.getItem('login'))

  const [userData, setUsersData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/users`).then((response) =>
      response
        .json()
        .then((userData) => {
          setUsersData(userData)
        })
        .catch((error) => console.log(error))
    )
  }, [])

  const [myProfile, setMyProfile] = useState([])

  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id === login.userId) {
      setMyProfile(userData[i])
    }
  }

  console.log(myProfile)

  return (
    <ProfileContainer>
      {myProfile[0].firstName}
      {myProfile[0].lastName}
    </ProfileContainer>
  )
}

export default Profile
