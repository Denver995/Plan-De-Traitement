import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { deleteStep } from "../../../redux/steps/actions";
import { setComponent } from "../../../redux/commons/actions";
import { getStepByKey } from "../../../utils/helper";
import { STEP2 } from "../../../utils/constants";

import ExamenForm from "../ExamenForm";
import ExamsList from "../ExamsList";

const ExamenWrapper = ({
  activeGroup,
  isModelGroup,
  exams,
  componentTodisplay,
}) => {
  const [component, setComponentName] = useState(
    componentTodisplay ? componentTodisplay.name : "EXAMENFORM"
  );
  const [predecessor, setPredecessor] = useState("");
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const previousStep = getStepByKey(steps, STEP2);

  const onPrevious = () => {
    dispatch(deleteStep(previousStep));
  };

  const onChangeComponent = (name, data = null) => {
    dispatch(setComponent(name, data));
    setComponentName(name);
  };

  console.log("wrapper exams ", exams);

  useEffect(() => {
    if (componentTodisplay && componentTodisplay.name !== component) {
      setComponentName(componentTodisplay.name);
    }
  });

  return (
    <div className="wrapper">
      {component === "EXAMENFORM" || component === "EXAMENFORMEDIT" ? (
        <ExamenForm
          activeGroup={activeGroup}
          isModelGroup={isModelGroup}
          onAddExam={(data) => {
            onChangeComponent(data.name);
          }}
          onPrevious={onPrevious}
          formType={component}
          predecessor={predecessor}
        />
      ) : (
        <ExamsList
          exams={exams}
          onAdd={(data, parent) => {
            onChangeComponent({ name: data });
            setPredecessor(parent);
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ ExamenReducer, CommonReducer }) => ({
  exams: ExamenReducer.exams,
  componentTodisplay: CommonReducer.componentTodisplay,
});

export default connect(mapStateToProps)(ExamenWrapper);
