import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { setComponent } from "../../../redux/commons/actions";
import RecapitulatifDesExamens from "../RecapitulatifDesExamens";
import GroupExamenSummary from "../GroupExamen";
import ExamenForm from "../ExamenForm";

const GroupWrapper = ({
  componentTodisplay,
  examsGrouped,
  nbrGroupe,
  isModelGroup,
  closeModal,
}) => {
  const [component, setComponentName] = useState(
    componentTodisplay ? componentTodisplay.name : "GROUPSUMMARY"
  );
  const dispatch = useDispatch();

  const onChangeComponent = (name, data = null) => {
    dispatch(setComponent(name, data));
    setComponentName(name);
  };

  console.log("GroupWrapper: ", isModelGroup);

  useEffect(() => {
    if (componentTodisplay && componentTodisplay.name !== component) {
      setComponentName(componentTodisplay.name);
    }
  });

  return (
    <div className="wrapper">
      {component === "GROUPSUMMARY" ? (
        <GroupExamenSummary
          onAddExam={(data) => {
            onChangeComponent(data.name);
          }}
          examsGrouped={examsGrouped}
          nbrGroupe={nbrGroupe}
          isModelGroup={isModelGroup}
        />
      ) : (
        <RecapitulatifDesExamens
          closeModal={closeModal}
          isModelGroup={isModelGroup}
          test={"test"}
          isEditing={true}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ CommonReducer }) => ({
  componentTodisplay: CommonReducer.componentTodisplay,
});

export default connect(mapStateToProps)(GroupWrapper);
