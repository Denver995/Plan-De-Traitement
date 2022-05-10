import React, { useState } from 'react';
import { connect } from 'react-redux';

import ExamenForm from '../ExamenForm';
import ExamsList from '../ExamsList';
import ModalWrapper from '../../common/ModalWrapper';
import styles from './styles';

const ExamenWrapper = ({ activeGroup, isModelGroup, exams }) => {
  const [component, setComponent] = useState('EXAMENFORM');
  console.log('Exams: ', exams);
  return (
    <>
      {component === 'EXAMENFORM' ? <ExamenForm activeGroup={activeGroup} isModelGroup={isModelGroup} onAddExam={(data) => {
        setComponent(data.name);
    }} /> : <ExamsList exams={exams} onAdd={(data) => setComponent(data)} />}
    </>
  );
}

const mapStateToProps = ({ ExamenReducer }) => ({
  exams: ExamenReducer.exams,
});

export default connect(mapStateToProps)(ExamenWrapper);