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

const Syntax = styled(SyntaxHighlighter)`
  text-align: justify;
`

const request = axios.create({
  baseURL: 'https://api.github.com'
})

class UserGit extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      error: null
    }
  }

  render() {
    return (
      <StyledDiv>
        <h1>Welcome my Profile</h1>

        {this.state.users.length > 1 &&
          this.state.users.map(user => {
            return (
              <div>
                <StyledName>
                  <h2>{user.login}</h2>
                </StyledName>
                <StyledImg src={user.avatar_url} alt="" />
                <Follow>
                  <p>Followers: {user.followers}</p>{' '}
                  <p>Following: {user.following}</p>
                </Follow>
                <p>
                  URL: <a href={user.html_url}>{user.html_url}</a>
                </p>
                <Syntax style={githubGist}>
                  {JSON.stringify(user, null, 2)}
                </Syntax>
              </div>
            )
          })}
      </StyledDiv>
    )
  }

  componentDidMount() {
    this.getUserProfile('ajinbramantio')
    this.getUserProfile('saktyd')
  }

  getUserProfile = username => {
    request
      .get(`/users/${username}`)
      .then(response => {
        this.setState({
          users: this.state.users.concat(response.data)
        })
      })
      .catch(error => {
        this.setState({
          error: error
        })
      })
  }
}

export default UserGit
