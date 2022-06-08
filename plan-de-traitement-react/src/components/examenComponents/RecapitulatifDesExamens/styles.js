import colors from "../../../utils/colors";

const styles = {
  modal: {
    width: "70rem",
  },

  container: { 
    marginLeft: 20, 
    marginRight: 20 
  },

  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
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
  },

  headTitle: {
    fontSize: "20px",
    color: colors.primary,
    letterSpacing: 0,
    marginRight: "10px",
  },

  btnContainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    marginBottom: "30px",
    width: "100%",
  },

  backBtn: {
    fontSize: "27px",
    color: colors.darkBlue,
    border: "3px solid #052A3E",
    borderRadius: "39px",
    width: "187px",
    height: "59px",
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
    width: "187px",
    height: "59px",
    marginRight: "45px",
    textDecoration: "none",
  },
};

export default styles;
