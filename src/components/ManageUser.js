import React from 'react'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import { Table } from 'common'
import { verifyToken, loadUsers } from 'common/services'

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  resolve("users", async (props) => await loadUsers()),
  withRouter
)

class ManageUser extends React.Component {
  state = {
    visible: false,
    data: null
  }

  formatData() {
    const { users } = this.props
    // picture: String,
    // role: String,
    // token: String,
    // department: { type: ObjectId, ref: 'Department' },
    // tasks: [{ type: ObjectId, ref: 'Task' }],
    // contact: Object,
    const columns = [
      {
        title: 'ชื่อ',
        key: 'name',
        render: (r) => `${r.firstname || ''} ${r.lastname || ''}`
      }, {
        title: 'ตำแหน่ง',
        dataIndex: 'role',
        key: 'role'
      }, {
        title: 'แผนก',
        dataIndex: 'department',
        key: 'department'
      }, {
        title: 'งาน',
        dataIndex: 'tasks',
        key: 'tasks',
        render: (t) => <div>{_.map(t, t => t.name)}</div>
      }, {
        title: 'ติดต่อ',
        dataIndex: 'contact',
        key: 'contact',
        render: (t) => <div>{_.map(t, t => t.name)}</div>
      }
    ] 

    return { dataSource: users, columns }
  }

  render() {
    const { users } = this.props
    const { dataSource, columns } = this.formatData()

    return <Table dataSource={dataSource} columns={columns} />
  }
}

export default enhance(ManageUser)
