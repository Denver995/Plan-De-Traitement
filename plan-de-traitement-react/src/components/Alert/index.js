import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModalBody,
  EuiModalFooter,
  EuiSpacer,
  EuiText
} from "@elastic/eui";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ReactComponent as Pencil } from "../../assets/svgs/Groupe-460.svg";
import { useDimension } from "../../hooks/dimensions";
import { setAlert, setComponent, setError } from "../../redux/commons/actions";
import {
  addExam, addExamOnAllGroups, CreateEspacementSubExam, setShowExamForm, shareListExamGroup
} from "../../redux/examens/actions";
import { saveModel } from "../../redux/models/actions";
import examenService from '../../services/examens';
import examenLieService from '../../services/examensLie';
import GroupeLieService from "../../services/groupeLie";
import ModelService from "../../services/models";
import colors from "../../utils/colors";
import ModalWrapper from "../common/ModalWrapper";
import EspacementInterExamenForm from "../EspacementInterExamenForm";
import styles from "./style";

const Alert = ({
  message,
  onAccept,
  onReject,
  buttonText,
  userIn,
  espacementData,
  showInputForm,
  showButtonBlock,
  isConfirmation,
  modelData,
  closeModal,
  isComplete
}) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.CommonReducer.alert);
  const error = useSelector((state) => state.CommonReducer.error);
  const activeGroup = useSelector(state => state.ExamenReducer.activeGroup);
  const groupExamPayload = useSelector(state => state.ExamenReducer.groupExamPayload);
  const groupPayload = useSelector(state => state.ExamenReducer.groupPayload);
  const getAllExams = useSelector((state) => state.ExamenReducer.getAllExams);
  const { innerWidth } = useDimension();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
  }, [buttonText]);

  const handleGetExamenGroup = () => {
    examenService.getExamenByIds(parseInt(modelData.id), groupExamPayload.idGroup)
      .then(response => {
        dispatch(shareListExamGroup(response.data.data));
      })
      .catch(error => {
      })
  }

  const handleUpdateModele = () => {
    setLoading(true);
    ModelService.updateModele(modelData.id, { complet: true })
      .then((response) => {
        setLoading(false)
        dispatch(setError(null));
        onAccept();
        dispatch(setAlert({ showAlert: false, message: "" }));
        if (isConfirmation || alert.isConfirmation) {
          if (alert.closeModal) alert.closeModal();
          if (closeModal) closeModal();
          dispatch(saveModel());
        }
      })
      .catch((error) => {
        setLoading(false)
        if (error.message === "Network Error") {
          dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
        } else {
          dispatch(setError("Une erreur est survenue"))
        }
      });
  }


  const handleCreateGroupeLie = () => {
    setErrorMessage(false);
    setLoading(true);
    GroupeLieService.createGroupeLie({
      id_groupe_parent: parseInt(alert?.espacementData?.initialId),
      id_groupe_enfant: parseInt(alert?.espacementData?.initialId + 1),
      espacement_min: alert?.espacementData.minInterval,
      espacement_max: alert?.espacementData?.maxInterval
    })
      .then(response => {
        onReject();
        setErrorMessage(false)
        dispatch(setError(null));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false)
        setErrorMessage(true)
        if (error.message == "Network Error") {
          dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
        } else {
          dispatch(setError("Une erreur est survenue, veuillez réessayer"));
        }
      });
  };

  const handleCreateExamenLie = () => {
    setErrorMessage(false);
    setLoading(true);
    let initialIds = 0;
    for (var i = 0; i < getAllExams.length; i++) {
      if (i === alert?.espacementData?.initialIndex) {
        initialIds = getAllExams[i].id_examen;
      }
    }
    examenLieService.createExamenLie({
      id_examen_parent: parseInt(initialIds),
      id_examen_enfant: parseInt(initialIds + 1),
      espacement_min: alert?.espacementData.minInterval,
      espacement_max: alert?.espacementData?.maxInterval
    })
      .then(response => {
        onReject();
        setErrorMessage(false)
        dispatch(setError(null));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false)
        setErrorMessage(true)
        if (error.message == "Network Error") {
          dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
        } else {
          dispatch(setError("Une erreur est survenue, veuillez réessayer"))
        }
      })
  }

  const handleCreateExamenLieForAll = () => {
    setErrorMessage(false);
    setLoading(true);
    for (var i = 0; i < getAllExams.length - 1; i++) {
      examenLieService.createExamenLie({
        id_examen_parent: parseInt(getAllExams[i].id_examen),
        id_examen_enfant: parseInt(getAllExams[i + 1].id_examen),
        espacement_min: alert?.espacementData.minInterval,
        espacement_max: alert?.espacementData?.maxInterval
      })
        .then(response => {
          setErrorMessage(false)
          dispatch(setError(null));
          setLoading(false);
        })
        .catch(error => {
          setLoading(false)
          setErrorMessage(true)
          if (error.message == "Network Error") {
            dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
          } else {
            dispatch(setError("Une erreur est survenue, veuillez réessayer"))
          }
        })
    }
    onAccept();
  }


  const handleCreateGroupeLieForAll = () => {
    for (let i = 0; i < groupPayload.length - 1; i++) {
      setErrorMessage(false);
      setLoading(true);
      GroupeLieService.createGroupeLie({
        id_groupe_parent: groupPayload[i].id_modele_groupe,
        id_groupe_enfant: groupPayload[i + 1].id_modele_groupe,
        espacement_min: alert?.espacementData?.minInterval,
        espacement_max: alert?.espacementData?.maxInterval
      })
        .then(response => {
          setErrorMessage(false)
          dispatch(setError(null));
          setLoading(false);
        })
        .catch(error => {
          setLoading(false)
          setErrorMessage(true)
          if (error.message == "Network Error") {
            dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
          } else {
            dispatch(setError("Une erreur est survenue, veuillez réessayer"))
          }
        })
    }
    onAccept();
  }



  const handleCreateExamenGroup = () => {
    setLoading(true);
    setErrorMessage(false)
    examenService.createExamen({
      id_modele: parseInt(modelData.id),
      id_modele_groupe: groupExamPayload.idGroup,
      id_praticien: alert?.userIn?.id_praticien,
      id_profession: alert?.userIn?.id_profession,
      id_lieu: alert?.userIn?.id_lieu,
      id_motif: alert?.userIn?.id_motif,
      fixe: alert?.userIn?.fixedPosition ? 1 : 0,
      position: 1,
    })
      .then((response) => {
        handleGetExamenGroup();
        onReject();
        setLoading(false);
        setErrorMessage(false);
        dispatch(setError(null));
        response.data.data.id_group = activeGroup;
        response.data.data.allGroup = true;
        dispatch(addExam({ index: activeGroup, exam: response.data.data }));
        dispatch(
          addExamOnAllGroups({ index: activeGroup, exam: response.data.data })
        );
        dispatch(setShowExamForm(false));
        dispatch(setAlert(false));
        dispatch(CreateEspacementSubExam());
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(true);
        if (error.message == "Network Error") {
          dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
        } else {
          dispatch(setError("Une erreur est survenue"));
        }
      });
  };

  const handleCreateExamenForAll = () => {
    setLoading(true);
    setErrorMessage(false)
    for (let i = 0; i < groupPayload.length; i++) {
      examenService.createExamen({
        id_modele: groupPayload[i].id_modele,
        id_modele_groupe: groupPayload[i].id_modele_groupe,
        id_praticien: alert?.userIn?.id_praticien,
        id_profession: alert?.userIn?.id_profession,
        id_lieu: alert?.userIn?.id_lieu,
        id_motif: alert?.userIn?.id_motif,
        fixe: alert?.userIn?.fixedPosition ? 1 : 0,
        position: 1,
      })
        .then((response) => {
          setLoading(false);
          setErrorMessage(false);
          dispatch(setError(null))
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(true);
          if (error.message == "Network Error") {
            dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
          } else {
            dispatch(setError("Une erreur est survenue"))
          }
        });
    }
    onAccept();
  }



  const handleCreate = () => {
    if (onAccept) {
      if (alert?.espacementData?.typeAl === "espacement") {
        if (!alert?.espacementData?.isModelGroup) {
          handleCreateExamenLieForAll();
        } else {

          handleCreateGroupeLieForAll();
        }

      } else if (alert?.userIn?.typeAl === "examens") {
        handleCreateExamenForAll();
      } else if (!isComplete) {
        handleUpdateModele();
      }
    }

  }

  const goBack = () => {
    if (onReject) {
      if (alert?.espacementData?.typeAl === "espacement") {
        if (!alert?.espacementData?.isModelGroup) {
          handleCreateExamenLie();
        } else {
          handleCreateGroupeLie();
        }

      } else if (alert?.userIn?.typeAl === "examens") {
        handleCreateExamenGroup();
      }
      return;
    }
    dispatch(setAlert({ showAlert: false, message: "" }));
    return;
  };

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
              <EuiFieldText name="nomModele" value={modelData.modelName} fullWidth />
            </EuiFormRow>
          </EuiForm>
        ) : isConfirmation || alert.isConfirmation ? (
          <div>
            <EuiText style={{...styles.textContainer, textAlign: innerWidth < 641 ? "center" : "", left : innerWidth < 641 ? 0 : ""}}>
              Ce modèle va être enregistré sous le nom :
              <br />
              <div style={styles.textTitle}>
                {modelData.nom || modelData.modelName}
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
            style={{ ...styles.message, marginRight: innerWidth < 768 ? "20%" : "", font: "normal normal 600 22px/25px Open Sans" }}
          >
            {alert.message ? alert.message : message}
          </div>
        )}
        {alert?.showCustomComponent && <EspacementInterExamenForm />}
      </EuiModalBody>
      {/* {showButtonBlock && ( */}
      <EuiSpacer size="m" />
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
            fontSize: 27,
            padding: innerWidth <= 500 ? "5px" : "",
            width: innerWidth <= 500 ? "100%" : 256,
            marginBottom: innerWidth <= 500 ? "20px" : "",
          }}
          onClick={goBack}
        >
          {alert?.buttonText?.cancelText ?? "Retour"}
        </EuiButtonEmpty>
        <EuiButton
          style={{
            ...styles.btn,
            fontSize: 27,
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            width: innerWidth <= 500 ? "100%" : 256,
            textDecoration: "none",
          }}
          onClick={
            isConfirmation || alert.isConfirmation ? submit : handleCreate
          }
          fill={true}
        >
          {loading ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              <CircularProgress
                style={{
                  marginRight: "7px",
                  color: "white",
                  width: "25px",
                  height: "25px",
                  marginTop: "4px"
                }}
              />
              <>{alert?.buttonText?.confirmText ?? "Enregistrer"}</>
            </Box>
          ) : (<Box
            style={{
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            <>{alert?.buttonText?.confirmText ?? "Enregistrer"}</>
          </Box>
          )}
        </EuiButton>
      </EuiModalFooter>
      {errorMessage && (
        <>
          <EuiSpacer size="xl" />
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        </>
      )}
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ModelsReducer }) => ({
  modelData: ModelsReducer.modelData,
});

export default connect(mapStateToProps)(Alert);
