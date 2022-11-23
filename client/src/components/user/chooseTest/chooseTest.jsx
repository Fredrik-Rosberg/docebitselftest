import React from "react";
import { useEffect, useState } from "react";
import { getTests } from "../../admin/overview/overview.service";
import "./chooseTest.css";

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
      <div className="choosetestmain">
        <div className="topsection">
          <h4>1. Välj ett test att genomföra</h4>
          <select
            className="choose-test-field"
            onChange={(e) =>
              setChoice({ ...choice, id: parseInt(e.target.value) })
            }
          >
            {tests.map((test) => (
              <option value={test.id} key={test.id}>
                {test.testname}
              </option>
            ))}
          </select>
        </div>
        <div className="midsection">
          <h4>2. Välj ett tidsalternativ</h4>

          <form
            onChange={(e) =>
              setChoice({ ...choice, testtime: parseInt(e.target.value) })
            }
            className="timeselectform"
          >
            <div className="radiofield">
              <input type="radio" value={75} name="time" defaultChecked />{" "}
              <label htmlFor="75 min">75 minuter</label>
            </div>

            <div className="radiofield">
              <input type="radio" value={90} name="time" />
              <label htmlFor="75 + 15min">75 + 15 minuter</label>
            </div>

            <div className="radiofield">
              <input type="radio" value={0} name="time" />
              <label htmlFor="75 min">Utan tid</label>
            </div>
          </form>
        </div>

        <div className="buttondiv">
          <button onClick={handleClick}>Fortsätt</button>
        </div>
      </div>
    </>
  );
};

export default ChooseTest;
