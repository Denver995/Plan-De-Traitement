import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Propover from "../../Propover";
import { ReactComponent as MapIcon } from "../../../assets/svgs/Groupe-368.svg";
import { ReactComponent as PersonIcon } from "../../../assets/svgs/Groupe-367.svg";
import { ReactComponent as PinIcon } from "../../../assets/svgs/Groupe 301.svg";
import colors from "../../../utils/colors";
import styles from "./style";

function ExamCardV2({ color, date, position }) {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: color ? color : colors.primary,
        height: 82,
        marginTop: -40,
      }}
      date={date}
      position={position}
      iconStyle={{
        background: "rgb(19, 83, 117)",
        color: "#fff",
        border: "rgb(19, 83, 117)",
      }}
    >
      <div className="exam-card-content">
        <div
          style={position === "right" ? styles.rightHeader : styles.leftHeader}
        >
          <Propover />
          <h4 className="spec" style={styles.speciality}>
            <strong>*Spécialité* - *Motif*</strong>
          </h4>
        </div>
      </div>
      <div style={styles.sectionPraticien}>
        <div>
          <div
            style={
              position === "right"
                ? styles.praticienRightContainer
                : styles.praticienLeftContainer
            }
          >
            <PersonIcon width={"1rem"} />
            <h4 style={styles.praticien}>*Praticien*</h4>
            <MapIcon width={"0.7rem"} />
            <h4 style={styles.adresse}>
              *00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*
            </h4>
          </div>
          <PinIcon width={"7px"} height={"11px"} style={styles.pin} />
        </div>
      </div>
    </VerticalTimelineElement>
  );
}

export default ExamCardV2;