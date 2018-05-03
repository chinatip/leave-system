import React from 'react'
import { Table } from 'common'
import { compose } from 'recompose'
import { resolve } from "react-resolver"

import { verifyToken, loadLeaves } from 'common/services'

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  resolve("leaves", async (props) => await loadLeaves()),
)

class Leave extends React.Component {
  formatData() {
    const { leaves, onEdit } = this.props
    const columns = [
      {
        title: 'user',
        dataIndex: 'user',
        key: 'user',
        render: (r) => `${r.firstname || ''} ${r.lastname || ''}`
      }, {
        title: 'subordinate',
        dataIndex: 'subordinate',
        key: 'subordinate',
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
    const { dataSource, columns } = this.formatData()
    return (
      <div>
        <h1>Leave</h1>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}

export default enhance(Leave)