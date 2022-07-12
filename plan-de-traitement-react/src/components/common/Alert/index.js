import {
  EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer
} from '@elastic/eui';
import React from 'react';

const Alert = ({ actions, message, title = 'Alert Title' }) => {
  return (
    <>
      <EuiModal onClose={() => { }} className='modelFormContainer'>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>{title}</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiForm id="">
            <EuiSpacer size="m" />
            <EuiFormRow label="nom du modèle" fullWidth>
              <EuiFieldText name="nomModele" value={""} fullWidth />
            </EuiFormRow>
          </EuiForm>:
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
        </EuiModalBody>
        <EuiSpacer size="m" />
        <EuiModalFooter className='btn_group alert' style={{ justifyContent: "center" }}>

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