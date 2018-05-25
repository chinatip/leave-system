import React from 'react'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Navigation from './Navigation'
import { verifyToken } from 'common/services'
import ManageUser from './ManageUser';
import Profile from './Profile'
import Leave from './Leave'
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

const SUB_MENU = {
  Profile: 'profile',
  'Leave': 'leaves'
}

class Admin extends React.Component {
  state = {
    current: 'profile'
  }

  handleCurrent = (current) => {
    this.setState({ current })
  }

  renderSubordinate() {
    const type = this.state.current
    
    if (type === 'profile') {
      return <Profile />
    } else if (type === 'leaves') {
      return <Leave />
    }

    return <Profile />
  }

  render() {
    const { user, history } = this.props

    return (
      <Container>
        <Header type='Subordinate' user={user} />
        <InnerContainer>
          <Navigation menus={SUB_MENU} history={history} value={this.state.current} onChange={this.handleCurrent} />
          <ContentContainer>{ this.renderSubordinate() }</ContentContainer>
        </InnerContainer>
      </Container>
    )
  }
}

export default enhance((props) => {
  const { user, history, match } = props
  const { role } = user

  if(role === 'subordinate') return <Admin {...props} />
  else {
    history.push(`/${role}`)
    return <noscript />
  }
})

