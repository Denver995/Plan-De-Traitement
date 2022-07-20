import React from "react";
import { useSelector } from "react-redux";
import { getFisrtLetter } from "../../../utils/helper";
import styles from "./styles";

const TimeLineHelper = ({ index, entityType }) => {

  const espacement = useSelector(state => state.ExamenReducer.espacement)
  const espacementNonGroupe = useSelector(state => state.ExamenReducer.espacementNonGroupe)
  const groupeToShowContentId = useSelector(state=>state.ExamenReducer.groupeToShowContentId)
  const espacementSubExam = useSelector(state=>state.ExamenReducer.espacementSubExam)
  return (
    <div>
      {/* <div style={styles.titleWrapper}>
        <div style={styles.leftDiv}>
          {index % 2 === 0 && <span style={styles.title}>{entityType ? entityType : "Examen"} {index + 1}</span>}
        </div>
        <div style={styles.dotContainer}>
          <div style={styles.dotChild}></div>
        </div>
        <div style={styles.rightDiv}>
          {index % 2 !== 0 && <span style={{ ...styles.title, marginLeft: 30 }}>{entityType ? entityType : "Examen"} {index + 1}</span>}
        </div>
      </div> */}
      <div style={styles.date}>
        {
          groupeToShowContentId === -1 &&
          !entityType &&
          espacementNonGroupe['espaceNonGroupe ' + index] &&
          espacementNonGroupe['espaceNonGroupe ' + index].length > 0 &&
          espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minInterval +
          espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minIntervalUnit + "-" +
          espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxInterval +
          espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxIntervalUnit
        }
        {
          groupeToShowContentId === -1 &&
          entityType &&
          espacement['espace ' + index] &&
          espacement['espace ' + index].length > 0 &&
          espacement['espace ' + index][espacement['espace ' + index].length - 1].minInterval +
          espacement['espace ' + index][espacement['espace ' + index].length - 1].minIntervalUnit + "-" +
          espacement['espace ' + index][espacement['espace ' + index].length - 1].maxInterval +
          espacement['espace ' + index][espacement['espace ' + index].length - 1].maxIntervalUnit
        }
        {
          groupeToShowContentId !== -1 &&
          entityType &&
          espacementSubExam['group ' + groupeToShowContentId] &&
          espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index] &&
          espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length > 0 &&
          espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index][espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length - 1].minInterval +
          getFisrtLetter(espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index][espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length - 1].minIntervalUnit) + "-" +
          espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index][espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length - 1].maxInterval +
          getFisrtLetter(espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index][espacementSubExam['group ' + groupeToShowContentId]["subEspace "+index].length - 1].maxIntervalUnit)
        }
      </div>
    </div>
  );
};

export default TimeLineHelper;
