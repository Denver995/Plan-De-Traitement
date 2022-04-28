import React from "react";
import { EuiIcon, EuiButton, EuiButtonEmpty, EuiFlexGroup, EuiText } from "@elastic/eui";
import { VerticalTimeline } from "react-vertical-timeline-component";
import ExamCard from "./ExamCard";

import {setAlert, deleteStep } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { STEP3 } from '../utils/constants';
import { getStepByKey } from "../utils/helper";

const RecapitulatifDesExamens = (closeModal) => {
  const dispatch = useDispatch();
  const steps = useSelector(state => state.StepReducer.steps);
  const previousStep = getStepByKey(steps, STEP3);

  const alertMessage = '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Ce modèle va être enregistré sous le nom :</EuiText>'
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
        <EuiButtonEmpty onClick={closeModal} fill="true" className="button_cancel_me" onClick={onBack}>
          Retour
        </EuiButtonEmpty>
        <EuiButton form={closeModal} fill="true" className="button_next_me xs" onClick={onSave}>
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
export default RecapitulatifDesExamens;
