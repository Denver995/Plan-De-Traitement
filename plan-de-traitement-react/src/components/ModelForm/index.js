import React, { useState } from "react";
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
  EuiToolTip
} from "@elastic/eui";
import { useDimension } from "../../hooks/dimensions";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  addStep,
  updateStep,
  desactivateStep,
} from "../../redux/steps/actions";
import { startLoading, stopLoading } from "../../redux/commons/actions";
import {
  createGroups,
  numOfGroupsChange,
  CreateEspacement,
} from "../../redux/examens/actions";
import {
  setModelData,
  updateModel,
} from "../../redux/models/actions";

import { getStepByKey, createStep } from "../../utils/helper";
import { createModel, deleteModel, createModelGroupe } from "../../utils/fetcher";
import { STEP1, STEP2 } from "../../utils/constants";
import ModalWrapper from "../common/ModalWrapper";
import { ReactComponent as InfoIcon } from "../../assets/svgs/Soustraction-1.svg";
import Radio from "../Radio";
import styles from "./styles";

const ModalForm = ({closeModal, onSaveChange, isEdited, modelData }) => {
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const [groupe_rdv, setIsGroup] = useState();
  const [nomModele, setNomModele] = useState(isEdited ? modelData.nom : "");
  const [nombreOccurence, setNombreOccurence] = useState(4);
  const [periode, setPeriode] = useState("1");
  const [typePeriode, setTypePeriode] = useState();
  const [showGroupOption, setShowGroupOption] = useState(false);
  const { innerWidth } = useDimension();
  let step = getStepByKey(steps, STEP1);

  const listTypePeriode = [
    { value: "jour", text: "Jour" },
    { value: "mois", text: "Mois" },
    { value: "année", text: "Année" },
  ];

  const onChangeGroupModelCheckbox = (is_group) => setIsGroup(is_group);

  const onChangeNomModeleField = (val) => setNomModele(val.target.value);

  const onChangeTypePeriode = (e) => {
    setTypePeriode(e.target.value);
  };

  const getModelById = () => {

  }

  const closeModale = () => {
       closeModal();
       deleteModel(1);
  }

  const createModele = (values) => {
    let nextStep = createStep(STEP2);
    nextStep.previousStep = values;
    dispatch(desactivateStep(STEP1));
    dispatch(addStep(nextStep));
  };
  const onClickNext = () => {
    if (showGroupOption) {
      dispatch(startLoading(true));
      const data = {
        nom: nomModele,
        nb_occurence: nombreOccurence,
        groupe_rdv: groupe_rdv ? 1 : 0,
        id_entite: 4,
        periode: periode ? periode : 1,
        id_modele: 1,
        typePeriode: typePeriode
      };
      step.data = data;

      console.log("my step ");
      console.log(step);
 if(groupe_rdv){
      createModelGroupe(data);
      dispatch(createGroups(nombreOccurence));
      dispatch(CreateEspacement(nombreOccurence - 1));
      dispatch(updateStep(step));
      createModele(step);
      dispatch(setModelData(data));
  }else {
      dispatch(createGroups(nombreOccurence));
      dispatch(CreateEspacement(nombreOccurence - 1));
      dispatch(updateStep(step));
      createModele(step);
      dispatch(setModelData(data));
  }
      
    } else{
      setShowGroupOption(true);
      const payload = {
        nom: nomModele,
        nb_occurence: nombreOccurence,
        groupe_rdv: groupe_rdv ? 1 : 0
      };
      createModel(payload,dispatch);
    } 
  };

  return (
    <ModalWrapper className="modale-modelForm" style={styles.modal}>
      <EuiForm id={modalFormId} style={styles.form}>
        <EuiSpacer size="xl" />
        <strong>
          <p style={styles.nomModel}>Nom du modèle: </p>
        </strong>
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
                <span style={{ marginTop: 2 }}>
                  <EuiToolTip
                    position="right"
                    content="Création de plusieurs groupes de rendez-vous"
                    className="euiTool"
                  >
                    <InfoIcon title="" width={"1rem"} />
                  </EuiToolTip>
                </span>
              </div>
              <EuiSpacer size="m" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGroup
                    className="radio-first-container"
                    style={{ maxWidth: "100%", paddingLeft: 5 }}
                  >
                    <EuiFlexItem style={{ marginBottom: 13 }}>
                      <EuiFormRow>
                        <Radio
                          onChange={(data) => onChangeGroupModelCheckbox(data)}
                        />
                      </EuiFormRow>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="s" />
            </EuiFlexItem>
          )}
          {groupe_rdv && showGroupOption && (
            <EuiFlexItem
              style={{ paddingTop: 5 }}
              className="nombre-occurence-nomberField"
            >
              <div
                style={{
                  ...styles.occurence,
                  marginLeft: innerWidth >= 768 ? "6%" : "0%",
                }}
              >
                Nombre d'occurences* :
              </div>
              <EuiFieldNumber
                style={{
                  ...styles.fieldNumber,
                  width: innerWidth >= 768 ? "95%" : "100%",
                  marginLeft: innerWidth >= 768 ? "5%" : "0%",
                }}
                name={nombreOccurence}
                value={nombreOccurence}
                onChange={(e) => {
                  setNombreOccurence(e.target.value);
                  dispatch(numOfGroupsChange(e.target.value));
                }}
                fullWidth
                min={1}
              />
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        {groupe_rdv && showGroupOption && (
          <EuiFlexGroup
            style={{ marginLeft: -12, marginRight: -12, marginBottom: 33 }}
            direction="column"
          >
            <div style={styles.periodeRecherche}>
              <div style={styles.groupeTitle2}>
                Période de recherche d'un groupe :
              </div>
              <span style={{ marginTop: 2 }}>
                <EuiToolTip
                  position="right"
                  content="Elle permet de définir l'intervalle de temps où seront recherchés les examens du groupe"
                  className="euiTool"
                >
                  <InfoIcon title="" width={"1rem"} />
                </EuiToolTip>
              </span>
            </div>
            <EuiFlexItem>
              <div
                className="periode_recherche_group_inputs"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  flexWrap: "wrap",
                  marginTop: -18,
                }}
              >
                {/* <EuiFlexItem> */}
                <div style={{ width: "49%" }}>
                  <EuiFieldNumber
                    className="inputNomber-for-periode"
                    style={styles.fieldNumber}
                    name="periode"
                    value={periode}
                    onChange={(e) => {
                      setPeriode(e.target.value);
                    }}
                    fullWidth
                  />
                </div>
                <div style={{ width: "49%" }}>
                  <select name="cars" id="cars" style={styles.fieldNumber2} onChange={onChangeTypePeriode}>
                    {listTypePeriode.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        )}
        <EuiFlexGroup
          className="modal__form__button__container groupe-btn-modelForm"
          style={styles.footer}
        >
          <EuiButtonEmpty
            className="button_global btn-annuler-modelForm"
            onClick={() =>
              isEdited ? onSaveChange("RECAPITULATIF") : closeModale()
            }
            style={styles.cancelButton}
          >
            Annuler
          </EuiButtonEmpty>
          {isEdited ? (
            <EuiButton
              style={
                nomModele.length < 3 ? styles.addButton2 : styles.addButton
              }
              form={modalFormId}
              onClick={() => {
                dispatch(updateModel(nomModele));
                onSaveChange("RECAPITULATIF");
              }}
              disabled={nomModele.length < 3}
              fill={true}
              className="button_global btn-suivant-modelForm"
            >
              Modifier
            </EuiButton>
          ) : (
            <EuiButton
              style={
                nomModele.length < 3 ? styles.addButton2 : styles.addButton
              }
              form={modalFormId}
              onClick={() => {
                onClickNext();
              }}
              disabled={nomModele.length < 3}
              fill={true}
              className="button_global btn-suivant-modelForm"
            >
              Suivant
            </EuiButton>
          )}
        </EuiFlexGroup>
      </EuiForm>
      <style jsx="true">
            {`
              .euiTool {
                background: #052A3E;
              }
            `}
          </style>
      <EuiSpacer size="m" />
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ModelsReducer, CommonReducer }) => ({
  modelData: ModelsReducer.modelData,
  isLoading: CommonReducer.isLoading,
});

export default connect(mapStateToProps)(ModalForm);
