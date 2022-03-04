import {
  EuiButton,
  EuiSpacer,
  EuiModal,
  EuiModalBody,
  EuiModalHeader
} from '@elastic/eui';
import React, { useState, useEffect } from 'react';
import ModelForm from './ModelForm';
import ExamenForm from './ExamenForm';
import ModifierExamen from './ModifierExamen';
import Alert from './Alert';
import { useSelector } from 'react-redux';
import { getActiveStep } from "../utils/helper";
import { STEP1, STEP2, STEP3 } from '../utils/constants';

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const steps = useSelector(state => state.steps);
  const alert = useSelector(state => state.alert);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  let modal;
  let content;
  let activeStep = getActiveStep(steps);

  switch (activeStep) {
    case STEP1:
        content = <ModelForm closeModal={closeModal} />;
      break;

    case STEP2:
        content = <ExamenForm />;
      break;
    
    case STEP3:
        content = <ModifierExamen />;
      break;  
  }

  useEffect(() => {
  }, [steps, alert])

  if (isModalVisible && !alert.showAlert) {
    modal = (
      <EuiModal onClose={closeModal} className='modelFormContainer espacement_inter_examen_EuiModalBody' maxWidth='100%'>
        <EuiModalHeader>
        </EuiModalHeader>
        <EuiModalBody>
          {content}
        </EuiModalBody>
        <EuiSpacer size="m" />         
      </EuiModal>
    ); 
  }
  return (
    <div>
      <EuiButton onClick={showModal}>Show form modal</EuiButton>
      {alert.showAlert &&
        <Alert message={alert.message} onAccept={alert.onAccept} onReject={alert.onReject} noReject={alert.noReject} noAccept={alert.noAccept}/>
      }
      {modal}
    </div>
  );
};

export default MainScreen;