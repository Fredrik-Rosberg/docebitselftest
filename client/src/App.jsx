import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignInComponent from "./components/signin/SignInComponent";
import SendResetMailComponent from "./components/passwordreset/SendResetMailComponent";
import "@fontsource/raleway";
import NewPassword from "./components/passwordreset/NewPasswordComponent";
import MainLayout from "./layout/MainLayout";
import NavbarLayout from "./layout/NavbarLayout";
import CreateCourseOccasion from "./components/createCourseOccasion/createCourseOccasion";
import CreateAccount from "./components/admin/createAccount/CreateAccount";
import AccountTable from "./components/tables/AccountTable";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<SignInComponent />} />
          <Route path="/reset" element={<SendResetMailComponent />} />
          <Route path="/reset/:id" element={<NewPassword />} />
        </Route>
        <Route path="/admin" element={<NavbarLayout />}>
          <Route
            path="/admin/courseoccasion/create"
            element={<CreateCourseOccasion />}
          />
          <Route path="/admin/account/create" element={<CreateAccount />} />
          <Route path="/admin/account/users" element={<AccountTable />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
