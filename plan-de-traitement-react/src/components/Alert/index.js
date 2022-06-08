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

const Alert = ({ message, onAccept, onReject, buttonText, showInputForm, showButtonBlock }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.CommonReducer.alert);

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

  console.log('alertAlert: ', alert);
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
            <div style={styles.message} dangerouslySetInnerHTML={{ __html: message }}></div>
          )}
          {alert?.showCustomComponent && <EspacementInterExamenForm />}
        </EuiModalBody>
        {/* {showButtonBlock && ( */}
          <EuiModalFooter
            className="btn_group alert"
            style={styles.footer}
          >
            <EuiButtonEmpty style={styles.abortBtn} onClick={goBack}>
              {alert?.buttonText?.cancelText ?? "Annuler"}
            </EuiButtonEmpty>
            <EuiButton style={styles.saveBtn} onClick={submit} fill={true}>
              {alert?.buttonText?.confirmText ?? "Enregistrer"}
            </EuiButton>
          </EuiModalFooter>
        {/* )} */}
    </ModalWrapper>
  );
};

export default Alert;
