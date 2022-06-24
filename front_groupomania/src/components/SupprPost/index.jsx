function SupprButton({ postId }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        handleSupprClick({ postId })
      }}
    >
      Supprimer
    </button>
  )
}

function SupprOnePost({ postId }) {
  let login = JSON.parse(localStorage.getItem('login'))
  fetch(`http://localhost:3000/api/post/${postId}`, {
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

function handleSupprClick({ postId }) {
  SupprOnePost({ postId })
}

export default SupprButton
