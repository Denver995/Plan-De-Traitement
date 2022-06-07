import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addStep,
  updateStep,
  desactivateStep,
} from "../../redux/steps/actions";
import { startLoading } from "../../redux/commons/actions";
import { createGroups, numOfGroupsChange } from "../../redux/examens/actions";
import { getStepByKey, createStep } from "../../utils/helper";
import { STEP1, STEP2 } from "../../utils/constants";
import Button from "../Buttons/ButtonLight";
import ModalWrapper from "../common/ModalWrapper";
import { ReactComponent as InfoIcon } from "../../assets/svgs/Soustraction-1.svg";

import styles from "./styles";

const ModalForm = ({ closeModal }) => {
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
    dispatch(numOfGroupsChange(nombreOccurence));
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
    <ModalWrapper style={styles.modal}>
      <EuiForm id={modalFormId} style={styles.container}>
        <div>
          <EuiSpacer size="xl" />
          <p style={styles.text}>Nom du modèle :</p>
          <EuiFieldText
            style={styles.input}
            value={nomModele}
            onChange={onChangeNomModeleField}
            fullWidth
          />
        </div>
        <EuiSpacer size="m" />
        <EuiFlexGroup>
          {showGroupOption && (
            <EuiFlexItem>
              <EuiSpacer size="m" />
              <div style={styles.groupContainer}>
                <div style={styles.groupRdv}>Grouper les rendez-vous :</div>
                <EuiToolTip
                  position="right"
                  content="Création de plusieurs groupes de rendez-vous"
                >
                  <InfoIcon width="1rem" />
                </EuiToolTip>
              </div>
              <EuiFlexGroup style={{ paddingTop: 10 }}>
                <EuiFlexItem>
                  <EuiFlexGroup style={styles.radioContainer}>
                    <EuiFlexItem style={styles.leftItem}>
                      <EuiRadio
                        id={htmlIdGenerator()()}
                        value={true}
                        checked={groupe_rdv}
                        onChange={() => onChangeGroupModelCheckbox(true)}
                      />
                      <p style={styles.radioLabel}>Oui</p>
                    </EuiFlexItem>
                    <EuiFlexItem style={styles.rightItem}>
                      <EuiRadio
                        id={htmlIdGenerator()()}
                        value={false}
                        checked={!groupe_rdv}
                        onChange={() => onChangeGroupModelCheckbox(false)}
                      />
                      <p style={styles.radioLabel}>Non</p>
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
                  onChange={(e) => {
                    setNombreOccurence(e.target.value);
                    dispatch(numOfGroupsChange(e.target.value));
                  }}
                  fullWidth
                  min={1}
                />
              </EuiFormRow>
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        {groupe_rdv && showGroupOption && (
          <EuiFlexGroup
            style={{ marginLeft: 5, marginRight: 5 }}
            direction="column"
          >
            <EuiFlexItem>
              <EuiFlexGroup>
                <span>Période de recherche d'un groupe*:</span>
                <span className="tooltip">
                  <EuiToolTip
                    position="right"
                    content="Création de plusieurs groupes de rendez-vous"
                  >
                    <EuiIcon type="iInCircle" size="l" />
                  </EuiToolTip>
                </span>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup justifyContent="spaceBetween">
                {/* <EuiFlexItem> */}
                <EuiFieldNumber
                  name="periode"
                  value={periode}
                  onChange={setPeriode}
                  style={{ width: "95%" }}
                  fullWidth
                />
                {/* </EuiFlexItem>
                <EuiFlexItem> */}
                <EuiFieldNumber
                  name="periode"
                  value={periode}
                  onChange={setPeriode}
                  style={{ width: "95%", position: "absolute", right: 0 }}
                  fullWidth
                />

                {/* </EuiFlexItem> */}
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        )}
        <EuiFlexGroup style={styles.footer}>
          <EuiButtonEmpty onClick={closeModal} style={styles.cancelButton}>
            Annuler
          </EuiButtonEmpty>
          <EuiButton
            style={styles.addButton}
            form={modalFormId}
            onClick={() => {
              onClickNext();
              dispatch(createGroups());
            }}
            disabled={nomModele.length < 3}
            fill={true}
            className=""
          >
            Suivant
          </EuiButton>
        </EuiFlexGroup>
      </EuiForm>
      <EuiSpacer size="m"/>
    </ModalWrapper>
  );
};

export default ModalForm;
