import React from "react";
import { EuiIcon } from "@elastic/eui";
import Circle from "@mui/icons-material/Circle";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import colors from '../../../utils/colors';
import { Plus } from '../../../assets/images';


const RecapExamItem = ({ color, date, position, index, data }) => {
  console.log("recap: ", position);
  const colorsArr = ['primaryLight', 'danger', 'success', 'warning'];
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "white",
        border: "1px solid",
        padding: 20,
        marginBottom: 10,
      }}
      date={"2011 - present"}
      position={position}
      iconStyle={{
        background: "rgb(19, 83, 117)",
        color: "#fff",
        border: "rgb(19, 83, 117)",
      }}
      icon={<Circle />}
    >
      {data.map((exam, index) => (
        <div key={index}>
          <div style={{ backgroundColor: colors[colorsArr[index]] }}>
            <div className="exam-card-content">
              <div>{"examen name"}</div>
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
                <h4 className="spec">
                  *00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*
                </h4>
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
          </div>
        </div>
      ))}
    </VerticalTimelineElement>
  );
};

export default RecapExamItem;
