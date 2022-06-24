import styled from 'styled-components'
import profileDefault from '../../assets/profileDefault.png'
import PropTypes from 'prop-types'
import React from 'react'
import ModifButton from '../ModifPost'
import SupprButton from '../SupprPost'
import { dateFormat } from '../../utils/DateFormat'
import LikeButton from '../LikeButtonTest'

const PostContainer = styled.div`
  border-top: 2px solid white;
  width: 85%;
  margin: auto;
  padding: 20px 0px;
`

const PostUser = styled.div`
  display: flex;
  align-items: center;
`

const PostUserName = styled.p`
  padding-left: 10px;
`

const PostTitle = styled.h2``

const PostDescription = styled.p`
  font-weight: bold;
`

const PostImg = styled.img`
  width: 100%;
  border-radius: 10px;
`

const PostCreation = styled.p`
  font-size: 1vw;
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
      <PostUser>
        {isProfilePicNull ? (
          <ProfileUserImg src={imageUrlUser} />
        ) : (
          <ProfileUserImg src={profileDefault} />
        )}
        <PostUserName>
          {firstName} {lastName}
        </PostUserName>
      </PostUser>
      <PostTitle>{title}</PostTitle>
      {isImage ? <PostImg src={imageUrlPost} /> : null}
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

      {isAuth ? (
        <ButtonLign>
          <SupprButton postId={postId} />
          <ModifButton
            postId={postId}
            titleInput={title}
            descriptionInput={description}
          />
        </ButtonLign>
      ) : null}
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
