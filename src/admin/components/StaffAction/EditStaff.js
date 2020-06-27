import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openNotificationWithIcon } from '../../../utils/notification';
import { Form, Input, Select, Button, Spin } from 'antd';
import { actUpdateUser } from '../../../actions/userAction';

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

class EditStaff extends Component {
  state = {
    loading: false,
    disabled: true,
  };

  formRef = React.createRef();

  handleSubmit = (value) => {
    this.props.onUpdate(value.user);

    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      if (this.props.isUpdated === false) {
        openNotificationWithIcon('error', 'Thông báo', this.props.err.msg.msg);
      } else {
        openNotificationWithIcon('success', 'Thông báo', this.props.msg);
        this.props.onOk();
      }
    }, 3000);
  };
  componentDidMount() {
    const { name, gender, email, phone, address, role } = this.props.editUser;
    this.formRef.current.setFieldsValue({
      user: {
        name: name,
        gender: gender,
        email: email,
        phone: phone,
        address: address,
        password: '',
        repassword: '',
        role: role,
      },
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.editUser !== nextProps.editUser) {
      const { name, gender, email, phone, address, role } = nextProps.editUser;

      this.formRef.current.setFieldsValue({
        user: {
          name: name,
          gender: gender,
          email: email,
          phone: phone,
          address: address,
          password: '',
          repassword: '',
          role: role,
        },
      });
    }
  }

  handleClick = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
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
            <Input disabled />
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

          <Button
            type={this.state.disabled ? 'primary' : 'danger'}
            onClick={this.handleClick}
          >
            {this.state.disabled ? 'Cập nhật lại mật khẩu' : 'Hủy bỏ'}
          </Button>
          <Form.Item name={['user', 'password']} label="Mật khẩu" rules={[]}>
            <Input.Password disabled={this.state.disabled} />
          </Form.Item>
          <Form.Item
            name={['user', 'repassword']}
            label="Nhập lại mật khẩu"
            rules={[
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
            <Input.Password disabled={this.state.disabled} />
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
    onUpdate: (user) => {
      dispatch(actUpdateUser(user));
    },
  };
};

const mapStateToProps = (state) => ({
  err: state.error,
  isUpdated: state.user.isUpdated,
  msg: state.user.msg,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStaff);
