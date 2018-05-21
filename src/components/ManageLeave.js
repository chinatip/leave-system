import React from 'react'
import { compose } from 'recompose'
import { resolve } from "react-resolver"
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import ProfileModal from './ProfileModal'
import { Button } from 'antd'

import { Table } from 'common'
import { verifyToken, loadUsers, loadLeaves } from 'common/services'

const enhance = compose(
  resolve("user", async (props) => await verifyToken()),
  resolve("leaves", async (props) => await loadLeaves()),
  withRouter
)

class ManageUser extends React.Component {
  state = {
    visible: false
  }

  formatData() {
    const { leaves } = this.props
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
        key: 'period'
      }, {
        title: 'Day',
        dataIndex: 'period.period',
        key: 'period'
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
        render: ({ status }) => status === 'waiting'? <Button>Approve</Button>: ''
      }, {
        title: 'Cancel',
        key: 'cancel',
        render: ({ status }) => status === 'waiting'? <Button>Cancel</Button>: ''
      }
    ] 

    return { dataSource: leaves, columns }
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
