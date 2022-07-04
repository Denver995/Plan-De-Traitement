import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { setComponent } from "../../../redux/commons/actions";
import RecapitulatifDesExamens from "../../examenComponents/RecapitulatifDesExamens";
import RendezVousForm from "../RendezVousForm";
import { typeRecap } from "../../../utils/constants";
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
      {component === typeScreen.redvFormEdit ? (
        <RendezVousForm
          closeModal={closeModal}
          formType={component}
          onSaveChange={(data) => onChangeComponent(data)}
          isEdited={true}
        />
      ) : (
        <RecapitulatifDesExamens
          closeModal={closeModal}
          isModelGroup={isModelGroup}
          recapType={typeRecap.appointment}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ CommonReducer }) => ({
  componentTodisplay: CommonReducer.componentTodisplay,
});
export default connect(mapStateToProps)(RecapitulatifWrapper);
