import React, { useState } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiHorizontalRule,
  EuiButton,
} from "@elastic/eui";
import { connect, useDispatch} from 'react-redux';

import { fakeData } from "../../../utils/defaultData";
import { startLoading } from '../../../redux/commons/actions';
import { desactivateStep, addStep} from '../../../redux/steps/actions';
import ExamenItem from "../ExamItem";
import { Plus } from "../../../assets/images";
import styles from "./styles";
import { STEP2, STEP3 } from '../../../utils/constants';
import { getStepByKey, createStep } from '../../../utils/helper';
import colors from '../../../utils/colors';
import EspacementInterExamenForm from "../../EspacementInterExamenForm";
import ModalWrapper from "../../common/ModalWrapper";

const ExamsList = ({ exams, onAdd, steps }) => {
  const dispatch = useDispatch();
  const [showInterExam, setShowInterExam] = useState(false);

  const previousStep = getStepByKey(steps, STEP2);
  const onClickNext = () => {
    let nextStep = createStep(STEP3);
    nextStep.previousStep = previousStep;
    dispatch(startLoading());
    dispatch(desactivateStep(STEP2));
    dispatch(addStep(nextStep));
    
  };
  const colorsArr = ['primaryLight', 'danger', 'success', 'warning'];

  return (
    <>
    {showInterExam ? <EspacementInterExamenForm onClose={data => setShowInterExam(!data)}/> : (
      <ModalWrapper style={styles.modal}>
    <div style={{marginBottom: 10}}>
      <EuiFlexGroup>
        <EuiFlexItem style={styles.titleWrapper}>
          <p>Modèle:</p>
          <EuiSpacer size="s" />
          <p>Xxxxxxxxxx xxxxxxxxxxx XXXX</p>
        </EuiFlexItem>
        {/* {isModelGroup &&
                        <EuiFlexItem>
                            <p>Groupe:</p>
                            <EuiSpacer size='s' />
                            <p>10000</p>
                        </EuiFlexItem>
                    } */}
      </EuiFlexGroup>
      <div style={{ marginTop: 28, marginBottom: 60 }}>
        {exams.length > 0 &&
          exams.map((item, index) => (
            <div key={index}>
              <ExamenItem color={colors[colorsArr[index]]} data={fakeData} />
              {index !== exams.length - 1 && <span onClick={() => setShowInterExam(true)} className='delai-inter-group'>Délai entre "l'examen 1" et "l'examen 2" : 1 heure - 2heures</span>}
            </div>
          ))}
      </div>
      <div style={styles.btnContainer}>
        <div style={styles.leftDiv}></div>
        <div style={styles.rightDiv}>
          {exams.length > 2 && <EuiFlexGroup justifyContent="center">
            <EuiFlexItem>
              <EuiButton onClick={onClickNext} style={{color: 'white'}} className="button_finished">
                Terminer
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>}
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
    </div>
    </ModalWrapper>
    )}
    </>
  )
};

const mapStateToProps = ({ StepReducer }) => ({
  steps: StepReducer.steps,
})
export default connect(mapStateToProps)(ExamsList);
