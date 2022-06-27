import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import post from '../../assets/post.png'

const ImgButtonModif = styled.img`
  height: 35px;
  padding-right: 10px;
  &:hover {
    cursor: pointer;
  }
`

function ModifButton({ postId, titleInput, descriptionInput }) {
  const [isOpen, setIsOpen] = useState(false)

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

  return isOpen ? (
    <div>
      <form onSubmit={send}>
        <input
          type="text"
          value={title}
          onChange={(event) => {
            const { value } = event.target
            setTitle(value)
          }}
          required
        />
        <input
          type="text"
          value={description}
          onChange={(event) => {
            const { value } = event.target
            setDescription(value)
          }}
          required
        />
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
              }}
            >
              Retirer cette image
            </button>
          </div>
        )}
        <button>Modifier le post</button>
      </form>
      <button onClick={() => setIsOpen(false)}>Annuler modification</button>
    </div>
  ) : (
    <ImgButtonModif
      src={post}
      alt="Crayon noir qui écrit"
      onClick={() => setIsOpen(true)}
    />
  )
}

export default ModifButton
