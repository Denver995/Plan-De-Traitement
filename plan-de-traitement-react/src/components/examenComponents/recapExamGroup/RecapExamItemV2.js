import React, { useState } from "react";
import { EuiIcon } from "@elastic/eui";
import Circle from "@mui/icons-material/Circle";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import colors from "../../../utils/colors";
import { Plus } from "../../../assets/images";
import Propover from "../../Propover";
import { ReactComponent as PinIcon } from "../../../assets/svgs/Groupe 301.svg";

const Icon = () => <image width={20} height={20} />;

const RecapExamItemV2 = ({ color, date, position, index, data }) => {
  console.log("recap: ", position);
  const colorsArr = ["primaryLight", "danger", "success", "warning"];

  const leftStyle = {};
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "white",
        border: "1px solid",
        padding: 10,
        marginBottom: 10,
        marginTop: -40,
      }}
      // date={"2011 - present"}
      // iconStyle={{
      //   background: "rgb(19, 83, 117)",
      //   color: "#fff",
      //   border: "rgb(19, 83, 117)",
      // }}
      // icon={<Icon />}
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Propover />
          <PinIcon width={7} height={11} />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse" }}>
          <Propover />
          <PinIcon width={7} height={11} />
        </div>
      )}
    </VerticalTimelineElement>
  );
};

export default RecapExamItemV2;