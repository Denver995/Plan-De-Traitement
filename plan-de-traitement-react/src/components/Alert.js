import {
     EuiFlexGroup,
     EuiFlexItem,
     EuiButton,
     EuiConfirmModal,
     EuiModal,
     EuiModalBody,
     EuiModalFooter,
     EuiModalHeader,
     EuiModalHeaderTitle,
     EuiCodeBlock,
     EuiSpacer,
     EuiButtonEmpty ,
  } from '@elastic/eui';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep } from '../actions';
import { getStepByKey } from '../utils/helper';
import { STEP1 } from '../utils/constants';

const Alert = ({details}) => {
    
     const dispatch = useDispatch();
     const steps = useSelector(state => state.steps);
     const [isGroup] = useState(false);
     const [isFirstLoad, setIsFirstLoad] = useState(true);
     const [nomModele] = useState("");
     const [nbOccurence] = useState("");
     const [periode] = useState();
     // const [reload, setReload] = useState(false);
     // const [groupeRdv, setGroupRdv] = useState();
     let step = getStepByKey(steps, STEP1);

 const closeModal = () => setIsModalVisible(false);

     useEffect(() => {
          if(isFirstLoad){
               const data = {
                    nomModele: nomModele,
                    nbOccurence: nbOccurence,
                    isGroup: isGroup,
                    periode: periode
               }
               step.data = data;
               dispatch(updateStep(step));
               setIsFirstLoad(false);
          }
     }, [isFirstLoad, steps]);


  const [isModalVisible, setIsModalVisible] = useState(false);
   const showModal = () => setIsModalVisible(true);
    let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} className='modelFormContainer'>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>{details.title}</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <p className='p_alert_txt'> <strong>{details.contenu}</strong></p>
        </EuiModalBody>
        <EuiSpacer size="m" />
        <EuiModalFooter className='btn_group alert' style={{justifyContent: "center"}}>
          <EuiButtonEmpty  onClick={closeModal} fill  className="button_cancel_small">
            Annuler
          </EuiButtonEmpty >
          <EuiButton onClick={closeModal} fill className="button_add">
            Confirmer
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  return (
    <div>
      <EuiButton onClick={showModal}>Show modal</EuiButton>
      {modal}
    </div>
  );
};

export default Alert;



