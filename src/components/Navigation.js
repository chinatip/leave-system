import React from 'react'
import { Menu } from 'antd';
import _ from 'lodash'
import styled from 'styled-components'

const Container = styled.div`

`

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navigation extends React.Component {
  handleClick = (e) => {
    this.props.history.push(e.key)
    this.props.onChange(e.key)
  }

  render() {
    const { menus, value } = this.props
    
    return (
      <Container>
        <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={value}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
          <SubMenu key="sub1" title={<span>Menu</span>}>
            { _.map(menus, (a, title) => 
              <Menu.Item key={a}>{title}</Menu.Item>
            )}
          </SubMenu>
        </Menu>
      </Container>
    )
  }
}

export default Navigation