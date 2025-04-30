import DashboardIcon from "@/components/assets/images/control.png"
import TimerIcon from "@/components/assets/images/timer.png"
import GalleryIcon from "@/components/assets/images/portfolio.png"
import SubcriptionIcon from "@/components/assets/images/wall.png"

export const artisanLinks = [
  {
    path: "/artisan/dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/artisan/dashboard/manage-appointment",
    label: "Manage Appointment",
    icon: TimerIcon,
  },

  {
    path: "/artisan/dashboard/portfolio",
    label: "Service List",
    icon: GalleryIcon,
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
    icon: TimerIcon,
  },
  {
    path: "/admin/dashboard/manage-contacts",
    label: "Manage Contacts",
    icon: TimerIcon,
  },

 
];
