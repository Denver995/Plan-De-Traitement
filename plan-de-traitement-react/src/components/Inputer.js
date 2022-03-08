import {
    EuiButton,
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

  const Inputer =(props) =>{
      return(
    <EuiFlexItem>
          <EuiFormRow label = "props.value" fullWidth >  
            <EuiFieldText
             placeholder="props.placeholder"
             aria-label="Use aria labels when no actual label is in use"
            />
            </EuiFormRow>
          </EuiFlexItem>
          )
  }
  export default Inputer;