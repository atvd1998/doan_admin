import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchTrains } from '../../../actions/trainAction';
import { Table, Divider, Tag, Button, Popover } from 'antd';
import moment from 'moment';
import { QuestionCircleOutlined } from '@ant-design/icons';

class TrainManage extends Component {
  componentDidMount() {
    this.props.onFetchData();
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
          return moment().isAfter(moment(record.ngaytratau).endOf('day')) ? (
            <div>
              <Tag color="green">{record.gahientai}</Tag>
              <Popover
                content="Nếu tàu hiện đang ở ga thì sẽ có màu xanh, còn đang chạy thì sẽ là màu đỏ"
                title="Note!"
              >
                <QuestionCircleOutlined />
              </Popover>
              ,
            </div>
          ) : (
            <div>
              <Tag color="red">{record.gahientai}</Tag>
              <Popover
                content="Nếu tàu hiện đang ở ga thì sẽ có màu xanh, còn đang chạy thì sẽ là màu đỏ"
                title="Note!"
              >
                <QuestionCircleOutlined />
              </Popover>
            </div>
          );
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
