import {
  EuiButton,
  EuiComboBox,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiFlexGroup,
  EuiRadio,
  EuiFlexItem,
  useGeneratedHtmlId,
  EuiSpacer,
  EuiFieldNumber,
  EuiSelect
} from '@elastic/eui';
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import React, { useState } from 'react';

import { ReactComponent as EllipsisSvg } from "../assets/svgs/ellipsis-v.svg";

const ModelForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);

  const examForm = (
    <EuiForm>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow label="Spécialité*" fullWidth>
            <EuiSelect fullWidth/>
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Motif*" fullWidth>
            <EuiSelect fullWidth/>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow label="Praticien*" fullWidth>
            <EuiSelect fullWidth/>
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Lieu*" fullWidth>
            <EuiSelect fullWidth/>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  )

  const examItem = () => {
    <EuiFlexGroup className='examenItem'>
      <EuiFlexItem>
        <EllipsisSvg />
        <span>Examen 1</span>
      </EuiFlexItem>
      <EuiFlexItem>
        <span>Spécialité</span>
        <span>Motif</span>
        <span>|</span>
        <span>Praticien</span>
        <span>Lieu</span>
      </EuiFlexItem>
    </EuiFlexGroup>
  }


  const espacementInterExamenForm = (
    <EuiForm id={modalFormId} component="form">
    <div>
      <EuiFormRow label="Espacement inter examen*:" className="espacement_inter_examen_EuiModalBody_form_group espacement_inter_examen_EuiModalBody_form_group_righ_element">
        <EuiFieldNumber
          placeholder=" "
          />			
      </EuiFormRow>
      <EuiFormRow label=" " className="espacement_inter_examen_EuiModalBody_form_group">
        <EuiComboBox
          aria-label="Accessible screen reader label"
          placeholder=" "
          options={[
            {
               label: 'Jour',
            },
            {
               label: 'Minute',
            },
            {
               label: 'Heure',
            },	
            {
               label: 'Semaine',
            },			  
          ]}
          
          isClearable={true}
        />			
      </EuiFormRow>
     </div>		
    </EuiForm>
  );


  const modelForm = (
    <EuiForm id={modalFormId}>
      <EuiSpacer size="m" />
      <EuiFormRow label="nom du model" fullWidth>
        <EuiFieldText name="popfirst" fullWidth/>
      </EuiFormRow>
      <EuiSpacer size="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <div className="">
            Grouper les rendez-vous :
          </div>
          <EuiFlexGroup style={{ paddingTop: 18}}>
            <EuiFlexItem>
              <EuiFlexGroup style={{ maxWidth: 160 }}>
                <EuiFlexItem>
                  <EuiFormRow>
                    <EuiRadio
                      id={htmlIdGenerator()()}
                      label="Oui"
                      value="2"
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow>
                    <EuiRadio
                      id={htmlIdGenerator()()}
                      label="Non"
                      value="1"
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: '85%',marginLeft: '15%'}}>
          <EuiFormRow label="Nombre d'occurrences*:" fullWidth>
            <EuiFieldNumber name="popfirst" fullWidth/>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow label="Période de recherche d'un groupe*:" fullWidth>
            <EuiFieldNumber name="popfirst" fullWidth/>
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="" style={{marginTop: 21}} fullWidth>
            <EuiFieldNumber fullWidth/>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} className='modelFormContainer' maxWidth='100%'>
        <EuiModalHeader>
        </EuiModalHeader>
        <EuiModalBody>
          {examItem}
          {espacementInterExamenForm}
        </EuiModalBody>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiModalFooter className='footer_centered' style={{justifyContent: 'center'}}>
          <EuiButtonEmpty onClick={closeModal} fill className="button_cancel">Annuler</EuiButtonEmpty>
          <EuiButton type="submit" form={modalFormId} onClick={closeModal} fill className="button_next">
            Suivant
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    ); 
  }
  return (
    <div>
      <EuiButton onClick={showModal}>Show form modal</EuiButton>
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