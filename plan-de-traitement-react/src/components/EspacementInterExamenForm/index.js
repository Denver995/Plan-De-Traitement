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
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setError } from "../../redux/commons/actions";
import { setEspacement, setEspacementNonGroupe, setEspacementSubExam } from "../../redux/examens/actions";
import ModalWrapper from "../common/ModalWrapper";
import { type_espacement } from "../../utils/constants";
import styles from "./styles";
import { isPossibleGranularly } from "../../utils/helper";
import GroupeLieService from "../../services/groupeLie";

const EspacementInterExamenForm = ({
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
  const [minIntervalUnit, setMinIntervalUnit] = useState("Jour");
  const [maxInterval, setMaxInterval] = useState();
  const [maxIntervalUnit, setMaxIntervalUnit] = useState("Jour");
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  console.log("typeEspacement ", typeEspacement);
  const error = useSelector((state) => state.CommonReducer.error);
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

  const handleCreateGroupeLie = () =>{
    let data = {
      id_groupe_parent: parseInt(initialId),
      id_groupe_enfant: parseInt(initialId+1),
      espacement_min: minInterval,
      espacement_max: maxInterval
    }
    setErrorMessage(false);
    setLoading(true);
    GroupeLieService.createGroupeLie(data)
    .then(response => {
      setErrorMessage(false)
      dispatch(setError(null));
      setLoading(false);
    })
    .catch(error => {
     setLoading(false)
          setErrorMessage(true)
          if(error.message == "Network Error"){
            dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
          }else{
            dispatch(setError("Une erreur est survenue, veuillez réessayer"))
          }
    })
  }

  useEffect(() => {
    setIsValid(isPossibleGranularly({minInterval, minIntervalUnit}, {maxInterval, maxIntervalUnit}))
  },[minInterval, minIntervalUnit, maxInterval, maxIntervalUnit, isValid])

  const onChangeMinInterval = (e) => setMinInterval(e.target.value);

  const onChangeMinIntervalUnit = (e) => {
    setMinIntervalUnit(e.target.value);
  }

  const onChangeMaxInterval = (e) => setMaxInterval(e.target.value);

  const onChangeMaxIntervalUnit = (e) => setMaxIntervalUnit(e.target.value);

  const applyInterVale = (onAll = false) => {
    console.log("inside applyInterVale ");
        handleCreateGroupeLie();
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
      if(!forSubExam){
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
      }else{
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
        initialId: initialId,
        minInterval: minInterval,
        maxInterval: maxInterval,
        typeAl: "espacement"
    }
    const alertMessage =
      '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Souhaitez-vous appliquer cette intervalle à tous les espacements inter examens ?</EuiText>';
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

  console.log("voici l'index qui est passé : ", initialIndex)

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
                  value={maxIntervalUnit}
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
                :<>Valider</>}
            </p>
          </EuiButton>
        </div>
        <EuiSpacer size="xl" />
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
