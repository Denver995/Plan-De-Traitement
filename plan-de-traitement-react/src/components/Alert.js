import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
  EuiButtonEmpty,
  EuiForm, EuiFormRow, EuiFieldText
} from '@elastic/eui';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../actions';
import EspacementInterExamenForm from './EspacementInterExamenForm';

const Alert = ({ message, onAccept, onReject, buttonText, showInputForm }) => {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert)
  
  useEffect(() => {
  }, [buttonText]);

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
    <>
      <EuiModal onClose={goBack} className='modelFormContainer'>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>{alert.title ? alert.title : ""}</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          {showInputForm ? 
            <EuiForm id=""><EuiSpacer size="m" /><EuiFormRow label="nom du modèle" fullWidth><EuiFieldText name="nomModele" value={""} fullWidth/></EuiFormRow></EuiForm>:
            <div dangerouslySetInnerHTML={{__html: message}}></div>
          }
          {alert.showCustomComponent && <EspacementInterExamenForm />}
        </EuiModalBody>
        <EuiSpacer size="m" />
        {alert.showButtonBlock &&
          <EuiModalFooter className='btn_group alert' style={{justifyContent: "center"}}>
            <EuiButtonEmpty  onClick={goBack} fill  className="button_cancel_small">
              {alert.buttonText ? alert.buttonText.cancelText : "Annuler"}
            </EuiButtonEmpty >
            <EuiButton onClick={submit} fill className="button_add">
              {alert.buttonText ? alert.buttonText.confirmText : "Confirmer"}
            </EuiButton>
          </EuiModalFooter> 
        }
      </EuiModal>
    </>
  );
};

export default Alert;



