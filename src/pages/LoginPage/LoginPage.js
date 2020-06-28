import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './index.css';

export default class LoginPage extends Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ color: 'white' }}>Quản lý bán vé tàu hỏa</h1>
        <LoginForm history={this.props.history} />
      </div>
    );
  }
}
