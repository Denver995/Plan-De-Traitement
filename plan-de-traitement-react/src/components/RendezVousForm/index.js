import React, { Fragment, useState } from "react";
import {
  EuiButton,
  EuiButtonEmpty,
  EuiDatePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiHorizontalRule,
  EuiSelect,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";

import ModalWrapper from "../common/ModalWrapper";

import styles from "./style";
import { fakeModel } from "../../utils/defaultData";
import { ReactComponent as CalendarIcon } from "../../assets/svgs/Groupe 2.svg";

const RendezVousForm = ({ closeModal, isEdited }) => {
  const [isValid, setIsValid] = useState(false);
  const [model, setModel] = useState(fakeModel[0].text);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleChange = (e) => setModel(e.target.value);

  const changeStartDate = (date) => setStartDate(date);

  const changeEndDate = (date) => setEndDate(date);

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
        <EuiSelect
          options={fakeModel}
          value={model}
          onChange={handleChange}
          name="nomModele"
          style={styles.inputModal}
          fullWidth
        />
        {isValid && !isEdited && (
          <Fragment>
            <EuiSpacer size="l" />
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem style={{ marginRight: 180 }}>
                <EuiText style={styles.nomModel}>Intervalle:</EuiText>
                <EuiDatePicker
                  style={styles.inputText}
                  placeholder="Date de début"
                  showIcon={false}
                  selected={startDate}
                  onChange={changeStartDate}
                  dateFormat="DD-MM-YYYY"
                  fullWidth
                />
                <div className="rdv-calendarIcon" style={styles.calendarIcon}>
                  <CalendarIcon width={"1rem"} />
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
                  selected={endDate}
                  onChange={changeEndDate}
                  dateFormat="DD-MM-YYYY"
                  fullWidth
                />
                <div className="rdv-calendarIcon2" style={styles.calendarIcon2}>
                  <CalendarIcon width={"1rem"} />
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
          onClick={closeModal}
        >
          Annuler
        </EuiButtonEmpty>
        <EuiButton
          style={model === "" ? styles.addButton2 : styles.addButton}
          disabled={model === ""}
          fill={true}
          className="button_global btn-suivant-modelForm"
          onClick={() => setIsValid(true)}
        >
          {isEdited ? "Enregistrer" : "Suivant"}
        </EuiButton>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      <style jsx="true">
        {`
          .euiModalBody .euiFieldText,
          .euiModalBody .euiFieldNumber,
          .euiModalBody .euiSelect {
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 1px solid #b7b7b7;
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
