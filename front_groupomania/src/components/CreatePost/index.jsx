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
  })

  const handleChange = (event) => {
    setPostInfo({ ...postInfo, [event.target.name]: event.target.value })
  }

  const HandleSubmit = (event) => {
    event.preventDefault()
    setPostInfo({ title: '', description: '' })

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
        window.location = `./fildactu`
      })
      // If the API cannot be called
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <CreatePostContainer>
      <CreatePostTitle>Créez votre publication :</CreatePostTitle>
      <FormPost onSubmit={HandleSubmit}>
        <FormLign>
          <input
            type="text"
            name="title"
            placeholder="Titre de la publication"
            value={postInfo.title}
            onChange={handleChange}
            required
          />
        </FormLign>
        <FormLign>
          <input
            type="text"
            name="description"
            placeholder="Description de la publication"
            value={postInfo.description}
            onChange={handleChange}
            required
          />
        </FormLign>
        <FormSubmit>
          <button>Publier</button>
        </FormSubmit>
      </FormPost>
    </CreatePostContainer>
  )
}

export default CreatePost
