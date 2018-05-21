import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, message } from 'antd'
import { updateUser, loadTasks, verifyToken } from 'common/services'
import { resolve } from "react-resolver"

import { FormContainer, FormItem, NavigationButton } from 'common/form'

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  resolve("tasks", async (props) => await loadTasks()),
)

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const Flex = styled.div`
  display: flex;
`

const ROLES = [
  {label: 'Admin', value: 'admin'},
  {label: 'Supervisor', value: 'supervisor'},
  {label: 'Subordinate', value: 'subordinate'}
]
class ProfileForm extends React.Component {
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
      },
      lineid: {
        value: user.contact? user.contact.lineid: null
      }
    });
  }
  
  handleSubmit = (e) => {
    const { form, user } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      const contact = { lineid: values.lineid }

      if (!err) {
        const u = await updateUser({ ...user, ...values, contact})
        console.log(u)
      }
    })
  }

  render() {
    const { form, user, tasks } = this.props
    const { getFieldDecorator } = form
    const taskOptions = tasks.map((d) => ({ label: d.name, value: d._id}))

    return (
      <FormContainer width={1000}>
        <FormItem label={'Firstname'} field={'firstname'} message={'Please input firstname'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'Lastname'} field={'lastname'} message={'Please input lastname'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'Picture'} field={'picture'} message={'Please input picture'} getFieldDecorator={getFieldDecorator} />
        { user.role !== 'admin' && <FormItem label={'Tasks'} field={'tasks'} message={'Please input tasks'} getFieldDecorator={getFieldDecorator} options={{options: taskOptions}} />}
        <FormItem label={'Line ID'} field={'lineid'} message={'Please input Line ID'} getFieldDecorator={getFieldDecorator} required={false} />
        <NavigationButton onSubmit={this.handleSubmit} last />
      </FormContainer>
    )
  }
}

const WrappedProfile = Form.create()(ProfileForm)

export default enhance((props) => {
  return (
    <Container>
      <div style={{width: '100%'}}>
      <h1>Profile</h1>
      <FormContainer>
        <WrappedProfile {...props} />
      </FormContainer>
      </div>
    </Container>
  )
})