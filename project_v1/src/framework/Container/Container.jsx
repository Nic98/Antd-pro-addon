import React, { Component,PropTypes } from 'react';
import './style.less';

export default class Container extends Component {
  render() {
  	let style = {

    };
    return (
        <div className="admin-container" style={style} >
            {this.props.children}
        </div>
    );
  }
}
