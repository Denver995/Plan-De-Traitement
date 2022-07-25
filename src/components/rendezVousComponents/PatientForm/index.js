import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSelect,
  EuiButton,
  EuiSpacer,
  EuiFieldText,
  EuiIcon,
  EuiTextArea,
  EuiToolTip,
  EuiComboBox,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiText,
} from "@elastic/eui";
import "./PatientForm.css";
import React from "react";
import ModalWrapper from "../../common/ModalWrapper";

import styles from "./style";

const PatientForm = () => {
  return (
    <ModalWrapper style={styles.modal}>
      <div style={styles.container}>
        <EuiSpacer size="s" />

        <EuiText style={styles.label}>Modèle : </EuiText>
        <EuiText style={styles.nomModel}>Xxxxxxxxxx xxxxxxxxxxx XXXX</EuiText>

        <EuiHorizontalRule style={styles.horinzontalRule} />

        <EuiFlexGroup style={styles.patientContainer}>
          <EuiIcon
            grow={1}
            type="user"
            size="l"
            color="primary"
            className="user"
          />
          <EuiText style={styles.infoPatient}>Informations du patient</EuiText>
        </EuiFlexGroup>
        <EuiSpacer size="l" />

        {/* Body here */}

        <EuiSpacer size="m" />

        <EuiFlexGroup style={styles.btnContainer}>
          <EuiButtonEmpty style={styles.backBtn}>Retour</EuiButtonEmpty>
          <EuiButton
            // form={closeModal}
            style={styles.validateBtn}
            fill={true}
          >
            Valider
          </EuiButton>
        </EuiFlexGroup>
        <EuiSpacer size="l" />
      </div>
    </ModalWrapper>
  );
};
export default PatientForm;
