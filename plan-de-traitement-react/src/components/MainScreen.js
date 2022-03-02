import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiSpacer
} from '@elastic/eui';
import React, { useState, useEffect } from 'react';
import ModifierExam from './ModifierExamen';

/*import ModelForm from './ModelForm';
import ExamenForm from './ExamenForm';*/
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
        content = <ModifierExam closeModal={closeModal}/>;
      break;
    
    case STEP2:
        content = <ModifierExam />;
      break;
    
    case STEP3:
        content = <ModifierExam />;
      break;
  
    default:
        content = <ModifierExam closeModal={closeModal}/>;
      break;
  }

  useEffect(() => {

  }, [steps])

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} className='ModifierExamen' maxWidth='100%'>
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
      <EuiButton onClick={showModal}>Show Modal</EuiButton>
      {modal}
      <style jsx={"true"}>
        {`
          .euiButton--primary.euiButton--fill {
            background: #5D9AD4 0% 0% no-repeat padding-box;
            font: normal normal normal 27px/37px Open Sans;
            letter-spacing: 0px;
            color: #FFFFFF;
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