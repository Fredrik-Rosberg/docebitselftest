import React, { useState } from "react";

const TestRowItem = (props) => {
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    setActive(!active);
    if (!active) {
      props.addTest({ add: props.test });
    } else if (active) {
      props.addTest({ remove: props.test.id });
    }
    e.preventDefault();
  };

  return (
    <>
      <tr
        className="selected-row"
        style={{ backgroundColor: active ? "rgb(148, 184, 231)" : "" }}
        onClick={handleClick}
      >
        <td>{props.test.testname}</td>
        <td>{new Date(props.test.uploaddate).toLocaleDateString("se-SE")}</td>
      </tr>
    </>
  );
};

export default TestRowItem;
