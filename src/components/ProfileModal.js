import { Modal, Button } from 'antd'
import { Form, message } from 'antd'
import React, { Component } from 'react'
import Profile from './Profile';
import styled, { injectGlobal } from 'styled-components'
import _ from 'lodash'

import { FormContainer, FormItem, NavigationButton } from 'common/form'
import { updateUser, createUser } from 'common/services'

const GlobalStyles = ({ theme }) => {
  injectGlobal `
    .profile-modal {
      .ant-modal-footer {
        display: none;
      }
    }
  `;

  return null;
}

const InnerForm = styled.div`
  background: rgba(230, 247, 255, 0.77);
  padding: 20px;
  border-radius: 5px;
  margin: 15px 0;
`

const ROLES = [
  {label: 'Supervisor', value: 'supervisor'},
  {label: 'Subordinate', value: 'subordinate'}
]

class LoginForm extends React.Component {
  state = {}

  componentDidMount () {
    const { form, user, isAdd, departments } = this.props
    
    if (!isAdd) {
      const dep = _.filter(departments, (d) => d._id === user.department)[0]
      if (dep) {
        form.setFields({
          departments: {
            value: dep.name
          }
        })
      }

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
        tasks: {
          value: user.tasks
        },
        lineid: {
          value: user.contact? user.contact.lineid: null
        },
        username: {
          value: user.username
        }
      })
    }

  }

  isAdmin = () => {
    const { user } = this.props
    return user && user.role === 'admin'
  }
  
  handleSubmit = (e) => {
    const { form, user, isAdd, onCancel } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const contact = { lineid: values.lineid }

        if (isAdd) {
          const u = await createUser({ ...user, ...values, contact })
          console.log(u)
        } else {
          const u = await updateUser({ ...user, ...values, contact })
          console.log(u)
        }
      }

      onCancel()
      window.location.reload()
    })
  }

  render() {
    const { form, departments, tasks, isAdd, user, isAdmin } = this.props
    const { getFieldDecorator } = form
    const depOptions = departments.map((d) => ({ label: d.name, value: d._id}))
    const taskOptions = tasks.map((d) => ({ label: d.name, value: d._id}))
    const isDisable = !isAdmin

    return (
      <FormContainer width={700}>
        { (isAdd || isAdmin) && <InnerForm>
          <FormItem label={'Username'} field={'username'} message={'Please input username'} getFieldDecorator={getFieldDecorator} disabled={isDisable} />
          { isAdd && <FormItem label={'Password'} field={'password'} message={'Please input password'} getFieldDecorator={getFieldDecorator} disabled={isDisable} />}
        </InnerForm>}
        <FormItem label={'Firstname'} field={'firstname'} message={'Please input firstname'} getFieldDecorator={getFieldDecorator} disabled={isDisable} />
        <FormItem label={'Lastname'} field={'lastname'} message={'Please input lastname'} getFieldDecorator={getFieldDecorator} disabled={isDisable} />
        <FormItem label={'Picture'} field={'picture'} message={'Please input picture'} getFieldDecorator={getFieldDecorator} disabled={isDisable} required={false} />
        <FormItem label={'Role'} field={'role'} message={'Please input role'} getFieldDecorator={getFieldDecorator} options={{options: ROLES}} disabled={isDisable} />
        
        {!this.isAdmin() && <FormItem label={'Departments'} field={'departments'} message={'Please input departments'} getFieldDecorator={getFieldDecorator} options={{options: depOptions}} disabled={isDisable}  />}
        {!this.isAdmin() && <FormItem label={'Tasks'} field={'tasks'} message={'Please input tasks'} getFieldDecorator={getFieldDecorator} options={{options: taskOptions}} required={false} />}
        <FormItem label={'Line ID'} field={'lineid'} message={'Please input Line ID'} getFieldDecorator={getFieldDecorator} disabled={isDisable} required={false} />
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
      <div>
        <GlobalStyles />
        <Modal
          wrapClassName={'profile-modal'}
          visible={visible}
          onOk={onCancel}
          onCancel={onCancel}
        >
          <WrappedLogin {...this.props}/>
        </Modal>
      </div>
    )
  }
}

export default ProfielModal