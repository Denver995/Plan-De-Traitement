import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { setComponent } from "../../../redux/commons/actions";
import ModalForm from "../../ModelForm";
import RecapitulatifDesExamens from "../RecapitulatifDesExamens";
import { typeScreen } from "../../../utils/constants";

const RecapitulatifWrapper = ({
  componentTodisplay,
  isModelGroup,
  closeModal,
}) => {
  const [component, setComponentName] = useState(
    componentTodisplay ? componentTodisplay : typeScreen.recapitulatif
  );
  const dispatch = useDispatch();

  const onChangeComponent = (name, data = null) => {
    dispatch(setComponent(name, data));
    setComponentName(name);
  };

  useEffect(() => {
    if (componentTodisplay && componentTodisplay !== component) {
      setComponentName(componentTodisplay);
    }
  });

  return (
    <div className="wrapper">
      {component === typeScreen.modelFomEdit ? (
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
