import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { deleteStep } from "../../../redux/steps/actions";
import { getStepByKey } from "../../../utils/helper";
import { STEP2 } from "../../../utils/constants";

import ExamenForm from '../ExamenForm';
import ExamsList from '../ExamsList';
import ModalWrapper from '../../common/ModalWrapper';
import styles from './styles';

const ExamenWrapper = ({ activeGroup, isModelGroup, exams }) => {
  const [component, setComponent] = useState('EXAMENFORM');
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const previousStep = getStepByKey(steps, STEP2);
  
  const onPrevious = () => {
    dispatch(deleteStep(previousStep));
  }

  return (
    <div className='wrapper'>
      {component === 'EXAMENFORM' ? <ExamenForm activeGroup={activeGroup} isModelGroup={isModelGroup} onAddExam={(data) => {
        setComponent(data.name);}} onPrevious={() => {
          setComponent("EXAMSLIST")
        }} /> : <ExamsList exams={exams} onAdd={(data) => setComponent(data)} />}
    </div>
  );
}

const mapStateToProps = ({ ExamenReducer }) => ({
  exams: ExamenReducer.exams,
});

export default connect(mapStateToProps)(ExamenWrapper);