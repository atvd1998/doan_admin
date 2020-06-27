import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchStations } from '../../../actions/stationAction';
import {
  actFetchSchedule,
  actDeleteSchedule,
} from '../../../actions/scheduleAction';
import { Table, Button, Modal, Popconfirm, Divider, Spin } from 'antd';
import CreateSchedule from '../ScheduleAction/CreateSchedule';
import EditSchedule from '../ScheduleAction/EditSchedule';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '../../../utils/notification';

class ScheduleManage extends Component {
  state = {
    visible1: false,
    visible2: false,
    schedule: null,
    loading: false,
  };

  //Create modal
  showCreateScheduleModal = () => {
    this.setState({
      visible1: true,
    });
  };

  handleOkCreateScheduleModal = (e) => {
    this.props.onFetchSchedules();

    this.setState({
      visible1: false,
    });
  };

  handleCancelCreateScheduleModal = (e) => {
    this.props.onFetchSchedules();

    this.setState({
      visible1: false,
    });
  };

  //Edit modal
  showEditScheduleModal = () => {
    this.setState({
      visible2: true,
    });
  };
  handleOkEditScheduleModal = (e) => {
    this.props.onFetchSchedules();

    this.setState({
      visible2: false,
    });
  };

  handleCancelEditScheduleModal = (e) => {
    this.props.onFetchSchedules();

    this.setState({
      visible2: false,
    });
  };

  //Event for edit button
  handleClickEdit = (id) => {
    let schedule = this.props.schedules.find((x) => x._id === id);
    this.setState({ schedule: schedule });

    this.showEditScheduleModal();
  };
  onConfirmDelete = (id) => {
    let schedule = this.props.schedules.find((x) => x._id === id);
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      if (this.props.isDeleted === false) {
        openNotificationWithIcon('error', 'Thông báo', this.props.err.msg.msg);
      } else {
        openNotificationWithIcon('success', 'Thông báo', this.props.msg);
        this.props.onFetchSchedules();
      }
    }, 3000);

    this.props.onDeleteSchedule(schedule);
  };

  componentDidMount() {
    this.props.onFetchStations();
    this.props.onFetchSchedules();
  }
  render() {
    const schedules = this.props.schedules;
    const columns = [
      {
        title: 'Số thứ tự',
        key: 'stt',
        render: (text, record) => schedules.indexOf(record) + 1,
      },
      {
        title: 'Ga đi',
        dataIndex: 'gadi',
        key: 'gadi',
      },
      {
        title: 'Ga đến',
        dataIndex: 'gaden',
        key: 'gaden',
      },
      {
        title: 'Tác vụ',
        key: 'action',
        render: (text, record) => (
          <>
            <Button
              type="primary"
              onClick={() => this.handleClickEdit(record._id)}
              style={{ marginRight: 10 }}
              icon={<EditOutlined />}
            >
              Chỉnh sửa
            </Button>
            <Popconfirm
              title="Chắc chắn xóa ?"
              onConfirm={() => this.onConfirmDelete(record._id)}
              okText="Xác nhận"
              cancelText="Hủy bỏ"
            >
              <Button type="danger" icon={<DeleteOutlined />}>
                Xóa
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Divider>Quản lý lịch trình</Divider>
          <Button
            onClick={this.showCreateScheduleModal}
            type="primary"
            style={{ marginBottom: 10 }}
            icon={<PlusOutlined />}
          >
            Thêm lịch trình
          </Button>
          <Table
            columns={columns}
            dataSource={schedules}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20'],
            }}
            rowKey="_id"
          />
          <Modal
            title="Thêm lịch trình"
            visible={this.state.visible1}
            onOk={this.handleOkCreateScheduleModal}
            onCancel={this.handleCancelCreateScheduleModal}
            footer={null}
          >
            <CreateSchedule
              onOk={this.handleOkCreateScheduleModal}
              onCancel={this.handleCancelCreateScheduleModal}
            />
          </Modal>

          <Modal
            title="Sửa lịch trình"
            visible={this.state.visible2}
            onOk={this.handleOkEditScheduleModal}
            onCancel={this.handleCancelEditScheduleModal}
            footer={null}
          >
            <EditSchedule
              onOk={this.handleOkEditScheduleModal}
              onCancel={this.handleCancelEditScheduleModal}
              editSchedule={this.state.schedule}
            />
          </Modal>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stations: state.station.stations,
  schedules: state.schedule.schedules,
  msg: state.schedule.msg,
  isDeleted: state.schedule.isDeleted,
  err: state.error,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchStations: () => {
      dispatch(actFetchStations());
    },
    onFetchSchedules: () => {
      dispatch(actFetchSchedule());
    },
    onDeleteSchedule: (schedule) => {
      dispatch(actDeleteSchedule(schedule));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
