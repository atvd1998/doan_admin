import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actEditRoute } from '../../../actions/routeAction';

import {
  Form,
  Button,
  Select,
  Divider,
  Table,
  DatePicker,
  Spin,
  Popover,
} from 'antd';
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '../../../utils/notification';

import moment from 'moment';
import train from '../../../assets/images/train.png';

const { Option } = Select;

const { RangePicker } = DatePicker;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const disabledDate = (current) => {
  return current && current < moment().endOf('day');
};
const validateMessages = {
  required: 'Trường này là bắt buộc',
};

const convertToNumber = (date) => {
  return (
    (((date.year() * 100 + (date.month() + 1)) * 100 + date.date()) * 100 +
      date.hour()) *
      100 +
    date.minute()
  );
};

class EditRoute extends Component {
  state = {
    lytrinh: [],
    gadi: null,
    gaden: null,
    date: null,
    stations: [],
    tongKM: null,
    _id: null,
    mactau: null,
    loading: false,
  };
  componentDidMount() {
    const routeID = this.props.match.params.id;

    const route = this.props.routes.find((f) => f._id === routeID);

    const lytrinh = route.lytrinh.filter((f) => f.gaDi !== route.gaden);

    const kcGaDi = this.props.stations.find(
      (station) => station.tenga === route.gadi
    ).khoangcach;
    const kcGaDen = this.props.stations.find(
      (station) => station.tenga === route.gaden
    ).khoangcach;

    const stations = this.props.stations.filter(
      (f) =>
        f.khoangcach < Math.max(kcGaDi, kcGaDen) &&
        f.khoangcach > Math.min(kcGaDi, kcGaDen)
    );

    const tongKM = Math.abs(kcGaDen - kcGaDi);

    const date = convertToNumber(
      moment(lytrinh[lytrinh.length - 1].thoigianDen)
    );

    this.setState({
      _id: route._id,
      gadi: route.gadi,
      gaden: route.gaden,
      lytrinh: lytrinh,
      stations: stations,
      date: date,
      tongKM: tongKM,
      mactau: route.mactau,
    });
  }

  handleSubmit = (value) => {
    let { tenga, ngaydi } = value.route;

    //Tính khoảng cách
    if (this.state.lytrinh.length === 0) {
      // Ga đầu tiền xét khoảng cách là 0
      let khoangcach = 0;
      let route = {
        gaDi: tenga,
        soKm: khoangcach,
        thoigianDi: ngaydi[0].toISOString(),
        thoigianDen: ngaydi[1].toISOString(),
      };
      this.setState((prevState) => ({
        lytrinh: [...prevState.lytrinh, route],
      }));
    } else {
      // Bắt đầu từ ga sau, tính khoảng cách từ ga đó đến ga đầu tiên
      if (this.state.lytrinh.length > 0) {
        let kcGaDen = this.props.stations.find(
          (station) => station.tenga === tenga
        ).khoangcach;
        let kcGaDi = this.props.stations.find(
          (station) => station.tenga === this.state.lytrinh[0].gaDi
        ).khoangcach;
        let khoangcach = Math.abs(kcGaDen - kcGaDi);
        const route = {
          gaDi: tenga,
          soKm: khoangcach,

          thoigianDi: ngaydi[0].toISOString(),
          thoigianDen: ngaydi[1].toISOString(),
        };
        this.setState((prevState) => ({
          lytrinh: [...prevState.lytrinh, route],
        }));
      }
    }

    this.setState({
      date: convertToNumber(value.route.ngaydi[1]),
    });
  };

  handleClickDelete = (tenga) => {
    let arr = this.state.lytrinh.filter((f) => f.gaDi !== tenga);
    let date = convertToNumber(moment(arr[arr.length - 1].thoigianDen));

    this.setState({
      date: date,
      lytrinh: arr,
    });
  };

  handleClickSubmit = () => {
    this.setState({ loading: true });

    this.props.onEditRoute({
      _id: this.state._id,
      gadi: this.state.gadi,
      gaden: this.state.gaden,
      lytrinh: this.state.lytrinh,
      mactau: this.state.mactau,
      tongKM: this.state.tongKM,
    });
    setTimeout(() => {
      this.setState({ loading: false });
      if (this.props.isEdited === false) {
        openNotificationWithIcon('error', 'Thông báo', this.props.err.msg.msg);
      } else {
        openNotificationWithIcon('success', 'Thông báo', this.props.msg);
        this.props.history.push('/dashboard/routemanage');
      }
    }, 3000);
  };
  render() {
    const route = this.state.lytrinh;
    const stations = this.props.stations;
    const date = this.state.date;
    const columns = [
      {
        title: 'Số thứ tự',
        dataIndex: 'stt',
        key: 'stt',
        render: (text, record) => route.indexOf(record) + 1,
      },
      {
        title: 'Ga đi',
        dataIndex: 'gaDi',
        key: 'gaDi',
      },
      {
        title: 'Khoảng cách',
        dataIndex: 'soKm',
        key: 'soKm',
        render: (text, record) => Math.abs(text) + ' KM',
      },

      {
        title: 'Thời gian đi',
        dataIndex: 'thoigianDi',
        key: 'thoigianDi',
        render: (text, record) =>
          new moment(record.thoigianDi).format('MMMM Do YYYY, h:mm A'),
      },
      {
        title: 'Thời gian đến',
        dataIndex: 'thoigianDen',
        key: 'thoigianDen',
        render: (text, record) =>
          new moment(record.thoigianDen).format('MMMM Do YYYY, h:mm A'),
      },
      {
        title: 'Hành động',
        key: 'action',
        render: (text, record) => (
          <>
            {route.indexOf(record) === 0 ? null : (
              <Button
                type="danger"
                onClick={() => this.handleClickDelete(record.gaDi)}
                icon={<DeleteOutlined />}
              ></Button>
            )}
          </>
        ),
      },
    ];
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Divider>Thông tin lịch trình</Divider>
          <div style={{ textAlign: 'center' }}>
            <div>
              {this.state.gadi ? this.state.gadi : null}
              <img
                style={{ width: '50px', margin: '0px 30px 0px 30px' }}
                src={train}
                alt="train"
              />
              {this.state.gaden ? this.state.gaden : null}
            </div>
          </div>

          <Divider>
            Thông tin chuyến đi{' '}
            <Popover
              content={this.props.stations.map((station, index) => (
                <div key={index}>
                  {station.tenga} - {station.khoangcach} km
                </div>
              ))}
              title="Thứ tự ga"
            >
              <QuestionCircleOutlined />
            </Popover>
          </Divider>
          <Form
            ref={this.formRef}
            style={{ width: '30%', margin: 'auto' }}
            {...layout}
            name="nest-messages"
            onFinish={this.handleSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Ga đi"
              name={['route', 'tenga']}
              rules={[
                {
                  required: true,
                },
                () => ({
                  validator(rule, value) {
                    const ga = route.find((r) => r.gaDi === value);
                    if (!value || !ga) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Ga đi không hợp lệ');
                  },
                }),
                () => ({
                  validator(rule, value) {
                    if (route.length > 1) {
                      let kcGaDen = stations.find(
                        (station) => station.tenga === value
                      ).khoangcach;
                      let kcGaDi = stations.find(
                        (station) =>
                          station.tenga === route[route.length - 1].gaDi
                      ).khoangcach;

                      let kcGaTruoc = stations.find(
                        (station) =>
                          station.tenga === route[route.length - 2].gaDi
                      ).khoangcach;

                      // eslint-disable-next-line no-mixed-operators
                      if (kcGaDen < kcGaDi === kcGaDi < kcGaTruoc) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'Vui lòng chọn ga theo đúng thứ tự'
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Select>
                {this.state.stations
                  ? this.state.stations.map((station, index) => {
                      return (
                        <Option key={index} value={station.tenga}>
                          {station.tenga}
                        </Option>
                      );
                    })
                  : 'Load data'}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày đi"
              name={['route', 'ngaydi']}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thông tin thời gian đi',
                },
                () => ({
                  validator(rule, value) {
                    if (route.length > 0) {
                      if (value && convertToNumber(value[0]) < date) {
                        return Promise.reject(
                          'Vui lòng chọn thời gian sau thời gian đến'
                        );
                      }
                      return Promise.resolve();
                    } else {
                      let today = new moment().date();
                      if (value && value[0].date() === today) {
                        return Promise.reject(
                          'Vui lòng không chọn ngày hôm nay'
                        );
                      }
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <RangePicker
                format="MM/DD/YYYY HH:mm"
                showTime={{ format: 'HH:mm' }}
                style={{ width: '100%' }}
                disabledDate={disabledDate}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button icon={<PlusOutlined />} type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>

          <Divider>Bảng lý trình</Divider>
          <Table
            columns={columns}
            dataSource={route}
            rowKey="gaDi"
            pagination={false}
          />

          <div style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              style={{ marginRight: 12 }}
              onClick={this.handleClickSubmit}
            >
              Xác nhận
            </Button>
          </div>
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  routes: state.route.routes,
  stations: state.station.stations,
  isEdited: state.route.isEdited,
  err: state.error,
  msg: state.route.msg,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onEditRoute: (route) => {
      dispatch(actEditRoute(route));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditRoute);
