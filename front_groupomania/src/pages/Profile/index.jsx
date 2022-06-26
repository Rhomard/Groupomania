import styled from 'styled-components'
import ProfileInfo from '../../components/ProfileInfo'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const ProfileContainer = styled.div`
  min-height: calc(100vh - 115px);
  padding-top: 50px;
  width: 500px;
  height: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`

const LabelChangeProfilPicture = styled.label`
  margin-top: 100px;
  &:hover {
    cursor: pointer;
  }
`

const ImgPreview = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
`

const HideInput = styled.div`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const myProfile = [
    { firstName: '', lastName: '', imageUrlUser: '', creationTimeUser: '' },
  ]

  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id === login.userId) {
      myProfile[0].firstName = userData[i].firstName
      myProfile[0].lastName = userData[i].lastName
      myProfile[0].imageUrlUser = userData[i].imageUrlUser
      myProfile[0].creationTimeUser = userData[i].creationTimeUser
    }
  }

  const [imageUrlUser, setImageUrlUser] = useState()

  const send = (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('imageUrlUser', imageUrlUser)

    let login = JSON.parse(localStorage.getItem('login'))

    const headers = {
      Authorization: `Bearer ${login.token}`,
    }

    axios
      .put(`http://localhost:3000/api/auth/${login.userId}`, data, {
        headers: headers,
      })
      .then((res) => console.log(res))
      .then(function (value) {
        window.location = `./profil`
      })
      .catch((err) => console.log(err))
  }

  const [selectedImage, setSelectedImage] = useState()

  const imageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0])
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage()
  }

  return (
    <ProfileContainer>
      <ProfileInfo
        firstName={myProfile[0].firstName}
        lastName={myProfile[0].lastName}
        imageUrlUser={myProfile[0].imageUrlUser}
        creationTimeUser={myProfile[0].creationTimeUser}
      />
      <form onSubmit={send}>
        <HideInput>
          <input
            type="file"
            id="changeProfilPicture"
            accept="image/*"
            onChange={(event) => {
              const imageUrlUser = event.target.files[0]
              setImageUrlUser(imageUrlUser)
              imageChange(event)
            }}
          />
        </HideInput>
        <LabelChangeProfilPicture htmlFor="changeProfilPicture">
          Changer ma photo de profil
        </LabelChangeProfilPicture>
        {selectedImage && (
          <div>
            <ImgPreview src={URL.createObjectURL(selectedImage)} alt="Aperçu" />
            <button
              onClick={() => {
                removeSelectedImage()
              }}
            >
              Retirer cette image
            </button>
            <button>Envoyer l'image</button>
          </div>
        )}
      </form>
    </ProfileContainer>
  )
}

export default Profile
