import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignInComponent from "./components/signIn/SignIn";
import SendResetMailComponent from "./components/passwordreset/SendResetMail";
import "@fontsource/raleway";
import NewPassword from "./components/passwordreset/NewPassword";
import MainLayout from "./layout/MainLayout";
import NavbarLayout from "./layout/NavbarLayout";
import CreateCourseOccasion from "./components/createCourseOccasion/CreateCourseOccasion";
import CreateAccount from "./components/admin/createAccount/CreateAccount";
import AccountTable from "./components/tables/AccountTable";
import MyAccount from "./components/Account/MyAccount";
import Overview from "./components/admin/overview/Overview";
import EditAccount from "./components/admin/editAccount/EditAccount";
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
          <Route path="/admin/myaccount" element={<MyAccount />} />
          <Route path="/admin/account/:id" element={<EditAccount />} />
          <Route path="/admin/overview" element={<Overview />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
