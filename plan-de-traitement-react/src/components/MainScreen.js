import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
} from "@elastic/eui";
import React, { useState, useEffect } from "react";
import ModifierExam from "./ModifierExamen";

/*import ModelForm from './ModelForm';
import ExamenForm from './ExamenForm';*/
import { useSelector } from "react-redux";
import { getActiveStep } from "../utils/helper";
import { STEP1, STEP2, STEP3 } from "../utils/constants";
import ModelForm from "./ModifierExamen";
import ExamenItem from "./ExamenItem";
import AffichageDesGroupes from "./AffichageDesGroupes";
import InfoPatientForm from "./InfoPatientForm";

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const steps = useSelector((state) => state.steps);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  let modal;
  let content;
  let activeStep = getActiveStep(steps);

  switch (activeStep) {
    case STEP1:
      content = <AffichageDesGroupes />
      {/*<ModelForm closeModal={closeModal} />;*/}
      break;

    case STEP2:
      content = <ModifierExam />;
      break;

    case STEP3:
      content = <ExamenItem />;
      break;

    default:
      content = <ModelForm closeModal={closeModal} />;
      break;
  }

  useEffect(() => {}, [steps]);

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} className="ModifierExamen" maxWidth="100%">
        <EuiModalHeader></EuiModalHeader>
        <EuiModalBody>{content}</EuiModalBody>
      </EuiModal>
    );
  }
  return (
    <div>
      <EuiButton onClick={showModal}>Show Modal</EuiButton>
      {modal}
      <style jsx={"true"}>
        {`
          .euiButton--primary.euiButton--fill {
            background: #5d9ad4 0% 0% no-repeat padding-box;
            font: normal normal normal 27px/37px Open Sans;
            letter-spacing: 0px;
            color: #ffffff;
          }

          .modelFormContainer {
            /* left: 432px;
            top: 207px; */
            width: 1057px;
          }
        `}
      </style>
    </div>
  );
};

export default MainScreen;
