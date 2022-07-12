import { EuiIcon } from "@elastic/eui";
import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import colors from "../../../utils/colors";
import Propover from "../../Propover";


const RecapExamItem = ({ color, date, position, index, data }) => {
  const colorsArr = ["primaryLight", "danger", "success", "warning"];

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "white",
        border: "1px solid",
        padding: 10,
        marginBottom: 10,
        marginTop: -40,
      }}

      position={position}
    >
      {data.map((exam, index) => (
        <div key={index}>
          <div
            style={{
              backgroundColor: colors[colorsArr[index]],
              padding: 5,
              marginBottom: data.length - 1 !== index ? 1 : 0,
              boxShadow: "0px 3px 6px #00000029",
              marginLeft: 6,
              marginRight: position === "right" ? 6 : 0,
            }}
          >
            <div style={{ marginBottom: 14 }}>
              <div className="card-content-header">
                <h4 style={{ fontSize: 13, color: colors.primarySombre }}>
                  <strong>*Spécialité* - *Motif*</strong>
                </h4>
              </div>
            </div>
            <div>
              <div className="praticien">
                <EuiIcon type="user" id="icon" />
                <h4 className="prc">*Praticien*</h4>
                <EuiIcon type="visMapCoordinate" id="icon" />
                <h4 style={{ fontSize: 13, color: colors.primarySombre }}>
                  *00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*
                </h4>
              </div>
            </div>
          </div>
          {index !== data.length - 1 && (
            <p
              style={{
                fontSize: 12,
                textDecoration: "underline",
                textAlign: "right",
                marginTop: 0,
                marginBottom: 0,
                marginRight: position === "right" ? 5 : 0,
                color: colors.primarySombre,
              }}
            >
              1hr-2hr
            </p>
          )}
        </div>
      ))}
      {position === "left" ? (
        <div style={{ position: "absolute", top: 4, left: 5 }}>
          <Propover />
        </div>
      ) : (
        <div style={{ position: "absolute", top: 4, right: 5 }}>
          <Propover />
        </div>
      )}
    </VerticalTimelineElement>
  );
};

export default RecapExamItem;
