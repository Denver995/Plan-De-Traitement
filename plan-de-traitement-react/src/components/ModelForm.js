import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiFieldNumber,
  EuiForm,
  EuiSpacer,
  EuiFieldText,
  EuiRadio,
  useGeneratedHtmlId,
  EuiButton,
  EuiButtonEmpty,
  EuiIcon,
  EuiToolTip
} from '@elastic/eui';
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import React, { useState, useEffect } from 'react';
// import { createModele } from '../utils/fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep, startLoading, addStep, desactivateStep } from '../actions';

import { getStepByKey, createStep } from '../utils/helper';
import { STEP1, STEP2 } from '../utils/constants';

const ModelForm = ({closeModal}) => {
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const dispatch = useDispatch();
  const steps = useSelector(state => state.StepReducer.steps);
  const [isGroup, setIsGroup] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [nomModele, setNomModele] = useState("");
  const [nombreOccurence, setNombreOccurence] = useState(4);
  const [periode, setPeriode] = useState();
  const [showGroupOption, setShowGroupOption] = useState(false);
  let step = getStepByKey(steps, STEP1);

  const onChangeGroupModelCheckbox = (is_group) => setIsGroup(is_group);

  const onChangeNomModeleField = (val) => setNomModele(val.target.value);

  const createModele = (values) => {
     let nextStep = createStep(STEP2);
     nextStep.previousStep = values;
     dispatch(desactivateStep(STEP1));
     dispatch(addStep((nextStep)));
  }
  const onClickNext = () => {
     if(showGroupOption){
          dispatch(startLoading());
          const data = {
               nomModele: nomModele,
               nombreOccurence: nombreOccurence,
               isGroup: isGroup,
               periode: periode ? periode : 1
          }
          step.data = data;
          console.log('updateDStep: ', step);
          dispatch(updateStep(step));
          dispatch(createModele(step));
     }else setShowGroupOption(true);
  };

useEffect(() => {
     if(isFirstLoad){
          const data = {
               nomModele: nomModele,
               nombreOccurence: nombreOccurence,
               isGroup: isGroup,
               periode: periode
          }
          step.data = data;
          console.log('updateDStep: ', step);
          dispatch(updateStep(step));
          setIsFirstLoad(false);
     }
}, [dispatch, isFirstLoad, isGroup, nombreOccurence, nomModele, periode, step, steps]);

return ( 
     <div>
          <EuiForm id={modalFormId}>
               <EuiSpacer size="m" />
               <EuiFormRow label="nom du model" fullWidth>
                    <EuiFieldText name="nomModele" value={nomModele} 
                    onChange={onChangeNomModeleField} fullWidth/>
               </EuiFormRow>
               <EuiSpacer size="m" />
               <EuiFlexGroup>
                    {showGroupOption && 
                         <EuiFlexItem>
                              <div className="">
                              Grouper les rendez-vous :
                              <EuiToolTip position="right" content="Création de plusieurs groupes de rendez-vous">
                                   <EuiIcon type="iInCircle" size='l'/>
                              </EuiToolTip>
                              </div>
                              <EuiFlexGroup style={{ paddingTop: 18}}>
                                   <EuiFlexItem>
                                        <EuiFlexGroup style={{ maxWidth: 160 }}>
                                             <EuiFlexItem>
                                                  <EuiFormRow>
                                                       <EuiRadio
                                                       id={htmlIdGenerator()()}
                                                       label="Oui"
                                                       value="true"
                                                       checked={isGroup}
                                                       onChange={() => onChangeGroupModelCheckbox(true)}
                                                       />
                                                  </EuiFormRow>
                                             </EuiFlexItem>
                                             <EuiFlexItem>
                                                  <EuiFormRow>
                                                       <EuiRadio
                                                       id={htmlIdGenerator()()}
                                                       label="Non"
                                                       value="false"
                                                       checked={!isGroup}
                                                       onChange={() => onChangeGroupModelCheckbox(false)}
                                                       />
                                                  </EuiFormRow>
                                             </EuiFlexItem>
                                        </EuiFlexGroup>
                                   </EuiFlexItem>
                              </EuiFlexGroup>
                         </EuiFlexItem>
                    }
                    {isGroup && showGroupOption &&
                         <EuiFlexItem style={{ maxWidth: '85%',marginLeft: '15%'}}>
                              <EuiFormRow label="Nombre d'occurrences*:" fullWidth>
                                   <EuiFieldNumber name={nombreOccurence} value={nombreOccurence} 
                                   onChange={setNombreOccurence}   fullWidth/>
                              </EuiFormRow>
                         </EuiFlexItem>
                    }
               </EuiFlexGroup>
               <EuiSpacer size="m" />
               {isGroup && showGroupOption &&
               <EuiFlexGroup>
                      <EuiFlexItem>
                           <EuiFormRow label="Période de recherche d'un groupe*:" fullWidth
                                labelAppend={
                                     <span className='tooltip'>
                                          <EuiToolTip position="right" content="Création de plusieurs groupes de rendez-vous">
                                               <EuiIcon type="iInCircle" size='l'/>
                                          </EuiToolTip>
                                     </span>
                                }
                           >
                                <EuiFieldNumber name="periode" value={periode} 
                                onChange={setPeriode} fullWidth/>
                           </EuiFormRow>
                      </EuiFlexItem>
                      <EuiFlexItem>
                           <EuiFormRow label="" style={{marginTop: 21}} fullWidth>
                           <EuiFieldNumber fullWidth/>
                           </EuiFormRow>
                      </EuiFlexItem>
               </EuiFlexGroup>
            }
            <EuiFlexGroup className='btn_group'>
                 <EuiButtonEmpty onClick={closeModal} fill="true" className="button_cancel">
                      Annuler
                 </EuiButtonEmpty>
                 <EuiButton form={modalFormId} onClick={onClickNext} disabled={nomModele.length < 3} fill="true" className="button_next">
                      Suivant
                 </EuiButton>                                          
            </EuiFlexGroup>
          </EuiForm>
     </div>
 );
};

export default ModelForm;
