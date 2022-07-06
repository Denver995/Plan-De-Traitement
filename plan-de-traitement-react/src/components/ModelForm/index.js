import {
  EuiButton,
  EuiButtonEmpty, EuiFieldNumber, EuiFieldText, EuiFlexGroup,
  EuiFlexItem, EuiForm, EuiFormRow, EuiSpacer, EuiToolTip, useGeneratedHtmlId
} from "@elastic/eui";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ReactComponent as InfoIcon } from "../../assets/svgs/Soustraction-1.svg";
import { useDimension } from "../../hooks/dimensions";
import {
  CreateEspacement, createGroups,
  numOfGroupsChange,createGroups1,GroupeLength
} from "../../redux/examens/actions";
import {
  setModelData,
  updateModel
} from "../../redux/models/actions";

import {
  startLoading,
  stopLoading
} from "../../redux/commons/actions";

import {
  addStep, desactivateStep, updateStep
} from "../../redux/steps/actions";
import ModelGroupeService from "../../services/modelGroupe";
import ModelService from "../../services/models";
import { STEP1, STEP2 } from "../../utils/constants";
import { createStep, getStepByKey } from "../../utils/helper";
import ModalWrapper from "../common/ModalWrapper";
import Radio from "../Radio";
import styles from "./styles";



const ModalForm = ({ closeModal, onSaveChange, isEdited, modelData, groupeLength }) => {
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const [groupe_rdv, setIsGroup] = useState();
  const [nomModele, setNomModele] = useState(isEdited ? modelData.nom : "");
  const [nombreOccurence, setNombreOccurence] = useState(4);
  const [periode, setPeriode] = useState("1");
  const [typePeriode, setTypePeriode] = useState();
  const [showGroupOption, setShowGroupOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erroMessage, setErrorMessage] = useState('');
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

  useEffect(()=>{
    ModelService.getModele()
    .then((response)=>{
      console.log("Reponse succccccesss");
      console.log(response.data);
    })
    .catch(error => {
      console.log("Error for response")
      console.log(error);
    })
  },[])

  const closeModale = () => {
    ModelService.deleteModele(modelData.id)
      .then((response) => {
        setLoading(true)
        closeModal();
      })
      .then((error) => {
        setLoading(true)
      });

  }

  const createModele = (values) => {
    let nextStep = createStep(STEP2);
    nextStep.previousStep = values;
    dispatch(desactivateStep(STEP1));
    dispatch(addStep(nextStep));
  };

  const handleCreateModeleGroup = () => {
    setLoading(true)
    ModelGroupeService.createModelGroupe()
          .then((response) => {
            setLoading(false);
            dispatch(setModelData(response.data));
          })
          .catch((error) => {
            setLoading(false)
          });
  } 

  const onClickNext = () => {
    if (showGroupOption) {
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
        dispatch(createGroups(nombreOccurence));
        dispatch(CreateEspacement(nombreOccurence - 1));
        dispatch(updateStep(step));
        createModele(step);
        dispatch(setModelData(data));
    } else {
      setLoading(true)
      const payload = {
        nom: nomModele,
        groupe_rdv: groupe_rdv ? 1 : 0,
        id_entite: 5
      };
      ModelService.createModele(payload)
        .then((response) => {
          console.log(response.data)
          setShowGroupOption(true);
          dispatch(setModelData(response.data));
          setLoading(false)
          setErrorMessage(false)

        })
        .catch((error) => {
          console.log(error)
          setShowGroupOption(true);
          setLoading(false)
          setErrorMessage(true)
        });
    }
  };

  return (
    <ModalWrapper className="modale-modelForm" style={styles.modal}>

      <EuiForm id={modalFormId} style={styles.form}>
        {loading ?
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
          : <>
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
            {erroMessage && (
              <>
                <EuiSpacer size="xl" />
                <p style={{ color: 'red', textAlign: 'center' }}>Un modèle avec ce nom existe déjà</p>
              </>
            )}
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
          </>
        }
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

const mapStateToProps = ({ ModelsReducer, CommonReducer, ExamenReducer }) => ({
  modelData: ModelsReducer.modelData,
  loading: CommonReducer.looading,
  groupeLength: ExamenReducer.groupeLength,
});

export default connect(mapStateToProps)(ModalForm);
