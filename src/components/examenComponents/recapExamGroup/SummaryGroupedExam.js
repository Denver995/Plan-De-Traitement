import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiSpacer,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ReactComponent as CalendarIcon } from "../../../assets/svgs/Groupe-254.svg";
import { ReactComponent as PencilIcon } from "../../../assets/svgs/Groupe-460.svg";
import { setAlert, setComponent } from "../../../redux/commons/actions";
import ModelGroupeService from "../../../services/modelGroupe";
import ExamenService from "../../../services/examens";

import {
  SetShowGroupeContentForUpdate,
  toggleFixGroupPosition,
} from "../../../redux/examens/actions";
import { deleteStep } from "../../../redux/steps/actions";
import colors from "../../../utils/colors";
import { STEP3 } from "../../../utils/constants";
import { getStepByKey } from "../../../utils/helper";
import TimeLineHelper from "../../common/TimeLineHelper";
import ExamCard from "../ExamCard";
import "./RecapExamGrp.css";
import RecapExamItemV2 from "./RecapExamItemV2";
import { Box, CircularProgress } from "@mui/material";

const SummaryGroupedExam = ({ modelData, closeModal }) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const groupeToShowContentId = useSelector(
    (state) => state.ExamenReducer.groupeToShowContentId
  );
  const previousStep = getStepByKey(steps, STEP3);

  const [groupesWithData, setGroupesWithData] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getGroupExam()
  }, [])

  const getGroupExam = () => {
    setLoading(true)
    let newobjet = {}
    setGroupesWithData({})
    ModelGroupeService.getModelGroupe(parseInt(modelData.id))
      .then((response) => {
        response.data.data.forEach((element, index) => {
          ExamenService.getExamenByIds(parseInt(modelData.id), parseInt(element.id_modele_groupe))
            .then((res) => {

              newobjet["group " + index] = {
                payload: element,
                fixe: false,
                exams: res.data.data
              }
              setGroupesWithData(newobjet)
              setLoading(false)
            })
            .catch((error) => {
              setLoading(false)

              newobjet["group " + index] = {
                payload: element,
                fixe: false,
                exams: []
              }
              setGroupesWithData(newobjet)
            });

        });

      })
      .catch((error) => {
        setLoading(false)

      });

  }
  const groupesWithDataKeys = Object.keys(groupesWithData);

  const alertMessage = `<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans, marginBottom: 20}}>Ce modèle va être enregistré sous le nom : </EuiText>
    <p style={{color: '#5d9ad4'}}>Xxxxxxxxxx xxxxxxxxxxx XXXX</p>`;
  const onSave = () => {
    if (groupeToShowContentId === -1) {
      dispatch(
        setAlert({
          title: "Enregistrer le modèle",
          message: alertMessage,
          showAlert: true,
          isConfirmation: true,
          closeModal: closeModal,
          onAccept: () => {
            dispatch(setAlert(false));
          },
        })
      );
    }
    dispatch(SetShowGroupeContentForUpdate(-1));
  };

  const onBack = () => {
    if (false) {
      dispatch(SetShowGroupeContentForUpdate(-1))
    } else {
      if (groupeToShowContentId !== -1) dispatch(SetShowGroupeContentForUpdate(-1));
      else dispatch(deleteStep(previousStep));
    }
  };
  useEffect(() => { }, [groupesWithData]);

  return (
    <div style={{ marginLeft: 20, marginRight: 20, paddingBottom: 100 }}>
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
          <CalendarIcon style={{ marginLeft: 20, marginRight: 5 }} />
          <strong className="recap-title">Recapitulatif des rendez-vous</strong>
          <br />
        </div>
        <div
          style={{ height: 1, width: "80%", backgroundColor: colors.primary }}
        ></div>

        <div style={{ marginLeft: 25, marginTop: 25 }} className="modele">
          <p>
            <strong className="recap-nom-model">Modèle N° : </strong>
          </p>
        </div>
        <div className="recap-nom-container">
          <p style={{ marginLeft: 25 }} className="x-text">
            {modelData.modelName}
          </p>
          <PencilIcon
            onClick={() => dispatch(setComponent("EDITMODEL"))}
            style={{ cursor: "pointer" }}
            width={"1rem"}
          />
        </div>
      </div>
      {loading ? <Box style={{ paddingTop: '10rem', marginBottom: '3rem', display: 'flex', alignItems: 'center' }}>
        <CircularProgress style={{ margin: '20px auto', color: 'blue', width: '35px', height: '35px' }} />
      </Box>
        :
        <div style={{ paddingTop: 110, marginTop: -10 }} className="exam-card custom-timeline">
          <EuiSpacer size="l" />
          <VerticalTimeline
            className="container"
            lineColor={"rgba(19, 83, 117, 0.479)"}
          >
            {groupeToShowContentId === -1
              ? groupesWithDataKeys.map((group, index) => (
                <div
                  className="custom-timeline-group"
                  key={index}
                  style={{ position: "relative", paddingTop: 15 }}
                >
                  <TimeLineHelper index={index} entityType={"Groupe"} />
                  <RecapExamItemV2
                    entityType={"Groupe"}
                    onFixePosition={() => {
                      dispatch(
                        toggleFixGroupPosition({
                          selectedGroup: "group " + index,
                        })
                      );
                    }}
                    data={groupesWithData["group " + index]?.exams}
                    date={new Date().toDateString()}
                    index_={index}
                    groupKey={"group " + index}
                    position={index % 2 === 0 ? "right" : "left"}
                    fixe={
                      groupesWithData["group " + index]?.fixe
                    }
                    group={group}
                    groupesWithData={groupesWithData}
                  />
                </div>
              ))
              : groupesWithData["group " + groupeToShowContentId]?.exams?.map(
                (exam, index) => (
                  <div key={index}>
                    <TimeLineHelper index={index} entityType={"Examen"} />
                    <ExamCard
                      entityType={"Examen"}
                      examen={exam}
                      isExamGroup={false}
                      groupKey={"group " + groupeToShowContentId}
                      index={index}
                      examId={index}
                      color={exam.color}
                      date="1h - 2h"
                      position={index % 2 === 0 ? "right" : "left"}
                      examOnGroup={true}
                      onBack={() => dispatch(deleteStep(previousStep))}
                    />
                  </div>
                )
              )}
          </VerticalTimeline>
        </div>}

      <EuiFlexGroup
        className="custom-footer-group"
        style={{
          backgroundColor: colors.white,
          height: 110,
          position: "absolute",
          bottom: 0,
          marginBottom: 0,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingLeft: 20,
          paddingRight: 40,
          zIndex: 3,
        }}
      >
        <EuiButtonEmpty
          className="custom-button"
          style={{
            fontSize: "27px",
            color: colors.darkBlue,
            border: "3px solid #052A3E",
            borderRadius: "39px",
            width: "187px",
            height: "59px",
            textDecoration: "none",
          }}
          onClick={() => {
            onBack();
          }}
        >
          Retour
        </EuiButtonEmpty>
        <EuiButton
          // form={closeModal}
          className="custom-button button-valid"
          style={{
            fontSize: "27px",
            color: colors.white,
            border: "3px solid #052A3E",
            backgroundColor: colors.darkBlue,
            borderRadius: "39px",
            width: "187px",
            height: "59px",
            textDecoration: "none",
          }}
          fill={true}
          onClick={onSave}
        >
          {groupeToShowContentId === -1 ? "Valider" : "Enregistrer"}
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

const mapStateToProps = ({ ExamenReducer, CommonReducer, ModelsReducer }) => ({
  examsGrouped: ExamenReducer.examsGrouped,
  componentTodisplay: CommonReducer.componentTodisplay,
  modelData: ModelsReducer.modelData,
});
export default connect(mapStateToProps)(SummaryGroupedExam);
