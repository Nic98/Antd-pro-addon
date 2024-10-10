import React, { Component, PropTypes } from 'react';
import Header from './component/header_login';
import Footer from './component/footer';
import Container from './component/main_login';
import styles from "./login.less";

@ant-design/compatible
@Form.create()
export default class LoginNewComponent extends Component{
    static defaultProps = {
        prefixCls: 'login'
    }
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={this.props.prefixCls}>
                <Header {...this.props} />
                <Container {...this.props} />
                <Footer {...this.props} />
            </div>
        )
    }
}



