import { useState } from 'react'
import { useEffect } from 'react'
import heartEmpty from '../../assets/heartEmpty.png'
import heartFull from '../../assets/heartFull.png'
import styled from 'styled-components'

const LikeButtonStyle = styled.button`
  border: none;
  height: 30px;
  margin-left: 10px;
  background: none;
  width: 30px;
  &:hover {
    cursor: pointer;
  }
  margin-bottom: 20px;
`

const LikeLogo = styled.img`
  height: 30px;
`

function LikeButton({ id }) {
  const [isLiked, setIsOpen] = useState(false)

  const [apiCalled, setApiCalled] = useState(null)

  useEffect(() => {
    if (apiCalled !== null) {
      if (apiCalled === true) {
        fetch('http://localhost:3000/api/like', {
          method: 'POST',
          // Tell to the API that I will give it json object
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${login.token}`,
          },
          body: JSON.stringify({ id }),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json()
            }
          })
          // Redirect to the feed
          .then(function (value) {
            setIsOpen(true)
          })
          // If the API cannot be called
          .catch(function (err) {
            console.log(err)
          })
      } else if (apiCalled === false) {
        fetch(`http://localhost:3000/api/like/${id}`, {
          method: 'DELETE',
          // Tell to the API that I will give it json object
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${login.token}`,
          },
          body: JSON.stringify({ id }),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json()
            }
          })
          // Redirect to the feed
          .then(function (value) {
            setIsOpen(false)
          })
          // If the API cannot be called
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }, [apiCalled])

  let login = JSON.parse(localStorage.getItem('login'))

  fetch(`http://localhost:3000/api/like/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${login.token}`,
    },
  }).then((response) =>
    response
      .json()
      .then((likesData) => {
        if (likesData.length) {
          const like = likesData.find((e) => e.userId === login.userId)
          if (like) {
            setIsOpen(true)
          }
        }
      })
      .catch((error) => console.log(error))
  )

  return isLiked ? (
    <LikeButtonStyle>
      <LikeLogo
        src={heartFull}
        onClick={() => {
          setApiCalled(false)
        }}
      />
    </LikeButtonStyle>
  ) : (
    <LikeButtonStyle>
      <LikeLogo
        src={heartEmpty}
        onClick={() => {
          setApiCalled(true)
        }}
      />
    </LikeButtonStyle>
  )
}

export default LikeButton
