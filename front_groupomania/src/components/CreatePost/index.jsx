import { useState } from 'react'
import colors from '../../utils/style/colors'
import styled from 'styled-components'
import axios from 'axios'

const CreatePostContainer = styled.div`
  width: 480px;
  background-color: ${colors.secondary};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`

const FormLign = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
`

const CreatePostTitle = styled.h2``

const FormPost = styled.form``

const FormSubmit = styled.div`
  padding-bottom: 30px;
  padding-top: 10px;
  padding-left: 20px;
  &hover {
    cursor: pointer;
  }
`

function CreatePost() {
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
        window.location = `./fildactu`
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

  //   const handleImgTakeBack = () => {
  //     setImageUrlPost(undefined)
  //   }

  return (
    <CreatePostContainer>
      <CreatePostTitle>Créez votre publication :</CreatePostTitle>
      <FormPost>
        <FormLign>
          <input
            type="text"
            placeholder="Titre de la publication"
            onChange={(event) => {
              const { value } = event.target
              setTitle(value)
            }}
          />
        </FormLign>
        <FormLign>
          <input
            type="text"
            placeholder="Description de la publication"
            onChange={(event) => {
              const { value } = event.target
              setDescription(value)
            }}
          />
        </FormLign>
        <FormLign>
          <input
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
                  //   handleImgTakeBack()
                }}
              >
                Retirer cette image
              </button>
            </div>
          )}
        </FormLign>
        <FormSubmit>
          <button onClick={send}>Publier</button>
        </FormSubmit>
      </FormPost>
    </CreatePostContainer>
  )
}

export default CreatePost
