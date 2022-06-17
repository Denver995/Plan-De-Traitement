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

const EspacementInterExamenForm = ({ closeModal, onClose }) => {
  const { euiTheme } = useEuiTheme();
  const dispatch = useDispatch();
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });

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
            style={styles.submit}
            css={{ backgroundColor: euiTheme.colors.disabled }}
            className="inter-add"
          >
            <p style={styles.ajouter}>Ajouter</p>
          </EuiButton>
        </div>
      </EuiForm>
    </ModalWrapper>
  );
};

export default EspacementInterExamenForm;
