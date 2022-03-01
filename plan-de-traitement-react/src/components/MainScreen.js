import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiSpacer
} from '@elastic/eui';
import React, { useState, useEffect } from 'react';
// import ExamenItem from './ExamenItem';
import ModelForm from './ModelForm';
import ExamenForm from './ExamenForm';
import Alert from './Alert';
import { useSelector } from 'react-redux';
import { getActiveStep } from "../utils/helper";
import { STEP1, STEP2, STEP3 } from "../utils/constants";
import ModelForm from "./ModifierExamen";
import ExamenItem from "./ExamenItem";

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const steps = useSelector((state) => state.steps);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);


  

  let modal;
  let alert = {
      title :"Supprimer le groupe",
      contenu:"Voulez vous confirmer la suppression definitive de ce groupe",
  };
  let content;
  let activeStep = getActiveStep(steps);

  switch (activeStep) {
    case STEP1:
        content = <Alert test={alert} closeModal={closeModal}/>;
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
      <EuiButton onClick={showModal}>Modifier Examen</EuiButton>
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
