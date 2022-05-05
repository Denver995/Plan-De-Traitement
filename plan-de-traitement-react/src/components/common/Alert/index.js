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

const Alert = ({ actions, message, title='Alert Title'}) => {
  return (
    <>
    <EuiModal onClose={() => {console.log('close modal')}} className='modelFormContainer'>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <h1>{title}</h1>
        </EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
          <EuiForm id=""><EuiSpacer size="m" /><EuiFormRow label="nom du modèle" fullWidth><EuiFieldText name="nomModele" value={""} fullWidth/></EuiFormRow></EuiForm>:
          <div dangerouslySetInnerHTML={{__html: message}}></div>
        {/* {alert.showCustomComponent && <EspacementInterExamenForm />} */}
      </EuiModalBody>
      <EuiSpacer size="m" />
        <EuiModalFooter className='btn_group alert' style={{justifyContent: "center"}}>
          {/* <EuiButtonEmpty  onClick={goBack} className="button_cancel_small">
            {alert.buttonText ? alert.buttonText.cancelText : "Annuler"}
          </EuiButtonEmpty> */}
          {actions.map((action, index) => (
          <EuiButton key={index} onClick={action.onClick} fill={true} className="button_add">
            {alert.buttonText ? alert.buttonText.confirmText : "Confirmer"}
          </EuiButton>
          ))
          }
        </EuiModalFooter>
    </EuiModal>
  </>
  );
};

export default Alert;