import React from "react";
import Menu from "./Components/Menu";
import Dashboard from "./Components/Dashboard";
import Transactions from "./Components/Transactions";
import Budget from "./Components/Budget";
import Reports from "./Components/Reports";
import Setting from "./Components/Setting";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Security from "./Components/Security";
import MyProfile from "./Components/MyProfile";
import Notifications from "./Components/Notifications";
import DataExport from "./Components/DataExport";
import DeleteAccount from "./Components/DeleteAccount";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/signin" />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/menu" element={<Menu />}>
          <Route index element={<Navigate to="menu/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="reports" element={<Reports />} />
          <Route path="setting" element={<Setting />}>
            <Route index element={<Navigate to="myprofile" />} />
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="security" element={<Security />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="dataexport" element={<DataExport />} />
            <Route path="deleteaccount" element={<DeleteAccount />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
