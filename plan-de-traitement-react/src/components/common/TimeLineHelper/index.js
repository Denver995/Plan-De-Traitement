import React from "react";
import styles from "./styles";

const TimeLineHelper = ({ index }) => {
  return (
    <div>
      <div style={styles.titleWrapper}>
        <div style={styles.leftDiv}>
          {index % 2 === 0 && <span style={styles.title}>some text</span>}
        </div>
        <div style={styles.dotContainer}>
          <div style={styles.dotChild}></div>
        </div>
        <div style={styles.rightDiv}>
          {index % 2 !== 0 && <span style={{...styles.title, marginLeft: 10}}>some text</span>}
        </div>
      </div>
      <div style={styles.date}>12 mars</div>
    </div>
  );
};

export default TimeLineHelper;
