import React from "react";
import { EuiIcon } from "@elastic/eui";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

const RecapExamItem = ({ color, date, position }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: color, height: 90 }}
      date={date}
      position={position}
      iconStyle={{
        background: "rgb(19, 83, 117)",
        color: "#fff",
        border: "rgb(19, 83, 117)",
      }}
    >
      <div className="exam-card-content">
        <div className="card-content-header">
          <h4 className="spec">
            <strong>*Spécialité* - *Motif*</strong>
          </h4>
        </div>
      </div>
      <div className="first-div">
        <div className="praticien">
          <EuiIcon type="user" id="icon" />
          <h4 className="prc">*Praticien*</h4>
          <EuiIcon type="visMapCoordinate" id="icon" />
          <h4 className="spec">*00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*</h4>
        </div>
      </div>
      <div className="first-div">
        <div className="praticien">
          <EuiIcon type="calendar" id="icon" />
          <h4 className="prc">00/00/0000</h4>
          <EuiIcon type="clock" id="icon" />
          <h4 className="spec">00h00</h4>
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

export default RecapExamItem;
