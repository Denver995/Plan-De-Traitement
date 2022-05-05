import React, { useState } from 'react';
import { connect } from 'react-redux';

import ExamenForm from './ExamenForm';
import ExamsList from './ExamsList';

const ExamenWrapper = ({ activeGroup, isModelGroup, exams }) => {
  const [component, setComponent] = useState('EXAMENFORM');
  console.log('Exams: ', exams);
  return (
    <div>
      {component === 'EXAMENFORM' ? <ExamenForm activeGroup={activeGroup} isModelGroup={isModelGroup} onAddExam={(data) => {
        setComponent(data.name);
    }} /> : <ExamsList exams={exams} onAdd={(data) => setComponent(data)} />}
    </div>
  );
}

const mapStateToProps = ({ ExamenReducer }) => ({
  exams: ExamenReducer.exams,
});

export default connect(mapStateToProps)(ExamenWrapper);