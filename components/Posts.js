import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
const WrapperContainer = styled.section`
  display:flex;
  flex-direction:column;
  margin:10px 0;
  padding:5px;
  border-radius:4px;
  background-color:hsla(4,55%,40%,0.3)
`

const ElementContainer = styled.div`
 display:flex;
 justify-content:${ props => (props.center ? "center" : props.end ? "flex-end":"flex-start")};
 padding:${ props => (props.center ? 0 : props.end ? "0 20px 0 0":"0 0 0 20px")};
 font-family: 'Ubuntu', sans-serif;
`
const Posts = ({posts, postAuthor}) => {

  const postList = posts.map(post => {
    if (post!== 0){
      return (
        <div className="post" key={post.id}>
        <WrapperContainer>
          <ElementContainer><p>{post.author}</p></ElementContainer>
          <ElementContainer center><h3>{post.content}</h3></ElementContainer>
          <ElementContainer end><i>{post.date}</i></ElementContainer>
        </WrapperContainer>
        </div>
      )
    }
    else {return "No posts!"}
  })
  return (
    <div>
      <div className="ninja-list">
      {postList}
      </div>
    </div>
  )
}

export default Posts