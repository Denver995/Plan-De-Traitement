import React from "react";
import {
  EuiSpacer,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from "@elastic/eui";

import colors from '../../../utils/colors';
import styles from './styles';

const ModalWrapper = ({
  children,
  classContainer,
  closeModal,
  style,
  titleText,
}) => {

  const handleClose = () => {
    console.log('closed clicked')
    closeModal();
  }

  return (
    <div className="modal">
    <EuiModal
      style={{ padding: 0, ...style }}
      onClose={closeModal}
      className={`${classContainer} espacement_inter_examen_EuiModalBody`}
      maxWidth="100%"
    >
      <div onClick={handleClose} style={{position: 'absolute', top: 0, right: 10, fontSize: 50, color: colors.primaryDark}}>&times;</div>
      <EuiModalHeader>
        {titleText && (
          <EuiModalHeaderTitle>
            <h1 style={styles.headTitle}>{titleText}</h1>
          </EuiModalHeaderTitle>
        )}
      </EuiModalHeader>
      <EuiModalBody style={{ padding: 0 }}>{children}</EuiModalBody>
      <EuiSpacer size="m" />
    </EuiModal>
    </div>
  );
};

export default ModalWrapper;
