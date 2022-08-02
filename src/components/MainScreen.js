import React, { useState } from "react";
import ModelForm from "./ModelForm";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { getActiveStep, getStepByKey } from "../utils/helper";
import { STEP1, STEP2, STEP3 } from "../utils/constants";
import ButtonLight from "./Buttons/ButtonLight";

import ExamenWrapper from "./examenComponents/ExamenWrapper";
import GroupWrapper from "./examenComponents/GroupWrapper";
import RecapitulatifWrapper from "./examenComponents/recapitulatifWrapper";

import colors from "../utils/colors";

import PopUp from "./PopUp";
import { EuiButton } from "@elastic/eui";
import { setModalState } from "../redux/commons/actions";

const MainScreen = () => {
  const dispatch = useDispatch()
  const steps = useSelector((state) => state.StepReducer.steps);
  const modalState = useSelector(state => state.CommonReducer.modalState)
  const alert = useSelector((state) => state.CommonReducer.alert);
  const examsGrouped = useSelector((state) => state.ExamenReducer.examsGrouped);
  const activeGroup = useSelector((state) => state.ExamenReducer.activeGroup);
  const isRecorded = useSelector((state) => state.ModelsReducer.isRecorded);

  const closeModal = () => {
    dispatch(setModalState(true));
    window.location = "";
  };

  const showModal = () => dispatch(setModalState(true))

  let modal;
  let content;
  let activeStep = getActiveStep(steps);
  let stepData = getStepByKey(steps, activeStep);
  let isModelGroup = false;

  switch (activeStep) {
    case STEP1:
      content = <ModelForm closeModal={closeModal} />;
      break;
    case STEP2:
      stepData = getStepByKey(steps, STEP1);
      isModelGroup = stepData.data.groupe_rdv;
      content = isModelGroup ? (
        <GroupWrapper
          examsGrouped={examsGrouped}
          nbrGroupe={stepData.data.nombreOccurence}
          isModelGroup={isModelGroup}
          closeModal={closeModal}
        />
      ) : (
        <ExamenWrapper activeGroup={activeGroup} closeModal={closeModal} isModelGroup={isModelGroup} />
      );
      break;
    case STEP3:
      stepData = getStepByKey(steps, STEP2);
      isModelGroup = stepData.data.groupe_rdv;
      content = (
        <RecapitulatifWrapper
          closeModal={closeModal}
          isModelGroup={steps[0].data.groupe_rdv === 1 ? true : false}
        />
      );
      break;
    default:
      return content;
  }

  if (modalState && !alert.showAlert) {
    modal = content;
  }

  const styles = {
    nomModel: {
      fontSize: 19,
      color: colors.white,
      backgroundColor: colors.darkBlue,
      borderRadius: 7,
      height: 40,
      width: 172,
      borderColor: colors.darkBlue,
      paddingTop: 5,
      margin: "10px 0px 0px 10px",
      textDecoration: "none"
    },
  };

  return (
    <div className="modal">
      <EuiButton style={styles.nomModel} onClick={showModal}>
        Nouveau modèle
      </EuiButton>
      {alert.showAlert && (
        <Alert
          message={alert.message}
          onAccept={alert.onAccept}
          onReject={alert.onReject}
          noReject={alert.noReject}
          noAccept={alert.noAccept}
        />
      )}
      {isRecorded && <PopUp />}
      {modal}
    </div>
  );
};

export default MainScreen;
