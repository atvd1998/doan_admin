import './dashboard.css';
import React from 'react';
import { Layout, Menu } from 'antd';

import {
  WalletOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  LogoutOutlined,
  ContactsOutlined,
  BarChartOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import routes from './routes';
import { actLogout } from '../actions/authAction';
import { connect } from 'react-redux';
import { openNotificationWithIcon } from '../utils/notification';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    return (
      <Router>
        {isAuthenticated ? (
          <Layout>
            <Sider
              className="sidebar"
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo"></div>
              <h4 style={{ textAlign: 'center', color: 'white' }}>
                {this.props.user.name}
              </h4>
              {this.props.user.role === 'admin' ? (
                <Menu
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark"
                >
                  <Menu.Item key="1" icon={<BarChartOutlined />}>
                    <Link to="/dashboard">Doanh thu</Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<ProjectOutlined />}>
                    <Link to="/dashboard/trainmanage">Tàu</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<ScheduleOutlined />}>
                    <Link to="/dashboard/schedulemanage">Lịch trình</Link>
                  </Menu.Item>
                  <Menu.Item key="4" icon={<CalendarOutlined />}>
                    <Link to="/dashboard/routemanage">Chuyến tàu</Link>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<ContactsOutlined />}>
                    <Link to="/dashboard/staffmanage">Nhân viên</Link>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<PieChartOutlined />}>
                    <Link to="">Khuyến mãi</Link>
                  </Menu.Item>

                  <SubMenu
                    key="sub1"
                    icon={<WalletOutlined />}
                    title="Khách hàng"
                  >
                    <Menu.Item key="7">
                      <Link to="/dashboard/invoicemanage">
                        Khách hàng mua vé
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                      <Link to="/dashboard/cancelticket">Danh sách vé trả</Link>
                    </Menu.Item>
                  </SubMenu>

                  <Menu.Item
                    onClick={() => {
                      this.props.onLogout();
                      openNotificationWithIcon(
                        'success',
                        'Thông báo đăng xuất',
                        'Đăng xuất thành công'
                      );
                      this.props.history.push('/login');
                    }}
                    key="9"
                    icon={<LogoutOutlined />}
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu>
              ) : (
                <Menu
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark"
                >
                  <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link to="/">Thống kê doanh thu</Link>
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    icon={<WalletOutlined />}
                    title="Khách hàng"
                  >
                    <Menu.Item key="2">
                      <Link to="/dashboard/invoicemanage">
                        Khách hàng mua vé
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to="/dashboard/cancelticket">Danh sách vé trả</Link>
                    </Menu.Item>
                  </SubMenu>

                  <Menu.Item
                    onClick={() => {
                      this.props.onLogout();
                      openNotificationWithIcon(
                        'success',
                        'Thông báo đăng xuất',
                        'Đăng xuất thành công'
                      );
                      this.props.history.push('/login');
                    }}
                    key="9"
                    icon={<LogoutOutlined />}
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu>
              )}
            </Sider>
            <Layout className="site-layout">
              <Header
                className="site-layout-background header"
                style={{ padding: 0 }}
              >
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: this.toggle,
                  }
                )}
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 1024,
                }}
              >
                <Switch>
                  {routes.length > 0
                    ? routes.map((route, index) => {
                        return (
                          <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                          />
                        );
                      })
                    : null}
                </Switch>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Đồ án tốt nghiệp: Đặt vé tàu hỏa
              </Footer>
            </Layout>
          </Layout>
        ) : (
          <ErrorPage />
        )}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogout: () => {
      dispatch(actLogout());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
