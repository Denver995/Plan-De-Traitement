import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModalBody,
  EuiModalFooter,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { default as React, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ReactComponent as Pencil } from "../../assets/svgs/Groupe-460.svg";
import { useDimension } from "../../hooks/dimensions";
import { setAlert, setComponent, setError } from "../../redux/commons/actions";
import {
  addExam,
  addExamOnAllGroups,
  CreateEspacementSubExam,
  setShowExamForm,
} from "../../redux/examens/actions";
import { saveModel } from "../../redux/models/actions";
import examenService from "../../services/examens";
import GroupeLieService from "../../services/groupeLie";
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
}) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.CommonReducer.alert);
  const error = useSelector((state) => state.CommonReducer.error);
  const activeGroup = useSelector((state) => state.ExamenReducer.activeGroup);
  const { innerHeight, innerWidth } = useDimension();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const groupPayload = useSelector((state) => state.ExamenReducer.groupPayload);
  const colorsArr = ["primaryLight", "danger", "success", "warning"];

  useEffect(() => {}, [buttonText]);

  const handleCreateGroupeLie = (data) => {
    setErrorMessage(false);
    setLoading(true);
    GroupeLieService.createGroupeLie(data)
      .then((response) => {
        setErrorMessage(false);
        dispatch(setError(null));
        setLoading(false);
        goBack();
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(true);
        if (error.message === "Network Error") {
          dispatch(
            setError("Erreur de connexion, Vérifiez votre connexion internet")
          );
        } else {
          dispatch(setError("Une erreur est survenue, veuillez réessayer"));
        }
      });
  };

  const handleCreateGroupeLieForAll = () => {
    for (let i = 0; i < groupPayload.length - 1; i++) {
      handleCreateGroupeLie({
        id_groupe_parent: groupPayload[i].id_modele_groupe,
        id_groupe_enfant: groupPayload[i + 1].id_modele_groupe,
        espacement_min: alert?.espacementData.minInterval,
        espacement_max: alert?.espacementData?.maxInterval,
      });
    }
  };
  const handleCreateExamenGroup = (data) => {
    setLoading(true);
    setErrorMessage(false);
    examenService
      .createExamen(data)
      .then((response) => {
        goBack();
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
        if (error.message === "Network Error") {
          dispatch(
            setError("Erreur de connexion, Vérifiez votre connexion internet")
          );
        } else {
          dispatch(setError("Une erreur est survenue"));
        }
      });
  };

  const handleCreateExamenForAll = () => {
    for (let i = 0; i < groupPayload.length; i++) {
      handleCreateExamenGroup({
        id_modele: groupPayload[i].id_modele,
        id_modele_groupe: groupPayload[i].id_modele_groupe,
        color: colors[colorsArr[Math.round(Math.random() * colorsArr.length)]],
        id_praticien: alert?.userIn?.id_praticien,
        id_profession: 1,
        id_lieu: alert?.userIn?.id_lieu,
        id_motif: alert?.userIn?.id_motif,
        id_specialite: alert?.userIn?.id_specialite,
        fixe: alert?.userIn?.fixedPosition ? 1 : 0,
        position: 1,
      });
    }
  };

  const handleCreate = () => {
    if (alert?.espacementData?.typeAl === "espacement") {
      handleCreateGroupeLieForAll();
    } else if (alert?.userIn?.typeAl === "examens") {
      handleCreateExamenForAll();
    }
  };

  const goBack = () => {
    if (onReject) {
      onReject();
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
      <EuiSpacer size="xl" />
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
          onClick={
            isConfirmation || alert.isConfirmation ? submit : handleCreate
          }
          fill={true}
        >
          {loading && (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              <CircularProgress
                style={{
                  marginRight: "5px",
                  color: "white",
                  width: "25px",
                  height: "25px",
                }}
              />
              <>{alert?.buttonText?.confirmText ?? "Enregistrer"}</>
            </Box>
          )}
          {alert?.buttonText?.confirmText ?? "Enregistrer"}
        </EuiButton>
      </EuiModalFooter>
      {/* )} */}
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
