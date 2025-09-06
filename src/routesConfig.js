import React from "react";
import ErrorPage from "./components/error/error-page";
import Form from "./components/form/Form";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import Trend from "./components/trend/Trend";
import Calendar from "./routes/Calendar";
import SizeCalculator from "./components/sizeCalculator/SizeCalculator";
import Dashboard from "./routes/Dashboard";
import Root from "./routes/root";

const routesConfig = [
  {
    path: "/autentication",
    element: <Form />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Root />,
    //   },
    //   {
    //     path: "calendar",
    //     element: <Calendar />,
    //   },
    //   {
    //     path: "trend-analize",
    //     element: <Trend />,
    //   },
    // ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "calendar",
        element: (
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        ),
      },
      {
        path: "size-calculator",
        element: (
          <ProtectedRoute>
            <SizeCalculator />
          </ProtectedRoute>
        ),
      },
      {
        path: "trend-analize",
        element: (
          <ProtectedRoute>
            <Trend />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routesConfig;
