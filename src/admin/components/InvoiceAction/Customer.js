import React, { Component } from 'react';
import { Descriptions } from 'antd';

export default class Customer extends Component {
  state = {
    customer: null,
  };
  componentDidMount() {
    console.log(this.props.customer);

    let customer = this.props.customer;

    this.setState({
      customer: customer,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.customer !== nextProps.customer) {
      let customer = nextProps.customer;

      this.setState({
        customer: customer,
      });
    }
  }
  render() {
    return (
      <div>
        <Descriptions title="Khách hàng">
          <Descriptions.Item
            label="CMND"
            style={{ fontWeight: 'bold' }}
            span={1.5}
          >
            {this.state.customer ? this.state.customer.cmnd : 'loading'}
          </Descriptions.Item>
          <Descriptions.Item
            label="Họ tên"
            style={{ fontWeight: 'bold' }}
            span={1.5}
          >
            {this.state.customer ? this.state.customer.name : 'loading'}
          </Descriptions.Item>
          <Descriptions.Item
            label="Email"
            span={1.5}
            style={{ fontWeight: 'bold' }}
          >
            {this.state.customer ? this.state.customer.email : 'loading'}
          </Descriptions.Item>
          <Descriptions.Item
            label="Số điện thoại"
            style={{ fontWeight: 'bold' }}
            span={1.5}
          >
            {this.state.customer ? this.state.customer.sdt : 'loading'}
          </Descriptions.Item>
        </Descriptions>
        ,
      </div>
    );
  }
}
