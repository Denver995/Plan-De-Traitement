import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
  EuiButtonEmpty,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
} from "@elastic/eui";
import React, { useEffect } from "react";
import { ReactComponent as Pencil } from "../../assets/svgs/Groupe-460.svg";

import { setAlert } from "../../redux/commons/actions";
import { useDispatch, useSelector } from "react-redux";
import EspacementInterExamenForm from "../EspacementInterExamenForm";
import ModalWrapper from "../common/ModalWrapper";
import styles from "./style";
import colors from "../../utils/colors";
import { useDimension } from "../../hooks/dimensions";

const Alert = ({
  message,
  onAccept,
  onReject,
  buttonText,
  showInputForm,
  showButtonBlock,
}) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.CommonReducer.alert);
  const { innerHeight, innerWidth } = useDimension();
  console.log("dimensions: ", { innerHeight, innerWidth });

  useEffect(() => {}, [buttonText]);

  const submit = () => {
    if (onAccept) {
      onAccept();
      dispatch(setAlert({ showAlert: false, message: "" }));
      return;
    }
    dispatch(setAlert({ showAlert: false, message: "" }));
    return;
  };

  const goBack = () => {
    if (onReject) {
      onReject();
      return;
    }
    dispatch(setAlert({ showAlert: false, message: "" }));
    return;
  };

  console.log("alertAlert: ", alert);
  return (
    <ModalWrapper style={styles.modal} titleText={alert.title}>
      <EuiModalBody style={styles.body}>
        {showInputForm ? (
          <EuiForm id="">
            <EuiSpacer size="m" />
            <EuiFormRow label="nom du modèle" fullWidth>
              <EuiFieldText name="nomModele" value={""} fullWidth />
            </EuiFormRow>
          </EuiForm>
        ) : (
          <div
            style={styles.message}
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        )}
        {alert?.showCustomComponent && <EspacementInterExamenForm />}
      </EuiModalBody>
      {/* {showButtonBlock && ( */}
      <EuiModalFooter
        className="btn_group alert"
        style={{
          ...styles.footer,
          flexDirection: innerWidth <= 500 ? "column" : "row",
        }}
      >
        <EuiButtonEmpty
          style={{
            ...styles.abortBtn,
            fontSize: innerWidth <= 500 ? 20 : 25,
            padding: innerWidth <= 500 ? "5px" : "",
            width: innerWidth <= 500 ? "100%" : "210px",
            marginBottom: innerWidth <= 500 ? "20px" : "",
          }}
          onClick={goBack}
        >
          {alert?.buttonText?.cancelText ?? "Annuler"}
        </EuiButtonEmpty>
        <EuiButton
          style={{
            ...styles.btn,
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            fontSize: innerWidth <= 500 ? 20 : 25,
            width: innerWidth <= 500 ? "100%" : "210px",
          }}
          onClick={submit}
          fill={true}
        >
          {alert?.buttonText?.confirmText ?? "Confirmer"}
        </EuiButton>
      </EuiModalFooter>
      {/* )} */}
    </ModalWrapper>
  );
};

export default Alert;
