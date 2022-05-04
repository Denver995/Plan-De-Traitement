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
  import { useDispatch } from 'react-redux';

  import { editExam } from '../../../redux/commons/actions';
  
  const ExamenItem = ({data, showEditForm, color}) => {
    const dispatch = useDispatch();
    const [isPopoverOpen, setPopover] = useState(false);
    const [panelRef] = useState(null);

    const contextMenuPopoverId = useGeneratedHtmlId({
        prefix: 'contextMenuPopover',
    });

    const closePopover = () => setPopover(false);

    const togglePropover = () => setPopover(!isPopoverOpen);

    const onEdit = () =>  {
        dispatch(editExam(data));
        showEditForm(true);
    }

    const button = (
        <span onClick={togglePropover} className="icon-ellipsis-v"></span>
    );

    return (
        <>
            <EuiFlexGroup className='examenItem' style={{backgroundColor: color}}>
                <EuiFlexItem grow={false} className='icon_ellipsis'>
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
                            <span onClick={togglePropover} className="icon-Trac-39"></span>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <span className='examenItem_label examen_name'>{data.label}</span>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlexItem>
                <EuiFlexItem className='examenItem_rigth'>
                    <EuiFlexGroup>
                        <EuiFlexItem grow={false}>
                            <span className='examenItem_label'>{data.specialtite}-{data.motif}</span> 
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <span>|</span>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <span className='examenItem_label'>{data.praticien}-{data.lieu}</span>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlexItem>
            </EuiFlexGroup>
        </>
    );
};

export default ExamenItem;