import React from "react";
import { EuiIcon, EuiButton, EuiButtonEmpty, EuiFlexGroup } from "@elastic/eui";
import { VerticalTimeline } from "react-vertical-timeline-component";
import ExamCard from "./ExamCard";

import {setAlert, deleteStep } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { STEP3 } from '../utils/constants';
import { getStepByKey } from "../utils/helper";

const RecapitulatifDesExamens = (closeModal) => {
  const dispatch = useDispatch();
  const steps = useSelector(state => state.steps);
  const previousStep = getStepByKey(steps, STEP3);

  const alertMessage = '<p className="text_alert">Ce modèle va être enregistré sous le nom :</p>'
  const onSave = () => dispatch(setAlert({title: "Enregistrer le modèle", message: alertMessage,showAlert:true,onAccept:()=>{dispatch(setAlert(false))}}));
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
          <ExamCard 
            examen={"Examen1"} 
            couleur='pink'
            date='12 mars' 
            position ={'left'}
          />
          <ExamCard 
            examen={"Examen2"} 
            couleur='#5D9AD4' 
            date='12 mars' 
            position ={'rigth'}
          />
          <ExamCard 
            examen={"Examen3"} 
            couleur='pink'
            date='12 mars' 
            position ={'left'}
          />
          <ExamCard 
            examen={"Examen2"} 
            couleur='#5D9AD4' 
            date='12 mars' 
            position ={'rigth'}
          />
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
