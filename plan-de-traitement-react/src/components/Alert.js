import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
  EuiButtonEmpty ,
} from '@elastic/eui';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../actions';

const Alert = ({ message, title, onAccept, onReject, noAccept, noReject }) => {
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);

  const submit = () => {
    if(onAccept){
      onAccept();
      dispatch(setAlert({showAlert:false,message:""}))
      return;    
    }
    dispatch(setAlert({showAlert:false,message:""}))
    return;
  };

  const goBack = () => {
    if(onReject){
      onReject();
      return;
    }
    dispatch(setAlert({showAlert:false,message:""}));
    return;
  }

  return (
    <EuiModal onClose={goBack} className='modelFormContainer'>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>{title}</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody style={{justifyContent: "center"}}>
          <div dangerouslySetInnerHTML={{__html: message}}></div>
        </EuiModalBody>
        <EuiSpacer size="m" />
        <EuiModalFooter className='btn_group alert' style={{justifyContent: "center"}}>
          <EuiButtonEmpty  onClick={goBack} fill  className="button_cancel_small">
            Annuler
          </EuiButtonEmpty >
          <EuiButton onClick={submit} fill className="button_add">
            Confirmer
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
  );
};

export default Alert;



