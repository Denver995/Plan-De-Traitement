import {
  EuiButton,
  EuiButtonEmpty,
  EuiCheckbox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiHorizontalRule,
  EuiLoadingSpinner,
  EuiSpacer,
  useGeneratedHtmlId
} from "@elastic/eui";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { ReactComponent as TracIcon } from "../../../assets/svgs/Trac-39.svg";
import "../../../eui_theme_light_.css";
import { useDimension } from "../../../hooks/dimensions";
import "../../../modifierexamen.css";
import {
  setAlert,
  setComponent,
  setError,
  startLoading
} from "../../../redux/commons/actions";
import {
  addExam,
  addExamGrouped,
  addExamOnAllGroups,
  CreateEspacementSubExam, mostBeEditable,
  setShowExamForm, shareLieu,
  shareMotif, sharePraticienData, shareSpecialitieData
} from "../../../redux/examens/actions";
import {
  addStep,
  // deleteStep,
  desactivateStep
} from "../../../redux/steps/actions";
import examenService from "../../../services/examens";
import LieuxService from "../../../services/lieux";
import MotifsService from "../../../services/motifs";
import PraticiensService from "../../../services/praticiens";
import SpecialiteService from "../../../services/specialites";
import { STEP2, STEP3, typeScreen } from "../../../utils/constants";
import { createStep, getStepByKey } from "../../../utils/helper";
import ModalWrapper from "../../common/ModalWrapper";
import ExamItem from "../ExamItem";
import styles from "./styles";
import { components } from "react-select";
import colors from "../../../utils/colors";

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
  examData
}) => {
  const dispatch = useDispatch();
  const fixedExamenCheckboxId = useGeneratedHtmlId({
    prefix: "indeterminateCheckbox",
  });
  const mustBeEditable = useSelector(
    (state) => state.ExamenReducer.mustBeEditable
  );
  const examGroupedToEdite = useSelector(
    (state) => state.ExamenReducer.ExamenReducer
  );
  const steps = useSelector((state) => state.StepReducer.steps);
  const error = useSelector((state) => state.CommonReducer.error);
  const groupExamPayload = useSelector(
    (state) => state.ExamenReducer.groupExamPayload
  );
  const examenSelected = useSelector(
    (state) => state.CommonReducer.examen.examData
  );
  const examsListGroup = useSelector(
    (state) => state.ExamenReducer.examsListGroup
  );
  const [fixedExamPosition, setFixedExamPosition] = useState(examData?.fixe ? examData.fixe : true);
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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const allExams = useSelector(state => state.ExamenReducer.getAllExams);
  const previousStep = getStepByKey(steps, STEP2);

  const onChangePositionExamen = () => {
    setFixedExamPosition(!fixedExamPosition);
  };

  const onChangeSpecialite = (e) => { setSpecialite(e ? e : "") };

  const onChangeMotif = (e) => setMotif(e ? e : "");

  const onChangePraticien = (e) => setPraticien(e ? e : "");

  const onChangeLieu = (e) => setLieu(e ? e : "");

  const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
  const userInfo = {
    id_praticien: praticien?.value,
    id_lieu: lieu?.value,
    id_motif: motif?.value,
    id_profession: specialite?.value,
    fixedPosition: fixedExamPosition ? 1 : 0,
    typeAl: "examens",
  };
  const alertMessage =
    "Souhaitez-vous appliquer la modification sur l'ensemble des groupes ?";

  const onAddExamen = () => {
    const payload = {
      id_modele: parseInt(modelData.id),
      id_modele_groupe: groupExamPayload.idGroup,
      id_praticien: praticien?.value,
      id_lieu: lieu?.value,
      id_motif: motif?.value,
      id_profession: specialite?.value,
      fixe: fixedExamPosition ? 1 : 0,
      // positionFixed: fixedExamPosition,
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
            // examsListGroup.allGroup = true;
            // dispatch(addExam({ index: activeGroup, exam: examsListGroup }));
            // dispatch(
            //   addExamOnAllGroups({ index: activeGroup, exam: examsListGroup })
            // );
            dispatch(setShowExamForm(false));
            // dispatch(setAlert(false));
            // dispatch(CreateEspacementSubExam());
          },
          onReject: () => {
            examsListGroup.allGroup = false;
            dispatch(addExam({ index: activeGroup, exam: examsListGroup }));
            dispatch(
              addExamGrouped({ index: activeGroup, exam: examsListGroup })
            );
            dispatch(setShowExamForm(false));
            dispatch(setAlert(false));
            dispatch(CreateEspacementSubExam());
          },
        })
      );
    } else {
      setLoading(true);
      setErrorMessage(false);
      examenService
        .createExamen(payload)
        .then((response) => {
          onAddExam({ name: "EXAMSLIST" });
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
    }
  };

  const updateFormData = (resetFormData = false, exam) => {
    setLieu(resetFormData ? "" : exam?.id_lieu);
    setPraticien(resetFormData ? "" : exam?.id_praticien);
    setMotif(resetFormData ? "" : exam?.id_motif);
    setSpecialite(resetFormData ? "" : exam?.id_profession);
  };

  const onEditExamen = () => {
    setLoading(true);
    setErrorMessage(false);
    let idGroup = 0;
    if (groupExamPayload && groupExamPayload.idGroup) {
      idGroup = groupExamPayload.idGroup;
    }

    let id_pra;
    if (praticien == "" || !praticien)
      id_pra = "0"
    if (praticien && praticien.length > 0)
      id_pra = praticien[0]?.value

    examenService
      .updateExamen(examData.id_examen, {
        id_modele: parseInt(modelData.id),
        id_praticien: praticien?.value ? parseInt(praticien.value) : parseInt(id_pra),
        id_lieu: lieu?.value ? lieu.value : parseInt(lieu[0]?.value),
        id_motif: motif?.value ? parseInt(motif.value) : parseInt(motif[0]?.value),
        id_profession: specialite?.value ? parseInt(specialite.value) : parseInt(specialite[0]?.value),
        id_modele_groupe: idGroup,
        fixe: fixedExamPosition ? 1 : 0,
        position: examData.position ? examData.position : 1,
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

  const onCancel = () => {
    dispatch(mostBeEditable(false));
    if (isModelGroup) {
      if (predecessor === typeScreen.examList || formType === typeScreen.examFormEdit) {
        dispatch(setComponent(typeScreen.examList));
        return;
      }
      if (showEditForm) {
        let nextStep = createStep(STEP3);
        nextStep.previousStep = previousStep;
        dispatch(desactivateStep(STEP2));
        dispatch(setShowExamForm(false));
        dispatch(addStep(nextStep));
      }
      onPrevious && onPrevious();
    } else {
      if (
        formType === typeScreen.examFormEdit &&
        predecessor !== typeScreen.examList
      ) {
        // dispatch(setComponent(typeScreen.examList));
        let nextStep = createStep(STEP3);
        nextStep.previousStep = previousStep;
        dispatch(startLoading());
        dispatch(desactivateStep(STEP2));
        dispatch(setComponent({ name: typeScreen.examList }));
        dispatch(addStep(nextStep));
        return;
      }
      if (predecessor === typeScreen.examList) {
        dispatch(setComponent(typeScreen.examList));
        return;
      }
      onPrevious && onPrevious();
    }

  };

  useEffect(() => {

    if (formType != typeScreen.examFormEdit)
      examData = undefined

    SpecialiteService.getListeSpecialite()
      .then((res) => {
        dispatch(shareSpecialitieData(res.data));
        let data = [];
        res.data.forEach((element) => {
          data.push({ value: element.id, label: element.libelle });
        });
        setListSpecialite(data);
        if (examData?.id_profession) {
          data = data.filter((item) => item.value == examData?.id_profession)
          setSpecialite(data)
        }
      })
      .catch((error) => { });

    LieuxService.getListeLieux()
      .then((res) => {
        dispatch(shareLieu(res.data.tabinfo));
        let data = [];
        res.data.tabinfo.forEach((element) => {
          data.push({ value: element.id_lieu, label: element.libelle_lieu });
        });
        setListLieu(data);
        if (examData?.id_lieu) {
          data = data.filter((item) => item.value == examData?.id_lieu)
          setLieu(data)
        }
      })
      .catch((error) => { });

    MotifsService.getListeMotif()
      .then((res) => {
        dispatch(shareMotif(res.data.tabinfo));
        let data = [];
        res.data.tabinfo.forEach((element) => {
          data.push({
            value: element.id_motif_rdv,
            label: element.libelle_motif_rdv,
          });
        });
        setListMotif(data);
        if (examData?.id_motif) {
          data = data.filter((item) => item.value == examData?.id_motif)
          setMotif(data)
        }
      })
      .catch((error) => { });

    PraticiensService.getListePraticien()
      .then((res) => {
        dispatch(sharePraticienData(res.data.tabinfo));
        let data = [];
        res.data.tabinfo.forEach((element) => {
          data.push({
            value: element.id_praticien,
            label: element.nom_praticien + " " + element.prenom_praticien,
          });
        });
        setListPraticien(data);
        if (examData?.id_praticien) {
          data = data.filter((item) => item.value == examData?.id_praticien)
          setPraticien(data)
        }
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
      updateFormData(false, examenSelected[examenSelected.indexExam]);
    }
  }, [
    reload,
    examenSelected,
    showEditForm,
    steps,
    selectedExamId,
    examGroupedToEdite,
  ]);

  useEffect(() => { }, [groupSelected, examsGrouped]);
  const filterData = (inputValue, dataToMap) => {
    return dataToMap.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "white" : "white",
      color: "rgb(93, 154, 212)",
      fontSize: 20,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "rgb(93, 154, 212)",
      fontSize: 20,
    }),
    defaultInputValue: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "red",
        fontSize: 17,
      };
    },
  };

  return (
    <>
      <ModalWrapper style={styles.modal}>
        <EuiSpacer size="m" />
        <div style={styles.examForm}>
          <div>
            <EuiFlexGroup>
              <EuiFlexItem grow={1} style={styles.modelContainer}>
                <p style={styles.text}>Modèle:</p>
                <EuiSpacer size="s" />
                <p style={styles.input}>{modelData.modelName}</p>
              </EuiFlexItem>
              {isModelGroup ? (
                <EuiFlexItem grow={3}>
                  <p style={styles.text}>Groupe:</p>
                  <EuiSpacer size="s" />
                  <p style={styles.input}>{`Groupe ${parseInt(activeGroup.slice(6)) + 1
                    }`}</p>
                </EuiFlexItem>
              ) : null}
            </EuiFlexGroup>
            <EuiFlexGroup>
              <EuiHorizontalRule className="horizontalRule" />
            </EuiFlexGroup>
          </div>
          {isModelGroup && !mustBeEditable && showEditForm ? (
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
          <EuiSpacer size="l" />
          <EuiForm>
            <EuiFlexGroup>
              <EuiFlexItem>
                <p style={styles.selectLabel}>Spécialité* :</p>
                <EuiSpacer size="xs" />
                <AsyncSelect
                  placeholder=""
                  styles={customStyles}
                  className="input-search-examform"
                  isClearable
                  defaultOptions={listSpecialite}
                  onChange={onChangeSpecialite}
                  value={specialite}
                  loadOptions={(inputValue) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve(filterData(inputValue, listSpecialite));
                      }, 1000);
                    })
                  }
                  loadingMessage={() => "Chargement..."}
                />
              </EuiFlexItem>
              <EuiFlexItem className="input_left">
                <p style={styles.selectLabel}>Motif* :</p>
                <EuiSpacer size="xs" />
                <AsyncSelect
                  placeholder=""
                  styles={customStyles}
                  loadingMessage={() => "Chargement..."}
                  defaultOptions={listMotif}
                  isClearable
                  onChange={onChangeMotif}
                  value={motif}
                  loadOptions={(inputValue) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve(filterData(inputValue, listMotif));
                      }, 1000);
                    })
                  }
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="xl" />
            <EuiFlexGroup>
              <EuiFlexItem>
                <p style={styles.selectLabel}>Praticien :</p>
                <EuiSpacer size="xs" />
                <AsyncSelect
                  placeholder=""
                  styles={customStyles}
                  loadingMessage={() => "Chargement..."}
                  defaultOptions={listPraticien}
                  isClearable
                  onChange={onChangePraticien}
                  loadOptions={(inputValue) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve(filterData(inputValue, listPraticien));
                      }, 1000);
                    })
                  }
                  value={praticien}
                />
              </EuiFlexItem>
              <EuiFlexItem className="input_left">
                <p style={styles.selectLabel}>Lieu* :</p>
                <EuiSpacer size="xs" />
                <AsyncSelect
                  placeholder=""
                  styles={customStyles}
                  defaultOptions={listLieu}
                  loadingMessage={() => "Chargement..."}
                  isClearable
                  onChange={onChangeLieu}
                  loadOptions={(inputValue) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve(filterData(inputValue, listLieu));
                      }, 1000);
                    })
                  }
                  value={lieu}
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
              <div>
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
                    disabled={motif === "" || lieu === "" || specialite === "" || loading}
                    style={
                      motif === "" || lieu === "" || specialite === "" || loading
                        ? styles.deactivated
                        : styles.activated
                    }
                    onClick={onEditExamen}
                    className="button_next_me"
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
                        Enregistrer
                      </Box>
                    ) : (
                      <>Enregistrer</>
                    )}
                  </EuiButton>
                </EuiFlexGroup>
              </div>
            ) : (
              <EuiFlexGroup
                className="examen__form__button__container"
                style={{
                  ...styles.buttonContainer,
                  justifyContent: (allExams?.length > 0 && !isModelGroup) ? "space-between" : "center"
                }}
              >
                <EuiButtonEmpty
                  className="btn-annuler-examForm ExamenFormCancel_btn"
                  onClick={() => {
                    onCancel();
                  }}
                  style={{
                    ...styles.cancelBtn,
                    width: (allExams?.length > 0 && !isModelGroup) ? "179px" : "210px",
                    marginRight: innerWidth >= 768 ? 40 : 0,
                  }}
                >
                  Annuler
                </EuiButtonEmpty>
                <EuiButton
                  className="ExamenFormAdd_btn btn-ajouter-examForm"
                  onClick={onAddExamen}
                  style={
                    motif === "" || lieu === "" || specialite === ""
                      ? { ...styles.btnDisabled, width: (allExams?.length > 0 && !isModelGroup) ? "179px" : "210px" }
                      : { ...styles.addBtn, width: (allExams?.length > 0 && !isModelGroup) ? "179px" : "210px" }

                  }
                  disabled={motif === "" || lieu === "" || specialite === "" || loading}
                >
                  {loading ? (
                    <EuiLoadingSpinner
                      style={{ marginTop: 7, marginRight: 1 }}
                      size="l"
                      color={colors.white}
                    />
                  ) : (
                    "Ajouter"
                  )}
                </EuiButton>
              </EuiFlexGroup>
            )}
            {errorMessage && (
              <>
                <EuiSpacer size="xl" />
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              </>
            )}
          </EuiForm>
          <style jsx="true">
            {`
              .euiFlexGroup .input_left {
                margin-left: 8%;
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
  examData: ExamenReducer.examen?.examData,
});
export default connect(mapStateToProps)(ExamenForm);
