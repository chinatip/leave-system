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
    const { users, edit = false, onEdit } = this.props
    const columns = [
      {
        title: 'Name',
        key: 'name',
        render: (r) => `${r.firstname || ''} ${r.lastname || ''}`
      }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
      }, {
        title: 'แผนก',
        dataIndex: 'department',
        key: 'department'
      }, {
        title: 'Tasks',
        dataIndex: 'tasks',
        key: 'tasks',
        render: (t) => <div>{_.map(t, t => t.name)}</div>
      }, {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
        render: (t) => <div>{_.map(t, t => t.name)}</div>
      }
    ] 

    if (edit) {
      columns.push({
        title: 'Edit',
        key: 'edit',
        render: (t) => <button onClick={() => onEdit(t)}>Edit</button>
      })
    }

    return { dataSource: users, columns }
  }

  render() {
    const { users } = this.props
    const { dataSource, columns } = this.formatData()

    return <Table dataSource={dataSource} columns={columns} />
  }
}

export default enhance(ManageUser)
