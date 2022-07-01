import styled from 'styled-components'
import cross from '../../assets/cross.png'

const ImgButtonCross = styled.img`
  height: 35px;
  &:hover {
    cursor: pointer;
  }
`

function SupprOnePost({ postId, setApiCalled }) {
  let login = JSON.parse(localStorage.getItem('login'))
  fetch(`http://localhost:3000/api/post/${postId}`, {
    method: 'DELETE',
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
      setApiCalled(true)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function handleSupprClick({ postId, setApiCalled }) {
  var res = window.confirm('Êtes-vous sûr de vouloir supprimer?')
  if (res) {
    SupprOnePost({ postId, setApiCalled })
  }
}

function SupprButton({ postId, setApiCalled }) {
  return (
    <ImgButtonCross
      src={cross}
      alt="Croix noir"
      onClick={(e) => {
        e.preventDefault()
        handleSupprClick({ postId, setApiCalled })
      }}
    />
  )
}

export default SupprButton
