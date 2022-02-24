import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiForm,
    EuiSelect,
    EuiButton,
    EuiButtonEmpty,
 } from '@elastic/eui';
 import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteStep, startLoading } from '../actions';
import { getStepByKey } from '../utils/helper';

import { STEP2 } from '../utils/constants';

 const ExamenForm = () => {
    const dispatch = useDispatch();
    const steps = useSelector(state => state.steps);
    const onClickNext = () => {
        dispatch(startLoading());
        // dispatch(createModele(step));
    };

    const onCancel = () => {
        let step = getStepByKey(steps, STEP2);
        dispatch(deleteStep(step));
    };

    return (
        <div>
            <EuiForm fullWidth>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiFormRow label="Spécialité*">
                        <EuiSelect fullWidth/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow label="Motif*">
                        <EuiSelect fullWidth/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiFormRow label="Praticien*">
                        <EuiSelect fullWidth/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiFormRow label="Lieu*">
                        <EuiSelect fullWidth/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup className='btn_group'>
                    <EuiButtonEmpty onClick={onCancel} fill className="button_cancel">
                        Annuler
                    </EuiButtonEmpty>
                    <EuiButton onClick={onClickNext} fill className="button_next">
                        Suivant
                    </EuiButton>
                </EuiFlexGroup>
            </EuiForm>
        </div>
    );
 };
 
 export default ExamenForm;