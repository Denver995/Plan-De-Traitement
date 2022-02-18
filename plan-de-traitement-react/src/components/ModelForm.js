import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiFlexGroup,
  EuiRadio,
  EuiFlexItem,
  useGeneratedHtmlId,
  EuiSpacer
} from '@elastic/eui';
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import React, { useState } from 'react';

const ModelForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);

  const formSample = (
    <EuiForm id={modalFormId}>
      <EuiSpacer size="m" />
      <EuiFormRow label="nom du model" fullWidth>
        <EuiFieldText name="popfirst" fullWidth/>
      </EuiFormRow>
      <EuiSpacer size="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <div className="">
            Grouper les rendez-vous :
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiFlexGroup style={{ maxWidth: 160 }}>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiRadio
              id={htmlIdGenerator()()}
              label="Oui"
              value="2"
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiRadio
              id={htmlIdGenerator()()}
              label="Non"
              value="1"
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]" className='modelFormContainer'>
        <EuiModalHeader>
        </EuiModalHeader>
        <EuiModalBody>{formSample}</EuiModalBody>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiModalFooter className='footer_centered' style={{justifyContent: 'center'}}>
          <EuiButtonEmpty onClick={closeModal} className="button_cancel">Annuler</EuiButtonEmpty>
          <EuiButton type="submit" form={modalFormId} onClick={closeModal} fill className="button_next">
            Suivant
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    ); 
  }
  return (
    <div>
      <EuiButton onClick={showModal}>Show form modal</EuiButton>
      {modal}
      <style jsx={"true"}>
        {`
          .euiModalHeader {
            background: #5D9AD4 0% 0% no-repeat padding-box;
            border-radius: 10px 10px 0px 0px;
            height: 89px;
            opacity: 1;
          }

          .euiModal__closeIcon {
            background-color: none;
          }
          .euiFieldText {
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 1px solid #707070;
            border-radius: 7px;
            opacity: 1;
            height: 40px;
          }  
          
          .button_cancel {
            border: 3px solid #5D9AD4;
            border-radius: 36px;
            opacity: 1;
            width: 186px;
            height: 59px;
          }

          .button_next {
            border-radius: 41px;
            opacity: 1;
            width: 187px;
            height: 59px;
            background: #5D9AD4 0% 0% no-repeat padding-box;
          }
        `}
      </style>
    </div>
  );
};

export default ModelForm;