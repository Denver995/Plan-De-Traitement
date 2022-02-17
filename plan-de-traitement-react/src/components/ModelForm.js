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
    EuiModalHeaderTitle,
    useGeneratedHtmlId,
  } from '@elastic/eui';
  import React, { useState } from 'react';
  
const ModelForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  
    const closeModal = () => setIsModalVisible(false);
  
    const showModal = () => setIsModalVisible(true);
  
    const formSample = (
      <EuiForm id={modalFormId} component="form">
        <EuiFormRow label="A text field">
          <EuiFieldText name="popfirst" />
        </EuiFormRow>
      </EuiForm>
    );
  
    let modal;
  
    if (isModalVisible) {
      modal = (
        <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              <h1>Modal title</h1>
            </EuiModalHeaderTitle>
          </EuiModalHeader>
  
          <EuiModalBody>{formSample}</EuiModalBody>
  
          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
  
            <EuiButton type="submit" form={modalFormId} onClick={closeModal} fill>
              Save
            </EuiButton>
          </EuiModalFooter>
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

export default ModelForm;