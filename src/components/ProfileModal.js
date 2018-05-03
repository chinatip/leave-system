import { Modal, Button } from 'antd'
import { Form, message } from 'antd'
import React, { Component } from 'react'
import Profile from './Profile';

import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { updateUser, verifyToken } from 'common/services'

class LoginForm extends React.Component {
  state = {}

  componentDidMount () {
    const { form, user } = this.props
    console.log('form', user)
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

class ProfielModal extends Component {
  render() {
    const { visible, onCancel, user } = this.props
    
    return (
      <Modal
        visible={visible}
        onOk={onCancel}
        onCancel={onCancel}
      >
        <WrappedLogin user={user} />
      </Modal>
    )
  }
}

export default ProfielModal