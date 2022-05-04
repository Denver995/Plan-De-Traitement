import React from "react";
import { EuiIcon, EuiButton, EuiButtonEmpty, EuiFlexGroup, EuiText, EuiSpacer, EuiAvatar } from "@elastic/eui";
import { VerticalTimeline } from "react-vertical-timeline-component";
import ExamGroupCard from "./ExamGroupCard";
/*import './RecapExamGrp.css';*/
import { setAlert } from '../../../redux/commons/actions';
import { deleteStep } from '../../../redux/steps/actions';
import { useDispatch, useSelector } from 'react-redux';
import { STEP3 } from '../../../utils/constants';
import { getStepByKey } from "../../../utils/helper";

const RecapExamGroup = (closeModal) => {
  const dispatch = useDispatch();
  const steps = useSelector(state => state.StepReducer.steps);
  const previousStep = getStepByKey(steps, STEP3);

  const alertMessage = '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Ce modèle va être enregistré sous le nom :</EuiText>'
  const onSave = () => dispatch(setAlert({title: "Enregistrer le modèle", message: alertMessage,showAlert:true,onAccept:()=>{dispatch(setAlert(false))}}));
  const onBack = () => dispatch(deleteStep(previousStep));

  
  
  return (
    <div style={{ marginLeft: 20, marginRight: 20}}>
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
          size="0.4"
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
          <div className="divbout_grp1">
            <EuiIcon type="dot" id="iconList" className="bout_grp1" size="5"/>
            <EuiText className="Titrecadre">  
              Groupe 1 
            </EuiText>
          </div>
            <div className="bordprincipale">
            <EuiIcon type="boxesVertical" id="iconList" className="boxverti"/>
            <ExamGroupCard 
                examen={""} 
                couleur='pink' 
                date='12 mars' 
                position ={'rigth'}  
            />
            
            <EuiText className="heure_droit"> 1heure</EuiText>
            <ExamGroupCard 
               // examen={"Examen2.2"} 
                couleur='#5D9AD4' 
                //date='12 mars' 
                position ={'rigth'}
            />
            <EuiText className="heure_droit"> 1heure</EuiText>
            <ExamGroupCard 
               // examen={"Examen2.2"} 
                couleur='skyblue' 
                //date='12 mars' 
                position ={'rigth'}
            />
          </div>  
          <EuiIcon type="dot" id="iconList" className="bout_grp2" size="5"/>
          <EuiText className="Titrecadre2"> Groupe 2 </EuiText>
          <div className="bordprincipalegauche">
          <EuiIcon type="boxesVertical" id="iconList" className="boxverti"/>
            <ExamGroupCard 
                examen={""} 
                couleur='pink' 
                 
                position ={'left'}  
            />
            <EuiText className="heure_gauche"> 1heure</EuiText>
            <ExamGroupCard 
               // examen={"Examen2.2"} 
                couleur='#5D9AD4' 
                //date='12 mars' 
                position ={'left'}
            />
            <EuiText className="heure_gauche"> 1heure</EuiText>
            <ExamGroupCard 
               // examen={"Examen2.2"} 
                couleur='skyblue' 
                //date='12 mars' 
                position ={'left'}
            />
          </div>
          <EuiIcon type="dot" id="iconList" className="bout_grp1" size="5"/>
          <EuiText className="Titrecadre"> Groupe 3 </EuiText>
          <div className="bordprincipale" >
          <EuiIcon type="boxesVertical" id="iconList" className="boxverti"/>
          <ExamGroupCard 
                examen={""} 
                couleur='pink' 
                date='12 mars' 
                position ={'rigth'}  
            />
            <EuiText className="heure_droit"> 1heure</EuiText>
            <ExamGroupCard 
               // examen={"Examen2.2"} 
                couleur='#5D9AD4' 
                //date='12 mars' 
                position ={'rigth'}
            />
            <EuiText className="heure_droit"> 1heure</EuiText>
            <ExamGroupCard 
               // examen={"Examen2.2"} 
                couleur='skyblue' 
                //date='12 mars' 
                position ={'rigth'}
            />
            </div>
<EuiSpacer />
            
        </VerticalTimeline>
      </div>

      <EuiFlexGroup className="btn_group">
        <EuiButtonEmpty onClick={onBack} fill className="button_cancel_me">
          Retour
        </EuiButtonEmpty>
        <EuiButton form={closeModal} fill className="button_next_me xs" onClick={onSave}>
          Enregistrer
        </EuiButton>
      </EuiFlexGroup>
      <style jsx>
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
export default RecapExamGroup;
