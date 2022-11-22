import React, { useState } from "react";

const CourseOccasionRowItem = (props) => {
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    setActive(!active);
    if (!active) {
      props.addOccasion({ add: props.occasion });
    } else if (active) {
      props.addOccasion({ remove: props.occasion.id });
    }
    e.preventDefault();
  };


  return (
    <>
      <tr
        className="selected-row"
        onClick={handleClick}
        style={{ backgroundColor: active ? "rgb(148, 184, 231)" : "" }}
      >
        <td>{props.occasion.courseorganizer}</td>
        <td>{props.occasion.name}</td>
        <td>
          {new Date(props.occasion.startdate).toLocaleDateString("se-SE")}
        </td>
        <td>{new Date(props.occasion.enddate).toLocaleDateString("se-SE")}</td>
      </tr>
    </>
  );
};

export default CourseOccasionRowItem;
