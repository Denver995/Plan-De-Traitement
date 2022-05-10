import React from 'react';
import {
  EuiSpacer,
  EuiModal,
  EuiModalBody,
  EuiModalHeader
} from '@elastic/eui';

const ModalWrapper = ({ children, classContainer, closeModal, style }) => {
  return (
    <EuiModal style={{padding: 0, ...style}} onClose={closeModal} className={`${classContainer} espacement_inter_examen_EuiModalBody`} maxWidth='100%'>
        <EuiModalHeader>
        </EuiModalHeader>
        <EuiModalBody style={{padding: 0 }}>
          {children}
        </EuiModalBody>
        <EuiSpacer size="m" />
      </EuiModal>
  )
}

export default ModalWrapper;