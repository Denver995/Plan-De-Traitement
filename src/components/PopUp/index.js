import React from "react";
import styles from "./styles";
import { EuiSpacer, EuiText } from "@elastic/eui";

import { ReactComponent as CrossIcon } from "../../assets/svgs/cross.svg";
import { ReactComponent as PauseIcon } from "../../assets/svgs/pause.svg";
import { ReactComponent as CheckIcon } from "../../assets/svgs/checkmark.svg";
import { ReactComponent as PrintIcon } from "../../assets/svgs/print.svg";
import { ReactComponent as FileIcon } from "../../assets/svgs/file-text-o.svg";
import { connect } from "react-redux";

const PopUp = ({ modelData, exams }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <PauseIcon width={"1rem"} style={styles.pause} />
        <CrossIcon width={"1rem"} />
      </div>
      <div style={styles.titleContainer}>
        <div style={styles.checkCircle}>
          <CheckIcon width={"1rem"} />
        </div>
        <EuiText style={styles.title}>Le modèle à été enregistré !</EuiText>
      </div>
      <div style={styles.bodyContainer}>
        <div style={styles.flexContainer}>
          <EuiText style={styles.label}>Modèle:</EuiText>
          <EuiText style={styles.modelName}>{modelData.nom}</EuiText>
        </div>

        <div style={styles.flexContainer}>
          <EuiText style={styles.label}>Examen:</EuiText>
          <EuiText style={styles.nbreExams}>
            {exams.length} {exams.length <= 1 ? "examen" : "examens"}
          </EuiText>
        </div>
      </div>
      <EuiSpacer size="l" />
      <div style={styles.footerContainer}>
        <FileIcon style={styles.file} />
        <PrintIcon />
      </div>
    </div>
  );
};

const mapStateToProps = ({ ExamenReducer, ModelsReducer }) => ({
  exams: ExamenReducer.exams,
  modelData: ModelsReducer.modelData,
});

export default connect(mapStateToProps)(PopUp);
