import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles";

const TimeLineHelper = ({ index, entityType }) => {

  const espacement = useSelector(state => state.ExamenReducer.espacement)
  const espacementNonGroupe = useSelector(state => state.ExamenReducer.espacementNonGroupe)
  return (
    <div>
      <div style={styles.titleWrapper}>
        <div style={styles.leftDiv}>
          {index % 2 === 0 && <span style={styles.title}>{entityType ? entityType : "Examen"} {index + 1}</span>}
        </div>
        <div style={styles.dotContainer}>
          <div style={styles.dotChild}></div>
        </div>
        <div style={styles.rightDiv}>
          {index % 2 !== 0 && <span style={{ ...styles.title, marginLeft: 10 }}>{entityType ? entityType : "Examen"} {index + 1}</span>}
        </div>
      </div>
      <div style={styles.date}>
        {
          !entityType &&
          espacementNonGroupe['espaceNonGroupe ' + index] &&
          espacementNonGroupe['espaceNonGroupe ' + index].length > 0 &&
          espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minInterval +
          espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minIntervalUnit + "-" +
          espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxInterval +
          espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxIntervalUnit
        }
        {
          entityType &&
          espacement['espace ' + index] &&
          espacement['espace ' + index].length > 0 &&
          espacement['espace ' + index][espacement['espace ' + index].length - 1].minInterval +
          espacement['espace ' + index][espacement['espace ' + index].length - 1].minIntervalUnit + "-" +
          espacement['espace ' + index][espacement['espace ' + index].length - 1].maxInterval +
          espacement['espace ' + index][espacement['espace ' + index].length - 1].maxIntervalUnit
        }
      </div>
    </div>
  );
};

export default TimeLineHelper;
