import {
    EuiFlexGroup,
    EuiFlexItem,
  } from '@elastic/eui';
  import React from 'react';
  
  import { ReactComponent as EllipsisSvg } from "../assets/svgs/ellipsis-v.svg";
  
  const ExamenItem = () => {
    return (
        <EuiFlexGroup className='examenItem'>
            <EuiFlexItem grow={false}>
                <span className='icon_ellipsis'><EllipsisSvg style={{height: 14}}/></span>
            </EuiFlexItem>
            <EuiFlexItem className='examenItem_left'>
                <EuiFlexGroup>
                <EuiFlexItem grow={false} className='icon_container'>
                    <span className='icon'><EllipsisSvg/></span>
                </EuiFlexItem>
                <EuiFlexItem>
                    <span className='examenItem_label examen_name'>Examen 1</span>
                </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem className='examenItem_rigth'>
                <EuiFlexGroup>
                <EuiFlexItem grow={false}>
                    <span className='examenItem_label'>"Spécialité"-"Motif"</span>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <span>|</span>
                </EuiFlexItem>
                <EuiFlexItem>
                    <span className='examenItem_label'>"Praticien"-"Lieu"</span>
                </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    );
  };
  
  export default ExamenItem;