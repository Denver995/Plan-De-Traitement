import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiForm,
  EuiSpacer,
  useGeneratedHtmlId,
  EuiButton,
  EuiButtonEmpty,
  EuiSelect,
  EuiText,
  EuiIcon,
  EuiCheckbox,
} from "@elastic/eui";
// eslint-disable-next-line no-unused-vars
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import { useState } from "react";
import '../modifierexamen.css'
/*import React, { useState, useEffect } from 'react';
import { createModele } from '../utils/fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep, startLoading } from '../actions';
import { getStepByKey } from '../utils/helper';*/
import { STEP1 } from "../utils/constants";

const ModifExamen = () => {
  // eslint-disable-next-line no-undef
  const [setIsModalVisible] = useState(false);

  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });

  const closeModal = () => setIsModalVisible(false);

  const [checked, setChecked] = useState(false);

  const basicCheckboxId = useGeneratedHtmlId({ prefix: "basicCheckbox" });

  const onChange = (e) => {
    setChecked(e.target.checked);}


  return (
    <div className="Modifexamen_me" > 
    
      <EuiForm className="euimodal_me">
        <EuiText className="nomexam_me">
          <EuiText sizes={'none'}>
            
            <p>
              Modèle : 
              <br /><span className="petit_texte"> Xxxxxxx xxxxxx xxxxxxx </span>
            </p> 

          </EuiText>
          <EuiText sizes={'none'}>
            
            <br />
            <hr />
            <br />

          

        </EuiText>

        
        <EuiText className="numexam_me">
        <EuiIcon type="wrench" className="icone_me" /><span> Examen N°xxx</span>

        </EuiText>
        <EuiText> <br /> </EuiText>

        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow  label="Spécialité *:" fullWidth>
              <EuiSelect fullWidth/>
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Motif *:" fullWidth>
              <EuiSelect fullWidth/>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Praticien :" fullWidth>
              <EuiSelect fullWidth/>
            </EuiFormRow>
          </EuiFlexItem>
          
          <EuiFlexItem>
            <EuiFormRow label="Lieu *:" fullWidth>
            
              <EuiSelect fullWidth/>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="m" />
        <EuiCheckbox className="checkbox_ModifExam_me" id={basicCheckboxId}
          label="Fixer la position de l'examen"
          checked={checked}
          onChange={(e) => onChange(e)}
        >
        </EuiCheckbox>

          <EuiSpacer size="m" />

        <EuiFlexGroup className='btn_group'>
              <EuiButtonEmpty onClick={closeModal} fill className="button_cancel_me">
                                Retour
              </EuiButtonEmpty>
              <EuiButton form={modalFormId}  fill className="button_next_me">
                                Enregistrer
              </EuiButton>
        </EuiFlexGroup>              
      </EuiText>
      
      </EuiForm>
    </div>
    
      

  );
};

export default ModifExamen;
