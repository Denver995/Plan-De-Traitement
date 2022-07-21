import {
  EuiButton,
  EuiButtonEmpty,
  EuiCheckbox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiHorizontalRule,
  EuiSelect,
  EuiSpacer,
  useGeneratedHtmlId,
} from "@elastic/eui";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ReactComponent as TracIcon } from "../../../assets/svgs/Trac-39.svg";
import { useDimension } from "../../../hooks/dimensions";
import "../../../modifierexamen.css";
import "../../../eui_theme_light_.css"
import {
  setAlert,
  setComponent,
  setError,
  startLoading,
} from "../../../redux/commons/actions";
import {
  addExam,
  addExamGrouped,
  addExamOnAllGroups,
  CreateEspacement,
  CreateEspacementSubExam,
  createExamen,
  createExamen as createExamenAction,
  createGroups,
  mostBeEditable,
  setShowExamForm,
  shareGroupPayload,
  shareListExamGroup,
} from "../../../redux/examens/actions";
import {
  addStep,
  // deleteStep,
  desactivateStep,
} from "../../../redux/steps/actions";
import examenService from "../../../services/examens";
import LieuxService from "../../../services/lieux";
import ModelGroupeService from "../../../services/modelGroupe";
import ModelService from "../../../services/models";
import MotifsService from "../../../services/motifs";
import PraticiensService from "../../../services/praticiens";
import SpecialiteService from "../../../services/specialites";
import colors from "../../../utils/colors";
import { STEP2, STEP3, typeScreen } from "../../../utils/constants";
import { createStep, getStepByKey } from "../../../utils/helper";
import ModalWrapper from "../../common/ModalWrapper";
import ExamItem from "../ExamItem";
import styles from "./styles";
import AsyncSelect from 'react-select/async';


const ExamenForm = ({
  isModelGroup,
  onAddExam,
  groupSelected,
  activeGroup,
  examsGrouped,
  onPrevious,
  formType,
  modelData,
  handleGetExamByGroupIndex,
  predecessor,
  groupWithData,
}) => {
  const dispatch = useDispatch();
  const fixedExamenCheckboxId = useGeneratedHtmlId({
    prefix: "indeterminateCheckbox",
  });
  const mustBeEditable = useSelector(
    (state) => state.ExamenReducer.mustBeEditable
  );
  const examGroupedToEdite = useSelector(state => state.ExamenReducer.ExamenReducer)
  const steps = useSelector((state) => state.StepReducer.steps);
  const error = useSelector((state) => state.CommonReducer.error);
  const groupExamPayload = useSelector(
    (state) => state.ExamenReducer.groupExamPayload
  );
  const examenSelected = useSelector(
    (state) => state.CommonReducer.examen.examData
  );
  const [fixedExamPosition, setFixedExamPosition] = useState(false);
  const [listExam, setListExam] = useState([]);
  const [showEditForm, setShowEditForm] = useState(
    mustBeEditable ? true : formType === typeScreen.examFormEdit
  );
  const [reload, setReload] = useState(false);
  const [motif, setMotif] = useState("");
  const [praticien, setPraticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [listSpecialite, setListSpecialite] = useState([]);
  const [specialite, setSpecialite] = useState("");
  const [listLieu, setListLieu] = useState([]);
  const [listMotif, setListMotif] = useState([]);
  const [listPraticien, setListPraticien] = useState([]);
  const { innerWidth } = useDimension();
  const colorsArr = ["primaryLight", "danger", "success", "warning"];
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const previousStep = getStepByKey(steps, STEP2);

  const onChangePositionExamen = () => {
    setFixedExamPosition(!fixedExamPosition);
  };

  const onChangeSpecialite = (e) => setSpecialite(e.label)

  const onChangeMotif = (e) => setMotif(e.label);

  const onChangePraticien = (e) => setPraticien(e.label);

  const onChangeLieu = (e) => setLieu(e.label);

  const onClickNext = (isGroup = false) => {
    if (!isGroup) {
      let nextStep = createStep(STEP3);
      nextStep.previousStep = previousStep;
      dispatch(startLoading());
      dispatch(desactivateStep(STEP2));
      dispatch(addStep(nextStep));
    }
  };

  const handleGetExamenGroup = () => {
    examenService
      .getExamenByIds(parseInt(modelData.id), groupExamPayload.idGroup)
      .then((response) => {
        dispatch(shareListExamGroup(response.data.data));
      })
      .catch((error) => { });
  };

  const handleCreateExamenGroup = (data) => {
    setLoading(true);
    setErrorMessage(false);
    examenService
      .createExamen(data)
      .then((response) => {
        setLoading(false);
        setErrorMessage(false);
        dispatch(setError(null));
        dispatch(createExamen(response.data));
        setReload(true);
        onAddExam({ name: "EXAMSLIST" });
        dispatch(addExam({ exam: response.data.data }));
        dispatch(createExamenAction(data));
        handleGetExamenGroup();
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Network Error") {
          dispatch(
            setError("Erreur de connexion, Vérifiez votre connexion internet")
          );
        } else {
          dispatch(setError("Une erreur est survenue"));
        }
      });
  };

  const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
  const userInfo = {
    id_praticien: praticien,
    id_lieu: lieu,
    id_motif: motif,
    id_specialite: specialite,
    fixedPosition: fixedExamPosition,
    typeAl: "examens",
  };
  const alertMessage =
    '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Souhaitez-vous appliquer la modification sur l\'ensemble des groupes ?</EuiText>';

  const onAddExamen = () => {
    const payload = {
      id_modele: parseInt(modelData.id),
      id_modele_groupe: groupExamPayload.idGroup,
      color: colors[colorsArr[Math.round(Math.random() * colorsArr.length)]],
      id_praticien: praticien,
      id_profession: 1,
      id_lieu: lieu,
      id_motif: motif,
      id_specialite: specialite,
      fixe: fixedExamPosition ? 1 : 0,
      positionFixed: fixedExamPosition,
      position: 1,
    };

    if (isModelGroup) {
      payload.id_group = activeGroup;
      dispatch(
        setAlert({
          title: "Enregistrer le modèle",
          message: alertMessage,
          showAlert: true,
          buttonText: button,
          showButtonBlock: true,
          userIn: userInfo,
          typeAlert: "examens",
          onAccept: () => {
            payload.allGroup = true;
            dispatch(addExam({ index: activeGroup, exam: payload }));
            dispatch(addExamOnAllGroups({ index: activeGroup, exam: payload }));
            dispatch(setShowExamForm(false));
            dispatch(setAlert(false));
            dispatch(CreateEspacementSubExam());
          },
          onReject: () => {
            handleCreateExamenGroup(payload);
            payload.allGroup = false;
            dispatch(addExam({ index: activeGroup, exam: payload }));
            dispatch(addExamGrouped({ index: activeGroup, exam: payload }));
            dispatch(setShowExamForm(false));
            dispatch(setAlert(false));
            dispatch(CreateEspacementSubExam());
          },
        })
      );
    } else {
      listExam.push(listExam.length++);
      setListExam(listExam);
      /**
       * @todo dispatch creatExamen action
       */
      setLoading(true);
      examenService
        .createExamen(payload)
        .then((response) => {
          setLoading(false);
          dispatch(createExamen(payload));
          setReload(true);
          onAddExam({ name: "EXAMSLIST" });
          dispatch(addExam({ exam: payload }));
          dispatch(createExamenAction(payload));
        })
        .catch((error) => {
          setLoading(false);
          if (error.message === "Network Error") {
            dispatch(
              setError("Erreur de connexion, Vérifiez votre connexion internet")
            );
          } else {
            dispatch(setError("Une erreur est survenue"));
          }
        });

      dispatch(createExamen(payload));
      setReload(true);
      onAddExam({ name: typeScreen.examList });
      dispatch(addExam({ exam: payload }));
      dispatch(createExamenAction(payload));
    }
  };

  const updateFormData = (resetFormData = false, exam) => {
    setLieu(resetFormData ? "" : exam?.id_lieu);
    setPraticien(resetFormData ? "" : exam?.id_praticien);
    setMotif(resetFormData ? "" : exam?.id_motif);
    setSpecialite(resetFormData ? "" : exam?.id_specialite);
  };

  const handleGetGroup = () => {
    setLoading(true);
    ModelGroupeService.getModelGroupe(parseInt(modelData.id))
      .then((response) => {
        setLoading(false);
        dispatch(shareGroupPayload(response.data.data));
        dispatch(createGroups(response.data.data.length));
        dispatch(CreateEspacement(response.data.data.length - 1));
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const onEditExamen = () => {
    if (mustBeEditable) {
      dispatch(mostBeEditable(false));
      onPrevious();
    } else {
      dispatch(setComponent(typeScreen.examList));
    }
    return;
  };
  const handleDeleteModele = () => {
    ModelService.deleteModele(modelData.id)
      .then((response) => {
        handleGetGroup();
      })
      .catch((error) => { });
  };

  const onCancel = () => {
    handleDeleteModele();
    if (formType === typeScreen.examFormEdit) {
      dispatch(setComponent(typeScreen.examList));
      return;
    }

    if (predecessor === typeScreen.examList) {
      dispatch(setComponent(typeScreen.examList));
      return;
    }

    onPrevious && onPrevious();
  };

  useEffect(() => {
    SpecialiteService.getListeSpecialite()
      .then((res) => {
        var data = [];
        res.data.forEach((element) => {
          data.push({ value: element.id, label: element.libelle });
        });
        setListSpecialite(data);
      })
      .catch((error) => { });

    LieuxService.getListeLieux()
      .then((res) => {
        var data = [];
        res.data.tabinfo.forEach((element) => {
          data.push({ value: element.id_lieu, label: element.libelle_lieu });
        });
        setListLieu(data);
      })
      .catch((error) => { });

    MotifsService.getListeMotif()
      .then((res) => {
        var data = [];
        res.data.tabinfo.forEach((element) => {
          data.push({
            value: element.id_motif_rdv,
            label: element.libelle_motif_rdv,
          });
        });
        setListMotif(data);
      })
      .catch((error) => { });

    PraticiensService.getListePraticien()
      .then((res) => {
        var data = [];
        res.data.tabinfo.forEach((element) => {
          data.push({
            value: element.id_praticien,
            label: element.nom_praticien + " " + element.prenom_praticien,
          });
        });
        setListPraticien(data);
      })
      .catch((error) => { });
  }, []);
  useEffect(() => {
    if (reload) setReload(false);
    if (
      examenSelected &&
      examenSelected.id &&
      examenSelected.id !== selectedExamId
    ) {
      setSelectedExamId(examenSelected.id);
      updateFormData(false, examenSelected ? examenSelected : examGroupedToEdite ? examGroupedToEdite : null);
    }
  }, [reload, examenSelected, showEditForm, steps, selectedExamId, examGroupedToEdite]);

  useEffect(() => { }, [groupSelected, examsGrouped]);
  const filterData = (inputValue, dataToMap) => {
    return dataToMap.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };


  return (
    <>
      <ModalWrapper style={styles.modal}>
        <EuiSpacer size="l" />
        <div style={styles.examForm}>
          <div>
            <EuiFlexGroup>
              <EuiFlexItem grow={1} style={styles.modelContainer}>
                <p style={styles.text}>Modèle:</p>
                <EuiSpacer size="s" />
                <p style={styles.input}>{modelData.nom}</p>
              </EuiFlexItem>
              {isModelGroup ? (
                <EuiFlexItem grow={3}>
                  <p>Groupe:</p>
                  <EuiSpacer size="s" />
                  <p style={styles.input}>{`Groupe ${parseInt(activeGroup.slice(6)) + 1}`}</p>
                </EuiFlexItem>
              ) : null}
            </EuiFlexGroup>
            <EuiFlexGroup>
              <EuiHorizontalRule className="horizontalRule" />
            </EuiFlexGroup>
          </div>
          {isModelGroup && !mustBeEditable ? (
            <div style={{ marginTop: 28, marginBottom: 28 }}>
              {handleGetExamByGroupIndex(groupWithData, activeGroup).map(
                (item, index) => (
                  <div key={index}>
                    <ExamItem
                      color={item.color}
                      showEditForm={setShowEditForm}
                      exam={item}
                      id_modele={item.id_modele}
                      index={index}
                    />
                  </div>
                )
              )}
            </div>
          ) : null}
          <EuiFlexGroup style={styles.titleContainer}>
            <TracIcon width={"1rem"} />
            <EuiFlexItem style={styles.examTitle}>Examen </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="xl" />
          <EuiForm>
            <EuiFlexGroup>
              <EuiFlexItem>
                <p style={styles.selectLabel}>Spécialité* :</p>
                <EuiSpacer size="xs" />
                <AsyncSelect className="input-search-examform" defaultOptions={listSpecialite} onChange={onChangeSpecialite} loadOptions={(inputValue) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(filterData(inputValue, listSpecialite));
                    }, 1000);
                  })}
                  components={{
                    IndicatorSeparator : () => null
                  }}
                  />
              </EuiFlexItem>
              <EuiFlexItem className="input_left">
                <p style={styles.selectLabel}>Motif* :</p>
                <EuiSpacer size="xs" />
                <AsyncSelect defaultOptions={listMotif} onChange={onChangeMotif} loadOptions={(inputValue) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(filterData(inputValue, listMotif));
                    }, 1000);
                  })}
                  components={{
                    IndicatorSeparator : () => null
                  }} 
                  />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="xl" />
            <EuiFlexGroup>
              <EuiFlexItem>
                <p style={styles.selectLabel}>Praticien :</p>
                <EuiSpacer size="xs" />
                <AsyncSelect defaultOptions={listPraticien} onChange={onChangePraticien} loadOptions={(inputValue) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(filterData(inputValue, listPraticien));
                    }, 1000);
                  })}
                  components={{
                    IndicatorSeparator : () => null
                  }}
                  />
              </EuiFlexItem>
              <EuiFlexItem className="input_left">
                <p style={styles.selectLabel}>Lieu* :</p>
                <EuiSpacer size="xs" />
                <AsyncSelect defaultOptions={listLieu} onChange={onChangeLieu} loadOptions={(inputValue) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(filterData(inputValue, listLieu));
                    }, 1000);
                  })}
                  components={{
                    IndicatorSeparator : () => null
                  }}
                  />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            <div style={styles.positionContainer}>
              <EuiCheckbox
                id={fixedExamenCheckboxId}
                indeterminate={fixedExamPosition}
                onChange={onChangePositionExamen}
              />
              <p style={styles.examPosition}>Fixer la position de l'examen</p>
            </div>
            {showEditForm ? (
              <EuiFlexGroup
                className="btn_group"
                style={{
                  flexDirection: innerWidth < 768 ? "column-reverse" : "",
                }}
              >
                <EuiButtonEmpty
                  fill="true"
                  className="button_cancel_me"
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Retour
                </EuiButtonEmpty>
                <EuiButton
                  disabled={motif === "" || lieu === "" || specialite === ""}
                  style={
                    motif === "" || lieu === "" || specialite === ""
                      ? styles.deactivated
                      : styles.activated
                  }
                  onClick={onEditExamen}
                  className="button_next_me"
                >
                  Enregistrer
                </EuiButton>
              </EuiFlexGroup>
            ) : (
              <EuiFlexGroup
                className="examen__form__button__container"
                style={styles.buttonContainer}
              >
                <EuiButtonEmpty
                  className="btn-annuler-examForm ExamenFormCancel_btn"
                  onClick={() => {
                    onCancel();
                  }}
                  style={{
                    ...styles.cancelBtn,
                    marginRight: innerWidth >= 768 ? 50 : 0,
                  }}
                >
                  Annuler
                </EuiButtonEmpty>
                <EuiButton
                  className="ExamenFormAdd_btn btn-ajouter-examForm"
                  onClick={onAddExamen}
                  style={
                    motif === "" || lieu === "" || specialite === ""
                      ? styles.btnDisabled
                      : styles.addBtn
                  }
                  disabled={motif === "" || lieu === "" || specialite === ""}
                >
                  {loading ? (
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress
                        style={{
                          marginRight: "5px",
                          color: "white",
                          width: "25px",
                          height: "25px",
                        }}
                      />
                      Ajouter
                    </Box>
                  ) : (
                    <>Ajouter</>
                  )}
                </EuiButton>
                {errorMessage && (
                  <>
                    <EuiSpacer size="xl" />
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                  </>
                )}
              </EuiFlexGroup>
            )}
            {!showEditForm && listExam.length > 2 && (
              <>
                <EuiFlexGroup>
                  <EuiHorizontalRule className="horizontalRule" />
                </EuiFlexGroup>
                <EuiFlexGroup justifyContent="flexEnd">
                  <EuiFlexItem grow={true}>
                    <EuiButton
                      onClick={() => onClickNext()}
                      className="button_finished"
                    >
                      Terminer
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </>
            )}
          </EuiForm>
          <style jsx="true">
            {`
              .euiFlexGroup .input_left {
                margin-left: 12%;
              }
            `}
          </style>
        </div>
      </ModalWrapper>
    </>
  );
};

const mapStateToProps = ({ ExamenReducer, ModelsReducer }) => ({
  examsGrouped: ExamenReducer.examsGrouped,
  groupSelected: ExamenReducer.examenSelected,
  activeGroup: ExamenReducer.activeGroup,
  modelData: ModelsReducer.modelData,
  groupWithData: ExamenReducer.groupWithData,
});
export default connect(mapStateToProps)(ExamenForm);
