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

const AddButton = styled(Button)`
  margin-bottom: 15px;
`

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  resolve("users", async (props) => await loadUsers()),
  resolve("departments", async (props) => await loadDepartments()),
  resolve("tasks", async (props) => await loadTasks()),
  withRouter
)

const getDepartment = (departments, id) => {
  const dep = _.filter(departments, (d) => d._id === id)[0]

  return dep && dep.name
}

const getTask = (tasks, list) => {
  if (list.length > 0) {
    const task = _.filter(tasks, (d) => d._id === list[0])[0]
  
    return task && task.name
  }

  return ''
}

class ManageUser extends React.Component {
  state = {
    visible: false,
    data: null,
    isAdd: false
  }

  formatData(departments, tasks) {
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
        title: 'Department',
        key: 'department',
        render: ({ role, department }) => role === 'admin'? '-': getDepartment(departments, department)
      }, {
        title: 'Tasks',
        dataIndex: 'tasks',
        key: 'tasks',
        render: (t) => getTask(tasks, t)
      }, {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: 'Line ID',
        dataIndex: 'contact',
        key: 'contact',
        render: (contact) => contact? contact.lineid: ''
      },
      {
        title: 'Edit',
        key: 'edit',
        render: (t) => <Button onClick={() => this.handleEdit(t)}>Edit</Button>
      }
    ] 
    
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
    const { users, edit, tasks, departments, history } = this.props
    const { dataSource, columns } = this.formatData(departments, tasks)

    return (<div>
      <h1>Manage {edit? 'Users': 'Subordinates'}</h1>
      {edit && <AddButton onClick={this.handleAdd}>Add user</AddButton>}
      <Table dataSource={dataSource} columns={columns} />
      { visible && <ProfileModal
          visible={visible}
          onOk={this.handleEdit}
          onCancel={this.handleEdit}
          user={data}
          tasks={tasks}
          departments={departments}
          isAdd={isAdd}
          isAdmin={edit}
        />}
    </div>)
  }
}

export default enhance(ManageUser)
