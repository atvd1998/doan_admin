import React, { Component } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { notification } from 'antd';
import { openNotificationWithIcon } from '../../utils/notification';
import { actLogin } from '../../actions/authAction';
import { connect } from 'react-redux';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const validateMessages = {
  required: 'Trường này là bắt buộc',
  types: {
    email: 'Email không hợp lệ',
  },
};
class LoginForm extends Component {
  state = {
    email: null,
    password: null,
    loading: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.onLogin(this.state);

    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      if (this.props.isAuthenticated === false) {
        openNotificationWithIcon(
          'error',
          'Thông báo đăng nhập',
          this.props.err.msg.msg ? this.props.err.msg.msg : null
        );
      } else {
        openNotificationWithIcon(
          'success',
          'Thông báo đăng nhập',
          this.props.msg ? this.props.msg : null
        );

        this.props.history.push('/dashboard');
      }
    }, 3000);
  };

  render() {
    return (
      <>
        <Spin spinning={this.state.loading}>
          <h1 style={{ textAlign: 'center' }}>Đăng nhập</h1>
          <Form
            {...layout}
            style={{ width: '30%', margin: 'auto' }}
            name="basic"
            onFinish={this.handleSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input name="email" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password name="password" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    msg: state.auth.msg,
    err: state.error,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogin: (user) => {
      dispatch(actLogin(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
