import React from "react";
import { useEffect, useState } from "react";
import { getTests } from "../../admin/overview/overview.service";

const ChooseTest = () => {
  const [tests, setTests] = useState([]);
  const [choice, setChoice]=useState({})

  useEffect(() => {
    fetchTests();
    
  }, []);
  
  async function fetchTests() {
    const data = await getTests();
    setTests(data);
    setChoice(data[0].testname)
  }
  
  return (
    <>
      <select
        value={choice.testname}
        onChange={(e) => setChoice(e.target.value )}
      > 
        {tests.map((test) => (
            
          <option key={test.id}>{test.testname}</option>
        ))}
       
      </select>
    </>
  );
};

export default ChooseTest;
