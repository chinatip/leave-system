import { Modal, Button } from 'antd'
import { Form, message } from 'antd'
import React, { Component } from 'react'
import Profile from './Profile';

import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { updateUser, createUser } from 'common/services'

const ROLES = [
  {label: 'Admin', value: 'admin'},
  {label: 'Supervisor', value: 'supervisor'},
  {label: 'Subordinate', value: 'subordinate'}
]

class LoginForm extends React.Component {
  state = {}

  componentDidMount () {
    const { form, user, isAdd } = this.props
    if (!isAdd) {
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
      })
    }
  }
  
  handleSubmit = (e) => {
    const { form, user, isAdd } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        if (isAdd) {
          const u = await createUser({ ...user, ...values})
          console.log(u)
        } else {
          const u = await updateUser({ ...user, ...values})
          console.log(u)
        }
      }
    })
  }

  render() {
    const { form, departments, tasks, isAdd } = this.props
    const { getFieldDecorator } = form
    const depOptions = departments.map((d) => ({ label: d.name, value: d._id}))
    const taskOptions = tasks.map((d) => ({ label: d.name, value: d._id}))

    return (
      <FormContainer width={700}>
        { isAdd && <div style={{ padding: '20px'}}>
          <FormItem label={'username'} field={'username'} message={'Please input username'} getFieldDecorator={getFieldDecorator} />
          <FormItem label={'password'} field={'password'} message={'Please input password'} getFieldDecorator={getFieldDecorator} />
        </div>}
        <FormItem label={'firstname'} field={'firstname'} message={'Please input firstname'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'lastname'} field={'lastname'} message={'Please input lastname'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'picture'} field={'picture'} message={'Please input picture'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'role'} field={'role'} message={'Please input role'} getFieldDecorator={getFieldDecorator} options={{options: ROLES}}/>
        <FormItem label={'departments'} field={'departments'} message={'Please input departments'} getFieldDecorator={getFieldDecorator} options={{options: depOptions}} />
        <FormItem label={'tasks'} field={'tasks'} message={'Please input tasks'} getFieldDecorator={getFieldDecorator} options={{options: taskOptions}} />
        <NavigationButton onSubmit={this.handleSubmit} last />
      </FormContainer>
    )
  }
}

const WrappedLogin = Form.create()(LoginForm)

class ProfielModal extends Component {
  render() {
    const { visible, onCancel } = this.props
    
    return (
      <Modal
        visible={visible}
        onOk={onCancel}
        onCancel={onCancel}
      >
        <WrappedLogin {...this.props}/>
      </Modal>
    )
  }
}

export default ProfielModal