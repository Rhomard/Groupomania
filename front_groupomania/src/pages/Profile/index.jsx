import styled from 'styled-components'
import ProfileInfo from '../../components/ProfileInfo'
import { useState } from 'react'
import { useEffect } from 'react'

const ProfileContainer = styled.div`
  width: 500px;
  margin: auto;
`

function Profile() {
  let login = JSON.parse(localStorage.getItem('login'))

  const [userData, setUsersData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/users`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((userData) => {
          setUsersData(userData)
        })
        .catch((error) => console.log(error))
    )
  }, [login.token])

  const myProfile = [{ firstName: '', lastName: '' }]

  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id === login.userId) {
      myProfile[0].firstName = userData[i].firstName
      myProfile[0].lastName = userData[i].lastName
    }
  }

  return (
    <ProfileContainer>
      <ProfileInfo
        firstName={myProfile[0].firstName}
        lastName={myProfile[0].lastName}
      />
    </ProfileContainer>
  )
}

export default Profile
