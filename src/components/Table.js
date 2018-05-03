import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'

import { Table } from 'common'


const Container = styled.div``

const formatData = () => {
  const columns = [
    {
      title: 'A',
      dataIndex: 'a',
      key: 'a'
    }, {
      title: 'B',
      dataIndex: 'b',
      key: 'b',
      render: (t) => t + t + t
    }
  ]  

  const dataSource = [
    {
      a: 1,
      b: 2
    }
  ]

  return { dataSource , columns }
}

const Index = () => {
  const { dataSource, columns } = formatData()

  return (
    <Container>
      <Table dataSource={dataSource} columns={columns} />
    </Container>
  )
}

export default Index