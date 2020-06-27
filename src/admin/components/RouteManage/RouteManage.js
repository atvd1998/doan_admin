import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchSchedule } from '../../../actions/scheduleAction';
import { actFetchStations } from '../../../actions/stationAction';
import { actFetchTrains } from '../../../actions/trainAction';
import { actFetchRoutes } from '../../../actions/routeAction';
import { Table, Button, Modal, Popconfirm, Tag } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

class RouteManage extends Component {
  state = {
    visible: false,
  };

  showCreateRouteModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOkCreateRouteModal = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancelCreateRouteModal = (e) => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    this.props.onFetchSchedules();
    this.props.onFetchStations();
    this.props.onFetchTrains();
    this.props.onFetchRoutes();
  }
  render() {
    const schedules = this.props.schedules;
    const columnSchedules = [
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
            <Button type="primary">
              <Link
                to={`/dashboard/createroute/${record.gadi}/${record.gaden}`}
              >
                Chọn lịch trình
              </Link>
            </Button>
          </>
        ),
      },
    ];

    const routes = this.props.routes;
    const columnRoutes = [
      {
        title: 'Số thứ tự',
        key: 'stt',
        render: (text, record) => routes.indexOf(record) + 1,
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
        title: 'Thời gian đi',
        key: 'thoigianDi',
        render: (text, record) =>
          moment(record.lytrinh[0].thoigianDi).format('MMMM Do YYYY, h:mm a'),
      },
      {
        title: 'Thời gian đến',
        key: 'thoigianDen',
        render: (text, record) =>
          moment(record.lytrinh[record.lytrinh.length - 1].thoigianDen).format(
            'MMMM Do YYYY, h:mm a'
          ),
      },
      {
        title: 'Tác vụ',
        key: 'action',
        render: (text, record) => (
          <>
            <Button
              icon={<EditOutlined />}
              type="primary"
              style={{ marginRight: 10 }}
            >
              <Link
                style={{ color: 'white' }}
                to={`/dashboard/editroute/${record._id}`}
              >
                Chỉnh sửa
              </Link>
            </Button>
            <Button
              type="danger"
              onClick={() => this.handleClickDelete(record._id)}
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </>
        ),
      },
    ];
    return (
      <div>
        <Button
          onClick={this.showCreateRouteModal}
          type="primary"
          style={{ marginBottom: 10 }}
          icon={<PlusOutlined />}
        >
          Thêm chuyến tàu
        </Button>

        <Modal
          title="Thông tin lịch trình có sẵn"
          visible={this.state.visible}
          onOk={this.handleOkCreateRouteModal}
          onCancel={this.handleCancelCreateRouteModal}
          footer={[
            <Button
              type="danger"
              key="back"
              onClick={this.handleCancelCreateRouteModal}
            >
              Đóng
            </Button>,
          ]}
        >
          <Table
            columns={columnSchedules}
            dataSource={schedules}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20'],
            }}
            rowKey="_id"
          />
        </Modal>
        <Table
          columns={columnRoutes}
          dataSource={routes}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20'],
          }}
          expandable={{
            expandedRowRender: (record) =>
              record.lytrinh.map((lytrinh, index) => {
                return (
                  <table
                    key={index}
                    style={{
                      margin: 'auto',
                      width: '500px',
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: '100px' }}>
                          <Tag color="#3cba9f">{lytrinh.gaDi}</Tag>
                        </td>
                        <td style={{ width: '200px' }}>
                          <Tag color="#3cba9f">
                            {moment(lytrinh.thoigianDi).format(
                              'MMMM Do YYYY, h:mm a'
                            )}
                          </Tag>
                        </td>
                        <td>
                          <Tag color="#3cba9f">
                            {moment(lytrinh.thoigianDen).format(
                              'MMMM Do YYYY, h:mm a'
                            )}
                          </Tag>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                );
              }),
            rowExpandable: (record) => record.lytrinh.length > 1,
          }}
          rowKey="_id"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schedules: state.schedule.schedules,
  routes: state.route.routes,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchSchedules: () => {
      dispatch(actFetchSchedule());
    },
    onFetchStations: () => {
      dispatch(actFetchStations());
    },
    onFetchTrains: () => {
      dispatch(actFetchTrains());
    },
    onFetchRoutes: () => {
      dispatch(actFetchRoutes());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RouteManage);
