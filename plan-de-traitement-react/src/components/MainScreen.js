import {
  EuiButton,
  EuiSpacer,
  EuiModal,
  EuiModalBody,
  EuiModalHeader
} from '@elastic/eui';
import React, { useState, useEffect } from 'react';
import ModelForm from './ModelForm';
import ExamenForm from './examenComponents/ExamenForm';
import Alert from './Alert';
import { useSelector } from 'react-redux';
import { getActiveStep, getStepByKey } from "../utils/helper";
import { STEP1, STEP2, STEP3 } from '../utils/constants';
import ButtonLight from './Buttons/ButtonLight';
import RecapitulatifDesExamens from './examenComponents/RecapitulatifDesExamens';
import GroupExamen from './examenComponents/GroupExamen';

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const steps = useSelector(state => state.steps);
  const alert = useSelector(state => state.alert);

  const closeModal = () => {
    setIsModalVisible(false);
    window.location = '';
  }
  const showModal = () => setIsModalVisible(true);

  let modal;
  let content;
  let activeStep = getActiveStep(steps);
  let stepData = getStepByKey(steps, activeStep);
  let isModelGroup;
  let classContainer = 'modelFormContainer';

  switch (activeStep) {
    case STEP1:
      content = <ModelForm closeModal={closeModal} />
      break;
    case STEP2:
      classContainer='examenFormContainer'
      stepData = getStepByKey(steps, STEP1);
      isModelGroup = stepData.data.groupe_rdv;
      content = isModelGroup ? <GroupExamen nbrGroupe={stepData.data.nombreOccurence} isModelGroup={isModelGroup}/> : 
        <ExamenForm isModelGroup={isModelGroup}/>;
      break;
    case STEP3:
      content = <RecapitulatifDesExamens closeModal={closeModal}isModelGroup={isModelGroup}/>;
      break;
      default:
      return content
  }

  useEffect(() => {
  }, [steps, alert])

  if (isModalVisible && !alert.showAlert) {
    modal = (
      <EuiModal onClose={closeModal} className={`${classContainer} espacement_inter_examen_EuiModalBody`} maxWidth='100%'>
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
      {/* <EuiButton style={{ textDecoration: 'none'}} onClick={showModal}>Show form modal</EuiButton> */}
      <ButtonLight text={'Show form modal'} onClick={showModal} />
      {alert.showAlert &&
        <Alert message={alert.message} onAccept={alert.onAccept} onReject={alert.onReject} noReject={alert.noReject} noAccept={alert.noAccept}/>
      }
      {modal}
    </div>
  );
};

export default MainScreen;