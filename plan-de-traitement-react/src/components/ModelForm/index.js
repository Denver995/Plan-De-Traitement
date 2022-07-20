import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldNumber,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiText,
  useGeneratedHtmlId,
} from "@elastic/eui";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ReactToolTip from "react-tooltip";
import { ReactComponent as InfoIcon } from "../../assets/svgs/Soustraction-1.svg";
import { useDimension } from "../../hooks/dimensions";
import { setError } from "../../redux/commons/actions";
import {
  CreateEspacement,
  createGroups,
  numOfGroupsChange,
  shareGroupPayload,
  updateModeleData,
} from "../../redux/examens/actions";
import { setModelData, updateModel } from "../../redux/models/actions";
import {
  addStep,
  desactivateStep,
  updateStep,
} from "../../redux/steps/actions";
import ModelGroupeService from "../../services/modelGroupe";
import ModelService from "../../services/models";
import colors from "../../utils/colors";
import { STEP1, STEP2 } from "../../utils/constants";
import { createStep, getStepByKey } from "../../utils/helper";
import ModalWrapper from "../common/ModalWrapper";
import Radio from "../Radio";
import styles from "./styles";
import GranulariteService from "../../services/granularites";

const ModalForm = ({
  closeModal,
  onSaveChange,
  isEdited,
  modelData,
  error,
}) => {
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.StepReducer.steps);
  const [nombreOccurence, setNombreOccurence] = useState(4);
  const [periode, setPeriode] = useState("1");
  const [typePeriode, setTypePeriode] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let step = getStepByKey(steps, STEP1);
  const [groupe_rdv, setIsGroup] = useState(
    step.data.groupe_rdv && step.data.groupe_rdv === 1 ? true : false
  );
  const [nomModele, setNomModele] = useState(
    isEdited ? modelData.nom : !isEdited && step.data.nom ? step.data.nom : ""
  );
  const [showGroupOption, setShowGroupOption] = useState(
    !isEdited && step.data.nb_occurence ? true : false
  );
  const { innerWidth } = useDimension();
  const [listTypePeriode, setListTypePeriode] = useState([]);

  useEffect(() => {
    GranulariteService.getListeGranularite()
      .then((res) => {
        var data = [];
        res.data.data.forEach((element) => {
          data.push({ value: element.id_granularite, text: element.nom });
        });
        setListTypePeriode(data);
      })
      .catch((error) => {});
  }, []);

  const onChangeGroupModelCheckbox = (is_group) => setIsGroup(is_group);

  const onChangeNomModeleField = (val) => setNomModele(val.target.value);

  const onChangeTypePeriode = (e) => {
    setTypePeriode(e.target.value);
  };

  const closeModale = () => {
    dispatch(setError(null));
    setLoading(true);
    if (modelData && modelData.id) {
      ModelService.deleteModele(modelData.id)
        .then((response) => {
          setLoading(false);
          closeModal();
        })
        .then((error) => {
          setLoading(false);
        });
    } else {
      closeModal();
    }
  };

  const createModele = (values) => {
    let nextStep = createStep(STEP2);
    nextStep.previousStep = values;
    dispatch(desactivateStep(STEP1));
    dispatch(addStep(nextStep));
  };

  const handleGetGroup = () => {
    setLoading(true);
    ModelGroupeService.getModelGroupe(parseInt(modelData.id))
      .then((response) => {
        setLoading(false);
        dispatch(shareGroupPayload(response.data.data));
        dispatch(createGroups(response.data.data.length));
        dispatch(CreateEspacement(response.data.data.length - 1));
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleCreateGroup = () => {
    for (let i = 1; i <= nombreOccurence; i++) {
      ModelGroupeService.createModelGroupe({
        id_modele: parseInt(modelData.id),
        nom: "Groupe " + i,
      })
        .then((response) => {})
        .catch((error) => {});
    }
    handleGetGroup();
  };

  const onClickNext = () => {
    if (showGroupOption) {
      setLoading(true);
      const data = {
        nom: nomModele,
        groupe_rdv: groupe_rdv ? 1 : 0,
        id_granularite_groupe: 2,
        id_granularite_examen: 2,
        nb_occurence: parseInt(nombreOccurence),
        id_entite: 4,
        periode: periode ? periode : 1,
        typePeriode: typePeriode,
      };
      step.data = data;
      dispatch(updateModeleData(data));
      if (groupe_rdv) {
        ModelService.updateModele(modelData.id, data)
          .then((response) => {
            handleCreateGroup();
            setLoading(false);
            dispatch(setError(null));
          })
          .catch((error) => {
            setLoading(false);
            if (error.message === "Network Error") {
              dispatch(
                setError(
                  "Erreur de connexion, Vérifiez votre connexion internet"
                )
              );
            } else {
              dispatch(setError("Une erreur est survenue"));
            }
          });
        dispatch(updateStep(step));
        createModele(step);
      } else {
        dispatch(updateStep(step));
        createModele(step);
      }
    } else {
      setLoading(true);
      const payload = {
        nom: nomModele,
        groupe_rdv: groupe_rdv ? 1 : 0,
        id_granularite_groupe: 1,
        id_granularite_examen: 2,
        id_entite: 2,
        nb_occurence: nombreOccurence,
        espacement_groupe: 2,
        espacement_examen: 4,
      };
      setErrorMessage(false);
      ModelService.createModele(payload)
        .then((response) => {
          dispatch(setError(null));
          setShowGroupOption(true);
          dispatch(setModelData({ nom: nomModele, ...response.data }));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(true);
          if (error.message === "Network Error") {
            dispatch(
              setError("Erreur de connexion, Vérifiez votre connexion internet")
            );
          } else {
            dispatch(setError("Un modèle avec ce nom existe déjà"));
          }
        });
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
                  <p
                    data-for="toolTip"
                    data-tip="<p style='margin-bottom: -10px'>Création de plusieurs</p><p>groupes de rendez-vous</p>"
                  >
                    <InfoIcon title="" width={"1rem"} />
                  </p>
                  <ReactToolTip
                    id="toolTip"
                    effect="solid"
                    place="right"
                    className="custom-toolTip"
                    backgroundColor={colors.darkBlue}
                    getContent={(dataTip) => (
                      <EuiText
                        style={styles.toolText}
                        dangerouslySetInnerHTML={{ __html: dataTip }}
                      ></EuiText>
                    )}
                  />
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
                <p
                  data-for="toolTip"
                  data-tip="<p style='margin-bottom: -10px'>Elle permet de définir l'intervalle</p><p style='margin-bottom: -10px'>de temps où seront recherché</p><p>les examens du groupe</p>"
                >
                  <InfoIcon title="" width={"1rem"} />
                </p>
                <ReactToolTip
                  id="toolTip"
                  effect="solid"
                  place="right"
                  className="custom-toolTip"
                  backgroundColor={colors.darkBlue}
                  getContent={(dataTip) => (
                    <EuiText
                      style={styles.toolText}
                      dangerouslySetInnerHTML={{ __html: dataTip }}
                    ></EuiText>
                  )}
                />
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
                  <select
                    name="cars"
                    id="cars"
                    style={styles.fieldNumber2}
                    onChange={onChangeTypePeriode}
                  >
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
            style={{...styles.cancelButton, height: "59px"}}
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
                nomModele?.length < 3 ? styles.addButton2 : styles.addButton
              }
              form={modalFormId}
              onClick={() => {
                onClickNext();
              }}
              disabled={nomModele.length < 3}
              fill={true}
              className="button_global btn-suivant-modelForm"
            >
              {loading ? (
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress
                    style={{
                      marginRight: "5px",
                      color: "white",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                  Suivant
                </Box>
              ) : (
                <>Suivant</>
              )}
            </EuiButton>
          )}
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
        {errorMessage && (
          <>
            <EuiSpacer size="xl" />
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          </>
        )}
      </EuiForm>
      <style jsx="true">
        {`
          .euiTool {
            background: #052a3e;
          }
          .custom-toolTip {
            font-size: 11px !important;
            opacity: 1 !important;
            padding: 0px 5px 0px 5px !important;
          }
        `}
      </style>
      <EuiSpacer size="m" />
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ModelsReducer, CommonReducer }) => ({
  modelData: ModelsReducer.modelData,
  error: CommonReducer.error,
});

export default connect(mapStateToProps)(ModalForm);
