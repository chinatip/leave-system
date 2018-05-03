import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, message } from 'antd'
import { updateUser, verifyToken } from 'common/services'
import { resolve } from "react-resolver"
import { Modal } from 'antd'

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

const TYPES = [
  {label: 'vacation', value: 'vacation'},
  {label: 'personal', value: 'personal'},
  {label: 'sick', value: 'sick'}
]
class LoginForm extends React.Component {
  state = {}

  componentDidMount () {
    const { form, user } = this.props
    form.setFields({
      detail: {
        value: user.detail
      },
      type: {
        value: user.type
      }
    });
  }
  
  handleSubmit = (e) => {
    const { form, user } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        // const u = await updateUser({ ...user, ...values})
        // console.log(u)
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <FormContainer width={700}>
        {/* <FormItem label={'firstname'} field={'firstname'} message={'Please input firstname'} getFieldDecorator={getFieldDecorator} /> */}
        <FormItem label={'detail'} field={'detail'} message={'Please input detail'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'type'} field={'type'} message={'Please input type'} getFieldDecorator={getFieldDecorator} options={{ options: TYPES }}/>
        <FormItem label={'date'} field={'date'} message={'Please input date'} getFieldDecorator={getFieldDecorator} date/>
        <FormItem label={'how many days?'} field={'period'} message={'Please input period'} getFieldDecorator={getFieldDecorator} />
        <NavigationButton onSubmit={this.handleSubmit} last />
      </FormContainer>
    )
  }
}

const WrappedLogin = Form.create()(LoginForm)

export default ((props) => {
  const { visible, onCancel } = props
  return (
    <Modal visible={visible} onOk={onCancel} onCancel={onCancel}>
      <FormContainer>
        <WrappedLogin {...props} />
      </FormContainer>
    </Modal>
  )
})