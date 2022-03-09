import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiForm,
  EuiSpacer,
  useGeneratedHtmlId,
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiSelect,
  EuiHideFor,
  EuiText,
  EuiIcon,
  EuiCheckbox,
  EuiPanel
} from '@elastic/eui';
// eslint-disable-next-line no-unused-vars
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import { useState } from 'react';
/*import React, { useState, useEffect } from 'react';
import { createModele } from '../utils/fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep, startLoading } from '../actions';
import { getStepByKey } from '../utils/helper';
import { STEP1 } from '../utils/constants';*/

const ModelForm = () => {
  // eslint-disable-next-line no-undef
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);


  // eslint-disable-next-line no-undef
  const [checked, setChecked] = useState(false);
 

  const basicCheckboxId = useGeneratedHtmlId({ prefix: 'basicCheckbox' });

  const onChange = (e) => {
    setChecked(e.target.checked);
  };



  /*export default () => (
  <EuiText>
    <EuiHideFor sizes={'none'}>
      <p>
        Hiding from <EuiCode>{'"none"'}</EuiCode> of the screen sizes
      </p>
    </EuiHideFor>
  </EuiText>
  );*/

  const examForm = (
    <EuiForm className="formulaire">
     
      <EuiText className="nomexam">
        <EuiHideFor sizes={'none'}>
          
          <p className="groupe">
            Modèle : 
            <br /><span> Xxxxxxx xxxxxx xxxxxxx </span>
          </p>

        </EuiHideFor>
        <EuiHideFor sizes={'none'}>
          
           <br />

        </EuiHideFor>

      </EuiText>

      
      <EuiFlexItem>
      
        <EuiPanel>
          <EuiText>
            <p>
              Groupe 1
              
            </p>
            <br />
            <hr />
            <EuiSpacer />
          </EuiText>
          <EuiPanel className="ex1">
            <EuiText>
              <p>
                Examen 1
                
              </p>
            </EuiText>
          </EuiPanel>

          <EuiSpacer />
          
          <EuiPanel>
            <EuiText>
              <p>
              Examen 2
              </p>
            </EuiText>
          </EuiPanel>
          </EuiPanel>
        </EuiFlexItem>
      <EuiSpacer />


      
      <EuiText className="numexam">
      <EuiIcon type="wrench" className="icone" /><span> Examen N°xxx</span>

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



    </EuiForm>
  )

  const examItem = () => {
    <EuiFlexGroup className='examenItem'>
      
      <EuiFlexItem>
        <span>Spécialité</span>
        <span>Motif</span>
        <span>|</span>
        <span>Praticien</span>
        <span>Lieu</span>
      </EuiFlexItem>
    </EuiFlexGroup>
}

/*

    <Fragment>
      <EuiCheckbox
        id={basicCheckboxId}
        label="I am a checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
      />

      <EuiSpacer size="m" />

    </Fragment>
  */




  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} className='modelFormContainer' maxWidth='100%'>
        <EuiModalHeader>
        </EuiModalHeader>
        <EuiModalBody>
          {examItem}
          {examForm}

        </EuiModalBody>

        <EuiCheckbox className="checkbox" id={basicCheckboxId}
        label="Fixer la position de l'examen"
        checked={checked}
        onChange={(e) => onChange(e)}
>
        </EuiCheckbox>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiModalFooter className='footer_centered' style={{justifyContent: 'center'}}>
          <EuiButtonEmpty onClick={closeModal} fill className="button_cancel">Retour</EuiButtonEmpty>
          <EuiButton type="submit" form={modalFormId} onClick={closeModal} fill className="button_next">
            Enregistrer
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    ); 
  }
  return (
    <div>
      <EuiButton onClick={showModal}>Ensemble d'Examen</EuiButton>
      {modal}
      <style jsx={"true"}>
        {`
          .euiButton--primary.euiButton--fill {
            background: #5D9AD4 0% 0% no-repeat padding-box;
            font: normal normal normal 27px/37px Open Sans;
            letter-spacing: 0px;
            color: #FFFFFF;
          }
          
          .modelFormContainer {
            /* left: 432px;
            top: 207px; */
            width: 1057px;
          }
        `}
      </style>

    </div>

  );

};

export default ModelForm;