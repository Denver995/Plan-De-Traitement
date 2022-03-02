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
  import React from 'react';
  
  import { ReactComponent as EllipsisSvg } from "../assets/svgs/ellipsis-v.svg";
  
  const ExamenItem = () => {
    return (
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
    );
  };
  
  export default ExamenItem;