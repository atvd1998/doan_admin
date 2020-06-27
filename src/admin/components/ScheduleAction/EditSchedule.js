import React, { Component } from 'react';
import { Form, Input, Select, Button, Spin } from 'antd';
import { actEditSchedule } from '../../../actions/scheduleAction';
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

  componentDidMount() {
    const { _id, gadi, gaden } = this.props.editSchedule;
    this.formRef.current.setFieldsValue({
      schedule: {
        gadi: gadi,
        gaden: gaden,
        _id: _id,
      },
    });
    this.setState({ gadi: gadi });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.editSchedule !== nextProps.editSchedule) {
      const { _id, gadi, gaden } = nextProps.editSchedule;

      this.formRef.current.setFieldsValue({
        schedule: {
          gadi: gadi,
          gaden: gaden,
          _id: _id,
        },
      });
      this.setState({ gadi: gadi });
    }
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({
      gadi: value,
    });
  };

  handleSubmit = (value) => {
    console.log(value);
    this.props.onEditSchedule(value.schedule);

    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      if (this.props.isEdited === false) {
        openNotificationWithIcon('error', 'Thông báo', this.props.err.msg.msg);
      } else {
        openNotificationWithIcon('success', 'Thông báo', this.props.msg);
        this.props.onOk();
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
          <Form.Item label="Id" name={['schedule', '_id']} hidden={true}>
            <Input />
          </Form.Item>
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
    onEditSchedule: (schedule) => {
      dispatch(actEditSchedule(schedule));
    },
  };
};

const mapStateToProps = (state) => ({
  err: state.error,
  msg: state.schedule.msg,
  stations: state.station.stations,
  isEdited: state.schedule.isEdited,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSchedule);
