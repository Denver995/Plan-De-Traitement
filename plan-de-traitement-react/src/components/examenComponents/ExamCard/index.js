import { EuiText } from "@elastic/eui";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { ReactComponent as PinIcon } from "../../../assets/svgs/Groupe 301.svg";
import { ReactComponent as PersonIcon } from "../../../assets/svgs/Groupe-367.svg";
import { ReactComponent as MapIcon } from "../../../assets/svgs/Groupe-368.svg";
import { getFisrtLetter } from "../../../utils/helper";
import Propover from "../../Propover";
import styles from "./style";

function ExamCard({
  date,
  color,
  entityType ,
  index,
  position,
  groupKey,
  examen,
  isExamGroup = false,
  examId,
  onBack,
}) {
  const groupesWithData = useSelector(
    (state) => state.ExamenReducer.groupWithData
  );
  const espacement = useSelector(state => state.ExamenReducer.espacement)
  const espacementNonGroupe = useSelector(state => state.ExamenReducer.espacementNonGroupe)
  const groupeToShowContentId = useSelector(state=>state.ExamenReducer.groupeToShowContentId)
  const espacementSubExam = useSelector(state=>state.ExamenReducer.espacementSubExam)
  let date_ = 
    (groupeToShowContentId === -1 &&
    !entityType) ? 
    espacementNonGroupe['espaceNonGroupe ' + index] &&
    espacementNonGroupe['espaceNonGroupe ' + index].length > 0 &&
    espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minInterval +
    espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minIntervalUnit + "-" +
    espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxInterval +
    espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxIntervalUnit
  :
    (groupeToShowContentId === -1 &&
    entityType) ?
    espacement['espace ' + index] &&
    espacement['espace ' + index].length > 0 &&
    espacement['espace ' + index][espacement['espace ' + index].length - 1].minInterval +
    espacement['espace ' + index][espacement['espace ' + index].length - 1].minIntervalUnit + "-" +
    espacement['espace ' + index][espacement['espace ' + index].length - 1].maxInterval +
    espacement['espace ' + index][espacement['espace ' + index].length - 1].maxIntervalUnit
  :
    (groupeToShowContentId !== -1 &&
    entityType) ?
    espacementSubExam['group ' + groupeToShowContentId] &&
    espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index] &&
    espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length > 0 &&
    espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index][espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length - 1].minInterval +
    getFisrtLetter(espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index][espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length - 1].minIntervalUnit) + "-" +
    espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index][espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length - 1].maxInterval +
    getFisrtLetter(espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index][espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length - 1].maxIntervalUnit)
  : null

  useEffect(() => {}, [groupesWithData]);
  return (
    <VerticalTimelineElement
      className="custom-vertical-timeline-element"
      contentStyle={{
        background: examen.color ? examen.color : "white",
        height: 82,
        marginTop: -20,
        padding: 10,
        boxShadow: examen.positionFixed && "inset 0px 3px 6px #00000029",
      }}
      date={date_}
      position={position}
      iconStyle={{
        background: "rgb(19, 83, 117)",
        color: "#fff",
        border: "rgb(19, 83, 117)",
        zIndex: 1,
      }}
      icon={<MapIcon />}
    >
      <div className="exam-card-content">
        <EuiText style={position === "right" ? styles.textRight : styles.text}>
          Examen {index + 1}
        </EuiText>
        <div
          style={
            position === "right" ? styles.dotContainer : styles.dotContainerLeft
          }
          className="dotContainer-right"
        >
          <div style={styles.dotChild}></div>
        </div>
        {examen.id_child !== undefined && (
          <div
            className="custom-bar"
            style={
              position === "right" ? styles.customBar : styles.customBarLeft
            }
          ></div>
        )}
        <div
          style={position === "right" ? styles.rightHeader : styles.leftHeader}
        >
          <div
            style={position === "right" ? styles.propRight : styles.propLeft}
          >
            <Propover
              index={index}
              groupKey={groupKey}
              exam={examen}
              isExamGroup={isExamGroup}
              examId={examId}
              onBack={onBack}
              isRecap={true}
            />
          </div>
          <h4 className="spec" style={styles.speciality}>
            <strong>*Spécialité* - {examen.id_modif ?? "id_motif"}</strong>
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
            <h4 style={styles.praticien}>
              {examen.id_praticien ?? "id_praticien"}
            </h4>
            <MapIcon width={"0.7rem"} />
            <h4 style={styles.adresse}>{examen.id_lieu ?? "id_lieu"}</h4>
          </div>
          {examen.positionFixed && (
            <PinIcon
              width={"7px"}
              height={"11px"}
              style={position === "right" ? styles.pinRight : styles.pinLeft}
            />
          )}
          {groupesWithData[groupKey]?.exams[index]?.positionFixed && (
            <PinIcon
              width={"7px"}
              height={"11px"}
              style={position === "right" ? styles.pinRight : styles.pinLeft}
            />
          )}
        </div>
      </div>
    </VerticalTimelineElement>
  );
}

export default ExamCard;
