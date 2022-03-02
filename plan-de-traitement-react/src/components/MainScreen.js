import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalHeader
} from '@elastic/eui';
import React, { useState, useEffect } from 'react';
// import ExamenItem from './ExamenItem';
import ModelForm from './ModelForm';
import ExamenForm from './ExamenForm';
import { useSelector } from 'react-redux';
import { getActiveStep } from "../utils/helper";
import { STEP1, STEP2, STEP3 } from '../utils/constants';

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const steps = useSelector(state => state.steps);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  let modal;
  let content;
  let activeStep = getActiveStep(steps);

  switch (activeStep) {
    case STEP1:
        content = <ModelForm closeModal={closeModal}/>;
      break;
    
    case STEP2:
        content = <ExamenForm />;
      break;
    
    case STEP3:
        content = <ExamenForm />;
      break;  
  
    default:
        content = <ModelForm closeModal={closeModal}/>;
      break;
  }

  useEffect(() => {
  }, [steps])

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} className='modelFormContainer' maxWidth='100%'>
        <EuiModalHeader>
        </EuiModalHeader>
        <EuiModalBody>
          {content}
        </EuiModalBody>
      </EuiModal>
    ); 
  }
  return (
    <div>
      <EuiButton onClick={showModal}>Show form modal</EuiButton>
      {modal}
    </div>
  );
};

export default MainScreen;