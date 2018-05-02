import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, message } from 'antd'
import { withRouter } from 'react-router-dom'

import { FormContainer, FormItem, NavigationButton } from 'common/form'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Flex = styled.div`
  display: flex;
`

class LoginForm extends React.Component {
  state = {}

  handleSubmit = (e) => {
    const { form } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <FormContainer width={700}>
        <FormItem label={'firstname'} field={'firstname'} message={'Please input firstname'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'lastname'} field={'lastname'} message={'Please input lastname'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'username'} field={'username'} message={'Please input username'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'password'} field={'password'} message={'Please input password'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'picture'} field={'picture'} message={'Please input picture'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'role'} field={'role'} message={'Please input role'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'departments'} field={'departments'} message={'Please input departments'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'tasks'} field={'tasks'} message={'Please input tasks'} getFieldDecorator={getFieldDecorator} />
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