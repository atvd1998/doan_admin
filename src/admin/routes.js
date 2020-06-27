import React from 'react';
import RouteManage from './components/RouteManage/RouteManage';
import ScheduleManage from './components/ScheduleManage/ScheduleManage';
import StaffManage from './components/StaffManage/StaffManage';
import TrainManage from './components/TrainManage/TrainManage';
import Statistic from './components/Statistic/Statistic';
import CancelTicket from './components/InvoiceAction/CancelTicket';
import InvoiceManage from './components/InvoiceManage/InvoiceManage';
import CreateRoute from './components/RouteAction/CreateRoute';
import EditRoute from './components/RouteAction/EditRoute';

const routes = [
  {
    path: '/dashboard',
    exact: true,
    main: () => <Statistic />,
  },
  {
    path: '/dashboard/staffmanage',
    exact: false,
    main: () => <StaffManage />,
  },
  {
    path: '/dashboard/schedulemanage',
    exact: false,
    main: () => <ScheduleManage />,
  },
  {
    path: '/dashboard/trainmanage',
    exact: false,
    main: ({ history }) => <TrainManage history={history} />,
  },
  {
    path: '/dashboard/routemanage',
    exact: false,
    main: ({ history }) => <RouteManage history={history} />,
  },
  {
    path: '/dashboard/createroute/:gadi/:gaden',
    exact: false,
    main: ({ match, history }) => (
      <CreateRoute match={match} history={history} />
    ),
  },
  {
    path: '/dashboard/editroute/:id',
    exact: false,
    main: ({ match, history }) => <EditRoute match={match} history={history} />,
  },
  {
    path: '/dashboard/invoicemanage',
    exact: false,
    main: ({ history }) => <InvoiceManage history={history} />,
  },
  {
    path: '/dashboard/cancelticket',
    exact: false,
    main: ({ history }) => <CancelTicket history={history} />,
  },
];
export default routes;
