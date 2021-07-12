import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'ADMIN',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/component/carousel',
    title: 'Mint',
    icon: 'mdi mdi-file',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/datepicker',
    title: 'Transfer',
    icon: 'mdi mdi-file',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/accordion',
    title: 'Manage Stores',
    icon: 'mdi mdi-file',
    class: '',
    extralink: false,
    submenu: []
  },
  
  {
    path: '/component/timepicker',
    title: 'All tokens',
    icon: 'mdi mdi-equal',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'CONSUMERS',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/component/poptool',
    title: 'Wallet',
    icon: 'mdi mdi-equal',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/buttons',
    title: 'Redeem',
    icon: 'mdi mdi-message-bulleted',
    class: '',
    extralink: false,
    submenu: []
  }
];
