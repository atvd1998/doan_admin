import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchTrains } from '../../../actions/trainAction';
import { Table, Divider, Tag } from 'antd';
import moment from 'moment';

class TrainManage extends Component {
  componentDidMount() {
    this.props.onFetchData();
    const now = moment().format('MMMM Do YYYY');
    console.log(now);

    setTimeout(() => {
      console.log(this.props.trains[0].ngaytratau);
      console.log(
        now === moment(this.props.trains[0].ngaytratau).format('MMMM Do YYYY')
      );
    }, 2000);
  }
  render() {
    const trains = this.props.trains;
    const columns = [
      {
        title: 'Số thứ tự',
        key: 'stt',
        render: (text, record) => trains.indexOf(record) + 1,
      },
      {
        title: 'Mác tàu',
        dataIndex: 'mactau',
        key: 'mactau',
        render: (text, record) => {
          return (
            <div>
              <Tag color="#3cba9f">{record.mactau}</Tag>
            </div>
          );
        },
      },
      {
        title: 'Ga hiện tại',
        dataIndex: 'gahientai',
        key: 'gahientai',
        render: (text, record) => {
          return record.gahientai ? record.gahientai : 'Chưa xác định';
        },
      },
      {
        title: 'Ngày trả tàu',
        dataIndex: 'ngaytratau',
        key: 'ngaytratau',
        render: (text, record) =>
          moment(record.ngaytratau).format('MMMM Do YYYY'),
      },
    ];
    return (
      <div>
        <Divider>Danh sách tàu</Divider>
        <Table
          columns={columns}
          dataSource={trains}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20'],
          }}
          rowKey="_id"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trains: state.train.trains,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchData: () => {
      dispatch(actFetchTrains());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrainManage);
