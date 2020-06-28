import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchInvoices } from '../../../actions/invoiceAction';
import { Table, Button, Modal, Divider } from 'antd';
import Customer from '../InvoiceAction/Customer';
import InvoiceDetail from '../InvoiceAction/InvoiceDetail';
import moment from 'moment';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';

class InvoiceManage extends Component {
  state = {
    visible1: false,
    visible2: false,
    customer: null,
    invoicedetail: [],
  };

  showCustomerModal = () => {
    this.setState({
      visible1: true,
    });
  };
  handleCancelCustomerModal = () => {
    this.setState({
      visible1: false,
    });
  };

  showInvoiceDetailModal = () => {
    this.setState({
      visible2: true,
    });
  };

  handleCancelInvoiceDetailModal = () => {
    this.setState({
      visible2: false,
    });
  };

  handleClickCustomer = (id) => {
    let customer = this.props.invoices.find((invoice) => invoice._id === id);

    this.setState({
      customer: customer,
    });

    this.showCustomerModal();
  };

  handleClickInvoiceDetail = (id) => {
    let invoicedetail = this.props.invoices.find(
      (invoice) => invoice._id === id
    ).chitiethoadon;

    this.setState({
      invoicedetail: invoicedetail,
    });

    this.showInvoiceDetailModal();
  };
  componentDidMount() {
    this.props.onFetchData();
  }
  render() {
    const invoices = this.props.invoices;
    const columns = [
      {
        title: 'Số thứ tự',
        key: 'stt',
        render: (text, record) => invoices.indexOf(record) + 1,
      },
      {
        title: 'Mã hóa đơn',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Ngày lập hóa đơn',
        dataIndex: 'ngaylapHD',
        key: 'ngaylapHD',
        render: (text, record) => moment(record.ngaylapHD).format('MMM Do YY'),
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'tongtienHD',
        key: 'tongtienHD',
      },
      {
        title: 'Tác vụ',
        key: 'action',
        render: (text, record) => (
          <>
            <Button
              onClick={() => this.handleClickCustomer(record._id)}
              icon={<UserOutlined />}
              style={{ margin: 10, backgroundColor: '#a0d911', color: 'white' }}
            >
              Thông tin khách hàng
            </Button>
            <Button
              onClick={() => this.handleClickInvoiceDetail(record._id)}
              icon={<FileTextOutlined />}
              type="primary"
            >
              Chi tiết hóa đơn
            </Button>
          </>
        ),
      },
    ];
    return (
      <div>
        <Divider>Danh sách hóa đơn</Divider>
        <Table
          columns={columns}
          dataSource={invoices}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20'],
          }}
          rowKey="_id"
        />
        <Modal
          title="Thông tin khách hàng"
          visible={this.state.visible1}
          onCancel={this.handleCancelCustomerModal}
          footer={[
            <Button
              type="danger"
              key="back"
              onClick={this.handleCancelCustomerModal}
            >
              Đóng
            </Button>,
          ]}
        >
          <Customer customer={this.state.customer} />
        </Modal>

        <Modal
          title="Chi tiết hóa đơn"
          visible={this.state.visible2}
          onCancel={this.handleCancelInvoiceDetailModal}
          footer={[
            <Button
              type="danger"
              key="back"
              onClick={this.handleCancelInvoiceDetailModal}
            >
              Đóng
            </Button>,
          ]}
        >
          <InvoiceDetail invoicedetail={this.state.invoicedetail} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  invoices: state.invoice.invoices,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchData: () => {
      dispatch(actFetchInvoices());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceManage);
