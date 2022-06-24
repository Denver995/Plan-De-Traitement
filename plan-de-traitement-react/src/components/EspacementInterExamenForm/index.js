import {
  useEuiTheme,
  EuiFieldNumber,
  EuiFlexItem,
  EuiSelect,
  EuiSpacer,
} from "@elastic/eui";
import {
  EuiButton,
  EuiForm,
  EuiFlexGroup,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/commons/actions";
import { setEspacement } from "../../redux/examens/actions";
import ModalWrapper from "../common/ModalWrapper";
import { type_espacement } from "../../utils/constants";
import styles from "./styles";

const EspacementInterExamenForm = ({
  closeModal,
  onClose,
  typeEspacement,
  initialIndex,
}) => {
  const { euiTheme } = useEuiTheme();
  const dispatch = useDispatch();
  const [minInterval, setMinInterval] = useState();
  const [minIntervalUnit, setMinIntervalUnit] = useState("Jour");
  const [maxInterval, setMaxInterval] = useState();
  const [maxIntervalUnit, setMaxIntervalUnit] = useState("Jour");
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  console.log("typeEspacement ", typeEspacement);
  const options = [
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
  ];

  const onChangeMinInterval = (e) => setMinInterval(e.target.value);

  const onChangeMinIntervalUnit = (e) => setMinIntervalUnit(e.target.value);

  const onChangeMaxInterval = (e) => setMaxInterval(e.target.value);

  const onChangeMaxIntervalUnit = (e) => setMaxIntervalUnit(e.target.value);

  const applyInterVale = (onAll = false) => {
    console.log("inside applyInterVale ");
    dispatch(
      setEspacement({
        initialIndex,
        applyOnAll: onAll,
        minInterval: minInterval,
        minIntervalUnit: minIntervalUnit,
        maxInterval: maxInterval,
        maxIntervalUnit: maxIntervalUnit,
      })
    );
    dispatch(dispatch(setAlert(false)));
  };

  const submit = () => {
    const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
    const alertMessage =
      '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Souhaitez-vous appliquer cette intervalle à tous les espacements inter examens ?</EuiText>';
    dispatch(
      setAlert({
        title: "Enregistrer le modèle",
        message: alertMessage,
        showAlert: true,
        buttonText: button,
        showButtonBlock: true,
        onAccept: () => {
          applyInterVale(true);
        },
        onReject: () => {
          applyInterVale();
        },
      })
    );
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
        {typeEspacement === type_espacement.group ? (
          <p className="label_exams" style={styles.title}>
            Espacement entre le groupe {initialIndex} et le groupe{" "}
            {initialIndex + 1}
          </p>
        ) : (
          <p className="label_exams" style={styles.title}>
            Espacement entre l'examen {initialIndex} et l'examen{" "}
            {initialIndex + 1}
          </p>
        )}

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
                  value={minInterval}
                  style={styles.number}
                  placeholder=""
                  onChange={(e) => onChangeMinInterval(e)}
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
              <div style={styles.inputContainer}>
                <span style={styles.hidden}>Minimum</span>
                <EuiSelect
                  fullWidth
                  style={styles.select}
                  options={options}
                  onChange={(e) => onChangeMinIntervalUnit(e)}
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
                  value={maxInterval}
                  onChange={onChangeMaxInterval}
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
                  onChange={(e) => onChangeMaxIntervalUnit(e)}
                  options={options}
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
              !minInterval ||
              (minInterval && minInterval < 0) ||
              !maxInterval ||
              (maxInterval && maxInterval < 0) ||
              (minInterval && maxInterval && maxInterval < minInterval)
                ? styles.submitDeactivated
                : styles.submit
            }
            disabled={
              !minInterval ||
              (minInterval && minInterval < 0) ||
              !maxInterval ||
              (maxInterval && maxInterval < 0) ||
              (minInterval && maxInterval && maxInterval < minInterval)
            }
            css={{ backgroundColor: euiTheme.colors.disabled }}
            className="inter-add"
          >
            <p style={styles.ajouter}>Valider</p>
          </EuiButton>
        </div>
      </EuiForm>
    </ModalWrapper>
  );
};

export default EspacementInterExamenForm;
