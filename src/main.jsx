import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MoneyManagement from "./Component/Layout/Home/MoneyManagement";
import MarketCalculation from "./Component/Layout/Home/MarketCalculation";
import Main from "./Component/Layout/Main";
import Home from "./Component/Layout/Home/Home";
import Login from "./Component/Layout/Home/Login";
import Register from "./Component/Layout/Home/Register";
import Authprovaider from "./Component/Provaider/Authprovaider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "MoneyManagement",
        element: <MoneyManagement></MoneyManagement>,
      },
      {
        path: "MarketCalculation",
        element: <MarketCalculation></MarketCalculation>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Register></Register> ,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-gradient-to-l from-green-500 to-purple-500">
    <Authprovaider >
    <RouterProvider router={router} />
    </Authprovaider>
    </div>
  </React.StrictMode>
);
