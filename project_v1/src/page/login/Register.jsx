import React, { Component, PropTypes } from 'react';
import Header from './component/header_register';
import Footer from './component/footer';
import Container from './component/main_register';
import styles from "./register.less";

export default class RegisterNewComponent extends Component{
    static defaultProps = {
        prefixCls: 'register'
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



