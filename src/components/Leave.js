import React from 'react'
import { Table } from 'common'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import { Button } from 'antd'
import styled from 'styled-components'
import _ from 'lodash'
import moment from 'moment'

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
    console.log(leaves)
    let columns = [
      {
        title: 'Date',
        dataIndex: 'period.date',
        key: 'date',
        render: (date) => moment(date, 'DD-MM-YYYY HH:mm').format('DD MMM YYYY')
      }, {
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

    const userLeaves = _.filter(leaves, (l) => l.user._id === user._id)
    return { dataSource: userLeaves, columns }
  }

  render() {
    const { visible } = this.state
    const { users, user, leaves } = this.props
    const { dataSource, columns } = this.formatData()
    const depUsers = _.filter(users, (u) => u.department === user.department)

    return (
      <div>
        <h1>Leave</h1>
        <AddButton onClick={this.handleAddLeave}>Add Leave</AddButton>
        <Table dataSource={dataSource} columns={columns} />
        {visible && <LeaveModal onCancel={this.handleAddLeave} visible={visible} user={user} users={depUsers} leaves={leaves} />}
      </div>
    )
  }
}

export default enhance(Leave)