import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./Routes/Home";
import History from "./Routes/Calorie-history";
import Food from "./Routes/Food";
import Guidelines from "./Routes/Guidelines";
import Meal from "./Routes/Meal-plan";
import Options from "./Routes/Options";
import Profile from "./Routes/Profile";
import Sidebar from "./components/Sidebar";
import "./App.css";
const AppLayout = () => (
  <>
  <Sidebar/>
  <Outlet />
  </>
);


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />, 
      },
      {
        path: "calorie-history",
        element: <History />
      },
      {
        path: "food",
        element: <Food />
      },
      {
        path: "guideline",
        element: <Guidelines />
      },
      {
        path: "meal-plan",
        element: <Meal />
      },
      {
        path: "option",
        element: <Options />
      },
      {
        path: "profile",
        element: <Profile />
      },
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);