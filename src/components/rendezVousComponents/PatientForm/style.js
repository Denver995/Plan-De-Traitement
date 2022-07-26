import colors from "../../../utils/colors";

const styles = {
  modal: {
    width: "70rem",
  },

  container: { 
    marginLeft: 20, 
    marginRight: 20,
  },

  label: {
    fontSize: 14,
    color: colors.blackClaire,
  },

  nomModel: {
    fontSize: 20,
    color: colors.primary,
  },

  horinzontalRule: {
    marginTop: 10,
    // marginBottom: 10
  },

  patientContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: 0
  },

  infoPatient: {
    fontSize: 20,
    color: colors.blackClaire
  },

  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.white,
  },

  backBtn: {
    fontSize: "27px",
    color: colors.darkBlue,
    border: "3px solid #052A3E",
    borderRadius: "39px",
    width: "187px",
    height: "48px",
    marginLeft: "30px",
    textDecoration: "none",
  },

  validateBtn: {
    fontSize: "27px",
    color: colors.white,
    border: "3px solid #052A3E",
    backgroundColor: colors.darkBlue,
    borderRadius: "39px",
    width: 187,
    height: 59,
    textDecoration: "none",
  },
};

export default styles;
