import React, { Component } from 'react';
import { Descriptions, Divider } from 'antd';
import moment from 'moment';

export default class InvoiceDetail extends Component {
  state = {
    invoicedetail: [],
  };
  componentDidMount() {
    let invoicedetail = this.props.invoicedetail;

    this.setState({
      invoicedetail: invoicedetail,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.invoicedetail !== nextProps.invoicedetail) {
      let invoicedetail = nextProps.invoicedetail;

      this.setState({
        invoicedetail: invoicedetail,
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.invoicedetail
          ? this.state.invoicedetail.map((detail, index) => {
              return (
                <>
                  <Divider>Thông tin vé {index + 1}</Divider>
                  <Descriptions key={index}>
                    <Descriptions.Item
                      style={{ fontWeight: 'bold' }}
                      label="Mã vé"
                      span={2}
                    >
                      {detail.mave}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="CMND"
                      style={{ fontWeight: 'bold' }}
                    >
                      {detail.cmnd}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Người đi"
                      style={{ fontWeight: 'bold' }}
                      span={2}
                    >
                      {detail.name}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label="Đối tượng"
                      style={{ fontWeight: 'bold' }}
                    >
                      {detail.doituong}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Ngày đi"
                      style={{ fontWeight: 'bold' }}
                      span={2}
                    >
                      {moment(detail.thoigiandi).format('MMMM Do YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Mác tàu"
                      style={{ fontWeight: 'bold' }}
                    >
                      {detail.matau}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label="Số toa"
                      style={{ fontWeight: 'bold' }}
                    >
                      {detail.sotoa}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Số ghế"
                      style={{ fontWeight: 'bold' }}
                    >
                      {detail.soghe}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Loại ghế"
                      style={{ fontWeight: 'bold' }}
                    >
                      {detail.loaighe}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Hành trình"
                      style={{ fontWeight: 'bold' }}
                      span={2}
                    >
                      {detail.gadi} - {detail.gaden}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Giá vé"
                      style={{ fontWeight: 'bold' }}
                    >
                      {detail.giave} VND
                    </Descriptions.Item>
                  </Descriptions>
                </>
              );
            })
          : 'loading'}
      </div>
    );
  }
}
