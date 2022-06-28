import folder from '../../assets/folder.png'
import { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../utils/style/responsive'
import profileDefault from '../../assets/profileDefault.png'
import post from '../../assets/post.png'
import SupprButton from '../SupprButton'
import colors from '../../utils/style/colors'
import axios from 'axios'

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 5px 5px 10px 1px grey;
  border-radius: 25px;
  padding: 15px 15px;
  margin: 30px 0px;
  @media ${device.mobile} {
    width: 100%;
  }
  @media ${device.tablet} {
    width: 42%;
  }
  @media ${device.desktop} {
    width: 28%;
  }
`

const PostUser = styled.div`
  display: flex;
  align-items: center;
`

const PostUserName = styled.p`
  padding-left: 10px;
`

const PostModifSuppr = styled.div`
  display: flex;
  align-items: center;
`

const PostUserContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const PostImgContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 170px;
`

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ButtonLign = styled.div`
  display: flex;
`

const ProfileUserImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`

const InputStyleText = styled.input`
  padding-left: 10px;
  width: 190px;
  font-size: 13px;
  height: 30px;
  border: none;
  border-radius: 100px;
  &::placeholder {
    font-size: 13px;
  }
  &:focus {
    outline: 2px solid black;
  }
`
const ImgButtonModif = styled.img`
  height: 35px;
  padding-right: 10px;
  &:hover {
    cursor: pointer;
  }
`

const HideButton = styled.div`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

const LabelPostImg = styled.label`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const ImgLabelPostImg = styled.img`
  padding-left: 10px;
  height: 30px;
`

const PreviewImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PreviewImgDiv = styled.div`
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 170px;
`

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  padding: 10px 0px;
  object-fit: cover;
`

const InputStyleDescription = styled.textarea`
  padding-left: 10px;
  padding-top: 10px;
  width: 190px;
  font-size: 13px;
  height: 90px;
  border: none;
  border-radius: 10px;

  &::placeholder {
    font-size: 13px;
  }
  &:focus {
    outline: 2px solid black;
  }
`

const FormLign = styled.div`
  padding: 10px 5px;
`

const FormLignImg = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 5px;
`

const FormSubmit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
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

function ModifButton({
  titleInput,
  descriptionInput,
  imageUrlPostRN,
  firstName,
  lastName,
  creationTimePost,
  modificationTimePost,
  postUserId,
  postId,
  imageUrlUser,
  setApiCalled,
  setIsModifRN,
  index,
}) {
  const [title, setTitle] = useState(titleInput)
  const [description, setDescription] = useState(descriptionInput)
  const [imageUrlPost, setImageUrlPost] = useState()

  const send = (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('title', title)
    data.append('description', description)
    data.append('imageUrlPost', imageUrlPost)

    let login = JSON.parse(localStorage.getItem('login'))

    const headers = {
      Authorization: `Bearer ${login.token}`,
    }

    axios
      .put(`http://localhost:3000/api/post/${postId}`, data, {
        headers: headers,
      })
      .then((res) => console.log(res))
      .then(function (value) {
        setApiCalled(true)
        setIsModifRN(false)
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

  const isImage = imageUrlPostRN !== 'undefined' ? true : false

  const isProfilePicNull = imageUrlUser === null ? false : true

  let login = JSON.parse(localStorage.getItem('login'))

  const isAuth = postUserId === login.userId || postUserId === 1 ? true : false
  return (
    <PostContainer>
      <PostUserContainer>
        <PostUser>
          {isProfilePicNull ? (
            <ProfileUserImg src={imageUrlUser} />
          ) : (
            <ProfileUserImg src={profileDefault} />
          )}
          <PostUserName>
            {firstName} {lastName}{' '}
          </PostUserName>
        </PostUser>
        <PostModifSuppr>
          {isAuth ? (
            <ButtonLign>
              <ImgButtonModif
                src={post}
                alt="Crayon noir qui écrit"
                onClick={(e) => {
                  e.preventDefault()
                  setIsModifRN(false)
                }}
              />
              <SupprButton postId={postId} setApiCalled={setApiCalled} />
            </ButtonLign>
          ) : null}
        </PostModifSuppr>
      </PostUserContainer>
      <form>
        <FormLign>
          <InputStyleText
            id="titleInput"
            type="text"
            value={title}
            placeholder="Titre de la publication"
            onChange={(event) => {
              const { value } = event.target
              setTitle(value)
            }}
            required
          />
        </FormLign>
        {isImage ? (
          <PostImgContainer>
            <PostImg src={imageUrlPostRN} />{' '}
          </PostImgContainer>
        ) : null}
        <FormLignImg>
          <HideButton>
            <input
              id={index}
              type="file"
              accept="image/*"
              onChange={(event) => {
                const imageUrlPost = event.target.files[0]
                setImageUrlPost(imageUrlPost)
                imageChange(event)
              }}
            />
          </HideButton>
          <LabelPostImg htmlFor={index}>
            Changer d'image
            <ImgLabelPostImg alt="Dossier" src={folder} />
          </LabelPostImg>
        </FormLignImg>
        {selectedImage && (
          <PreviewImgContainer>
            <PreviewImgDiv>
              <PreviewImg
                src={URL.createObjectURL(selectedImage)}
                alt="Aperçu"
                width="200"
              />
            </PreviewImgDiv>
            <LabelPostImg
              onClick={() => {
                removeSelectedImage()
              }}
            >
              Retirer cette image
            </LabelPostImg>
          </PreviewImgContainer>
        )}
        <FormLign>
          <InputStyleDescription
            id="descriptionInput"
            type="text"
            value={description}
            placeholder="Description de la publication"
            onChange={(event) => {
              const { value } = event.target
              setDescription(value)
            }}
            required
          />
        </FormLign>
        <FormLignImg>
          <LabelPostImg onClick={() => setIsModifRN(false)}>
            Annuler la modification
          </LabelPostImg>
        </FormLignImg>
        <FormSubmit>
          <LabelForButton onClick={send}>Modifier</LabelForButton>
        </FormSubmit>
      </form>
    </PostContainer>
  )
}

export default ModifButton
