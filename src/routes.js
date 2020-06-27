import React from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './admin/Dashboard';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import CreateRoute from './admin/components/RouteAction/CreateRoute';
import EditRoute from './admin/components/RouteAction/EditRoute';
import TrainManage from './admin/components/TrainManage/TrainManage';
import RouteManage from './admin/components/RouteManage/RouteManage';
import InvoiceManage from './admin/components/InvoiceManage/InvoiceManage';
import CancelTicket from './admin/components/InvoiceAction/CancelTicket';
import Statistic from './admin/components/Statistic/Statistic';

const routes = [
  {
    path: '/login',
    exact: false,
    main: ({ history }) => <LoginPage history={history} />,
  },
  {
    path: '/dashboard',
    exact: false,
    main: ({ history }) => <Dashboard history={history} />,
  },
  {
    path: '/createroute/:gadi/:gaden',
    exact: false,
    main: ({ match, history }) => (
      <CreateRoute match={match} history={history} />
    ),
  },
  {
    path: '/editroute/:id',
    exact: false,
    main: ({ match, history }) => <EditRoute match={match} history={history} />,
  },
  {
    path: '/trainmanage',
    exact: false,
    main: ({ history }) => <TrainManage history={history} />,
  },
  {
    path: '/routemanage',
    exact: false,
    main: ({ history }) => <RouteManage history={history} />,
  },
  {
    path: '/invoicemanage',
    exact: false,
    main: ({ history }) => <InvoiceManage history={history} />,
  },
  {
    path: '/cancelticket',
    exact: false,
    main: ({ history }) => <CancelTicket history={history} />,
  },
  {
    path: '/statistic',
    exact: false,
    main: ({ history }) => <Statistic history={history} />,
  },
  {
    exact: true,
    main: () => <ErrorPage />,
  },
];
export default routes;
