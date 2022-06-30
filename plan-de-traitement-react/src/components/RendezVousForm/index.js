import React, { Fragment, useState } from "react";
import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiDatePicker,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiHorizontalRule,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import ModalWrapper from "../common/ModalWrapper";

import styles from "./style";
import colors from "../../utils/colors";

const RendezVousForm = ({ closeModal }) => {
  const [isValid, setIsValid] = useState(false);
  return (
    <ModalWrapper
      closeModal={closeModal}
      style={styles.modal}
      titleText={"Prendre un rendez-vous"}
    >
      <EuiSpacer size="m" />
      <div style={styles.header}>
        <EuiText style={{ ...styles.textHeader, marginRight: 50 }}>
          Rendez-vous
        </EuiText>
        <EuiText style={styles.textHeaderSelected}>Rendez-vous liés</EuiText>
      </div>

      <EuiHorizontalRule size="full" style={styles.horizontalRule} />

      <EuiForm style={styles.form}>
        <strong>
          <EuiText style={styles.nomModel}>Nom du modèle: </EuiText>
        </strong>
        <EuiFieldText name="nomModele" style={styles.inputModal} fullWidth />
        {isValid && (
          <Fragment>
            <EuiSpacer size="l" />
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem style={{ marginRight: 180 }}>
                <EuiText style={styles.nomModel}>Intervalle:</EuiText>
                <EuiDatePicker
                  style={styles.inputText}
                  placeholder="Date de début"
                  showIcon={false}
                  fullWidth
                />
                <div style={styles.calendarIcon}>
                  <EuiButtonIcon color={colors.blackClaire} iconType="calendar" />
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText style={{ ...styles.nomModel, visibility: "hidden" }}>
                  Intervalle:
                </EuiText>
                <EuiDatePicker
                  style={styles.inputText}
                  placeholder="Date de fin"
                  showIcon={false}
                  fullWidth
                />
                <div style={styles.calendarIcon2}>
                  <EuiButtonIcon color={colors.blackClaire} iconType="calendar" />
                </div>
              </EuiFlexItem>
            </EuiFlexGroup>
          </Fragment>
        )}
      </EuiForm>
      <EuiSpacer size="xl" />

      <EuiFlexGroup
        className="modal__form__button__container groupe-btn-modelForm"
        style={styles.footer}
      >
        <EuiButtonEmpty
          className="button_global btn-annuler-modelForm"
          style={styles.cancelButton}
        >
          Annuler
        </EuiButtonEmpty>
        <EuiButton
          style={styles.addButton}
          fill={true}
          className="button_global btn-suivant-modelForm"
          onClick={() => setIsValid(true)}
        >
          Suivant
        </EuiButton>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      <style jsx="true">
        {`
          .euiModalBody .euiFieldText,
          .euiModalBody .euiFieldNumber,
          .euiModalBody .euiSelect {
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 1px solid #dfdfdf;
            border-radius: 7px;
            opacity: 1;
            height: 40px;
          }
        `}
      </style>
    </ModalWrapper>
  );
};

export default RendezVousForm;
