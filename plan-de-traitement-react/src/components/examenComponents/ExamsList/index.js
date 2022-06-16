import React, { useState, useEffect } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiHorizontalRule,
  EuiButton,
} from "@elastic/eui";
import { connect, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { fakeData } from "../../../utils/defaultData";
import { startLoading } from "../../../redux/commons/actions";
import { desactivateStep, addStep } from "../../../redux/steps/actions";
import ExamenItem from "../ExamItem";
import { Plus } from "../../../assets/images";
import styles from "./styles";
import { STEP2, STEP3 } from "../../../utils/constants";
import { getStepByKey, createStep } from "../../../utils/helper";
import colors from "../../../utils/colors";
import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import ModalWrapper from "../../common/ModalWrapper";

const ExamsList = ({ exams, onAdd, steps }) => {
  const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

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
  const colorsArr = ["primaryLight", "danger", "success", "warning"];

  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    const items = Array.from(examsList);
    console.log('items: ', items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setExamsList([...items]);
    console.log('examsList: ', examsList);
  }

  return (
    <>
      {showInterExam ? (
        <EspacementInterExamenForm
          onClose={(data) => setShowInterExam(!data)}
        />
      ) : (
        <ModalWrapper style={styles.modal}>
          <div style={{ marginBottom: 10 }}>
            <EuiFlexGroup>
              <EuiFlexItem style={styles.titleWrapper}>
                <p style = {styles.title}>Modèle:</p>
                <EuiSpacer size="s" />
                <p style = {styles.subtitleWrapper}>Xxxxxxxxxx xxxxxxxxxxx XXXX</p>
              </EuiFlexItem>
              {/* {isModelGroup &&
                        <EuiFlexItem>
                            <p>Groupe:</p>
                            <EuiSpacer size='s' />
                            <p>10000</p>
                        </EuiFlexItem>
                    } */}
            </EuiFlexGroup>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ marginTop: 28, marginBottom: 60 }}
                  >
                    {examsList.length > 0 &&
                      examsList.map((item, index) => (
                        <Draggable key={index} draggableId={'draggable-'+index} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <ExamenItem
                                // color={colors[colorsArr[index]]}
                                exam={item}
                                data={fakeData}
                                index={index}
                                id_modele={item.id_modele}
                              />
                               {index !== exams.length - 1 && (
                                 <span
                                   onClick={() => setShowInterExam(true)}
                                   className="delai-inter-group"
                                 >
                                  Choisir l'intervale inter examen
                                 </span>
                               )}
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
            {exams.length > 2 && (
                  <EuiFlexGroup justifyContent="center">
                    <EuiFlexItem>
                      <EuiButton
                        onClick={onClickNext}
                        style={{ color: "white",  
                        textAlign: "left",
                        letterSpacing: 0,
                        font: "normal normal 600 27px/37px Open Sans",
                        display: "block"
                        }}
                        className="button_finished_new"
                      >
                        Terminer
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                )}
              
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onAdd("EXAMENFORM");
                  }}
                 
                  style={styles.plusBtn}
                >
                  <img style={styles.image} src={Plus} alt="this is a btn" />
                </button>
                
              </div>
            </div>
    
        </ModalWrapper>
      )}
    </>
  );
};

const mapStateToProps = ({ StepReducer }) => ({
  steps: StepReducer.steps,
});
export default connect(mapStateToProps)(ExamsList);
