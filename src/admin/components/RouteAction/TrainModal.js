import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actCreateRoute } from '../../../actions/routeAction';
import { Select, Form, Button, Spin, InputNumber } from 'antd';
import moment from 'moment';
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
    number: 'Dữ liệu không hợp lệ',
  },
  number: {
    range: 'Giá tiền phải giữa ${min} và ${max}',
  },
};
class TrainModal extends Component {
  state = {
    loading: false,
  };
  handleSubmit = (value) => {
    const { gadi, gaden, route, tongKM } = this.props;
    const { mactau, gia1Km } = value.route;

    this.props.onCreateRoute({ gadi, gaden, route, mactau, tongKM, gia1Km });

    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      if (this.props.isCreated === false) {
        openNotificationWithIcon('error', 'Thông báo', this.props.err.msg.msg);
      } else {
        openNotificationWithIcon('success', 'Thông báo', this.props.msg);
        this.props.history.push('/dashboard/routemanage');
      }
    }, 3000);
  };
  render() {
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Form
            {...layout}
            style={{ margin: 'auto' }}
            name="train-modal"
            onFinish={this.handleSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['route', 'mactau']}
              label="Mác tàu"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                style={{ width: 200 }}
                placeholder="Chọn mác tàu (Nếu có)"
              >
                {this.props.trains
                  .filter((f) => {
                    return (
                      f.gahientai === this.props.gadi &&
                      moment(this.props.route[0].thoigianDi).isAfter(
                        moment(f.ngaytratau).endOf('day')
                      )
                    );
                  })
                  .map((train, index) => {
                    return (
                      <Option key={index} value={train.mactau}>
                        {train.mactau}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>

            <Form.Item
              name={['route', 'gia1Km']}
              label="Giá tiền"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 0,
                  max: 1000000,
                },
              ]}
            >
              <InputNumber style={{ width: 200 }} placeholder="Giá cho 1 km" />
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trains: state.train.trains,
  err: state.error,
  isCreated: state.route.isRegistered,
  msg: state.route.msg,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreateRoute: (route) => {
      dispatch(actCreateRoute(route));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrainModal);
