import {
  EuiSpacer,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
} from "@elastic/eui";
import React, { useState, useEffect } from "react";
import ModelForm from "./ModelForm";
import ExamenForm from "./examenComponents/ExamenForm";
import Alert from "./Alert";
import { useSelector } from "react-redux";
import { getActiveStep, getStepByKey } from "../utils/helper";
import { STEP1, STEP2, STEP3 } from "../utils/constants";
import ButtonLight from "./Buttons/ButtonLight";
import RecapitulatifDesExamens from "./examenComponents/RecapitulatifDesExamens";

import ExamenWrapper from "./examenComponents/ExamenWrapper";
import GroupWrapper from "./examenComponents/GroupWrapper";

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const steps = useSelector((state) => state.StepReducer.steps);
  const alert = useSelector((state) => state.CommonReducer.alert);
  const examsGrouped = useSelector((state) => state.ExamenReducer.examsGrouped);
  const activeGroup = useSelector((state) => state.ExamenReducer.activeGroup);

  console.log("alert: ", alert);

  const closeModal = () => {
    setIsModalVisible(false);
    window.location = "";
  };
  const showModal = () => setIsModalVisible(true);

  let modal;
  let content;
  let activeStep = getActiveStep(steps);
  let stepData = getStepByKey(steps, activeStep);
  let isModelGroup = false;
  let classContainer = "modelFormContainer";
  switch (activeStep) {
    case STEP1:
      content = <ModelForm closeModal={closeModal} />;
      break;
    case STEP2:
      classContainer = "examenFormContainer";
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
        <ExamenWrapper activeGroup={activeGroup} isModelGroup={isModelGroup} />
      );
      break;
    case STEP3:
      stepData = getStepByKey(steps, STEP2);
      isModelGroup = stepData.data.groupe_rdv;
      content = (
        <RecapitulatifDesExamens
          closeModal={closeModal}
          isModelGroup={steps[0].data.groupe_rdv === 1 ? true : false}
        />
      );
      break;
    default:
      return content;
  }

  // useEffect(() => {
  //   console.log('s')
  // }, [steps, alert])

  if (isModalVisible && !alert.showAlert) {
    modal = content;
  }
  return (
    <div className="modal">
      {/* <EuiButton style={{ textDecoration: 'none'}} onClick={showModal}>Show form modal</EuiButton> */}
      <ButtonLight text={"Show form modal"} onClick={showModal} />
      {alert.showAlert && (
        <Alert
          message={alert.message}
          onAccept={alert.onAccept}
          onReject={alert.onReject}
          noReject={alert.noReject}
          noAccept={alert.noAccept}
        />
      )}
      {modal}
    </div>
  );
};

export default MainScreen;
