import {
  useEuiTheme,
  EuiFieldNumber,
  EuiComboBox,
  EuiFlexItem,
  EuiSelect,
  EuiSpacer,
} from "@elastic/eui";
import {
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiFlexGroup,
  useGeneratedHtmlId,
} from "@elastic/eui";
// import '../EspacementInterExamenForm.css';
import { useDispatch } from "react-redux";
import { addExamOnAllGroups } from "../../redux/examens/actions";
import { setAlert } from "../../redux/commons/actions";
import ModalWrapper from "../common/ModalWrapper";
import styles from "./styles";
import { useState } from "react";

const EspacementInterExamenForm = ({ closeModal, onClose }) => {
  const [minDelai, setMinDelai] = useState();
  const [maxDelai, setMaxDelai] = useState();
  const { euiTheme } = useEuiTheme();
  const dispatch = useDispatch();
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });

  const handleMinChange = (e) => setMinDelai(e.target.value);
  const handleMaxChange = (e) => setMaxDelai(e.target.value);

  const submit = () => {
    const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
    const alertMessage =
      '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Souhaitez-vous appliquer cette intervalle à tous les espacement inter examens ?</EuiText>';
    dispatch(
      setAlert({
        title: "Enregistrer le modèle",
        message: alertMessage,
        showAlert: true,
        buttonText: button,
        showButtonBlock: true,
        onAccept: () => {
          dispatch(dispatch(setAlert(false)));
        },
        onReject: () => {
          dispatch(dispatch(setAlert(false)));
        },
      })
    );
    // dispatch(addExamOnAllGroups());
    return;
  };

  const goBack = () => {
    dispatch(setAlert({ showAlert: false, message: "" }));
    onClose(true);
    return;
  };

  return (
    <ModalWrapper style={styles.modal}>
      <EuiForm style={styles.container} id={modalFormId} component="form">
        <p className="label_exams" style={styles.title}>
          <span></span>Espacement entre l'examen 00 et l'examen 00
        </p>
        <p className="inter" style={styles.secondTitle}>
          Espacement inter examens*:
        </p>
        <div className="position">
          <EuiFlexGroup style={styles.bodyContainer}>
            <EuiFlexItem>
              <div>
                <span style={styles.label}>Minimum:</span>
                <EuiFieldNumber
                  fullWidth
                  value={minDelai}
                  onChange={handleMinChange}
                  style={styles.number}
                  placeholder=""
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
              <div style={styles.inputContainer}>
                <span style={styles.hidden}>Minimum</span>
                <EuiSelect
                  fullWidth
                  style={styles.select}
                  options={[
                    {
                      value: "Jour",
                      text: "Jour",
                    },
                    {
                      value: "Minute",
                      text: "Minute",
                    },
                    {
                      value: "Heure",
                      text: "Heure",
                    },
                    {
                      value: "Semaine",
                      text: "Semaine",
                    },
                  ]}
                  isClearable={true}
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
              <div>
                <span style={styles.label}>Maximum</span>
                <EuiFieldNumber
                  fullWidth
                  style={styles.number}
                  value={maxDelai}
                  onChange={handleMaxChange}
                  placeholder=""
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
              <div>
                <span style={styles.hidden}></span>
                <EuiSelect
                  fullWidth
                  style={styles.select}
                  options={[
                    {
                      value: "Jour",
                      text: "Jour",
                    },
                    {
                      value: "Minute",
                      text: "Minute",
                    },
                    {
                      value: "Heure",
                      text: "Heure",
                    },
                    {
                      value: "Semaine",
                      text: "Semaine",
                    },
                  ]}
                  isClearable={true}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
        <EuiSpacer size="s" />
        <EuiSpacer size="xxl" />
        <div style={styles.btnContainer} className="exam-inter-footer">
          <EuiButton
            onClick={goBack}
            style={styles.cancel}
            className="inter-cancel"
          >
            <p style={styles.annuler}>Annuler</p>
          </EuiButton>
          <EuiButton
            type="submit"
            form={modalFormId}
            onClick={submit}
            style={
              minDelai === undefined ||
              maxDelai === undefined ||
              minDelai === "" ||
              maxDelai === ""
                ? styles.submitDeactivated
                : styles.submit
            }
            css={{ backgroundColor: euiTheme.colors.disabled }}
            className="inter-add"
            disabled={minDelai === undefined || maxDelai === undefined}
          >
            <p style={styles.ajouter}>Ajouter</p>
          </EuiButton>
        </div>
      </EuiForm>
    </ModalWrapper>
  );
};

export default EspacementInterExamenForm;
