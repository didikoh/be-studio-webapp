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



export const router = createBrowserRouter([
  { path: "/coursedetail", element: <CourseDetail /> },
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/courses", element: <Courses /> },
      { path: "/schedule", element: <Schedule /> },
      { path: "/account", element: <Account /> },
      { path: "/about", element: <About /> },
    ],
  },
]);
