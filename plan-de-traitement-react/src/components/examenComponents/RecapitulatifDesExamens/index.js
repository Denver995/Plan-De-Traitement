import React, { useState } from "react";
import {
  EuiIcon,
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiHorizontalRule,
  EuiSpacer,
} from "@elastic/eui";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { connect } from "react-redux";
import ExamCard from "../ExamCard";

import { useDispatch, useSelector } from "react-redux";
import { STEP3 } from "../../../utils/constants";
import { getStepByKey } from "../../../utils/helper";
import RecapExamGroup from "../recapExamGroup/RecapExamGroup";
import SummaryGroupedExam from "../recapExamGroup/SummaryGroupedExam";
import { deleteStep } from "../../../redux/steps/actions";
import { setAlert } from "../../../redux/commons/actions";
import { getHSPBrightness } from "../../../utils/helper";
import TimeLineHelper from "../../common/TimeLineHelper";
import colors from "../../../utils/colors";
import ModalWrapper from "../../common/ModalWrapper";
import styles from "./styles";
import Alert from "../../Alert";

import { ReactComponent as Pencil } from "../../../assets/svgs/Groupe-460.svg";

const RecapitulatifDesExamens = ({ closeModal, isModelGroup, exams }) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const steps = useSelector((state) => state.StepReducer.steps);
  const previousStep = getStepByKey(steps, STEP3);
  const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
  const alertMessage = `
    <EuiText className="text_alert">
      Ce modèle va être enregistré sous le nom : 
      <br/>
      <div style="color: #5D9AD4; margin-top: 10px; display: flex; alignItems: center;">
        Xxxxxxxxxx xxxxxxxxxxx XXXX
        <div style="height: 25px; width: 25px; border-radius: 50%; border: 1px solid #5D9AD4; margin-left: 15px; margin-top: -2px"><<Pencil size={"1rem"} />></div>
      </div>
    </EuiText>
  `;
  // const onSave = () =>
  //   dispatch(
  //     setAlert({
  //       title: "Enregistrer le modèle",
  //       message: alertMessage,
  //       showAlert: true,
  //       // showInputForm: true,
  //       showButtonBlock: true,
  //       buttonText: button,
  //       onAccept: () => {
  //         dispatch(setAlert(false));
  //       },
  //       onReject: () => {
  //         console.log('ON REJECT');
  //       }
  //     })
  //   );

  const onSave = () => {
    setAlert({
      title: "Enregistrer le modèle",
      message: alertMessage,
      buttonText: button,
    });
    setShowAlert(true);
  };
  const onBack = () => dispatch(deleteStep(previousStep));
  console.log("isModelGroup: ", isModelGroup);

  const colorsArr = ["primaryLight", "danger", "success", "warning"];

  return (
    <ModalWrapper style={styles.modal}>
      {isModelGroup ? (
        <SummaryGroupedExam />
      ) : showAlert ? (
        <Alert
          showButtonBlock={true}
          buttonText={button}
          message={alertMessage}
          onAccept={() => setShowAlert(false)}
          onReject={() => setShowAlert(false)}
        />
      ) : (
        <div style={{...styles.container, paddingBottom: 100}}>
          <div
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: colors.white,
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 27,
            marginBottom: 17,
          }}
        >
          <EuiIcon
            type="calendar"
            id="iconList "
            size="l"
            color="rgb(36%, 60%, 83%)"
            style={{ marginLeft: 20, marginRight: 5 }}
          />
          <strong>Recapitulatif des rendez-vous</strong>
          <br />
        </div>
        <div
          style={{ height: 1, width: "80%", backgroundColor: colors.primary }}
        ></div>

        <div style={{ marginLeft: 25, marginTop: 25 }} className="modele">
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
        <p style={{ marginLeft: 25 }} className="x-text">
          xxxxxxxxxx Axxxxxxxxxxxx XXXXX
        </p>
      </div>
          <div style={{ paddingTop: 110, marginTop: -10 }} className="exam-card">
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
                    position={index % 2 === 0 ? "left" : "right"}
                  />
                </div>
              ))}
            </VerticalTimeline>
          </div>
          <EuiSpacer size="xxl" />
          <EuiSpacer size="xxl" />

          <EuiFlexGroup style={styles.btnContainer}>
            <EuiButtonEmpty
              style={styles.backBtn}
              onClick={() => {
                onBack();
              }}
            >
              Retour
            </EuiButtonEmpty>
            <EuiButton
              // form={closeModal}
              style={styles.validateBtn}
              fill={true}
              onClick={onSave}
            >
              Enregistrer
            </EuiButton>
          </EuiFlexGroup>
          <EuiSpacer size="m" />
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
  exams: ExamenReducer.exams,
});

export default connect(mapStateToProps)(RecapitulatifDesExamens);
