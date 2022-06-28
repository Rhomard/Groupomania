import styled from 'styled-components'
import ProfileInfo from '../../components/ProfileInfo'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { device } from '../../utils/style/responsive'
import folder from '../../assets/folder.png'
import colors from '../../utils/style/colors'

const ProfileContainer = styled.div`
  width: 500px;
  height: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  @media ${device.mobile} {
    min-height: calc(100vh - 115px);
    padding-top: 175px;
  }
  @media ${device.tablet} {
    min-height: calc(100vh - 115px);
    padding-top: 150px;
  }
  @media ${device.desktop} {
    min-height: calc(100vh - 115px);
    padding-top: 150px;
  }
`

const ImgLabelPostImg = styled.img`
  padding-left: 10px;
  height: 30px;
`

const HideInput = styled.div`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

const PreviewImgColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const LabelPostImg = styled.label`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const PreviewImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 350px;
`

const PreviewImg = styled.img`
  width: 300px;
  padding: 10px 0px;
`
const HideButton = styled.div`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

const FormSubmit = styled.div`
  &hover {
    cursor: pointer;
  }
`

const LabelForButton = styled.label`
  padding: 10px 20px;
  text-align: center;
  font-size: 15px;
  border-radius: 100px;
  border: 2px solid;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 15px 1px ${colors.primary};
  }
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
        .catch((error) => {
          console.log(error)
          alert(
            'Toutes nos excuses, impossible de se connecter à la base de données'
          )
        })
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

  if (!login) {
    return <Navigate to="/" />
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
        <PreviewImgColumn>
          <LabelPostImg htmlFor="changeProfilPicture">
            Choisir une nouvelle photo de profil
            <ImgLabelPostImg alt="Dossier" src={folder} />
          </LabelPostImg>
          {selectedImage && (
            <PreviewImgContainer>
              <PreviewImg
                src={URL.createObjectURL(selectedImage)}
                alt="Aperçu"
                width="200"
              />
              <HideButton>
                <button
                  id="removeImg"
                  onClick={() => {
                    removeSelectedImage()
                  }}
                >
                  Retirer cette image
                </button>
              </HideButton>
              <LabelPostImg htmlFor="removeImg">
                Retirer cette image
              </LabelPostImg>
              <FormSubmit>
                <HideButton>
                  <button id="createPost">Changer ma photo de profil</button>
                </HideButton>
                <LabelForButton htmlFor="createPost">
                  Changer ma photo de profil
                </LabelForButton>
              </FormSubmit>
            </PreviewImgContainer>
          )}
        </PreviewImgColumn>
      </form>
    </ProfileContainer>
  )
}

export default Profile
