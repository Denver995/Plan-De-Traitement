import React from "react";
import {
  EuiSpacer,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from "@elastic/eui";

const ModalWrapper = ({
  children,
  classContainer,
  closeModal,
  style,
  titleText,
}) => {
  return (
    <EuiModal
      style={{ padding: 0, ...style }}
      onClose={closeModal}
      className={`${classContainer} espacement_inter_examen_EuiModalBody`}
      maxWidth="100%"
    >
      <EuiModalHeader>
        {titleText && (
          <EuiModalHeaderTitle>
            <h1>{titleText}</h1>
          </EuiModalHeaderTitle>
        )}
      </EuiModalHeader>
      <EuiModalBody style={{ padding: 0 }}>{children}</EuiModalBody>
      <EuiSpacer size="m" />
    </EuiModal>
  );
};

export default ModalWrapper;
