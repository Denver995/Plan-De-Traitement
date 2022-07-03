import React, { useState } from "react";
import Alert from "../../Alert";
import { useSelector } from "react-redux";
import { getActiveStep, getStepByKey } from "../../../utils/helper";
import { STEP1, STEP2, STEP3 } from "../../../utils/constants";
import ButtonLight from "../../Buttons/ButtonLight";

import ExamenWrapper from "../../examenComponents/ExamenWrapper";
import GroupWrapper from "../../examenComponents/GroupWrapper";
import RecapitulatifWrapper from "../../examenComponents/recapitulatifWrapper";
import RendezVousForm from "../RendezVousForm";
import PopUp from "../../PopUp";

const RendezVousScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const steps = useSelector((state) => state.StepReducer.steps);
  const alert = useSelector((state) => state.CommonReducer.alert);
  const examsGrouped = useSelector((state) => state.ExamenReducer.examsGrouped);
  const activeGroup = useSelector((state) => state.ExamenReducer.activeGroup);
  const isRecorded = useSelector((state) => state.ModelsReducer.isRecorded);

  const closeModal = () => {
    setIsModalVisible(false);
    window.location = "";
  }
  const showModal = () => setIsModalVisible(true);

  let modal;
  let content;
  let activeStep = getActiveStep(steps);
  let stepData = getStepByKey(steps, activeStep);
  let isModelGroup = false;

  switch (activeStep) {
    case STEP1:
      content = <RendezVousForm closeModal={closeModal} />;
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
        <ExamenWrapper activeGroup={activeGroup} isModelGroup={isModelGroup} />
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

  if (isModalVisible && !alert.showAlert) {
    modal = content;
  }
  return (
    <div className="modal">
      <ButtonLight text={"Prendre Rendez-vous"} onClick={showModal} />
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

export default RendezVousScreen;
