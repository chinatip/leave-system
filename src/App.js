import React, { Component } from 'react';
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './Login'
import Admin from './components/Admin'
import Profile from './components/Profile'
import ManageUser from './components/ManageUser'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route exact path="/admin" render={() => <Redirect to="/admin/profile" />} />
            <Route path="/admin/:type" component={Admin} />
            {/* <Route path="/user/manage" component={Profile} /> */}
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
