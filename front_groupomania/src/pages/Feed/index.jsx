import styled from 'styled-components'
import colors from '../../utils/style/colors'
import Post from '../../components/Post'
import { useEffect } from 'react'
import { useState } from 'react'
import CreatePost from '../../components/CreatePost'
import React from 'react'
import feed from '../../assets/feed.png'
import './feed.css'

const PageContainer = styled.div`
  min-height: calc(100vh - 260px);
  padding-top: 150px;
  padding-bottom: 50px;
  width: 80%;
  margin: auto;
`

const FeedWrapper = styled.div`
  background-color: ${colors.secondary};
  border-radius: 20px;
  width: 100%;
  margin: 25px auto 0px auto;
`

const FeedTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 20px;
  font-size: 20px;
`

const FeedLogo = styled.img`
  height: 50px;
`

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0px 30px;
  border-top: 2px solid black;
`

const NoPostContainer = styled.div`
  padding: 0px 20px 1px 20px;
  border-top: 2px solid black;
  text-align: center;
`

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
          imageUrlUser={post.imageUrlUser}
        />
      ))}
    </PostContainer>
  ) : (
    <NoPostContainer>
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2>En attente de post</h2>
    </NoPostContainer>
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
        <FeedTitle>
          <FeedLogo alt="Fil d'actualités logo" src={feed} />
          <h1>Fil d'actualités</h1>
          <FeedLogo alt="Fil d'actualités logo" src={feed} />
        </FeedTitle>
        <MapData />
      </FeedWrapper>
    </PageContainer>
  )
}

export default Feed
