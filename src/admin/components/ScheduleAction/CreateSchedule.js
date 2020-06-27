import React, { Component } from 'react';
import { Form, Select, Button, Spin } from 'antd';
import { actCreateSchedule } from '../../../actions/scheduleAction';
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
};

class CreateSchedule extends Component {
  formRef = React.createRef();
  state = {
    loading: false,
    gadi: null,
  };

  clearData = () => {
    this.formRef.current.setFieldsValue({
      schedule: {
        gadi: '',
        gaden: '',
      },
    });
    this.setState({ gadi: null });
  };

  handleChange = (value) => {
    console.log(value);
    this.setState({
      gadi: value,
    });
  };

  handleSubmit = (value) => {
    console.log(value);
    this.props.onCreateSchedule(value.schedule);
    // this.props.onRegister(value.user);

    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.props.onOk();
      this.setState({
        loading: false,
      });
      if (this.props.isCreated === false) {
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
            label="Ga đi"
            name={['schedule', 'gadi']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select onChange={this.handleChange}>
              {this.props.stations.map((station, index) => {
                return (
                  <Option key={index} value={station.tenga}>
                    {station.tenga}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Ga đến"
            name={['schedule', 'gaden']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              {this.props.stations
                .filter((filter) => filter.tenga !== this.state.gadi)
                .map((station, index) => {
                  return (
                    <Option key={index} value={station.tenga}>
                      {station.tenga}
                    </Option>
                  );
                })}
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
    onCreateSchedule: (schedule) => {
      dispatch(actCreateSchedule(schedule));
    },
  };
};

const mapStateToProps = (state) => ({
  err: state.error,
  isCreated: state.schedule.isCreated,
  msg: state.schedule.msg,
  stations: state.station.stations,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSchedule);
