import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { getUsers } from "../../admin/overview/overview.service";
import RowItem from "./RowItem";
import { TableContext } from "../../context/TableContext";

const AccountTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useContext(TableContext);

  //Hämtar valt konto från childcomponent, kollar om det är markerat och lägger till det till selectedUsers
  //annars tas det bort från listan.
  const addUser = (selectedUser) => {
    if (selectedUser.remove) {
      setSelectedUsers(() =>
        selectedUsers.filter(
          (element) => element.user.id !== selectedUser.remove
        )
      );
    } else {
      setSelectedUsers((selectedUsers) => [
        ...selectedUsers,
        { user: selectedUser.add },
      ]);
    }
  };

  //Hämtar alla konton
  useEffect(() => {
    const getUser = async () => {
      let users = await getUsers();
      setUsers(users);
    };
    getUser();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Konto</h2>
        <div className="table-container">
          <table className="tables">
            <thead className="thead">
              <tr>
                <th>Förnamn</th>
                <th>Efternamn</th>
                <th>Användarnamn</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <RowItem addUser={addUser} key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AccountTable;
