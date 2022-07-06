// import '../App.css';
import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ExamItem from "../ExamItem";
import ExamenForm from "../ExamenForm";
import { STEP3, STEP2 } from "../../../utils/constants";
import { createStep, getStepByKey } from "../../../utils/helper";
import { EuiFlexGroup, EuiButton, EuiButtonEmpty } from "@elastic/eui";
import {
  deleteStep,
  desactivateStep,
  addStep,
} from "../../../redux/steps/actions";
import {
  getSelectedExamGroup,
  setActiveGroup,
  setShowExamForm,
  deleteGroup,
  addExamGrouped,
  toggleFixGroupPosition,
  setIsClose,
  dragAndDrog,
} from "../../../redux/examens/actions";
import { startLoading, stopLoading, setComponent } from "../../../redux/commons/actions";
import styles from "./styles";
import colors from "../../../utils/colors";
import ModelGroupeService from "../../../services/modelGroupe";
import ModalWrapper from "../../common/ModalWrapper";
import Propover from "../../Propover";
import { type_espacement } from "../../../utils/constants";

const getExamByGroupIndex = (group, groupKey) => {
  console.log("group ", group);
  const result = Object.keys(group).length > 0 ? group[groupKey].exams : [];
  console.log("result ", result);
  return result;
};

const GroupItem = ({
  groupName,
  espacement,
  groupWithData,
  openGroup,
  reRender_,
}) => {
  const dispatch = useDispatch();
  const [reRenderDel, setRerenderDel] = useState(false);
  const modelData = useSelector((state) => state.ModelsReducer.modelData);
  const espacementSubExam = useSelector(
    (state) => state.ExamenReducer.espacementSubExam
  );
  const [IsForSubExam, setIsForSubExam] = useState([false, 0, 0]);
  const [toggledGroup, setToggledGroup] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [espace, setEspace] = useState(espacementSubExam);
  const [showInterExam, setShowInterExam] = useState(false);
  const [intervalGroupIndex, setIntervalGroupIndex] = useState(1);
  const [reload, setReload] = useState(false);

  const toggle = (index) => {
    let newToggledGroup = toggledGroup;
    newToggledGroup[index] = !toggledGroup[index];
    setToggledGroup(newToggledGroup);
    setRerender(true);
  };

  const handleGetModelGroups = (id) => {
      dispatch(startLoading());
      ModelGroupeService.getModelGroupe({
        id_modele: modelData.id_modele,
        nom:modelData.nom,
        id_modele_groupe: modelData.id_modele_groupe
      })
      .then((response) => {
        console.log("----GET MY MODEL GROUPS----")
        console.log(response.data)
        dispatch(addExamGrouped(response.data));
        dispatch(stopLoading());
      })
      .catch((error) => {
        dispatch(addExamGrouped({}))
        dispatch(stopLoading());
      });
  }

  const handleDeleteModelGroups = (id) => {
      dispatch(stopLoading());
      ModelGroupeService.deleteModelGroupe(id)
      .then((response) => {
        console.log(response.data)
        dispatch(stopLoading());
      })
      .catch((error) => {
        dispatch(stopLoading())
      });
  }

  const handleUpdateModelGroups = (id) => {
      dispatch(startLoading())
      ModelGroupeService.updateModelGroupe(modelData, id)
      .then((response) => {
        console.log(response.data)
        dispatch(stopLoading())
      })
      .catch((error) => {
         dispatch(stopLoading())
      });
  }

  const handleAddExam = (groupKey) => {
    dispatch(setShowExamForm(true));
    dispatch(getSelectedExamGroup(groupKey));
    dispatch(setActiveGroup(groupKey));
    setRerender(true);
  };

  useEffect(() => {
    handleGetModelGroups();
    let newToggleGrp = [];
    Object.keys(groupWithData).map((item, i) => {
      newToggleGrp[i] = false;
      return newToggleGrp;
    });
    setToggledGroup(newToggleGrp);
  }, [groupWithData, reload]);

  useEffect(() => {
    setRerender(false);
    setRerender(false);
  }, [reRender, toggledGroup, reRenderDel, reRender_]);

  //is handle when click on "Choisir l'intervalle inter groupe"
  const onClickChooseIntervalInterGroupe = (initialIndex) => {
    setShowInterExam(true);
    setIntervalGroupIndex(initialIndex);
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
        />
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
                font: "normal normal normal 20px/27px Open Sans",
                letterSpacing: 0,
                color: colors.primary,
              }}
            >
              {modelData?.nom} {groupName}
            </p>
          </div>
          {Object.keys(groupWithData).map((groupKey, index) => {
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
                                idGroupe={groupKey}
                                isModelGroup={true}
                                onDeleteGroup={() => {
                                  handleDeleteModelGroups(groupKey.id);
                                  dispatch(deleteGroup(groupKey));
                                  setRerenderDel(true);
                                }}
                                data={{
                                  groupKey: groupKey,
                                  data: groupWithData,
                                }}
                                onEditItem={() => {
                                  console.log('editing group ...');
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
                              Groupe {index + 1}
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
                                onClick={() => handleAddExam(groupKey)}
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
                                  return (<div {...provided.droppableProps} ref={provided.innerRef}>
                                    {getExamByGroupIndex(groupWithData, groupKey).map(
                                      (exam, i) => {
                                        return (
                                          <Draggable key={"item-"+i} draggableId={"draggable-" + i} index={i}>
                                            {(provided) => {
                                              return (<div

                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <ExamItem
                                                  setEspacement={setEspacement}
                                                  color={colors[colorsArr[i]]}
                                                  exam={exam}
                                                  id_modele={modelData.id_modele}
                                                  index={i}
                                                  isExamGroup={true}
                                                  groupKey={groupKey}
                                                  setReload={setReload}
                                                  reload={reload}
                                                />
                                                {i !== Object.keys(getExamByGroupIndex(groupWithData, groupKey)).length - 1 &&
                                                  <p
                                                    onClick={() => {
                                                      setIsForSubExam([true, i, index])
                                                      setShowInterExam(true);
                                                    }}
                                                    style={{
                                                      marginLeft: "6%",
                                                      cursor: "pointer",
                                                      textDecoration: "underline",
                                                      fontSize: "17px",
                                                      font: "var(--unnamed-font-style-normal) normal normal 17px/23px var(--unnamed-font-family-open-sans);",
                                                      letterSpacing: 0,
                                                      color: colors.primary,
                                                    }}>
                                                    {(espace && (espace['group ' + index]['subEspace ' + i] ? espace['group ' + index]['subEspace ' + i].length > 0 : false) && espace['group ' + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length - 1].parentSubExamId === index
                                                      && espace['group ' + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length - 1].applyOnAll === false) ?
                                                      `Délai entre l'examen ${i + 1} et l'examen ${i + 2} : ${espace["group " + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length <= 1 ? 0 : espace['group ' + index]['subEspace ' + i].length - 1].minInterval} ${espace["group " + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length <= 1 ? 0 : espace['group ' + index]['subEspace ' + i].length - 1].minIntervalUnit} - ${espace["group " + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length <= 1 ? 0 : espace['group ' + index]['subEspace ' + i].length - 1].maxInterval} ${espace["group " + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length <= 1 ? 0 : espace['group ' + index]['subEspace ' + i].length - 1].minIntervalUnit}`
                                                      : (espace && (espace['group ' + index]['subEspace ' + i] ? espace['group ' + index]['subEspace ' + i].length > 0 : false) && espace['group ' + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length - 1].applyOnAll === true) ?
                                                        `Délai entre l'examen ${i + 1} et l'examen ${i + 2} : ${espace['group ' + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length - 1].minInterval} ${espace['group ' + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length - 1].minIntervalUnit} - ${espace['group ' + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length - 1].maxInterval} ${espace['group ' + index]['subEspace ' + i][espace['group ' + index]['subEspace ' + i].length - 1].minIntervalUnit}`
                                                        :
                                                        "Choisir l'intervalle inter examen"}
                                                  </p>}
                                              </div>)
                                            }}
                                          </Draggable>
                                        );
                                      }
                                    )
                                    }
                                    {provided.placeholder}
                                  </div>)
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
                              onClickChooseIntervalInterGroupe(index)
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
          })}
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
}) => {
  const dispatch = useDispatch();
  const [groupList, setGroupList] = useState(Object.keys(groupWithData));
  const steps = useSelector((state) => state.StepReducer.steps);
  const groupesWithData = useSelector(state => state.ExamenReducer.groupWithData)
  const showForm = useSelector((state) => state.CommonReducer.examen.show);
  const previousStep = getStepByKey(steps, STEP2);
  const [reRender, setRerender] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const onClickNext = () => {
    let nextStep = createStep(STEP3);
    nextStep.previousStep = previousStep;
    dispatch(startLoading());
    dispatch(desactivateStep(STEP2));
    dispatch(addStep(nextStep));
  };

  const onBack = () => dispatch(deleteStep(previousStep));

  const onPrevious = () => {
    dispatch(setShowExamForm(false));
  };

  useEffect(() => {
    setRerender(false);
  }, [showForm, ignored]);

  useEffect(() => {
    setRerender(true);
  }, [reRender]);

  const handleOnDragEnd = (result) => {
    let source = result.source.index;
    let destination = result.destination.index;
    if (!result.destination) return;
    const items = Object.keys(groupWithData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setGroupList([...items]);
    if ((groupesWithData['group ' + source].positionFixed === false && groupesWithData['group ' + destination].positionFixed === false)) {
      dispatch(dragAndDrog({ source, destination }))
    }
    setRerender(true);
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
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {!showForm && (
        <>
          <EuiFlexGroup
            className="btn_group"
            style={{
              margin: 17,
              ...styles.cancelBtn,
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <EuiButton
              fill={true}
              style={{ ...styles.addBtn }}
              className="button_next_me"
              onClick={onClickNext}
            >
              Enregistrer
            </EuiButton>
            <EuiButtonEmpty onClick={onBack} className="button_cancel_me">
              Retour
            </EuiButtonEmpty>
          </EuiFlexGroup>
        </>
      )}
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ExamenReducer }) => ({
  examsGrouped: ExamenReducer.examsGrouped,
  numOfGroups: ExamenReducer.numOfGroups,
  exams: ExamenReducer.exams,
  groupSelected: ExamenReducer.examenSelected,
  espacement: ExamenReducer.espacement,
  groupWithData: ExamenReducer.groupWithData,
  openGroup: ExamenReducer.openGroup,
});

export default connect(mapStateToProps)(GroupExamenSummary);
