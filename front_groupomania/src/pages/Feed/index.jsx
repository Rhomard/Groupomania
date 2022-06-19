import styled from 'styled-components'
import colors from '../../utils/style/colors'
import Post from '../../components/Post'
import { useEffect } from 'react'
import { useState } from 'react'

const FeedWrapper = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  width: 500px;
  margin: auto;
`

const FeedTitle = styled.h1`
  padding-left: 20px;
  padding-top: 20px;
`

const PostContainer = styled.div``

function Feed() {
  // let login = JSON.parse(localStorage.getItem('login'))

  // if (!login) {
  //   window.location = `./`
  // }

  const [postData, setPostData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/post`).then((response) =>
      response
        .json()
        .then((postData) => {
          setPostData(postData)
        })
        .catch((error) => console.log(error))
    )
  }, [])

  const [userData, setUsersData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/auth/users`).then((response) =>
      response
        .json()
        .then((usersData) => {
          setUsersData(usersData)
        })
        .catch((error) => console.log(error))
    )
  }, [])

  for (let i = 0; i < postData.length; i++) {
    for (let j = 0; j < userData.length; j++) {
      if (postData[i].userId === userData[j].id) {
        postData[i].authorFirstName = userData[j].firstName
        postData[i].authorLastName = userData[j].lastName
      }
    }
  }

  return (
    <FeedWrapper>
      <FeedTitle>Fil d'actualités</FeedTitle>
      <PostContainer>
        {postData.map((post, index) => (
          <Post
            key={`${post.id}-${index}`}
            firstName={post.authorFirstName}
            lastName={post.authorLastName}
            title={post.title}
            description={post.description}
          />
        ))}
      </PostContainer>
    </FeedWrapper>
  )
}

export default Feed
