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
} from '@elastic/eui';
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import React, { useState, useEffect } from 'react';
import { createModele } from '../utils/fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep, startLoading } from '../actions';
import { getStepByKey } from '../utils/helper';
import { STEP1 } from '../utils/constants';

const ModelForm = ({ closeModal }) => {
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const dispatch = useDispatch();
  const steps = useSelector(state => state.steps);
  const [isGroup, setIsGroup] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [nomModele, setNomModele] = useState("");
  const [nbOccurence, setNombreOccurence] = useState("");
  const [periode, setPeriode] = useState();
  // const [reload, setReload] = useState(false);
  // const [groupeRdv, setGroupRdv] = useState();
  let step = getStepByKey(steps, STEP1);

  // console.log('all step ', steps);
  // console.log('selected step ', step);

  const onChangeGroupModelCheckbox = (is_group) => {
    setIsGroup(is_group);
  };

  const onChangeNomModeleField = (val) => {
    console.log('test pull sur le main v2');
    setNomModele(val.target.value);
  };

  const onClickNext = () => {
    dispatch(startLoading());
    dispatch(createModele(step));
  };

  useEffect(() => {
    if (isFirstLoad) {
      const data = {
        nomModele: nomModele,
        nbOccurence: nbOccurence,
        isGroup: isGroup,
        periode: periode
      }
      step.data = data;
      dispatch(updateStep(step));
      setIsFirstLoad(false);
    }
  }, [dispatch, isFirstLoad, isGroup, nbOccurence, nomModele, periode, step, steps]);

  return (
    <div>
      <EuiForm id={modalFormId}>
        <EuiSpacer size="m" />
        <EuiFormRow label="nom du model" fullWidth>
          <EuiFieldText name="nomModele" value={nomModele}
            onChange={onChangeNomModeleField} fullWidth />
        </EuiFormRow>
        <EuiSpacer size="m" />
        <EuiFlexGroup>
          <EuiFlexItem>
            <div className="">
              Grouper les rendez-vous :
            </div>
            <EuiFlexGroup style={{ paddingTop: 18 }}>
              <EuiFlexItem>
                <EuiFlexGroup style={{ maxWidth: 160 }}>
                  <EuiFlexItem>
                    <EuiFormRow>
                      <EuiRadio
                        id={htmlIdGenerator()()}
                        label="Oui"
                        value={true}
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
                        value={false}
                        checked={!isGroup}
                        onChange={() => onChangeGroupModelCheckbox(false)}
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          {isGroup &&
            <EuiFlexItem style={{ maxWidth: '85%', marginLeft: '15%' }}>
              <EuiFormRow label="Nombre d'occurrences*:" fullWidth>
                <EuiFieldNumber name={nbOccurence} value={nbOccurence}
                  onChange={setNombreOccurence} fullWidth />
              </EuiFormRow>
            </EuiFlexItem>
          }
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        {isGroup &&
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiFormRow label="Période de recherche d'un groupe*:" fullWidth>
                <EuiFieldNumber name="periode" value={periode}
                  onChange={setPeriode} fullWidth />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="" style={{ marginTop: 21 }} fullWidth>
                <EuiFieldNumber fullWidth />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        }
        <EuiFlexGroup className='btn_group'>
          <EuiButtonEmpty onClick={closeModal} fill className="button_cancel">
            Annuler
          </EuiButtonEmpty>
          <EuiButton form={modalFormId} onClick={onClickNext} fill className="button_next">
            Suivant
          </EuiButton>
        </EuiFlexGroup>
      </EuiForm>
    </div>
  );
};

export default ModelForm;