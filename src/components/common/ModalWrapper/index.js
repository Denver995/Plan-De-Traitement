import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
} from "@elastic/eui";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalState } from "../../../redux/commons/actions";
import colors from "../../../utils/colors";
import styles from "./styles";

const ModalWrapper = ({
  children,
  classContainer,
  closeModal,
  onCancel,
  goBack,
  style,
  className,
  titleText,
}) => {
  const dispatch = useDispatch()
  const handleClose = () => {
    // dispatch(setModalState(false))
    if (goBack) {
      try {
        goBack()
      } catch (e) { }
    } else if (onCancel) {
      try {
        onCancel()
      } catch (e) { }
    } else {
      window.location = "/"
      dispatch(setModalState(false))
    }
  };

  return (
    <div className="modal">
      <EuiModal
        style={{ padding: 0, ...style }}
        onClose={closeModal}
        className={`${classContainer} espacement_inter_examen_EuiModalBody baseModalWrapper ${className}`}
        maxWidth={`${style.width}px`}
      >
        <div
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            fontSize: 50,
            color: colors.primaryDark,
            cursor: "pointer",
          }}
        >
          &times;
        </div>
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
