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

const LikeLign = styled.div`
  height: auto;
  display: flex;
  align-items: center;
`

const LikeCount = styled.p`
  margin: 0px 0px 15px 15px;
`

function LikeButton({ postId }) {
  const [isLiked, setIsLiked] = useState(false)

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
          body: JSON.stringify({ postId }),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json()
            }
          })
          // Redirect to the feed
          .then(function (value) {
            setIsLiked(true)
          })
          // If the API cannot be called
          .catch(function (err) {
            console.log(err)
          })
      } else if (apiCalled === false) {
        fetch(`http://localhost:3000/api/like/${postId}`, {
          method: 'DELETE',
          // Tell to the API that I will give it json object
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${login.token}`,
          },
          body: JSON.stringify({ postId }),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json()
            }
          })
          // Redirect to the feed
          .then(function (value) {
            setIsLiked(false)
          })
          // If the API cannot be called
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }, [apiCalled])

  let login = JSON.parse(localStorage.getItem('login'))

  useEffect(() => {
    fetch(`http://localhost:3000/api/like/${postId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((likesData) => {
          setLikeCount(likesData.length)
          if (likesData.length) {
            const like = likesData.find((e) => e.userId === login.userId)
            if (like) {
              setIsLiked(true)
            }
          }
        })
        .catch((error) => console.log(error))
    )
  }, [isLiked])

  const [likeCount, setLikeCount] = useState()

  const isPlural = likeCount > 1 ? true : false

  if (likeCount === 0) {
    return isLiked ? (
      <LikeLign>
        <LikeButtonStyle>
          <LikeLogo
            src={heartFull}
            onClick={() => {
              setApiCalled(false)
            }}
          />
        </LikeButtonStyle>
      </LikeLign>
    ) : (
      <LikeLign>
        <LikeButtonStyle>
          <LikeLogo
            src={heartEmpty}
            onClick={() => {
              setApiCalled(true)
            }}
          />
        </LikeButtonStyle>
      </LikeLign>
    )
  } else {
    return isLiked ? (
      <LikeLign>
        <LikeButtonStyle>
          <LikeLogo
            src={heartFull}
            onClick={() => {
              setApiCalled(false)
            }}
          />
        </LikeButtonStyle>
        <LikeCount>
          {likeCount} {isPlural ? 'personnes ont liké' : 'personne a liké'}
        </LikeCount>
      </LikeLign>
    ) : (
      <LikeLign>
        <LikeButtonStyle>
          <LikeLogo
            src={heartEmpty}
            onClick={() => {
              setApiCalled(true)
            }}
          />
        </LikeButtonStyle>
        <LikeCount>
          {likeCount} {isPlural ? 'personnes ont liké' : 'personne a liké'}
        </LikeCount>
      </LikeLign>
    )
  }
}

export default LikeButton
