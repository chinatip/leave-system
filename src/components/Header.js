import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  padding: 10px 25px;
  width: 100%;
  background: #1890ff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 1px rgb(24, 144, 255);
  margin-bottom: 10px;
`
const Type = styled.div`
  font-size: 25px;
  font-weight: bold;
`
const User = styled.div`
  font-size: 16px;
`
const UserContainer = styled.div`
  display: flex;
  align-items: baseline;
  a {
    color: white;

    &:hover {
      color: rgba(255, 255, 255, 0.79);
    }
  }
`
const Signout = styled(Link)`
  margin-left: 20px;
  text-decoration: underline;
`

export default ({ type, user }) => {
  return (
    <Container>
      <Type>{type}</Type>
      <UserContainer>
        <User>{user.username}</User>
        <Signout to='/login'>sign out</Signout>
      </UserContainer>
    </Container>
  )
}