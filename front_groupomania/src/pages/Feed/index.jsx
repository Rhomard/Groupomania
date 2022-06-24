import styled from 'styled-components'
import colors from '../../utils/style/colors'
import Post from '../../components/Post'
import { useEffect } from 'react'
import { useState } from 'react'
import CreatePost from '../../components/CreatePost'
import React from 'react'

const PageContainer = styled.div`
  width: 500px;
  margin: auto;
`

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

function MapData() {
  let login = JSON.parse(localStorage.getItem('login'))

  const [postData, setPostData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/post`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((postData) => {
          setPostData(postData)
        })
        .catch((error) => console.log(error))
    )
  }, [login.token])

  const isNoPost = postData.length !== 0 || !postData ? true : false

  return isNoPost ? (
    <PostContainer>
      {postData.map((post, index) => (
        <Post
          key={`${post.id}-${index}`}
          imageUrlPost={post.imageUrlPost}
          firstName={post.firstName}
          lastName={post.lastName}
          title={post.title}
          description={post.description}
          creationTimePost={post.creationTimePost}
          modificationTimePost={post.modificationTimePost}
          postUserId={post.userId}
          postId={post.id}
        />
      ))}
    </PostContainer>
  ) : (
    <PostContainer>
      <h2>Pas de post pour l'instant</h2>
    </PostContainer>
  )
}

function Feed() {
  let login = JSON.parse(localStorage.getItem('login'))

  if (!login) {
    window.location = `./`
  }

  return (
    <PageContainer>
      <CreatePost />
      <FeedWrapper>
        <FeedTitle>Fil d'actualités</FeedTitle>
        <MapData />
      </FeedWrapper>
    </PageContainer>
  )
}

export default Feed
