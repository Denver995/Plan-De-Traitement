import React from "react";
import { EuiIcon, EuiButton, EuiButtonEmpty, EuiFlexGroup } from "@elastic/eui";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "../Recapitulatif.css";

import {setAlert, deleteStep } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { STEP2, STEP3 } from '../utils/constants';
import { getStepByKey } from "../utils/helper";

const RecapitulatifDesExamens = (props, closeModal) => {
  const dispatch = useDispatch();
  const steps = useSelector(state => state.steps);
  const previousStep = getStepByKey(steps, STEP3);


  const onSave = () => dispatch(setAlert({title: "Enregistrer le modèle", message:"Ce modèle va être enregistré sous le nom :",showAlert:true,onAccept:()=>{dispatch(setAlert(false))}}));
  const onBack = () =>  dispatch(deleteStep(previousStep));
  
  
  return (
    <div>
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
          <div className="exam-title">Examen 1</div>
          <VerticalTimelineElement
            contentStyle={{ background: props.couleur, height: 90 }}
            date={props.date}
            position={props.position}
            iconStyle={{
              background: "rgb(19, 83, 117)",
              color: "#fff",
              border: "rgb(19, 83, 117)",
            }}
          >
            <div className="exam-card-content">
              <div className="card-content-header">
                <EuiIcon type="boxesVertical" id="iconList" />
                <h4 className="spec">
                  <strong>*Spécilalité* - *Motif*</strong>
                </h4>
              </div>
            </div>
            <div className="first-div">
              <div className="praticien">
                <EuiIcon type="user" id="icon" />
                <h4 className="prc">*Praticien*</h4>
                <EuiIcon type="visMapCoordinate" id="icon" />
                <h4 className="spec">
                  *00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*
                </h4>
              </div>
            </div>
            <div className="first-div">
              <div className="praticien">
                <EuiIcon type="calendar" id="icon" />
                <h4 className="prc">00/00/0000</h4>
                <EuiIcon type="clock" id="icon" />
                <h4 className="spec">00h00</h4>
              </div>
            </div>
          </VerticalTimelineElement>
          <div className="exam-title-right">Examen 2</div>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(79%, 92%, 84%)" }}
            date={props.date}
            iconStyle={{ background: "rgb(19, 83, 117)", color: "#fff" }}
          >
            <div className="exam-card-content">
              <div className="card-content-header">
                <h4 className="spec">
                  {" "}
                  <strong>*Spécilalité* - *Motif*</strong>
                </h4>
                <EuiIcon type="boxesVertical" id="iconList" />
              </div>
            </div>
            <div className="first-div">
              <div className="praticien">
                <EuiIcon type="user" id="icon" />
                <h4 className="prc">*Praticien*</h4>
                <EuiIcon type="visMapCoordinate" id="icon" />
                <h4 className="spec">
                  *00 Rue xxxxxx xxxxx, 00000 Xxxxxxxxxxx*
                </h4>
              </div>
            </div>
            <div className="first-div">
              <div className="praticien">
                <EuiIcon type="calendar" id="icon" />
                <h4 className="prc">00/00/0000</h4>
                <EuiIcon type="clock" id="icon" />
                <h4 className="spec">00h00</h4>
              </div>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>

      <EuiFlexGroup className="btn_group">
        <EuiButtonEmpty onClick={closeModal} fill className="button_cancel_me" onClick={onBack}>
          Retour
        </EuiButtonEmpty>
        <EuiButton form={closeModal} fill className="button_next_me" onClick={onSave}>
          Enregistrer
        </EuiButton>
      </EuiFlexGroup>
    </div>
  );
};
export default RecapitulatifDesExamens;
