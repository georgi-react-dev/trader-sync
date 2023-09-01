import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Root from "./routes/root";
import ErrorPage from "./components/error/error-page";
import Calendar from "./routes/Calendar";
import Trend from "./components/trend/Trend";
import Form from "./components/form/Form";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protected/ProtectedRoute";
const router = createBrowserRouter([
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
    element: <Root />,
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
        path: "trend-analize",
        element: (
          <ProtectedRoute>
            <Trend />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
