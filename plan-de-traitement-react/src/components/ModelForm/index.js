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
  EuiSelect,
} from "@elastic/eui";
import { useDimension } from "../../hooks/dimensions";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  addStep,
  updateStep,
  desactivateStep,
} from "../../redux/steps/actions";
import { startLoading } from "../../redux/commons/actions";
import { createGroups, numOfGroupsChange } from "../../redux/examens/actions";
import {
  createModel as createModelAction,
  setModelData,
  updateModel,
} from "../../redux/models/actions";

import { getStepByKey, createStep } from "../../utils/helper";
import { STEP1, STEP2 } from "../../utils/constants";
import ModalWrapper from "../common/ModalWrapper";
import { ReactComponent as InfoIcon } from "../../assets/svgs/Soustraction-1.svg";
import Radio from "../Radio";
import colors from "../../utils/colors";

import styles from "./styles";

const ModalForm = ({ closeModal, onSaveChange, isEdited, modelData }) => {
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const [groupe_rdv, setIsGroup] = useState();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [nomModele, setNomModele] = useState(isEdited ? modelData.nom : "");
  const [nombreOccurence, setNombreOccurence] = useState(4);
  const [periode, setPeriode] = useState("1");
  const [typePeriode, setTypePeriode] = useState();
  const [showGroupOption, setShowGroupOption] = useState(false);
  const { innerWidth } = useDimension();
  let step = getStepByKey(steps, STEP1);

  console.log("group_Rdv Form: ", groupe_rdv);

  const listTypePeriode = [
    { value: "jour", text: "Jour" },
    { value: "mois", text: "Mois" },
    { value: "année", text: "Année" },
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
        id_modele: 1,
      };
      step.data = data;
      dispatch(createGroups(nombreOccurence));
      dispatch(updateStep(step));
      createModele(step);
      dispatch(setModelData(data));
    } else setShowGroupOption(true);
  };

  // useEffect(() => {
  //   if (isFirstLoad) {
  //     const data = {
  //       nomModele: nomModele,
  //       nombreOccurence: nombreOccurence,
  //       groupe_rdv: groupe_rdv,
  //       periode: periode,
  //     };
  //     step.data = data;
  //     dispatch(updateStep(step));
  //     setIsFirstLoad(false);
  //   }
  //   dispatch(numOfGroupsChange(nombreOccurence));
  // }, [
  //   dispatch,
  //   isFirstLoad,
  //   groupe_rdv,
  //   nombreOccurence,
  //   nomModele,
  //   periode,
  //   step,
  //   steps,
  // ]);

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
                  >
                    <InfoIcon width={"1rem"} />
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
                >
                  <InfoIcon width={"1rem"} />
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
                  <select name="cars" id="cars" style={styles.fieldNumber2}>
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
              isEdited ? onSaveChange("RECAPITULATIF") : closeModal()
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
      <EuiSpacer size="m" />
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ModelsReducer }) => ({
  modelData: ModelsReducer.modelData,
});

export default connect(mapStateToProps)(ModalForm);
