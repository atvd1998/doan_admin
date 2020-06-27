import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchTicket } from '../../../actions/invoiceAction';
import { Table, Button, Modal, Divider } from 'antd';
import moment from 'moment';
import TicketDetail from './TicketDetail';
import { DeleteOutlined } from '@ant-design/icons';

class CancelTicket extends Component {
  state = {
    ticket: null,
    visible: false,
    id: null,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });

    this.props.onFetchData();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.props.onFetchData();
  }
  handleCancelTicket = (id) => {
    const ticket = this.props.tickets.find((ticket) => ticket._id === id)
      .chitiethoadon;

    this.setState({
      ticket: ticket,
      id: id,
    });

    this.showModal();
  };
  render() {
    const tickets = this.props.tickets;
    const columns = [
      {
        title: 'Số thứ tự',
        key: 'stt',
        render: (text, record) => tickets.indexOf(record) + 1,
      },
      {
        title: 'Mã hóa đơn',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Mã vé',
        key: 'mave',
        render: (text, record) => record.chitiethoadon.mave,
      },
      {
        title: 'Ngày mua',

        key: 'ngaylapHD',
        render: (text, record) =>
          moment(record.ngaylapHD).format('MMMM Do YYYY'),
      },
      {
        title: 'Tác vụ',
        key: 'action',
        render: (text, record) => (
          <Button
            type="danger"
            onClick={() => this.handleCancelTicket(record._id)}
            icon={<DeleteOutlined />}
          >
            Xác nhận hủy
          </Button>
        ),
      },
    ];
    return (
      <div>
        <Divider>Danh sách vé trả</Divider>
        <Table
          columns={columns}
          dataSource={tickets}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20'],
          }}
          rowKey="_id"
        />
        <Modal
          title="Chi tiết vé"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <TicketDetail
            onOk={this.handleOk}
            id={this.state.id}
            ticket={this.state.ticket}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tickets: state.invoice.tickets,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchData: () => {
      dispatch(actFetchTicket());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CancelTicket);
