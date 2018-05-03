import React from 'react'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import ProfileModal from './ProfileModal'
import { Button } from 'antd'

import { Table } from 'common'
import { verifyToken, loadUsers, loadDepartments, loadTasks } from 'common/services'

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  resolve("users", async (props) => await loadUsers()),
  resolve("departments", async (props) => await loadDepartments()),
  resolve("tasks", async (props) => await loadTasks()),
  withRouter
)

class ManageUser extends React.Component {
  state = {
    visible: false,
    data: null,
    isAdd: false
  }

  formatData() {
    const { user, users, edit = false, onEdit } = this.props
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
        render: (t) => <Button onClick={() => this.handleEdit(t)}>Edit</Button>
      })
    }
    let dataSource = []
    if (edit) { 
      dataSource = users
    } else {
      dataSource = _.filter(users, u => u.role === 'subordinate' && u.department === user.department)
    }

    return { dataSource, columns }
  }

  handleAdd = () => {
    this.handleEdit()
    this.setState({ isAdd: true })
  }

  handleEdit = (data = null) => {
    this.setState({ data, visible: !this.state.visible })

    if (!this.state.visible) {
      this.setState({ isAdd: false })
    }
  }

  render() {
    const { visible, data, isAdd } = this.state
    const { users, edit, tasks, departments } = this.props
    const { dataSource, columns } = this.formatData()

    return (<div>
      <h1>Manage {edit? 'Users': 'Subordinates'}</h1>
      <Button onClick={this.handleAdd}>Add user</Button>
      <Table dataSource={dataSource} columns={columns} />
      { edit && visible && <ProfileModal
          visible={visible}
          onOk={this.handleEdit}
          onCancel={this.handleEdit}
          user={data}
          tasks={tasks}
          departments={departments}
          isAdd={isAdd}
        />}
    </div>)
  }
}

export default enhance(ManageUser)
