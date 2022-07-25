import React from "react";
import { useSelector } from "react-redux";
import { getFisrtLetter } from "../../../utils/helper";
import styles from "./styles";

const TimeLineHelper = ({ index, entityType }) => {

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
        
      </div>
    </div>
  );
};

export default TimeLineHelper;
