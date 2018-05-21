import React from 'react'
import { Table } from 'common'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import { Button } from 'antd'
import styled from 'styled-components'

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
    const { leaves, onEdit } = this.props
    const columns = [
      {
        title: 'substitute',
        dataIndex: 'substitute',
        key: 'substitute',
        render: (r) => `${r.firstname || ''} ${r.lastname || ''}`
      }, {
        title: 'type',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
      }
    ] 

    return { dataSource: leaves, columns }
  }

  render() {
    const { visible } = this.state
    const { users, user } = this.props
    const { dataSource, columns } = this.formatData()

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