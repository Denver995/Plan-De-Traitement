import React from 'react';
import {
  EuiSpacer,
  EuiModal,
  EuiModalBody,
  EuiModalHeader
} from '@elastic/eui';

import colors from '../../../utils/colors';

const ModalWrapper = ({ children, classContainer, closeModal, style }) => {

  const handleClose = () => {
    console.log('closed clicked')
    closeModal();
  }
  return (
    <EuiModal style={{padding: 0, ...style}} onClose={closeModal} className={`${classContainer} espacement_inter_examen_EuiModalBody`} maxWidth='100%'>
      <div onClick={handleClose} style={{position: 'absolute', top: 0, right: 10, fontSize: 50, color: colors.primaryDark}}>&times;</div>
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