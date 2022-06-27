import { useState } from 'react'
import colors from '../../utils/style/colors'
import styled from 'styled-components'
import axios from 'axios'
import post from '../../assets/post.png'

const CreatePostContainer = styled.div`
  width: 100%;
  margin: auto;
  background-color: ${colors.secondary};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`

const FormLign = styled.div`
  padding: 10px 5px;
`

const CreatePostTitleLign = styled.div`
  display: flex;
  align-items: center;
`

const CreatePostTitle = styled.h2`
  padding-left: 5px;
`

const ImgCreatePostTitle = styled.img`
  padding-left: 35px;
  height: 25px;
`

const FormPost = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 35px 20px 35px;
`

const FormSubmit = styled.div`
  &hover {
    cursor: pointer;
  }
`

const InputStyle = styled.input`
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

    let imgInput = document.getElementById('imgInput')
    imgInput.value = null

    removeSelectedImage()
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
    <CreatePostContainer>
      <CreatePostTitleLign>
        <ImgCreatePostTitle src={post} alt="Crayon noir qui écrit" />
        <CreatePostTitle>Créer ma publication :</CreatePostTitle>
      </CreatePostTitleLign>
      <FormPost onSubmit={send}>
        <FormLign>
          <InputStyle
            id="titleInput"
            type="text"
            placeholder="Titre de la publication"
            onChange={(event) => {
              const { value } = event.target
              setTitle(value)
            }}
            required
          />
        </FormLign>
        <FormLign>
          <InputStyle
            id="descriptionInput"
            type="text"
            placeholder="Description de la publication"
            onChange={(event) => {
              const { value } = event.target
              setDescription(value)
            }}
            required
          />
        </FormLign>
        <FormLign>
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
          {selectedImage && (
            <div>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Aperçu"
                width="200"
              />
              <button
                onClick={() => {
                  removeSelectedImage()
                }}
              >
                Retirer cette image
              </button>
            </div>
          )}
        </FormLign>
        <FormSubmit>
          <button>Publier</button>
        </FormSubmit>
      </FormPost>
    </CreatePostContainer>
  )
}

export default CreatePost
