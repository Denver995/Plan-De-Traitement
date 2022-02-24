import {
     EuiFlexGroup,
     EuiFlexItem,
     EuiButton,
     EuiConfirmModal,
  } from '@elastic/eui';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep } from '../actions';
import { getStepByKey } from '../utils/helper';
import { STEP1 } from '../utils/constants';

const Alert = ({test}) => {
    
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

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

 

  let modal;
       if (isModalVisible) {
    modal = (
      <EuiConfirmModal
        title= {test.title}
        onCancel={closeModal}
        onConfirm={closeModal}
        cancelButtonText="Cancel"
        confirmButtonText="Confirmer"
        defaultFocusedButton="confirm"
      >
        <p> <strong> {test.contenu}</strong></p>
        
      </EuiConfirmModal>
    ); 
}


  return (
    <div>
      <EuiFlexGroup responsive={false} wrap gutterSize="xs">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={showModal}>Show confirm modal</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      {modal}
    </div>
  );
};
export default Alert;