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
  EuiSelect,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import ModalWrapper from "../../common/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";
import colors from "../../../utils/colors";
import { typeRendezVous, STEP1, STEP2 } from "../../../utils/constants";
import { createAppointment } from "../../../redux/appointments/action";
import {
  addExam,
  addExamGrouped,
  addExamOnAllGroups,
  CreateEspacementSubExam,
  createGroups,
  createExamGroup,
  CreateEspacement,
} from "../../../redux/examens/actions";
import { setModelData } from "../../../redux/models/actions";
import {
  addStep,
  updateStep,
  desactivateStep,
} from "../../../redux/steps/actions";
import { getStepByKey, createStep } from "../../../utils/helper";
import moment from "moment";
import { rdvData } from "../../../utils/defaultData";

import { ReactComponent as CalendarIcon } from "../../../assets/svgs/Groupe 2.svg";

const RendezVousForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const [isValid, setIsValid] = useState(false);
  const [idModele, setIdModel] = useState(1);
  const [typeRdv, setTypeRdv] = useState(typeRendezVous.simple);
  const [dateDebut, setDateDebut] = useState(moment());
  const [dateFin, setDateFin] = useState(moment());

  const onClickNext = () => {
    let currentSstep = getStepByKey(steps, STEP1);
    const payload = {
      nom: "test",
      id_modele: idModele,
      model: {
        nom: "test",
      },
      nb_occurence: 5,
      type: typeRdv,
      dateDebut: dateDebut,
      dateFin: dateFin,
      groupe_rdv: typeRdv === typeRendezVous.groupe ? true : false,
    };
    dispatch(createAppointment(payload));
    currentSstep.data = payload;
    dispatch(updateStep(currentSstep));
    createExamForRecap();
    let nextStep = createStep(STEP2);
    nextStep.previousStep = currentSstep;
    dispatch(desactivateStep(STEP1));
    dispatch(addStep(nextStep));
    dispatch(setModelData(payload));
  };

  const createExamForRecap = () => {
    if (typeRdv === typeRendezVous.simple) {
      rdvData.exams.forEach((payload) => {
        dispatch(addExam({ exam: payload }));
      });
    } else {
      dispatch(createGroups(5));
      dispatch(CreateEspacement(4));
      rdvData.exams.forEach((payload, index) => {
        dispatch(addExam({ exam: payload }));
        dispatch(addExamOnAllGroups({ exam: payload, index: index }));
      });
    }
  };

  const onSelectTypeRdv = (type) => setTypeRdv(type);

  const onChangeDateDebut = (date) => setDateDebut(date);

  const onChangeDateFin = (date) => setDateFin(date);

  const textHeaderNotSelected = { ...styles.textHeader, marginRight: 50 };
  return (
    <ModalWrapper
      closeModal={closeModal}
      style={styles.modal}
      titleText={"Prendre un rendez-vous"}
    >
      <EuiSpacer size="m" />
      <div style={styles.header}>
        <EuiText
          style={
            typeRdv.includes(typeRendezVous.simple)
              ? styles.textHeaderSelected
              : textHeaderNotSelected
          }
          onClick={() => onSelectTypeRdv(typeRendezVous.simple)}
        >
          Rendez-vous
        </EuiText>
        <EuiText
          style={
            typeRdv.includes(typeRendezVous.groupe)
              ? styles.textHeaderSelected
              : textHeaderNotSelected
          }
          onClick={() => onSelectTypeRdv(typeRendezVous.groupe)}
        >
          Rendez-vous liés
        </EuiText>
      </div>

      <EuiHorizontalRule size="full" style={styles.horizontalRule} />

      <EuiForm style={styles.form}>
        <strong>
          <EuiText style={styles.nomModel}>Nom du modèle: </EuiText>
        </strong>
        <EuiSelect name="nomModele" style={styles.inputModal} fullWidth />
        {isValid && typeRdv.includes(typeRendezVous.groupe) && (
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
                  selected={dateDebut}
                  onChange={onChangeDateDebut}
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
                  fullWidth
                  selected={dateFin}
                  onChange={onChangeDateFin}
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
        >
          Annuler
        </EuiButtonEmpty>
        {(isValid || typeRdv.includes(typeRendezVous.simple)) && (
          <EuiButton
            style={styles.addButton}
            fill={true}
            className="button_global btn-suivant-modelForm"
            onClick={onClickNext}
          >
            Suivant
          </EuiButton>
        )}
        {!isValid && typeRdv.includes(typeRendezVous.groupe) && (
          <EuiButton
            style={styles.addButton}
            fill={true}
            className="button_global btn-suivant-modelForm"
            onClick={() => setIsValid(true)}
          >
            Suivant
          </EuiButton>
        )}
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
