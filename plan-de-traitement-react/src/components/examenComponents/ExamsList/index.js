import React, { useState, useEffect } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiButton,
  EuiButtonEmpty,
} from "@elastic/eui";
import { connect, useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { startLoading } from "../../../redux/commons/actions";
import { desactivateStep, addStep } from "../../../redux/steps/actions";
import ExamItem from "../ExamItem";
import { Plus } from "../../../assets/images";
import styles from "./styles";
import { STEP2, STEP3 } from "../../../utils/constants";
import { getStepByKey, createStep } from "../../../utils/helper";
import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import ModalWrapper from "../../common/ModalWrapper";
import { CreateEspacementNonGroupe, setActualExamIndex } from "../../../redux/examens/actions";
import examenService from '../../../services/examens';


const ExamsList = ({ exams, onAdd, steps, modelData, espacement, formType, onPrevious, predecessor }) => {
  const espacementNonGroupe = useSelector(state => state.ExamenReducer.espacementNonGroupe)
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
    if (!result.destination) return;
    const items = Array.from(examsList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setExamsList([...items]);
  };
  const onCancel = () => {
    // dispatch(deleteStep(previousStep));
    onAdd("EXAMENFORM");
  };

  const handleGetExams = () => {
    console.log("MY EXAMS");
    console.log(exams);
   /*const payload = { id_examen, 
      Nom, 
      id_modele_groupe, 
      id_modele, 
      id_praticien, 
      id_motif, 
      id_lieu,fixe,
      position
 
    }*/
    examenService.getExamen({})
    .then((response) => {
      console.log("response data for get exams");
      console.log(response.data)
    })
    .catch((error) => {
      console.log("error response data");
      console.log(error)
    });
  }

  useEffect(() => {
    handleGetExams();
    setExamsList(exams);
  }, [exams]);
  return (
    <>
      {showInterExam ? (
        <EspacementInterExamenForm
          onClose={(data) => setShowInterExam(!data)}
        />
      ) : (
        <ModalWrapper style={styles.modal}>
          <div style={styles.contain}>
            <EuiFlexGroup>
              <EuiFlexItem style={styles.titleWrapper}>
                <p style={styles.title}>Modèle:</p>
                <EuiSpacer size="s" />
                <p style={styles.subtitleWrapper}>
                  {modelData.nom}
                </p>
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
                                    dispatch(CreateEspacementNonGroupe(exams.length - 1));
                                    dispatch(setActualExamIndex(index));
                                  }}
                                  className="delai-inter-group"
                                >
                                  {(espacementNonGroupe && espacementNonGroupe['espaceNonGroupe ' + index].length > 0
                                    && espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].applyOnAll === false) ?
                                    `Délai entre l'examen ${index} et l'examen ${index + 1} : ${espacementNonGroupe["espaceNonGroupe " + index][0].minInterval} ${espacementNonGroupe["espaceNonGroupe " + index][0].minIntervalUnit} - ${espacementNonGroupe["espaceNonGroupe " + index][0].maxInterval} ${espacementNonGroupe["espaceNonGroupe " + index][0].minIntervalUnit}`
                                    : (espacementNonGroupe && espacementNonGroupe['espaceNonGroupe ' + index].length > 0 && espacementNonGroupe['espaceNonGroupe ' + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].applyOnAll === true) ?
                                      `Délai entre l'examen ${index} et l'examen ${index + 1} : ${espacementNonGroupe["espaceNonGroupe " + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minInterval} ${espacementNonGroupe["espaceNonGroupe " + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minIntervalUnit} - ${espacementNonGroupe["espaceNonGroupe " + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].maxInterval} ${espacementNonGroupe["espaceNonGroupe " + index][espacementNonGroupe['espaceNonGroupe ' + index].length - 1].minIntervalUnit}`
                                      :
                                      "Choisir l'intervalle inter examen"}
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
              {exams.length > 2 ? (
                <EuiButton
                  style={styles.activated}
                  className="button_next_me"
                  onClick={onClickNext}
                >

                  Terminer
                </EuiButton>
              ) : (
                <EuiButton
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
});
export default connect(mapStateToProps)(ExamsList);
