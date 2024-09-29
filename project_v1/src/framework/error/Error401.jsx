import './style.less';
import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Button, Alert, Tag, Icon } from 'antd';
import createBrowserHistory from 'history/es/createBrowserHistory'
const browserHistory = createBrowserHistory();

export default class Error401 extends Component{
	goBack = ()=>{
		browserHistory.goBack();
	}
	render(){
		let header = (
            <div>
                <h1 className="admin-page-header-title">无权限访问</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Icon type="home" />
                        首页
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>无权限访问</Breadcrumb.Item>
                </Breadcrumb>
            </div>
		);

		return(
			<div header ={ header } >
                <div id="admin-page-header" className="admin-page-header">

                </div>
                <Alert
                    message="亲，该页面您无权限访问哦~"
                    description={''}
                    type="info"
                    showIcon />
                <Button onClick={this.goBack}><a href="javascript:;">返回上一级</a></Button>
                <Button onClick={() => { }}> 返回首页</Button>
			</div>
		)
	}
}
