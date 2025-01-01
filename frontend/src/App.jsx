import React from "react";
import Menu from "./Components/Menu";
import Dashboard from "./Components/Dashboard";
import Transactions from "./Components/Transactions";
import Budget from "./Components/Budget";
import Reports from "./Components/Reports";
import Setting from "./Components/Setting";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
