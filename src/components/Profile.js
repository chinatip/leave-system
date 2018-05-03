import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, message } from 'antd'
import { updateUser, verifyToken } from 'common/services'
import { resolve } from "react-resolver"

import { FormContainer, FormItem, NavigationButton } from 'common/form'

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
)

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

  componentDidMount () {
    const { form, user } = this.props
    form.setFields({
      firstname: {
        value: user.firstname
      },
      lastname: {
        value: user.lastname
      },
      picture: {
        value: user.picture
      },
      role: {
        value: user.role
      },
      departments: {
        value: user.departments
      },
      tasks: {
        value: user.tasks
      } 
    });
  }
  
  handleSubmit = (e) => {
    const { form, user } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const u = await updateUser({ ...user, ...values})
        console.log(u)
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
        <FormItem label={'picture'} field={'picture'} message={'Please input picture'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'role'} field={'role'} message={'Please input role'} getFieldDecorator={getFieldDecorator} required={false}/>
        <FormItem label={'departments'} field={'departments'} message={'Please input departments'} getFieldDecorator={getFieldDecorator} required={false}/>
        <FormItem label={'tasks'} field={'tasks'} message={'Please input tasks'} getFieldDecorator={getFieldDecorator} required={false}/>
        <NavigationButton onSubmit={this.handleSubmit} last />
      </FormContainer>
    )
  }
}

const WrappedLogin = Form.create()(LoginForm)

export default enhance((props) => {
  return (
    <Container>
      <FormContainer>
        <WrappedLogin {...props} />
      </FormContainer>
    </Container>
  )
})