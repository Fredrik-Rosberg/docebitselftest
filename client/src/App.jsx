import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Forms.css";
import SignInComponent from "./components/signIn/SignIn";
import SendResetMailComponent from "./components/passwordreset/SendResetMail";
import "@fontsource/raleway";
import NewPassword from "./components/passwordreset/NewPassword";
import MainLayout from "./layout/MainLayout";
import NavbarLayoutAdmin from "./layout/NavbarLayoutAdmin";
import NavbarLayoutUser from "./layout/NavbarLayoutUser";
import CreateCourseOccasion from "./components/admin/createCourseOccasion/CreateCourseOccasion";
import CreateAccount from "./components/admin/createAccount/CreateAccount";
import AccountTable from "./components/admin/tables/AccountTable";
import MyAccount from "./components/Account/MyAccount";
import Overview from "./components/admin/overview/Overview";
import Course from "./components/admin/createCourse/CreateCourse";
import OverviewUser from "./components/user/overview/OverviewUser";
import CourseOrganizer from "./components/admin/courseorganizer/CourseOrganizer";
import EditAccount from "./components/admin/editAccount/EditAccount";
import ChangePassword from "./components/admin/changePassword/ChangePassword";
import Test from "./components/admin/uploadTest/UploadTest";
import ChooseTest from "./components/user/chooseTest/ChooseTest";
import GlobalContextProvider from "./components/context/TableContext";
import Questions from "./components/user/questionsform/Questions";
import QuestionContext from "./components/context/QuestionContext";
function App() {
  return (
    <QuestionContext>
     <GlobalContextProvider>
     
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<SignInComponent />} />
              <Route path="/reset" element={<SendResetMailComponent />} />
              <Route path="/reset/:id" element={<NewPassword />} />
            </Route>
            <Route path="/admin" element={<NavbarLayoutAdmin />}>
              <Route
                path="/admin/courseoccasion/create"
                element={<CreateCourseOccasion />}
              />
              <Route path="/admin/account/create" element={<CreateAccount />} />
              <Route path="/admin/account/users" element={<AccountTable />} />
              <Route path="/admin/myaccount" element={<MyAccount />} />
              <Route path="/admin/test" element={<Test />} />
              <Route
                path="/admin/course/organizer"
                element={<CourseOrganizer />}
              />

              <Route path="/admin/account/:id" element={<EditAccount />} />
              <Route
                path="/admin/account/:id/changepassword"
                element={<ChangePassword />}
              />
              <Route path="/admin" element={<Overview />} />
              <Route path="/admin/course" element={<Course />} />
            </Route>
            <Route>
              <Route path="/user" element={<NavbarLayoutUser />}>
                <Route path="/user/" element={<OverviewUser />} />
                <Route path="/user/test" element={<ChooseTest />} />
                <Route path="/user/myaccount" element={<MyAccount />} />
                <Route
                  path="/user/account/:id/changepassword"
                  element={<ChangePassword />}
                />
              </Route>
              <Route path="/user/test/questionform" element={<Questions />} />
            </Route>
          </Routes>
        </Router>
      
    </GlobalContextProvider></QuestionContext>
  );
}

export default App;
