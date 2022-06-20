import styled from 'styled-components'
import profileDefault from '../../assets/profileDefault.png'
import PropTypes from 'prop-types'

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
  padding-bottom: 10px;
`

function Post({ title, description, firstName, lastName }) {
  const HandleDelete = (event) => {
    event.preventDefault()

    fetch('http://localhost:3000/api/post/id', {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
  }

  return (
    <PostContainer>
      <PostUser>
        <PostUserImg src={profileDefault} />
        <PostUserName>
          {firstName} {lastName}
        </PostUserName>
      </PostUser>
      <PostTitle>{title}</PostTitle>
      <PostDescription>{description}</PostDescription>
      <button onChange={HandleDelete}>Supprimer</button>
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
}

export default Post
