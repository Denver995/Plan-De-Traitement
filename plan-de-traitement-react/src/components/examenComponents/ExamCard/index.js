import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Propover from "../../Propover";
import { ReactComponent as MapIcon } from "../../../assets/svgs/Groupe-368.svg";
import { ReactComponent as PersonIcon } from "../../../assets/svgs/Groupe-367.svg";
import { ReactComponent as PinIcon } from "../../../assets/svgs/Groupe 301.svg";
import colors from "../../../utils/colors";
import styles from "./style";

function ExamCard({ color, date, position, examen, index }) {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: color ? color : colors.primary,
        height: 82,
        marginTop: -40,
        boxShadow: examen.positionFixed && "inset 0px 3px 6px #00000029",
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
          <div
            style={position === "right" ? styles.propRight : styles.propLeft}
          >
            <Propover index={index} forEXam={false}  />
          </div>
          <h4 className="spec" style={styles.speciality}>
            <strong>*Spécialité* - {examen.id_modif?? "id_motif"}</strong>
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
            <h4 style={styles.praticien}>{examen.id_praticien ?? "id_praticien"}</h4>
            <MapIcon width={"0.7rem"} />
            <h4 style={styles.adresse}>{examen.id_lieu ?? "id_lieu"}</h4>
          </div>
          {examen.positionFixed ? (
            <PinIcon
              width={"7px"}
              height={"11px"}
              style={position === "right" ? styles.pinRight : styles.pinLeft}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </VerticalTimelineElement>
  );
}

export default ExamCard;
