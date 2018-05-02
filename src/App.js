import React, { Component } from 'react';
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './Login'
import Home from './Home'

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
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
