import React from "react";
import { EuiIcon, EuiButton, EuiButtonEmpty, EuiFlexGroup } from "@elastic/eui";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { connect } from 'react-redux';
import ExamCard from "../ExamCard";

import { useDispatch, useSelector } from "react-redux";
import { STEP3 } from "../../../utils/constants";
import { getStepByKey } from "../../../utils/helper";
import RecapExamGroup from "../recapExamGroup/RecapExamGroup";
import SummaryGroupedExam from "../recapExamGroup/SummaryGroupedExam";
import { deleteStep } from "../../../redux/steps/actions";
import { setAlert } from "../../../redux/commons/actions";
import { getHSPBrightness } from '../../../utils/helper';
import TimeLineHelper from "../../common/TimeLineHelper";
import colors from "../../../utils/colors";
import ModalWrapper from "../../common/ModalWrapper";
import styles from "./styles";

const RecapitulatifDesExamens = ({closeModal, isModelGroup, exams}) => {
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
        showInputForm: true,
        showButtonBlock: true,
        buttonText: {
          confirmText: 'Confirm',
          cancelText: 'Annuler'
        },
        onAccept: () => {
          dispatch(setAlert(false));
        },
      })
    );
  const onBack = () => dispatch(deleteStep(previousStep));
  console.log('isModelGroup: ', isModelGroup);

  const colorsArr = ['primaryLight', 'danger', 'success', 'warning'];

  return (
    <ModalWrapper style={styles.modal}>
     {isModelGroup ? (
    <SummaryGroupedExam />
      ) : (
         <div style={{ marginLeft: 20, marginRight: 20 }}>
          <p className="division">
            <EuiIcon
              type="calendar"
              id="iconList "
              size="l"
              color="rgb(36%, 60%, 83%)"
            />
            <strong>Recapitulatif des rendez vous</strong>
          </p>

          <div className="modele">
            <p>
              <strong>Modéle : </strong>
            </p>
            <EuiIcon type="boxesVertical" id="iconList" />
          </div>
          <p className="x-text">xxxxxxxxxx xxxxxxxxxxxxx XXXXX</p>
          <div className="exam-card">
            <VerticalTimeline
              className="container"
              lineColor={"rgba(19, 83, 117, 0.479)"}
            >
              {exams.map((exam, index) => (
                <div key={index}>
                <TimeLineHelper index={index} />
                <ExamCard
                  examen={"Examen1"}
                  color={colors[colorsArr[index]]}
                  date="12 mars"
                  position={index % 2 === 0? "left": "right"}
                />
                </div>
              ))}
            </VerticalTimeline>
          </div>

          <EuiFlexGroup className="btn_group">
            <EuiButtonEmpty
              onClick={() => {
                onBack();
              }}
              className="button_cancel_me"
            >
              Retour
            </EuiButtonEmpty>
            <EuiButton
              // form={closeModal}
              fill={true}
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
      )}
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ExamenReducer }) => ({
  exams: ExamenReducer.exams
})

export default connect(mapStateToProps)(RecapitulatifDesExamens);
