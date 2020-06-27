import React, { Component } from 'react';
import { Select, Form, Divider } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { actFetchInvoices } from '../../../actions/invoiceAction';
import { Bar } from 'react-chartjs-2';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Statistic extends Component {
  state = {
    filter: 'day',
    value: '3days',
    invoices: [],
  };
  componentDidMount() {
    this.formRef.current.setFieldsValue({
      filterValue: '3',
      filter: 'day',
    });

    this.props.onFetchData();

    setTimeout(() => {
      let invoicesFilterDay = [];
      this.props.invoices.map((invoice) => {});
      this.props.invoices
        .filter(
          (f) =>
            moment(f.ngaylapHD).isAfter(moment().subtract(3, 'days')) &&
            moment(f.ngaylapHD).isBefore(moment())
        )
        .map((invoice) => {
          return invoicesFilterDay.push({
            date:
              moment(invoice.ngaylapHD).date() +
              ' - ' +
              (moment(invoice.ngaylapHD).month() + 1),
            tongtienHD: invoice.tongtienHD,
          });
        });
      this.setState({ invoices: invoicesFilterDay.reverse() });
    }, 1000);
  }
  formRef = React.createRef();
  handleChange = (value) => {
    switch (value) {
      case 'day':
        this.setState({
          filter: value,
          value: '3',
        });
        this.formRef.current.setFieldsValue({
          filterValue: '3',
        });
        let invoicesFilterDay = [];
        this.props.invoices
          .filter(
            (f) =>
              moment(f.ngaylapHD).isAfter(moment().subtract(3, 'days')) &&
              moment(f.ngaylapHD).isBefore(moment())
          )
          .map((invoice) => {
            return invoicesFilterDay.push({
              date:
                moment(invoice.ngaylapHD).date() +
                ' - ' +
                (moment(invoice.ngaylapHD).month() + 1),
              tongtienHD: invoice.tongtienHD,
            });
          });
        this.setState({ invoices: invoicesFilterDay.reverse() });
        break;
      case 'month':
        this.setState({
          filter: value,
          value: '2020',
        });
        this.formRef.current.setFieldsValue({
          filterValue: '2020',
        });
        let invoicesFilterMonth = [];

        for (let i = 1; i <= 12; i++) {
          let tongtientheothang = 0;
          const arr = this.props.invoices.filter(
            (f) =>
              moment(f.ngaylapHD).month() + 1 === i &&
              moment(f.ngaylapHD).year() === 2020
          );
          console.log(arr);

          if (arr.length !== 0) {
            tongtientheothang = arr.reduce((a, b) => a + b.tongtienHD, 0);
          }

          invoicesFilterMonth.push({
            date: 'Tháng ' + i,
            tongtienHD: tongtientheothang,
          });
        }

        this.setState({
          invoices: invoicesFilterMonth,
        });

        break;
      case 'year':
        this.setState({
          filter: value,
          value: '3',
        });
        this.formRef.current.setFieldsValue({
          filterValue: '3',
        });
        let invoicesFilterYear = [];
        let numberOfYear = 2020 - 3;
        for (let i = 2020; i > numberOfYear; i--) {
          let tongtientheonam = 0;
          const arr = this.props.invoices.filter(
            (f) => moment(f.ngaylapHD).year() === i
          );

          if (arr.length !== 0) {
            tongtientheonam = arr.reduce((a, b) => a + b.tongtienHD, 0);
          }

          invoicesFilterYear.push({
            date: i,
            tongtienHD: tongtientheonam,
          });
        }

        this.setState({ invoices: invoicesFilterYear.reverse() });
        break;

      default:
        break;
    }
    this.setState({
      filter: value,
    });
  };

  handleChangeValue = (value) => {
    switch (this.state.filter) {
      case 'day':
        let invoicesFilterDay = [];
        this.props.invoices
          .filter(
            (f) =>
              moment(f.ngaylapHD).isAfter(
                moment().subtract(parseInt(value), 'days')
              ) && moment(f.ngaylapHD).isBefore(moment())
          )
          .map((invoice) => {
            return invoicesFilterDay.push({
              date:
                moment(invoice.ngaylapHD).date() +
                ' - ' +
                (moment(invoice.ngaylapHD).month() + 1),
              tongtienHD: invoice.tongtienHD,
            });
          });
        this.setState({ invoices: invoicesFilterDay.reverse() });
        break;
      case 'month':
        let invoicesFilterMonth = [];

        for (let i = 1; i <= 12; i++) {
          let tongtientheothang = 0;
          const arr = this.props.invoices.filter(
            (f) =>
              moment(f.ngaylapHD).month() + 1 === i &&
              moment(f.ngaylapHD).year() === parseInt(value)
          );
          console.log(arr);

          if (arr.length !== 0) {
            tongtientheothang = arr.reduce((a, b) => a + b.tongtienHD, 0);
          }

          invoicesFilterMonth.push({
            date: 'Tháng ' + i,
            tongtienHD: tongtientheothang,
          });
        }

        this.setState({
          invoices: invoicesFilterMonth,
        });

        break;
      case 'year':
        let invoicesFilterYear = [];
        let numberOfYear = 2020 - parseInt(value);
        for (let i = 2020; i > numberOfYear; i--) {
          let tongtientheonam = 0;
          const arr = this.props.invoices.filter(
            (f) => moment(f.ngaylapHD).year() === i
          );

          if (arr.length !== 0) {
            tongtientheonam = arr.reduce((a, b) => a + b.tongtienHD, 0);
          }

          invoicesFilterYear.push({
            date: i,
            tongtienHD: tongtientheonam,
          });
        }

        this.setState({ invoices: invoicesFilterYear.reverse() });
        break;

      default:
        break;
    }
  };

  render() {
    let component = null;
    switch (this.state.filter) {
      case 'day':
        component = (
          <Select onChange={this.handleChangeValue} style={{ width: 100 }}>
            <Option value="3">3 ngày</Option>
            <Option value="7">7 ngày</Option>
            <Option value="10">10 ngày</Option>
          </Select>
        );
        break;
      case 'month':
        component = (
          <Select onChange={this.handleChangeValue} style={{ width: 100 }}>
            <Option value="2020">2020</Option>
            <Option value="2019">2019</Option>
            <Option value="2018">2018</Option>
          </Select>
        );
        break;
      case 'year':
        component = (
          <Select onChange={this.handleChangeValue} style={{ width: 100 }}>
            <Option value="3">3 năm</Option>
            <Option value="7">7 năm</Option>
            <Option value="10">10 năm</Option>
          </Select>
        );
        break;

      default:
        break;
    }

    const invoices = this.state.invoices;
    return (
      <div>
        <Divider>Thống kê doanh thu</Divider>
        <Form
          ref={this.formRef}
          style={{ width: '30%', margin: 'auto' }}
          {...layout}
          layout="inline"
          name="nest-messages"
        >
          <Form.Item name="filter">
            <Select onChange={this.handleChange} style={{ width: 200 }}>
              <Option value="day">Thống kê theo ngày</Option>
              <Option value="month">Thống kê theo tháng</Option>
              <Option value="year">Thống kê theo năm</Option>
            </Select>
          </Form.Item>

          <Form.Item name="filterValue">{component}</Form.Item>
        </Form>

        <Bar
          data={{
            labels: invoices.map((invoice) => {
              return invoice.date;
            }),
            datasets: [
              {
                label: 'Doanh thu bán vé',
                backgroundColor: '#3cba9f',
                data: invoices.map((invoice) => {
                  return invoice.tongtienHD;
                }),
              },
            ],
          }}
          options={{
            legend: { display: true },
            title: {
              display: true,
              text: 'Doanh thu của đại lý bán vé tàu',
            },
          }}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
