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

export const router = createBrowserRouter([
  { path: "/construction", element: <Construction /> },
  { path: "/coursedetail", element: <CourseDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/coach_coursedetail", element: <CoachCourseDetail /> },
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/courses", element: <Courses /> },
      { path: "/schedule", element: <Schedule /> },
      { path: "/account", element: <Account /> },
      { path: "/about", element: <About /> },
      { path: "/coach_course", element: <CoachCourse /> },
      { path: "/coach_site", element: <CoachSite /> },
      { path: "/coach_account", element: <CoachAccount /> },
    ],
  },
]);
