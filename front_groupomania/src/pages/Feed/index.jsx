import styled from 'styled-components'
import colors from '../../utils/style/colors'
import Post from '../../components/Post'
import { useEffect } from 'react'
import { useState } from 'react'
import CreatePost from '../../components/CreatePost'
import React from 'react'
import feed from '../../assets/feed.png'
import './feed.css'
import { Navigate } from 'react-router-dom'
import { device } from '../../utils/style/responsive'

const PageContainer = styled.div`
  padding-bottom: 50px;
  margin: auto;
  @media ${device.mobile} {
    min-height: calc(100vh - 260px);
    width: 100%;
    padding-top: 275px;
  }
  @media ${device.tablet} {
    min-height: calc(100vh - 260px);
    width: 80%;
    padding-top: 150px;
  }
  @media ${device.desktop} {
    min-height: calc(100vh - 260px);
    width: 80%;
    padding-top: 150px;
  }
`

const FeedWrapper = styled.div`
  background-color: ${colors.secondary};
  width: 100%;
  margin: 25px auto 0px auto;
  @media ${device.mobile} {
    border-radius: 0px;
  }
  @media ${device.tablet} {
    border-radius: 20px;
  }
  @media ${device.desktop} {
    border-radius: 20px;
  }
`

const FeedTitleLign = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 20px;
`

const FeedTitle = styled.h1`
  @media ${device.mobile} {
    font-size: 30px;
  }
  @media ${device.tablet} {
    font-size: 40px;
  }
  @media ${device.desktop} {
    font-size: 40px;
  }
`

const FeedLogo = styled.img`
  @media ${device.mobile} {
    height: 40px;
  }
  @media ${device.tablet} {
    height: 50px;
  }
  @media ${device.desktop} {
    height: 50px;
  }
`

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  margin: 0px 30px;
  border-top: 2px solid black;
`

const NoPostContainer = styled.div`
  padding: 0px 20px 1px 20px;
  border-top: 2px solid black;
  text-align: center;
`

function MapData({ apiCalled, setApiCalled }) {
  let login = JSON.parse(localStorage.getItem('login'))

  const [postData, setPostData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/post`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
    })
      .then((response) =>
        response.json().then((postData) => {
          setPostData(postData)
          setApiCalled(null)
        })
      )
      .catch((error) => {
        console.log(error)
        alert(
          'Toutes nos excuses, impossible de se connecter à la base de données'
        )
      })
  }, [apiCalled]) // eslint-disable-line react-hooks/exhaustive-deps

  const isNoPost = postData.length !== 0 ? true : false

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
          setApiCalled={setApiCalled}
          index={index}
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
      <h2>En attente de posts</h2>
    </NoPostContainer>
  )
}

function Feed() {
  const [apiCalled, setApiCalled] = useState(null)

  let login = JSON.parse(localStorage.getItem('login'))

  if (!login) {
    return <Navigate to="/" />
  }

  return (
    <PageContainer>
      <CreatePost setApiCalled={setApiCalled} />
      <FeedWrapper>
        <FeedTitleLign>
          <FeedLogo alt="Fil d'actualités logo" src={feed} />
          <FeedTitle>Fil d'actualités</FeedTitle>
          <FeedLogo alt="Fil d'actualités logo" src={feed} />
        </FeedTitleLign>
        <MapData apiCalled={apiCalled} setApiCalled={setApiCalled} />
      </FeedWrapper>
    </PageContainer>
  )
}

export default Feed
