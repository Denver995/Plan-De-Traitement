import { useEuiTheme, EuiFieldNumber, EuiComboBox, EuiFlexItem } from '@elastic/eui';
import {
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiFlexGroup,	
  useGeneratedHtmlId,
} from '@elastic/eui';
// import '../EspacementInterExamenForm.css';
import { useDispatch } from 'react-redux';
import { addExamOnAllGroups } from '../../redux/examens/actions';
import { setAlert } from '../../redux/commons/actions'
import ModalWrapper from '../common/ModalWrapper';
import styles from './styles';

  const EspacementInterExamenForm = ({closeModal, onClose}) => {
	const { euiTheme } = useEuiTheme();
  const dispatch = useDispatch();
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

  const submit = () => {
    const button = {cancelText: 'Ne pas appliquer', confirmText: 'Appliquer'};
    const alertMessage = '<EuiText className="text_alert" style={{font: normal normal 600 22px/25px Open Sans}}>Souhaitez-vous appliquer cette intervalle à tous les espacement inter examens ?</EuiText>';
    dispatch(
      setAlert({
        title: "Enregistrer le modèle",
        message: alertMessage,
        showAlert:true,
        buttonText: button,
        showButtonBlock: true,
        onAccept:()=>{dispatch(dispatch(setAlert(false)))},
        onReject:()=>{dispatch(dispatch(setAlert(false)))}
      })
      );
      // dispatch(addExamOnAllGroups());
    return;
  };

  const goBack = () => {
    dispatch(setAlert({showAlert:false,message:""}));
    onClose(true);
    return;
  }

  return ( 
    <ModalWrapper>
     <EuiForm style={styles.container} id={modalFormId} component="form">
		    <p className='label_exams' style={styles.title}><span></span>Espacement entre l'examen 00 et l'examen 00</p>
        <p className='inter' style={styles.secondTitle}>Espacement inter examens*:</p>
        <div className='position'>
        <EuiFlexGroup className='container'>
          <EuiFlexItem>
             <div>
              <span style={styles.label}>Minimum</span>
              <EuiFieldNumber placeholder="" />
             </div>
          </EuiFlexItem>
          <EuiFlexItem>
            <div>
              <span style={styles.hidden}>text</span>
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
            </div>
          </EuiFlexItem>
          <EuiFlexItem>
             <div>
               <span style={styles.label}>Maximum</span>
               <EuiFieldNumber placeholder="" />
             </div>
          </EuiFlexItem>
          <EuiFlexItem>
              <div>
                <span style={styles.hidden}>text</span>
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
              </div>
          </EuiFlexItem>
        </EuiFlexGroup>
        </div>
		    <div className="espacement_inter_examen_EuiModalFooter_spacer"></div>
        <EuiFlexGroup className="btn_group espacement_inter_examen_EuiModalFooter">
          <EuiButton onClick={goBack} className="button_cancel espacement_inter_examen_EuiModalFooter_left_button">
		        	Annuler
			    </EuiButton>
          <EuiButton type="submit" form={modalFormId} onClick={submit} css={{ backgroundColor: euiTheme.colors.disabled }}  className="button_next espacement_inter_examen_EuiModalFooter_right_button">
              Valider
          </EuiButton>
        </EuiFlexGroup>
     </EuiForm>
     </ModalWrapper>
  );
}

export default EspacementInterExamenForm;
