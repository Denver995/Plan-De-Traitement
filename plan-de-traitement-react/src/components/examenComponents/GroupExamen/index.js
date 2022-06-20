// import '../App.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ExamenItem from "../ExamenItem";
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
  createExamGroup,
  addExamGrouped,
  getSelectedExamGroup,
  setActiveGroup,
  setShowExamForm,
  deleteExamGroup,
} from "../../../redux/examens/actions";
import { setAlert, startLoading } from "../../../redux/commons/actions";

import { fakeData } from "../../../utils/defaultData";
import styles from "./styles";
import colors from "../../../utils/colors";
import ModalWrapper from "../../common/ModalWrapper";
import Propover from "../../Propover";

const GroupItem = ({ groupName, examsGrouped, onAddExamenComp }) => {
  const dispatch = useDispatch();
  const [isPopoverOpen, setPopover] = useState(false);
  const [reRenderDel, setRerenderDel] = useState(false);
  const [groupList, setGroupList] = useState(examsGrouped);
  console.log("groupName 1: ", groupName);
  // const contextMenuPopoverId = useGeneratedHtmlId({
  //     prefix: 'contextMenuPopover',
  // });
  const closePopover = () => setPopover(false);

  const togglePropover = () => {
    setPopover(!isPopoverOpen);
    console.log("toggle propover");
  };

  // const onEdit = () =>  dispatch(editExam(props.data));

  const iconElopse = (
    <span onClick={togglePropover} className="icon-ellipsis-v iconList"></span>
  );

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

  const [toggledGroup, setToggledGroup] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [showInterExam, setShowInterExam] = useState(false);

  const toggle = (index) => {
    let newToggledGroup = toggledGroup;
    newToggledGroup[index] = !toggledGroup[index];
    setToggledGroup(newToggledGroup);
    setRerender(true);
  };

  const onAddExamen = () => dispatch(setShowExamForm(true));
  const onAddExamenNew = (index) => {
    const exam = {
      name: "some name",
    };
    dispatch(addExamGrouped({ exam, index }));
    setRerender(true);
  };

  useEffect(() => {
    let newToggleGrp = [];
    examsGrouped.map((item, i) => {
      newToggleGrp[i] = false;
      return newToggleGrp;
    });
    setToggledGroup(newToggleGrp);
    setGroupList(examsGrouped);
  }, [examsGrouped]);

  useEffect(() => {
    setRerender(false);
    console.log("reRender: ", reRender);
    setRerender(false);
  }, [examsGrouped, reRender, toggledGroup, reRenderDel]);

  // const GroupExamenSummary = ({ nbrGroupe, isModelGroup, examsGrouped }) => {
  //   const dispatch = useDispatch();
  //   const steps = useSelector((state) => state.StepReducer.steps);
  //   const showForm = useSelector((state) => state.CommonReducer.examen.show);

  const colorsArr = ["primaryLight", "danger", "success", "warning"];
  console.log("ExamsGroupedGroupItem: ", examsGrouped);
  return (<>
  {showInterExam ? (
        <EspacementInterExamenForm
          onClose={(data) => setShowInterExam(!data)}
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
          Modéle
        </p>
        <p
          style={{
            font: "normal normal normal 20px/27px Open Sans",
            letterSpacing: 0,
            color: colors.primary,
          }}
        >
          Xxxxxxxxxx xxxxxxxxxxx XXXX
        </p>
      </div>
      {examsGrouped.map((group, index) => (
        <Draggable key={index} draggableId={"draggable-" + index} index={index}>
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
                          isModelGroup={true}
                          onDelete={() => {
                            console.log("data");
                            dispatch(deleteExamGroup({payload: index}));
                            setRerenderDel(true);
                          }}
                          data={{groupeId: groupName, data: examsGrouped}}
                        />
                      </div>
                      <div
                        style={{
                          color: colors.primarySombre,
                          fontWeight: "600",
                        }}
                      >
                        {"Group" + index}
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
                      <p style={{ fontSize: 17, color: colors.primarySombre }}>
                        <pan className="period-recherche-label">
                          Periode de recherche :
                        </pan>{" "}
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
                        <hr className="divisor" color="#5d9ad4" size="1"></hr>
                        <button
                          className="divisor-btn"
                          onClick={() => {
                            dispatch(setShowExamForm(true));
                            dispatch(getSelectedExamGroup(index));
                            dispatch(setActiveGroup(index));
                            onAddExamenNew(index);
                          }}
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
                      {Object.keys(group).map((exam, i) => (
                        <div
                          key={i}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <ExamItem
                            color={colors[colorsArr[i]]}
                            data={exam}
                            exam={exam}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {index !== examsGrouped.length - 1 && (
                  <div style={{ marginLeft: 50 }}>
                    <p
                      onClick={() => setShowInterExam(true)}
                      style={{
                        textDecoration: "underline",
                        font: "normal normal normal 17px/23px Open Sans",
                        letterSpacing: 0,
                        color: colors.primary,
                      }}
                    >
                      Choisir l'intervalle inter groupe
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </div>
    )}
    </>
  );
};

const GroupExamenSummary = ({ nbrGroupe, isModelGroup, examsGrouped }) => {
  const dispatch = useDispatch();
  const [groupList, setGroupList] = useState(examsGrouped);
  const steps = useSelector((state) => state.StepReducer.steps);
  const showForm = useSelector((state) => state.CommonReducer.examen.show);
  const previousStep = getStepByKey(steps, STEP2);
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
    // onPrevious();
    console.log("showform...", showForm);
  }, [showForm]);

  const handleOnDragEnd = (result) => {
    console.log("Handle On Drag");
    if (!result.destination) return;
    const items = Array.from(groupList);
    console.log("items: ", items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGroupList([...items]);
    console.log("nbrGroupe: ", nbrGroupe);
  };
  console.log("nbrGroupe: ", nbrGroupe);
  console.log("examGroupSumm: ", examsGrouped);

  useEffect(() => {
    setGroupList(examsGrouped);
  }, [examsGrouped]);

  return (
    <ModalWrapper style={styles.modal}>
      {showForm ? (
        <ExamenForm isModelGroup={isModelGroup} onPrevious={onPrevious} />
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
                    examsGrouped={groupList}
                    groupName={"Group " + index}
                    key={index}
                    listExam={[]}
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
  groupSelected: ExamenReducer.examenSelected,
});

export default connect(mapStateToProps)(GroupExamenSummary);
