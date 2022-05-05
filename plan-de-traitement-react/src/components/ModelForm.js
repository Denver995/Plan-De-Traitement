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
  EuiToolTip,
} from "@elastic/eui";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStep, updateStep, desactivateStep } from "../redux/steps/actions";
import { startLoading } from "../redux/commons/actions";

import { getStepByKey, createStep } from "../utils/helper";
import { STEP1, STEP2 } from "../utils/constants";

import { ReactComponent as InfoIcon } from "../assets/svgs/Soustraction-1.svg";

const ModelForm = ({ closeModal }) => {
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const [groupe_rdv, setIsGroup] = useState(false);

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
    dispatch(addStep(nextStep));
  };
  const onClickNext = () => {
    if (showGroupOption) {
      dispatch(startLoading());
      const data = {
        nom: nomModele,
        nb_occurence: nombreOccurence,
        groupe_rdv: groupe_rdv ? 1 : 0,
        id_entite: 4,
        periode: periode ? periode : 1,
      };
      step.data = data;
      console.log("updateDStep: ", step);
      dispatch(updateStep(step));
      createModele(step);
    } else setShowGroupOption(true);
  };

  useEffect(() => {
    if (isFirstLoad) {
      const data = {
        nomModele: nomModele,
        nombreOccurence: nombreOccurence,
        groupe_rdv: groupe_rdv,
        periode: periode,
      };
      step.data = data;
      console.log("updateDStep: ", step);
      dispatch(updateStep(step));
      setIsFirstLoad(false);
    }
  }, [
    dispatch,
    isFirstLoad,
    groupe_rdv,
    nombreOccurence,
    nomModele,
    periode,
    step,
    steps,
  ]);

  return (
    <div>
      <EuiForm id={modalFormId} style={{ marginLeft: 20, marginRight: 20 }}>
        <EuiSpacer size="m" />
        <EuiFormRow label="nom du model" fullWidth>
          <EuiFieldText
            name="nomModele"
            value={nomModele}
            onChange={onChangeNomModeleField}
            fullWidth
          />
        </EuiFormRow>
        <EuiSpacer size="m" />
        <EuiFlexGroup>
          {showGroupOption && (
            <EuiFlexItem>
              <div className="">
                Grouper les rendez-vous :
                <EuiToolTip
                  position="right"
                  content="Création de plusieurs groupes de rendez-vous"
                >
                  <EuiIcon type="iInCircle" size="l" />
                </EuiToolTip>
              </div>
              <EuiFlexGroup style={{ paddingTop: 18 }}>
                <EuiFlexItem>
                  <EuiFlexGroup style={{ maxWidth: 160 }}>
                    <EuiFlexItem>
                      <EuiFormRow>
                        <EuiRadio
                          id={htmlIdGenerator()()}
                          label="Oui"
                          value="true"
                          checked={groupe_rdv}
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
                          checked={!groupe_rdv}
                          onChange={() => onChangeGroupModelCheckbox(false)}
                        />
                      </EuiFormRow>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          )}
          {groupe_rdv && showGroupOption && (
            <EuiFlexItem style={{ maxWidth: "85%", marginLeft: "15%" }}>
              <EuiFormRow label="Nombre d'occurrences*:" fullWidth>
                <EuiFieldNumber
                  name={nombreOccurence}
                  value={nombreOccurence}
                  onChange={setNombreOccurence}
                  fullWidth
                />
              </EuiFormRow>
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        {groupe_rdv && showGroupOption && (
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiFormRow
                label="Période de recherche d'un groupe*:"
                fullWidth
                labelAppend={
                  <span className="tooltip">
                    <EuiToolTip
                      position="right"
                      content="Création de plusieurs groupes de rendez-vous"
                    >
                      <EuiIcon type="iInCircle" size="l" />
                    </EuiToolTip>
                  </span>
                }
              >
                <EuiFieldNumber
                  name="periode"
                  value={periode}
                  onChange={setPeriode}
                  fullWidth
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="" style={{ marginTop: 21 }} fullWidth>
                <EuiFieldNumber fullWidth />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        )}
        <EuiFlexGroup className="btn_group">
          <EuiButtonEmpty onClick={closeModal} className="button_cancel">
            Annuler
          </EuiButtonEmpty>
          <EuiButton
            form={modalFormId}
            onClick={onClickNext}
            disabled={nomModele.length < 3}
            fill={true}
            className="button_next"
          >
            Suivant
          </EuiButton>
        </EuiFlexGroup>
      </EuiForm>
    </div>
  );
};

export default ModelForm;
