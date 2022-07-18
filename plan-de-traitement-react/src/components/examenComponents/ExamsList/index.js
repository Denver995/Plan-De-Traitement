import {
  EuiButton,
  EuiButtonEmpty, EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { connect, useDispatch, useSelector } from "react-redux";
import { Plus } from "../../../assets/images";
import { startLoading, setComponent, setError } from "../../../redux/commons/actions";
import { CreateEspacementNonGroupe, 
  setActualExamIndex,
  shareAllExams, 
  createExamen, createExamen as createExamenAction,
  addExam,
  storeExams } from "../../../redux/examens/actions";
import { addStep, desactivateStep } from "../../../redux/steps/actions";
import examenService from '../../../services/examens';
import { STEP2, STEP3, typeScreen } from "../../../utils/constants";
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
  actualNonGroupeIndex
}) => {
  const espacementNonGroupe = useSelector(
    (state) => state.ExamenReducer.espacementNonGroupe
  );
  const getAllExams = useSelector((state) => state.ExamenReducer.getAllExams);
  const dispatch = useDispatch();
  const [showInterExam, setShowInterExam] = useState(false);
  const [examsList, setExamsList] = useState(getAllExams);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const previousStep = getStepByKey(steps, STEP2);

  const onClickNext = () => {
    let nextStep = createStep(STEP3);
    nextStep.previousStep = previousStep;
    dispatch(startLoading());
    dispatch(desactivateStep(STEP2));
    dispatch(addStep(nextStep));
  };

 const handleUpdateExams = () => {
    setLoading(true);
    setErrorMessage(false);
    for(var i=0; i<examsList.length; i++){
      examenService.updateExamen(examsList[i][i].id_examen, {
            position: i
    })
    .then(response => {
      setLoading(false)
      setErrorMessage(false);
      dispatch(setError(null));
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
    onClickNext();
  }

  const handleUpdateIndex = (id, index) => {
    setLoading(true);
    setErrorMessage(false);
    examenService.updateExamen(id, {
              position: index,
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

  const handleUpdatePosition = (items, destinationIndex, sourceIndex) => {
    let tabItem = [];
    let itemForDestination;
    let itemForSource;
    for(var i=0; i<items.length; i++){
         itemForDestination = items[i][destinationIndex];
         itemForSource = items[i][sourceIndex];
    }
    tabItem.push(itemForSource);
    tabItem.push(itemForDestination);
    handleUpdateIndex(tabItem[0].id_examen, destinationIndex);
    handleUpdateIndex(tabItem[1].id_examen, sourceIndex);
}

  const handleOnDragEnd = (result) => {
    const items = Array.from(examsList);
    let destination = items[result.destination.index];
    let source = items[result.source.index];
    if (!result.destination) return;

    if (!destination.positionFixed && !source.positionFixed) {
      items.splice(result.destination.index, 1, source);
      items.splice(result.source.index, 1, destination);
      dispatch(storeExams(items));
      handleUpdatePosition(items,result.destination.index,result.source.index);
    }
  };
  const onCancel = () => {
    onAdd("EXAMENFORM");
  };


  const loadingScreen = (show) => {
    setLoading(show);
  }

  const handleGetExams = () => {
    setLoading(true);
    examenService.getExamenByModelId(modelData.id)
      .then((response) => {
        setLoading(false);
        dispatch(shareAllExams(response.data));
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  useEffect(() => {
    setExamsList(exams);
  }, [exams]);
  return (
    <>
      {showInterExam ? (
        <EspacementInterExamenForm
          onClose={(data) => setShowInterExam(!data)}
          initialIndex={actualNonGroupeIndex}
          isModelGroup={false}
        />
      ) : (
        <ModalWrapper style={styles.modal}>
          <div style={styles.contain}>
            <EuiFlexGroup>
              <EuiFlexItem style={styles.titleWrapper}>
                <p style={styles.title}>Modèle:</p>
                <EuiSpacer size="s" />
                <p style={styles.subtitleWrapper}>{modelData.modelName}</p>
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
                    {!loading? examsList.length > 0 &&
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
                                loadingScreen={loadingScreen}
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
                                    ? `Délai entre l'examen ${index} et l'examen ${index + 1
                                    } : ${espacementNonGroupe[
                                      "espaceNonGroupe " + index
                                    ][0].minInterval
                                    } ${espacementNonGroupe[
                                      "espaceNonGroupe " + index
                                    ][0].minIntervalUnit
                                    } - ${espacementNonGroupe[
                                      "espaceNonGroupe " + index
                                    ][0].maxInterval
                                    } ${espacementNonGroupe[
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
                                      ? `Délai entre l'examen ${index} et l'examen ${index + 1
                                      } : ${espacementNonGroupe[
                                        "espaceNonGroupe " + index
                                      ][
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ].length - 1
                                      ].minInterval
                                      } ${espacementNonGroupe[
                                        "espaceNonGroupe " + index
                                      ][
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ].length - 1
                                      ].minIntervalUnit
                                      } - ${espacementNonGroupe[
                                        "espaceNonGroupe " + index
                                      ][
                                        espacementNonGroupe[
                                          "espaceNonGroupe " + index
                                        ].length - 1
                                      ].maxInterval
                                      } ${espacementNonGroupe[
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
                      )): <Box style={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress style={{ margin: '20px auto', color: 'blue', width: '35px', height: '35px' }} />

          </Box>}
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
                onClick={()=>onCancel()}
              >
                Retour
              </EuiButtonEmpty>
              {exams.length > 2 ? (
                <EuiButton
                  style={styles.activated}
                  className="button_next_me"
                  onClick={handleUpdateExams}
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
  actualNonGroupeIndex: ExamenReducer.actualNonGroupeIndex,
});
export default connect(mapStateToProps)(ExamsList);
