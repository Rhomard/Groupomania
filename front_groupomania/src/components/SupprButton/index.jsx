function SupprButton({ id }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        handleSupprClick({ id })
      }}
    >
      Supprimer
    </button>
  )
}

function SupprOnePost({ id }) {
  let login = JSON.parse(localStorage.getItem('login'))
  fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE',
    // Tell to the API that I will give it json object
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${login.token}`,
    },
  })
    .then(function (res) {
      if (res.ok) {
        return res.json()
      }
    })
    .then((value) => {
      window.location = `./fildactu`
    })
    // If the API cannot be called
    .catch(function (err) {
      console.log(err)
    })
}

function handleSupprClick({ id }) {
  SupprOnePost({ id })
}

export default SupprButton
