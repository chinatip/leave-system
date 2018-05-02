import React, { Component } from 'react';
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import AddUser from './components/AddUser'

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
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/users/create" component={AddUser} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
