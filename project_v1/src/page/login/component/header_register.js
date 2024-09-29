// React Component
import React,{ Component,PropTypes } from 'react';
import { Menu, Icon } from 'antd';
const Item = Menu.Item;
// import logo from '../img/logo.png'


export default class RegisterHeaderComponent extends Component {

  render() {
    let {prefixCls} = this.props
    return (
      <header className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-logo`}>
           {/* <img height="33" src={logo} /> */}
        </div>
        <div className={`${prefixCls}-header-nav`} >
          <Menu  mode="horizontal">
            <Item key="a" onClick={() => { this.props.router.push('/login'); }}>{"登录"}</Item>
            <Item key="d">{"帮助"}</Item>
          </Menu>
      </div>
      </header>
    )
  }
}
