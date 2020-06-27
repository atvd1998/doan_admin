import React, { Component } from 'react';
import { Descriptions, Button, Spin } from 'antd';
import moment from 'moment';
import { actCancelTicket } from '../../../actions/invoiceAction';
import { connect } from 'react-redux';
import { openNotificationWithIcon } from '../../../utils/notification';

class TicketDetail extends Component {
  state = {
    ticket: null,
    id: null,
    loading: false,
  };
  componentDidMount() {
    console.log(this.props.id);
    let ticket = this.props.ticket;
    let id = this.props.id;

    this.setState({
      ticket: ticket,
      id: id,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.ticket !== nextProps.ticket) {
      let ticket = nextProps.ticket;
      let id = nextProps.id;

      this.setState({
        ticket: ticket,
        id: id,
      });
    }
  }

  handleClick = () => {
    const ticket = Object({
      mave: this.state.ticket.mave,
      id: this.state.id,
      giave: this.state.ticket.giave,
    });

    this.props.onCancelTicket(ticket);

    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      if (this.props.isCanceled === false) {
        openNotificationWithIcon('error', 'Thông báo', this.props.err.msg.msg);
      } else {
        openNotificationWithIcon('success', 'Thông báo', this.props.msg);
        this.props.onOk();
      }
    }, 3000);
  };
  render() {
    return (
      <div>
        <Spin spinning={this.state.loading}>
          {this.state.ticket ? (
            <>
              <Descriptions>
                <Descriptions.Item
                  style={{ fontWeight: 'bold' }}
                  label="Mã vé"
                  span={2}
                >
                  {this.state.ticket.mave}
                </Descriptions.Item>
                <Descriptions.Item label="CMND" style={{ fontWeight: 'bold' }}>
                  {this.state.ticket.cmnd}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Người đi"
                  style={{ fontWeight: 'bold' }}
                  span={2}
                >
                  {this.state.ticket.name}
                </Descriptions.Item>

                <Descriptions.Item
                  label="Đối tượng"
                  style={{ fontWeight: 'bold' }}
                >
                  {this.state.ticket.doituong}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Ngày đi"
                  style={{ fontWeight: 'bold' }}
                  span={2}
                >
                  {moment(this.state.ticket.thoigiandi).format('MMMM Do YYYY')}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Mác tàu"
                  style={{ fontWeight: 'bold' }}
                >
                  {this.state.ticket.matau}
                </Descriptions.Item>

                <Descriptions.Item
                  label="Số toa"
                  style={{ fontWeight: 'bold' }}
                >
                  {this.state.ticket.sotoa}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Số ghế"
                  style={{ fontWeight: 'bold' }}
                >
                  {this.state.ticket.soghe}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Loại ghế"
                  style={{ fontWeight: 'bold' }}
                >
                  {this.state.ticket.loaighe}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Hành trình"
                  style={{ fontWeight: 'bold' }}
                  span={2}
                >
                  {this.state.ticket.gadi} - {this.state.ticket.gaden}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Giá vé"
                  style={{ fontWeight: 'bold' }}
                >
                  {this.state.ticket.giave} VND
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            'loading'
          )}
          <div style={{ textAlign: 'right' }}>
            <Button onClick={this.handleClick} type="danger">
              Xác nhận hủy
            </Button>
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  msg: state.invoice.msg,
  isCanceled: state.invoice.isCanceled,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onCancelTicket: (ticket) => {
      dispatch(actCancelTicket(ticket));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TicketDetail);
