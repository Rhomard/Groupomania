import styled from 'styled-components'
import profileDefault from '../../assets/profileDefault.png'
import PropTypes from 'prop-types'

const PostWrapper = styled.div`
  width: 500px;
  margin: auto;
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
  padding-bottom: 20px;
`

function Post({ title, description, firstName, lastName }) {
  return (
    <PostWrapper>
      <PostUser>
        <PostUserImg src={profileDefault} />
        <PostUserName>
          {firstName} {lastName}
        </PostUserName>
      </PostUser>
      <PostTitle>{title}</PostTitle>
      <PostDescription>{description}</PostDescription>
    </PostWrapper>
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
}

export default Post
