import React, { useState, useEffect } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiFieldNumber,
  EuiForm,
  EuiSpacer,
  EuiFieldText,
  useGeneratedHtmlId,
  EuiButton,
  EuiButtonEmpty,
  EuiToolTip,
  EuiSelect
} from "@elastic/eui";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  addStep,
  updateStep,
  desactivateStep,
} from "../../redux/steps/actions";
import { startLoading } from "../../redux/commons/actions";
import { createGroups, numOfGroupsChange } from "../../redux/examens/actions";
import { createModel as createModelAction} from "../../redux/models/actions";

import { getStepByKey, createStep } from "../../utils/helper";
import { STEP1, STEP2 } from "../../utils/constants";
import ModalWrapper from '../common/ModalWrapper';
import { ReactComponent as InfoIcon } from '../../assets/svgs/Soustraction-1.svg';
import Radio from '../Radio';
import colors from '../../utils/colors';

import styles from "./styles";

const ModalForm = ({ closeModal }) => {
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const [groupe_rdv, setIsGroup] = useState(false);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [nomModele, setNomModele] = useState("");
  const [nombreOccurence, setNombreOccurence] = useState(4);
  const [periode, setPeriode] = useState("1");
  const [typePeriode, setTypePeriode] = useState();
  const [showGroupOption, setShowGroupOption] = useState(false);

  let step = getStepByKey(steps, STEP1);

  const listTypePeriode = [
    { value: 'jour', text: 'Jour' },
    { value: 'mois', text: 'Mois' },
    { value: 'année', text: 'Année' },
  ];

  const onChangeGroupModelCheckbox = (is_group) => setIsGroup(is_group);

  const onChangeNomModeleField = (val) => setNomModele(val.target.value);

  const onChangeTypePeriode = (e) => {
    setPeriode(e.target.value);
  };

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
      dispatch(createModelAction({
        nom: nomModele + Math.round(Math.random() * 100),
        nb_occurence: nombreOccurence,
        groupe_rdv: groupe_rdv ? 1: 0,
        id_granularite_groupe: 4,
        id_granularite_examen: 4,
        id_entite: 4,
        espacement_groupe: 2,
        espacement_examen: 4,
      }))
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
      <EuiForm id={modalFormId} style={styles.form}>
        <EuiSpacer size="xl" />
          <p style={styles.nomModel}>Nom du modele: </p>
          <EuiFieldText
            name="nomModele"
            style={styles.inputModal}
            value={nomModele}
            onChange={onChangeNomModeleField}
            fullWidth
          />
        <EuiSpacer size="xl" />
        <EuiFlexGroup>
          {showGroupOption && (
            <EuiFlexItem>
              <div style={styles.toolTipCon}>
                <div style={styles.groupeTitle}>Grouper les rendez-vous :</div>
                <span style={{marginTop: 2}}>
                <EuiToolTip
                  position="right"
                  content="Création de plusieurs groupes de rendez-vous"
                >
                 <InfoIcon width={"1rem"} />
                </EuiToolTip>
                </span>
              </div>
              <EuiSpacer size="l" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGroup style={{ maxWidth: 160 }}>
                    <EuiFlexItem style={{marginBottom: 13}}>
                      <EuiFormRow>
                        <Radio onChange={(data) =>  onChangeGroupModelCheckbox(data)} />
                      </EuiFormRow>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          )}
          {groupe_rdv && showGroupOption && (
            <EuiFlexItem style={{ maxWidth: "85%", marginLeft: "15%" }}>
              <EuiFormRow style={{fontSize: 14}} label="Nombre d'occurrences*:" fullWidth>
                <EuiFieldNumber
                style={{color: colors.primary}}
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
          <EuiFlexGroup style={{marginLeft: 0, marginRight: 0, marginBottom: 33}} direction="column">
            <div style={styles.periodeRecherche}>
                <div style={styles.groupeTitle}>Période de recherche d'un groupe :</div>
                <span style={{marginTop: 2}}>
                <EuiToolTip
                  position="right"
                  content="Elle permet de définir l'intervalle de temps où seront recherché les examens du groupe"
                >
                 <InfoIcon width={"1rem"} />
                </EuiToolTip>
                </span>
              </div>
            <EuiFlexItem>
              <EuiFlexGroup justifyContent="spaceBetween">
                {/* <EuiFlexItem> */}
                <EuiFieldNumber
                  name="periode"
                  value={periode}
                  onChange={(e) => {
                    setPeriode(e.target.value);
                  }}
                  style={{width: '95%', color: colors.primary}}
                  fullWidth
                />
                {/* </EuiFlexItem>
                <EuiFlexItem> */}
                <EuiSelect
                  options={listTypePeriode}
                  value={typePeriode}
                  onChange={(e) => onChangeTypePeriode(e)}
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
