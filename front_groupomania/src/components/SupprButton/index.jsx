import styled from 'styled-components'
import cross from '../../assets/cross.png'

const ImgButtonCross = styled.img`
  height: 35px;
  &:hover {
    cursor: pointer;
  }
`

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

function SupprOnePost({ postId, setApiCalled }) {
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
      setApiCalled(true)
    })
    // If the API cannot be called
    .catch(function (err) {
      console.log(err)
    })
}

function handleSupprClick({ postId, setApiCalled }) {
  SupprOnePost({ postId, setApiCalled })
}

export default SupprButton
