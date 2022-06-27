import styled from 'styled-components'
import profileDefault from '../../assets/profileDefault.png'
import PropTypes from 'prop-types'
import React from 'react'
import ModifButton from '../ModifPost'
import SupprButton from '../SupprPost'
import { dateFormat } from '../../utils/DateFormat'
import LikeButton from '../LikeButton'
import { device } from '../../utils/style/responsive'

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 5px 5px 10px 1px grey;
  border-radius: 25px;
  padding: 15px 15px;
  margin: 30px 0px;
  @media ${device.mobile} {
    width: 100%;
  }
  @media ${device.tablet} {
    width: 42%;
  }
  @media ${device.desktop} {
    width: 28%;
  }
`

const PostUser = styled.div`
  display: flex;
  align-items: center;
`

const PostUserName = styled.p`
  padding-left: 10px;
`

const PostModifSuppr = styled.div`
  display: flex;
  align-items: center;
`

const PostUserContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const PostTitle = styled.h2`
  font-size: 18px;
`

const PostDescription = styled.p`
  font-weight: bold;
  font-size: 13px;
`

const PostImgContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 170px;
`

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PostCreation = styled.p`
  font-size: 12px;
  padding-top: 13px;
  margin: 0;
`

const ButtonLign = styled.div``

const ProfileUserImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`

function Post({
  title,
  description,
  imageUrlPost,
  firstName,
  lastName,
  creationTimePost,
  modificationTimePost,
  postUserId,
  postId,
  imageUrlUser,
  setApiCalled,
}) {
  let login = JSON.parse(localStorage.getItem('login'))

  let isAuth = false
  if (postUserId === login.userId || login.userId === 1) {
    isAuth = true
  }

  const isModify = creationTimePost !== modificationTimePost ? true : false

  const isImage = imageUrlPost !== 'undefined' ? true : false

  const isProfilePicNull = imageUrlUser === null ? false : true

  return (
    <PostContainer>
      <PostUserContainer>
        <PostUser>
          {isProfilePicNull ? (
            <ProfileUserImg src={imageUrlUser} />
          ) : (
            <ProfileUserImg src={profileDefault} />
          )}
          <PostUserName>
            {firstName} {lastName}{' '}
          </PostUserName>
        </PostUser>
        <PostModifSuppr>
          {isAuth ? (
            <ButtonLign>
              <ModifButton
                postId={postId}
                titleInput={title}
                descriptionInput={description}
              />
              <SupprButton postId={postId} setApiCalled={setApiCalled} />
            </ButtonLign>
          ) : null}
        </PostModifSuppr>
      </PostUserContainer>
      <PostTitle>{title}</PostTitle>
      {isImage ? (
        <PostImgContainer>
          <PostImg src={imageUrlPost} />{' '}
        </PostImgContainer>
      ) : null}
      <PostDescription>{description}</PostDescription>

      <LikeButton postId={postId} />

      {isModify ? (
        <PostCreation>
          Modifié il y a{' '}
          {modificationTimePost &&
            dateFormat(new Date(modificationTimePost), 'MMM dd yyyy')}
        </PostCreation>
      ) : (
        <PostCreation>
          Créé il y a{' '}
          {creationTimePost &&
            dateFormat(new Date(creationTimePost), 'MMM dd yyyy')}
        </PostCreation>
      )}
    </PostContainer>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

Post.defaultProps = {
  title: 'Titre du post',
  description: 'Description du post',
  firstName: 'Prénom',
  lastName: 'Nom',
  creationTime: '00:00:00',
}

export default Post
