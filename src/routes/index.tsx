// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import Reserve from "../pages/Reserve";
import Account from "../pages/Account";
import About from "../pages/About";



export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/:id", element: <CourseDetail /> },
      { path: "/reserve", element: <Reserve /> },
      { path: "/account", element: <Account /> },
      { path: "/about", element: <About /> },
    ],
  },
]);
