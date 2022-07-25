import React, { useState } from "react";
import Alert from "../../Alert";
import { useSelector } from "react-redux";
import { getActiveStep } from "../../../utils/helper";
import { STEP1, STEP2 } from "../../../utils/constants";
import ButtonLight from "../../Buttons/ButtonLight";
import RecapitulatifWrapper from "../RecapitulatifWrapper";
import RendezVousForm from "../RendezVousForm";
import PopUp from "../../PopUp";

const RendezVousScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const steps = useSelector((state) => state.StepReducer.steps);
  const alert = useSelector((state) => state.CommonReducer.alert);
  const isRecorded = useSelector((state) => state.ModelsReducer.isRecorded);

  const closeModal = () => {
    setIsModalVisible(false);
    window.location = "";
  }
  const showModal = () => setIsModalVisible(true);

  let modal;
  let content;
  let activeStep = getActiveStep(steps);

  switch (activeStep) {
    case STEP1:
      content = <RendezVousForm closeModal={closeModal} />;
      break;
    case STEP2:
      content = (
        <RecapitulatifWrapper
          closeModal={closeModal}
          isModelGroup={steps[0].data.groupe_rdv}
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
