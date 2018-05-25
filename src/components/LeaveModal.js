import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { compose, withProps } from 'recompose'
import { Form, message } from 'antd'
import { createLeave } from 'common/services'
import { resolve } from "react-resolver"
import { Modal } from 'antd'
import _ from 'lodash'
import { FormContainer, FormItem, NavigationButton } from 'common/form'
import moment from 'moment'

const GlobalStyles = ({ theme }) => {
  injectGlobal `
    .leave-modal {
      .ant-modal-footer {
        display: none;
      }
    }
  `;

  return null;
}

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
  {label: 'Vacation leave', value: 'Vacation'},
  {label: 'Personal leave', value: 'Personal'},
  {label: 'Sick leave', value: 'Sick'}
]
class LoginForm extends React.Component {
  state = {}
  
  handleSubmit = (e) => {
    const { form, user, onCancel } = this.props

    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const body = {
          user: user._id, ...values
        }

        const { date, period} = values
        const u = await createLeave({ 
          user: user._id, 
          ...values, 
          period: {
            date: date.format('DD-MM-YYYY HH:mm')
          },
          status: 'waiting'
        })
        onCancel()
        window.location.reload()
      }
    })
  }

  findSubstitute = () => {
    const { form, user, users, leaves } = this.props

    const date = form.getFieldValue('date')
    let mUsers = _.filter(users, u => u.role === "subordinate" && u.department._id === user.department._id && u._id !== user._id )
    mUsers = _.filter(mUsers, (u) => {
      if (!date) return u

      let available = true
      _.forEach(leaves, (l) => {
        const lDate = l.period.date.split(' ')[0]

        if (date && date.format('DD-MM-YYYY HH:mm').includes(lDate)) {
          available = false
        }
      })

      return available
    })

    let options = _.map(mUsers, m => ({ label: `${m.firstname} ${m.lastname}`, value: m._id}))

    return options
  }

  findAvailableDate = (list) => {
    const { leaves } = this.props
    const available = true
    /**for (l in leaves) {
      const date = form.getFieldValue('date')
      const fDate = date.format('DD-MM-YYYY HH:mm')
    }**/

    return available
  }

  render() {
    const { form, user, users, leaves } = this.props
    const { getFieldDecorator } = form
    const userLeaves = _.filter(leaves, (l) => l.user._id === user._id)

    return (
      <FormContainer width={700}>
        <FormItem label={'Date'} field={'date'} message={'Please input date'} getFieldDecorator={getFieldDecorator} date dateOption={this.findAvailableDate(userLeaves)}/>
        <FormItem label={'Type'} field={'type'} message={'Please input type'} getFieldDecorator={getFieldDecorator} options={{ options: TYPES }}/>
        <FormItem label={'Detail'} field={'detail'} message={'Please input detail'} getFieldDecorator={getFieldDecorator} />
        <FormItem label={'Substitute'} field={'substitute'} message={'Please input a substitute'} getFieldDecorator={getFieldDecorator} options={{ options: this.findSubstitute() }}/>
        <NavigationButton onSubmit={this.handleSubmit} last />
      </FormContainer>
    )
  }
}

const WrappedLogin = Form.create()(LoginForm)

export default ((props) => {
  const { visible, onCancel } = props
  return (
    <div>
      <GlobalStyles />
      <Modal visible={visible} onOk={onCancel} onCancel={onCancel} wrapClassName={'leave-modal'}> 
        <FormContainer>
          <WrappedLogin {...props} />
        </FormContainer>
      </Modal>
    </div>
  )
})