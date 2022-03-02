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
import { getStepByKey } from '../utils/helper';*/
import { STEP1 } from '../utils/constants';

const ModifExamen = () => {
  // eslint-disable-next-line no-undef
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);



  /*export default () => (
  <EuiText>
    <EuiHideFor sizes={'none'}>
      <p>
        Hiding from <EuiCode>{'"none"'}</EuiCode> of the screen sizes
      </p>
    </EuiHideFor>
  </EuiText>
  );*/


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



  return (
    <div className="Modifexamen" >
       <EuiForm className="euimodal">
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

      <EuiFlexGroup className='btn_group'>
            <EuiButtonEmpty onClick={closeModal} fill className="button_cancel">
                              Retour
            </EuiButtonEmpty>
            <EuiButton form={modalFormId}  fill className="button_next">
                              Enregistrer
                         </EuiButton>
                    </EuiFlexGroup>              



    </EuiForm>

    </div>

  );

};

export default ModifExamen;