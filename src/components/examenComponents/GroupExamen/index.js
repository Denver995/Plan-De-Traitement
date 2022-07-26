import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiSpacer,
} from "@elastic/eui";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useReducer, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect, useDispatch, useSelector } from "react-redux";
import { setError } from "../../../redux/commons/actions";
import {
  deleteGroup,
  dragAndDrog,
  getSelectedExamGroup,
  setActiveGroup,
  setIsClose,
  setShowExamForm,
  SetShowGroupeContentForUpdate,
  shareGroupExamPayload,
  toggleFixGroupPosition,
} from "../../../redux/examens/actions";
import {
  addStep,
  deleteStep,
  desactivateStep,
} from "../../../redux/steps/actions";
import ModelGroupeService from "../../../services/modelGroupe";
import ModelService from "../../../services/models";
import colors from "../../../utils/colors";
import { STEP2, STEP3, type_espacement } from "../../../utils/constants";
import { createStep, getStepByKey } from "../../../utils/helper";
import ModalWrapper from "../../common/ModalWrapper";
import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import PeriodeRechercheForm from "../../PeriodeRecherche";
import Propover from "../../Propover";
import ExamenForm from "../ExamenForm";
import ExamItem from "../ExamItem";
import styles from "./styles";

const getExamByGroupIndex = (group, groupKey) => {
  const result = Object.keys(group).length > 0 ? group[groupKey]?.exams : [];
  return result;
};

const GroupItem = ({
  groupName,
  espacement,
  groupWithData,
  groupPayload,
  openGroup,
  reRender_,
  showPeriodForm,
}) => {
  const dispatch = useDispatch();
  const [reRenderDel, setRerenderDel] = useState(false);
  const modelData = useSelector((state) => state.ModelsReducer.modelData);
  const espacementSubExam = useSelector(
    (state) => state.ExamenReducer.espacementSubExam
  );
  const [IsForSubExam, setIsForSubExam] = useState([false, 0, 0]);
  const [toggledGroup, setToggledGroup] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [espace, setEspace] = useState(espacementSubExam);
  const [showInterExam, setShowInterExam] = useState(false);
  const [intervalGroupIndex, setIntervalGroupIndex] = useState(1);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialGroupId, setInitialGroupId] = useState(1);

  const toggle = (index) => {
    let newToggledGroup = toggledGroup;
    newToggledGroup[index] = !toggledGroup[index];
    setToggledGroup(newToggledGroup);
    setReRender(true);
  };

  const handleAddExam = (groupKey, id) => {
    dispatch(shareGroupExamPayload({ idGroup: id }));
    dispatch(setShowExamForm(true));
    dispatch(getSelectedExamGroup(groupKey));
    dispatch(setActiveGroup(groupKey));
    setReRender(true);
  };

  const handleDeleteGroup = (id, groupKey) => {
    setLoading(true);
    ModelGroupeService.deleteModelGroupe(id)
      .then((response) => {
        setLoading(false);
        dispatch(deleteGroup(groupKey));
        setRerenderDel(true);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let newToggleGrp = [];
    Object.keys(groupWithData).map((item, i) => {
      newToggleGrp[i] = false;
      return newToggleGrp;
    });
    setToggledGroup(newToggleGrp);
  }, [groupWithData, reload]);

  useEffect(() => {
    setReRender(false);
    setReRender(false);
  }, [reRender, toggledGroup, reRenderDel, reRender_]);

  //is handle when click on "Choisir l'intervalle inter groupe"
  const onClickChooseIntervalInterGroupe = (initialIndex, id) => {
    setShowInterExam(true);
    setIntervalGroupIndex(initialIndex);
    setInitialGroupId(id);
  };

  const setEspacement = () => {
    setEspace(espacementSubExam);
  };

  useEffect(() => {
    if (typeof openGroup === "object") {
      for (let index = 0; index < openGroup.length; index++) {
        toggle(openGroup[index]);
      }
      // dispatch(setIsClose());
      return;
    }

    if (typeof openGroup === "number") {
      toggle(openGroup);
      dispatch(setIsClose());
    }
  }, [openGroup]);

  const colorsArr = ["primaryLight", "danger", "success", "warning"];
  return (
    <>
      {showInterExam ? (
        <EspacementInterExamenForm
          onClose={(data) => setShowInterExam(!data)}
          forSubExam={IsForSubExam[0]}
          typeEspacement={
            !IsForSubExam[0] ? type_espacement.group : type_espacement.examen
          }
          initialIndex={!IsForSubExam[0] ? intervalGroupIndex : IsForSubExam[1]}
          parentSubExamId={IsForSubExam[2]}
          initialId={initialGroupId}
        />
      ) : showPeriodForm ? (
        <PeriodeRechercheForm />
      ) : (
        <div style={styles.container} className="contain">
          <div style={{ marginLeft: 30, marginTop: 28, marginBottom: 20 }}>
            <p
              style={{
                font: "normal normal bold 14px/19px Open Sans",
                letterSpacing: 0,
                color: colors.blackClaire,
              }}
            >
              Modèle
            </p>
            <p
              style={{
                fontSize: "20px",
                letterSpacing: 0,
                color: colors.primary,
              }}
            >
              {modelData?.nom}
            </p>
          </div>
          {!loading ? (
            Object.keys(groupWithData).map((groupKey, index) => {
              return (
                <Draggable
                  disableInteractiveElementBlocking={false}
                  key={index}
                  draggableId={"draggable-" + index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div key={index}>
                        <div className="groups-content">
                          <div className="group-exam-item">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 50,
                              }}
                            >
                              <div style={{ marginRight: 25 }}>
                                <Propover
                                  isOnGroupe={true}
                                  idGroupe={groupKey}
                                  isModelGroup={true}
                                  idGroup={
                                    groupWithData[groupKey]?.payload
                                      ?.id_modele_groupe
                                  }
                                  onDeleteGroup={() => {
                                    handleDeleteGroup(
                                      groupWithData[groupKey]?.payload
                                        ?.id_modele_groupe,
                                      groupKey
                                    );
                                  }}
                                  data={{
                                    groupKey: groupKey,
                                    data: groupWithData,
                                  }}
                                  onEditItem={() => {
                                    // dispatch(
                                    //   setComponent({
                                    //     name: "RECAPITULATIF",
                                    //     data: {
                                    //       groupKey: groupKey,
                                    //       data: groupWithData,
                                    //     },
                                    //   })
                                    // );
                                  }}
                                  onFixePosition={() => {
                                    dispatch(
                                      toggleFixGroupPosition({
                                        selectedGroup: groupKey,
                                      })
                                    );
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  color: colors.primarySombre,
                                  fontWeight: "600",
                                }}
                              >
                                {groupWithData[groupKey]?.payload &&
                                  groupWithData[groupKey]?.payload?.nom}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginRight: 30,
                              }}
                            >
                              <p
                                style={{
                                  fontSize: 17,
                                  color: colors.primarySombre,
                                }}
                              >
                                <span className="period-recherche-label">
                                  Periode de recherche :
                                </span>{" "}
                                00h
                              </p>
                              {toggledGroup[index] ? (
                                <ArrowDropUpIcon
                                  onClick={() => toggle(index)}
                                  style={{ cursor: "pointer" }}
                                />
                              ) : (
                                <ArrowDropDownIcon
                                  onClick={() => toggle(index)}
                                  style={{ cursor: "pointer" }}
                                />
                              )}
                            </div>
                          </div>

                          {toggledGroup[index] && (
                            <div className="exams">
                              <div style={{ marginBottom: "20px" }}>
                                <hr
                                  className="divisor"
                                  color="#5d9ad4"
                                  size="1"
                                ></hr>
                                <button
                                  className="divisor-btn"
                                  onClick={() =>
                                    handleAddExam(
                                      groupKey,
                                      groupWithData[groupKey]?.payload
                                        ?.id_modele_groupe
                                    )
                                  }
                                >
                                  <span
                                    className="dividor-btn-icon"
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: 25,
                                      marginRight: 5,
                                    }}
                                  >
                                    +
                                  </span>
                                  <span
                                    className="dividor-btn-text"
                                    style={{ marginTop: 4 }}
                                  >
                                    Ajouter un examen
                                  </span>
                                </button>
                              </div>
                              <DragDropContext>
                                <Droppable droppableId="exams">
                                  {(provided) => {
                                    return (
                                      <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                      >
                                        {getExamByGroupIndex(
                                          groupWithData,
                                          groupKey
                                        )?.map((exam, i) => {
                                          return (
                                            <Draggable
                                              key={"item-" + i}
                                              draggableId={"draggable-" + i}
                                              index={i}
                                            >
                                              {(provided) => {
                                                return (
                                                  <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                    }}
                                                  >
                                                    <ExamItem
                                                      setEspacement={
                                                        setEspacement
                                                      }
                                                      color={
                                                        colors[colorsArr[i]]
                                                      }
                                                      exam={exam}
                                                      id_modele={
                                                        modelData.id_modele
                                                      }
                                                      index={i}
                                                      isExamGroup={true}
                                                      groupKey={groupKey}
                                                      setReload={setReload}
                                                      reload={reload}
                                                    />
                                                    {i !==
                                                      Object.keys(
                                                        getExamByGroupIndex(
                                                          groupWithData,
                                                          groupKey
                                                        )
                                                      ).length -
                                                        1 && (
                                                      <p
                                                        onClick={() => {
                                                          setIsForSubExam([
                                                            true,
                                                            i,
                                                            index,
                                                          ]);
                                                          setShowInterExam(
                                                            true
                                                          );
                                                        }}
                                                        style={{
                                                          marginLeft: "6%",
                                                          cursor: "pointer",
                                                          textDecoration:
                                                            "underline",
                                                          fontSize: "15px",
                                                          font: "var(--unnamed-font-style-normal) normal normal 15px/20px var(--unnamed-font-family-open-sans);",
                                                          letterSpacing: 0,
                                                          color: colors.primary,
                                                        }}
                                                      >
                                                        {espace &&
                                                        espace[
                                                          "group " + index
                                                        ] &&
                                                        espace[
                                                          "group " + index
                                                        ]["subEspace " + i] &&
                                                        espace[
                                                          "group " + index
                                                        ]["subEspace " + i]
                                                          ?.length > 0 &&
                                                        espace[
                                                          "group " + index
                                                        ]["subEspace " + i][
                                                          espace[
                                                            "group " + index
                                                          ]["subEspace " + i]
                                                            .length - 1
                                                        ].parentSubExamId ===
                                                          index &&
                                                        espace[
                                                          "group " + index
                                                        ]["subEspace " + i][
                                                          espace[
                                                            "group " + index
                                                          ]["subEspace " + i]
                                                            .length - 1
                                                        ].applyOnAll === false
                                                          ? `Délai entre l'examen ${
                                                              i + 1
                                                            } et l'examen ${
                                                              i + 2
                                                            } : ${
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ][
                                                                espace[
                                                                  "group " +
                                                                    index
                                                                ][
                                                                  "subEspace " +
                                                                    i
                                                                ].length <= 1
                                                                  ? 0
                                                                  : espace[
                                                                      "group " +
                                                                        index
                                                                    ][
                                                                      "subEspace " +
                                                                        i
                                                                    ].length - 1
                                                              ].minInterval
                                                            } ${
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ][
                                                                espace[
                                                                  "group " +
                                                                    index
                                                                ][
                                                                  "subEspace " +
                                                                    i
                                                                ].length <= 1
                                                                  ? 0
                                                                  : espace[
                                                                      "group " +
                                                                        index
                                                                    ][
                                                                      "subEspace " +
                                                                        i
                                                                    ].length - 1
                                                              ].minIntervalUnit
                                                            } - ${
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ][
                                                                espace[
                                                                  "group " +
                                                                    index
                                                                ][
                                                                  "subEspace " +
                                                                    i
                                                                ].length <= 1
                                                                  ? 0
                                                                  : espace[
                                                                      "group " +
                                                                        index
                                                                    ][
                                                                      "subEspace " +
                                                                        i
                                                                    ].length - 1
                                                              ].maxInterval
                                                            } ${
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ][
                                                                espace[
                                                                  "group " +
                                                                    index
                                                                ][
                                                                  "subEspace " +
                                                                    i
                                                                ].length <= 1
                                                                  ? 0
                                                                  : espace[
                                                                      "group " +
                                                                        index
                                                                    ][
                                                                      "subEspace " +
                                                                        i
                                                                    ].length - 1
                                                              ].minIntervalUnit
                                                            }`
                                                          : espace &&
                                                            espace[
                                                              "group " + index
                                                            ] &&
                                                            espace[
                                                              "group " + index
                                                            ][
                                                              "subEspace " + i
                                                            ] &&
                                                            espace[
                                                              "group " + index
                                                            ]["subEspace " + i]
                                                              ?.length > 0 &&
                                                            espace[
                                                              "group " + index
                                                            ]["subEspace " + i][
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ]?.length - 1
                                                            ].applyOnAll ===
                                                              true
                                                          ? `Délai entre l'examen ${
                                                              i + 1
                                                            } et l'examen ${
                                                              i + 2
                                                            } : ${
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ][
                                                                espace[
                                                                  "group " +
                                                                    index
                                                                ][
                                                                  "subEspace " +
                                                                    i
                                                                ].length - 1
                                                              ].minInterval
                                                            } ${
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ][
                                                                espace[
                                                                  "group " +
                                                                    index
                                                                ][
                                                                  "subEspace " +
                                                                    i
                                                                ].length - 1
                                                              ].minIntervalUnit
                                                            } - ${
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ][
                                                                espace[
                                                                  "group " +
                                                                    index
                                                                ][
                                                                  "subEspace " +
                                                                    i
                                                                ].length - 1
                                                              ].maxInterval
                                                            } ${
                                                              espace[
                                                                "group " + index
                                                              ][
                                                                "subEspace " + i
                                                              ][
                                                                espace[
                                                                  "group " +
                                                                    index
                                                                ][
                                                                  "subEspace " +
                                                                    i
                                                                ].length - 1
                                                              ].minIntervalUnit
                                                            }`
                                                          : "Choisir l'intervalle inter examen"}
                                                      </p>
                                                    )}
                                                  </div>
                                                );
                                              }}
                                            </Draggable>
                                          );
                                        })}
                                        {provided.placeholder}
                                      </div>
                                    );
                                  }}
                                </Droppable>
                              </DragDropContext>
                            </div>
                          )}
                        </div>
                        {index !== Object.keys(groupWithData).length - 1 && (
                          <div style={{ marginLeft: 50 }}>
                            <p
                              onClick={() =>
                                onClickChooseIntervalInterGroupe(
                                  index,
                                  groupWithData[groupKey]?.payload
                                    ?.id_modele_groupe
                                )
                              }
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                fontSize: "17px",
                                font: "var(--unnamed-font-style-normal) normal normal 17px/23px var(--unnamed-font-family-open-sans);",
                                letterSpacing: 0,
                                color: colors.primary,
                              }}
                            >
                              {espacement &&
                              espacement["espace " + index] &&
                              espacement["espace " + index].length > 0 &&
                              espacement["espace " + index][
                                espacement["espace " + index].length - 1
                              ].applyOnAll === false
                                ? `Délai entre le groupe ${index} et le groupe ${
                                    index + 1
                                  } : ${
                                    espacement["espace " + index][0].minInterval
                                  } ${
                                    espacement["espace " + index][0]
                                      .minIntervalUnit
                                  } - ${
                                    espacement["espace " + index][0].maxInterval
                                  } ${
                                    espacement["espace " + index][0]
                                      .minIntervalUnit
                                  }`
                                : espacement &&
                                  espacement["espace " + index] &&
                                  espacement["espace " + index].length > 0 &&
                                  espacement["espace " + index][
                                    espacement["espace " + index].length - 1
                                  ].applyOnAll === true
                                ? `Délai entre le groupe ${index} et le groupe ${
                                    index + 1
                                  } : ${
                                    espacement["espace " + index][
                                      espacement["espace " + index].length - 1
                                    ].minInterval
                                  } ${
                                    espacement["espace " + index][
                                      espacement["espace " + index].length - 1
                                    ].minIntervalUnit
                                  } - ${
                                    espacement["espace " + index][
                                      espacement["espace " + index].length - 1
                                    ].maxInterval
                                  } ${
                                    espacement["espace " + index][
                                      espacement["espace " + index].length - 1
                                    ].minIntervalUnit
                                  }`
                                : "Choisir l'intervalle inter groupe"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })
          ) : (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <CircularProgress
                style={{
                  margin: "20px auto",
                  color: "blue",
                  width: "35px",
                  height: "35px",
                }}
              />
            </Box>
          )}
        </div>
      )}
    </>
  );
};

const GroupExamenSummary = ({
  nbrGroupe,
  groupWithData,
  examsGrouped,
  espacement,
  openGroup,
  showPeriodForm,
}) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const modelData = useSelector((state) => state.ModelsReducer.modelData);
  const error = useSelector((state) => state.CommonReducer.error);
  const groupesWithData = useSelector(
    (state) => state.ExamenReducer.groupWithData
  );
  const showForm = useSelector((state) => state.CommonReducer.examen.show);
  const previousStep = getStepByKey(steps, STEP2);
  const [reRender, setReRender] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleUpdateModele = () => {
    setLoading(true);
    ModelService.updateModele(modelData.id, { complet: true })
      .then((response) => {
        setLoading(false);
        dispatch(setError(null));
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
    let nextStep = createStep(STEP3);
    nextStep.previousStep = previousStep;
    dispatch(desactivateStep(STEP2));
    dispatch(addStep(nextStep));
    dispatch(SetShowGroupeContentForUpdate(-1));
  };

  const onClickNext = () => {
    handleUpdateModele();
  };

  const onBack = () => dispatch(deleteStep(previousStep));

  const onPrevious = () => {
    dispatch(setShowExamForm(false));
  };

  const canContinue = useCallback(() => {
    let can = false;
    let number = 0;
    let groupesWithDataKeys = Object.keys(groupesWithData);
    for (var i = 0; i < groupesWithDataKeys.length; i++) {
      if (groupesWithData["group " + i]?.exams?.length > 0) {
        number = number + 1;
      }
    }
    if (number === groupesWithDataKeys.length) {
      can = true;
    }
    return can;
  });

  useEffect(() => {
    setReRender(false);
    setDisable(canContinue());
  }, [showForm, ignored, canContinue]);

  useEffect(() => {
    setReRender(true);
    setDisable(canContinue());
  }, [reRender, disable, setDisable, canContinue]);

  const handleOnDragEnd = (result) => {
    let source = result.source.index;
    let destination = result.destination.index;
    if (!result.destination) return;
    const items = Object.keys(groupWithData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    if (
      groupesWithData["group " + source].positionFixed === false &&
      groupesWithData["group " + destination].positionFixed === false
    ) {
      dispatch(dragAndDrog({ source, destination }));
    }
    setReRender(true);
    forceUpdate();
  };

  return (
    <ModalWrapper style={styles.modal}>
      {showForm ? (
        <ExamenForm
          isModelGroup={true}
          onPrevious={onPrevious}
          handleGetExamByGroupIndex={getExamByGroupIndex}
        />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ marginTop: 28, marginBottom: 60 }}
              >
                {[...Array(nbrGroupe).keys()].map((item, index) => (
                  <GroupItem
                    reRender_={reRender}
                    groupName={"Group " + index + 1}
                    key={index}
                    espacement={espacement}
                    groupWithData={groupWithData}
                    openGroup={openGroup}
                    showPeriodForm={showPeriodForm}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {groupWithData["group 0"] === undefined && (
        <div style={styles.loader}>
          <EuiLoadingSpinner size="xxl" color={colors.primary} />
        </div>
      )}

      {!showForm && (
        <>
          <EuiFlexGroup
            className="btn_group"
            style={{
              margin: 17,
              ...styles.cancelBtn,
              display: "flex",
              flexDirection: disable ? "row-reverse" : "row",
              justifyContent: disable ? "space-between" : "",
            }}
          >
            {disable && (
              <EuiButton
                fill={true}
                style={{
                  ...styles.addBtn,
                  visibility:
                    groupWithData["group 0"] === undefined
                      ? "hidden"
                      : "visible",
                }}
                className="button_next_me"
                onClick={onClickNext}
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
            )}
            <EuiButtonEmpty onClick={onBack} className="button_cancel_me">
              Retour
            </EuiButtonEmpty>
          </EuiFlexGroup>
        </>
      )}
      {errorMessage && (
        <>
          <EuiSpacer size="xl" />
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        </>
      )}
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ExamenReducer, CommonReducer }) => ({
  examsGrouped: ExamenReducer.examsGrouped,
  numOfGroups: ExamenReducer.numOfGroups,
  exams: ExamenReducer.exams,
  groupSelected: ExamenReducer.examenSelected,
  espacement: ExamenReducer.espacement,
  groupWithData: ExamenReducer.groupWithData,
  openGroup: ExamenReducer.openGroup,
  dataModeleUpdate: ExamenReducer.dataModeleUpdate,
  showPeriodForm: CommonReducer.showPeriodForm,
});

export default connect(mapStateToProps)(GroupExamenSummary);
