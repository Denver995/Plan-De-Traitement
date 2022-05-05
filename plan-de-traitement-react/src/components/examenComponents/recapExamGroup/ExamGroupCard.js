import React from "react";
import { EuiIcon } from "@elastic/eui";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import RecapExamItem from "./RecapExamItem";

import "./RecapExamGrp.css";

function ExamGroupCard({ group, position }) {
    console.log('position: ', position);
  return (
    <>
      {Object.keys(group).map((exam, index) => (
        <div key={index}>
            <RecapExamItem index={index} data={Object.keys(group)} position={position} color={'red'} date={new Date().toDateString()} />
        </div>
      ))}
    </>
  );
}

export default ExamGroupCard;
