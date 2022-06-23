import styled from 'styled-components'
import profileDefault from '../../assets/profileDefault.png'
import PropTypes from 'prop-types'
// import { useState } from 'react'
// import { useEffect } from 'react'
import React from 'react'
import ModifButton from '../ModifPost/ModifButton'
import SupprButton from '../SupprButton'
import { dateFormat } from '../../utils/DateFormat'
import LikeButton from '../LikeButton'

const PostContainer = styled.div`
  width: 500px;
  margin: auto;
  padding: 20px 0px;
`

const PostUser = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`

const PostUserImg = styled.img`
  height: 50px;
`

const PostUserName = styled.p`
  padding-left: 10px;
`

const PostTitle = styled.h2`
  padding-left: 20px;
`

const PostDescription = styled.p`
  padding-left: 20px;
`

const PostImg = styled.img`
  height: 100px;
  padding-left: 20px;
`

const PostCreation = styled.p`
  padding-left: 20px;
`

const ButtonLign = styled.div`
  padding-left: 20px;
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
}) {
  let login = JSON.parse(localStorage.getItem('login'))

  let isAuth = false
  if (postUserId === login.userId || login.userId === 1) {
    isAuth = true
  }

  const isModify = creationTimePost !== modificationTimePost ? true : false

  const isImage = imageUrlPost !== 'undefined' ? true : false

  return (
    <PostContainer>
      <PostUser>
        <PostUserImg src={profileDefault} />
        <PostUserName>
          {firstName} {lastName}
        </PostUserName>
      </PostUser>
      <PostTitle>{title}</PostTitle>
      {isImage ? <PostImg src={imageUrlPost} /> : null}
      <PostDescription>{description}</PostDescription>

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

      <LikeButton id={postId} />

      {isAuth ? (
        <ButtonLign>
          <SupprButton id={postId} />
          <ModifButton id={postId} />
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
