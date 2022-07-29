import {
  EuiButton, EuiFieldNumber, EuiFlexGroup, EuiFlexItem, EuiForm, EuiSelect,
  EuiSpacer, useEuiTheme, useGeneratedHtmlId
} from "@elastic/eui";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setError } from "../../redux/commons/actions";
import { setEspacement, setEspacementNonGroupe, setEspacementSubExam } from "../../redux/examens/actions";
import GroupeLieService from "../../services/groupeLie";
import { type_espacement } from "../../utils/constants";
import { isPossibleGranularly } from "../../utils/helper";
import ModalWrapper from "../common/ModalWrapper";
import styles from "./styles";
import { fleche } from "../../assets/images/index"
import GranulariteService from "../../services/granularites";

const EspacementInterExamenForm = ({
  isModelGroup,
  closeModal,
  parentSubExamId,
  forSubExam,
  onClose,
  typeEspacement,
  initialIndex,
  initialId
}) => {
  const { euiTheme } = useEuiTheme();
  const dispatch = useDispatch();
  const [minInterval, setMinInterval] = useState();
  const [minIntervalUnit, setMinIntervalUnit] = useState("");
  const [maxInterval, setMaxInterval] = useState();
  const [maxIntervalUnit, setMaxIntervalUnit] = useState("");
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const error = useSelector((state) => state.CommonReducer.error);
  const [optionsMin, setOptionsMin] = useState([]);
  const [optionsMax, setOptionsMax] = useState([]);

  useEffect(() => {
    GranulariteService.getListeGranularite()
      .then((res) => {
        let data = [];
        res.data.data.forEach((element) => {
          data.push({ value: element.id_granularite, text: element.nom });
        });
        setMaxIntervalUnit(data.length > 0 ? data[0].value : "")
        setMinIntervalUnit(data.length > 0 ? data[0].value : "")

        setOptionsMax(data);
        setOptionsMin(data);
      });
  }, [])

  useEffect(() => {
    setIsValid(isPossibleGranularly({ minInterval, minIntervalUnit }, { maxInterval, maxIntervalUnit }))
  }, [minInterval, minIntervalUnit, maxInterval, maxIntervalUnit, isValid])

  const onChangeMinInterval = (e) => setMinInterval(e.target.value);

  const onChangeMinIntervalUnit = (e) => {
    setMinIntervalUnit(e.target.value);
  }

  const onChangeMaxInterval = (e) => setMaxInterval(e.target.value);

  const onChangeMaxIntervalUnit = (e) => setMaxIntervalUnit(e.target.value);

  const applyInterVale = (onAll = false) => {
    if (typeEspacement === type_espacement.group) {
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
    } else {
      if (!forSubExam) {
        dispatch(
          setEspacementNonGroupe({
            initialIndex,
            applyOnAll: onAll,
            minInterval: minInterval,
            minIntervalUnit: minIntervalUnit,
            maxInterval: maxInterval,
            maxIntervalUnit: maxIntervalUnit,
          })
        );
      } else {
        dispatch(
          setEspacementSubExam({
            parentSubExamId,
            initialIndex,
            applyOnAll: onAll,
            minInterval: minInterval,
            minIntervalUnit: minIntervalUnit,
            maxInterval: maxInterval,
            maxIntervalUnit: maxIntervalUnit,
          })
        );
      }

    }
    dispatch(dispatch(setAlert(false)));
  }


  const submit = () => {
    const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
    const espacementData = {
      initialIndex: initialIndex,
      initialId: initialId,
      minInterval: minInterval,
      maxInterval: maxInterval,
      isModelGroup: isModelGroup,
      minIntervalUnit: minIntervalUnit,
      maxIntervalUnit: maxIntervalUnit,
      typeAl: "espacement"
    }
    let alertMessage = ''
    if (typeEspacement == 'GROUPE')
      alertMessage = "Souhaitez-vous appliquer cette intervalle à tous les espacements inter groupes ?"
    else
      alertMessage = "Souhaitez-vous appliquer cette intervalle à tous les espacements inter examens ?"

    dispatch(
      setAlert({
        title: "Enregistrer le modèle",
        message: alertMessage,
        showAlert: true,
        buttonText: button,
        showButtonBlock: true,
        espacementData: espacementData,
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
    <ModalWrapper style={styles.modal} goBack={goBack}>
      <EuiForm style={styles.container} id={modalFormId} component="form">
        {typeEspacement === type_espacement.group ? (
          <div style={{ display: 'flex', flexDirection: "row" }}>
            <img style={{ width: 20, marginRight: "15px" }} src={fleche} alt="this is a btn" />
            <p className="label_exams" style={styles.title}>
              Espacement entre le groupe {initialIndex + 1} et le groupe{" "}
              {initialIndex + 2}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: "row" }}>
            <img style={{ width: 20, marginRight: "15px" }} src={fleche} alt="this is a btn" />
            <p className="label_exams" style={styles.title}>
              Espacement entre l'examen {initialIndex + 1} et l'examen{" "}
              {initialIndex + 2}
            </p>
          </div>
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
                  options={optionsMin}
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
                  value={maxIntervalUnit}
                  style={styles.select}
                  onChange={(e) => onChangeMaxIntervalUnit(e)}
                  options={optionsMax}
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
            type="button"
            form={modalFormId}
            onClick={submit}
            style={
              !isValid
                ? styles.submitDeactivated
                : styles.submit
            }
            disabled={!isValid}
            css={{ backgroundColor: euiTheme.colors.disabled }}
            className="inter-add"
          >
            <p style={styles.ajouter}>
              {loading ?
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress style={{ marginRight: '5px', color: 'white', width: '25px', height: '25px' }} />
                  Suivant
                </Box>
                : <>Valider</>}
            </p>
          </EuiButton>
        </div>
        {/* <EuiSpacer size="xl" /> */}
        {errorMessage && (
          <>
            <EuiSpacer size="xl" />
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          </>
        )}
      </EuiForm>
    </ModalWrapper>
  );
};

export default EspacementInterExamenForm;
