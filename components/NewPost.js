import React, { Component } from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
  margin:10px 4px;
  resize:vertical;
`
const Container = styled.div`
  display:flex;
  flex-direction:${ props => (props.row ? "row" : "column")};
  justify-content:${ props => (props.center ? "center" : "flex-start")}
  text-align:${ props => (props.align ? "center" : "flex-start")}
  `
const Submit = styled.button`
  background-color: #555555;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-family:Verdana;
  :hover {
    background-color:#000000;
    zoom:;
    transition: ease-out 0.7s;
  }
  `

export default class NewPost extends Component {
  
  state = {
      content:null,
      author: this.props.postAuthor
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addPost(this.state);
  }

  render() {

    return (
      <Container center align>
        <form onSubmit={this.handleSubmit}>
          <Container>
            <TextArea id="content" placeholder="Jot down your thoughts." onChange={this.handleChange}></TextArea>
            <br/>
            <Submit type="submit">Post to Wall</Submit>
          </Container>
        </form>
      </Container>
    )
  }
}
