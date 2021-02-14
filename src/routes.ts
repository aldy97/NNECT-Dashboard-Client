import Dashboard from "./views/Dashboard.js";
import Reservations from "./views/Reservations";
import UserProfile from "./views/UserProfile";

interface Route {
  path: string;
  name: string;
  rtlName: string;
  icon: string;
  component: React.ReactNode;
  layout: string;
}

const routes: Route[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/reservations",
    name: "Reservations",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-book-bookmark",
    component: Reservations,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Restaurant Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
];
export default routes;
