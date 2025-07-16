import { BriefCaseIcon, DashboardIcon } from "../assets/icons/LinksIcon";

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
    path: "/artisan/dashboard/portfolio",
    label: "Service List",
    icon: DashboardIcon,
  },

  // {
  //   path: "/artisan/dashboard/subscription",
  //   label: "Subscription",
  //   icon: SubcriptionIcon,
  // },
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
    path: "/admin/dashboard/manage-contacts",
    label: "Manage Contacts",
    icon: DashboardIcon,
  },
  {
    path: "/admin/dashboard/manage-categories",
    label: "Manage Categories",
    icon: DashboardIcon,
  },
];
