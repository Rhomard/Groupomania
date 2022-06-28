import { useState } from 'react'
import colors from '../../utils/style/colors'
import styled from 'styled-components'
import axios from 'axios'
import post from '../../assets/post.png'
import folder from '../../assets/folder.png'
import { device } from '../../utils/style/responsive'

const CreatePostContainer = styled.div`
  width: 100%;
  background-color: ${colors.secondary};
  flex-direction: column;
  @media ${device.mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px;
    height: 600px;
  }
  @media ${device.tablet} {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 20px;
    height: 100%;
  }
  @media ${device.desktop} {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 20px;
    height: 100%;
  }
`

const FormLign = styled.div`
  padding: 10px 5px;
`

const CreatePostTitleLign = styled.div`
  @media ${device.mobile} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media ${device.tablet} {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  @media ${device.desktop} {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`

const CreatePostTitle = styled.h2`
  padding-left: 5px;
`

const ImgCreatePostTitle = styled.img`
  padding-left: 35px;
  height: 25px;
  @media ${device.mobile} {
    padding-left: 0px;
  }
  @media ${device.tablet} {
    padding-left: 35px;
  }
  @media ${device.desktop} {
    padding-left: 35px;
  }
`

const FormPost = styled.form`
  padding: 10px 35px 20px 35px;
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  @media ${device.mobile} {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  @media ${device.desktop} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

const FormSubmit = styled.div`
  &hover {
    cursor: pointer;
  }
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

const HideButton = styled.div`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
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
  height: 200px;
  padding: 10px 0px;
`

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PreviewImgColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputTextColumn = styled.div`
  display: flex;
  flex-direction: column;
`

function CreatePost({ setApiCalled }) {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
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
      .post('http://localhost:3000/api/post', data, {
        headers: headers,
      })
      .then((res) => console.log(res))
      .then(function (value) {
        setApiCalled(true)
      })
      .catch((err) => console.log(err))

    let titleInput = document.getElementById('titleInput')
    titleInput.value = ''

    let descriptionInput = document.getElementById('descriptionInput')
    descriptionInput.value = ''

    removeSelectedImage()
    setImageUrlPost(undefined)
  }

  const [selectedImage, setSelectedImage] = useState()

  const imageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0])
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage()
    setImageUrlPost(undefined)
  }

  return (
    <CreatePostContainer>
      <CreatePostTitleLign>
        <ImgCreatePostTitle src={post} alt="Crayon noir qui écrit" />
        <CreatePostTitle>Créer ma publication :</CreatePostTitle>
      </CreatePostTitleLign>
      <FormPost onSubmit={send}>
        <InputTextColumn>
          <FormLign>
            <InputStyleText
              id="titleInput"
              type="text"
              placeholder="Titre de la publication"
              onChange={(event) => {
                const { value } = event.target
                setTitle(value)
              }}
              required
            />
            <label htmlFor="titleInput" style={{ display: 'none' }}>
              Titre de la publication
            </label>
          </FormLign>

          <FormLign>
            <InputStyleDescription
              id="descriptionInput"
              type="text"
              placeholder="Description de la publication"
              onChange={(event) => {
                const { value } = event.target
                setDescription(value)
              }}
              required
            />
            <label htmlFor="descriptionInput" style={{ display: 'none' }}>
              Description de la publication
            </label>
          </FormLign>
        </InputTextColumn>
        <FormLign>
          <HideButton>
            <input
              id="imgInput"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const imageUrlPost = event.target.files[0]
                setImageUrlPost(imageUrlPost)
                imageChange(event)
              }}
            />
          </HideButton>
          <PreviewImgColumn>
            <LabelPostImg htmlFor="imgInput">
              Ajouter une image
              <ImgLabelPostImg alt="Dossier" src={folder} />
            </LabelPostImg>
            {selectedImage && (
              <PreviewImgContainer>
                <PreviewImgDiv>
                  <PreviewImg
                    src={URL.createObjectURL(selectedImage)}
                    alt="Aperçu"
                  />
                </PreviewImgDiv>
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
              </PreviewImgContainer>
            )}
          </PreviewImgColumn>
        </FormLign>
        <FormSubmit>
          <HideButton>
            <button id="createPost">Publier</button>
          </HideButton>
          <LabelForButton htmlFor="createPost">Publier</LabelForButton>
        </FormSubmit>
      </FormPost>
    </CreatePostContainer>
  )
}

export default CreatePost
