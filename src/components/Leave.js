import React from 'react'
import { Table } from 'common'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import { Button } from 'antd'
import styled from 'styled-components'
import _ from 'lodash'

import { verifyToken, loadUsers, loadLeaves } from 'common/services'
import LeaveModal from './LeaveModal';

const AddButton = styled(Button)`
  margin-bottom: 15px;
`

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  resolve("users", async (props) => await loadUsers()),
  resolve("leaves", async (props) => await loadLeaves()),
)

class Leave extends React.Component {
  state = {
    visible: false
  }

  handleAddLeave = () => {
    this.setState({ visible: !this.state.visible})
  }

  formatData() {
    const { leaves, onEdit, user } = this.props
    const date = {
      title: 'Date',
      dataIndex: 'period',
      key: 'date',
      render: (date) => date? date.date: ''
    }

    let columns = [
      {
        title: 'Substitute',
        dataIndex: 'substitute',
        key: 'substitute',
        render: (r) => `${r.firstname || ''} ${r.lastname || ''}`
      }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }
    ] 
    if (user.role === 'subordinate') {
      const userLeaves = _.filter(leaves, (l) => l.user._id === user._id)
      console.log(user, userLeaves)
      return { dataSource: userLeaves, columns: [ date, ...columns ] }
    }

    columns = [ 
      date, 
      {
        title: 'Name',
        dataIndex: 'user',
        key: 'subordinate',
        render: (r) => `${r.firstname || ''} ${r.lastname || ''}`
      }, 
      ...columns
    ]
    return { dataSource: leaves, columns }
  }

  render() {
    const { visible } = this.state
    const { users, user } = this.props
    const { dataSource, columns } = this.formatData()
    const depUser = _.filter(users, (u) => u._id === user.department)

    return (
      <div>
        <h1>Leave</h1>
        <AddButton onClick={this.handleAddLeave}>Add Leave</AddButton>
        <Table dataSource={dataSource} columns={columns} />
        {visible && <LeaveModal onCancel={this.handleAddLeave} visible={visible} user={user} users={users}/>}
      </div>
    )
  }
}

export default enhance(Leave)