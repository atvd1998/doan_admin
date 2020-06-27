import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchUsers, actDeleteUser } from '../../../actions/userAction';
import { Table, Button, Modal, Divider, Popconfirm, Spin } from 'antd';
import AddStaff from '../StaffAction/AddStaff';
import EditStaff from '../StaffAction/EditStaff';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '../../../utils/notification';

class StaffManage extends Component {
  state = {
    visible1: false, // This is for modal Add Staff
    visible2: false, // This is for modal Edit Staff
    user: null, // Use for update user
    loading: false,
  };

  //AddStaff modal
  showAddStaffModal = () => {
    this.setState({
      visible1: true,
    });
  };
  handleOkAddStaffModal = (e) => {
    this.props.onFetchData();

    this.setState({
      visible1: false,
    });
  };

  handleCancelAddStaffModal = (e) => {
    this.props.onFetchData();

    this.setState({
      visible1: false,
    });
  };

  //EditStaff modal
  showEditStaffModal = () => {
    this.setState({
      visible2: true,
    });
  };
  handleOkEditStaffModal = (e) => {
    this.props.onFetchData();

    this.setState({
      visible2: false,
    });
  };

  handleCancelEditStaffModal = (e) => {
    this.props.onFetchData();

    this.setState({
      visible2: false,
    });
  };
  handleClickUpdate = (id) => {
    let user = this.props.users.find((x) => x._id === id);
    this.setState({ user: user });

    this.showEditStaffModal();
  };

  handleClickDelete = (id) => {
    let user = this.props.users.find((x) => x._id === id);
    this.setState({
      loading: true,
    });

    this.props.onDeleteUser(user);

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      if (this.props.isDeleted === false) {
        openNotificationWithIcon('error', 'Thông báo', this.props.err.msg.msg);
      } else {
        openNotificationWithIcon('success', 'Thông báo', this.props.msg);
        this.props.onFetchData();
      }
    }, 3000);
  };

  componentDidMount() {
    this.props.onFetchData();
  }

  render() {
    const users = this.props.users;
    const columns = [
      {
        title: 'Số thứ tự',
        key: 'stt',
        render: (text, record) => users.indexOf(record) + 1,
      },
      {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'SĐT',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Chức vụ',
        dataIndex: 'role',
        key: 'role',
      },

      {
        title: 'Tác vụ',
        key: 'action',
        render: (text, record) => (
          <>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => this.handleClickUpdate(record._id)}
              style={{ marginRight: 10 }}
            >
              Chỉnh sửa
            </Button>
            <Popconfirm
              title="Chắc chắn xóa?"
              onConfirm={() => this.handleClickDelete(record._id)}
              okText="Xác nhận"
              cancelText="Hủy bỏ"
            >
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                //onClick={() => this.handleClickDelete(record._id)}
              >
                Xóa
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Divider>Quản lý nhân viên</Divider>
          <Button
            onClick={this.showAddStaffModal}
            type="primary"
            style={{ marginBottom: 10 }}
            icon={<PlusOutlined />}
          >
            Thêm nhân viên
          </Button>
          <Table
            columns={columns}
            dataSource={users}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20'],
            }}
            rowKey="_id"
          />
          <Modal
            title="Thêm nhân viên"
            visible={this.state.visible1}
            onOk={this.handleOkAddStaffModal}
            onCancel={this.handleCancelAddStaffModal}
            footer={null}
          >
            <AddStaff
              onCancel={this.handleCancelAddStaffModal}
              onOk={this.handleOkAddStaffModal}
            />
          </Modal>

          <Modal
            title="Chỉnh sửa nhân viên"
            visible={this.state.visible2}
            onOk={this.handleOkEditStaffModal}
            onCancel={this.handleCancelEditStaffModal}
            footer={null}
          >
            <EditStaff
              onCancel={this.handleCancelEditStaffModal}
              onOk={this.handleOkEditStaffModal}
              editUser={this.state.user}
            />
          </Modal>
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  users: state.user.users,
  isDeleted: state.user.isDeleted,
  msg: state.user.msg,
  err: state.error,
});
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFetchData: () => {
      dispatch(actFetchUsers());
    },
    onDeleteUser: (user) => {
      dispatch(actDeleteUser(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StaffManage);
