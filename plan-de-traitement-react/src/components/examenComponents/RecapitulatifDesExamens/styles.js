import colors from "../../../utils/colors";

const styles = {
  modal: {
    width: "70rem",
  },

  container: { 
    marginLeft: 20, 
    marginRight: 20,
    marginTop: -10
  },

  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  },

  topContainer: {
    position: "fixed",
    width: "100%",
    backgroundColor: colors.white,
    zIndex: 3,
    paddingTop: 10
  },

  timeline: {
    paddingTop: 140,
    display: "flex",
    justifyContent: "flex-end"
  },

  title: {
    fontSize: "20px",
    color: colors.blackClaire,
    letterSpacing: 0,
    marginLeft: "10px",
  },

  horizontalRule: {
    backgroundColor: colors.primary,
  },

  headContainer: {
    marginLeft: "20px",
  },

  headLabel: {
    fontSize: "14px",
    color: colors.blackClaire,
    fontWeight: "bold",
  },

  headTitleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5
  },

  headTitle: {
    fontSize: "20px",
    color: colors.primary,
    letterSpacing: 0,
    marginRight: "10px",
  },

  pencil: {
    cursor: "pointer",
  },

  btnContainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 40,
    width: "100%",
    backgroundColor: colors.white,
    zIndex: 1000
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
    position: "absolute",
    right: 0,
    fontSize: "27px",
    color: colors.white,
    border: "3px solid #052A3E",
    backgroundColor: colors.darkBlue,
    borderRadius: "39px",
    width: 187,
    height: 59,
    marginRight: "45px",
    textDecoration: "none",
  },
};

export default styles;
