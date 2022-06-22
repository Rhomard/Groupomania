import { useState } from 'react'

function ModifButton({ id }) {
  const [isOpen, setIsOpen] = useState(false)

  let login = JSON.parse(localStorage.getItem('login'))

  const [changePostInfo, setChangePostInfo] = useState({
    title: '',
    description: '',
  })

  const handleChange = (event) => {
    setChangePostInfo({
      ...changePostInfo,
      [event.target.name]: event.target.value,
    })
  }
  const HandleSubmit = (event) => {
    event.preventDefault()
    setChangePostInfo({ title: '', description: '' })

    fetch(`http://localhost:3000/api/post/${id}`, {
      method: 'PUT',
      // Tell to the API that I will give it json object
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
      // Send my json object
      body: JSON.stringify(changePostInfo),
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

  return isOpen ? (
    <div>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre de la publication"
          value={changePostInfo.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description de la publication"
          value={changePostInfo.description}
          onChange={handleChange}
          required
        />
        <button>Modifier le post</button>
      </form>
      <button onClick={() => setIsOpen(false)}>Annuler modification</button>
    </div>
  ) : (
    <button onClick={() => setIsOpen(true)}>Modifier</button>
  )
}

export default ModifButton
