import React from "react";
import { useEffect, useState } from "react";
import { getTests } from "../../admin/overview/overview.service";

const ChooseTest = () => {
  const [tests, setTests] = useState([]);
  const [choice, setChoice] = useState({
    id: "",
    testtime: 75,
  });

  useEffect(() => {
    async function fetchTests() {
      const data = await getTests();
      setTests(data);
      setChoice({ ...choice, id: data[0].id });
    }

    fetchTests();
  }, []);

  async function handleClick() {}

  console.log(choice);

  return (
    <>
      <h4>1. Välj ett test att genomföra</h4>
      <select
        onChange={(e) => setChoice({ ...choice, id: parseInt(e.target.value) })}
      >
        {tests.map((test) => (
          <option value={test.id} key={test.id}>
            {test.testname}
          </option>
        ))}
      </select>
      <h4>2. Välj ett tidsalternativ</h4>

      <form
        onChange={(e) =>
          setChoice({ ...choice, testtime: parseInt(e.target.value) })
        }
      >
        <input type="radio" value={75} name="time" defaultChecked /> 75 minuter
        <input type="radio" value={90} name="time" /> 75 + 15 minuter
        <input type="radio" value={0} name="time" /> utan tid
      </form>
      <button onClick={handleClick}>Fortsätt</button>
    </>
  );
};

export default ChooseTest;
