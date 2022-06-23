import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { setComponent } from "../../../redux/commons/actions";
import ModalForm from "../../ModelForm";
import RecapitulatifDesExamens from "../RecapitulatifDesExamens";

const RecapitulatifWrapper = ({
  componentTodisplay,
  isModelGroup,
  closeModal,
}) => {
  const [component, setComponentName] = useState(
    componentTodisplay ? componentTodisplay : "RECAPITULATIF"
  );
  const dispatch = useDispatch();

  const onChangeComponent = (name, data = null) => {
    dispatch(setComponent(name, data));
    setComponentName(name);
  };

  useEffect(() => {
      if (componentTodisplay && componentTodisplay !== component) {
      setComponentName(componentTodisplay);
      console.log(component)
    }
  });

  return (
    <div className="wrapper">
      {component === "EDITMODEL" ? (
        <ModalForm
          closeModal={closeModal}
          formType={component}
          onSaveChange={(data) => onChangeComponent(data)}
          isEdited={true}
        />
      ) : (
        <RecapitulatifDesExamens
          closeModal={closeModal}
          isModelGroup={isModelGroup}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ CommonReducer }) => ({
  componentTodisplay: CommonReducer.componentTodisplay,
});

export default connect(mapStateToProps)(RecapitulatifWrapper);
