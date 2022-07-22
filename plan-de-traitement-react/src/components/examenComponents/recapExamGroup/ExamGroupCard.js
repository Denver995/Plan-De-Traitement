import React from "react";
import "./RecapExamGrp.css";
import RecapExamItem from "./RecapExamItem";

function ExamGroupCard({ group, position }) {
  return (
    <>
      {Object.keys(group).map((exam, index) => (
        <div key={index}>
          <RecapExamItem
            index={index}
            data={Object.keys(group)}
            position={position}
            color={"red"}
            date={new Date().toDateString()}
          />
        </div>
      ))}
    </>
  );
}

export default ExamGroupCard;
