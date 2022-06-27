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
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { setAlert, setComponent } from "../../../redux/commons/actions";
import { deleteStep } from "../../../redux/steps/actions";
import { useDispatch, useSelector, connect } from "react-redux";
import { STEP3 } from "../../../utils/constants";
import { getStepByKey } from "../../../utils/helper";
import RecapExamItem from "./RecapExamItem";
import ExamGroupCard from "./ExamGroupCard";
import colors from "../../../utils/colors";
import TimeLineHelper from "../../common/TimeLineHelper";
import RecapExamItemV2 from "./RecapExamItemV2";

import { ReactComponent as CalendarIcon } from "../../../assets/svgs/Groupe-254.svg";
import { ReactComponent as PencilIcon } from "../../../assets/svgs/Groupe-460.svg";

const SummaryGroupedExam = ({
  examsGrouped,
  componentTodisplay,
  modelData,
}) => {
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const previousStep = getStepByKey(steps, STEP3);
  const colorsArr = ["primaryLight", "danger", "success", "warning"];

  const alertMessage = `<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans, marginBottom: 20}}>Ce modèle va être enregistré sous le nom : </EuiText>
    <p style={{color: '#5d9ad4'}}>Xxxxxxxxxx xxxxxxxxxxx XXXX</p>`;
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
  const onBack = () => {
    console.log("componentTodisplay ", componentTodisplay);
    dispatch(setComponent({ name: "GROUPSUMMARY" }));
    // dispatch(deleteStep(previousStep));
  };

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
            {modelData.nom}
          </p>
          <PencilIcon
            onClick={() => dispatch(setComponent("EDITMODEL"))}
            style={{ cursor: "pointer" }}
            width={"1rem"}
          />
        </div>
      </div>
      <div style={{ paddingTop: 110, marginTop: -10 }} className="exam-card">
        <EuiSpacer size="l" />
        <VerticalTimeline
          className="container"
          lineColor={"rgba(19, 83, 117, 0.479)"}
        >
          {examsGrouped.map((group, index) => (
            <div key={index} style={{ position: "relative" }}>
              <TimeLineHelper index={index} />
              <RecapExamItemV2
                color={""}
                data={Object.keys(group)}
                date={new Date().toDateString()}
                key={index}
                position={index % 2 === 0 ? "left" : "right"}
              />
            </div>
          ))}
          {/* <EuiSpacer /> */}
        </VerticalTimeline>
      </div>

      <EuiFlexGroup
        style={{
          backgroundColor: colors.white,
          height: 110,
          position: "absolute",
          bottom: 20,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingLeft: 20,
          paddingRight: 40,
          zIndex: 3,
        }}
      >
        <EuiButtonEmpty
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
          Valider
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
