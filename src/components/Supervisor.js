import React from 'react'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Navigation from './Navigation'
import { verifyToken } from 'common/services'
import ManageUser from './ManageUser';
import Profile from './Profile'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`
const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex
  align-items: center;
  justify-content: flex-end;
`
const InnerContainer = styled.div`
  display: flex;
`

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  withRouter
)

const ADMIN_MENU = {
  Profile: 'profile',
  'Manage User': 'manage'
}

const SUP_MENU = {
  Profile: 'profile',
  'Manage Subordinates': 'manage',
  'Manage Subordinates': 'leaves'
}

const SUB_MENU = {
  Profile: 'user/profile',
  'Manage Subordinates': 'user/leaves'
}

class Admin extends React.Component {
  state = {
    current: 'profile'
  }

  handleCurrent = (current) => {
    this.setState({ current })
  }

  renderAdmin() {
    const type = this.state.current
    
    if (type === 'profile') {
      return <Profile />
    } else if (type === 'manage') {
      return <ManageUser />
    }

    return <Profile />
  }

  render() {
    const { user, history } = this.props

    return (
      <Container>
        <Header>{user.username}</Header>
        <InnerContainer>
          <Navigation menus={SUP_MENU} history={history} value={this.state.current} onChange={this.handleCurrent} />
          { this.renderAdmin() }
        </InnerContainer>
      </Container>
    )
  }
}

export default enhance((props) => {
  const { user, history, match } = props
  const { role } = user

  if(role === 'supervisor') return <Admin {...props} />
  else {
    history.push(`/${role}`)
    return <noscript />
  }
})

