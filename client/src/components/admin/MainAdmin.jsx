import "./mainAdmin.css";
import React from "react";
import CreateAccount from "./createAccount/CreateAccount";
import { AiOutlineProfile } from "react-icons/ai";
import "../../assets/cropped-DocebIT01-1-1.jpg";
import CreateCourse from "../createCourseOccasion/CreateCourseOccasion";

function MainAdmin() {
  return (
    <>
          {/* <CreateAccount /> */}
          <CreateCourse/>
    </>
  );
}

export default MainAdmin;
