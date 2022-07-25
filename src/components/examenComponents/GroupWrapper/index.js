import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { setComponent } from "../../../redux/commons/actions";
import GroupExamenSummary from "../GroupExamen";
import RecapitulatifDesExamens from "../RecapitulatifDesExamens";

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

  useEffect(() => {
    if (componentTodisplay && componentTodisplay.name !== component) {
      setComponentName(componentTodisplay.name);
    }
  });

  return (
    <div className="wrapper">
      {component === "GROUPSUMMARY" || component === "EXAMENFORMEDIT" ? (
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