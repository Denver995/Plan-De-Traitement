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
  EuiCheckbox
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

const ModifExamen = () => {
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
          
          <p>
            Modèle : 
            <br /><span> Xxxxxxx xxxxxx xxxxxxx </span>
          </p>

        </EuiHideFor>
        <EuiHideFor sizes={'none'}>
          
           <br className="ligne"/>
          <hr />
          <br />

        </EuiHideFor>

      </EuiText>

      
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
      <EuiButton onClick={showModal}>Modifier Examens</EuiButton>
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

export default ModifExamen;