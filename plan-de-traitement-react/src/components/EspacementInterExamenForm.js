import '@elastic/eui/dist/eui_theme_light.css';
import { css } from '@emotion/react';
import { EuiProvider, useEuiTheme, EuiFieldNumber, EuiComboBox } from '@elastic/eui';
import { useState } from 'react'; 
import {
    EuiButton,
    EuiButtonEmpty,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiFlexGroup,	
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    useGeneratedHtmlId,
  } from '@elastic/eui';
//import '../EspacementInterExamenForm.css';

const EspacementInterExamenForm = ({closeModal}) => {
	const { euiTheme } = useEuiTheme();
/*    const [isModalVisible, setIsModalVisible] = useState(false);
 */ 
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
 /* 
    const closeModal = () => setIsModalVisible(false);
  
    const showModal = () => setIsModalVisible(true);

    const formSample = (
      <EuiForm id={modalFormId} component="form">
	    <div>
		<p>Espaacement entre l'examen 00 et l'examen 00</p>
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
    );  */
  
 /*   let modal;
  
    if (isModalVisible) {
      modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]" style={{ width: 668}}>
          <EuiModalHeader className="espacement_inter_examen_EuiModalHeader">
            <EuiModalHeaderTitle>
            </EuiModalHeaderTitle>
          </EuiModalHeader>  
  
          <EuiModalBody className="espacement_inter_examen_EuiModalBody">
		   <p>Espaacement entre l'examen 00 et l'examen 00</p>
		  {formSample}
		  </EuiModalBody>
  
          <EuiModalFooter alignItems="center" className=" espacement_inter_examen_EuiModalFooter" style={{justifyContent: 'center'}}>
            <EuiButton onClick={closeModal} className="espacement_inter_examen_EuiModalFooter_left_button">
			Annuler
			</EuiButton>
  
            <EuiButton isDisabled={true} type="submit" form={modalFormId} onClick={closeModal} css={{ backgroundColor: euiTheme.colors.disabled }}  className="espacement_inter_examen_EuiModalFooter_right_button">
              Valider
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>     
      );
    }	*/
  return (
/*  <EuiProvider colorMode="light">
      <div>
        <EuiButton onClick={showModal}>Show form modal</EuiButton>
        {modal}
      </div>
    </EuiProvider>  */	  
      <EuiForm id={modalFormId} component="form">
		<p>Espacement entre l'examen 00 et l'examen 00</p>
		<EuiFlexGroup>
           <EuiFormRow label="Espacement inter examens*:" className="espacement_inter_examen_EuiModalBody_form_group espacement_inter_examen_EuiModalBody_form_group_left_element">
             <EuiFieldNumber placeholder=" " />			
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
           </EuiFlexGroup>
		   <div className="espacement_inter_examen_EuiModalFooter_spacer"></div>
          <EuiFlexGroup className="btn_group espacement_inter_examen_EuiModalFooter">
            <EuiButton onClick={closeModal} className="button_cancel espacement_inter_examen_EuiModalFooter_left_button">
			Annuler
			</EuiButton>
  
            <EuiButton isDisabled={true} type="submit" form={modalFormId} onClick={closeModal} css={{ backgroundColor: euiTheme.colors.disabled }}  className="button_next espacement_inter_examen_EuiModalFooter_right_button">
              Valider
            </EuiButton>
          </EuiFlexGroup>				
      </EuiForm>	
  );
}

export default EspacementInterExamenForm;
