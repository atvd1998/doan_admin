import React, { Component } from 'react';
import { Form, Input, Select, Button, Spin } from 'antd';
import { actRegister } from '../../../actions/authAction';
import { connect } from 'react-redux';
import { openNotificationWithIcon } from '../../../utils/notification';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: 'Trường này là bắt buộc',
  types: {
    email: 'Email không hợp lệ',
  },
  string: {
    range: 'Vui lòng nhập dưới ${max} ký tự',
  },
};

class AddStaff extends Component {
  formRef = React.createRef();
  state = {
    loading: false,
  };

  clearData = () => {
    this.formRef.current.setFieldsValue({
      user: {
        name: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        repassword: '',
        role: '',
      },
    });
  };

  handleSubmit = (value) => {
    this.props.onRegister(value.user);

    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.props.onOk();
      this.setState({
        loading: false,
      });
      if (this.props.isRegistered === false) {
        openNotificationWithIcon('error', 'Thông báo', this.props.err.msg.msg);
      } else {
        openNotificationWithIcon('success', 'Thông báo', this.props.msg);
        this.clearData();
      }
    }, 3000);
  };

  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Form
          ref={this.formRef}
          {...layout}
          name="nest-messages"
          onFinish={this.handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['user', 'name']}
            label="Họ tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name={['user', 'gender']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="nam">Nam</Option>
              <Option value="nữ">Nữ</Option>
              <Option value="khác">Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['user', 'phone']}
            label="SĐT"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  const reg = /(09|01[2|6|8|9])+([0-9]{8})\b/;
                  if (!value || reg.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Số điện thoại không phù hợp');
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['user', 'address']}
            label="Địa chỉ"
            rules={[
              {
                required: true,
              },
              {
                type: 'string',
                min: 0,
                max: 50,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name={['user', 'password']}
            label="Mật khẩu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={['user', 'repassword']}
            label="Nhập lại mật khẩu"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('user').password === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Vui lòng nhập lại đúng mật khẩu!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Vị trí"
            name={['user', 'role']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="staff">staff</Option>
              <Option value="admin">admin</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              style={{ marginRight: 12 }}
              type="primary"
              htmlType="submit"
            >
              Lưu
            </Button>
            <Button type="danger" onClick={this.props.onCancel}>
              Đóng
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onRegister: (user) => {
      dispatch(actRegister(user));
    },
  };
};

const mapStateToProps = (state) => ({
  err: state.error,
  isRegistered: state.auth.isRegistered,
  msg: state.auth.msg,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
