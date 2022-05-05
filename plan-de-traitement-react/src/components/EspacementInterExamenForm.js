import '@elastic/eui/dist/eui_theme_light.css';
import { useEuiTheme, EuiFieldNumber, EuiComboBox } from '@elastic/eui';
import {
    EuiButton,
    EuiForm,
    EuiFormRow,
    EuiFlexGroup,	
    useGeneratedHtmlId,
} from '@elastic/eui';
//import '../EspacementInterExamenForm.css';

  const EspacementInterExamenForm = ({closeModal}) => {
	const { euiTheme } = useEuiTheme();
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  return ( 
     <EuiForm id={modalFormId} component="form">
		    <p className='label_exams'><span> </span> Espacement entre l'examen 00 et l'examen 00</p>
        <p className='inter'>Espacement inter examens*:</p>
        <div className='position'>
        <EuiFlexGroup className='container'>
           <EuiFormRow label="Minimum" className="espacement_inter_examen_EuiModalBody_form_group espacement_inter_examen_EuiModalBody_form_group_left_element ajust">
             <EuiFieldNumber placeholder="" />			
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
           <EuiFlexGroup className='second'>
           <EuiFormRow label="Maximum" className="espacement_inter_examen_EuiModalBody_form_group espacement_inter_examen_EuiModalBody_form_group_left_element ajust">
             <EuiFieldNumber placeholder="" />			
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
        </div>	
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
