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
import { deleteStep, startLoading, addStep, desactivateStep } from '../actions';
import { getStepByKey, createStep } from '../utils/helper';
import { STEP2, STEP3 } from '../utils/constants';
import ExamenItem from './ExamenItem';
import '../modifierexamen.css'

const ExamenForm = () => {
    const dispatch = useDispatch();
    const fixedExamenCheckboxId = useGeneratedHtmlId({
        prefix: 'indeterminateCheckbox',
    });
    const steps = useSelector(state => state.steps);
    const examenSelected = useSelector(state => state.examenSelected);
    const [fixedExamPosition, setFixedExamPosition] = useState(false);
    const [listExam, setListExam] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [reload, setReload] = useState(false);
    const [specialite, setSpecialite] = useState("");
    const [motif, setMotif] = useState("");
    const [praticien, setPraticien] = useState("");
    const [lieu, setLieu] = useState("");
    const [selectedExamId, setSelectedExamId] = useState("");

    const previousStep = getStepByKey(steps, STEP2);

    const fakeData = {
        id: 1,
        label: "Emam",
        specialtite: "Spécialité",
        motif: "Motif",
        praticien: "Praticien",
        lieu: "Lieu"
    }

    // const examList = [
    //     { value: 'exam_one', text: 'Exam1' },
    //     { value: 'exam_two', text: 'Exam2' },
    //     { value: 'exam_three', text: 'Exam3' },
    // ];

    const listMotif = [
        { value: 'motif_one', text: 'Motif1' },
        { value: 'motif_two', text: 'Motif2' },
        { value: 'motif_three', text: 'Motif3' },
    ];

    const listSpecialite = [
        { value: 'specialite_one', text: 'Spécialité1' },
        { value: 'specialite_two', text: 'Spécialité2' },
        { value: 'specialite_thr', text: 'Spécialité3' },
    ];

    const listPraticien = [
        { value: 'praticien_one', text: 'Praticien1' },
        { value: 'praticien_two', text: 'Praticien2' },
        { value: 'praticien_thr', text: 'Praticien3' },
    ];

    const listLieu = [
        { value: 'lieu_one', text: 'Lieu1' },
        { value: 'lieu_two', text: 'Lieu2' },
        { value: 'lieu_thr', text: 'Lieu3' },
    ];

    const onChangePositionExamen = () => {
        setFixedExamPosition(!fixedExamPosition);
    };

    const onChangeSpecialite = (e) => setSpecialite(e.target.value);

    const onChangeMotif = (e) => setMotif(e.target.value);

    const onChangePraticien = (e) => setPraticien(e.target.value);

    const onChangeLieu = (e) => setLieu(e.target.value);

    const onClickNext = () => {
        let nextStep = createStep(STEP3);
        nextStep.previousStep = previousStep;
        dispatch(startLoading());
        dispatch(desactivateStep(STEP2));
        dispatch(addStep(nextStep));
    };

    const onAddExamen = () => {
        listExam.push(listExam.length++);
        setListExam(listExam);
        setReload(true);
    };

    const updateFormData = (resetFormData, exam=null) => {
        setLieu(resetFormData ? "":exam?.specialtite);
        setPraticien(resetFormData ? "":exam?.praticien);
        setMotif(resetFormData ? "":exam?.motif);
        setSpecialite(resetFormData ? "":exam?.specialtite);
    };

    const onEditExamen = () => {
        updateFormData(true);
        setShowEditForm(false);
    }

    const onCancel = () => {
        dispatch(deleteStep(previousStep));
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
        );
    };

    useEffect(() => {
        if(reload) setReload(false);
        if (examenSelected.id && examenSelected.id !== selectedExamId) {
            setSelectedExamId(examenSelected.id);
            updateFormData(examenSelected, false);
        }
    }, [reload, examenSelected, showEditForm, steps])

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
            {!reload &&
                <div style={{ marginTop: 28, marginBottom: 28}}>
                    {listExam.length > 0 && listExam.map((item, index) => (
                        <>
                            <ExamenItem data={fakeData} key={index} showEditForm={setShowEditForm}/>
                            {delaiInterExamen('1heure - 2heures')}
                        </>
                    ))}
                </div>
            }
            <EuiForm>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiFormRow label="Spécialité*" fullWidth>
                        <EuiSelect fullWidth options={listSpecialite} value={specialite} onChange={onChangeSpecialite}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem className="input_left">
                        <EuiFormRow label="Motif*" fullWidth>
                        <EuiSelect fullWidth options={listMotif} value={motif} onChange={onChangeMotif}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiFormRow label="Praticien*" fullWidth>
                        <EuiSelect fullWidth options={listPraticien} value={praticien} onChange={onChangePraticien}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem className="input_left">
                        <EuiFormRow label="Lieu*" fullWidth>
                        <EuiSelect fullWidth options={listLieu} value={lieu} onChange={onChangeLieu}/>
                        </EuiFormRow>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer size="m" />
                <EuiCheckbox
                    id={fixedExamenCheckboxId}
                    label="Fixer la position de l'examen"
                    indeterminate={fixedExamPosition}
                    onChange={onChangePositionExamen}
                />
                {showEditForm ? (
                    <EuiFlexGroup className='btn_group'>
                        <EuiButtonEmpty fill className="button_cancel_me">
                            Retour
                        </EuiButtonEmpty>
                        <EuiButton onClick={onEditExamen} fill className="button_next_me">
                            Enregistrer
                        </EuiButton>
                    </EuiFlexGroup> 
                ):(
                    <EuiFlexGroup className='btn_group'>
                        <EuiButtonEmpty onClick={onCancel} fill className="button_cancel_small">
                            Annuler
                        </EuiButtonEmpty>
                        <EuiButton onClick={onAddExamen} fill className="button_add">
                            Ajouter
                        </EuiButton>
                    </EuiFlexGroup>
                )}
                {!showEditForm && listExam.length > 2 && 
                    <>
                        <EuiFlexGroup>
                            <EuiHorizontalRule className='horizontalRule'/>
                        </EuiFlexGroup>
                        <EuiFlexGroup justifyContent="flexEnd">
                            <EuiFlexItem grow={false}>
                                <EuiButton onClick={onClickNext} fill className="button_finished">
                                    Terminer
                                </EuiButton>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </>
                }
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