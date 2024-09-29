// React Component
import React,{ Component,PropTypes } from 'react'


export default class LoginFooterComponent extends Component {

  render() {
  	let {prefixCls} = this.props,
  		text = 'Copyright © 2021 The Project by hulianpai. All Rights Reserved';
    return (
      <footer className={`${prefixCls}-footer`}>
          <div>
          <p className={`${prefixCls}-footer-p`}> {text}</p>
        </div>
      </footer>
    )
  }
}
