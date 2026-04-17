import {
  BriefCaseIcon,
  CalenderIcon,
  DashboardIcon,
  FolioIcon,
  SettingsIcon,
  SubIcon,
  TicketIcon,
  ClientsIcon,
  BookingNavIcon,
  ReviewNavIcon,
  NotifBellIcon,
  AdminMgmtIcon,
} from "../assets/icons/LinksIcon";

export const artisanLinks = [
  {
    path: "/artisan/dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/artisan/dashboard/manage-appointment",
    label: "Manage Appointment",
    icon: BriefCaseIcon,
  },
  {
    path: "/artisan/dashboard/calender",
    label: "Calendar",
    icon: CalenderIcon,
  },
  {
    path: "/artisan/dashboard/portfolio",
    label: "Portfolio",
    icon: FolioIcon,
  },
  {
    path: "/artisan/dashboard/subscription",
    label: "Subscription",
    icon: SubIcon,
  },
  {
    path: "/artisan/dashboard/settings",
    label: "Settings",
    icon: SettingsIcon,
  },
];

export const adminLinks = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/admin/dashboard/manage-artisans",
    label: "Manage Artisans",
    icon: BriefCaseIcon,
  },
  {
    path: "/admin/dashboard/manage-clients",
    label: "Manage Clients",
    icon: ClientsIcon,
  },
  // {
  //   path: "/admin/dashboard/manage-contacts",
  //   label: "Manage Contacts",
  //   icon: FolioIcon,
  // },
  {
    path: "/admin/dashboard/manage-categories",
    label: "Manage Categories",
    icon: CalenderIcon,
  },
  {
    path: "/admin/dashboard/bookings",
    label: "Bookings",
    icon: BookingNavIcon,
  },
  {
    path: "/admin/dashboard/support-tickets",
    label: "Support Tickets",
    icon: TicketIcon,
  },
  {
    path: "/admin/dashboard/reviews",
    label: "Reviews",
    icon: ReviewNavIcon,
  },
  {
    path: "/admin/dashboard/notifications",
    label: "Notifications",
    icon: NotifBellIcon,
  },
  {
    path: "/admin/dashboard/manage-subscriptions",
    label: "Subscriptions",
    icon: SubIcon,
  },
];

/** Links only visible to SUPER_ADMIN role — appended after adminLinks in the sidebar */
export const superAdminLinks = [
  {
    path: "/admin/dashboard/manage-admins",
    label: "Manage Admins",
    icon: AdminMgmtIcon,
  },
];
