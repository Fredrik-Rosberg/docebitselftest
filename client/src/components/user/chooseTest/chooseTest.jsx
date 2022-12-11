import React from "react";
import { useEffect, useState, useContext } from "react";
import { getTestByUserId } from "./chooseTest.service";
import RunTest from "../runTest/RunTest.jsx";
import "./chooseTest.css";

const ChooseTest = () => {
  const [tests, setTests] = useState([]);
  const [choice, setChoice] = useState({
    courseid: "",
    testtime: 75,
    testid: 0,
  });
  const [startTest, SetStartTest] = useState(false);

  useEffect(() => {
    async function fetchTests() {
      const data = await getTestByUserId(localStorage.getItem("user"));
      setTests(data);
      setChoice({ ...choice, testid: data[0].testid, courseid: data[0].id });

      console.log(data);
    }

    fetchTests();
  }, []);



   function handleChoice(){
    tests.forEach((element) => {
      if (element.courseid == choice.courseid) {
        setChoice({ ...choice, testid: element.testid });
      }

    });
    console.log(tests)
    SetStartTest(true);
   }

  console.log(choice);
  console.log(tests);

  return (
    <>
      {startTest ? (
        <RunTest
          testid={choice.testid}
          testtime={choice.testtime}
          courseid={choice.courseid}
        />
      ) : (
        <div className="choosetestmain">
          <div className="topsection">
            <h4>1. Välj ett test att genomföra</h4>
            <select
              className="choose-test-field"
              onChange={(e) =>
                setChoice({ ...choice, courseid: parseInt(e.target.value) })
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
                <input type="radio" value={75} name="time" defaultChecked />
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
            <button onClick={() => handleChoice()}>Fortsätt</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChooseTest;
