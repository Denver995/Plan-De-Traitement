import {
  EuiButton, EuiButtonEmpty, EuiFieldText, EuiForm,
  EuiFormRow, EuiModalBody,
  EuiModalFooter, EuiSpacer, EuiText
} from "@elastic/eui";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ReactComponent as Pencil } from "../../assets/svgs/Groupe-460.svg";
import { useDimension } from "../../hooks/dimensions";
import { setAlert, setComponent } from "../../redux/commons/actions";
import { saveModel } from "../../redux/models/actions";
import colors from "../../utils/colors";
import ModalWrapper from "../common/ModalWrapper";
import EspacementInterExamenForm from "../EspacementInterExamenForm";
import styles from "./style";


const Alert = ({
  message,
  onAccept,
  onReject,
  buttonText,
  showInputForm,
  showButtonBlock,
  isConfirmation,
  modelData,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.CommonReducer.alert);
  const { innerHeight, innerWidth } = useDimension();

  useEffect(() => { }, [buttonText]);

  const submit = () => {
    if (onAccept) {
      onAccept();
      dispatch(setAlert({ showAlert: false, message: "" }));
      if (isConfirmation || alert.isConfirmation) {
        if (alert.closeModal) alert.closeModal();
        if (closeModal) closeModal();
        dispatch(saveModel());
      }
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

  return (
    <ModalWrapper
      style={styles.modal}
      titleText={alert.title !== "" ? alert.title : "Enregistrer le modèle"}
    >
      <EuiModalBody style={styles.body}>
        {showInputForm ? (
          <EuiForm id="">
            <EuiSpacer size="m" />
            <EuiFormRow label="nom du modèle" fullWidth>
              <EuiFieldText name="nomModele" value={""} fullWidth />
            </EuiFormRow>
          </EuiForm>
        ) : isConfirmation || alert.isConfirmation ? (
          <div>
            <EuiText style={styles.textContainer}>
              Ce modèle va être enregistré sous le nom :
              <br />
              <div style={styles.textTitle}>
                {modelData.nom}
                <div
                  style={styles.pencil}
                  onClick={() => {
                    dispatch(setAlert({ showAlert: false, message: "" }));
                    dispatch(setComponent("EDITMODEL"));
                  }}
                >
                  <Pencil width={"1rem"} />
                </div>
              </div>
            </EuiText>
          </div>
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
            width: innerWidth <= 500 ? "100%" : 210,
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
            textDecoration: "none",
          }}
          onClick={submit}
          fill={true}
        >
          {alert?.buttonText?.confirmText ?? "Enregistrer"}
        </EuiButton>
      </EuiModalFooter>
      {/* )} */}
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ModelsReducer }) => ({
  modelData: ModelsReducer.modelData,
});

export default connect(mapStateToProps)(Alert);
