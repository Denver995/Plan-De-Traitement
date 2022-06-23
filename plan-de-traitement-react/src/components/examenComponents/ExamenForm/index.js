import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiSelect,
  EuiButton,
  EuiButtonEmpty,
  EuiCheckbox,
  useGeneratedHtmlId,
  EuiSpacer,
  EuiLink,
  EuiHorizontalRule,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector, connect } from "react-redux";
import { startLoading } from "../../../redux/commons/actions";
import {
  addStep,
  // deleteStep,
  desactivateStep,
} from "../../../redux/steps/actions";
import { createExamen as createExamenAction } from "../../../redux/examens/actions";
import { getStepByKey, createStep } from "../../../utils/helper";
import { STEP2, STEP3 } from "../../../utils/constants";
import { ReactComponent as TracIcon } from "../../../assets/svgs/Trac-39.svg";
import {
  listLieu,
  listMotif,
  listPraticien,
  listSpecialite,
} from "../../../utils/defaultData";
// import { createExamen } from '../../utils/fetcher';
import {
  createExamen,
  addExam,
  addExamGrouped,
  setShowExamForm,
} from "../../../redux/examens/actions";
import { setAlert, setComponent } from "../../../redux/commons/actions";
import ExamItem from "../ExamItem";

import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import "../../../modifierexamen.css";
import colors from "../../../utils/colors";
import styles from "./styles";
import ModalWrapper from "../../common/ModalWrapper";
// import Alert from "../../Alert";
import { useDimension } from "../../../hooks/dimensions";

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
  exams
}) => {
  const dispatch = useDispatch();
  // const model = useSelector((state) => state.CommonReducer.dataSource);
  const fixedExamenCheckboxId = useGeneratedHtmlId({
    prefix: "indeterminateCheckbox",
  });
  const steps = useSelector((state) => state.StepReducer.steps);
  const examenSelected = useSelector(
    (state) => state.CommonReducer.examen.examenSelected
  );
  const [fixedExamPosition, setFixedExamPosition] = useState(false);
  const [listExam, setListExam] = useState([]);
  const [showEditForm, setShowEditForm] = useState(
    formType === "EXAMENFORMEDIT"
  );
  const [reload, setReload] = useState(false);
  const [specialite, setSpecialite] = useState("");
  const [motif, setMotif] = useState("");
  const [praticien, setPraticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const {innerWidth} = useDimension()
  const colorsArr = ["primaryLight", "danger", "success", "warning"];

  const previousStep = getStepByKey(steps, STEP2);

  const onChangePositionExamen = () => {
    setFixedExamPosition(!fixedExamPosition);
  };

  const onChangeSpecialite = (e) => setSpecialite(e.target.value);

  const onChangeMotif = (e) => setMotif(e.target.value);

  const onChangePraticien = (e) => setPraticien(e.target.value);

  const onChangeLieu = (e) => setLieu(e.target.value);

  const onChooseDelaiEspacement = () => {
    dispatch(
      setAlert({
        showAlert: true,
        showCustomComponent: true,
        showButtonBlock: false,
        onAccept: () => {
          dispatch(setAlert(false));
        },
        onReject: () => {
          dispatch(setAlert(false));
        },
        componentType: () => {
          return <EspacementInterExamenForm />;
        },
      })
    );
  };

  const onClickNext = (index, isGroup = false) => {
    if (!isGroup) {
      let nextStep = createStep(STEP3);
      nextStep.previousStep = previousStep;
      dispatch(startLoading());
      dispatch(desactivateStep(STEP2));
      dispatch(addStep(nextStep));
    }
    const exam = {
      name: "some name",
    };
    dispatch(addExamGrouped({ exam, index }));
  };

  const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
  const alertMessage =
    '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Souhaitez-vous appliquer la modification sur l\'ensemble des groupes ?</EuiText>';

  const onAddExamen = () => {
    const payload = {
      nom: modelData.nom,
      id_modele: modelData.id_modele,
      color: colors[colorsArr[Math.round(Math.random() * colorsArr.length)]],
      id_praticien: praticien,
      id_profession: 1,
      id_lieu: lieu,
      id_modif: motif,
      fixe: fixedExamPosition ? 1 : 0,
      position: 1
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
          onAccept: () => {
            console.log('inside all ');
            payload.allGroup = true;
            dispatch(addExam({ index: activeGroup, exam: payload }));
            dispatch(setShowExamForm(false));
            dispatch(setAlert(false));
          },
          onReject: () => {
            console.log('inside not all ');
            payload.allGroup = false;
            dispatch(addExam({ index: activeGroup, exam: payload }));
            dispatch(setShowExamForm(false));
            dispatch(setAlert(false));
          },
        })
      );
    } else {
      listExam.push(listExam.length++);
      setListExam(listExam);
      /**
       * @todo dispatch creatExamen action
       */
      dispatch(createExamen(payload));
      setReload(true);
      onAddExam({ name: "EXAMSLIST" });
      dispatch(addExam(payload));
      dispatch(createExamenAction(payload));
    }
  };

  const updateFormData = (resetFormData, exam = null) => {
    setLieu(resetFormData ? "" : exam?.specialtite);
    setPraticien(resetFormData ? "" : exam?.praticien);
    setMotif(resetFormData ? "" : exam?.motif);
    setSpecialite(resetFormData ? "" : exam?.specialtite);
  };

  const onEditExamen = () => {
    dispatch(setComponent("EXAMSLIST"));
    return;
  };

  const onCancel = () => {
    if (formType === "EXAMENFORMEDIT") {
      dispatch(setComponent("EXAMSLIST"));
      return;
    }
    onPrevious && onPrevious();
  };

  const delaiInterExamen = (intervale) => {
    return (
      <EuiFlexGroup>
        <EuiFlexItem className="delaiInterExamen">
          <EuiLink style={{cursor : "default"}} color={"primary"} href="#" onClick={onChooseDelaiEspacement}>
            Choisir l'intervale inter examen
          </EuiLink>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  useEffect(() => {
    if (reload) setReload(false);
    if (examenSelected.id && examenSelected.id !== selectedExamId) {
      setSelectedExamId(examenSelected.id);
      updateFormData(examenSelected, false);
    }
  }, [reload, examenSelected, showEditForm, steps, selectedExamId]);

  useEffect(() => {
    console.log("groupSelected: ", groupSelected);
  }, [groupSelected, examsGrouped]);

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
                <p style={styles.input}>{modelData.nom}</p>
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
          {isModelGroup ? (
            <div style={{ marginTop: 28, marginBottom: 28 }}>
              {handleGetExamByGroupIndex(exams, activeGroup).map((item, index) => (
                  <div key={index}>
                    <ExamItem
                      color={item.color}
                      data={item}
                      showEditForm={setShowEditForm}
                      exam={item}
                      id_modele={item.id_modele}
                    />
                    {/* {delaiInterExamen("1heure - 2heures")} */}
                  </div>
                ))}
            </div>
          ) : null}
          <EuiFlexGroup style={styles.titleContainer}>
            <TracIcon width={"1rem"} />
            <EuiFlexItem style={styles.examTitle}>Examen {isModelGroup && Object.keys(examsGrouped[activeGroup]).length+1}</EuiFlexItem>
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
                <p style={styles.selectLabel}>Praticien* :</p>
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
              <EuiFlexGroup className="btn_group" style={{flexDirection: innerWidth < 768 ? "column-reverse" : ""}}>
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
                  style={(motif === "" || lieu === "" || specialite === "") ? styles.deactivated : styles.activated}
                  onClick={onEditExamen} className="button_next_me">
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
                  style={{...styles.cancelBtn, marginRight: innerWidth >= 768 ? 50 : 0 }}
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
                  Ajouter
                </EuiButton>
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
  exams: ExamenReducer.exams,
});
export default connect(mapStateToProps)(ExamenForm);