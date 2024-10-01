import React,{ Component,PropTypes } from 'react'
import './app.less';

export default class App extends Component {
  render() {
    return (
        <Container>
          {this.props.children}
        </Container>
    );
  }
}
