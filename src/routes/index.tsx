// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import Account from "../pages/Account";

import About from "../pages/About";
import Schedule from "../pages/Schedule";
import Construction from "../pages/Construction";
import CoachCourse from "../pages/CoachCourse";
import CoachCourseDetail from "../pages/CoachCourseDetail";
import CoachAccount from "../pages/CoachAccount";
import CoachSite from "../pages/CoachSite";
import AdminAccount from "../pages/admin/AdminAccount";
import AdminMember from "../pages/admin/AdminMember";
import AdminHome from "../pages/admin/AdminHome";
import AdminTransaction from "../pages/admin/AdminTransaction";
import AdminSite from "../pages/admin/AdminSite";
import Events from "../pages/Events";
import EventDetail from "../pages/EventDetail";

export const router = createBrowserRouter([
  { path: "/construction", element: <Construction /> },
  { path: "/coursedetail", element: <CourseDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/coach_coursedetail", element: <CoachCourseDetail /> },
  { path: "/eventdetail", element: <EventDetail /> },
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/courses", element: <Courses /> },
      { path: "/schedule", element: <Schedule /> },
      { path: "/account", element: <Account /> },
      { path: "/event", element: <Events /> },
      { path: "/coach_course", element: <CoachCourse /> },
      { path: "/coach_site", element: <CoachSite /> },
      { path: "/coach_account", element: <CoachAccount /> },
      { path: "/admin_account", element: <AdminAccount /> },
      { path: "/admin_home", element: <AdminHome /> },
      { path: "/admin_member", element: <AdminMember /> },
      { path: "/admin_transaction", element: <AdminTransaction /> },
      { path: "/admin_site", element: <AdminSite /> },
    ],
  },
]);
