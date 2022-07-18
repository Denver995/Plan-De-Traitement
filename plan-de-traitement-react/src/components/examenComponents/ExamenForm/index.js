import {
  EuiButton,
  EuiButtonEmpty,
  EuiCheckbox, EuiFlexGroup,
  EuiFlexItem,
  EuiForm, EuiHorizontalRule, EuiSelect, EuiSpacer, useGeneratedHtmlId
} from "@elastic/eui";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ReactComponent as TracIcon } from "../../../assets/svgs/Trac-39.svg";
import { useDimension } from "../../../hooks/dimensions";
import "../../../modifierexamen.css";
import { setAlert, setComponent, setError, startLoading } from "../../../redux/commons/actions";
import {
  addExam,
  addExamGrouped, addExamOnAllGroups, CreateEspacementSubExam,
  createExamen, createExamen as createExamenAction, examPayload, mostBeEditable, setShowExamForm, shareAllExams, shareExamData, shareLieu, shareMotif, sharePraticienData,
  shareSpecialitieData
} from "../../../redux/examens/actions";
import {
  addStep,
  // deleteStep,
  desactivateStep
} from "../../../redux/steps/actions";
import examenService from '../../../services/examens';
import LieuxService from "../../../services/lieux";
import MotifsService from "../../../services/motifs";
import PraticiensService from "../../../services/praticiens";
import SpecialiteService from "../../../services/specialites";
import { STEP2, STEP3, typeScreen } from "../../../utils/constants";
import { createStep, getStepByKey } from "../../../utils/helper";
import ModalWrapper from "../../common/ModalWrapper";
import ExamItem from "../ExamItem";
import styles from "./styles";



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
  groupWithData
}) => {
  const dispatch = useDispatch();
  const fixedExamenCheckboxId = useGeneratedHtmlId({
    prefix: "indeterminateCheckbox",
  });
  const mustBeEditable = useSelector(state => state.ExamenReducer.mustBeEditable)
  const steps = useSelector((state) => state.StepReducer.steps);
  const error = useSelector(state => state.CommonReducer.error);
  const groupExamPayload = useSelector(state => state.ExamenReducer.groupExamPayload)
  const examenSelected = useSelector(
    (state) => state.CommonReducer.examen.examData
  );
  const examsListGroup = useSelector(state => state.ExamenReducer.examsListGroup);
  const [fixedExamPosition, setFixedExamPosition] = useState(false);
  const [listExam, setListExam] = useState([]);
  const [showEditForm, setShowEditForm] = useState(
    mustBeEditable ? true :
      formType === typeScreen.examFormEdit
  );
  const [reload, setReload] = useState(false);
  const [specialite, setSpecialite] = useState("");
  const [motif, setMotif] = useState("");
  const [praticien, setPraticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [listSpecialite, setListSpecialite] = useState([]);
  const [listLieu, setListLieu] = useState([]);
  const [listMotif, setListMotif] = useState([])
  const [listPraticien, setListPraticien] = useState([]);
  const { innerWidth } = useDimension();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const previousStep = getStepByKey(steps, STEP2);

  const onChangePositionExamen = () => {
    setFixedExamPosition(!fixedExamPosition);
  };

  const onChangeSpecialite = (e) => setSpecialite(e.target.value);

  const onChangeMotif = (e) => setMotif(e.target.value);

  const onChangePraticien = (e) => setPraticien(e.target.value);

  const onChangeLieu = (e) => setLieu(e.target.value);

  const onClickNext = (isGroup = false) => {
    if (!isGroup) {
      let nextStep = createStep(STEP3);
      nextStep.previousStep = previousStep;
      dispatch(startLoading());
      dispatch(desactivateStep(STEP2));
      dispatch(addStep(nextStep));
    }
  };

  useEffect(() => {
  }, [])


  const handleGetExams = () => {
    setLoading(true);
    examenService.getExamenByModelId(modelData.id)
      .then((response) => {
        setLoading(false);
        dispatch(shareAllExams(response.data.data));
        dispatch(createExamen(response.data.data));
        onAddExam({ name: "EXAMSLIST" });
        onAddExam({ name: typeScreen.examList });
        dispatch(addExam({ exam: response.data.data }));
        dispatch(createExamenAction(response.data.data));
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
  const userInfo = {
    id_praticien: praticien,
    id_lieu: lieu,
    id_motif: motif,
    id_profession: specialite,
    fixedPosition: fixedExamPosition,
    typeAl: "examens"
  };
  const alertMessage =
    '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Souhaitez-vous appliquer la modification sur l\'ensemble des groupes ?</EuiText>';

  const onAddExamen = () => {
    const payload = {
      id_modele: parseInt(modelData.id),
      id_modele_groupe: groupExamPayload.idGroup,
      id_praticien: praticien,
      id_lieu: lieu,
      id_motif: motif,
      id_profession: specialite,
      fixe: fixedExamPosition ? 1 : 0,
      positionFixed: fixedExamPosition,
      position: 1,
    };
    dispatch(examPayload(payload));
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
            examsListGroup.allGroup = true;
            dispatch(addExam({ index: activeGroup, exam: examsListGroup }));
            dispatch(addExamOnAllGroups({ index: activeGroup, exam: examsListGroup }));
            dispatch(setShowExamForm(false));
            dispatch(setAlert(false));
            dispatch(CreateEspacementSubExam());
          },
          onReject: () => {
            examsListGroup.allGroup = false;
            dispatch(addExam({ index: activeGroup, exam: examsListGroup }));
            dispatch(addExamGrouped({ index: activeGroup, exam: examsListGroup }));
            dispatch(setShowExamForm(false));
            dispatch(setAlert(false));
            dispatch(CreateEspacementSubExam());
          },
        })
      );
    } else {
      listExam.push(listExam.length++);
      setListExam(listExam);
      setLoading(true)
      setErrorMessage(false);
      examenService.createExamen({
        id_modele: parseInt(modelData.id),
        id_praticien: praticien,
        id_lieu: lieu,
        id_motif: motif,
        id_profession: specialite,
        fixe: fixedExamPosition ? 1 : 0,
        positionFixed: fixedExamPosition,
        position: 1,
      })
        .then((response) => {
          handleGetExams();
        })
        .catch((error) => {
          setLoading(false)
          setErrorMessage(true);
          if (error.message === "Network Error") {
            dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
          } else {
            dispatch(setError("Une erreur est survenue"))
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

  const handleUpdateExams = () => {
    setLoading(true);
    setErrorMessage(false);
    let idGroup = 0;
    if (groupExamPayload && groupExamPayload.idGroup) {
      idGroup = groupExamPayload.idGroup;
    }
    examenService.updateExamen(examenSelected[examenSelected.id - 1].id_examen, {
      id_modele: parseInt(modelData.id),
      id_praticien: examenSelected.id_praticien ? examenSelected.id_praticien : praticien,
      id_lieu: examenSelected.id_lieu ? examenSelected.id_lieu : lieu,
      id_motif: examenSelected.id_motif ? examenSelected.id_motif : motif,
      id_profession: specialite,
      id_modele_groupe: idGroup,
      fixe: fixedExamPosition ? 1 : 0,
      positionFixed: fixedExamPosition,
      position: examenSelected.position ? examenSelected.position : 1,
    })
      .then(response => {
        setLoading(false)
        setErrorMessage(false);
        dispatch(setError(null));
        dispatch(setComponent(typeScreen.examList));
      })
      .catch(error => {
        setLoading(false)
        setErrorMessage(true);
        if (error.message === "Network Error") {
          dispatch(setError("Erreur de connexion, Vérifiez votre connexion internet"))
        } else {
          dispatch(setError("Une erreur est survenue"))
        }
      })
  }


  const onEditExamen = () => {
    if (mustBeEditable) {
      dispatch(mostBeEditable(false))
      onPrevious()
    } else {
      handleUpdateExams();
    }
    return;
  };
  const onCancel = () => {
    if (isModelGroup) {
      if (formType === typeScreen.examFormEdit) {
        dispatch(setComponent(typeScreen.examList));
        return;
      }
      if (predecessor === typeScreen.examList) {
        dispatch(setComponent(typeScreen.examList));
        return;
      }
      onPrevious && onPrevious();

    } else {
      if (formType === typeScreen.examFormEdit) {
        dispatch(setComponent(typeScreen.examList));
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
    SpecialiteService.getListeSpecialite()
      .then((res) => {
        dispatch(shareSpecialitieData(res.data));
        var data = [{ value: "", text: "Veuillez sélectionner" }]
        res.data.forEach(element => {
          data.push({ value: element.id, text: element.libelle })
        });
        setListSpecialite(data);
      })
      .catch((error) => {
      });

    LieuxService.getListeLieux()
      .then((res) => {
        dispatch(shareLieu(res.data.tabinfo));
        var data = [{ value: "", text: "Veuillez sélectionner" }]
        res.data.tabinfo.forEach(element => {
          data.push({ value: element.id_lieu, text: element.libelle_lieu })
        });
        setListLieu(data);
        dispatch(shareExamData(res))
      })
      .catch((error) => {
      });

    MotifsService.getListeMotif()
      .then((res) => {
        dispatch(shareMotif(res.data.tabinfo));
        var data = [{ value: "", text: "Veuillez sélectionner" }]
        res.data.tabinfo.forEach(element => {
          data.push({ value: element.id_motif_rdv, text: element.libelle_motif_rdv })
        });
        setListMotif(data);
      })
      .catch((error) => {
      });

    PraticiensService.getListePraticien()
      .then((res) => {
        dispatch(sharePraticienData(res.data.tabinfo));
        var data = [{ value: "", text: "Veuillez sélectionner" }]
        res.data.tabinfo.forEach(element => {
          data.push({ value: element.id_praticien, text: element.nom_praticien + " " + element.prenom_praticien })
        });
        setListPraticien(data);
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    if (reload) setReload(false);
    if (
      examenSelected &&
      examenSelected.id &&
      examenSelected.id !== selectedExamId
    ) {
      setSelectedExamId(examenSelected.id);
      updateFormData(false, examenSelected[examenSelected?.indexExam]);
    }
  }, [reload, examenSelected, showEditForm, steps, selectedExamId]);

  useEffect(() => { }, [groupSelected, examsGrouped]);

  return (
    <>
      <ModalWrapper style={styles.modal}>
        <EuiSpacer size="l" />
        <div style={styles.examForm}>
          <div>
            <EuiFlexGroup>
              <EuiFlexItem style={styles.modelContainer}>
                <p style={styles.text}>Modèle:</p>
                <EuiSpacer size="s" />
                <p style={styles.input}>{modelData.modelName}</p>
              </EuiFlexItem>
              {isModelGroup ? (
                <EuiFlexItem>
                  <p>Groupe:</p>
                  <EuiSpacer size="s" />
                  <p>{activeGroup}</p>
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
                <EuiSelect
                  style={styles.input}
                  fullWidth
                  options={listSpecialite}
                  value={specialite}
                  onChange={onChangeSpecialite}
                />
              </EuiFlexItem>
              <EuiFlexItem className="input_left">
                <p style={styles.selectLabel}>Motif* :</p>
                <EuiSpacer size="xs" />
                <EuiSelect
                  fullWidth
                  style={styles.input}
                  options={listMotif}
                  value={motif}
                  onChange={onChangeMotif}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="xl" />
            <EuiFlexGroup>
              <EuiFlexItem>
                <p style={styles.selectLabel}>Praticien :</p>
                <EuiSpacer size="xs" />
                <EuiSelect
                  fullWidth
                  style={styles.input}
                  options={listPraticien}
                  value={praticien}
                  onChange={onChangePraticien}
                />
              </EuiFlexItem>
              <EuiFlexItem className="input_left">
                <p style={styles.selectLabel}>Lieu* :</p>
                <EuiSpacer size="xs" />
                <EuiSelect
                  fullWidth
                  style={styles.input}
                  options={listLieu}
                  value={lieu}
                  onChange={onChangeLieu}
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
                    disabled={motif === "" || lieu === "" || specialite === ""}
                    style={
                      motif === "" || lieu === "" || specialite === ""
                        ? styles.deactivated
                        : styles.activated
                    }
                    onClick={onEditExamen}
                    className="button_next_me"
                  >
                    {loading ?
                      <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress style={{ marginRight: '5px', color: 'white', width: '25px', height: '25px' }} />
                        Enregistrer
                      </Box>
                      : <>Enregistrer</>}

                  </EuiButton>
                </EuiFlexGroup>

              </div>

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
                  {loading ?
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress style={{ marginRight: '5px', color: 'blue', width: '25px', height: '25px' }} />
                      Ajouter
                    </Box>
                    : <>Ajouter</>}
                </EuiButton>
              </EuiFlexGroup>
            )}
            {errorMessage && (
              <>
                <EuiSpacer size="xl" />
                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
              </>
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

const mapStateToProps = ({ ExamenReducer, ModelsReducer, }) => ({
  examsGrouped: ExamenReducer.examsGrouped,
  groupSelected: ExamenReducer.examenSelected,
  activeGroup: ExamenReducer.activeGroup,
  modelData: ModelsReducer.modelData,
  groupWithData: ExamenReducer.groupWithData,
});
export default connect(mapStateToProps)(ExamenForm);
