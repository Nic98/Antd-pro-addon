// React Component
import React,{ Component,PropTypes } from 'react';
import {
  Menu,
  Icon,
  Badge
} from 'antd';
const Item = Menu.Item;
// import logo from '../img/logo.png'


export default class LoginHeaderComponent extends Component {

  render() {
    let {prefixCls} = this.props
    return (
      <header className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-logo`}>
           {/* <img height="33" src={logo} /> */}
        </div>
        <div className={`${prefixCls}-header-nav`} >
          <Menu  mode="horizontal">
            <Item key="a" onClick={() => {
              this.props.router.push('/register');
            }}>{"注册"}</Item>
            <Item key="d">{"帮助"}
                  < Badge dot offset={[ 6, -10]} > </Badge>
            </Item>
          </Menu>
      </div>
      </header>
    )
  }
}
