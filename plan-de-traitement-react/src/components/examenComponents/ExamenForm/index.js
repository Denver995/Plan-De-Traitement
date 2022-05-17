import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
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
  deleteStep,
  desactivateStep,
} from "../../../redux/steps/actions";
import { getStepByKey, createStep } from "../../../utils/helper";
import { STEP2, STEP3 } from "../../../utils/constants";
import {
  fakeData,
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
  addExamOnAllGroups,
  getSelectedExamGroup,
  setShowExamForm,
} from "../../../redux/examens/actions";
import { setAlert } from "../../../redux/commons/actions";
import ExamenItem from "../ExamenItem";

import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import "../../../modifierexamen.css";
import colors from "../../../utils/colors";
import styles from "./styles";
import ModalWrapper from "../../common/ModalWrapper";
import Alert from "../../Alert";

const ExamenForm = ({
  isModelGroup,
  onAddExam,
  groupSelected,
  activeGroup,
  examsGrouped,
  onPrevious,
}) => {
  console.log("activeGroup: ", activeGroup);
  const dispatch = useDispatch();
  const model = useSelector((state) => state.CommonReducer.dataSource);
  const fixedExamenCheckboxId = useGeneratedHtmlId({
    prefix: "indeterminateCheckbox",
  });
  const steps = useSelector((state) => state.StepReducer.steps);
  const examenSelected = useSelector(
    (state) => state.CommonReducer.examen.examenSelected
  );
  const [fixedExamPosition, setFixedExamPosition] = useState(false);
  const [listExam, setListExam] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [specialite, setSpecialite] = useState("");
  const [motif, setMotif] = useState("");
  const [praticien, setPraticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [fisrtLoad, setFirstLoad] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [buttonText, setButtonText] = useState({
    cancelText: "Ne pas appliquer",
    confirmText: "Appliquer",
  });

  const colorsArr = ["primaryLight", "danger", "success", "warning"];

  console.log("model ", model);

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

  const createExamenForModeleGroupe = () => {
    /**
     * @todo dispatch creatExamenModelGroup action
     */
    dispatch(
      createExamen({
        nom: "Examen",
        id_modele: 1,
        id_modele_groupe: 1,
        id_praticien: praticien,
        id_profession: 1,
        id_lieu: lieu,
        id_modif: motif,
        fixe: fixedExamPosition ? 1 : 0,
        position: 1,
      })
    );
    dispatch(setShowExamForm(false));
    dispatch(setAlert(false));
  };

  const data = {
    name: "some new data",
  };
  const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
  const alertMessage =
    '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Souhaitez-vous appliquer la modification sur l\'ensemble des groupes ?</EuiText>';

  const onAddExamen = () => {
    if (isModelGroup) {
      dispatch(
        setAlert({
          title: "Enregistrer le modèle",
          message: alertMessage,
          showAlert: true,
          buttonText: button,
          showButtonBlock: true,
          onAccept: () => {
            dispatch(addExamOnAllGroups(data));
          },
          onReject: () => {
            console.log("on reject alert");
            dispatch(addExamGrouped({ index: activeGroup, exam: data }));
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
      const payload = {
        nom: "Examen",
        id_modele: new Date().getTime(),
        color: colors[colorsArr[Math.round(Math.random() * colorsArr.length)]],
        id_praticien: praticien,
        id_profession: 1,
        id_lieu: lieu,
        id_modif: motif,
        fixe: fixedExamPosition ? 1 : 0,
        position: 1,
      };
      dispatch(createExamen(payload));
      setReload(true);
      onAddExam({ name: "EXAMSLIST" });
      dispatch(addExam(payload));
    }
  };

  const updateFormData = (resetFormData, exam = null) => {
    setLieu(resetFormData ? "" : exam?.specialtite);
    setPraticien(resetFormData ? "" : exam?.praticien);
    setMotif(resetFormData ? "" : exam?.motif);
    setSpecialite(resetFormData ? "" : exam?.specialtite);
  };

  const onEditExamen = () => {
    updateFormData(true);
    setShowEditForm(false);
  };

  const onCancel = () => {
    // dispatch(deleteStep(previousStep))
    onPrevious(true);
  };

  const delaiInterExamen = (intervale) => {
    return (
      <EuiFlexGroup>
        <EuiFlexItem className="delaiInterExamen">
          <EuiLink color={"primary"} href="#" onClick={onChooseDelaiEspacement}>
            {/* Délai entre "l'examen 1" et "l'examen 2" : {intervale} */}
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
  }, [reload, examenSelected, showEditForm, steps]);

  useEffect(() => {
    console.log("groupSelected: ", groupSelected);
  }, [groupSelected, examsGrouped]);

  console.log("buttonText: ", button);
  return (
    <>
      {showAlert ? (
        <Alert
          buttonText={buttonText}
          onAccept={() => {
            dispatch(addExamOnAllGroups(data));
            setShowAlert(false);
          }}
          onReject={() => {
            dispatch(addExamGrouped({ index: activeGroup, exam: data }));
            dispatch(setShowExamForm(false));
            // dispatch(setAlert(false))
            setShowAlert(false);
          }}
          showButtonBlock={true}
          message={alertMessage}
        />
      ) : (
        <ModalWrapper style={styles.modal}>
          <div style={{ marginLeft: 40, marginRight: 40 }} className="examForm">
            <div>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <p>Modèle:</p>
                  <EuiSpacer size="s" />
                  <p>Xxxxxxxxxx xxxxxxxxxxx XXXX</p>
                </EuiFlexItem>
                {isModelGroup && (
                  <EuiFlexItem>
                    <p>Groupe:</p>
                    <EuiSpacer size="s" />
                    <p>10000</p>
                  </EuiFlexItem>
                )}
              </EuiFlexGroup>
              <EuiFlexGroup>
                <EuiHorizontalRule className="horizontalRule" />
              </EuiFlexGroup>
            </div>
            {isModelGroup && (
              <div style={{ marginTop: 28, marginBottom: 28 }}>
                {Object.keys(examsGrouped[activeGroup]).length > 0 &&
                  Object.keys(examsGrouped[activeGroup]).map((item, index) => (
                    <div key={index}>
                      <ExamenItem
                        color={colors[colorsArr[index]]}
                        data={fakeData}
                        showEditForm={setShowEditForm}
                      />
                      {delaiInterExamen("1heure - 2heures")}
                    </div>
                  ))}
              </div>
            )}
            <EuiFlexGroup>
              <EuiFlexItem>Examen 1</EuiFlexItem>
            </EuiFlexGroup>
            <EuiForm>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow label="Spécialité*" fullWidth>
                    <EuiSelect
                      fullWidth
                      options={listSpecialite}
                      value={specialite}
                      onChange={onChangeSpecialite}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem className="input_left">
                  <EuiFormRow label="Motif*" fullWidth>
                    <EuiSelect
                      fullWidth
                      options={listMotif}
                      value={motif}
                      onChange={onChangeMotif}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow label="Praticien*" fullWidth>
                    <EuiSelect
                      fullWidth
                      options={listPraticien}
                      value={praticien}
                      onChange={onChangePraticien}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem className="input_left">
                  <EuiFormRow label="Lieu*" fullWidth>
                    <EuiSelect
                      fullWidth
                      options={listLieu}
                      value={lieu}
                      onChange={onChangeLieu}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="m" />
              <EuiCheckbox
                id={fixedExamenCheckboxId}
                label="Fixer la position de l'examen"
                indeterminate={fixedExamPosition}
                onChange={onChangePositionExamen}
              />
              {showEditForm ? (
                <EuiFlexGroup className="btn_group">
                  <EuiButtonEmpty fill="true" className="button_cancel_me">
                    Retour
                  </EuiButtonEmpty>
                  <EuiButton onClick={onEditExamen} className="button_next_me">
                    Enregistrer
                  </EuiButton>
                </EuiFlexGroup>
              ) : (
                <EuiFlexGroup className="btn_group">
                  <EuiButtonEmpty
                    onClick={onCancel}
                    className="button_cancel_small"
                  >
                    Annuler
                  </EuiButtonEmpty>
                  <EuiButton
                    onClick={() => {
                      onAddExamen();
                      dispatch(getSelectedExamGroup(activeGroup));
                      console.log("ajouter");
                    }}
                    className="button_add"
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
                  margin-left: 10%;
                }
              `}
            </style>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

const mapStateToProps = ({ ExamenReducer }) => ({
  examsGrouped: ExamenReducer.examsGrouped,
  groupSelected: ExamenReducer.examenSelected,
  activeGroup: ExamenReducer.activeGroup,
});
export default connect(mapStateToProps)(ExamenForm);
