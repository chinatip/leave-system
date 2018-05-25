import React from 'react'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Navigation from './Navigation'
import { verifyToken } from 'common/services'
import ManageUser from './ManageUser';
import Profile from './Profile'
import Header from './Header'

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const InnerContainer = styled.div`
  display: flex;
  height: 100%;
`
const ContentContainer = styled.div`
  margin: auto;
  width: 800px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  withRouter
)

const ADMIN_MENU = {
  Profile: 'profile',
  'Manage User': 'manage'
}

class Admin extends React.Component {
  constructor(props) {
    super()

    const { params: { type }} = props.match
    this.state = {
      current: type || 'profile'
    }
  }
  
  handleCurrent = (current) => {
    this.setState({ current })
  }

  renderAdmin() {
    const type = this.state.current
    
    if (type === 'profile') {
      return <Profile />
    } else if (type === 'manage') {
      return <ManageUser edit />
    }

    return <Profile />
  }

  render() {
    const { user, history } = this.props

    return (
      <Container>
        <Header type='Admin' user={user} />
        <InnerContainer>
          <Navigation menus={ADMIN_MENU} history={history} value={this.state.current} onChange={this.handleCurrent} />
          <ContentContainer>{ this.renderAdmin() }</ContentContainer>
        </InnerContainer>
      </Container>
    )
  }
}

export default enhance((props) => {
  const { user, history, match } = props
  const { role } = user

  if(role === 'admin') return <Admin {...props} />
  else {
    history.push(`/${role}`)
    return <noscript />
  }
})

