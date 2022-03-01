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
import ExamenItem from "./ExamenItem";

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const steps = useSelector((state) => state.steps);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);


  

  let modal;
  let alert = {
      title :"Supprimer le groupe",
      contenu:"Voulez vous confirmer la suppression definitive de ce groupe?",
  };
  let content;
  let activeStep = getActiveStep(steps);

  switch (activeStep) {
    case STEP1:
        content = <Alert test={alert} closeModal={closeModal}/>;
      break;

    case STEP2:
      content = <Alert test={alert} closeModal={closeModal}/>;
      break;

    case STEP3:
      content = <ExamenItem />;
      break;

    default:
      content = <Alert test={alert} closeModal={closeModal}/>;
      break;
  }

  useEffect(() => {}, [steps]);


  return (
    <div>
      <EuiButton onClick={showModal}>Modifier Examen</EuiButton>
      <Alert test={alert} closeModal={closeModal}/>
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
