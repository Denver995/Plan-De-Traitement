// import '../App.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import elipse from '../../assets/svgs/ellipsis-v.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ExamenItem from './ExamenItem';
import ExamenForm from './ExamenForm';
import { setShowExamForm, startLoading, desactivateStep, addStep } from '../../actions';
import { STEP3, STEP2 } from '../../utils/constants';
import { createStep, getStepByKey } from '../../utils/helper';
import {
    EuiFlexGroup,
    EuiButton,
    EuiButtonEmpty
} from '@elastic/eui';

const GroupItem = ({groupName}) => {
    const dispatch = useDispatch();
    const [isPopoverOpen, setPopover] = useState(false);
    const [panelRef] = useState(null);

    // const contextMenuPopoverId = useGeneratedHtmlId({
    //     prefix: 'contextMenuPopover',
    // });
    const closePopover = () => setPopover(false);

    const togglePropover = () => {setPopover(!isPopoverOpen); console.log('toggle propover');}

    // const onEdit = () =>  dispatch(editExam(props.data));

    const iconElopse = (
        <span onClick={togglePropover} className="icon-ellipsis-v iconList"></span>
    );
    
    const [toggledGroup, setToggledGroup] = useState(false);
    const toggle = () => {
        setToggledGroup(v => !v)
    }

    const onAddExamen = ()  => dispatch(setShowExamForm(true));

    return (
        <div className='groups-content'>
            <div className="group-exam-item">
                <div className='bloc-1'>
                    <img src={elipse} alt='' height={15} width={15} style={{ cursor: 'pointer' }} />
                    <p>{groupName}</p>
                </div>
                <div className='bloc-2'>
                    <p>Periode de recherche : 00h</p>
                    {toggledGroup ? <ArrowDropUpIcon onClick={toggle} style={{ cursor: 'pointer' }} /> :
                        <ArrowDropDownIcon onClick={toggle} style={{ cursor: 'pointer' }} />}
                </div>
            </div>
            {toggledGroup && <div className='exams'>
                <div style={{ marginBottom: '20px' }}>
                    <hr className='divisor' color='#5d9ad4' size="1"></hr>
                    <button className='divisor-btn' onClick={onAddExamen}>
                        + Ajouter un  examen
                    </button>
                </div>
                <ExamenItem />
                <span className='delai-inter-exam'>delai entre "examen 1" et "examen 2" : 5h</span>
                <ExamenItem />
                <span className='delai-inter-exam'>delai entre "examen 2" et "examen 3" : 3h</span>
                <ExamenItem />
            </div>}
        </div>
    )
}

const GroupExamenSummary = ({nbrGroupe, isModelGroup}) => {
    const dispatch = useDispatch();
    const steps = useSelector(state => state.StepReducer.steps);
    const showForm = useSelector(state => state.CommonReducer.examen.show);
    const previousStep = getStepByKey(steps, STEP2);
    const onClickNext = () => {
        let nextStep = createStep(STEP3);
        nextStep.previousStep = previousStep;
        dispatch(startLoading());
        dispatch(desactivateStep(STEP2));
        dispatch(addStep(nextStep));
    };

    return (
        <>
            {showForm ?  
                <ExamenForm isModelGroup={isModelGroup}/> 
            :
                ([...Array(nbrGroupe).keys()].map((i) => {
                    return (
                        <GroupItem groupName={"Group "+i} key={i} listExam={[]}/>
                    );
                }))
            }
            {!showForm &&
                <>
                    <EuiFlexGroup className='btn_group' style={{margin: 17}}>
                        <EuiButtonEmpty className="button_cancel_me">
                            Retour
                        </EuiButtonEmpty>
                        <EuiButton fill={true} className="button_next_me" onClick={onClickNext}>
                            Enregistrer
                        </EuiButton>
                    </EuiFlexGroup> 
                </>
            }
        </>
    )
}

export default GroupExamenSummary;