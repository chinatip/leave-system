import React from 'react'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { Button } from 'antd'
import moment from 'moment'

import { Table } from 'common'
import ProfileModal from './ProfileModal'
import { verifyToken, loadUsers, loadLeaves, updateLeave } from 'common/services'

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  resolve("leaves", async (props) => await loadLeaves()),
  withRouter
)

class ManageUser extends React.Component {
  state = {
    visible: false
  }

  updateStatus = (status, { _id }) => async () => {
    const a = await updateLeave({ _id, status })
    window.location.reload()
  }

  formatData() {
    const { user, leaves } = this.props
    const columns = [
      {
        title: 'Name',
        dataIndex: 'user',
        key: 'name',
        render: (r) => `${r.firstname || ''} ${r.lastname || ''}`
      }, {
        title: 'Substitute',
        dataIndex: 'substitute',
        key: 'substitute',
        render: (r) => `${r.firstname || ''} ${r.lastname || ''}`
      },, {
        title: 'Date',
        dataIndex: 'period.date',
        key: 'period',
        render: (date) => moment(date, 'DD-MM-YYYY HH:mm').format('DD MMM YYYY')
      }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
      }, {
        title: 'Approve',
        key: 'approve',
        render: ({ status, ...props }) => status === 'waiting'? <Button onClick={this.updateStatus('approved', props)}>Approve</Button>: ''
      }, {
        title: 'Cancel',
        key: 'cancel',
        render: ({ status, ...props }) => status === 'waiting'? <Button onClick={this.updateStatus('cancelled', props)}>Cancel</Button>: ''
      }
    ] 
console.log(user,leaves)
    const depLeaves = _.filter(leaves, (l) => l.user.department === user.department)
    return { dataSource: depLeaves, columns }
  }

  handleEdit = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { visible, data } = this.state
    const { leaves, edit } = this.props
    const { dataSource, columns } = this.formatData()

    return (<div>
      <h1>Leaves</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>)

    return <noscript />
  }
}

export default enhance(ManageUser)
