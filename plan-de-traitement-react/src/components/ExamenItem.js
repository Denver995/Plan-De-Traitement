import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
    EuiPopover,
    useGeneratedHtmlId,
    EuiListGroupItem,
    EuiListGroup
  } from '@elastic/eui';
  import React, { useState } from 'react';
  import ModifierExam from './ModifierExamen';
  
  import { ReactComponent as EllipsisSvg } from "../assets/svgs/ellipsis-v.svg";
  
  const ExamenItem = () => {
    const [isPopoverOpen, setPopover] = useState(false);
    const [panelRef, setPanelRef] = useState(null);

    const contextMenuPopoverId = useGeneratedHtmlId({
        prefix: 'contextMenuPopover',
    });

    const closePopover = () => setPopover(false);

    const togglePropover = () => setPopover(!isPopoverOpen);

    const onEdit = () =>  {

    }

    const button = (
        <span onClick={togglePropover}><EllipsisSvg style={{ height: 14 }} /></span>
    );

    return (
        <>
            <EuiFlexGroup className='examenItem'>
                <EuiFlexItem grow={false} className='icon_ellipsis'>
                    {/* <span onClick={togglePropover}><EllipsisSvg style={{height: 14}}/></span> */}
                    <EuiPopover
                        id={contextMenuPopoverId}
                        button={button}
                        isOpen={isPopoverOpen}
                        closePopover={closePopover}
                        panelPaddingSize="s"
                        anchorPosition="downLeft"
                        container={panelRef}
                    >
                        <EuiListGroup>
                            <EuiListGroupItem onClick={onEdit} label="Modifier" />
                            <EuiListGroupItem onClick={() => {}} label="Supprimer" />
                            <EuiListGroupItem onClick={() => {}} label="Fixer la position" />
                            <EuiListGroupItem onClick={() => {}} label="Lier avec un autre examen" />
                        </EuiListGroup>
                    </EuiPopover>
                    <EuiSpacer size="xxl" />
                    <EuiSpacer size="xxl" />
                </EuiFlexItem>
                <EuiFlexItem className='examenItem_left'>
                    <EuiFlexGroup>
                        <EuiFlexItem grow={false} className='icon_container'>
                            <span className='icon'><EllipsisSvg /></span>
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
        </>
    );
};

export default ExamenItem;