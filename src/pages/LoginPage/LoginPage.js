import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm history={this.props.history} />
      </div>
    );
  }
}
