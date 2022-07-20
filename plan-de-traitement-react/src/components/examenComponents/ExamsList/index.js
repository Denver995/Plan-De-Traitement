import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect, useDispatch, useSelector } from "react-redux";
import { Plus } from "../../../assets/images";
import { startLoading } from "../../../redux/commons/actions";
import {
  CreateEspacementNonGroupe,
  setActualExamIndex,
  storeExams,
} from "../../../redux/examens/actions";
import { addStep, desactivateStep } from "../../../redux/steps/actions";
import examenService from "../../../services/examens";
import { STEP2, STEP3 } from "../../../utils/constants";
import { createStep, getStepByKey } from "../../../utils/helper";
import ModalWrapper from "../../common/ModalWrapper";
import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import ExamItem from "../ExamItem";
import styles from "./styles";

const ExamsList = ({
  exams,
  onAdd,
  steps,
  modelData,
  espacement,
  formType,
  onPrevious,
  predecessor,
  actualNonGroupeIndex,
}) => {
  const espacementNonGroupe = useSelector(
    (state) => state.ExamenReducer.espacementNonGroupe
  );
  const dispatch = useDispatch();
  const [showInterExam, setShowInterExam] = useState(false);
  const [examsList, setExamsList] = useState(exams);

  const previousStep = getStepByKey(steps, STEP2);
  const onClickNext = () => {
    let nextStep = createStep(STEP3);
    nextStep.previousStep = previousStep;
    dispatch(startLoading());
    dispatch(desactivateStep(STEP2));
    dispatch(addStep(nextStep));
  };

  const handleOnDragEnd = (result) => {
    const items = Array.from(examsList);
    let destination = items[result.destination.index];
    let source = items[result.source.index];

    if (!result.destination) return;

    if (!destination.positionFixed && !source.positionFixed) {
      items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, source);
      dispatch(storeExams(items));
    }
  };
  const onCancel = () => {
    onAdd("EXAMENFORM");
  };

  const handleGetExams = () => {
    examenService
      .getAllExamen({})
      .then((response) => {})
      .catch((error) => {});
  };

  useEffect(() => {
    handleGetExams();
    setExamsList(exams);
  }, [exams]);
  return (
    <>
      {showInterExam ? (
        <EspacementInterExamenForm
          onClose={(data) => setShowInterExam(!data)}
          initialIndex={actualNonGroupeIndex}
        />
      ) : (
        <ModalWrapper style={styles.modal}>
          <div style={styles.contain}>
            <EuiFlexGroup>
              <EuiFlexItem style={styles.titleWrapper}>
                <p style={styles.title}>Modèle:</p>
                <EuiSpacer size="s" />
                <p style={styles.subtitleWrapper}>{modelData.nom}</p>
              </EuiFlexItem>
            </EuiFlexGroup>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ marginTop: 20, marginBottom: 10 }}
                  >
                    {examsList.length > 0 &&
                      examsList.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={"draggable-" + index}
                          index={index}
                          isDragDisabled={item.positionFixed}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <ExamItem
                                exam={item}
                                index={index}
                                id_modele={item.id_modele}
                              />
                              <EuiSpacer size="xs" />
                              {index !== examsList.length - 1 && (
                                <span
                                  onClick={() => {
                                    setShowInterExam(true);
                                    dispatch(
                                      CreateEspacementNonGroupe(
                                        exams.length - 1
                                      )
                                    );
                                    dispatch(setActualExamIndex(index));
                                  }}
                                  className="delai-inter-group"
                                >
                                  {espacementNonGroupe &&
                                  espacementNonGroupe[
                                    "espaceNonGroupe " + index
                                  ].length > 0 &&
                                  espacementNonGroupe[
                                    "espaceNonGroupe " + index
                                  ][
                                    espacementNonGroupe[
                                      "espaceNonGroupe " + index
                                    ].length - 1
                                  ].applyOnAll === false
                                    ? `Délai entre l'examen ${
                                        index + 1
                                      } et l'examen ${index + 2} : ${
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ][0].minInterval
                                      } ${
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ][0].minIntervalUnit
                                      } - ${
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ][0].maxInterval
                                      } ${
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ][0].minIntervalUnit
                                      }`
                                    : espacementNonGroupe &&
                                      espacementNonGroupe[
                                        "espaceNonGroupe " + index
                                      ].length > 0 &&
                                      espacementNonGroupe[
                                        "espaceNonGroupe " + index
                                      ][
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ].length - 1
                                      ].applyOnAll === true
                                    ? `Délai entre l'examen ${
                                        index + 1
                                      } et l'examen ${index + 2} : ${
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ][
                                          espacementNonGroupe[
                                            "espaceNonGroupe " + index
                                          ].length - 1
                                        ].minInterval
                                      } ${
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ][
                                          espacementNonGroupe[
                                            "espaceNonGroupe " + index
                                          ].length - 1
                                        ].minIntervalUnit
                                      } - ${
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ][
                                          espacementNonGroupe[
                                            "espaceNonGroupe " + index
                                          ].length - 1
                                        ].maxInterval
                                      } ${
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ][
                                          espacementNonGroupe[
                                            "espaceNonGroupe " + index
                                          ].length - 1
                                        ].minIntervalUnit
                                      }`
                                    : "Choisir l'intervalle inter examen"}
                                </span>
                              )}
                              <EuiSpacer size="xs" />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div style={styles.btnContainer}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onAdd("EXAMENFORM", "EXAMSLIST");
                }}
                style={styles.plusBtn}
              >
                <img style={styles.image} src={Plus} alt="this is a btn" />
              </button>
            </div>
            <EuiSpacer size="xl" />
            <EuiSpacer size="l" />
            <EuiSpacer size="xxl" />
            <EuiSpacer size="xxl" />
          </div>
          <div style={styles.terminer}>
            {/* {exams.length > 2 && (
                <EuiButton onClick={onClickNext} style={styles.btnTerminer}>
                  Terminer
                </EuiButton>
              )} */}
            <EuiFlexGroup
              className="btn_group"
              style={{
                margin: 17,
                ...styles.cancelBtn,
                display: "flex",
                justifyContent: "space-between",
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
              {exams.length > 0 ? (
                <EuiButton
                  style={styles.activated}
                  className="button_next_me"
                  onClick={onClickNext}
                >
                  Terminer
                </EuiButton>
              ) : (
                <EuiButton
                  disabled={true}
                  style={styles.deactivated}
                  className="button_next_me"
                >
                  Terminer
                </EuiButton>
              )}
            </EuiFlexGroup>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

const mapStateToProps = ({ StepReducer, ModelsReducer, ExamenReducer }) => ({
  steps: StepReducer.steps,
  modelData: ModelsReducer.modelData,
  espacement: ExamenReducer.espacement,
  actualNonGroupeIndex: ExamenReducer.actualNonGroupeIndex,
});
export default connect(mapStateToProps)(ExamsList);
