import '@elastic/eui/dist/eui_theme_light.css';
import { css } from '@emotion/react';
import { EuiProvider, useEuiTheme} from '@elastic/eui';
import { useState } from 'react'; 
import {
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
    EuiIcon,
    EuiButtonIcon,   
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    useGeneratedHtmlId,
  } from '@elastic/eui';

  const AlertPopUpEnregistrementRdv = () => {
	const { euiTheme } = useEuiTheme();
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  
    const closeModal = () => setIsModalVisible(false);
  
    const showModal = () => setIsModalVisible(true);
  
    const alertBody = (
      <div>
        <p className='pop_up_enregistrement_rdv_title'>
            <EuiIcon type="checkInCircleFilled" size="xl" />
            <span className='pop_up_enregistrement_rdv_horizontal_spacer'></span>
            <span className='pop_up_enregistrement_rdv_horizontal_spacer'></span>
            Les rendez-vous ont été enregistrés !
        </p>
          <EuiFlexGroup direction="column">
             <EuiFlexItem grow={false} className="pop_up_enregistrement_rdv_euiItemFlex">
               <span>Modèle <span className='pop_up_enregistrement_rdv_horizontal_spacer'>:</span>
                 <span className='pop_up_enregistrement_rdv_data_value'>*Nom modèle*</span>
               </span>
             </EuiFlexItem>
             <EuiFlexItem grow={false} className="pop_up_enregistrement_rdv_euiItemFlex">
               <span>Examen <span className='pop_up_enregistrement_rdv_horizontal_spacer'>:</span>
                 <span>4 examens</span>
               </span>
             </EuiFlexItem>
             <EuiFlexItem grow={false} className="pop_up_enregistrement_rdv_euiItemFlex">
               <span>Patient <span className='pop_up_enregistrement_rdv_horizontal_spacer'>:</span>
                 <span className='pop_up_enregistrement_rdv_data_value'>*Civ. NOM Prénom*</span>
               </span>
             </EuiFlexItem>                                   
          </EuiFlexGroup>			
      </div>
    );
  
    let modal;
  
    if (isModalVisible) {
      modal = (
        <EuiModal onClose={closeModal} initialFocus="[name=popswitch]" style={{ width: 550}}>
          <EuiModalHeader className="" css={{ backgroundColor: euiTheme.colors.primary }}>
            <EuiButtonIcon iconType='pause' size='m' aria-label="pause" className='pop_up_enregistrement_rdv_header_pause_icon' />
          </EuiModalHeader>
          <EuiModalBody className="">
		        {alertBody}
		      </EuiModalBody>
  
          <EuiModalFooter alignItems="center" className=" " >
            <EuiIcon type="indexRollupApp" size="xl" /><EuiIcon type="filebeatApp" size="xl"/><EuiIcon type="createSingleMetricJob" size="xl"/>
          </EuiModalFooter>
        </EuiModal>
      );
    }	
  return (
    <EuiProvider colorMode="light">
      <div>
        <EuiButton onClick={showModal}>Show form modal</EuiButton>
        {modal}
      </div>
    </EuiProvider>	  
  ); 
  }
  export default AlertPopUpEnregistrementRdv;