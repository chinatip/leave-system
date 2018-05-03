import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, message } from 'antd'
import { withRouter } from 'react-router-dom'

import { FormContainer, FormItem, NavigationButton } from 'common/form'
// import { LOADER, POST, CLINIC } from 'services'
import { login } from 'common/services'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Flex = styled.div`
  display: flex;

  .ant-tag {
    margin-left: 15px;
  }
`

class LoginForm extends React.Component {
  state = {}

  handleSubmit = (e) => {
    const { form, history } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const { token } = await login(values)
        global.localStorage.setItem('token', token)
        
        history.push(`/admin`)
      }
    })
  }

  render() {
    const { appointmentStatus } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <FormContainer width={700}>
        <FormItem label={'Username'} field={'username'} message={'username'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'Password'} field={'password'} message={'password'} getFieldDecorator={getFieldDecorator} />
        <NavigationButton onSubmit={this.handleSubmit} last />
      </FormContainer>
    )
  }
}

const WrappedLogin = Form.create()(LoginForm)

export default withRouter((props) => {
  return (
    <Container>
      <FormContainer>
        <WrappedLogin {...props} />
      </FormContainer>
    </Container>
  )
})