import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiHorizontalRule,
  EuiSpacer
} from "@elastic/eui";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { ReactComponent as CalendarIcon } from "../../../assets/svgs/Groupe-254.svg";
import { ReactComponent as Pencil } from "../../../assets/svgs/Groupe-460.svg";
import { setAlert, setComponent } from "../../../redux/commons/actions";
import { deleteStep } from "../../../redux/steps/actions";
import { STEP3, typeRecap, typeScreen } from "../../../utils/constants";
import { getStepByKey } from "../../../utils/helper";
import Alert from "../../Alert";
import ModalWrapper from "../../common/ModalWrapper";
import TimeLineHelper from "../../common/TimeLineHelper";
import ExamCard from "../ExamCard";
import SummaryGroupedExam from "../recapExamGroup/SummaryGroupedExam";
import styles from "./styles";

const RecapitulatifDesExamens = ({
  closeModal,
  isModelGroup,
  exams,
  modelData,
  appointmentData,
  isEditing = false,
  recapType = typeRecap.model,
}) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const steps = useSelector((state) => state.StepReducer.steps);
  const previousStep = getStepByKey(steps, STEP3);
  const [loading, setLoading] = useState(false);
  const button = { cancelText: "Ne pas appliquer", confirmText: "Appliquer" };
  const alertMessage = `
    <EuiText style="float: left; font-size: 22px; color: #242729">
      Ce modèle va être enregistré sous le nom :
      <br/>
      <div style="font-size: 20px; color: #5D9AD4; margin-top: 10px; margin-bottom: 20px; display: flex; alignItems: center;">
        {modelData.modelName}
        <div style="height: 25px; width: 25px; border-radius: 50%; border: 1px solid #5D9AD4; margin-left: 15px; margin-top: -2px; cursor: pointer"><Pencil size={"1rem"} /></div>
      </div>
    </EuiText>
  `;
  const onSave = () => {
    setAlert({
      title: "Enregistrer le modèle",
      message: alertMessage,
      buttonText: button,
      isComplete: true
    });
    setShowAlert(true);
  };
  const onBack = () => dispatch(deleteStep(previousStep));

  const loadingScreen = (show) => {
    setLoading(show);
  }
  useEffect(() => {
    console.log("exams -----", exams)
  }, [])

  return (
    <ModalWrapper style={styles.modal}>
      {isModelGroup ? (
        <SummaryGroupedExam closeModal={closeModal} isEditing={isEditing} />
      ) : showAlert ? (
        <Alert
          showButtonBlock={true}
          buttonText={button}
          message={alertMessage}
          onAccept={() => setShowAlert(false)}
          onReject={() => setShowAlert(false)}
          isConfirmation={true}
          closeModal={closeModal}
        />
      ) : (
        <div style={styles.container}>
          <div style={styles.topContainer}>
            <EuiSpacer size="l" />
            <EuiFlexGroup style={styles.titleContainer}>
              <CalendarIcon />
              <p style={styles.title}>Recapitulatif des rendez vous</p>
            </EuiFlexGroup>
            <EuiSpacer size="s" />
            <EuiHorizontalRule style={styles.horizontalRule} />

            <div style={styles.headContainer}>
              <p style={styles.headLabel}>Modèle :</p>
              <EuiSpacer size="s" />
              <div style={styles.headTitleContainer}>
                <p style={styles.headTitle}>
                  {recapType === typeRecap.model
                    ? modelData.nom || modelData.modelName
                    : appointmentData.model.nom}
                </p>
                {recapType === typeRecap.model && (
                  <Pencil
                    onClick={() =>
                      dispatch(setComponent(typeScreen.modelFomEdit))
                    }
                    width={"21px"}
                    style={styles.pencil}
                  />
                )}
              </div>
            </div>
          </div>
          <div style={styles.timeline} className="custom-timeline">
            {!loading ? <VerticalTimeline
              lineColor={"rgba(19, 83, 117, 0.479)"}
              layout={"2-columns"}
            >
              {exams.map((exam, index) => (
                <div key={index}>
                  <TimeLineHelper index={index} />
                  <ExamCard
                    entityType = {"Examen"}
                    loadingScreen={loadingScreen}
                    examId={exam[index]?.id_examen}
                    index={index}
                    examen={exam}
                    date="1h-2h"
                    position={index % 2 === 0 ? "right" : "left"}
                    onBack={onBack}
                  />
                </div>
              ))}
            </VerticalTimeline> :
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress style={{ margin: '20px auto', color: 'blue', width: '35px', height: '35px' }} />

              </Box>}
          </div>
          <EuiSpacer size="xxl" />
          {/* <EuiSpacer size="xxl" /> */}

          <EuiFlexGroup
            className="custom-footer-group"
            style={styles.btnContainer}
          >
            {recapType === typeRecap.model && (
              <EuiButtonEmpty
                className="custom-button"
                style={styles.backBtn}
                onClick={() => {
                  onBack();
                }}
              >
                Retour
              </EuiButtonEmpty>
            )}
            <EuiButton className="custom-button button-valid" style={styles.validateBtn} fill={true} onClick={onSave}>
              Valider
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

const mapStateToProps = ({ ExamenReducer, ModelsReducer, AppointReducer }) => ({
  exams: ExamenReducer.exams,
  modelData: ModelsReducer.modelData,
  appointmentData: AppointReducer.appointmentData,
});

export default connect(mapStateToProps)(RecapitulatifDesExamens);
