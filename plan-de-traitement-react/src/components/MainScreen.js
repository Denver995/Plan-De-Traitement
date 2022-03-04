import {
  EuiButton,
  EuiSpacer,
  EuiModal,
  EuiModalBody,
  EuiModalHeader
} from '@elastic/eui';
import React, { useState, useEffect } from 'react';
import ModelForm from './ModelForm';
import ExamenForm from './ExamenForm';    // Valentin    -->> composant: EspacementInterExamenForm (1)
import { useSelector } from 'react-redux';
import { getActiveStep } from "../utils/helper";
import { STEP1, STEP2, STEP3 } from '../utils/constants';
import RecapitulatifDesExamens from './RecapitulatifDesExamens';

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
        content = <RecapitulatifDesExamens couleur = 'pink' closeModal={closeModal} date = '12 mars' position ={'left'} />;
      break;
    
    case STEP2:
        content = <ExamenForm />;
      break;
    
    case STEP3:
        content = <ExamenForm />;
      break;  
  }

  useEffect(() => {
  }, [steps])

  if (isModalVisible) {
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
      {modal}
    </div>
  );
};

export default MainScreen;