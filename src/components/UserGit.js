import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const StyledDiv = styled.div`
  text-align: center;
`
const StyledName = styled.div`
  margin-top: 10px;
`
const StyledImg = styled.img`
  margin-top: 10px;
  border-radius: 50vw;
  height: 300px;
`
const Follow = styled.div`
  display: flex;
  justify-content: space-around;
`
const request = axios.create({
  baseURL: 'https://api.github.com'
})

class UserGit extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  render() {
    console.log(this.state.data)

    return (
      <div>
        <StyledDiv>
          <h1>Welcome my Profile</h1>
          <StyledName>
            <h2>{this.state.data.login}</h2>
          </StyledName>
          <StyledImg src={this.state.data.avatar_url} alt="" />
          <Follow>
            <p>
              followers : {this.state.data.following}
              {this.state.data.followers}.k
            </p>{' '}
            <p>following : {this.state.data.followers}</p>
          </Follow>
        </StyledDiv>
        <p>
          URL: <a href={this.state.data.html_url}>{this.state.data.html_url}</a>
        </p>
        <SyntaxHighlighter style={githubGist}>
          {JSON.stringify(this.state.data, null, 2)}
        </SyntaxHighlighter>
      </div>
    )
  }
  componentDidMount() {
    request
      .get('/users/ajinbramantio')
      .then(response => {
        this.setState({
          data: response.data
        })
      })
      .catch(error => {
        this.setState({
          data: error
        })
      })
  }
}

export default UserGit
