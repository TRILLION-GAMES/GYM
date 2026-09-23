import type { NavItemConfig, NavCategory } from '../types';

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  // MAIN
  {
    id: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Overview & daily summary',
    iconName: 'LayoutDashboard',
    path: '/',
    category: 'MAIN',
    roles: ['member', 'trainer', 'admin'],
    mobileBottomTab: true,
    mobileOrder: 1,
    stats: { label: 'Status', value: 'Live' }
  },

  // MEMBERS
  {
    id: 'members',
    title: 'Members',
    subtitle: 'Directory & profiles',
    iconName: 'Users',
    path: '/members',
    category: 'MEMBERS',
    roles: ['trainer', 'admin'],
    mobileBottomTab: true,
    mobileOrder: 2,
    stats: { label: 'Directory', value: 'View Members' }
  },
  {
    id: 'membership',
    title: 'Memberships',
    subtitle: 'Plans, renewals & tiers',
    iconName: 'CreditCard',
    path: '/memberships',
    category: 'MEMBERS',
    roles: ['member', 'admin'],
    stats: { label: 'Status', value: 'Plans & Tiers' }
  },
  {
    id: 'payments',
    title: 'Payments',
    subtitle: 'Invoices, fees & dues',
    iconName: 'Receipt',
    path: '/payments',
    category: 'MEMBERS',
    roles: ['admin'],
    mobileBottomTab: true,
    mobileOrder: 4,
    stats: { label: 'Billing', value: 'Fee Records' }
  },
  {
    id: 'attendance',
    title: 'Attendance',
    subtitle: 'Daily check-ins & streaks',
    iconName: 'CalendarCheck2',
    path: '/attendance',
    category: 'MEMBERS',
    roles: ['member', 'trainer', 'admin'],
    mobileBottomTab: true,
    mobileOrder: 3,
    stats: { label: 'Tracking', value: 'Check In' }
  },

  // FITNESS
  {
    id: 'workouts',
    title: 'Workouts',
    subtitle: 'Routines, exercises & logs',
    iconName: 'Dumbbell',
    path: '/workouts',
    category: 'FITNESS',
    roles: ['member', 'trainer', 'admin'],
    mobileBottomTab: true,
    mobileOrder: 2,
    stats: { label: 'Routine', value: 'Workout Plan' }
  },
  {
    id: 'diet',
    title: 'Diet & Nutrition',
    subtitle: 'Macros, calories & meals',
    iconName: 'Salad',
    path: '/diet',
    category: 'FITNESS',
    roles: ['member', 'trainer', 'admin'],
    mobileBottomTab: true,
    mobileOrder: 3,
    stats: { label: 'Nutrition', value: 'Daily Diet' }
  },
  {
    id: 'progress',
    title: 'Progress & Body Metrics',
    subtitle: 'Weight, measurements & goals',
    iconName: 'TrendingUp',
    path: '/progress',
    category: 'FITNESS',
    roles: ['member', 'trainer', 'admin'],
    stats: { label: 'Metrics', value: 'Weight & Body' }
  },

  // TRAINING
  {
    id: 'classes',
    title: 'Classes',
    subtitle: 'Group fitness schedule',
    iconName: 'Flame',
    path: '/classes',
    category: 'TRAINING',
    roles: ['member', 'trainer', 'admin'],
    stats: { label: 'Schedule', value: 'Group Classes' }
  },
  {
    id: 'sessions',
    title: 'Personal Training',
    subtitle: '1-on-1 coaching appointments',
    iconName: 'Timer',
    path: '/sessions',
    category: 'TRAINING',
    roles: ['member', 'trainer', 'admin'],
    mobileBottomTab: true,
    mobileOrder: 2,
    stats: { label: 'Coaching', value: 'Sessions' }
  },

  // MANAGEMENT
  {
    id: 'leads',
    title: 'Leads & CRM',
    subtitle: 'Enquiries, trials & follow-ups',
    iconName: 'Target',
    path: '/leads',
    category: 'MANAGEMENT',
    roles: ['admin'],
    stats: { label: 'Pipeline', value: 'Member Leads' }
  },
  {
    id: 'equipment',
    title: 'Equipment',
    subtitle: 'Inventory & service logs',
    iconName: 'Wrench',
    path: '/equipment',
    category: 'MANAGEMENT',
    roles: ['admin'],
    stats: { label: 'Assets', value: 'Equipment Log' }
  },

  // COMMUNICATION
  {
    id: 'messages',
    title: 'Messages & Chat',
    subtitle: 'Direct messages & community',
    iconName: 'MessageSquare',
    path: '/messages',
    category: 'COMMUNICATION',
    roles: ['member', 'trainer', 'admin'],
    mobileBottomTab: true,
    mobileOrder: 4,
    stats: { label: 'Messages', value: 'Open Chat' }
  },

  // REPORTS
  {
    id: 'reports',
    title: 'Reports & Analytics',
    subtitle: 'Retention, revenue & metrics',
    iconName: 'BarChart3',
    path: '/reports',
    category: 'REPORTS',
    roles: ['admin'],
    stats: { label: 'Analytics', value: 'Gym BI' }
  },

  // SYSTEM
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'Profile, preferences & role',
    iconName: 'Settings',
    path: '/settings',
    category: 'SYSTEM',
    roles: ['member', 'trainer', 'admin'],
    stats: { label: 'Preferences', value: 'Manage App' }
  }
];

export const CATEGORY_LABELS: Record<NavCategory, string> = {
  MAIN: 'Main',
  MEMBERS: 'Members & Billing',
  FITNESS: 'Fitness & Health',
  TRAINING: 'Training & Classes',
  MANAGEMENT: 'Management & CRM',
  COMMUNICATION: 'Communication',
  REPORTS: 'Reports & BI',
  SYSTEM: 'System'
};
