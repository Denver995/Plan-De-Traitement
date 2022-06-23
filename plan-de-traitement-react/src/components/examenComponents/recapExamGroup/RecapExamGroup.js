import React from "react";
import {
  EuiIcon,
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiText,
  EuiSpacer,
  EuiAvatar,
} from "@elastic/eui";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ExamGroupCard from "./ExamGroupCard";
import RecapExamItem from "./RecapExamItem";
/*import './RecapExamGrp.css';*/
import { setAlert } from "../../../redux/commons/actions";
import { deleteStep } from "../../../redux/steps/actions";
import { useDispatch, useSelector, connect } from "react-redux";
import { STEP3 } from "../../../utils/constants";
import { getStepByKey } from "../../../utils/helper";

const RecapExamGroup = ({ closeModal, examsGrouped }) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const previousStep = getStepByKey(steps, STEP3);

  const alertMessage =
    '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Ce modèle va être enregistré sous le nom :</EuiText>';
  const onSave = () =>
    dispatch(
      setAlert({
        title: "Enregistrer le modèle",
        message: alertMessage,
        showAlert: true,
        onAccept: () => {
          dispatch(setAlert(false));
        },
      })
    );
  const onBack = () => dispatch(deleteStep(previousStep));

  console.log("examGrouped: ", examsGrouped);

  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      <p className="division">
        <EuiIcon
          type="calendar"
          id="iconList "
          size="l"
          color="rgb(36%, 60%, 83%)"
        />
        <strong>Recapitulatif des rendez-vous</strong>
      </p>

      <div className="modele">
        <p>
          <strong>Modèle N° : </strong>
          <EuiIcon
            type="pencil"
            id="icon"
            size="l"
            color="rgb(36%, 60%, 83%)"
          />
        </p>
      </div>
      <p className="x-text">xxxxxxxxxx Axxxxxxxxxxxx XXXXX</p>
      <div className="exam-card">
        <VerticalTimeline
          className="container"
          lineColor={"rgba(19, 83, 117, 0.479)"}
        >
          {examsGrouped.map((group, index) => (
            <div key={index}>
              <EuiIcon
                type="dot"
                id="iconList"
                className="bout_grp2"
                size="l"
              />
              <EuiText className="Titrecadre2"> Groupe 2 </EuiText>
              <div className="bordprincipalegauche">
                <EuiIcon
                  type="boxesVertical"
                  id="iconList"
                  className="boxverti"
                />
                <ExamGroupCard group={group} position={index === 0 ? "right": "left"} />
                <EuiText className="heure_gauche"> 1heure</EuiText>
              </div>
              <EuiIcon
                type="dot"
                id="iconList"
                className="bout_grp1"
                size="l"
              />
                </div>
              ))}
              {/* <EuiSpacer /> */}
        </VerticalTimeline>
      </div>

      <EuiFlexGroup className="btn_group">
        <EuiButtonEmpty onClick={onBack} className="button_cancel_me">
          Retour
        </EuiButtonEmpty>
        <EuiButton
          form={closeModal}
          className="button_next_me xs"
          onClick={onSave}
        >
          Enregistrer
        </EuiButton>
      </EuiFlexGroup>
      <style jsx="true">
        {`
          euitext.text_alert {
            width: 612px;
            height: 30px;
            text-align: center;
            font: normal normal 600 22px/25px Open Sans;
            letter-spacing: 0px;
            color: #242729;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = ({ ExamenReducer }) => ({
  examsGrouped: ExamenReducer.examsGrouped,
});
export default connect(mapStateToProps)(RecapExamGroup);
