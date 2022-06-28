import React from "react";
import styles from "./styles";

const TimeLineHelper = ({ index, entityType }) => {
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
          {index % 2 !== 0 && <span style={{...styles.title, marginLeft: 10}}>{entityType ? entityType : "Examen"} {index + 1}</span>}
        </div>
      </div>
      <div style={styles.date}>12 mars</div>
    </div>
  );
};

export default TimeLineHelper;
