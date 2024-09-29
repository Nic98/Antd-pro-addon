import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import React, { Component, PropTypes } from 'react';


export default class DashBoardComponent extends Component{
    static defaultProps = {
        prefixCls: 'dashboard'
    }
    constructor(props){
        super(props)
    }
    render(){
        return(
          <div style={{ minHeight: '600px' }}>
            <h1>首页 页面</h1>
          </div>
        )
    }
}
