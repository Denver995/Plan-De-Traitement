import {
  EuiButton,
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiSelect,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import ModalWrapper from "../common/ModalWrapper";
import styles from "./style";
import { fleche } from "../../assets/images/index";
import { useEffect, useState } from "react";
// import { setAlert } from "../../redux/commons/actions";
import { useDispatch } from "react-redux";
import { setShowPeriodForm } from "../../redux/commons/actions";
import { ReactComponent as InfoIcon } from "../../assets/svgs/Soustraction-1.svg";
import ReactTooltip from "react-tooltip";
import colors from "../../utils/colors";

const PeriodeRechercheForm = () => {
  const options = [
    {
      value: "Semaine",
      text: "Semaine",
    },
  ];
  const dispatch = useDispatch();
  const [periode, setPeriode] = useState();
  const [label, setLabel] = useState(options[0].value);
  const [isValid, setIsValid] = useState(false);

  const changePeriode = (e) => setPeriode(e.target.value);
  const changeLabel = (e) => setLabel(e.target.value);

  const goBack = () => {
    dispatch(setShowPeriodForm(false));
  };

  const saveChange = () => {
    dispatch(setShowPeriodForm(false));
  };

  useEffect(() => {
    setIsValid(!(periode === undefined || periode === ""));
  }, [periode, label]);

  return (
    <ModalWrapper style={styles.modal}>
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
            disabled={!isValid}
            className="inter-add"
          >
            <p style={styles.ajouter}>Ajouter</p>
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

export default PeriodeRechercheForm;
