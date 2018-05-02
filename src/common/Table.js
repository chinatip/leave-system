import React, { Component } from 'react';
import { Table } from 'antd';

import styled, { css } from 'styled-components';

const cssHideTableHead = css`
  .ant-table-thead {
    display: none;
  }
`;

const Container = styled.div`
  .ant-table-tbody > tr > td {
    padding: 8px 16px;
  }

  ${props => props.hideHead && cssHideTableHead};
`;

class CustomTable extends Component {
  render() {
    const { columns, dataSource, hideHead, expandedRowRender } = this.props;
    
    return (
      <Container hideHead={hideHead}>
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          expandedRowRender={expandedRowRender}
          pagination={false} 
        />
      </Container>
    );
  }
}

export default CustomTable;