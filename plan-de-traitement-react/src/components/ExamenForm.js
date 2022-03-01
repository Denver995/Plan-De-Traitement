import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiForm,
    EuiSelect,
    EuiButton,
    EuiButtonEmpty,
    EuiCheckbox,
    useGeneratedHtmlId,
    EuiSpacer,
    EuiLink,
    EuiHorizontalRule
 } from '@elastic/eui';
 import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteStep, startLoading } from '../actions';
import { getStepByKey } from '../utils/helper';
import { STEP2 } from '../utils/constants';
import ExamenItem from './ExamenItem';

const ExamenForm = () => {
    const dispatch = useDispatch();

    const fixedExamenCheckboxId = useGeneratedHtmlId({
        prefix: 'indeterminateCheckbox',
    });
    const [fixedExamPosition, setFixedExamPosition] = useState(false);
    const steps = useSelector(state => state.steps);

    const [listExam, setListExam] = useState([]);
    
    const onClickNext = () => {
        dispatch(startLoading());
        // dispatch(createModele(step));
    };

    const onAddExamen = () => {
        console.log('listExam length ', listExam.length);
        listExam.push(listExam.length++);
        setListExam(listExam);
    };

    const onCancel = () => {
        let step = getStepByKey(steps, STEP2);
        dispatch(deleteStep(step));
    };

    const onChangePositionExamen = () => {
        setFixedExamPosition(!fixedExamPosition);
    };

    const delaiInterExamen = (intervale) => {
        return (
            <EuiFlexGroup>
                <EuiFlexItem className='delaiInterExamen'>
                    <EuiLink
                        color={"primary"}
                        href="#"
                    >
                        Délai entre "l'examen 1" et "l'examen 2" : {intervale}
                    </EuiLink>
                </EuiFlexItem>
            </EuiFlexGroup>
        )
    };

    useEffect(() => {}, [listExam])

    return (
        <div className='examForm'>
            <div style={{ marginLeft: 20}}>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <p>Modèle:</p>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <p>Xxxxxxxxxx xxxxxxxxxxx XXXX</p>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
            <div style={{ marginTop: 28, marginBottom: 28}}>
                {listExam.length > 0 && listExam.map((item, index) => (
                    <>
                        <ExamenItem />
                        {delaiInterExamen('1heure - 2heures')}
                    </>
                ))}
            </div>
            <EuiForm>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiFormRow label="Spécialité*" fullWidth>
                        <EuiSelect fullWidth/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem className="input_left">
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
                    <EuiFlexItem className="input_left">
                        <EuiFormRow label="Lieu*" fullWidth>
                        <EuiSelect fullWidth/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer size="m" />
                <EuiCheckbox
                    id={fixedExamenCheckboxId}
                    label="Fixer la position de l'examen"
                    indeterminate={fixedExamPosition}
                    onChange={() => onChangePositionExamen()}
                />
                <EuiFlexGroup className='btn_group'>
                    <EuiButtonEmpty onClick={onCancel} fill className="button_cancel_small">
                        Annuler
                    </EuiButtonEmpty>
                    <EuiButton onClick={onAddExamen} fill className="button_add">
                        Ajouter
                    </EuiButton>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiHorizontalRule className='horizontalRule'/>
                </EuiFlexGroup>
                <EuiFlexGroup justifyContent="flexEnd">
                    <EuiFlexItem grow={false}>
                        <EuiButton onClick={onAddExamen} fill className="button_finished">
                            Terminer
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiForm>
            <style jsx>
                {`
                    .euiFlexGroup .input_left {
                        margin-left: 10%;
                    }
                `}
            </style>    
        </div>
    );
};
 
export default ExamenForm;