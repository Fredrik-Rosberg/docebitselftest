import React from "react";


const Result = (props) => {
    console.log(props.wrongAnswers)
    return ( <>
    
    <p>Här är dina resultat {props.correctCount}</p>
    <p>{props.wrongAnswers.questionnr}</p>
    
    </> );
}
 
export default Result;