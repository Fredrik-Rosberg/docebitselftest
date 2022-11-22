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
import AccountTable from "./components/tables/account-table/AccountTable";
import MyAccount from "./components/Account/MyAccount";
import Overview from "./components/admin/overview/Overview";
import EditAccount from "./components/admin/editAccount/EditAccount";
import ChangePassword from "./components/admin/changePassword/ChangePassword";
import Test from "./components/test/Test";
import ChooseTest from "./components/user/chooseTest/chooseTest";
import GlobalContextProvider from "./components/context/TableContext";
function App() {
  return (
    <GlobalContextProvider>
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
            <Route path="/admin/test" element={<Test />} />

            <Route path="/admin/account/:id" element={<EditAccount />} />
            <Route
              path="/admin/account/:id/changepassword"
              element={<ChangePassword />}
            />
            <Route path="/admin/overview" element={<Overview />} />
          </Route>
          <Route>
            <Route path="/user" element={<NavbarLayout />} />
            <Route path="/user/test" element={<ChooseTest />} />
          </Route>
        </Routes>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
