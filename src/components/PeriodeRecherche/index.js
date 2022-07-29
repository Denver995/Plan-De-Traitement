import {
  EuiButton,
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiSelect,
  EuiSpacer,
  EuiText
} from "@elastic/eui";
import { useEffect, useState } from "react";
import { fleche } from "../../assets/images/index";
import ModalWrapper from "../common/ModalWrapper";
import styles from "./style";
import { connect, useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import { ReactComponent as InfoIcon } from "../../assets/svgs/Soustraction-1.svg";
import { setError, setShowPeriodForm } from "../../redux/commons/actions";
import GranulariteService from "../../services/granularites";
import colors from "../../utils/colors";
import ModelService from "../../services/models";
import { Box, CircularProgress } from "@mui/material";
import { updateModeleData } from "../../redux/examens/actions";

const PeriodeRechercheForm = ({ dataModeleUpdate, modelData }) => {
  const [options, setOptions] = useState([])
  const dispatch = useDispatch();
  const [periode, setPeriode] = useState();
  const [label, setLabel] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const changePeriode = (e) => setPeriode(e.target.value);
  const changeLabel = (e) => setLabel(e.target.value);

  const goBack = () => {
    dispatch(setShowPeriodForm({ data: {}, status: false }));
  };

  const saveChange = () => {
    setLoading(true);

    let payload = {
      nom: dataModeleUpdate.nom,
      groupe_rdv: dataModeleUpdate.groupe_rdv,
      id_granularite_groupe: dataModeleUpdate.id_granularite_groupe,
      id_granularite_examen: dataModeleUpdate.id_granularite_examen,
      nb_occurence: parseInt(dataModeleUpdate.nb_occurence),
      id_entite: dataModeleUpdate.id_entite,
      periode: parseInt(periode),
      typePeriode: parseInt(label),
    }
    ModelService.updateModele(modelData.id, payload)
      .then(() => {
        dispatch(updateModeleData(payload));

        goBack()
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === "Network Error") {
          dispatch(
            setError("Erreur de connexion, Vérifiez votre connexion internet")
          );
        } else {
          dispatch(setError("Une erreur est survenue"));
        }
      });
  };

  useEffect(() => {
    setPeriode(dataModeleUpdate?.periode)


    GranulariteService.getListeGranularite()
      .then((res) => {
        let data = [];
        res.data.data.forEach((element) => {
          data.push({ value: element.id_granularite, text: element.nom });
        });
        if (dataModeleUpdate?.typePeriode)
          setLabel(dataModeleUpdate?.typePeriode)
        else
          setLabel(data.length > 0 ? data[0].value : "")
        setOptions(data);
      });
  }, [])


  useEffect(() => {
    setIsValid(!(periode === undefined || periode === ""));
  }, [periode, label]);

  return (
    <ModalWrapper style={styles.modal} goBack={goBack}>
      <EuiForm style={styles.container} component="form">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            style={{ width: 20, marginRight: "15px" }}
            src={fleche}
            alt="this is a btn"
          />
          <p className="label_exams" style={styles.title}>
            Periode de recherche
          </p>
        </div>

        <EuiSpacer size="xl" />

        <div>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem>
              <div>
                <span
                  style={{
                    ...styles.label,
                    display: "flex",
                    alignItems: "center",
                    marginBottom: -7,
                  }}
                >
                  Periode de recherche:
                  <span
                    style={{ paddingTop: 4, marginLeft: 5 }}
                    data-for="toolTip"
                    data-tip="<p style='margin-bottom: -10px'>Elle permet de définir la</p><p style='margin-bottom: -10px'>période maximale où seront</p><p>recherché les examens du groupe</p>"
                  >
                    <InfoIcon title="" width={"1rem"} />
                  </span>
                </span>
                <ReactTooltip
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
                <EuiFieldNumber
                  fullWidth
                  value={periode}
                  style={styles.number}
                  placeholder=""
                  onChange={(e) => changePeriode(e)}
                />
              </div>
            </EuiFlexItem>
            <EuiFlexItem>
              <div style={styles.inputContainer}>
                <span
                  style={{
                    ...styles.label,
                    visibility: "hidden",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: -10,
                  }}
                >
                  Periode de recherche:
                  <span style={{ paddingTop: 4, marginLeft: 5 }}>
                    <InfoIcon title="" width={"1rem"} />
                  </span>
                </span>
                <EuiSelect
                  fullWidth
                  style={styles.select}
                  options={options}
                  value={label}
                  onChange={(e) => changeLabel(e)}
                  isClearable={true}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>

        <EuiSpacer size="s" />
        <EuiSpacer size="xxl" />

        <div style={styles.btnContainer} className="exam-inter-footer">
          <EuiButton
            onClick={goBack}
            style={styles.cancel}
            className="inter-cancel"
          >
            <p style={styles.annuler}>Annuler</p>
          </EuiButton>
          <EuiButton
            onClick={saveChange}
            type="submit"
            style={!isValid ? styles.submitDeactivated : styles.submit}
            disabled={!isValid || loading}
            className="inter-add"
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
              </Box>
            ) : (
              <p style={styles.ajouter}>Ajouter</p>)}
          </EuiButton>
        </div>
      </EuiForm>
      <style jsx="true">
        {`
          .custom-toolTip {
            font-size: 11px !important;
            opacity: 1 !important;
            padding: 0px 5px 0px 5px !important;
          }
        `}
      </style>
    </ModalWrapper>
  );
};

const mapStateToProps = ({ ExamenReducer, ModelsReducer }) => ({
  dataModeleUpdate: ExamenReducer.dataModeleUpdate,
  modelData: ModelsReducer.modelData,

});

export default connect(mapStateToProps)(PeriodeRechercheForm);
