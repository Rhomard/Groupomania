import styled from 'styled-components'
import { useState } from 'react'
import colors from '../../utils/style/colors'

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
  padding-top: 10px;
  &hover {
    cursor: pointer;
  }
`

function CreatePost() {
  let login = JSON.parse(localStorage.getItem('login'))

  const [postInfo, setPostInfo] = useState({
    title: '',
    description: '',
    imageUrlPost: '',
  })

  const handleChangeText = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value })
  }

  const handleChangeImg = (e) => {
    // const filename = document.getElementById('filename').files[0].name
    setPostInfo({ ...postInfo, imageUrlPost: e.target.files[0].name })
  }

  const handleImgTakeBack = () => {
    setPostInfo({ ...postInfo, imageUrlPost: '' })
  }

  console.log(postInfo)

  const handleSubmit = (event) => {
    event.preventDefault()
    removeSelectedImage()
    setPostInfo({
      title: '',
      description: '',
      imageUrlPost: '',
    })

    // const files = event.target.files
    // console.log(files)

    fetch('http://localhost:3000/api/post', {
      method: 'POST',
      // Tell to the API that I will give it json object
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
      // Send my json object
      body: JSON.stringify(postInfo),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      // Redirect to the feed
      .then(function (value) {
        // window.location = `./fildactu`
      })
      // If the API cannot be called
      .catch(function (err) {
        console.log(err)
      })
  }

  const [selectedImage, setSelectedImage] = useState()

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage()
  }

  return (
    <CreatePostContainer>
      <CreatePostTitle>Créez votre publication :</CreatePostTitle>
      <FormPost onSubmit={handleSubmit} enctype="multipart/form-data">
        <FormLign>
          <input
            type="text"
            name="title"
            placeholder="Titre de la publication"
            value={postInfo.title}
            onChange={handleChangeText}
            required
          />
        </FormLign>
        <FormLign>
          <input
            type="text"
            name="description"
            placeholder="Description de la publication"
            value={postInfo.description}
            onChange={handleChangeText}
            required
          />
        </FormLign>
        <FormLign>
          <div>
            <input
              accept="image/*"
              id="filename"
              type="file"
              name="imageUrl"
              value={undefined}
              onChange={(e) => {
                handleChangeImg(e)
                imageChange(e)
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
                    handleImgTakeBack()
                  }}
                >
                  Retirer cette image
                </button>
              </div>
            )}
          </div>
        </FormLign>
        <FormSubmit>
          <button>Publier</button>
        </FormSubmit>
      </FormPost>
    </CreatePostContainer>
  )
}

export default CreatePost
