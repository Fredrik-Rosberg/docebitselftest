import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RowItem = (props) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setActive(!active);
    if (!active) {
      props.addUser({add: props.user});
    } else if (active) {
      props.addUser({ remove: props.user.id });
    }
    e.preventDefault();
  };

  function handleDoubleClick(id) {
    navigate(`/admin/account/${id}`);
  }

  return (
    <>
      <tr
        className="selected-row"
        style={{ backgroundColor: active ? "rgb(148, 184, 231)" : "" }}
        onClick={handleClick}
        onDoubleClick={(e) => {
          handleDoubleClick(props.user.id);
        }}
      >
        <td>{props.user.firstname}</td>
        <td>{props.user.lastname}</td>
        <td>{props.user.email}</td>
      </tr>
    </>
  );
};

export default RowItem;
