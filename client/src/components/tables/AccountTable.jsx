import React, { useState, useEffect } from "react";
import { getUsers } from "../course/courseService";
const AccountTable = () => {
  const [users, setUsers] = useState({});
  const getUser = async () => {
    let users = await getUsers();
    console.log(users);
    setUsers(users);
  };
  useEffect(() => {
    getUser();
  }, []);

  return <></>;
};

export default AccountTable;
